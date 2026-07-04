'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { scrollToSection } from './SmoothScroll';
import { playClickSound } from '@/lib/sound';

const SECTIONS = [
  { id: 'hero', label: 'Start' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'events', label: 'Events' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/**
 * Desktop-only side rails that use the empty screen edges:
 * left — vertical label of the active section; right — dot navigation.
 */
export default function SideRails() {
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const active = SECTIONS.find((s) => s.id === activeSection) ?? SECTIONS[0];

  const handleClick = (id: string) => {
    playClickSound();
    scrollToSection(id);
  };

  return (
    <>
      {/* Left rail — active section label */}
      <div
        aria-hidden
        className="hidden xl:flex fixed left-7 top-1/2 -translate-y-1/2 z-30 items-center pointer-events-none"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="w-px h-16 bg-gradient-to-b from-transparent to-[var(--border-strong)]" />
          <AnimatePresence mode="wait">
            <motion.span
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="label-mono !text-[10px]"
              style={{ writingMode: 'vertical-rl' }}
            >
              {active.label}
            </motion.span>
          </AnimatePresence>
          <span className="w-px h-16 bg-gradient-to-t from-transparent to-[var(--border-strong)]" />
        </div>
      </div>

      {/* Right rail — dot nav */}
      <nav
        aria-label="Section navigation"
        className="hidden xl:flex fixed right-7 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3.5"
      >
        {SECTIONS.map((s) => {
          const isActive = s.id === activeSection;
          return (
            <button
              key={s.id}
              onClick={() => handleClick(s.id)}
              aria-label={s.label}
              aria-current={isActive ? 'true' : undefined}
              className="group relative flex items-center justify-center w-4 h-4 cursor-pointer"
            >
              <span
                className="rounded-full transition-all duration-300"
                style={{
                  width: isActive ? 8 : 5,
                  height: isActive ? 8 : 5,
                  background: isActive ? 'var(--accent)' : 'var(--text-faint)',
                  boxShadow: isActive ? '0 0 10px var(--accent-line)' : 'none',
                }}
              />
              {/* Hover tooltip */}
              <span className="absolute right-6 whitespace-nowrap text-[11px] text-[var(--text-soft)] bg-[#0b101b] border border-[var(--border)] rounded-md px-2 py-1 opacity-0 translate-x-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                {s.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
