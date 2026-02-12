'use client';
import { motion } from 'framer-motion';

const processSteps = [
    {
        num: '01',
        title: 'Site Assessment',
        description:
            'GIS analysis of the target area, airspace de-confliction, and flight-path simulation before boots ever touch the ground.',
        detail: 'Typical turnaround: 24 hrs',
        icon: (
            <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="14" cy="14" r="11" />
                <path d="M14 6v8l5 3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        num: '02',
        title: 'Data Acquisition',
        description:
            'Autonomous multi-pass flights capturing overlapping LiDAR sweeps, 61 MP nadir photography, and calibrated thermal imagery.',
        detail: 'Up to 1,200 acres / day',
        icon: (
            <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="8" width="20" height="14" rx="2" />
                <circle cx="14" cy="15" r="4" />
                <circle cx="14" cy="15" r="1.5" fill="currentColor" />
                <path d="M10 8V6h8v2" />
            </svg>
        ),
    },
    {
        num: '03',
        title: 'Processing & QA',
        description:
            'Point-cloud alignment, photogrammetric bundle adjustment, and automated quality metrics — powered by edge + cloud compute.',
        detail: 'Delivered within 48 hrs',
        icon: (
            <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 14h4l3-6 4 12 3-8h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        num: '04',
        title: 'Deliverables',
        description:
            'Georeferenced point clouds, orthomosaics, DSM/DTMs, and interactive 3D models available on your secure dashboard.',
        detail: 'Formats: LAS, GeoTIFF, OBJ',
        icon: (
            <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 20V8l8-4 8 4v12l-8 4-8-4z" />
                <path d="M6 8l8 4 8-4M14 12v12" />
            </svg>
        ),
    },
];

export default function ProcessRow() {
    return (
        <section className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-[#0B1120] to-[#0f172a]">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-cyan-500 text-xs tracking-[0.3em] block mb-3">
                        {'/// WORKFLOW'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 text-white">
                        How We{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Deliver
                        </span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical connecting line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px border-l border-dashed border-cyan-500/20 -translate-x-1/2" />

                    <div className="space-y-12 md:space-y-16">
                        {processSteps.map((step, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1, duration: 0.6 }}
                                    className={`relative flex items-start gap-6 md:gap-0 ${isLeft
                                            ? 'md:flex-row md:pr-[calc(50%+2rem)]'
                                            : 'md:flex-row-reverse md:pl-[calc(50%+2rem)]'
                                        }`}
                                >
                                    {/* Timeline node */}
                                    <div className="absolute left-6 md:left-1/2 w-10 h-10 -translate-x-1/2 rounded-full border border-cyan-500/40 bg-slate-900 flex items-center justify-center z-10 shrink-0">
                                        <span className="font-mono text-[10px] text-cyan-400 font-bold">
                                            {step.num}
                                        </span>
                                    </div>

                                    {/* Content card */}
                                    <div className="ml-14 md:ml-0 glass-card rounded-lg p-6 group hover:border-cyan-500/40 transition-all duration-300 flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="text-cyan-500/70 group-hover:text-cyan-400 transition-colors">
                                                {step.icon}
                                            </div>
                                            <h3 className="font-rajdhani font-bold text-xl text-white group-hover:text-cyan-100 transition-colors">
                                                {step.title}
                                            </h3>
                                        </div>
                                        <p className="text-slate-400 text-sm font-inter leading-relaxed mb-3">
                                            {step.description}
                                        </p>
                                        <span className="inline-block font-mono text-[10px] text-cyan-500/70 tracking-wider bg-cyan-500/5 px-2 py-1 rounded border border-cyan-500/10">
                                            {step.detail}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
