'use client';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// ── Frame Sequence Config ───────────────────────────────
const TOTAL_FRAMES = 40;
const FRAME_PATH = '/frames';

// Pad number to 3 digits: 1 → "001"
function padFrame(n: number): string {
    return String(n).padStart(3, '0');
}

export default function DroneHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    // ── Scroll bindings ───────────────────────────────────
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Physics: Stiff and precise (robotic), not "floaty"
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 40,
        restDelta: 0.001,
    });

    const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

    // HUD + text opacities
    const hudOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);
    const text1Opacity = useTransform(smoothProgress, [0, 0.1, 0.25], [1, 1, 0]);
    const text2Opacity = useTransform(smoothProgress, [0.3, 0.4, 0.55], [0, 1, 0]);
    const text3Opacity = useTransform(smoothProgress, [0.6, 0.7, 0.85], [0, 1, 0]);

    // ── Mouse tracking ────────────────────────────────────
    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    // ── Image Loader ──────────────────────────────────────
    useEffect(() => {
        let loaded = 0;
        const loadImages = async () => {
            const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
                new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = `${FRAME_PATH}/ezgif-frame-${padFrame(i + 1)}.webp`;
                    img.onload = () => {
                        loaded++;
                        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
                        resolve(img);
                    };
                    img.onerror = () => {
                        loaded++;
                        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
                        reject(new Error(`Failed to load frame ${i + 1}`));
                    };
                })
            );
            try {
                const loadedImages = await Promise.all(promises);
                setImages(loadedImages);
                setImagesLoaded(true);
            } catch {
                // If some frames fail, still try to use what we have
                const settled = await Promise.allSettled(promises);
                const validImages = settled
                    .filter((r): r is PromiseFulfilledResult<HTMLImageElement> => r.status === 'fulfilled')
                    .map((r) => r.value);
                if (validImages.length > 0) {
                    setImages(validImages);
                    setImagesLoaded(true);
                }
            }
        };
        loadImages();
    }, []);

    // ── Canvas Render Loop ────────────────────────────────
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current || images.length === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            const idx = Math.round(frameIndex.get());
            const img = images[Math.min(Math.max(idx, 0), images.length - 1)];

            if (img && ctx && canvas) {
                // Set canvas size to viewport
                const dpr = window.devicePixelRatio || 1;
                canvas.width = window.innerWidth * dpr;
                canvas.height = window.innerHeight * dpr;
                canvas.style.width = `${window.innerWidth}px`;
                canvas.style.height = `${window.innerHeight}px`;
                ctx.scale(dpr, dpr);

                const w = window.innerWidth;
                const h = window.innerHeight;

                // "Cover" fit algorithm
                const scale = Math.max(w / img.width, h / img.height);
                const x = (w - img.width * scale) / 2;
                const y = (h - img.height * scale) / 2;

                ctx.clearRect(0, 0, w, h);
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

                // Scan line overlay
                const progress = smoothProgress.get();
                if (progress > 0.05 && progress < 0.95) {
                    const scanY = (progress * 1.5 * h) % h;
                    const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
                    scanGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
                    scanGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.35)');
                    scanGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
                    ctx.fillStyle = scanGrad;
                    ctx.fillRect(0, scanY - 40, w, 80);
                }

                // Mouse-reactive data points overlay
                const mx = mouseRef.current.x;
                const my = mouseRef.current.y;
                if (mx > 0 && my > 0 && progress > 0.1) {
                    const dataAlpha = Math.min(0.6, progress);
                    // Draw floating data squares near cursor
                    for (let i = 0; i < 12; i++) {
                        const angle = (i / 12) * Math.PI * 2 + Date.now() * 0.001;
                        const radius = 60 + Math.sin(Date.now() * 0.002 + i) * 30;
                        const px = mx + Math.cos(angle) * radius;
                        const py = my + Math.sin(angle) * radius;
                        const sz = 2 + Math.sin(i * 0.5) * 1.5;
                        ctx.fillStyle = `rgba(6, 182, 212, ${dataAlpha * (0.3 + Math.sin(i) * 0.2)})`;
                        ctx.fillRect(px - sz, py - sz, sz * 2, sz * 2);
                    }
                }

                // Vignette
                const vigGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h);
                vigGrad.addColorStop(0, 'rgba(11, 17, 32, 0)');
                vigGrad.addColorStop(1, 'rgba(11, 17, 32, 0.5)');
                ctx.fillStyle = vigGrad;
                ctx.fillRect(0, 0, w, h);
            }
        };

        const unsubscribe = frameIndex.on('change', render);
        render();
        window.addEventListener('resize', render);

        // Animate data points around cursor
        let animFrame: number;
        const animate = () => {
            if (mouseRef.current.x > 0) render();
            animFrame = requestAnimationFrame(animate);
        };
        animFrame = requestAnimationFrame(animate);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', render);
            cancelAnimationFrame(animFrame);
        };
    }, [imagesLoaded, images, frameIndex, smoothProgress]);

    // ── Main Render ───────────────────────────────────────
    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#0B1120]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0" />

                {/* Top gradient overlay for navbar visibility */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B1120]/80 to-transparent pointer-events-none z-10" />

                {/* ── Loading Overlay ──────────────── */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 z-50 bg-[#0B1120] flex flex-col items-center justify-center gap-6">
                        <div className="font-rajdhani text-2xl text-white tracking-wider uppercase">
                            ASCEND WORKSHOP
                        </div>
                        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 rounded-full"
                                style={{ width: `${loadProgress}%` }}
                            />
                        </div>
                        <div className="font-mono text-xs text-cyan-500 tracking-wider">
                            PREPARING WORKSHOP... {loadProgress}%
                        </div>
                    </div>
                )}

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
                        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/40 rounded-2xl px-8 sm:px-12 py-6 sm:py-8">
                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-rajdhani font-bold text-white tracking-tight uppercase leading-none">
                                ASC<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">END</span>
                            </h1>
                            <p className="font-inter text-slate-300 mt-3 text-sm sm:text-base tracking-wide">
                                3-Day Drone Workshop — Learn. Build. Fly.
                            </p>
                            <p className="font-mono text-cyan-400 mt-4 tracking-[0.3em] text-xs sm:text-sm">
                                {"/// REGISTER NOW • LIMITED SEATS"}
                            </p>
                        </div>
                    </motion.div>

                    {/* Text 2 — Mid scroll */}
                    <motion.div
                        style={{ opacity: text2Opacity }}
                        className="absolute left-4 sm:left-8 md:left-20 top-1/2 -translate-y-1/2 max-w-xl"
                    >
                        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/40 rounded-xl px-6 py-5">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-rajdhani font-bold text-white mb-2">
                                HANDS-ON LEARNING
                            </h2>
                            <div className="h-1 w-24 bg-cyan-500 mb-4" />
                            <p className="font-inter text-slate-300 text-sm sm:text-lg leading-relaxed">
                                Assemble your own drone from
                                <br />
                                <span className="text-cyan-400 font-bold">scratch</span>{' '}
                                with expert guidance.
                            </p>
                        </div>
                    </motion.div>

                    {/* Text 3 — Late scroll */}
                    <motion.div
                        style={{ opacity: text3Opacity }}
                        className="absolute right-4 sm:right-8 md:right-20 bottom-24 sm:bottom-32 md:bottom-40 max-w-xl text-right"
                    >
                        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/40 rounded-xl px-6 py-5">
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-rajdhani font-bold text-white mb-2">
                                FLIGHT READY
                            </h2>
                            <div className="h-1 w-24 bg-orange-500 ml-auto mb-4" />
                            <p className="font-inter text-slate-300 text-sm sm:text-lg leading-relaxed">
                                Master drone controls. Fly with confidence.
                                <br />
                                Take to the skies.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ── Scroll indicator ────────────── */}
                <motion.div
                    style={{ opacity: text1Opacity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
                >
                    <span className="font-mono text-[10px] text-cyan-400/60 tracking-widest uppercase">
                        Scroll to explore
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

