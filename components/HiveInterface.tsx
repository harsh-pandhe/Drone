'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import POIModal from './POIModal';

const poiData = [
    {
        id: 'nav',
        label: 'Navigation Core',
        x: '28%',
        y: '18%',
        title: 'Autonomous Navigation',
        description:
            'RTK-GPS and visual-inertial odometry fused for centimetre-level position accuracy — even in GPS-denied environments like under-bridge inspections.',
        specs: [
            { label: 'Position Accuracy', value: '±2 cm RTK' },
            { label: 'Update Rate', value: '200 Hz IMU' },
            { label: 'Fail-safe', value: 'Triple redundant' },
        ],
    },
    {
        id: 'sensor',
        label: 'Sensor Array',
        x: '72%',
        y: '32%',
        title: 'Multi-Sensor Payload',
        description:
            'Simultaneously captures LiDAR point clouds, RGB orthomosaics, and radiometric thermal data in a single flight pass — no payload swaps needed.',
        specs: [
            { label: 'LiDAR Points', value: '1.2M pts/sec' },
            { label: 'Camera', value: '61 MP Full-Frame' },
            { label: 'Thermal', value: '0.04°C NETD' },
        ],
    },
    {
        id: 'comms',
        label: 'Data Link',
        x: '50%',
        y: '68%',
        title: 'Encrypted Data Link',
        description:
            'AES-256 encrypted mesh radio delivers real-time telemetry and compressed preview imagery to the ground station up to 15 km line-of-sight.',
        specs: [
            { label: 'Range', value: '15 km LOS' },
            { label: 'Bandwidth', value: '100 Mbps' },
            { label: 'Encryption', value: 'AES-256' },
        ],
    },
];

export default function HiveInterface() {
    const [activePOI, setActivePOI] = useState<(typeof poiData)[0] | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    // SVG moves at 0.5x speed (parallax depth)
    const svgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <>
            <section ref={sectionRef} className="relative py-24 md:py-32 px-6 overflow-hidden">
                {/* Background grid */}
                <div className="absolute inset-0 grid-bg opacity-5" />

                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <span className="font-mono text-cyan-500 text-xs tracking-[0.3em] block mb-3">
                            {'/// HIVE INTERFACE'}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 text-white">
                            Anatomy of{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Autonomy
                            </span>
                        </h2>
                        <p className="text-slate-400 font-inter max-w-xl mx-auto text-base">
                            Explore the core subsystems powering fully autonomous survey
                            missions. Tap a node to learn more.
                        </p>
                    </motion.div>

                    {/* Hive SVG + POI overlay */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left — Interactive Hive SVG with parallax */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.8 }}
                            style={{ y: svgY }}
                            className="relative flex justify-center"
                        >
                            <div className="relative w-full max-w-md">
                                {/* Glow backdrop */}
                                <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full scale-110" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/hive.svg"
                                    alt="Hive drone interface"
                                    className="relative w-full h-auto drop-shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                                    style={{
                                        filter: 'hue-rotate(160deg) saturate(1.6) brightness(0.85)',
                                    }}
                                />

                                {/* POI dots */}
                                {poiData.map((poi) => (
                                    <button
                                        key={poi.id}
                                        onClick={() => setActivePOI(poi)}
                                        className="absolute group"
                                        style={{ left: poi.x, top: poi.y }}
                                        aria-label={`Learn about ${poi.label}`}
                                    >
                                        {/* Ping ring */}
                                        <span className="absolute -inset-2 rounded-full border border-cyan-400/40 animate-ping" />
                                        {/* Dot */}
                                        <span className="relative block w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.6)] group-hover:scale-125 transition-transform" />
                                        {/* Label */}
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] text-cyan-400/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-slate-900/80 px-2 py-0.5 rounded">
                                            {poi.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — Capabilities panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="space-y-6"
                        >
                            {poiData.map((poi, i) => (
                                <motion.div
                                    key={poi.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.12, duration: 0.5 }}
                                    onClick={() => setActivePOI(poi)}
                                    className="glass-card rounded-lg p-5 cursor-pointer hover:border-cyan-500/40 transition-all duration-300 group"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-glow" />
                                        <h3 className="font-rajdhani font-bold text-lg text-white group-hover:text-cyan-100 transition-colors">
                                            {poi.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-400 text-sm font-inter leading-relaxed line-clamp-2">
                                        {poi.description}
                                    </p>
                                    <span className="inline-block mt-3 font-mono text-[10px] text-cyan-500/70 tracking-wider">
                                        TAP TO EXPLORE →
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* POI Modal */}
            {activePOI && (
                <POIModal poi={activePOI} onClose={() => setActivePOI(null)} />
            )}
        </>
    );
}
