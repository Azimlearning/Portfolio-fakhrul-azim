'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { identity } from '@/data/identity';
import { projects } from '@/data/projects';
import { playClickSound } from '@/lib/sound';
import { scrollToSection } from '../ui/SmoothScroll';
import PixelButton from '../ui/PixelButton';

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: '100+', label: 'Members led' },
  { value: `${projects.length}`, label: 'Projects built' },
  { value: '3+', label: 'Years shipping' },
];

export default function Hero() {
  const go = (id: string) => {
    playClickSound();
    scrollToSection(id);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full flex items-center"
    >
      {/* Legibility scrim — lets the 3D breathe on the right */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 90% at 18% 45%, rgba(7,10,18,0.88) 0%, rgba(7,10,18,0.55) 45%, transparent 75%)',
        }}
      />

      <div className="section-shell relative w-full pt-28 pb-24">
        <div className="max-w-[780px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="flex items-center gap-3 mb-7"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--good)] opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--good)]" />
            </span>
            <span className="label-mono !text-[var(--text-soft)]">
              PETRONAS Upstream intern — {identity.location.city}, Malaysia
            </span>
          </motion.div>

          <h1 className="display-xl text-5xl sm:text-7xl md:text-[86px] mb-8">
            {/* Staggered two-line reveal */}
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block text-gradient"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
              >
                Building AI that
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block accent-gradient"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              >
                does the busywork.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="max-w-[54ch] text-base md:text-lg leading-relaxed text-[var(--text-soft)] mb-10"
          >
            I&apos;m {identity.nameDisplay} — a final-year Computer Science student who builds
            AI assistants, automation pipelines, and data systems that replace hours of manual
            work. Off the clock, I&apos;ve led a 100+ member organization and run nationwide events.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <PixelButton variant="primary" onClick={() => go('projects')}>
              View projects
              <ArrowUpRight size={16} />
            </PixelButton>
            <PixelButton variant="ghost" onClick={() => go('contact')}>
              Get in touch
            </PixelButton>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="flex items-center gap-8 sm:gap-12"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display font-semibold text-2xl sm:text-3xl text-[var(--text)] tabular">
                  {s.value}
                </div>
                <div className="text-[13px] text-[var(--text-faint)] mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => go('about')}
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-faint)] hover:text-[var(--text-soft)] transition-colors cursor-pointer"
      >
        <span className="label-mono">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.button>
    </section>
  );
}
