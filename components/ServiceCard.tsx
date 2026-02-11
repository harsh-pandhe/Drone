'use client';
import { motion } from 'framer-motion';
import { ServiceItem } from '@/data/services';

// Inline SVG icons
const icons: Record<string, JSX.Element> = {
    lidar: (
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="20" cy="20" r="3" fill="currentColor" />
            <path d="M20 5v6M20 29v6M5 20h6M29 20h6" strokeLinecap="round" />
            <circle cx="20" cy="20" r="12" strokeDasharray="4 3" />
            <path d="M10 10l4 4M26 26l4 4M10 30l4-4M26 14l4-4" strokeLinecap="round" />
        </svg>
    ),
    ortho: (
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="8" y="8" width="24" height="18" rx="2" />
            <circle cx="20" cy="17" r="5" />
            <circle cx="20" cy="17" r="2" fill="currentColor" />
            <path d="M14 30h12M20 26v4" strokeLinecap="round" />
        </svg>
    ),
    thermal: (
        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 6v4M20 30v4M6 20h4M30 20h4" strokeLinecap="round" />
            <circle cx="20" cy="20" r="8" />
            <circle cx="20" cy="20" r="4" strokeDasharray="2 2" />
            <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            <path d="M12 12l2 2M26 26l2 2M12 28l2-2M26 14l2-2" strokeLinecap="round" opacity="0.5" />
        </svg>
    ),
};

export default function ServiceCard({
    service,
    index,
}: {
    service: ServiceItem;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
            className="group relative glass-card hover:border-cyan-500/50 transition-all duration-500 p-8 overflow-hidden rounded-lg"
        >
            {/* Hover highlight gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Top scanline on hover */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/60 transition-all duration-500" />

            {/* Technical header */}
            <div className="flex justify-between items-start mb-6 relative">
                <div className="flex items-center gap-3">
                    <div className="text-cyan-500/70 group-hover:text-cyan-400 transition-colors">
                        {icons[service.id]}
                    </div>
                    <div className="font-mono text-[10px] text-cyan-500/50 tracking-wider">
                        SYS_ID: 0{index + 1}
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-slate-600 group-hover:bg-green-400 rounded-full transition-colors duration-300" />
                    <span className="font-mono text-[9px] text-slate-600 group-hover:text-green-400/70 transition-colors">
                        ONLINE
                    </span>
                </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-rajdhani font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors relative">
                {service.title}
            </h3>

            {/* Description */}
            <p className="text-slate-400 mb-6 font-inter text-sm leading-relaxed relative">
                {service.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6 relative">
                {service.features.map((f) => (
                    <span
                        key={f}
                        className="px-2.5 py-1 text-[11px] font-mono text-cyan-400/80 bg-cyan-500/10 border border-cyan-500/20 rounded group-hover:border-cyan-500/40 transition-colors"
                    >
                        {f}
                    </span>
                ))}
            </div>

            {/* Data grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-700/50 pt-5 relative">
                <div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">
                        Accuracy
                    </div>
                    <div className="text-cyan-400 font-rajdhani font-semibold text-lg">
                        {service.accuracy}
                    </div>
                </div>
                <div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-1">
                        Coverage
                    </div>
                    <div className="text-cyan-400 font-rajdhani font-semibold text-lg">
                        {service.speed}
                    </div>
                </div>
            </div>

            {/* Corner accents */}
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-slate-700 group-hover:border-cyan-500/50 transition-colors duration-300 rounded-br-lg" />
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-slate-700 group-hover:border-cyan-500/50 transition-colors duration-300 rounded-tl-lg" />
        </motion.div>
    );
}
