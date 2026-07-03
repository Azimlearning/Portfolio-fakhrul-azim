'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project } from '@/types/portfolio';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard, { getProjectIcon } from '../templates/ProjectCard';
import InventoryModal from '../ui/InventoryModal';
import { playClickSound } from '@/lib/sound';

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const showcase = projects.slice(0, 2);
  const rest = projects.slice(2);

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
    <section id="projects" className="w-full py-28 md:py-36">
      <div className="section-shell">
        <SectionHeader
          kicker="02 — Projects"
          sub="AI assistants, automation pipelines, and data tools — from internship deliverables to coursework builds. Select any card for details."
        >
          Selected work.
        </SectionHeader>

        <motion.div
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

          {/* Remaining grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((project) => (
              <motion.div key={project.id} variants={cardVariants} className="h-full">
                <ProjectCard project={project} onSelect={setSelectedProject} />
              </motion.div>
            ))}
          </div>
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
