'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { usePortfolioStore } from '@/lib/store';
import { playClickSound, getSoundSetting, setSoundSetting } from '@/lib/sound';
import { scrollToSection } from '../ui/SmoothScroll';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function TopBar() {
  const audioEnabled = usePortfolioStore((s) => s.audioEnabled);
  const setAudioEnabled = usePortfolioStore((s) => s.setAudioEnabled);
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });

  useEffect(() => {
    setAudioEnabled(getSoundSetting());
  }, [setAudioEnabled]);

  const handleNavClick = (id: string) => {
    playClickSound();
    setMenuOpen(false);
    scrollToSection(id);
  };

  const handleSoundToggle = () => {
    const nextEnabled = !audioEnabled;
    setAudioEnabled(nextEnabled);
    setSoundSetting(nextEnabled);
    playClickSound();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      {/* Scroll progress hairline */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] w-full origin-left z-10"
        style={{ scaleX: progress, background: 'linear-gradient(90deg, var(--accent), var(--accent-bright))' }}
      />

      <div className="h-[68px] border-b border-[var(--border)] bg-[#070a12]/65 backdrop-blur-xl">
        <div className="section-shell h-full flex items-center justify-between">
          {/* Wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="font-display font-semibold tracking-tight text-[15px] text-[var(--text)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            fakhrul<span className="text-[var(--accent)]">.</span>azim
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleNavClick(sec.id)}
                  className={`relative px-3.5 py-2 text-[13.5px] rounded-full transition-colors cursor-pointer ${
                    isActive ? 'text-[var(--text)]' : 'text-[var(--text-soft)] hover:text-[var(--text)]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.06] border border-[var(--border)]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">{sec.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSoundToggle}
              aria-label={audioEnabled ? 'Mute interface sounds' : 'Enable interface sounds'}
              className="w-9 h-9 rounded-full border border-[var(--border)] bg-white/[0.03] text-[var(--text-soft)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors flex items-center justify-center cursor-pointer"
            >
              {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex btn btn-primary !py-2 !px-4 text-[13.5px]"
            >
              Get in touch
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="lg:hidden w-9 h-9 rounded-full border border-[var(--border)] bg-white/[0.03] text-[var(--text)] flex items-center justify-center cursor-pointer"
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="lg:hidden border-b border-[var(--border)] bg-[#070a12]/92 backdrop-blur-xl"
        >
          <div className="section-shell py-4 flex flex-col gap-1">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleNavClick(sec.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-[15px] transition-colors cursor-pointer ${
                  activeSection === sec.id
                    ? 'text-[var(--text)] bg-white/[0.05]'
                    : 'text-[var(--text-soft)] hover:text-[var(--text)]'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </header>
  );
}
