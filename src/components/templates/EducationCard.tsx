import React from 'react';
import { GraduationCap } from 'lucide-react';
import type { Education } from '@/types/portfolio';
import Card from '../ui/Card';

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    <Card className="p-7 flex flex-col h-full">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="w-11 h-11 rounded-xl border border-[var(--border)] bg-[var(--accent-dim)] text-[var(--accent)] flex items-center justify-center shrink-0">
          <GraduationCap size={19} strokeWidth={1.6} />
        </div>
        <span className="label-mono !text-[var(--text-faint)] tabular text-right">
          {education.dateStart} — {education.dateEnd}
          {education.expected ? ' (expected)' : ''}
        </span>
      </div>

      <h3 className="font-display font-semibold text-lg text-[var(--text)] leading-snug mb-1.5">
        {education.institution}
      </h3>
      <p className="text-[14.5px] text-[var(--accent)] mb-4">{education.degree}</p>

      <div className="space-y-2 text-[14px] flex-1">
        <div className="flex justify-between gap-4">
          <span className="text-[var(--text-faint)]">Major</span>
          <span className="text-[var(--text-soft)] text-right">{education.major}</span>
        </div>
        {education.minor && (
          <div className="flex justify-between gap-4">
            <span className="text-[var(--text-faint)]">Minor</span>
            <span className="text-[var(--text-soft)] text-right">{education.minor}</span>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <span className="text-[var(--text-faint)]">Location</span>
          <span className="text-[var(--text-soft)] text-right">
            {education.city}, {education.country}
          </span>
        </div>
      </div>

      {typeof education.gpa === 'number' && (
        <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-baseline justify-between">
          <span className="text-[13px] text-[var(--text-faint)]">CGPA</span>
          <span className="font-display font-semibold text-lg text-[var(--text)] tabular">
            {education.gpa}
            <span className="text-[13px] text-[var(--text-faint)] font-normal"> / {education.gpaScale}</span>
          </span>
        </div>
      )}
    </Card>
  );
}
