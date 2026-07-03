'use client';

import { useEffect, useRef } from 'react';

/**
 * Trailing cursor ring. The native cursor stays visible (accessibility);
 * the ring lags behind it with damping and grows over interactive elements.
 * Hidden entirely on touch devices / reduced motion (see globals.css).
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mx = -100, my = -100;   // mouse
    let rx = -100, ry = -100;   // ring (damped)
    let rafId: number;
    let lastTime = performance.now();

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      ring.classList.remove('is-hidden');
      const target = e.target as Element | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, label'
      );
      ring.classList.toggle('is-hovering', interactive);
    };

    const onLeave = () => ring.classList.add('is-hidden');

    const tick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const k = 1 - Math.exp(-12 * dt);
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={ringRef} className="cursor-ring is-hidden" aria-hidden />;
}
