'use client';

import React from 'react';
import { MapPin, TrendingUp } from 'lucide-react';
import type { Experience } from '@/types/portfolio';
import Card from '../ui/Card';

interface ExperienceEntryProps {
  experience: Experience;
}

export default function ExperienceEntry({ experience }: ExperienceEntryProps) {
  const formatDateRange = () =>
    `${experience.dateRange.start} — ${experience.dateRange.end ?? 'present'}`;

  return (
    <Card className="p-7 md:p-9">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h3 className="font-display font-semibold text-xl md:text-2xl text-[var(--text)]">
              {experience.organization}
            </h3>
            <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] border border-[var(--accent-line)] rounded-md px-2 py-1">
              {experience.employmentType}
            </span>
          </div>
          <div className="text-[15px] text-[var(--accent)]">
            {experience.role}
            {experience.division && (
              <span className="text-[var(--text-faint)]"> · {experience.division}</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="label-mono !text-[var(--text-soft)] tabular">{formatDateRange()}</div>
          <div className="flex items-center justify-end gap-1.5 text-[13px] text-[var(--text-faint)] mt-1.5">
            <MapPin size={12} />
            {experience.city}, {experience.country}
          </div>
        </div>
      </div>

      <p className="text-[15px] leading-relaxed text-[var(--text-soft)] max-w-[70ch] mb-6">
        {experience.summary}
      </p>

      <ul className="space-y-2.5 mb-7">
        {experience.responsibilities.map((resp, i) => (
          <li key={i} className="flex items-start gap-3 text-[14px] leading-relaxed text-[var(--text-soft)]">
            <span className="mt-[9px] w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
            {resp}
          </li>
        ))}
      </ul>

      {/* Impact callout */}
      <div className="flex items-start gap-3.5 rounded-2xl border border-[var(--accent-line)] bg-[var(--accent-dim)] px-5 py-4 mb-6">
        <TrendingUp size={16} className="text-[var(--accent)] mt-0.5 shrink-0" />
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] mb-1">Impact</div>
          <p className="text-[14.5px] text-[var(--text)] leading-relaxed">{experience.impact}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {experience.tech.map((t, i) => (
          <span
            key={i}
            className="text-[12.5px] text-[var(--text-soft)] rounded-md border border-[var(--border)] bg-white/[0.02] px-2.5 py-1"
          >
            {t}
          </span>
        ))}
      </div>
    </Card>
  );
}
