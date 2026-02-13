'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Shimmer({ className = '' }: { className?: string }) {
    return (
        <div className={`relative overflow-hidden rounded-lg bg-slate-800/60 ${className}`}>
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
        </div>
    );
}

export default function PreLoader() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 2500);
        if (document.readyState === 'complete') {
            setTimeout(() => setVisible(false), 800);
        } else {
            const onLoad = () => setTimeout(() => setVisible(false), 800);
            window.addEventListener('load', onLoad);
            return () => {
                clearTimeout(timer);
                window.removeEventListener('load', onLoad);
            };
        }
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0f172a]"
                >
                    {/* Subtle grid backdrop */}
                    <div className="absolute inset-0 grid-bg opacity-5" />

                    {/* Skeleton structure mimicking page layout */}
                    <div className="w-full max-w-4xl px-8 space-y-8">
                        {/* Skeleton navbar */}
                        <div className="flex items-center justify-between">
                            <Shimmer className="w-24 h-6" />
                            <div className="hidden sm:flex gap-4">
                                <Shimmer className="w-16 h-4" />
                                <Shimmer className="w-16 h-4" />
                                <Shimmer className="w-16 h-4" />
                            </div>
                        </div>

                        {/* Skeleton hero */}
                        <div className="flex flex-col items-center gap-4 py-12">
                            <Shimmer className="w-64 h-12 rounded-xl" />
                            <Shimmer className="w-48 h-5" />
                            <Shimmer className="w-80 h-3 mt-4" />
                        </div>

                        {/* Skeleton cards grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Shimmer className="h-32 rounded-xl" />
                            <Shimmer className="h-32 rounded-xl" />
                            <Shimmer className="h-32 rounded-xl" />
                        </div>
                    </div>

                    {/* Drone SVG branding (kept small) */}
                    <div className="absolute bottom-16 flex flex-col items-center gap-3">
                        <svg
                            className="w-12 h-12 text-cyan-500/30"
                            viewBox="-55 -40 450 420"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <style>{`
                                .loader-blade {
                                    animation: blade-spin 0.6s linear infinite;
                                    transform-box: fill-box;
                                    transform-origin: 50% 50%;
                                }
                                @keyframes blade-spin {
                                    from { transform: rotate(0deg); }
                                    to   { transform: rotate(360deg); }
                                }
                            `}</style>
                            <path fill="currentColor" opacity="0.4" d="M325.2 159.8l-0.1 0c0 0-3.3-0.5-6.4-0.1 -6.3 0.7-11.6 3.2-14.9 5.1 -1.6 0.9-2.6 1.6-2.9 1.8h-54.3v-21.5c1.6-1.1 2.6-2.9 2.6-4.9 0-2-1-3.8-2.6-4.9v-2.7H240v2.7c-1.6 1.1-2.6 2.9-2.6 4.9 0 2 1 3.8 2.6 4.9v21.5H201V148c0-2.8-1.8-5.4-4.6-7.6l0 0 46.8-82.7c0.4-0.2 1.5-0.7 3-1.6 3.3-2 8-5.5 11.8-10.5 2.1-2.8 3.1-5.7 3.1-5.7 1.9-6.5-0.9-14-4.6-16.3l-0.4-0.2c-2.6-1.7-11.5-2-16.6 4.3 0 0-2 2.3-3.2 5.6 -2.4 5.7-2.9 11.6-2.9 15.5 0 2.2 0.2 3.5 0.2 3.6l0 0.3 0.4 0.2 -43.5 76.8v-19.9c0-1.7-1.4-3.1-3.1-3.1 -1.7 0-3.1 1.4-3.1 3.1v24.2c-7.8-3-12.8-3.9-15.6-3.9 -2.6 0-9.8 1.6-16.8 4.4v-24.6c0-1.7-1.4-3.1-3.1-3.1s-3.1 1.4-3.1 3.1v19.9l-43.3-76 0.4-0.2 0-0.3c0-0.1 0.2-1.4 0.2-3.6 0-3-0.5-7.2-1.8-11.7 -0.3-1.2-0.7-2.5-1.2-3.8C99 30.3 97 28.4 97 28.4 92.7 23 83.9 22 80.2 24.1c-3.9 2.2-6.8 9.9-4.8 16.5 0 0 0.9 3 3.1 5.7 3.7 5.1 8.5 8.5 11.8 10.4 1.5 0.9 2.6 1.4 3 1.6l47.1 82.6c-2.3 2.1-3.8 4.4-3.8 7v18.6H97.7V145c1.6-1.1 2.6-2.9 2.6-4.9 0-2-1-3.8-2.6-4.9v-2.7h-6.6v2.7c-1.6 1.1-2.6 2.9-2.6 4.9 0 2 1 3.8 2.6 4.9v21.5H36.8c-0.3-0.2-1.3-0.9-2.9-1.8 -3.4-1.9-8.7-4.4-14.9-5.1 0 0-3.2-0.4-6.5 0.1 -6.7 1.6-11.9 7.9-11.9 12.4 0 4.2 3.8 11.1 12 12.5 2.6 0.4 6.5 0 6.5 0 6.2-0.7 11.5-3.2 14.9-5.1 1.9-1.1 3-1.9 3-1.9l0.2-0.2V177h54v40.6l0 22.4c-1.6 1.1-2.7 3-2.7 4.9 0 1.9 1.1 3.5 2.7 4.6l0 1.7h6.6v-1.7c1.6-1.1 2.7-2.7 2.7-4.6 0-1.9-1.1-3.8-2.7-4.9v-22.4h2.3l4.9-7.9 0 0h22.6l0 0c-0.4 1.1-0.5 2.1-0.2 3.2 0.4 1.5 1.7 2.8 4 4 0.3 0.1 0.5 0.3 0.8 0.4l-38.1 67.2 -0.4-0.2 -0.2 0.1c-0.1 0-1.3 0.6-3.2 1.7 -3.3 2-8.1 5.4-11.8 10.4 0 0-1.6 1.4-3.2 5.7 -2.8 7.8 1.3 14.5 5 16.6 1.2 0.7 2.7 1 4.5 1 4 0 8.9-1.8 12.2-5.3 0 0 2.1-2.4 3.3-5.6 2.5-5.8 2.9-11.6 2.9-15.5 0-1.8-0.1-3-0.2-3.4l37.8-66.7c0.7 1.1 1.2 2.4 1.5 3.9 0.9 6.6 4.2 30.1 5.5 36.3 0.9 4.2 2 7.6 8.3 9.3 3 0.8 7.2 1.2 13 1.2h0.1 0c5.3 0 9.3-0.4 12.3-1 6.9-1.6 8.1-5.1 9-9.5 1.2-6.2 4.6-29.7 5.5-36.3 0.2-1.5 0.7-2.7 1.3-3.7l37.7 66.2c0 0.4-0.2 1.6-0.2 3.4 0 3.9 0.5 9.7 3 15.5 0 0 1.3 3.1 3.3 5.6 3.2 3.5 8.2 5.3 12.1 5.3 1.7 0 3.2-0.3 4.4-0.9l0.1-0.1c3.7-2.1 7.8-8.8 4.9-16.6 0 0-0.9-3.2-3.2-5.7 -3.7-5-8.4-8.4-11.8-10.4 -1.9-1.1-3.1-1.6-3.2-1.7L244 284l-0.4 0.2 -38.1-66.8c0.3-0.2 0.7-0.3 1-0.5 2.3-1.2 3.5-2.5 4-4 0.3-1 0.2-2.1-0.2-3.1h22.6l0 0 4.9 7.9h2.3v22.4c-1.6 1.1-2.7 3-2.7 4.9 0 1.9 1.1 3.5 2.7 4.6v1.7h6.6l0-1.7c1.6-1.1 2.7-2.7 2.7-4.6 0-1.9-1.1-3.8-2.7-4.9l0-22.4V177h54v0.5l0.2 0.2c0 0 1.1 0.9 3 1.9 3.4 1.9 8.7 4.4 14.9 5.1 3.1 0.6 6.5 0 6.5 0 8.2-1.4 12-8.3 12-12.5C337.2 167.7 332 161.3 325.2 159.8z" />
                            <path className="loader-blade" fill="currentColor" opacity="0.6" d="M325.3 183.1c4.8-1.3 8.3-5.7 8.3-10.9 0-5.1-3.4-9.5-8.2-10.9 0.5-2.8 2.7-17.4 1.7-32.8 -1.2-17.1-2-21.7-4.3-23.6 -0.7-0.6-1.5-1-2.2-1 -2.5 0-4.2 3.7-5.3 11.5 -1.8 12.4-3.5 27.9 0 37.2l3.3 8.8c-4.5 1.5-7.8 5.8-7.8 10.8 0 4.9 3.2 9.1 7.6 10.7 -0.4 2.3-2.8 17.2-1.7 33 1.2 17.1 2 21.7 4.3 23.6 0.7 0.6 1.5 1 2.2 1 2.5 0 4.2-3.7 5.3-11.5 1.8-12.4 3.5-27.9 0-37.2L325.3 183.1z" />
                            <path className="loader-blade" fill="currentColor" opacity="0.6" d="M19 161.4l3.3-8.8c3.5-9.3 1.8-24.8 0-37.2 -1.1-7.7-2.9-11.5-5.4-11.5 -0.7 0-1.4 0.3-2.2 1 -2.3 1.9-3.1 6.6-4.3 23.6 -1 15.4 1.2 30 1.7 32.8 -4.7 1.4-8.2 5.7-8.2 10.9 0 5.2 3.5 9.6 8.4 10.9l-3.3 8.7c-3.5 9.3-1.8 24.8 0 37.2 1.1 7.7 2.9 11.5 5.4 11.5 0.7 0 1.4-0.3 2.2-1 2.3-1.9 3.1-6.6 4.3-23.6 1.1-15.8-1.3-30.8-1.7-33 4.4-1.6 7.6-5.8 7.6-10.7C26.8 167.1 23.5 162.9 19 161.4z" />
                        </svg>
                        <div className="flex gap-1">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Brand watermark */}
                    <div className="absolute bottom-8 font-mono text-[10px] text-slate-700 tracking-[0.3em]">
                        ASCEND SYSTEMS
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
