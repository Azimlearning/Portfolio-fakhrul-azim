export type Tier = 'common' | 'rare' | 'epic' | 'legendary';
export type Status = 'complete' | 'in-progress' | 'started' | 'archived';

export interface DateRange {
  start: string;            // 'YYYY-MM'
  end: string | null;       // null = present / ongoing
  expected?: boolean;       // future date marker
}

export interface Project {
  id: string;               // 'prj-XXX'
  slug: string;             // kebab-case URL segment
  name: string;
  tagline: string;
  tier: Tier;
  status: Status;
  featured: boolean;
  dateRange: DateRange;
  role: string;
  techStack: string[];
  description: string;      // long-form markdown/description
  summary: string;          // one-liner for card
  category: string;         // e.g. 'ai-ml', 'web-platform'
  icon: string;             // keyword for pixel icon (e.g. 'brain', 'globe')
  context: string | null;   // e.g. 'PETRONAS Internship'
  links: {
    github: string | null;
    live: string | null;
    writeup: string | null;
  };
  media: {
    cover: string | null;
    gallery: string[];
  };
}

export interface Role {
  id: string;               // 'ldr-XXX'
  slug: string;
  organization: string;
  position: string;
  tier: Tier;
  featured: boolean;
  dateRange: DateRange;
  scope: string | null;            // e.g. '100+ members'
  description: string;
  highlights: string[];
  icon: string | null;             // keyword for icon
  location: string | null;
  teamSize: string | number | null;
  sponsorshipSecured?: string | null;
  eventsDelivered?: string | number | null;
  durationEvent?: string | null;
  event_type?: string | null;
  links: {
    site: string | null;
  };
  media: {
    cover: string | null;
    gallery: string[];
  };
}

export interface Experience {
  id: string;               // 'exp-XXX'
  slug: string;
  featured: boolean;
  tier: Tier;
  status: Status;
  dateRange: DateRange;
  organization: string;
  division: string | null;
  city: string;
  country: string;
  role: string;
  employmentType: string;   // e.g. 'Internship'
  tech: string[];
  relatedProjects: string[];
  summary: string;
  responsibilities: string[];
  impact: string;
}

export interface Education {
  id: string;               // 'edu-XXX'
  featured: boolean;
  institution: string;
  abbreviation: string | null;
  city: string;
  state: string;
  country: string;
  degree: string;
  major: string;
  minor: string | null;
  dateStart: string | number;
  dateEnd: string | number;
  expected: boolean;
  gpa: string | number;
  gpaScale: string | number;
}

export interface Certificate {
  id: string;               // 'cert-XXX'
  slug: string;
  featured: boolean;
  tier: Tier;
  issuer: string;
  name: string;
  dateIssued: string;
  dateExpires: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  skills: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'language' | 'tool' | 'framework' | 'strength' | 'design' | 'database' | 'ai' | 'automation' | string;
  level: number;            // 0–100 for stat bar
  yearsActive?: number;
}

export interface Strength {
  name: string;
  score: number;            // 0-100 for stat bar
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  secondaryRole: string | null;
  institution: string;
  phone: string | null;
  email: string | null;
  publicVisible: boolean;
}

export interface Milestone {
  id: string;
  name: string;
  title: string;
  position: [number, number, number];
  lookAt: [number, number, number];
  description: string;
}

export interface Identity {
  nameFull: string;
  nameDisplay: string;
  nameShort: string;
  handle: string;
  pronouns: string;
  nationality: string;
  languages: string[];
  location: {
    city: string;
    state: string;
    country: string;
    timezone: string;
    studyCity: string;
  };
  taglines: {
    bootSubtitle: string;
    heroOneliner: string;
    heroMicroline: string;
  };
  bioShort: string;
  bioLong: string[];
  media: {
    photo2d: string | null;
    voxelAvatarRef: string | null;
    voxelAvatarGlb: string | null;
  };
}
