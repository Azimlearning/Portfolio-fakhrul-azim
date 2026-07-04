'use client';

import React from 'react';
import { MapPin, Languages, GraduationCap, Briefcase, ArrowUpRight } from 'lucide-react';
import { identity } from '@/data/identity';
import { strengths } from '@/data/strengths';
import { projects } from '@/data/projects';
import { roles } from '@/data/roles';
import type { Strength } from '@/types/portfolio';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Card from '../ui/Card';
import { scrollToSection } from '../ui/SmoothScroll';
import { playClickSound } from '@/lib/sound';

const facts = [
  { icon: MapPin, label: 'Based in', value: 'Kuala Lumpur, Malaysia' },
  { icon: GraduationCap, label: 'Studying at', value: 'Universiti Teknologi PETRONAS' },
  { icon: Briefcase, label: 'Currently', value: 'Intern @ PETRONAS Upstream' },
  { icon: Languages, label: 'Languages', value: 'Malay · English' },
];

/** Count projects whose name/category/tech matches a strength's keywords.
    Short keywords (≤2 chars, e.g. "R") require an exact techStack token. */
function countEvidence(strength: Strength): { count: number; target: string; noun: string } {
  if (strength.evidence === 'leadership') {
    return { count: roles.length, target: 'leadership', noun: roles.length === 1 ? 'role' : 'roles' };
  }
  const keywords = strength.keywords ?? [];
  const count = projects.filter((p) => {
    const haystack = `${p.name} ${p.category} ${p.summary} ${p.techStack.join(' ')}`.toLowerCase();
    const tokens = p.techStack.map((t) => t.toLowerCase());
    return keywords.some((k) =>
      k.length <= 2 ? tokens.includes(k) : haystack.includes(k)
    );
  }).length;
  return { count, target: 'projects', noun: count === 1 ? 'project' : 'projects' };
}

export default function About() {
  const handleEvidenceClick = (target: string) => {
    playClickSound();
    scrollToSection(target);
  };

  return (
    <section id="about" className="relative w-full py-20 md:py-28">
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

          {/* Strengths — evidence-linked, not self-graded */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <Card className="p-7 md:p-8">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-display font-semibold text-lg text-[var(--text)]">
                  Core strengths
                </h3>
                <span className="label-mono">click to verify</span>
              </div>
              <p className="text-[13px] text-[var(--text-faint)] mb-6">
                Each strength links to the work that demonstrates it.
              </p>
              <div className="divide-y divide-white/[0.05]">
                {strengths.map((str) => {
                  const evidence = countEvidence(str);
                  if (evidence.count === 0) return null;
                  return (
                    <button
                      key={str.name}
                      onClick={() => handleEvidenceClick(evidence.target)}
                      className="w-full flex items-center justify-between gap-4 py-3.5 text-left cursor-pointer group"
                    >
                      <span className="text-[14px] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
                        {str.name}
                      </span>
                      <span className="flex items-center gap-1.5 text-[12.5px] text-[var(--text-soft)] rounded-full border border-[var(--border)] bg-white/[0.02] px-3 py-1 shrink-0 transition-colors group-hover:border-[var(--accent-line)] group-hover:text-[var(--accent)]">
                        {evidence.count} {evidence.noun}
                        <ArrowUpRight size={11} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
