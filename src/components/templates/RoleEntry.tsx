'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Role } from '@/types/portfolio';
import Reveal from '../ui/Reveal';

interface RoleEntryProps {
  role: Role;
  index?: number;
}

export default function RoleEntry({ role, index = 0 }: RoleEntryProps) {
  const formatDateRange = () =>
    `${role.dateRange.start} — ${role.dateRange.end ?? 'present'}`;

  return (
    <Reveal delay={Math.min(index * 0.08, 0.3)}>
      <div className="relative pl-10 md:pl-14 pb-14 last:pb-0 group">
        {/* Timeline spine */}
        <span
          aria-hidden
          className="absolute left-[5px] top-2 bottom-0 w-px bg-gradient-to-b from-[var(--accent-line)] via-white/[0.08] to-transparent group-last:bg-none"
        />
        {/* Node */}
        <span
          aria-hidden
          className="absolute left-0 top-[7px] w-[11px] h-[11px] rounded-full border-2 border-[var(--accent)] bg-[#0b101b] shadow-[0_0_14px_rgba(226,166,72,0.5)]"
        />

        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
          <Link
            href={`/leadership/${role.slug}`}
            className="font-display font-semibold text-lg md:text-xl text-[var(--text)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1.5"
          >
            {role.organization}
            <ArrowUpRight
              size={15}
              className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
            />
          </Link>
          <span className="label-mono !text-[var(--text-faint)] tabular">{formatDateRange()}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] mb-3">
          <span className="text-[var(--accent)]">{role.position}</span>
          {role.location && (
            <span className="inline-flex items-center gap-1.5 text-[var(--text-faint)] text-[13px]">
              <MapPin size={12} />
              {role.location}
            </span>
          )}
          {role.scope && <span className="text-[var(--text-faint)] text-[13px]">{role.scope}</span>}
        </div>

        <p className="text-[14.5px] leading-relaxed text-[var(--text-soft)] max-w-[68ch] mb-4">
          {role.description}
        </p>

        {role.highlights?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {role.highlights.map((h, i) => (
              <span
                key={i}
                className="text-[12.5px] text-[var(--text-soft)] rounded-full border border-[var(--border)] bg-white/[0.02] px-3 py-1"
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}
