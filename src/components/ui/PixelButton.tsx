'use client';

import React from 'react';
import { playClickSound } from '@/lib/sound';
import { useMagnetic } from '@/hooks/useMagnetic';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

/** Site-wide magnetic button. (File keeps its legacy name to avoid import churn.) */
export default function PixelButton({
  variant = 'primary',
  children,
  onClick,
  className = '',
  ...props
}: PixelButtonProps) {
  const magneticRef = useMagnetic<HTMLButtonElement>();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound();
    onClick?.(e);
  };

  return (
    <button
      ref={magneticRef}
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
