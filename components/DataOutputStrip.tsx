'use client';

const formats = [
    'LAS / LAZ',
    'GeoTIFF',
    'OBJ / FBX',
    'DXF / DWG',
    'Orthomosaic',
    'DSM / DTM',
    'Point Cloud',
    'KML / KMZ',
    'Thermal Map',
    'NDVI Index',
    'CSV Reports',
    '3D Mesh',
];

export default function DataOutputStrip() {
    // Duplicate for seamless loop
    const doubled = [...formats, ...formats];

    return (
        <section className="relative py-8 md:py-12 border-y border-slate-800/50 overflow-hidden bg-[#0B1120]">
            {/* Label — above on mobile, inline on desktop */}
            <div className="px-6 mb-3 md:mb-0 md:absolute md:left-6 md:top-1/2 md:-translate-y-1/2 z-10">
                <span className="font-mono text-[9px] text-cyan-500/60 tracking-[0.3em] uppercase">
                    Output Formats
                </span>
            </div>

            {/* Marquee */}
            <div className="marquee-strip ml-0 md:ml-40">
                <div className="inline-flex gap-4 animate-marquee">
                    {doubled.map((fmt, i) => (
                        <span
                            key={`${fmt}-${i}`}
                            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-[10px] sm:text-xs text-cyan-400/80 bg-cyan-500/5 border border-cyan-500/15 rounded-full whitespace-nowrap hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-colors"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                            {fmt}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
