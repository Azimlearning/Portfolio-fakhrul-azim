'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { playClickSound } from '@/lib/sound';
import type { Tier } from '@/types/portfolio';
import { TIER_STYLES } from '@/lib/tiers';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: Tier;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  description: string;
  metrics?: { label: string; value: string | number }[];
  footerAction?: React.ReactNode;
}

/** Project detail dialog. (File keeps its legacy name to avoid import churn.) */
export default function InventoryModal({
  isOpen,
  onClose,
  tier,
  title,
  subtitle,
  icon,
  description,
  metrics = [],
  footerAction,
}: InventoryModalProps) {
  const tierStyle = TIER_STYLES[tier] ?? TIER_STYLES.common;
  const handleClose = () => {
    playClickSound();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#04060c]/70 backdrop-blur-md"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-[520px] p-7 sm:p-9 relative overflow-hidden"
          >
            {/* Ambient wash + top hairline in the tier color */}
            <div
              aria-hidden
              className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${tierStyle.dim}, transparent 70%)` }}
            />
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${tierStyle.color}, transparent)`, opacity: 0.6 }}
            />

            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full border border-[var(--border)] bg-white/[0.03] text-[var(--text-soft)] flex items-center justify-center transition-colors hover:text-[var(--text)] hover:border-[var(--border-strong)] cursor-pointer"
            >
              <X size={15} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0"
                style={{ background: tierStyle.dim, borderColor: tierStyle.line, color: tierStyle.color }}
              >
                {icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-display font-semibold text-xl leading-tight text-[var(--text)]">
                    {title}
                  </h4>
                  {tierStyle.label && (
                    <span
                      className="text-[10.5px] tracking-[0.08em] uppercase rounded-md px-1.5 py-0.5 border shrink-0"
                      style={{ color: tierStyle.color, borderColor: tierStyle.line }}
                    >
                      {tierStyle.label}
                    </span>
                  )}
                </div>
                {subtitle && <p className="text-sm text-[var(--text-soft)] mt-0.5 truncate">{subtitle}</p>}
              </div>
            </div>

            <p className="text-[15px] leading-relaxed text-[var(--text-soft)] mb-6 max-w-[60ch]">
              {description}
            </p>

            {metrics.length > 0 && (
              <div className="rounded-2xl border border-[var(--border)] bg-white/[0.02] divide-y divide-white/[0.05] mb-6">
                {metrics.map((metric, i) => (
                  <div key={i} className="flex justify-between items-center gap-4 px-4 py-3">
                    <span className="label-mono">{metric.label}</span>
                    <span className="text-sm text-[var(--text)] font-medium text-right tabular">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {footerAction}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
