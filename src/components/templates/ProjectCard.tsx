'use client';

import React from 'react';
import { ArrowUpRight, Cpu, Globe, Eye, Code, Database, BarChart2, Users, Settings, HelpCircle } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import Card from '../ui/Card';
import { TIER_STYLES } from '@/lib/tiers';
import { usePortfolioStore } from '@/lib/store';
import { playClickSound } from '@/lib/sound';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  size?: 'large' | 'compact';
}

export function getProjectIcon(iconName: string, size = 20) {
  const props = { size, strokeWidth: 1.6 };
  switch (iconName) {
    case 'brain':      return <Cpu {...props} />;
    case 'globe':      return <Globe {...props} />;
    case 'eye':        return <Eye {...props} />;
    case 'users':      return <Users {...props} />;
    case 'gear':       return <Settings {...props} />;
    case 'chart':      return <BarChart2 {...props} />;
    case 'database':   return <Database {...props} />;
    case 'handshake':  return <HelpCircle {...props} />;
    default:           return <Code {...props} />;
  }
}

export default function ProjectCard({ project, onSelect, size = 'compact' }: ProjectCardProps) {
  const setHoveredTier = usePortfolioStore((s) => s.setHoveredTier);
  const tier = TIER_STYLES[project.tier];
  const isLarge = size === 'large';

  const handleOpen = () => {
    playClickSound();
    onSelect(project);
  };

  return (
    <Card
      interactive
      onClick={handleOpen}
      onMouseEnter={() => setHoveredTier(project.tier)}
      onMouseLeave={() => setHoveredTier(null)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
      className={`group flex flex-col cursor-pointer h-full ${isLarge ? 'p-8 md:p-10' : 'p-6'}`}
      // The spotlight border and hover accents inherit the tier color
      style={{ '--accent-line': tier.line } as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className={`rounded-xl border flex items-center justify-center ${
            isLarge ? 'w-13 h-13 p-3.5' : 'w-11 h-11 p-3'
          }`}
          style={{ background: tier.dim, borderColor: tier.line, color: tier.color }}
        >
          {getProjectIcon(project.icon, isLarge ? 22 : 18)}
        </div>
        <div className="flex items-center gap-2.5">
          {tier.label && (
            <span
              className="text-[11px] tracking-[0.08em] uppercase rounded-md px-2 py-1 border"
              style={{ color: tier.color, borderColor: tier.line }}
            >
              {tier.label}
            </span>
          )}
          <ArrowUpRight
            size={17}
            className="text-[var(--text-faint)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ transitionProperty: 'transform, color' }}
          />
        </div>
      </div>

      <h3
        className={`font-display font-semibold text-[var(--text)] leading-snug mb-2.5 ${
          isLarge ? 'text-2xl md:text-[27px]' : 'text-[17px]'
        }`}
      >
        {project.name}
      </h3>

      <p
        className={`text-[var(--text-soft)] leading-relaxed flex-1 ${
          isLarge ? 'text-[15px] max-w-[58ch]' : 'text-[13.5px] line-clamp-3'
        }`}
      >
        {isLarge ? project.tagline || project.summary : project.summary}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-6">
        {project.techStack.slice(0, isLarge ? 5 : 3).map((tech) => (
          <span
            key={tech}
            className="text-[12px] text-[var(--text-soft)] rounded-md border border-[var(--border)] bg-white/[0.02] px-2 py-1"
          >
            {tech}
          </span>
        ))}
        {project.context && (
          <span className="text-[12px] text-[var(--text-faint)] ml-auto truncate max-w-[45%]">
            {project.context}
          </span>
        )}
      </div>
    </Card>
  );
}
