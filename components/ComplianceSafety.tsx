'use client';
import { motion } from 'framer-motion';
import CountUp from './CountUp';

const badges = [
    {
        title: 'FAA Part 107',
        description: 'Fully certified for commercial UAS operations across all US airspace classes.',
        icon: (
            <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M16 3l12 7v10c0 6-5 9-12 12C9 29 4 26 4 20V10l12-7z" />
                <path d="M11 16l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        stat: { value: 5000, suffix: '+', label: 'Flight Hours' },
    },
    {
        title: 'Data Privacy',
        description: 'GDPR-aligned data handling with end-to-end encryption and customer-owned storage.',
        icon: (
            <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.4">
                <rect x="8" y="14" width="16" height="12" rx="2" />
                <path d="M12 14v-3a4 4 0 018 0v3" />
                <circle cx="16" cy="21" r="2" fill="currentColor" />
            </svg>
        ),
        stat: { value: 256, suffix: '-bit', label: 'Encryption' },
    },
    {
        title: 'ISO 9001',
        description: 'Quality management certified — every deliverable meets rigorous accuracy standards.',
        icon: (
            <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="16" cy="16" r="12" />
                <path d="M16 8v8l4 4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 4l2 2M22 4l-2 2" strokeLinecap="round" />
            </svg>
        ),
        stat: { value: 99, suffix: '.8%', label: 'Accuracy Rate' },
    },
];

export default function ComplianceSafety() {
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
                        {'/// COMPLIANCE & SAFETY'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 text-white">
                        Trust &{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Certification
                        </span>
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {badges.map((badge, i) => (
                        <motion.div
                            key={badge.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.5 }}
                            className="glass-card rounded-xl p-8 text-center group hover:border-cyan-500/40 transition-all duration-300"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-500/70 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors mb-5">
                                {badge.icon}
                            </div>
                            <h3 className="font-rajdhani font-bold text-xl text-white mb-2 group-hover:text-cyan-100 transition-colors">
                                {badge.title}
                            </h3>
                            <p className="text-slate-400 text-sm font-inter leading-relaxed">
                                {badge.description}
                            </p>
                            {badge.stat && (
                                <div className="mt-4 pt-3 border-t border-slate-700/30">
                                    <CountUp
                                        target={badge.stat.value}
                                        suffix={badge.stat.suffix}
                                        className="font-rajdhani font-bold text-xl text-cyan-400"
                                    />
                                    <span className="block font-mono text-[9px] text-slate-500 tracking-wider mt-0.5">
                                        {badge.stat.label}
                                    </span>
                                </div>
                            )}
                            {/* Check mark accent */}
                            <div className="mt-5 inline-flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                                <span className="font-mono text-[9px] text-green-400/70 tracking-wider">
                                    VERIFIED
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
