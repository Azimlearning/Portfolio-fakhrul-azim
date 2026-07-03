'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, MapPin, Users } from 'lucide-react';
import type { Role } from '@/types/portfolio';
import Card from '../ui/Card';
import { TIER_STYLES } from '@/lib/tiers';
import { playClickSound } from '@/lib/sound';

interface RoleGalleryCardProps {
  role: Role;
}

/** Image-forward gallery card for leadership roles. Tries `media.cover`;
    falls back to a tier-colored placeholder until real photos are added. */
export default function RoleGalleryCard({ role }: RoleGalleryCardProps) {
  const tier = TIER_STYLES[role.tier] ?? TIER_STYLES.common;
  const [imgFailed, setImgFailed] = useState(false);
  const hasImage = !!role.media.cover && !imgFailed;

  const formatDateRange = () =>
    `${role.dateRange.start} — ${role.dateRange.end ?? 'present'}`;

  const initials = role.organization
    .split(/[\s×]+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  return (
    <Link href={`/leadership/${role.slug}`} onClick={playClickSound} className="block h-full group">
      <Card
        interactive
        className="h-full flex flex-col overflow-hidden !p-0"
        style={{ '--accent-line': tier.line } as React.CSSProperties}
      >
        {/* Cover */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={role.media.cover!}
              alt={`${role.organization} — ${role.position}`}
              onError={() => setImgFailed(true)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-[1.04]"
              style={{
                background: `radial-gradient(120% 120% at 20% 0%, ${tier.dim}, transparent 60%), linear-gradient(160deg, #10141f, #0a0e17)`,
              }}
            >
              <span
                className="font-display font-semibold text-4xl tracking-tight select-none"
                style={{ color: tier.line }}
              >
                {initials}
              </span>
            </div>
          )}

          {/* Bottom fade for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0a0e17] to-transparent" />

          {/* Tier tag */}
          {tier.label && (
            <span
              className="absolute top-3.5 left-3.5 text-[10.5px] tracking-[0.08em] uppercase rounded-md px-2 py-1 border backdrop-blur-sm"
              style={{ color: tier.color, borderColor: tier.line, background: 'rgba(7,10,18,0.55)' }}
            >
              {tier.label}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="font-display font-semibold text-[16.5px] leading-snug text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
              {role.organization}
            </h3>
            <ArrowUpRight
              size={15}
              className="mt-1 shrink-0 text-[var(--text-faint)] transition-all duration-300 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>

          <p className="text-[13.5px] mb-3" style={{ color: tier.color }}>
            {role.position}
          </p>

          <p className="text-[13px] leading-relaxed text-[var(--text-soft)] line-clamp-2 flex-1">
            {role.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 pt-3.5 border-t border-[var(--border)]">
            <span className="label-mono !text-[var(--text-faint)] tabular !text-[10.5px]">
              {formatDateRange()}
            </span>
            {role.location && (
              <span className="inline-flex items-center gap-1 text-[12px] text-[var(--text-faint)]">
                <MapPin size={11} />
                {role.location}
              </span>
            )}
            {role.scope && (
              <span className="inline-flex items-center gap-1 text-[12px] text-[var(--text-faint)]">
                <Users size={11} />
                {role.scope}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
