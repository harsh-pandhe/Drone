'use client';
import { useRef, useEffect } from 'react';

export default function CustomCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Skip on touch-only devices
        const isTouchOnly = matchMedia('(pointer: coarse)').matches && !matchMedia('(pointer: fine)').matches;
        if (isTouchOnly) {
            canvas.style.display = 'none';
            return;
        }

        let mouseMoved = false;
        const pointer = {
            x: 0.5 * window.innerWidth,
            y: 0.5 * window.innerHeight,
        };

        const params = {
            pointsNumber: 40,
            widthFactor: 0.3,
            spring: 0.4,
            friction: 0.5,
        };

        const trail = Array.from({ length: params.pointsNumber }, () => ({
            x: pointer.x,
            y: pointer.y,
            dx: 0,
            dy: 0,
        }));

        function resize() {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
        }
        resize();

        function onMove(x: number, y: number) {
            mouseMoved = true;
            pointer.x = x;
            pointer.y = y;
        }

        const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
        const onClick = (e: MouseEvent) => onMove(e.clientX, e.clientY);
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                onMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onClick);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('resize', resize);

        let raf = 0;

        function update(t: number) {
            // Idle intro animation
            if (!mouseMoved) {
                pointer.x =
                    (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) *
                    window.innerWidth;
                pointer.y =
                    (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) *
                    window.innerHeight;
            }

            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

            // Physics update
            trail.forEach((p, i) => {
                const prev = i === 0 ? pointer : trail[i - 1];
                const spring = i === 0 ? 0.4 * params.spring : params.spring;
                p.dx += (prev.x - p.x) * spring;
                p.dy += (prev.y - p.y) * spring;
                p.dx *= params.friction;
                p.dy *= params.friction;
                p.x += p.dx;
                p.y += p.dy;
            });

            // Draw trail
            ctx!.lineCap = 'round';
            ctx!.strokeStyle = 'rgba(6, 182, 212, 0.6)';
            ctx!.beginPath();
            ctx!.moveTo(trail[0].x, trail[0].y);

            for (let i = 1; i < trail.length - 1; i++) {
                const xc = 0.5 * (trail[i].x + trail[i + 1].x);
                const yc = 0.5 * (trail[i].y + trail[i + 1].y);
                ctx!.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
                ctx!.lineWidth = params.widthFactor * (params.pointsNumber - i);
                ctx!.stroke();
            }
            ctx!.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
            ctx!.stroke();

            raf = requestAnimationFrame(update);
        }

        raf = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', onClick);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9998 }}
            aria-hidden="true"
        />
    );
}
