'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatBarProps {
  percentage: number;
  color?: string;
}

export default function StatBar({ percentage, color = 'var(--accent)' }: StatBarProps) {
  return (
    <div className="h-[5px] w-full rounded-full bg-white/[0.06] overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, ${color}, ${color})`,
          boxShadow: `0 0 12px ${color}`,
          transformOrigin: 'left',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: percentage / 100 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </div>
  );
}
