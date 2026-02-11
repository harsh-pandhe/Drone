'use client';
import { motion } from 'framer-motion';

const capabilities = [
    'RTK/PPK Georeferencing',
    'Oblique & Nadir Capture',
    'Volumetric Calculations',
    'Autonomous Flight Planning',
    'Multi-Sensor Fusion',
];

export default function TechGrid() {
    return (
        <section className="py-24 md:py-32 bg-[#0B1120] relative overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* Floating accent dots */}
            <div className="absolute top-20 right-20 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse" />
            <div className="absolute bottom-32 left-32 w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-pulse" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <h2 className="text-cyan-500 font-mono mb-4 text-xs sm:text-sm tracking-[0.3em]">
                            {"/// SYSTEM CAPABILITIES"}
                        </h2>
                        <h3 className="text-4xl sm:text-5xl md:text-6xl font-rajdhani font-bold text-white mb-6 leading-tight">
                            Deploying Advanced
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                                Aerial Intelligence
                            </span>
                        </h3>
                        <p className="text-slate-400 text-base md:text-lg mb-10 font-inter leading-relaxed max-w-lg">
                            Our fleet utilizes RTK (Real-Time Kinematic) positioning and
                            radiometric thermal sensors to deliver survey-grade accuracy
                            faster than traditional ground methods.
                        </p>

                        <ul className="space-y-4">
                            {capabilities.map((item, i) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                    className="flex items-center gap-3 font-rajdhani text-lg md:text-xl text-slate-300 group/item"
                                >
                                    <span className="w-2 h-2 bg-cyan-500 rotate-45 group-hover/item:bg-cyan-400 transition-colors flex-shrink-0" />
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Visual – Rotating Wireframe */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-square max-w-lg mx-auto w-full"
                    >
                        {/* Outer ring */}
                        <div className="absolute inset-0 border border-slate-700/60 rounded-full" />

                        {/* Middle ring */}
                        <div className="absolute inset-8 border border-slate-700/40 rounded-full animate-pulse" />

                        {/* Inner ring */}
                        <div className="absolute inset-16 border border-cyan-500/20 rounded-full" />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/5 rounded-full" />

                        {/* Center drone SVG */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                viewBox="0 0 200 200"
                                className="w-1/2 h-1/2 text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.2"
                            >
                                {/* Body */}
                                <rect x="85" y="85" width="30" height="30" rx="4" fill="currentColor" opacity="0.2" />
                                <rect x="85" y="85" width="30" height="30" rx="4" />

                                {/* Arms */}
                                <line x1="92" y1="92" x2="55" y2="55" />
                                <line x1="108" y1="92" x2="145" y2="55" />
                                <line x1="92" y1="108" x2="55" y2="145" />
                                <line x1="108" y1="108" x2="145" y2="145" />

                                {/* Rotors */}
                                <circle cx="50" cy="50" r="20" strokeDasharray="4 3" opacity="0.6" />
                                <circle cx="150" cy="50" r="20" strokeDasharray="4 3" opacity="0.6" />
                                <circle cx="50" cy="150" r="20" strokeDasharray="4 3" opacity="0.6" />
                                <circle cx="150" cy="150" r="20" strokeDasharray="4 3" opacity="0.6" />

                                {/* Rotor centers */}
                                <circle cx="50" cy="50" r="3" fill="currentColor" />
                                <circle cx="150" cy="50" r="3" fill="currentColor" />
                                <circle cx="50" cy="150" r="3" fill="currentColor" />
                                <circle cx="150" cy="150" r="3" fill="currentColor" />

                                {/* Camera */}
                                <circle cx="100" cy="100" r="6" />
                                <circle cx="100" cy="100" r="2.5" fill="currentColor" />
                            </svg>
                        </div>

                        {/* Orbiting point */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                        </motion.div>

                        {/* Second orbiting point (reverse, inner ring) */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-8"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]" />
                        </motion.div>

                        {/* Data labels */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-cyan-400/60">
                            N
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-cyan-400/60">
                            S
                        </div>
                        <div className="absolute top-1/2 -left-4 -translate-y-1/2 font-mono text-[10px] text-cyan-400/60">
                            W
                        </div>
                        <div className="absolute top-1/2 -right-4 -translate-y-1/2 font-mono text-[10px] text-cyan-400/60">
                            E
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
