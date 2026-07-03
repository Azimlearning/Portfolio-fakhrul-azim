'use client';

import { useEffect, useRef } from 'react';

/**
 * Magnetic pull: the element eases a few pixels toward the cursor while
 * hovered and springs back on leave. Direct DOM writes — no re-renders.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.3, maxShift = 8) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const x = Math.max(-maxShift, Math.min(maxShift, dx * strength));
      const y = Math.max(-maxShift, Math.min(maxShift, dy * strength));
      el.style.transition = 'transform 120ms ease-out';
      el.style.transform = `translate(${x}px, ${y}px)`;
    };

    const onLeave = () => {
      el.style.transition = 'transform 380ms cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, maxShift]);

  return ref;
}
