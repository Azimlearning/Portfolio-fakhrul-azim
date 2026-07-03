import type { Experience } from '@/types/portfolio';

export const experience: Experience[] = [
  {
    id: 'exp-001',
    slug: 'petronas-upstream-internship',
    featured: true,
    tier: 'legendary',
    status: 'complete',
    dateRange: { start: '2025-05', end: '2025-12' },
    organization: 'PETRONAS',
    division: 'Upstream',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    role: 'Intern · Data Analytics & Business Intelligence',
    employmentType: 'Internship',
    tech: ['Python', 'Power BI', 'SharePoint', 'Power Automate', 'Figma', 'Adobe Illustrator', 'Next.js', 'Firebase', 'LLM', 'RAG'],
    relatedProjects: ['prj-001', 'prj-002', 'prj-005'],
    summary: '8-month internship across product design, process automation, data visualization, and AI development for an upstream business unit.',
    responsibilities: [
      'Designed and managed internal department websites and digital platforms using Figma and Adobe Illustrator, lifting stakeholder engagement.',
      'Built a centralized data collection and storage architecture with Microsoft Power Automate + SharePoint, automating manual reporting.',
      'Engineered interactive Power BI dashboards and advanced Excel trackers visualizing commercial KPIs for the Upstream Leadership Team (ULT).',
      'Led development of VERA-AI, a knowledge-based AI assistant integrated with structured departmental data to automate internal query resolution.'
    ],
    impact: 'Three production-grade tools shipped (VERA-AI, the Systemic Shifts microsite, the PowerPoint Automation Suite). Manual reporting effort reduced; ULT now has self-serve dashboards.',
  },
];
