'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SimplexNoise from 'simplex-noise';

export default function DroneSwarm() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d')!;
        if (!ctx) return;

        /* ---------- constants ---------- */
        const W = 960, H = 480, T = 60, Z = 5;
        const n = Math.min(W, H) / T;
        const b = 0, b2 = 0.125;
        const v0 = 0, vmax = n / 40;
        const mdc = n / 8;

        canvas.width = W;
        canvas.height = H;

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 0.25;

        /* ---------- simplex ---------- */
        const data = new Float32Array(T * n * T * n);
        const simplex_ = new SimplexNoise();
        function simplex(x: number, y: number) {
            x = ~~x; y = ~~y;
            if (data[y * T * n + x] === 0) data[y * T * n + x] = simplex_.noise2D(x * 0.005, y * 0.005);
            return data[y * T * n + x];
        }

        /* ---------- state ---------- */
        let bgc = true;
        let ig: ImageData | null = null;

        /* ---------- isometric transform ---------- */
        ctx.setTransform(1, 0, 0, 1, W / 2, H / 2);
        ctx.transform(1, 0, 0, 2 / 3, 0, 0);
        ctx.transform(
            Math.cos(Math.PI / 4), -Math.sin(Math.PI / 4),
            Math.cos(Math.PI / 4), Math.sin(Math.PI / 4),
            0, 0
        );

        /* ---------- grid state ---------- */
        const clicked: Record<string, number> = {};
        const nearestClicked: Record<string, [string, number, number] | null> = {};
        const droneCount: Record<string, number> = {};
        for (let tx = n - 1; tx >= 0; tx--) {
            for (let ty = 0; ty < n; ty++) {
                nearestClicked[[tx, ty].toString()] = null;
                droneCount[[tx, ty].toString()] = 0;
            }
        }

        /* ---------- Drone class ---------- */
        class Drone {
            id: number;
            h: [number, number];
            x: number; y: number;
            dx: number; dy: number;
            ddx: number; ddy: number;
            tx: number | null; ty: number | null;
            target_tx: number | null; target_ty: number | null;
            force_target: number;

            constructor(id: number, x = 0, y = 0, dx = 0, dy = 0, ddx = 0, ddy = 0) {
                this.id = id;
                this.h = [0, 0];
                this.x = x; this.y = y;
                this.dx = dx; this.dy = dy;
                this.ddx = ddx; this.ddy = ddy;
                this.tx = null; this.ty = null;
                this.target_tx = null; this.target_ty = null;
                this.force_target = 0;
                this.update();
            }

            update(dt = 1, ddx = 0, ddy = 0, onboundaryfn?: () => void) {
                this.x += this.dx; this.y += this.dy;
                this.dx += this.ddx; this.dy += this.ddy;
                this.ddx = ddx; this.ddy = ddy;
                if (this.dx > vmax) { this.dx = vmax; this.ddx = Math.min(this.ddx, 0); }
                else if (this.dx < -vmax) { this.dx = -vmax; this.ddx = Math.max(this.ddx, 0); }
                if (this.dy > vmax) { this.dy = vmax; this.ddy = Math.min(this.ddy, 0); }
                else if (this.dy < -vmax) { this.dy = -vmax; this.ddy = Math.max(this.ddy, 0); }

                const tx = ~~(this.x / T + n / 2);
                const ty = ~~(this.y / T + n / 2);

                if (clicked[[this.tx, this.ty].toString()]) {
                    let x1 = this.x + T * n / 2;
                    let y1 = this.y + T * n / 2;
                    x1 = Math.max(0, Math.min(n * T - 1, x1));
                    y1 = Math.max(0, Math.min(n * T - 1, y1));
                    this.h[0] = Math.max(0, simplex(x1, y1) * 5 * Z);
                } else {
                    let x1 = this.x + this.dx + this.ddx / 2 + T * n / 2;
                    let y1 = this.y + this.dy + this.ddy / 2 + T * n / 2;
                    x1 = Math.max(0, Math.min(n * T - 1, x1));
                    y1 = Math.max(0, Math.min(n * T - 1, y1));
                    this.h[0] = Math.max(this.h[0], simplex(x1, y1) * 5 * Z);
                }

                if (this.h[0] > this.h[1]) this.h[1] += 20 * dt;
                else if (this.h[0] < this.h[1]) this.h[1] -= 20 * dt;
                if (this.h[1] > 100) this.h[1] = 100;
                if (this.h[1] < 0) this.h[1] = 0;
                if (this.h[0] > 100) this.h[0] = 100;
                if (!clicked[[this.tx, this.ty].toString()]) this.h[0] = 0;

                if (tx >= 0 && tx < n && ty >= 0 && ty < n && (this.tx !== tx || this.ty !== ty)) {
                    if (onboundaryfn) onboundaryfn();
                    if (this.tx !== null) droneCount[[this.tx, this.ty].toString()]--;
                    this.tx = tx; this.ty = ty;
                    droneCount[[this.tx, this.ty].toString()]++;
                    updateNearest(tx, ty);
                }
                return [this.x, this.y];
            }
        }

        /* ---------- helpers ---------- */
        function updateNearest(tx: number, ty: number) {
            const key = [tx, ty].toString();
            const cks = Object.keys(clicked);
            if (nearestClicked[key] === null && cks.length) {
                const t1 = cks[0].split(',');
                nearestClicked[key] = [cks[0], Math.sqrt(Math.pow(tx - parseInt(t1[0]), 2) + Math.pow(ty - parseInt(t1[1]), 2)), 1];
            }
            if (cks.length && nearestClicked[key] && nearestClicked[key]![2] < cks.length) {
                for (const ck of cks) {
                    const t1 = ck.split(',');
                    const eds = Math.sqrt(Math.pow(tx - parseInt(t1[0]), 2) + Math.pow(ty - parseInt(t1[1]), 2));
                    if (eds < nearestClicked[key]![1]) nearestClicked[key] = [ck, eds, cks.length];
                }
            }
            return nearestClicked[key];
        }

        function clickTile(tx: number, ty: number) {
            bgc = true;
            if (tx >= 0 && ty >= 0 && tx < n && ty < n) clicked[[tx, ty].toString()] = 1;
        }

        /* ---------- terrain ---------- */
        function getTerrain() {
            ctx.fillStyle = 'black';
            ctx.fillRect(-T * n / 2 - 1, -T * n / 2 - 101, T * n + 202, T * n + 202);
            for (let tx = n - 1; tx >= 0; tx--) {
                for (let ty = 0; ty < n; ty++) {
                    const k = [tx, ty].toString();
                    // Border lines for clicked tiles
                    if (!clicked[[tx - 1, ty].toString()] && clicked[k]) {
                        ctx.strokeStyle = 'white';
                        ctx.beginPath();
                        ctx.moveTo((tx - n / 2 + b) * T, (ty - n / 2 + b) * T);
                        ctx.lineTo((tx - n / 2 + b) * T, (ty - n / 2 + b) * T + T * (1 - b));
                        ctx.stroke();
                    } else if (clicked[[tx - 1, ty].toString()] && !clicked[k]) {
                        ctx.strokeStyle = 'red';
                        ctx.beginPath();
                        ctx.moveTo((tx - n / 2 + b + b2) * T, (ty - n / 2 + b + b2) * T);
                        ctx.lineTo((tx - n / 2 + b + b2) * T, (ty - n / 2 + 1 - b2) * T);
                        ctx.stroke();
                    }
                    if (!clicked[[tx, ty - 1].toString()] && clicked[k]) {
                        ctx.strokeStyle = 'white';
                        ctx.beginPath();
                        ctx.moveTo((tx - n / 2 + b) * T, (ty - n / 2 + b) * T);
                        ctx.lineTo((tx - n / 2 + b) * T + T * (1 - b), (ty - n / 2 + b) * T);
                        ctx.stroke();
                    } else if (clicked[[tx, ty - 1].toString()] && !clicked[k]) {
                        ctx.strokeStyle = 'red';
                        ctx.beginPath();
                        ctx.moveTo((tx - n / 2 + b + b2) * T, (ty - n / 2 + b + b2) * T);
                        ctx.lineTo((tx - n / 2 + 1 - b2) * T, (ty - n / 2 + b + b2) * T);
                        ctx.stroke();
                    }
                    if (!clicked[[tx + 1, ty].toString()] && clicked[k]) {
                        ctx.strokeStyle = 'white';
                        ctx.beginPath();
                        ctx.moveTo((tx - n / 2 + 1) * T, (ty - n / 2 + b) * T);
                        ctx.lineTo((tx - n / 2 + 1) * T, (ty - n / 2 + 1) * T);
                        ctx.stroke();
                    } else if (clicked[[tx + 1, ty].toString()] && !clicked[k]) {
                        ctx.strokeStyle = 'red';
                        ctx.beginPath();
                        ctx.moveTo((tx - n / 2 + 1 - b2) * T, (ty - n / 2 + b + b2) * T);
                        ctx.lineTo((tx - n / 2 + 1 - b2) * T, (ty - n / 2 + 1 - b2) * T);
                        ctx.stroke();
                    }
                    if (!clicked[[tx, ty + 1].toString()] && clicked[k]) {
                        ctx.strokeStyle = 'white';
                        ctx.beginPath();
                        ctx.moveTo((tx - n / 2 + b) * T, (ty - n / 2 + 1) * T);
                        ctx.lineTo((tx - n / 2 + 1) * T, (ty - n / 2 + 1) * T);
                        ctx.stroke();
                    } else if (clicked[[tx, ty + 1].toString()] && !clicked[k]) {
                        ctx.strokeStyle = 'red';
                        ctx.beginPath();
                        ctx.moveTo((tx - n / 2 + b + b2) * T, (ty - n / 2 + 1 - b2) * T);
                        ctx.lineTo((tx - n / 2 + 1 - b2) * T, (ty - n / 2 + 1 - b2) * T);
                        ctx.stroke();
                    }

                    if (clicked[k]) {
                        for (let x = 0; x < T; x++) {
                            for (let y = 0; y < T; y++) {
                                const h = Math.max(-3, simplex(tx * T + x, ty * T + y) * 100);
                                if (~~(Math.abs(h % 20) * 10) < 20) {
                                    ctx.fillStyle = 'white';
                                    ctx.fillRect((tx * T + x) - n / 2 * T + Z * (h / 20), (ty * T + y) - n / 2 * T - Z * (h / 20), 1, 1);
                                } else if (
                                    (x === 0 && !clicked[[tx - 1, ty].toString()]) ||
                                    (T - x === 1 && !clicked[[tx + 1, ty].toString()]) ||
                                    (y === 0 && !clicked[[tx, ty - 1].toString()]) ||
                                    (T - y === 1 && !clicked[[tx, ty + 1].toString()])
                                ) {
                                    ctx.fillStyle = '#777';
                                    ctx.fillRect((tx * T + x) - n / 2 * T + Z * (h / 20), (ty * T + y) - n / 2 * T - Z * (h / 20), 1, 1);
                                }
                            }
                        }
                    }
                }
            }
        }

        /* ---------- drone drawing ---------- */
        function droneNavDraw(dr: Drone) {
            ctx.fillStyle = 'white';
            if (clicked[[dr.tx, dr.ty].toString()] && !dr.target_tx) {
                ctx.beginPath();
                ctx.strokeStyle = 'red';
                ctx.moveTo(dr.x, dr.y);
                ctx.lineTo(dr.x + dr.h[1] + 20, dr.y - dr.h[1] - 20);
                ctx.stroke();
                if (dr.h[0] > 0) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(dr.x + dr.h[1] + 20, dr.y - dr.h[1] - 20);
                    ctx.lineTo(dr.x + dr.h[0], dr.y - dr.h[0]);
                    ctx.stroke();
                    ctx.lineWidth = 0.25;
                }
                ctx.fillRect(dr.x + dr.h[1] + 19, dr.y - dr.h[1] - 21, 3, 3);
            } else if (dr.target_tx) {
                ctx.strokeStyle = 'red';
                ctx.setLineDash([1, 3]);
                ctx.beginPath();
                ctx.moveTo(dr.x, dr.y);
                ctx.lineTo(dr.x + dr.h[1] + 20, dr.y - dr.h[1] - 20);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.fillRect(dr.x + dr.h[1] + 19, dr.y - dr.h[1] - 21, 3, 3);
            }
        }

        /* ---------- update drones ---------- */
        function updateDrones(ts: number, ots: number) {
            for (const dr of drones) {
                const dt = (ts - ots) / 1000;
                const dv: [number, number] = [
                    (dr.ddx || 1) * 3 * (Math.random() - 0.5),
                    (dr.ddy || 1) * 3 * (Math.random() - 0.5),
                ];
                if (Math.abs(dr.x) > T * (n / 2)) dv[0] -= dr.x / (T * n);
                if (Math.abs(dr.y) > T * (n / 2)) dv[1] -= dr.y / (T * n);

                if (dr.target_tx && ((dr.tx === dr.target_tx && dr.ty === dr.target_ty) || (clicked[[dr.tx, dr.ty].toString()] && !dr.force_target))) {
                    dr.target_tx = null;
                    dv[0] = -dr.dx / dt / 4;
                    dv[1] = -dr.dy / dt / 4;
                    dr.force_target = 0;
                } else if ((Math.random() < 1e-6 * (droneCount[[dr.tx, dr.ty].toString()] - 2) && !clicked[[dr.tx, dr.ty].toString()]) || Math.random() < 0.0001 * n) {
                    clickTile(dr.tx!, dr.ty!);
                } else if (!dr.target_tx && !clicked[[dr.tx, dr.ty].toString()] && Object.keys(clicked).length) {
                    let t1Local = nearestClicked[[dr.tx, dr.ty].toString()];
                    if (!t1Local) t1Local = updateNearest(dr.tx!, dr.ty!);
                    if (t1Local) {
                        let t1s = t1Local[0].split(',');
                        if (Math.random() > 1 / droneCount[t1s.toString()]) {
                            t1s = Object.keys(clicked)[~~(Math.random() * Object.keys(clicked).length)].split(',');
                        }
                        dr.target_tx = parseFloat(t1s[0]);
                        dr.target_ty = parseFloat(t1s[1]);
                    }
                }

                if (dr.target_tx) {
                    if (dr.target_tx !== dr.tx) dv[0] -= (dr.tx! - dr.target_tx) / n;
                    if (dr.target_ty !== dr.ty) dv[1] -= (dr.ty! - dr.target_ty!) / n;
                }

                dr.update(dt, dv[0] * dt, dv[1] * dt, () => {
                    if (!dr.force_target && clicked[[dr.tx, dr.ty].toString()] && droneCount[[dr.tx, dr.ty].toString()] > mdc && Math.random() > 0.5) {
                        const ck = Object.keys(clicked);
                        const cki = ck[~~(Math.random() * ck.length)].split(',');
                        const t1p = nearestClicked[cki.toString()] || updateNearest(parseInt(cki[0]), parseInt(cki[1]));
                        if (t1p) {
                            const t1s = t1p[0].split(',');
                            dr.target_tx = parseFloat(t1s[0]);
                            dr.target_ty = parseFloat(t1s[1]);
                            dr.force_target = 2;
                        }
                    } else if (dr.force_target) dr.force_target--;
                });
                droneNavDraw(dr);
            }
        }

        /* ---------- spawn drones ---------- */
        const isMobile = window.innerWidth < 768;
        const droneTotal = isMobile ? Math.floor(n * n / 16) : Math.floor(n * n / 8);
        const drones: Drone[] = [];
        for (let i = 0; i < droneTotal; i++) {
            drones.push(new Drone(
                i,
                (Math.random() - 0.5) * T * n - n / 2,
                (Math.random() - 0.5) * T * n,
                Math.random() * v0,
                Math.random() * v0
            ));
        }

        /* ---------- click handler ---------- */
        function getEventLocation(e: MouseEvent) {
            const rect = canvas!.getBoundingClientRect();
            return {
                x: (e.clientX - rect.left) * (W / rect.width),
                y: (e.clientY - rect.top) * (H / rect.height),
            };
        }

        function transform(x: number, y: number, a: number, bv: number, c: number, d: number, e: number, f: number) {
            return [((x + e) * a) + ((y + f) * c), ((x + e) * bv) + ((y + f) * d)];
        }

        const handleClick = (e: MouseEvent) => {
            const me = getEventLocation(e);
            const pe = transform(me.x, me.y,
                1 / Math.sqrt(2), 1 / Math.sqrt(2), -3 / 2 / Math.sqrt(2), 3 / 2 / Math.sqrt(2), -W / 2, -H / 2);
            const tx = ~~(pe[0] / T + n / 2);
            const ty = ~~(pe[1] / T + n / 2);
            clickTile(tx, ty);
        };

        canvas.addEventListener('click', handleClick);

        /* ---------- animation loop ---------- */
        let ots: number | null = null;
        function draw(ts: number) {
            if (!ots) ots = ts;
            if (!bgc && ig) ctx.putImageData(ig, 0, 0);
            else {
                getTerrain();
                ig = ctx.getImageData(0, 0, W, H);
                bgc = false;
            }
            updateDrones(ts, ots);
            ots = ts;
            animRef.current = window.requestAnimationFrame(draw);
        }

        // Start with a random tile clicked
        clickTile(~~(Math.random() * n), ~~(Math.random() * n));
        animRef.current = window.requestAnimationFrame(draw);

        return () => {
            window.cancelAnimationFrame(animRef.current);
            canvas.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <section className="relative py-24 md:py-32 px-6 bg-[#0B1120] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <span className="font-mono text-cyan-500 text-xs tracking-[0.3em] block mb-3">
                        {'/// LIVE SIMULATION'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 text-white">
                        Swarm{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Intelligence
                        </span>
                    </h2>
                    <p className="text-slate-400 font-inter max-w-xl mx-auto text-base">
                        Click on the terrain to deploy survey zones. Autonomous drones will
                        navigate, scan, and map the topography in real-time.
                    </p>
                </motion.div>

                {/* Canvas */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-xl overflow-hidden border border-slate-700/50 shadow-[0_0_60px_rgba(6,182,212,0.08)]"
                    style={{ aspectRatio: '960 / 480' }}
                >
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full cursor-crosshair block"
                        style={{ imageRendering: 'pixelated' }}
                    />
                    {/* Corner HUD labels */}
                    <div className="absolute top-3 left-4 font-mono text-[9px] text-cyan-500/50 tracking-wider">
                        SWARM_CTRL v2.4
                    </div>
                    <div className="absolute top-3 right-4 font-mono text-[9px] text-red-400/50 tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 animate-pulse" />
                        LIVE
                    </div>
                    <div className="absolute bottom-3 left-4 font-mono text-[9px] text-slate-500 tracking-wider">
                        CLICK TO DEPLOY SURVEY ZONE
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
