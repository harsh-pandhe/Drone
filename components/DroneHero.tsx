'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ── Particle System Config ──────────────────────────────
const PARTICLE_COUNT = 2000;
const GRID_COLS = 50;
const GRID_ROWS = 40;

interface Particle {
    // Random organic position
    ox: number;
    oy: number;
    // Structured grid position
    gx: number;
    gy: number;
    // Current
    x: number;
    y: number;
    size: number;
    alpha: number;
    speed: number;
}

function createParticles(w: number, h: number): Particle[] {
    const particles: Particle[] = [];
    const cellW = w / GRID_COLS;
    const cellH = h / GRID_ROWS;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const col = i % GRID_COLS;
        const row = Math.floor(i / GRID_COLS) % GRID_ROWS;
        particles.push({
            ox: Math.random() * w,
            oy: Math.random() * h,
            gx: col * cellW + cellW / 2,
            gy: row * cellH + cellH / 2,
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.5 + 0.3,
            speed: Math.random() * 0.5 + 0.2,
        });
    }
    return particles;
}

// ── Procedural Canvas Renderer ──────────────────────────
function renderFrame(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    progress: number,
    particles: Particle[],
    mouseX: number,
    mouseY: number
) {
    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#0B1120');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Grid lines (fade in with progress)
    const gridAlpha = Math.max(0, (progress - 0.2) / 0.6) * 0.15;
    if (gridAlpha > 0) {
        ctx.strokeStyle = `rgba(6, 182, 212, ${gridAlpha})`;
        ctx.lineWidth = 0.5;
        const cellW = w / GRID_COLS;
        const cellH = h / GRID_ROWS;
        for (let i = 0; i <= GRID_COLS; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellW, 0);
            ctx.lineTo(i * cellW, h);
            ctx.stroke();
        }
        for (let j = 0; j <= GRID_ROWS; j++) {
            ctx.beginPath();
            ctx.moveTo(0, j * cellH);
            ctx.lineTo(w, j * cellH);
            ctx.stroke();
        }
    }

    // Particles: lerp between organic → grid positions
    for (const p of particles) {
        const t = Math.min(1, Math.max(0, progress * 1.5));
        p.x = p.ox + (p.gx - p.ox) * t;
        p.y = p.oy + (p.gy - p.oy) * t;

        // Mouse influence (repel)
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 150);
        if (influence > 0) {
            p.x += dx * influence * 0.3;
            p.y += dy * influence * 0.3;
        }

        // Color shift: organic = warm white, grid = cyan
        const r = Math.round(248 - 242 * t);
        const g = Math.round(250 - 68 * t);
        const b = Math.round(252 - 40 * t);
        const alpha = p.alpha * (0.6 + t * 0.4);

        // Shape shift: circles → squares
        const sz = p.size * (1 + t * 0.5);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        if (t < 0.5) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(p.x - sz, p.y - sz, sz * 2, sz * 2);
        }
    }

    // Scan line
    if (progress > 0.05 && progress < 0.95) {
        const scanY = (progress * 1.5 * h) % h;
        const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
        scanGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
        scanGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.4)');
        scanGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 30, w, 60);
    }

    // Vignette
    const vigGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h);
    vigGrad.addColorStop(0, 'rgba(11, 17, 32, 0)');
    vigGrad.addColorStop(1, 'rgba(11, 17, 32, 0.7)');
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, w, h);
}

// ── Component ───────────────────────────────────────────
export default function DroneHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const [ready, setReady] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 40,
        restDelta: 0.001,
    });

    // HUD + text opacities
    const hudOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);
    const text1Opacity = useTransform(smoothProgress, [0, 0.1, 0.25], [1, 1, 0]);
    const text2Opacity = useTransform(smoothProgress, [0.3, 0.4, 0.55], [0, 1, 0]);
    const text3Opacity = useTransform(smoothProgress, [0.6, 0.7, 0.85], [0, 1, 0]);

    // Init particles & canvas sizing
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.scale(dpr, dpr);
            particlesRef.current = createParticles(window.innerWidth, window.innerHeight);
        };

        resize();
        setReady(true);
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Mouse tracking
    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // Render loop driven by scroll
    useEffect(() => {
        if (!ready) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            const progress = smoothProgress.get();
            renderFrame(ctx, w, h, progress, particlesRef.current, mouseRef.current.x, mouseRef.current.y);
        };

        const unsubscribe = smoothProgress.on('change', render);
        render(); // initial

        return () => unsubscribe();
    }, [ready, smoothProgress]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#0B1120]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0" />

                {/* ── HUD Overlay ─────────────────── */}
                <motion.div
                    style={{ opacity: hudOpacity }}
                    className="absolute inset-0 pointer-events-none p-4 md:p-8"
                >
                    <div className="w-full h-full border border-cyan-500/20 relative rounded-lg">
                        {/* Top-left */}
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-blink" />
                            <span className="font-mono text-xs text-cyan-400 tracking-wider">
                                REC
                            </span>
                        </div>
                        {/* Top-right */}
                        <div className="absolute top-3 right-3 font-mono text-xs text-cyan-400/70 text-right">
                            <div>SYS: NOMINAL</div>
                            <div>BATT: 87%</div>
                        </div>
                        {/* Bottom-left */}
                        <div className="absolute bottom-3 left-3 font-mono text-xs text-cyan-400/70">
                            <div>LAT: 28.6139°N</div>
                            <div>LNG: 77.2090°E</div>
                        </div>
                        {/* Bottom-right */}
                        <div className="absolute bottom-3 right-3 font-mono text-xs text-cyan-400">
                            {"ALT: 120m // GPS: LOCKED"}
                        </div>
                        {/* Crosshair */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 border border-cyan-400/30 rounded-full" />
                                <div className="absolute top-1/2 left-0 w-4 h-[1px] bg-cyan-400/50" />
                                <div className="absolute top-1/2 right-0 w-4 h-[1px] bg-cyan-400/50" />
                                <div className="absolute left-1/2 top-0 w-[1px] h-4 bg-cyan-400/50" />
                                <div className="absolute left-1/2 bottom-0 w-[1px] h-4 bg-cyan-400/50" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                            </div>
                        </div>
                        {/* Corner brackets */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500/40" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500/40" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40" />
                    </div>
                </motion.div>

                {/* ── Text Layers ─────────────────── */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    {/* Text 1 — Initial */}
                    <motion.div
                        style={{ opacity: text1Opacity }}
                        className="text-center absolute"
                    >
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-rajdhani font-bold text-white tracking-tight uppercase leading-none">
                            Capture
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Reality
                            </span>
                        </h1>
                        <p className="font-mono text-cyan-400 mt-6 tracking-[0.3em] text-xs sm:text-sm">
                            {"/// INITIALIZING DRONE SEQUENCE"}
                        </p>
                    </motion.div>

                    {/* Text 2 — Mid scroll */}
                    <motion.div
                        style={{ opacity: text2Opacity }}
                        className="absolute left-8 md:left-20 top-1/2 -translate-y-1/2 max-w-xl"
                    >
                        <h2 className="text-4xl md:text-6xl font-rajdhani font-bold text-white mb-2">
                            PRECISION DATA
                        </h2>
                        <div className="h-1 w-24 bg-cyan-500 mb-4" />
                        <p className="font-inter text-slate-300 text-lg leading-relaxed">
                            Transforming physical assets into
                            <br />
                            <span className="text-cyan-400 font-bold">digital twins</span>{' '}
                            with millimeter accuracy.
                        </p>
                    </motion.div>

                    {/* Text 3 — Late scroll */}
                    <motion.div
                        style={{ opacity: text3Opacity }}
                        className="absolute right-8 md:right-20 bottom-32 md:bottom-40 max-w-xl text-right"
                    >
                        <h2 className="text-4xl md:text-6xl font-rajdhani font-bold text-white mb-2">
                            LIDAR READY
                        </h2>
                        <div className="h-1 w-24 bg-orange-500 ml-auto mb-4" />
                        <p className="font-inter text-slate-300 text-lg leading-relaxed">
                            Penetrate vegetation. Map complex structures.
                            <br />
                            Visualize the unseen.
                        </p>
                    </motion.div>
                </div>

                {/* ── Scroll indicator ────────────── */}
                <motion.div
                    style={{ opacity: text1Opacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
                >
                    <span className="font-mono text-[10px] text-cyan-400/60 tracking-widest uppercase">
                        Scroll to deploy
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-5 h-8 border border-cyan-400/30 rounded-full flex items-start justify-center pt-1.5"
                    >
                        <div className="w-1 h-2 bg-cyan-400 rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
