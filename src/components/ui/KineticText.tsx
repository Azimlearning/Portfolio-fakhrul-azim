'use client';

import React, { useEffect, useRef } from 'react';

interface KineticTextProps {
  text: string;
  className?: string;
}

/**
 * Characters repel gently from the cursor within a falloff radius —
 * kinetic type for the hero headline. Perf-critical: character offsets are
 * cached (recomputed on resize), so each frame reads ONE bounding rect
 * instead of one per character. Inert on touch / reduced motion.
 */
export default function KineticText({ text, className = '' }: KineticTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const chars = Array.from(root.querySelectorAll<HTMLSpanElement>('[data-char]'));
    const state = chars.map(() => ({ x: 0, y: 0 }));
    // Char centers relative to the root, cached — avoids per-char rect reads
    let offsets: { ox: number; oy: number }[] = [];
    let mx = -9999, my = -9999;
    let rafId: number;
    const RADIUS = 130;
    const PUSH = 14;

    const measure = () => {
      const rootRect = root.getBoundingClientRect();
      offsets = chars.map((c) => {
        const r = c.getBoundingClientRect();
        return {
          ox: r.left + r.width / 2 - rootRect.left - state[chars.indexOf(c)].x,
          oy: r.top + r.height / 2 - rootRect.top - state[chars.indexOf(c)].y,
        };
      });
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (offsets.length === 0) return;

      const rootRect = root.getBoundingClientRect(); // single layout read per frame
      // Early out when the cursor is nowhere near the headline
      const near =
        mx > rootRect.left - RADIUS &&
        mx < rootRect.right + RADIUS &&
        my > rootRect.top - RADIUS &&
        my < rootRect.bottom + RADIUS;

      let anyActive = false;
      for (let i = 0; i < chars.length; i++) {
        const s = state[i];
        let tx = 0, ty = 0;
        if (near) {
          const cx = rootRect.left + offsets[i].ox;
          const cy = rootRect.top + offsets[i].oy;
          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS && dist > 0.01) {
            const force = (1 - dist / RADIUS) * PUSH;
            tx = (dx / dist) * force;
            ty = (dy / dist) * force;
          }
        }
        s.x += (tx - s.x) * 0.12;
        s.y += (ty - s.y) * 0.12;
        if (Math.abs(s.x) > 0.05 || Math.abs(s.y) > 0.05) {
          anyActive = true;
          chars[i].style.transform = `translate(${s.x}px, ${s.y}px)`;
        } else if (chars[i].style.transform) {
          chars[i].style.transform = '';
        }
      }
      // When idle and cursor far away, the loop costs one rect read + a cheap scan
      void anyActive;
    };

    // Measure after the entrance animation settles so offsets are accurate
    const measureTimer = setTimeout(measure, 1600);
    const ro = new ResizeObserver(() => measure());
    ro.observe(root);

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      clearTimeout(measureTimer);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <span ref={rootRef} className={className} aria-label={text}>
      {text.split('').map((ch, i) =>
        ch === ' ' ? (
          <span key={i}> </span>
        ) : (
          <span key={i} data-char aria-hidden className="inline-block will-change-transform">
            {ch}
          </span>
        )
      )}
    </span>
  );
}
