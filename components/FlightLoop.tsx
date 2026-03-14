'use client';
import { motion } from 'framer-motion';

const steps = [
    {
        num: '01',
        title: 'Day 1: Theory',
        description: 'Learn drone fundamentals — aerodynamics, components, safety rules, and regulations.',
        icon: (
            <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="4" width="24" height="24" rx="3" />
                <path d="M4 12h24M12 4v24" strokeDasharray="3 2" />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
            </svg>
        ),
    },
    {
        num: '02',
        title: 'Day 2: Assembly',
        description: 'Hands-on soldering, wiring, and building a complete drone from parts to power-up.',
        icon: (
            <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 28V8M16 8l-6 6M16 8l6 6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 4h20" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        num: '03',
        title: 'Day 3: Flying',
        description: 'Take the controls! Guided flying sessions from hovering to confident maneuvering.',
        icon: (
            <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="16" cy="16" r="10" />
                <circle cx="16" cy="16" r="4" />
                <circle cx="16" cy="16" r="1.5" fill="currentColor" />
                <path d="M16 2v4M16 26v4M2 16h4M26 16h4" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        num: '04',
        title: 'Certification',
        description: 'Complete the workshop and receive your official drone pilot training certificate.',
        icon: (
            <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="6" y="6" width="20" height="20" rx="2" />
                <path d="M6 16h20M16 6v20" />
                <circle cx="11" cy="11" r="1.5" fill="currentColor" />
                <circle cx="21" cy="21" r="1.5" fill="currentColor" />
                <circle cx="21" cy="11" r="1.5" fill="currentColor" />
                <circle cx="11" cy="21" r="1.5" fill="currentColor" />
            </svg>
        ),
    },
];

export default function FlightLoop() {
    return (
        <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-[#0f172a] to-[#0B1120]">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <span className="font-mono text-cyan-500 text-xs tracking-[0.3em] block mb-3">
                        {'/// WORKSHOP FLOW'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 text-white">
                        3-Day{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Journey
                        </span>
                    </h2>
                </motion.div>

                {/* Steps — horizontal on desktop, vertical on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
                    {/* Connecting line (desktop) */}
                    <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px border-t border-dashed border-cyan-500/30" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="relative flex flex-col items-center text-center"
                        >
                            {/* Step circle */}
                            <div className="relative z-10 w-24 h-24 rounded-full border border-cyan-500/30 bg-slate-900/80 flex items-center justify-center mb-5 group hover:border-cyan-400/60 transition-colors duration-300">
                                <div className="text-cyan-500/80 group-hover:text-cyan-400 transition-colors">
                                    {step.icon}
                                </div>
                                {/* Step number */}
                                <span className="absolute -top-2 -right-1 font-mono text-[10px] text-cyan-400 bg-slate-900 border border-cyan-500/30 rounded-full w-6 h-6 flex items-center justify-center">
                                    {step.num}
                                </span>
                            </div>

                            <h3 className="font-rajdhani font-bold text-xl text-white mb-2">
                                {step.title}
                            </h3>
                            <p className="text-slate-400 text-sm font-inter leading-relaxed max-w-[220px]">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
