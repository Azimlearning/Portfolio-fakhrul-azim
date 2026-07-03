'use client';

import React from 'react';
import { MapPin, Languages, GraduationCap, Briefcase } from 'lucide-react';
import { identity } from '@/data/identity';
import { strengths } from '@/data/strengths';
import SectionHeader from '../ui/SectionHeader';
import SkillBar from '../templates/SkillBar';
import Reveal from '../ui/Reveal';
import Card from '../ui/Card';

const facts = [
  { icon: MapPin, label: 'Based in', value: 'Kuala Lumpur, Malaysia' },
  { icon: GraduationCap, label: 'Studying at', value: 'Universiti Teknologi PETRONAS' },
  { icon: Briefcase, label: 'Currently', value: 'Intern @ PETRONAS Upstream' },
  { icon: Languages, label: 'Languages', value: 'Malay · English' },
];

export default function About() {
  return (
    <section id="about" className="relative w-full py-28 md:py-36">
      {/* Legibility scrim behind prose */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(90% 80% at 40% 50%, rgba(7,10,18,0.82) 0%, rgba(7,10,18,0.45) 55%, transparent 80%)',
        }}
      />

      <div className="section-shell relative">
        <SectionHeader kicker="01 — About" sub={identity.taglines.heroMicroline}>
          Systems that turn chaos into something legible.
        </SectionHeader>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Bio prose */}
          <div className="lg:col-span-7 space-y-6">
            {identity.bioLong.map((para, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p className="text-[15.5px] md:text-[17px] leading-[1.8] text-[var(--text-soft)] max-w-[62ch]">
                  {para}
                </p>
              </Reveal>
            ))}

            {/* Quick facts */}
            <Reveal delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3.5 rounded-2xl border border-[var(--border)] bg-white/[0.02] px-4 py-3.5"
                  >
                    <f.icon size={16} className="text-[var(--accent)] shrink-0" strokeWidth={1.75} />
                    <div className="min-w-0">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
                        {f.label}
                      </div>
                      <div className="text-[13.5px] text-[var(--text)] truncate">{f.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Strengths panel */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <Card className="p-7 md:p-8">
              <div className="flex items-baseline justify-between mb-8">
                <h3 className="font-display font-semibold text-lg text-[var(--text)]">
                  Core strengths
                </h3>
                <span className="label-mono">self-assessed</span>
              </div>
              <div className="space-y-6">
                {strengths.map((str, id) => (
                  <SkillBar
                    key={id}
                    skill={{
                      id: `str-${id}`,
                      name: str.name,
                      category: 'strength',
                      level: str.score,
                    }}
                  />
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
