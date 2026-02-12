'use client';
import { motion } from 'framer-motion';

const quickLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Technology', href: '#technology' },
    { label: 'Process', href: '#process' },
    { label: 'Compliance', href: '#compliance' },
];

const locations = [
    { city: 'Navi Mumbai', region: 'Maharashtra' },
    { city: 'Pune', region: 'Maharashtra' },
];

const socials = [
    {
        label: 'LinkedIn',
        href: '#',
        icon: (
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                <path d="M5 3a2 2 0 11-4 0 2 2 0 014 0zM1 6h4v12H1V6zm6 0h3.5v1.7h.05A3.85 3.85 0 0114.1 5.7C17.4 5.7 18 7.9 18 10.8V18h-4v-6.4c0-1.6 0-3.5-2.1-3.5S9.5 10 9.5 11.6V18H5.5V6H7z" />
            </svg>
        ),
    },
    {
        label: 'Twitter',
        href: '#',
        icon: (
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                <path d="M18.9 4.5c-.6.3-1.3.5-2 .6a3.5 3.5 0 001.5-1.9 7 7 0 01-2.2.8 3.5 3.5 0 00-5.9 3.2A10 10 0 012.3 3.4a3.5 3.5 0 001.1 4.7 3.5 3.5 0 01-1.6-.4v0a3.5 3.5 0 002.8 3.4 3.5 3.5 0 01-1.6 0 3.5 3.5 0 003.3 2.4A7 7 0 011 15.5a10 10 0 005.3 1.6c6.4 0 9.9-5.3 9.9-9.9v-.5c.7-.5 1.3-1.1 1.7-1.8z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        href: '#',
        icon: (
            <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                <path fillRule="evenodd" d="M10 0a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7C4.73 17.93 4.14 16 4.14 16a2.69 2.69 0 00-1.13-1.49c-.92-.63.07-.62.07-.62a2.13 2.13 0 011.56 1.05 2.16 2.16 0 002.95.84 2.16 2.16 0 01.64-1.35c-2.23-.25-4.56-1.11-4.56-4.95a3.87 3.87 0 011.03-2.69 3.6 3.6 0 01.1-2.65s.84-.27 2.75 1.02a9.47 9.47 0 015 0c1.91-1.3 2.75-1.02 2.75-1.02a3.6 3.6 0 01.1 2.65 3.87 3.87 0 011.03 2.69c0 3.85-2.34 4.7-4.57 4.95a2.42 2.42 0 01.69 1.88v2.78c0 .27.18.58.69.48A10 10 0 0010 0z" clipRule="evenodd" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="relative border-t border-slate-800/50 bg-[#0B1120]">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
                >
                    {/* Brand column */}
                    <div>
                        <div className="font-rajdhani font-bold text-2xl text-white tracking-wider mb-3">
                            ASC<span className="text-cyan-400">END</span>
                        </div>
                        <p className="text-slate-400 text-sm font-inter leading-relaxed mb-5 max-w-xs">
                            Precision aerial surveying & digital twin creation. Turning
                            physical landscapes into actionable data.
                        </p>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="font-mono text-[10px] text-green-400/70 tracking-wider">
                                ALL SYSTEMS NOMINAL
                            </span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-rajdhani font-bold text-sm text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 text-sm font-inter hover:text-cyan-400 transition-colors flex items-center gap-2"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Locations */}
                    <div>
                        <h4 className="font-rajdhani font-bold text-sm text-white uppercase tracking-wider mb-4">
                            Locations
                        </h4>
                        <ul className="space-y-3">
                            {locations.map((loc) => (
                                <li key={loc.city} className="flex items-start gap-2">
                                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 mt-0.5 text-cyan-500/60 shrink-0" fill="currentColor">
                                        <path d="M8 0a5 5 0 00-5 5c0 3.5 5 11 5 11s5-7.5 5-11a5 5 0 00-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                    <div>
                                        <div className="text-slate-300 text-sm font-inter">{loc.city}</div>
                                        <div className="text-slate-500 text-xs font-inter">{loc.region}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className="font-rajdhani font-bold text-sm text-white uppercase tracking-wider mb-4">
                            Connect
                        </h4>
                        <div className="space-y-2.5 mb-5">
                            <a
                                href="mailto:harshpandhehome@gmail.com"
                                className="text-slate-400 text-sm font-inter hover:text-cyan-400 transition-colors flex items-center gap-2"
                            >
                                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-cyan-500/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2">
                                    <rect x="1" y="3" width="14" height="10" rx="1.5" />
                                    <path d="M1 4l7 5 7-5" />
                                </svg>
                                harshpandhehome@gmail.com
                            </a>
                            <a
                                href="tel:+917208783332"
                                className="text-slate-400 text-sm font-inter hover:text-cyan-400 transition-colors flex items-center gap-2"
                            >
                                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-cyan-500/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2">
                                    <path d="M3.6 1.4L5.4 1a.8.8 0 01.9.5l1 2.3a.8.8 0 01-.2.9L5.9 5.9a8.3 8.3 0 004.2 4.2l1.2-1.2a.8.8 0 01.9-.2l2.3 1a.8.8 0 01.5.9l-.4 1.8a.8.8 0 01-.8.6A12.5 12.5 0 011 3.2a.8.8 0 01.6-.8z" />
                                </svg>
                                +91 72087 83332
                            </a>
                            <div className="text-slate-400 text-sm font-inter flex items-center gap-2">
                                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-cyan-500/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2">
                                    <circle cx="8" cy="8" r="6.5" />
                                    <path d="M5 6a3 3 0 016 0c0 1.5-1.2 2.5-2.2 3.2-.4.3-.8.6-.8.8v1M8 13v.5" strokeLinecap="round" />
                                </svg>
                                @harshpandhe
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Bottom bar */}
                <div className="border-t border-slate-800/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="font-mono text-[10px] text-slate-600">
                        © 2026 ASCEND Systems — Harsh Pandhe. All rights reserved.
                    </div>
                    <div className="font-mono text-[10px] text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
                        v2.4.0 — Mission Control
                    </div>
                </div>
            </div>
        </footer>
    );
}
