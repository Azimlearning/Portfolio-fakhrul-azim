'use client';

import React, { useState } from 'react';
import { projects } from '@/data/projects';
import { roles } from '@/data/roles';
import { events } from '@/data/events';
import { TIER_STYLES } from '@/lib/tiers';
import type { Tier } from '@/types/portfolio';

interface TileData {
  key: string;
  label: string;
  sub: string;
  cover: string | null;
  tier: Tier;
}

/** Single marquee tile: tries the entry's cover image, falls back to a
    tier-colored placeholder card until real photos are dropped in. */
function Tile({ tile }: { tile: TileData }) {
  const [imgFailed, setImgFailed] = useState(false);
  const tier = TIER_STYLES[tile.tier] ?? TIER_STYLES.common;
  const hasImage = !!tile.cover && !imgFailed;

  return (
    <div className="relative w-[240px] sm:w-[280px] aspect-[16/10] shrink-0 rounded-2xl overflow-hidden border border-[var(--border)]">
      {hasImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tile.cover!}
          alt={tile.label}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(130% 130% at 15% 0%, ${tier.dim}, transparent 55%), linear-gradient(155deg, #111624, #0a0e17)`,
          }}
        />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070a12]/90 to-transparent pt-8 pb-3 px-4">
        <div className="text-[13px] text-[var(--text)] truncate">{tile.label}</div>
        <div className="text-[11px] truncate" style={{ color: tier.color }}>
          {tile.sub}
        </div>
      </div>
    </div>
  );
}

function Row({ tiles, duration, reverse = false }: { tiles: TileData[]; duration: string; reverse?: boolean }) {
  const doubled = [...tiles, ...tiles];
  return (
    <div className="marquee" style={{ '--marquee-duration': duration } as React.CSSProperties}>
      <div className={`marquee-track gap-4 px-2 ${reverse ? 'is-reverse' : ''}`}>
        {doubled.map((tile, i) => (
          <Tile key={`${tile.key}-${i}`} tile={tile} />
        ))}
      </div>
    </div>
  );
}

/** Three photo rows drifting in alternating directions — a visual breather
    between Projects and Leadership. Populates itself from project and role
    covers; add images to public/media/projects|leadership to light it up. */
export default function ImageMarquee() {
  const projectTiles: TileData[] = projects.map((p) => ({
    key: p.id,
    label: p.name,
    sub: p.context ?? p.category,
    cover: p.media.cover,
    tier: p.tier,
  }));

  const roleTiles: TileData[] = roles.map((r) => ({
    key: r.id,
    label: r.organization,
    sub: r.position,
    cover: r.media.cover,
    tier: r.tier,
  }));

  const eventTiles: TileData[] = events.map((e) => ({
    key: e.id,
    label: e.name,
    sub: e.organizer,
    cover: e.media.cover,
    tier: e.role === 'hicom' ? 'legendary' : e.role === 'committee' ? 'epic' : e.role === 'competitor' ? 'rare' : 'common',
  }));

  const mixed = [...eventTiles, ...projectTiles.slice(0, 2)].reverse();

  return (
    <section aria-label="Work in pictures" className="w-full py-10 md:py-14 space-y-4">
      <Row tiles={projectTiles} duration="58s" />
      <Row tiles={roleTiles} duration="66s" reverse />
      <Row tiles={mixed} duration="62s" />
    </section>
  );
}
