'use client';

import React from 'react';
import Image from 'next/image';
import { Award, CalendarDays, MapPin, Swords, Users, Ticket, Crown, FileBadge } from 'lucide-react';
import type { EventEntry, EventRole } from '@/types/portfolio';
import Card from '../ui/Card';
import { playClickSound } from '@/lib/sound';

type IconComponent = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}>;

const ROLE_META: Record<EventRole, { label: string; color: string; dim: string; line: string; icon: IconComponent }> = {
  committee:   { label: 'Committee',  color: 'var(--tier-epic)',      dim: 'var(--tier-epic-dim)',      line: 'var(--tier-epic-line)',      icon: Users },
  hicom:       { label: 'HiCom',      color: 'var(--tier-legendary)', dim: 'var(--tier-legendary-dim)', line: 'var(--tier-legendary-line)', icon: Crown },
  participant: { label: 'Participant',color: 'var(--tier-common)',    dim: 'var(--tier-common-dim)',    line: 'var(--tier-common-line)',    icon: Ticket },
  competitor:  { label: 'Competitor', color: 'var(--tier-rare)',      dim: 'var(--tier-rare-dim)',      line: 'var(--tier-rare-line)',      icon: Swords },
};

function formatDate(date: string) {
  if (!date) return null;
  const [y, m] = date.split('-');
  if (!m) return y;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

interface EventCardProps {
  event: EventEntry;
}

export default function EventCard({ event }: EventCardProps) {
  const role = ROLE_META[event.role];
  const RoleIcon = role.icon;
  const dateLabel = formatDate(event.date);

  return (
    <Card
      interactive
      className="group overflow-hidden flex flex-col h-full"
      style={{ '--accent-line': role.line } as React.CSSProperties}
    >
      {/* Cover — photo when provided, structured placeholder until then */}
      <div className="relative aspect-[16/9] border-b border-[var(--border)] overflow-hidden">
        {event.media.cover ? (
          <Image
            src={event.media.cover}
            alt={event.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `radial-gradient(120% 120% at 30% 20%, ${role.dim}, transparent 70%), linear-gradient(160deg, rgba(255,255,255,0.03), transparent)`,
            }}
          >
            <RoleIcon size={30} strokeWidth={1.3} style={{ color: role.color, opacity: 0.5 }} />
          </div>
        )}

        {/* Role badge */}
        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] tracking-[0.07em] uppercase rounded-md px-2 py-1 border backdrop-blur-sm"
          style={{ color: role.color, borderColor: role.line, background: 'rgba(7,10,18,0.55)' }}
        >
          <RoleIcon size={11} />
          {role.label}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-[16px] leading-snug text-[var(--text)] mb-1">
          {event.name}
        </h3>
        {event.roleDetail && (
          <p className="text-[12.5px] mb-1.5" style={{ color: role.color }}>
            {event.roleDetail}
          </p>
        )}
        <p className="text-[13px] text-[var(--text-soft)] leading-relaxed flex-1">{event.summary}</p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 text-[12px] text-[var(--text-faint)]">
          <span className="inline-flex items-center gap-1.5">
            <Award size={11} /> {event.organizer}
          </span>
          {dateLabel && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={11} /> {dateLabel}
            </span>
          )}
          {event.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={11} /> {event.location}
            </span>
          )}
        </div>

        {event.certificate && (
          <a
            href={encodeURI(event.certificate)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              playClickSound();
            }}
            className="inline-flex items-center gap-2 mt-4 pt-4 border-t border-[var(--border)] text-[12.5px] text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors"
          >
            <FileBadge size={13} />
            View certificate
          </a>
        )}
      </div>
    </Card>
  );
}
