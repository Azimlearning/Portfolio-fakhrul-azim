import type { Role } from '@/types/portfolio';

export const roles: Role[] = [
  {
    id: 'ldr-001',
    slug: 'wa-no-kizuna',
    organization: 'UTP × Osaka universities × Japan Da\'wah Centre',
    position: 'Secretary (High Committee)',
    tier: 'legendary',
    featured: true,
    dateRange: { start: '2024-04', end: '2024-08' },
    scope: '20 committees, 10 days in Osaka',
    description: 'Managed communication and documentation as a high-committee member, coordinating between 20 committees, UTP management, Osaka universities, corporate sponsors, and Japan Da\'wah Centre. Supervised the protocol department to ensure smooth on-the-ground execution of the 10-day event.',
    highlights: [
      'Coordinated between UTP management, Osaka universities, and Japan Da\'wah Centre',
      'Supervised protocol department for 10-day overseas event coordination',
      'Secured RM100,000+ in corporate and university sponsorships'
    ],
    icon: 'torii',
    location: 'Osaka, Japan',
    teamSize: '20 committees',
    sponsorshipSecured: 'RM100,000+',
    durationEvent: '10 days',
    event_type: 'International student program',
    links: {
      site: null,
    },
    media: {
      cover: '/media/leadership/wa-no-kizuna/cover.png',
      gallery: [],
    },
  },
  {
    id: 'ldr-002',
    slug: 'griffin-esports-president',
    organization: 'UTP Griffin Esports Club',
    position: 'President',
    tier: 'legendary',
    featured: true,
    dateRange: { start: '2024-05', end: '2025-01' },
    scope: '100+ members, 10+ events',
    description: 'Led UTP Griffin Esports Club — restructured operations across three departments, secured RM20,000+ in sponsorships, and institutionalized processes that had previously been informal. Delivered 10+ competitive and recruitment events, raising club visibility regionally and nationally. Led UTP\'s representation at SUKIPT 2024 (national stage) and spearheaded Convocyber 2024 — a 52-team nationwide MLBB tournament generating RM5,000+ sponsorships and an RM3,500 prize pool.',
    highlights: [
      'Restructured operations across three distinct active departments',
      'Spearheaded Convocyber 2024 (52-team national tournament, RM3,500 prize pool)',
      'Secured RM20,000+ in sponsorships for club events',
      'Led UTP national esports representation at SUKIPT 2024'
    ],
    icon: 'trophy',
    location: 'UTP, Seri Iskandar',
    teamSize: '100+ members',
    sponsorshipSecured: 'RM20,000+',
    eventsDelivered: '10+',
    links: {
      site: null,
    },
    media: {
      cover: '/media/leadership/griffin-esports-president/cover.png',
      gallery: [],
    },
  },
  {
    id: 'ldr-003',
    slug: 'gdsc-utp-event-mgmt',
    organization: 'Google Developer Student Clubs — UTP',
    position: 'Assistant Head of Department, Event Management',
    tier: 'epic',
    featured: true,
    dateRange: { start: '2024-05', end: '2025-02' },
    scope: '35 committee members',
    description: 'Coordinated event-management arm of GDSC-UTP: workshop programming, recruitment pipelines, cross-club collaborations. Acted as Project Director for GDSC Kickoff × Family Day 2024 — led 17 committee members to deliver the chapter\'s large-scale onboarding event.',
    highlights: [
      'Project Director for GDSC Kickoff × Family Day 2024 onboarding event',
      'Supervised 35 committee members across workshops and development drives',
      'Coordinated cross-club programming and recruitment pipelines'
    ],
    icon: 'code',
    location: 'UTP, Seri Iskandar',
    teamSize: 35,
    links: {
      site: null,
    },
    media: {
      cover: '/media/leadership/gdsc-utp-event-mgmt/cover.png',
      gallery: [],
    },
  },
  {
    id: 'ldr-004',
    slug: 'celcomdigi-esports-battle-arena',
    organization: 'UTP × CelcomDigi',
    position: 'Project Director',
    tier: 'epic',
    featured: true,
    dateRange: { start: '2024-08', end: '2024-11' },
    scope: '30 team members, 24 teams',
    description: 'Led a 30-person team to organize the Celcomdigi Esports Battle Arena — a two-phase offline-then-online MLBB tournament with 24 teams. Owned sponsorship outreach, event streaming, logistics, and overall execution end-to-end.',
    highlights: [
      'Project Director leading a 30-person core organizational team',
      'Secured RM10,000 in corporate sponsorship from CelcomDigi',
      'Orchestrated two-phase (online & offline) 24-team MLBB tournament'
    ],
    icon: 'console',
    location: 'Hybrid (online + offline)',
    teamSize: 30,
    sponsorshipSecured: 'RM10,000 (CelcomDigi)',
    event_type: 'MLBB Tournament',
    links: {
      site: null,
    },
    media: {
      cover: '/media/leadership/celcomdigi-esports-battle-arena/cover.png',
      gallery: [],
    },
  },
  {
    id: 'ldr-005',
    slug: 'cyberhax-activity-welfare',
    organization: 'UTP CYBERHAX (cybersecurity club)',
    position: 'Assistant Head of Department, Activity & Welfare',
    tier: 'rare',
    featured: true,
    dateRange: { start: '2024-05', end: '2024-12' },
    scope: '20 committee members, 5 events',
    description: 'Assistant Head of the Activity & Welfare department at UTP CYBERHAX, the campus cybersecurity club. Assisted in leading the Cyber Skill Level-Up @ Flag Dive Workshop — a hands-on cybersecurity training event with a 20-member execution team.',
    highlights: [
      'Delivered 5 active hackathons, Capture-The-Flag (CTF) meets, and workshops',
      'Assisted leading the Cyber Skill Level-Up @ Flag Dive Workshop',
      'Coordinated welfare and logistics for a 20-member committee'
    ],
    icon: 'lock',
    location: 'UTP, Seri Iskandar',
    teamSize: 20,
    eventsDelivered: 5,
    links: {
      site: null,
    },
    media: {
      cover: '/media/leadership/cyberhax-activity-welfare/cover.png',
      gallery: [],
    },
  },
  {
    id: 'ldr-007',
    slug: 'debat-anti-rasuah-sprm',
    organization: 'SPRM (Suruhanjaya Pencegahan Rasuah Malaysia)',
    position: 'Secretary',
    tier: 'common',
    featured: true,
    dateRange: { start: '2024-05', end: '2024-06' },
    scope: 'Nationwide debate tournament',
    description: 'Managed documentation and communication ensuring smooth execution of a nationwide inter-university Malaysian debate competition organized in partnership with SPRM. Acted as the high-coordination point between organizers and participants.',
    highlights: [
      'Managed all core documentation and schedules for debate tournament',
      'High-coordination point between SPRM, organizers, and university teams'
    ],
    icon: 'scale',
    location: 'UTP, Seri Iskandar',
    teamSize: null,
    links: {
      site: null,
    },
    media: {
      cover: '/media/leadership/debat-anti-rasuah-sprm/cover.png',
      gallery: [],
    },
  },
];
