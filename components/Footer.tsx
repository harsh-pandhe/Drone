'use client';
import { motion } from 'framer-motion';

import Image from 'next/image';

const quickLinks = [
    { label: 'Workshop', href: '#services' },
    { label: 'Skills', href: '#technology' },
    { label: 'Schedule', href: '#process' },
    { label: 'Perks', href: '#compliance' },
];

const locations = [
    { city: 'STES Campus', region: 'Lonavala' },
];

const socials = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/iic.sit_lonavala/',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/school/sinhgad-institute-of-technology-sit-lonavala/',
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
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
                        <div className="flex items-center gap-3 mb-4 group">
                            <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-slate-700/50 bg-slate-900/50 p-1 flex items-center justify-center transition-transform group-hover:scale-110">
                                <Image
                                    src="/iic.png"
                                    alt="IIC Logo"
                                    width={36}
                                    height={36}
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-rajdhani font-bold text-2xl text-white tracking-widest uppercase">
                                IIC<span className="text-cyan-400 font-medium"> SIT</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm font-inter leading-relaxed mb-5 max-w-xs">
                            3-day hands-on drone workshop. Learn to build, fly,
                            and master drones with expert instructors.
                        </p>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="font-mono text-[10px] text-green-400/70 tracking-wider">
                                REGISTRATIONS OPEN
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
                            Location
                        </h4>
                        <ul className="space-y-3">
                            {locations.map((loc) => (
                                <li key={loc.city} className="flex items-start gap-2">
                                    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 mt-0.5 text-cyan-500/60 shrink-0" fill="currentColor">
                                        <path d="M8 0a5 5 0 00-5 5c0 3.5 5 11 5 11s5-7.5 5-11a5 5 0 00-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                    <div>
                                        <div className="text-slate-300 text-[11px] font-inter leading-tight">PCHH+FJ3, Kusgaon, Kusegaon Bk.,</div>
                                        <div className="text-slate-500 text-[10px] font-inter">Maharashtra 410401</div>
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
                                href="https://iicsit.in"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 text-sm font-inter hover:text-cyan-400 transition-colors flex items-center gap-2"
                            >
                                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-cyan-500/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2">
                                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM8 2a6 6 0 110 12A6 6 0 018 2z" />
                                    <circle cx="8" cy="8" r="2.5" />
                                </svg>
                                iicsit.in
                            </a>
                            <a
                                href="tel:+918007579894"
                                className="text-slate-400 text-sm font-inter hover:text-cyan-400 transition-colors flex items-center gap-2"
                            >
                                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-cyan-500/60 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2">
                                    <path d="M3.6 1.4L5.4 1a.8.8 0 01.9.5l1 2.3a.8.8 0 01-.2.9L5.9 5.9a8.3 8.3 0 004.2 4.2l1.2-1.2a.8.8 0 01.9-.2l2.3 1a.8.8 0 01.5.9l-.4 1.8a.8.8 0 01-.8.6A12.5 12.5 0 011 3.2a.8.8 0 01.6-.8z" />
                                </svg>
                                +91 80075 79894
                            </a>
                        </div>
                        <div className="flex gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
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
                        © 2026 ASCEND Workshop — Harsh Pandhe. All rights reserved.
                    </div>
                    <div className="font-mono text-[10px] text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
                        v1.0 — Workshop Portal
                    </div>
                </div>
            </div>
        </footer>
    );
}
