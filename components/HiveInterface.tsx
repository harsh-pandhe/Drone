'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import POIModal from './POIModal';

const poiData = [
    {
        id: 'assembly',
        label: 'Assembly Station',
        x: '28%',
        y: '18%',
        title: 'Assembly Station',
        description:
            'Hands-on drone assembly area where you\'ll learn to build a complete drone from individual components — frame, motors, ESCs, and flight controller.',
        specs: [
            { label: 'Duration', value: 'Full Day' },
            { label: 'Skill Level', value: 'Beginner' },
            { label: 'Tools', value: 'All Provided' },
        ],
    },
    {
        id: 'simulator',
        label: 'Flight Simulator',
        x: '72%',
        y: '32%',
        title: 'Flight Simulator Lab',
        description:
            'Practice drone flying in a safe virtual environment before taking to real flight. Master throttle, yaw, pitch, and roll controls with zero risk.',
        specs: [
            { label: 'Simulators', value: '10 Stations' },
            { label: 'Modes', value: 'Beginner to Pro' },
            { label: 'Practice', value: 'Unlimited' },
        ],
    },
    {
        id: 'theory',
        label: 'Theory Lab',
        x: '50%',
        y: '68%',
        title: 'Theory & Safety Lab',
        description:
            'Interactive classroom sessions covering aerodynamics, battery safety, drone regulations, and pre-flight checklists — everything you need before your first flight.',
        specs: [
            { label: 'Topics', value: '12 Modules' },
            { label: 'Materials', value: 'Included' },
            { label: 'Certificate', value: 'On Completion' },
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
                            {'/// WORKSHOP ZONES'}
                        </span>
                        <h2 className="text-4xl md:text-5xl font-rajdhani font-bold mb-4 text-white">
                            Inside the{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Workshop
                            </span>
                        </h2>
                        <p className="text-slate-400 font-inter max-w-xl mx-auto text-base">
                            Explore the three core zones of our hands-on workshop.
                            Tap a node to learn more.
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
