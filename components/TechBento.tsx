'use client';
import { motion } from 'framer-motion';
import CountUp from './CountUp';

const bentoItems = [
    {
        title: 'Drone Assembly',
        description: 'Learn to build a complete drone from components — frame, motors, ESCs, and flight controller.',
        span: 'md:col-span-2',
        icon: (
            <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 30L14 18l6 8 10-16" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="14" cy="18" r="2" fill="currentColor" />
                <circle cx="20" cy="26" r="2" fill="currentColor" />
                <circle cx="30" cy="10" r="2" fill="currentColor" />
            </svg>
        ),
        stat: { value: 100, suffix: '%', label: 'Hands-On Learning' },
    },
    {
        title: 'Flight Controls',
        description: 'Master throttle, yaw, pitch, and roll — from hovering to confident maneuvering.',
        span: '',
        icon: (
            <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="18" cy="18" r="12" strokeDasharray="4 3" />
                <circle cx="12" cy="16" r="3" />
                <circle cx="24" cy="16" r="3" />
                <circle cx="18" cy="24" r="3" />
                <line x1="14.5" y1="17" x2="21.5" y2="17" />
                <line x1="13.5" y1="18.5" x2="16.5" y2="22.5" />
                <line x1="22.5" y1="18.5" x2="19.5" y2="22.5" />
            </svg>
        ),
        stat: { value: 4, suffix: ' Axes', label: 'Of Control' },
    },
    {
        title: 'Safety Protocols',
        description: 'Pre-flight checklists, battery handling, emergency procedures, and airspace rules.',
        span: '',
        icon: (
            <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="8" y="10" width="20" height="16" rx="2" />
                <path d="M14 10V7M22 10V7M14 26v3M22 26v3" strokeLinecap="round" />
                <path d="M13 18h10M18 14v8" strokeLinecap="round" />
            </svg>
        ),
        stat: { value: 12, suffix: '+', label: 'Safety Topics' },
    },
    {
        title: 'FPV Flying',
        description: 'Master ultra-low latency FPV flight and real-time high-definition video transmission during live training.',
        span: '',
        icon: (
            <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 28l6-8 5 4 6-10 5 6 6-12" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="18" cy="18" r="2" fill="currentColor" />
            </svg>
        ),
        stat: { value: 3, suffix: ' Hrs', label: 'Flight Time' },
    },
    {
        title: 'Maintenance',
        description: 'Learn to troubleshoot, repair, and maintain your drone for long-lasting performance.',
        span: '',
        icon: (
            <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M10 24a6 6 0 01-.5-12A8 8 0 0126 14a5 5 0 01-1 10H10z" />
                <path d="M18 20v8M15 25l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        stat: { value: 5, suffix: '+', label: 'Repair Skills' },
    },
    {
        title: 'Certification',
        description: 'Earn your workshop completion certificate — proof of your drone building and flying skills.',
        span: 'md:col-span-2',
        icon: (
            <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="18" cy="18" r="14" />
                <circle cx="18" cy="18" r="8" />
                <circle cx="18" cy="18" r="2" fill="currentColor" />
                <path d="M18 4v4M18 28v4M4 18h4M28 18h4" strokeLinecap="round" />
            </svg>
        ),
        stat: { value: 1, suffix: '', label: 'Official Certificate' },
    },
];

export default function TechBento() {
    return (
        <section className="relative py-24 md:py-32 px-6">
            <div className="absolute inset-0 grid-bg opacity-5" />

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-cyan-500 text-xs tracking-[0.3em] block mb-3">
                        {'/// SKILLS'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 text-white">
                        Skills You&apos;ll{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Master
                        </span>
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
                </motion.div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {bentoItems.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className={`bento-card p-6 md:p-8 group hover:scale-[1.02] transition-transform duration-300 ${item.span}`}
                        >
                            <div className="text-cyan-500/70 group-hover:text-cyan-400 transition-colors mb-4">
                                {item.icon}
                            </div>
                            <h3 className="font-rajdhani font-bold text-xl text-white mb-2 group-hover:text-cyan-100 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-slate-400 text-sm font-inter leading-relaxed">
                                {item.description}
                            </p>
                            {item.stat && (
                                <div className="mt-4 pt-4 border-t border-slate-700/40">
                                    <CountUp
                                        target={item.stat.value}
                                        suffix={item.stat.suffix}
                                        className="font-rajdhani font-bold text-2xl text-cyan-400"
                                    />
                                    <span className="block font-mono text-[9px] text-slate-500 tracking-wider mt-1">
                                        {item.stat.label}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
