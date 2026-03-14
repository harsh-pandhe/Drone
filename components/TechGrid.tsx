'use client';
import { motion } from 'framer-motion';

const capabilities = [
    'Drone Assembly & Soldering',
    'Flight Controller Configuration',
    'Throttle, Yaw, Pitch & Roll',
    'Pre-Flight Safety Checklists',
    'FPV & Line-of-Sight Flying',
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
                            {"/// WHAT YOU'LL LEARN"}
                        </h2>
                        <h3 className="text-4xl sm:text-5xl md:text-6xl font-rajdhani font-bold text-white mb-6 leading-tight">
                            Mastering the Art of
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                                Drone Flight
                            </span>
                        </h3>
                        <p className="text-slate-400 text-base md:text-lg mb-10 font-inter leading-relaxed max-w-lg">
                            Our 3-day workshop covers everything from drone theory
                            and hands-on assembly to real flight experience — taught
                            by certified drone pilots and instructors.
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

                    {/* Visual – Animated Drone with spinning blades */}
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

                        {/* Animated Drone SVG */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <svg
                                viewBox="-55 -40 450 420"
                                className="w-3/5 h-3/5 drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <style>{`
                                    .techgrid-blade {
                                        animation: techgrid-spin 0.6s linear infinite;
                                        transform-box: fill-box;
                                        transform-origin: 50% 50%;
                                    }
                                    @keyframes techgrid-spin {
                                        from { transform: rotate(0deg); }
                                        to   { transform: rotate(360deg); }
                                    }
                                `}</style>

                                {/* Body */}
                                <path
                                    fill="#475569"
                                    d="M325.2 159.8l-0.1 0c0 0-3.3-0.5-6.4-0.1 -6.3 0.7-11.6 3.2-14.9 5.1 -1.6 0.9-2.6 1.6-2.9 1.8h-54.3v-21.5c1.6-1.1 2.6-2.9 2.6-4.9 0-2-1-3.8-2.6-4.9v-2.7H240v2.7c-1.6 1.1-2.6 2.9-2.6 4.9 0 2 1 3.8 2.6 4.9v21.5H201V148c0-2.8-1.8-5.4-4.6-7.6l0 0 46.8-82.7c0.4-0.2 1.5-0.7 3-1.6 3.3-2 8-5.5 11.8-10.5 2.1-2.8 3.1-5.7 3.1-5.7 1.9-6.5-0.9-14-4.6-16.3l-0.4-0.2c-2.6-1.7-11.5-2-16.6 4.3 0 0-2 2.3-3.2 5.6 -2.4 5.7-2.9 11.6-2.9 15.5 0 2.2 0.2 3.5 0.2 3.6l0 0.3 0.4 0.2 -43.5 76.8v-19.9c0-1.7-1.4-3.1-3.1-3.1 -1.7 0-3.1 1.4-3.1 3.1v24.2c-7.8-3-12.8-3.9-15.6-3.9 -2.6 0-9.8 1.6-16.8 4.4v-24.6c0-1.7-1.4-3.1-3.1-3.1s-3.1 1.4-3.1 3.1v19.9l-43.3-76 0.4-0.2 0-0.3c0-0.1 0.2-1.4 0.2-3.6 0-3-0.5-7.2-1.8-11.7 -0.3-1.2-0.7-2.5-1.2-3.8C99 30.3 97 28.4 97 28.4 92.7 23 83.9 22 80.2 24.1c-3.9 2.2-6.8 9.9-4.8 16.5 0 0 0.9 3 3.1 5.7 3.7 5.1 8.5 8.5 11.8 10.4 1.5 0.9 2.6 1.4 3 1.6l47.1 82.6c-2.3 2.1-3.8 4.4-3.8 7v18.6H97.7V145c1.6-1.1 2.6-2.9 2.6-4.9 0-2-1-3.8-2.6-4.9v-2.7h-6.6v2.7c-1.6 1.1-2.6 2.9-2.6 4.9 0 2 1 3.8 2.6 4.9v21.5H36.8c-0.3-0.2-1.3-0.9-2.9-1.8 -3.4-1.9-8.7-4.4-14.9-5.1 0 0-3.2-0.4-6.5 0.1 -6.7 1.6-11.9 7.9-11.9 12.4 0 4.2 3.8 11.1 12 12.5 2.6 0.4 6.5 0 6.5 0 6.2-0.7 11.5-3.2 14.9-5.1 1.9-1.1 3-1.9 3-1.9l0.2-0.2V177h54v40.6l0 22.4c-1.6 1.1-2.7 3-2.7 4.9 0 1.9 1.1 3.5 2.7 4.6l0 1.7h6.6v-1.7c1.6-1.1 2.7-2.7 2.7-4.6 0-1.9-1.1-3.8-2.7-4.9v-22.4h2.3l4.9-7.9 0 0h22.6l0 0c-0.4 1.1-0.5 2.1-0.2 3.2 0.4 1.5 1.7 2.8 4 4 0.3 0.1 0.5 0.3 0.8 0.4l-38.1 67.2 -0.4-0.2 -0.2 0.1c-0.1 0-1.3 0.6-3.2 1.7 -3.3 2-8.1 5.4-11.8 10.4 0 0-1.6 1.4-3.2 5.7 -2.8 7.8 1.3 14.5 5 16.6 1.2 0.7 2.7 1 4.5 1 4 0 8.9-1.8 12.2-5.3 0 0 2.1-2.4 3.3-5.6 2.5-5.8 2.9-11.6 2.9-15.5 0-1.8-0.1-3-0.2-3.4l37.8-66.7c0.7 1.1 1.2 2.4 1.5 3.9 0.9 6.6 4.2 30.1 5.5 36.3 0.9 4.2 2 7.6 8.3 9.3 3 0.8 7.2 1.2 13 1.2h0.1 0c5.3 0 9.3-0.4 12.3-1 6.9-1.6 8.1-5.1 9-9.5 1.2-6.2 4.6-29.7 5.5-36.3 0.2-1.5 0.7-2.7 1.3-3.7l37.7 66.2c0 0.4-0.2 1.6-0.2 3.4 0 3.9 0.5 9.7 3 15.5 0 0 1.3 3.1 3.3 5.6 3.2 3.5 8.2 5.3 12.1 5.3 1.7 0 3.2-0.3 4.4-0.9l0.1-0.1c3.7-2.1 7.8-8.8 4.9-16.6 0 0-0.9-3.2-3.2-5.7 -3.7-5-8.4-8.4-11.8-10.4 -1.9-1.1-3.1-1.6-3.2-1.7L244 284l-0.4 0.2 -38.1-66.8c0.3-0.2 0.7-0.3 1-0.5 2.3-1.2 3.5-2.5 4-4 0.3-1 0.2-2.1-0.2-3.1h22.6l0 0 4.9 7.9h2.3v22.4c-1.6 1.1-2.7 3-2.7 4.9 0 1.9 1.1 3.5 2.7 4.6v1.7h6.6l0-1.7c1.6-1.1 2.7-2.7 2.7-4.6 0-1.9-1.1-3.8-2.7-4.9l0-22.4V177h54v0.5l0.2 0.2c0 0 1.1 0.9 3 1.9 3.4 1.9 8.7 4.4 14.9 5.1 3.1 0.6 6.5 0 6.5 0 8.2-1.4 12-8.3 12-12.5C337.2 167.7 332 161.3 325.2 159.8zM105.1 200.9l-5.1-7.5h-2.3V177h38.9v0.7l0 0.7 0.7 0.2c0.3 0.1 2.7 0.7 2.7 3.7 0 2.9-2.4 3.5-2.7 3.6l-0.8 0.2 0.1 0.8c0 0 0.5 4.9-1.4 8.3 -0.8 1.5-1.7 3.1-2.5 4.7 -0.2 0.4-0.4 0.7-0.6 1.1H105.1zM240 193.5h-2.3l-5.1 7.5h-27c-0.2-0.3-0.3-0.7-0.5-1 -0.9-1.7-1.8-3.4-2.6-4.9 -1.9-3.4-1.4-8.3-1.4-8.3l0.1-0.8 -0.8-0.2c-0.3-0.1-2.7-0.7-2.7-3.6 0-3 2.4-3.6 2.7-3.6l0.7-0.1V177H240V193.5z"
                                />

                                {/* Spinning blades */}
                                <path className="techgrid-blade" fill="rgba(6,182,212,0.5)" d="M325.3 183.1c4.8-1.3 8.3-5.7 8.3-10.9 0-5.1-3.4-9.5-8.2-10.9 0.5-2.8 2.7-17.4 1.7-32.8 -1.2-17.1-2-21.7-4.3-23.6 -0.7-0.6-1.5-1-2.2-1 -2.5 0-4.2 3.7-5.3 11.5 -1.8 12.4-3.5 27.9 0 37.2l3.3 8.8c-4.5 1.5-7.8 5.8-7.8 10.8 0 4.9 3.2 9.1 7.6 10.7 -0.4 2.3-2.8 17.2-1.7 33 1.2 17.1 2 21.7 4.3 23.6 0.7 0.6 1.5 1 2.2 1 2.5 0 4.2-3.7 5.3-11.5 1.8-12.4 3.5-27.9 0-37.2L325.3 183.1z" />
                                <path className="techgrid-blade" fill="rgba(6,182,212,0.5)" d="M308 271c-0.5-0.2-1.1-0.3-1.7-0.3 -2.9 0-8 2-21 8.3 -14.3 6.9-26.1 16.4-27.9 17.8 -2-1.8-4.6-2.8-7.4-2.8 -2 0-3.9 0.5-5.6 1.5 -2.6 1.5-4.5 3.9-5.3 6.9 -0.5 1.7-0.5 3.5-0.2 5.2l-9.3 1.5c-9.8 1.6-22.5 10.7-32.4 18.4 -5.4 4.3-7.9 7.4-7.6 9.5 0.2 1 0.9 1.7 2.2 2.2 0.5 0.2 1.1 0.3 1.7 0.3 2.9 0 8-2 21-8.3 13.9-6.7 25.5-15.9 27.7-17.7 2.1 2 4.9 3.2 7.9 3.2 2 0 3.9-0.5 5.6-1.5 2.6-1.5 4.5-3.9 5.3-6.9 0.5-1.9 0.5-3.9 0-5.8l9.2-1.5c9.8-1.6 22.5-10.7 32.4-18.4 5.4-4.3 7.9-7.4 7.6-9.5C310 272.2 309.2 271.5 308 271z" />
                                <path className="techgrid-blade" fill="rgba(6,182,212,0.5)" d="M140.3 327.8c-9.9-7.7-22.6-16.8-32.4-18.3l-9.3-1.5c0.3-1.7 0.3-3.5-0.2-5.2 -0.8-2.9-2.7-5.4-5.3-6.9 -1.7-1-3.6-1.5-5.6-1.5 -2.8 0-5.4 1-7.4 2.8 -1.7-1.4-13.6-10.9-27.9-17.8 -13-6.2-18.1-8.2-21-8.2 -0.6 0-1.2 0.1-1.7 0.3 -1.3 0.5-2 1.2-2.2 2.2 -0.3 2.2 2.1 5.3 7.6 9.5 9.9 7.7 22.6 16.8 32.4 18.3l9.2 1.4c-0.5 1.9-0.5 3.9 0.1 5.8 0.8 2.9 2.7 5.4 5.3 6.9 1.7 1 3.6 1.5 5.6 1.5 3 0 5.8-1.2 7.9-3.2 2.2 1.8 13.8 11 27.7 17.6 13 6.2 18.1 8.2 21 8.2 0.6 0 1.2-0.1 1.7-0.3 1.3-0.5 2-1.2 2.2-2.2C148.3 335.1 145.8 332 140.3 327.8z" />
                                <path className="techgrid-blade" fill="rgba(6,182,212,0.5)" d="M19 161.4l3.3-8.8c3.5-9.3 1.8-24.8 0-37.2 -1.1-7.7-2.9-11.5-5.4-11.5 -0.7 0-1.4 0.3-2.2 1 -2.3 1.9-3.1 6.6-4.3 23.6 -1 15.4 1.2 30 1.7 32.8 -4.7 1.4-8.2 5.7-8.2 10.9 0 5.2 3.5 9.6 8.4 10.9l-3.3 8.7c-3.5 9.3-1.8 24.8 0 37.2 1.1 7.7 2.9 11.5 5.4 11.5 0.7 0 1.4-0.3 2.2-1 2.3-1.9 3.1-6.6 4.3-23.6 1.1-15.8-1.3-30.8-1.7-33 4.4-1.6 7.6-5.8 7.6-10.7C26.8 167.1 23.5 162.9 19 161.4z" />
                                <path className="techgrid-blade" fill="rgba(6,182,212,0.5)" d="M146.3 2.1c-1.5-1.8-5.5-1.3-12.4 1.4 -11.7 4.6-26 10.8-32.3 18.5l-5.9 7.1c-2.1-2.1-5-3.3-8-3.3 -2 0-3.9 0.5-5.6 1.5 -4.5 2.5-6.5 7.7-5.4 12.5 -2.7 1-16.5 6.3-29.3 14.8C33 64 29.4 67 28.8 69.9c-0.2 1.1-0.1 2 0.5 2.7 0.6 0.7 1.6 1.1 3 1.1h0c2.1 0 5.3-0.8 9.4-2.4 11.7-4.6 26-10.8 32.3-18.5l6.1-7.3c2.1 1.9 4.7 2.9 7.6 2.9 2 0 3.9-0.5 5.6-1.5 4.3-2.4 6.4-7.3 5.5-11.9 2.1-0.8 16.3-6.1 29.5-14.9 14.3-9.5 17.9-12.5 18.4-15.4C147 3.7 146.8 2.8 146.3 2.1z" />
                                <path className="techgrid-blade" fill="rgba(6,182,212,0.5)" d="M307.9 69c-0.6-2.9-4.2-5.9-18.5-15.4C276.5 45.2 262.7 39.9 260 39c1.1-4.8-1-9.9-5.5-12.5 -1.7-1-3.6-1.5-5.6-1.5 -3.1 0-5.9 1.2-8.1 3.3l-5.9-7.1c-6.4-7.6-20.7-13.8-32.4-18.4 -6.8-2.7-10.9-3.1-12.4-1.3 -0.5 0.6-0.7 1.6-0.5 2.7 0.6 2.9 4.2 5.9 18.5 15.4 13.2 8.7 27.4 14 29.6 14.8 -0.3 1.6-0.2 3.3 0.2 5 0.8 2.9 2.7 5.4 5.3 6.9 1.7 1 3.6 1.5 5.6 1.5 2.9 0 5.6-1.1 7.6-3l6.1 7.3c6.4 7.6 20.7 13.8 32.4 18.4 4.1 1.6 7.2 2.4 9.4 2.4 1.4 0 2.4-0.4 3-1.1C308 71.1 308.1 70.2 307.9 69z" />
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

                        {/* Compass labels */}
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
