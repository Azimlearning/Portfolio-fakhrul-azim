'use client';

import React, { useState } from 'react';
import { events } from '@/data/events';
import type { EventRole } from '@/types/portfolio';
import SectionHeader from '../ui/SectionHeader';
import EventCard from '../templates/EventCard';
import Reveal from '../ui/Reveal';
import { playClickSound } from '@/lib/sound';

type Filter = 'all' | EventRole;

const FILTER_LABELS: Record<Filter, string> = {
  all: 'All',
  hicom: 'HiCom',
  committee: 'Committee',
  competitor: 'Competitor',
  participant: 'Participant',
};

export default function EventsSection() {
  const [filter, setFilter] = useState<Filter>('all');

  if (!events || events.length === 0) return null;

  const availableFilters: Filter[] = [
    'all',
    ...(['hicom', 'committee', 'competitor', 'participant'] as EventRole[]).filter((r) =>
      events.some((e) => e.role === r)
    ),
  ];

  const visible = filter === 'all' ? events : events.filter((e) => e.role === filter);

  return (
    <section id="events" className="w-full py-20 md:py-28">
      <div className="section-shell">
        <SectionHeader
          kicker="05 — Events"
          sub="Hackathons competed in, events crewed, workshops attended — with the certificates to prove it. Badge color marks how I was involved."
        >
          On the ground.
        </SectionHeader>

        {/* Role filter */}
        <div className="flex flex-wrap gap-2 mb-8 -mt-4 md:-mt-8">
          {availableFilters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => {
                  playClickSound();
                  setFilter(f);
                }}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full text-[13px] border transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[var(--accent-line)] bg-[var(--accent-dim)] text-[var(--accent)]'
                    : 'border-[var(--border)] bg-white/[0.02] text-[var(--text-soft)] hover:text-[var(--text)] hover:border-[var(--border-strong)]'
                }`}
              >
                {FILTER_LABELS[f]}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((event, i) => (
            <Reveal key={event.id} delay={Math.min(i * 0.07, 0.28)} className="h-full">
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
