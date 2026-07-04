'use client';

import React from 'react';
import { experience } from '@/data/experience';
import SectionHeader from '../ui/SectionHeader';
import ExperienceEntry from '../templates/ExperienceEntry';
import Reveal from '../ui/Reveal';

export default function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-20 md:py-28">
      <div className="section-shell">
        <div className="max-w-[900px]">
          <SectionHeader kicker="02 — Experience">
            Where I&apos;ve worked.
          </SectionHeader>

          <div className="space-y-6">
            {experience.map((exp, i) => (
              <Reveal key={exp.id} delay={Math.min(i * 0.1, 0.3)}>
                <ExperienceEntry experience={exp} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
