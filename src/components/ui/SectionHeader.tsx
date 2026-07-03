'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  kicker: string;            // small mono eyebrow, e.g. "02 — About"
  children: React.ReactNode; // display title
  sub?: string;              // optional one-line intro under the title
  className?: string;
}

export default function SectionHeader({ kicker, children, sub, className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-14 md:mb-20 ${className}`}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="label-mono text-[var(--accent)]">{kicker}</span>
        <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-[var(--accent-line)] to-transparent" />
      </div>
      <h2 className="display-xl text-gradient text-4xl sm:text-5xl md:text-6xl">
        {children}
      </h2>
      {sub && (
        <p className="mt-5 max-w-[62ch] text-[15px] md:text-base leading-relaxed text-[var(--text-soft)]">
          {sub}
        </p>
      )}
    </motion.div>
  );
}
