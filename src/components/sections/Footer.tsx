'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote as QuoteIcon } from 'lucide-react';
import { externalLinks } from '@/data/links';
import { quotes } from '@/data/quotes';
import { scrollToSection } from '../ui/SmoothScroll';
import { playClickSound } from '@/lib/sound';
import LinkIcon from '../ui/LinkIcon';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

function RotatingQuote() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (quotes.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, []);

  const quote = quotes[index];

  return (
    <div className="rounded-2xl border border-dashed border-[var(--border-strong)] p-5 relative min-h-[124px]">
      <QuoteIcon size={14} className="text-[var(--accent)] mb-3" />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[13.5px] leading-relaxed text-[var(--text-soft)] italic">
            {quote.text}
          </p>
          {quote.source && (
            <footer className="mt-2 text-[12px] text-[var(--text-faint)]">— {quote.source}</footer>
          )}
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const handleNav = (id: string) => {
    playClickSound();
    scrollToSection(id);
  };

  return (
    <footer className="w-full border-t border-[var(--border)] bg-[#070a12]/80 backdrop-blur-md relative z-10">
      <div className="section-shell pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          {/* Identity + quote */}
          <div className="md:col-span-5 space-y-5">
            <div>
              <div className="font-display font-semibold text-[18px] text-[var(--text)]">
                fakhrul<span className="text-[var(--accent)]">.</span>azim
              </div>
              <p className="text-[13.5px] text-[var(--text-soft)] mt-2 max-w-[38ch] leading-relaxed">
                Final-year CS student building AI assistants, automation pipelines, and data
                systems. Kuala Lumpur, Malaysia.
              </p>
            </div>
            <RotatingQuote />
          </div>

          {/* Section nav */}
          <nav className="md:col-span-3 md:pl-6" aria-label="Footer navigation">
            <div className="label-mono mb-4">Explore</div>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="text-[13.5px] text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div className="md:col-span-4">
            <div className="label-mono mb-4">Connect</div>
            <ul className="space-y-2.5">
              {externalLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    onClick={playClickSound}
                    className="group inline-flex items-center gap-2.5 text-[13.5px] text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors"
                  >
                    <span className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors">
                      <LinkIcon icon={link.icon} />
                    </span>
                    {link.label}
                    <span className="text-[12px] text-[var(--text-faint)] hidden sm:inline">
                      {link.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12.5px] text-[var(--text-faint)]">
            © {year} Fakhrul Azim Bin Ahmed Mardzukie
          </p>
          <p className="text-[12.5px] text-[var(--text-faint)]">
            Next.js · React Three Fiber · Tailwind — designed &amp; built by me
          </p>
        </div>
      </div>
    </footer>
  );
}
