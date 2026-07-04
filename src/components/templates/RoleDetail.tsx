'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Users, CalendarRange, Trophy, FileBadge } from 'lucide-react';
import type { Role } from '@/types/portfolio';
import Card from '../ui/Card';
import Reveal from '../ui/Reveal';

interface RoleDetailProps {
  role: Role;
}

export default function RoleDetail({ role }: RoleDetailProps) {
  const formatDateRange = () =>
    `${role.dateRange.start} — ${role.dateRange.end ?? 'present'}`;

  const meta = [
    { icon: CalendarRange, label: 'Timeline', value: formatDateRange() },
    ...(role.location ? [{ icon: MapPin, label: 'Location', value: role.location }] : []),
    ...(role.teamSize ? [{ icon: Users, label: 'Team size', value: String(role.teamSize) }] : []),
    ...(role.scope ? [{ icon: Trophy, label: 'Scope', value: role.scope }] : []),
  ];

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] py-16 md:py-24">
      <div className="section-shell max-w-[860px]">
        <Reveal y={20}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13.5px] text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors mb-10"
          >
            <ArrowLeft size={15} /> Back to portfolio
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-8 sm:p-12 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, var(--accent-dim), transparent 70%)' }}
            />

            <div className="label-mono !text-[var(--accent)] mb-4">Leadership</div>
            <h1 className="display-xl text-gradient text-3xl sm:text-5xl mb-2">{role.organization}</h1>
            <p className="text-[17px] text-[var(--accent)] mb-10">{role.position}</p>

            {/* Meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border border-[var(--border)] bg-white/[0.02] p-5 mb-10">
              {meta.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center gap-1.5 label-mono mb-1.5">
                    <m.icon size={11} />
                    {m.label}
                  </div>
                  <div className="text-[13.5px] text-[var(--text)]">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <h2 className="font-display font-semibold text-lg text-[var(--text)] mb-3">About the role</h2>
              <p className="text-[15px] leading-[1.85] text-[var(--text-soft)] max-w-[68ch]">
                {role.description}
              </p>
            </div>

            {role.highlights?.length > 0 && (
              <div>
                <h2 className="font-display font-semibold text-lg text-[var(--text)] mb-4">Highlights</h2>
                <ul className="space-y-3">
                  {role.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--text-soft)]">
                      <span className="mt-[9px] w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(role.links.site || role.links.certificate) && (
              <div className="flex flex-wrap gap-3 mt-10">
                {role.links.site && (
                  <a
                    href={role.links.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    Visit organization
                  </a>
                )}
                {role.links.certificate && (
                  <a
                    href={encodeURI(role.links.certificate)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <FileBadge size={15} />
                    View certificate
                  </a>
                )}
              </div>
            )}
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
