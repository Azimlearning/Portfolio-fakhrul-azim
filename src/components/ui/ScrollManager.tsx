'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';

const SECTION_IDS = ['hero', 'about', 'experience', 'projects', 'leadership', 'education', 'contact'];

export default function ScrollManager() {
  const setScrollProgress = usePortfolioStore((s) => s.setScrollProgress);
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);
  const bootComplete = usePortfolioStore((s) => s.bootComplete);

  useEffect(() => {
    if (!bootComplete) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));

      let currentSection = 'hero';
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
          currentSection = id;
          break;
        }
      }
      setActiveSection(currentSection);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, [bootComplete, setScrollProgress, setActiveSection]);

  return null;
}
