'use client';
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export default function CountUp({ target, suffix = '', prefix = '', duration = 2000, className = '' }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        const startTime = performance.now();
        let raf: number;

        function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));

            if (progress < 1) {
                raf = requestAnimationFrame(tick);
            }
        }

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [isInView, target, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{value.toLocaleString()}{suffix}
        </span>
    );
}
