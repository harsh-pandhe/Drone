'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
    { label: 'Services', href: '#services' },
    { label: 'Technology', href: '#technology' },
    { label: 'Process', href: '#process' },
    { label: 'Compliance', href: '#compliance' },
];

export default function Navbar() {
    const [visible, setVisible] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        let lastY = 0;
        const onScroll = () => {
            const y = window.scrollY;
            setVisible(y < 80 || y < lastY);
            setScrolled(y > 20);
            lastY = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: 0 }}
                animate={{ y: visible ? 0 : -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={`fixed top-0 left-0 right-0 z-[9990] transition-colors duration-300 ${scrolled
                        ? 'bg-slate-900/70 backdrop-blur-xl border-b border-slate-700/30 shadow-lg shadow-black/20'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#" className="font-rajdhani font-bold text-xl text-white tracking-wider">
                        ASC<span className="text-cyan-400">END</span>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="font-mono text-[11px] text-slate-400 hover:text-cyan-400 tracking-[0.15em] uppercase transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="px-5 py-1.5 border border-cyan-500/40 text-cyan-400 font-mono text-[11px] tracking-wider uppercase rounded hover:bg-cyan-500/10 transition-colors duration-200"
                        >
                            Contact
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className="block w-5 h-[2px] bg-slate-300"
                        />
                        <motion.span
                            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block w-5 h-[2px] bg-slate-300"
                        />
                        <motion.span
                            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className="block w-5 h-[2px] bg-slate-300"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-x-0 top-16 z-[9989] bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/30 md:hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="font-mono text-sm text-slate-300 hover:text-cyan-400 tracking-wider uppercase transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setMobileOpen(false)}
                                className="mt-2 text-center px-5 py-2 border border-cyan-500/40 text-cyan-400 font-mono text-sm tracking-wider uppercase rounded hover:bg-cyan-500/10 transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
