'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';

interface BootScreenProps {
  onComplete: () => void;
}

const NAME = 'FAKHRUL AZIM';

/** Brief cinematic preloader: name reveal + sweep line, skipped on repeat visits. */
export default function BootScreen({ onComplete }: BootScreenProps) {
  const [leaving, setLeaving] = useState(false);
  const setBootCompleteState = usePortfolioStore((s) => s.setBootComplete);

  useEffect(() => {
    if (sessionStorage.getItem('pf-seen-boot') === 'true') {
      setBootCompleteState(true);
      onComplete();
      return;
    }

    const exitTimer = setTimeout(() => setLeaving(true), 1600);
    const doneTimer = setTimeout(() => {
      sessionStorage.setItem('pf-seen-boot', 'true');
      setBootCompleteState(true);
      onComplete();
    }, 2250);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete, setBootCompleteState]);

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070a12]"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="display-xl text-gradient text-3xl sm:text-5xl tracking-tight"
            >
              {NAME}
            </motion.h1>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="mt-6 h-px w-[210px] sm:w-[320px] origin-left"
            style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="label-mono mt-5"
          >
            AI · Automation · Data · Leadership
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
