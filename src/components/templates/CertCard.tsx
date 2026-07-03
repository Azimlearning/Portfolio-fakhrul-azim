import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
import type { Certificate } from '@/types/portfolio';
import Card from '../ui/Card';

interface CertCardProps {
  certificate: Certificate;
}

export default function CertCard({ certificate }: CertCardProps) {
  return (
    <Card className="p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--accent-dim)] text-[var(--accent)] flex items-center justify-center shrink-0">
          <Award size={17} strokeWidth={1.6} />
        </div>
        {certificate.credentialUrl && (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify ${certificate.name}`}
            className="text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors p-1.5"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      <h4 className="font-display font-medium text-[15.5px] text-[var(--text)] leading-snug mb-1.5 flex-1">
        {certificate.name}
      </h4>
      <p className="text-[13.5px] text-[var(--text-soft)]">{certificate.issuer}</p>

      <div className="mt-4 pt-3.5 border-t border-[var(--border)] flex justify-between items-center">
        <span className="text-[12.5px] text-[var(--text-faint)]">Issued</span>
        <span className="text-[13px] text-[var(--text-soft)] tabular">{certificate.dateIssued}</span>
      </div>
    </Card>
  );
}
