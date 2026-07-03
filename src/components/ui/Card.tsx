'use client';

import React, { useRef } from 'react';
import type { Tier } from '@/types/portfolio';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tier?: Tier;
  interactive?: boolean;
  children: React.ReactNode;
}

/**
 * Glass surface card. `interactive` adds hover lift + a cursor-tracked
 * spotlight border (see .spotlight in globals.css).
 */
export default function Card({
  // `tier` is accepted (and swallowed) for template compatibility; the glass
  // style no longer varies by tier.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tier = 'common',
  interactive = false,
  children,
  className = '',
  onMouseMove,
  ...props
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
    }
    onMouseMove?.(e);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`glass ${interactive ? 'glass-hover spotlight' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
