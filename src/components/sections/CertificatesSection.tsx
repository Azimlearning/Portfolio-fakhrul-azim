'use client';

import React from 'react';
import { certificates } from '@/data/certificates';
import SectionHeader from '../ui/SectionHeader';
import CertCard from '../templates/CertCard';
import Reveal from '../ui/Reveal';

export default function CertificatesSection() {
  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="w-full py-28 md:py-36 !pt-0">
      <div className="section-shell">
        <div className="max-w-[900px]">
          <SectionHeader kicker="06 — Certifications">Certifications.</SectionHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {certificates.map((cert, i) => (
              <Reveal key={cert.id} delay={Math.min(i * 0.08, 0.25)} className="h-full">
                <CertCard certificate={cert} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
