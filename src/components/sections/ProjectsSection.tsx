'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ExternalLink, ChevronDown, GraduationCap } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project, ProjectOrigin } from '@/types/portfolio';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard, { getProjectIcon } from '../templates/ProjectCard';
import InventoryModal from '../ui/InventoryModal';
import { TIER_STYLES } from '@/lib/tiers';
import { playClickSound } from '@/lib/sound';

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const isCoursework = (p: Project) => p.context?.toLowerCase().includes('coursework') ?? false;

type Filter = 'all' | ProjectOrigin;

const FILTER_LABELS: Record<Filter, string> = {
  all: 'All',
  internship: 'PETRONAS',
  utp: 'UTP',
  hackathon: 'Hackathons',
  personal: 'Personal',
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [courseworkOpen, setCourseworkOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');

  // Only offer tabs that actually have entries
  const availableFilters: Filter[] = [
    'all',
    ...(['internship', 'utp', 'hackathon', 'personal'] as ProjectOrigin[]).filter((o) =>
      projects.some((p) => p.origin === o)
    ),
  ];

  const visible = filter === 'all' ? projects : projects.filter((p) => p.origin === filter);
  const mainProjects = visible.filter((p) => !isCoursework(p));
  const coursework = visible.filter(isCoursework);

  const showcase = filter === 'all' ? mainProjects.slice(0, 2) : [];
  const rest = filter === 'all' ? mainProjects.slice(2) : mainProjects;

  const formatRange = (p: Project) =>
    `${p.dateRange.start} — ${p.dateRange.end ?? 'present'}`;

  const metrics = selectedProject
    ? [
        { label: 'Role', value: selectedProject.role },
        { label: 'Timeline', value: formatRange(selectedProject) },
        { label: 'Stack', value: selectedProject.techStack.slice(0, 4).join(' · ') },
        ...(selectedProject.context ? [{ label: 'Context', value: selectedProject.context }] : []),
      ]
    : [];

  const footerAction = selectedProject?.links.github ? (
    <a
      href={selectedProject.links.github}
      target="_blank"
      rel="noopener noreferrer"
      onClick={playClickSound}
      className="btn btn-primary w-full"
    >
      <ExternalLink size={15} />
      View source
    </a>
  ) : (
    <div className="w-full text-center text-[13px] text-[var(--text-faint)] rounded-xl border border-dashed border-[var(--border-strong)] py-3.5">
      Private repository — built for internal use
    </div>
  );

  return (
    <section id="projects" className="w-full py-20 md:py-28">
      <div className="section-shell">
        <SectionHeader
          kicker="03 — Projects"
          sub="AI assistants, automation pipelines, and data tools. Color marks the tier: amber is flagship work, blue are major builds. Select any card for details."
        >
          Selected work.
        </SectionHeader>

        {/* Origin filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8 -mt-6 md:-mt-10">
          {availableFilters.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => {
                  playClickSound();
                  setFilter(f);
                }}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full text-[13px] border transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[var(--accent-line)] bg-[var(--accent-dim)] text-[var(--accent)]'
                    : 'border-[var(--border)] bg-white/[0.02] text-[var(--text-soft)] hover:text-[var(--text)] hover:border-[var(--border-strong)]'
                }`}
              >
                {FILTER_LABELS[f]}
              </button>
            );
          })}
        </div>

        <motion.div
          key={filter}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-90px' }}
          className="grid grid-cols-1 gap-5"
        >
          {/* Showcase pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {showcase.map((project) => (
              <motion.div key={project.id} variants={cardVariants} className="h-full">
                <ProjectCard project={project} onSelect={setSelectedProject} size="large" />
              </motion.div>
            ))}
          </div>

          {/* Remaining major builds */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((project) => (
              <motion.div key={project.id} variants={cardVariants} className="h-full">
                <ProjectCard project={project} onSelect={setSelectedProject} />
              </motion.div>
            ))}
          </div>

          {/* Coursework — collapsed into one compact expandable row */}
          {coursework.length > 0 && (
            <motion.div variants={cardVariants}>
              <div className="glass overflow-hidden">
                <button
                  onClick={() => {
                    playClickSound();
                    setCourseworkOpen((v) => !v);
                  }}
                  aria-expanded={courseworkOpen}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 cursor-pointer text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className="w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{
                        background: TIER_STYLES.common.dim,
                        borderColor: TIER_STYLES.common.line,
                        color: TIER_STYLES.common.color,
                      }}
                    >
                      <GraduationCap size={17} strokeWidth={1.6} />
                    </span>
                    <div>
                      <span className="font-display font-medium text-[15.5px] text-[var(--text)]">
                        University coursework
                      </span>
                      <span className="block text-[13px] text-[var(--text-faint)]">
                        {coursework.length} builds — {coursework.map((p) => p.techStack[0]).join(', ')}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    size={17}
                    className={`text-[var(--text-faint)] transition-transform duration-300 ${
                      courseworkOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {courseworkOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="border-t border-[var(--border)] divide-y divide-white/[0.04]">
                        {coursework.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              playClickSound();
                              setSelectedProject(p);
                            }}
                            className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left cursor-pointer hover:bg-white/[0.03] transition-colors group"
                          >
                            <div className="min-w-0">
                              <span className="block text-[14px] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate">
                                {p.name}
                              </span>
                              <span className="block text-[12.5px] text-[var(--text-faint)] truncate">
                                {p.summary}
                              </span>
                            </div>
                            <span className="text-[12px] text-[var(--text-soft)] rounded-md border border-[var(--border)] px-2 py-1 shrink-0">
                              {p.techStack[0]}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </motion.div>

        <InventoryModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          tier={selectedProject?.tier || 'common'}
          title={selectedProject?.name || ''}
          subtitle={selectedProject?.context || ''}
          icon={selectedProject ? getProjectIcon(selectedProject.icon, 22) : null}
          description={selectedProject?.description || ''}
          metrics={metrics}
          footerAction={footerAction}
        />
      </div>
    </section>
  );
}
