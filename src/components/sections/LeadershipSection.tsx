'use client';

import React from 'react';
import { roles } from '@/data/roles';
import SectionHeader from '../ui/SectionHeader';
import RoleGalleryCard from '../templates/RoleGalleryCard';
import Reveal from '../ui/Reveal';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="relative w-full py-20 md:py-28">
      <div className="section-shell relative">
        <SectionHeader
          kicker="04 — Leadership"
          sub="Organizations run, events delivered, teams coordinated — the operational half of the résumé. Open any card for the full story."
        >
          Running things.
        </SectionHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role, i) => (
            <Reveal key={role.id} delay={Math.min(i * 0.08, 0.3)} className="h-full">
              <RoleGalleryCard role={role} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
