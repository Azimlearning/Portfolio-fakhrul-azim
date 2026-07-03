'use client';

import React from 'react';
import type { Skill } from '@/types/portfolio';
import StatBar from '../ui/StatBar';

interface SkillBarProps {
  skill: Skill;
}

export default function SkillBar({ skill }: SkillBarProps) {
  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-baseline gap-4">
        <span className="text-[13.5px] text-[var(--text)]">
          {skill.name}
          {skill.yearsActive ? (
            <span className="text-[var(--text-faint)]"> · {skill.yearsActive}y</span>
          ) : null}
        </span>
        <span className="text-[12.5px] text-[var(--text-faint)] tabular">{skill.level}%</span>
      </div>
      <StatBar percentage={skill.level} />
    </div>
  );
}
