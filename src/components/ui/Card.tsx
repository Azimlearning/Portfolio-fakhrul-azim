'use client';

import React, { useEffect, useRef } from 'react';
import type { Tier } from '@/types/portfolio';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tier?: Tier;
  interactive?: boolean;
  children: React.ReactNode;
}

/**
 * Glass surface card. `interactive` adds a cursor-tracked spotlight border
 * (see .spotlight in globals.css) plus a subtle 3D tilt toward the cursor.
 */
export default function Card({
  // `tier` is accepted (and swallowed) for template compatibility; tier
  // styling is applied by the templates themselves via lib/tiers.ts.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tier = 'common',
  interactive = false,
  children,
  className = '',
  onMouseMove,
  onMouseLeave,
  ...props
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tiltEnabled = useRef(false);

  useEffect(() => {
    tiltEnabled.current =
      interactive &&
      typeof window !== 'undefined' &&
      !window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, [interactive]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (interactive && el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);

      if (tiltEnabled.current) {
        const rx = ((y / rect.height) - 0.5) * -4; // deg
        const ry = ((x / rect.width) - 0.5) * 4;
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-3px)`;
      }
    }
    onMouseMove?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el && tiltEnabled.current) {
      el.style.transform = '';
    }
    onMouseLeave?.(e);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass ${interactive ? 'glass-hover spotlight' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
