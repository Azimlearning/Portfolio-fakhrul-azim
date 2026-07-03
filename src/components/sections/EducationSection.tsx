'use client';

import React from 'react';
import { education } from '@/data/education';
import SectionHeader from '../ui/SectionHeader';
import EducationCard from '../templates/EducationCard';
import Reveal from '../ui/Reveal';

export default function EducationSection() {
  return (
    <section id="education" className="w-full py-28 md:py-36">
      <div className="section-shell">
        <div className="max-w-[900px]">
          <SectionHeader kicker="05 — Education">Education.</SectionHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {education.map((edu, i) => (
              <Reveal key={edu.id} delay={Math.min(i * 0.1, 0.3)} className="h-full">
                <EducationCard education={edu} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
