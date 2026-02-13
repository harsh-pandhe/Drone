'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollable > 0) {
                setProgress((window.scrollY / scrollable) * 100);
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 h-[3px] z-[9997] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"
            style={{ width: `${progress}%` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 0.5 ? 1 : 0 }}
            transition={{ duration: 0.2 }}
        />
    );
}
