'use client';

import React from 'react';
import { roles } from '@/data/roles';
import SectionHeader from '../ui/SectionHeader';
import RoleEntry from '../templates/RoleEntry';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="relative w-full py-28 md:py-36">
      {/* Legibility scrim behind timeline prose */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(85% 80% at 50% 50%, rgba(7,10,18,0.8) 0%, rgba(7,10,18,0.4) 60%, transparent 85%)',
        }}
      />

      <div className="section-shell relative">
        <div className="max-w-[860px]">
          <SectionHeader
            kicker="03 — Leadership"
            sub="Organizations run, events delivered, teams coordinated — the operational half of the résumé."
          >
            Running things.
          </SectionHeader>

          <div>
            {roles.map((role, i) => (
              <RoleEntry key={role.id} role={role} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
