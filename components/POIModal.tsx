'use client';
import { motion } from 'framer-motion';

interface POIData {
    id: string;
    label: string;
    title: string;
    description: string;
    specs: { label: string; value: string }[];
}

export default function POIModal({
    poi,
    onClose,
}: {
    poi: POIData;
    onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg glass-card rounded-2xl p-5 sm:p-8 border-cyan-500/30 overflow-hidden"
            >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-slate-600 hover:border-cyan-500/50 text-slate-400 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 1l12 12M13 1L1 13" />
                    </svg>
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
                    <span className="font-mono text-[10px] text-cyan-500/70 tracking-wider uppercase">
                        {poi.label}
                    </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-rajdhani font-bold text-white mb-3">
                    {poi.title}
                </h3>

                <p className="text-slate-400 font-inter text-sm leading-relaxed mb-6">
                    {poi.description}
                </p>

                {/* Specs grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {poi.specs.map((spec) => (
                        <div
                            key={spec.label}
                            className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700/50"
                        >
                            <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                                {spec.label}
                            </div>
                            <div className="text-cyan-400 font-rajdhani font-semibold text-base">
                                {spec.value}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            </motion.div>
        </motion.div>
    );
}
