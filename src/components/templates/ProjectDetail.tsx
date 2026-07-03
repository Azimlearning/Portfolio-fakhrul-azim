'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Globe as GlobeIcon } from 'lucide-react';
import type { Project } from '@/types/portfolio';
import Card from '../ui/Card';
import Reveal from '../ui/Reveal';
import { getProjectIcon } from './ProjectCard';

interface ProjectDetailProps {
  project: Project;
}

const STATUS_LABEL: Record<string, string> = {
  'complete': 'Completed',
  'in-progress': 'In progress',
  'started': 'Early stage',
  'archived': 'Archived',
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const formatRange = () =>
    `${project.dateRange.start} — ${project.dateRange.end ?? 'present'}`;

  return (
    <div className="min-h-screen w-full bg-[var(--bg)] py-16 md:py-24">
      <div className="section-shell max-w-[860px]">
        <Reveal y={20}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13.5px] text-[var(--text-soft)] hover:text-[var(--accent)] transition-colors mb-10"
          >
            <ArrowLeft size={15} /> Back to portfolio
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-8 sm:p-12 relative overflow-hidden">
            {/* Ambient accent wash */}
            <div
              aria-hidden
              className="absolute -top-32 -right-32 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, var(--accent-dim), transparent 70%)' }}
            />

            <div className="flex items-start justify-between gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl border border-[var(--border)] bg-[var(--accent-dim)] text-[var(--accent)] flex items-center justify-center">
                {getProjectIcon(project.icon, 26)}
              </div>
              <span className="text-[12px] uppercase tracking-[0.1em] text-[var(--text-soft)] border border-[var(--border)] rounded-md px-2.5 py-1.5">
                {STATUS_LABEL[project.status] ?? project.status}
              </span>
            </div>

            <h1 className="display-xl text-gradient text-3xl sm:text-5xl mb-3">{project.name}</h1>
            <p className="text-[16px] text-[var(--text-soft)] leading-relaxed max-w-[60ch] mb-10">
              {project.tagline}
            </p>

            {/* Meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border border-[var(--border)] bg-white/[0.02] p-5 mb-10">
              {[
                { label: 'Role', value: project.role },
                { label: 'Timeline', value: formatRange() },
                { label: 'Category', value: project.category },
                { label: 'Context', value: project.context ?? 'Personal' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="label-mono mb-1.5">{m.label}</div>
                  <div className="text-[13.5px] text-[var(--text)]">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <h2 className="font-display font-semibold text-lg text-[var(--text)] mb-3">Overview</h2>
              <p className="text-[15px] leading-[1.85] text-[var(--text-soft)] max-w-[68ch]">
                {project.description}
              </p>
            </div>

            <div className="mb-10">
              <h2 className="font-display font-semibold text-lg text-[var(--text)] mb-4">Tech stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[13px] text-[var(--text-soft)] rounded-md border border-[var(--border)] bg-white/[0.02] px-3 py-1.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.links.github || project.links.live) && (
              <div className="flex flex-wrap gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <ExternalLink size={15} /> View source
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <GlobeIcon size={15} /> Live site
                  </a>
                )}
              </div>
            )}
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
