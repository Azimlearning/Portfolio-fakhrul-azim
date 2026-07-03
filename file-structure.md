# file-structure.md
**Project:** Personal Portfolio — Fakhrul Azim
**Version:** 1.0
**Status:** Active. Living document.
**Companion to:** `design-theme-v3.md`, `prd.md`, `CLAUDE.md`
**Last updated:** 2026-05-27

---

## 0. Purpose

This document defines the **file and folder architecture** for the portfolio. The goal is a **template-first codebase** where adding a new project, role, or skill is a data-file edit, not a component edit.

If you find yourself writing a new React component to add a new project, the architecture has been violated. Stop, find the existing template, and use it.

---

## 1. Core principle: templates over instances

**Every entry type follows this triangle:**

```
              ┌─────────────────────┐
              │  types/portfolio.ts │   The shape (TypeScript interface)
              └──────────┬──────────┘
                         │
            ┌────────────┴────────────┐
            ▼                         ▼
┌─────────────────────┐   ┌──────────────────────────┐
│  data/<type>.ts     │   │  templates/<Type>*.tsx   │
│  (instances, array) │   │  (render logic, generic) │
└─────────────────────┘   └──────────────────────────┘
            │                         │
            └────────────┬────────────┘
                         ▼
              ┌─────────────────────┐
              │ sections/<Type>.tsx │   The section that maps data → templates
              └─────────────────────┘
```

**Adding a new project = edit `data/projects.ts`. Nothing else.** The section component maps over the data array and renders the template for each entry. The detail subpage at `/projects/[slug]` looks up the entry by slug and renders the detail template.

---

## 2. Top-level layout (Next.js 15 App Router)

```
portfolio/
├── .claude/                        Claude Code config (commands, agents, settings)
├── .env.example                    Required env vars (Gemini key, analytics)
├── .gitignore
├── CLAUDE.md                       Project entry point for Claude Code
├── README.md                       Human-readable project README
├── design-theme-v3.md              Design spec (current)
├── design-theme-v2.md              Archived — kept for reference
├── portfolio-content.md            Content source (entries, bio, links)
├── prd.md                          Product requirements
├── file-structure.md               This file
├── next.config.ts                  Next.js config
├── package.json
├── postcss.config.js
├── tailwind.config.ts              Theme tokens, content paths
├── tsconfig.json                   strict: true
├── public/                         Static assets
│   ├── glb/                        Voxel models (compiled MagicaVoxel exports)
│   ├── hdri/                       Environment maps
│   ├── media/                      Photos, screenshots, OG images
│   ├── fallback-scene.webm         Mobile/fallback prerender
│   ├── resume.pdf                  CV
│   └── favicon.ico
├── content/                        Source-controlled raw assets
│   ├── vox/                        MagicaVoxel .vox sources (committed)
│   └── media/                      Pre-processed reference imagery
└── src/                            Application code (see §3)
```

---

## 3. src/ tree

```
src/
├── app/                            Next.js App Router
│   ├── layout.tsx                  Root layout — fonts, providers, lenis, theme
│   ├── page.tsx                    Home page — composes all section components
│   ├── globals.css                 Tailwind directives, CSS variables, base styles
│   ├── projects/
│   │   └── [slug]/
│   │       ├── page.tsx            Project detail subpage (uses ProjectDetailTemplate)
│   │       └── not-found.tsx       404 for unknown slug
│   ├── leadership/
│   │   └── [slug]/
│   │       ├── page.tsx            Leadership detail subpage (uses RoleDetailTemplate)
│   │       └── not-found.tsx
│   └── api/
│       └── gemini/
│           └── route.ts            Gemini chatbot endpoint (proxy + rate-limit)
│
├── components/
│   ├── sections/                   Section-level composers (data → templates)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── ProjectsSection.tsx     Maps projects[] → <ProjectCard />
│   │   ├── LeadershipSection.tsx   Maps roles[] → <RoleEntry />
│   │   ├── ExperienceSection.tsx   Maps experience[] → <ExperienceEntry />
│   │   ├── EducationSection.tsx    Maps education[] → <EducationCard />
│   │   ├── CertificatesSection.tsx Maps certificates[] → <CertCard />
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── TopBar.tsx
│   │
│   ├── templates/                  Entry templates (generic over entry types)
│   │   ├── ProjectCard.tsx         Card in grid — props: Project
│   │   ├── ProjectDetail.tsx       Full subpage — props: Project
│   │   ├── RoleEntry.tsx           Card in grid — props: Role
│   │   ├── RoleDetail.tsx          Full subpage — props: Role
│   │   ├── ExperienceEntry.tsx     Timeline entry — props: Experience
│   │   ├── EducationCard.tsx       Card — props: Education
│   │   ├── CertCard.tsx            Card — props: Certificate
│   │   ├── SkillBar.tsx            Wraps StatBar — props: Skill
│   │   └── ReferenceCard.tsx       Card — props: Reference
│   │
│   ├── ui/                         Pure UI primitives (no entry-shape coupling)
│   │   ├── PixelButton.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── Card.tsx                Base 3px-border + offset-shadow card
│   │   ├── Badge.tsx               Tier badges, status badges
│   │   ├── StatBar.tsx             Generic stat bar — used by SkillBar template
│   │   ├── DayNightToggle.tsx
│   │   ├── CRTScanlineOverlay.tsx
│   │   ├── ScrollHUD.tsx
│   │   ├── PixelDivider.tsx        Decorative dividers
│   │   ├── InventorySlot.tsx       Project card frame (rarity-aware)
│   │   └── InventoryModal.tsx      Project detail modal (alt to subpage)
│   │
│   ├── boot/
│   │   └── BootScreen.tsx          The opening curtain
│   │
│   ├── three/                      3D scene (R3F)
│   │   ├── Scene.tsx               Top-level <Canvas> + scene tree
│   │   ├── Atmosphere.tsx          <Sky />, <Stars />, <fog />
│   │   ├── EffectsChain.tsx        EffectComposer + post-FX
│   │   ├── CameraController.tsx    GSAP ScrollTrigger camera scrub
│   │   ├── characters/
│   │   │   └── ChibiCharacter.tsx  Reusable voxel chibi
│   │   ├── milestones/             Per-milestone scene assemblies
│   │   │   ├── HeroRoom.tsx        M1
│   │   │   ├── AboutDesk.tsx       M2
│   │   │   ├── ProjectsVault.tsx   M3
│   │   │   ├── LeadershipPlaza.tsx M4
│   │   │   └── ContactTerminal.tsx M5
│   │   └── primitives/             Reusable voxel building blocks
│   │       ├── Voxel.tsx           Single cube (instanced where possible)
│   │       └── VoxelGroup.tsx      Group helper with shared materials
│   │
│   └── chat/
│       └── GeminiChatbot.tsx       Neural Agent Portal (deferred to v3.1)
│
├── data/                           Content layer — the slot-in zone
│   ├── identity.ts                 Singleton: name, role, bio, contacts
│   ├── projects.ts                 Array<Project>
│   ├── roles.ts                    Array<Role>           (leadership)
│   ├── experience.ts               Array<Experience>     (work history)
│   ├── education.ts                Array<Education>
│   ├── certificates.ts             Array<Certificate>
│   ├── skills.ts                   Array<Skill>          (stat bar entries)
│   ├── strengths.ts                Array<Strength>       (core strengths)
│   ├── highlights.ts               Array<string>         (one-liners)
│   ├── references.ts               Array<Reference>
│   └── milestones.ts               Array<Milestone>      (3D scene anchor points)
│
├── lib/
│   ├── store.ts                    Zustand: theme, boot, audio, scrollProgress
│   ├── sound.ts                    Web Audio API engine
│   ├── lenis.ts                    Lenis smooth scroll setup
│   ├── gsap.ts                     GSAP + ScrollTrigger registration
│   ├── motion-tokens.ts            Easing + duration constants
│   ├── color-tokens.ts             Day/night color exports for 3D scene
│   └── format.ts                   Date / range formatting helpers
│
├── types/
│   └── portfolio.ts                All entry-type interfaces
│
├── hooks/
│   ├── useScrollProgress.ts        Subscribe to store scroll
│   ├── useTheme.ts                 Day/night with localStorage
│   ├── useLenis.ts                 Mount/unmount Lenis on layout
│   ├── useReducedMotion.ts         prefers-reduced-motion bridge
│   └── useMobile.ts                Width + perf probe → mobile flag
│
└── styles/
    └── fonts.ts                    Self-hosted font declarations
```

---

## 4. The template pattern in detail

### 4.1 Adding a new project — step by step

**Goal:** add a new project called "Robotics Pipeline v2."

1. **Open `data/projects.ts`**
2. **Append a new object** to the exported array:

```ts
// data/projects.ts
import type { Project } from '@/types/portfolio';

export const projects: Project[] = [
  // ... existing projects
  {
    id: 'prj-009',
    slug: 'robotics-pipeline-v2',
    name: 'Robotics Pipeline v2',
    tagline: 'Real-time vision-to-actuation control loop for industrial arms',
    tier: 'epic',                                    // rarity from §4 design-theme
    status: 'complete',
    featured: true,
    dateRange: { start: '2026-03', end: '2026-05' },
    role: 'Lead Engineer',
    techStack: ['Python', 'ROS 2', 'OpenCV', 'gRPC'],
    description: '...',                               // long-form markdown
    summary: '...',                                   // one-liner for card
    links: {
      github: 'https://github.com/.../robotics-pipeline-v2',
      live: null,
      writeup: null,
    },
    media: {
      cover: '/media/projects/robotics-pipeline-v2/cover.png',
      gallery: [
        '/media/projects/robotics-pipeline-v2/01.png',
        '/media/projects/robotics-pipeline-v2/02.png',
      ],
    },
  },
];
```

3. **Drop media files** into `public/media/projects/robotics-pipeline-v2/`
4. **That's it.** No new component code. The grid picks it up. `/projects/robotics-pipeline-v2` works automatically.

### 4.2 What makes this work

- `sections/ProjectsSection.tsx` does `projects.map(p => <ProjectCard key={p.id} project={p} />)` — it never references specific projects.
- `app/projects/[slug]/page.tsx` does `const project = projects.find(p => p.slug === params.slug)` and renders `<ProjectDetail project={project} />` — it never references specific projects.
- `<ProjectCard />` and `<ProjectDetail />` accept a `Project` and render every field they know how to handle, gracefully degrading on `null`/missing fields.

### 4.3 Anti-patterns (do not do these)

❌ **Don't** add a switch statement in `<ProjectCard />` like `if (project.id === 'prj-009')` — special-case logic doesn't belong in templates.

❌ **Don't** create `<ProjectCardSpecial />` for one project that needs different rendering — extend the `Project` type with an optional field and handle it in the template.

❌ **Don't** import project content directly into a section — always go through `data/projects.ts`.

❌ **Don't** hardcode counts ("show 6 projects") in the section — derive from `projects.filter(p => p.featured).length` or paginate.

---

## 5. Type definitions

All entry-type interfaces live in `types/portfolio.ts`. They mirror the YAML structure in `portfolio-content.md` so the data layer can be auto-derived from the content doc (see §7).

```ts
// types/portfolio.ts — abbreviated

export type Tier = 'common' | 'rare' | 'epic' | 'legendary';
export type Status = 'complete' | 'in-progress' | 'started' | 'archived';

export interface DateRange {
  start: string;            // 'YYYY-MM'
  end: string | null;       // null = present
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
  description: string;      // markdown
  summary: string;
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
  scope: string;            // e.g. '100+ members', '3 events'
  description: string;
  highlights: string[];
  links: {
    site: string | null;
  };
  media: {
    cover: string | null;
    gallery: string[];
  };
}

export interface Skill {
  id: string;
  name: string;
  category: 'language' | 'tool' | 'framework' | 'strength';
  level: number;            // 0–100 for stat bar
  yearsActive?: number;
}

// Other interfaces: Experience, Education, Certificate, Reference, Strength,
// Milestone, Identity. All follow the same id+slug+typed-fields pattern.
```

---

## 6. 3D scene structure

### 6.1 Why split into milestone files
v2 put all voxel construction in one 318-line `voxelModels.ts`. v3 splits each milestone into its own R3F component file because:

- Each milestone is its own composition — separate iteration cadence
- R3F components compose naturally — `<HeroRoom />` reads like JSX
- Per-file lazy imports if performance demands it later
- Designers can swap one milestone scene without touching the others

### 6.2 Milestone component contract
Every milestone in `components/three/milestones/` exposes:

```tsx
interface MilestoneProps {
  position: [number, number, number];   // world coordinates
  visible?: boolean;                    // for lazy reveal
}

export default function HeroRoom({ position, visible = true }: MilestoneProps) {
  // ... R3F scene composition
}
```

The parent `<Scene />` composition reads positions from `data/milestones.ts` so coordinates can be tuned without touching scene code.

### 6.3 Reusable 3D primitives
- `<Voxel position color emissive? />` — one cube. Uses `<Instances>` under the hood for batching.
- `<VoxelGroup>` — wrapper that pools materials and instances for child voxels.
- `<ChibiCharacter pose="sitting-desk" />` — reusable chibi. Pose drives the voxel arrangement.

---

## 7. Content sync (portfolio-content.md ↔ data/)

`portfolio-content.md` is human-authored. `data/*.ts` files are what the app reads. Two strategies, decide before content is finalized:

**Option A — Manual sync (simpler, lower automation):**
Editor updates `portfolio-content.md` first, then mirrors the change in `data/<type>.ts`. The `.claude/commands/sync-content.md` command helps Claude do this consistently.

**Option B — Parser pipeline (more automation, more setup):**
Build script reads `portfolio-content.md`, parses YAML blocks per entry, emits `data/<type>.ts` files. Source of truth is the markdown.

**Recommendation: A for v3.0, B if content updates become frequent.**

---

## 8. Routing map

| Route | Page | Data source | Template |
|---|---|---|---|
| `/` | Home — all sections | All `data/*.ts` | All section components |
| `/projects/[slug]` | Project detail | `data/projects.ts` | `<ProjectDetail />` |
| `/leadership/[slug]` | Role detail | `data/roles.ts` | `<RoleDetail />` |
| `/api/gemini` | Chatbot proxy | — | — |

**[OPEN]** Other detail subpages (experience, education, certs)? Currently no — they render inline on `/`. Add only if scope warrants.

---

## 9. Asset path conventions

```
public/
├── glb/
│   ├── chibi-character.glb         Compiled MagicaVoxel character export
│   └── milestones/                 Per-milestone .glb if hand-authored
│       └── hero-desk.glb
├── hdri/
│   └── studio-day.hdr              <Environment files={...} />
├── media/
│   ├── portrait.jpg                The 2D portrait shown in About
│   ├── projects/
│   │   └── <slug>/
│   │       ├── cover.png           1200×630 OG / card image
│   │       └── 01.png ... NN.png   Gallery
│   ├── leadership/
│   │   └── <slug>/
│   │       └── cover.png
│   └── og/                         Open Graph / social card defaults
├── resume.pdf
└── fallback-scene.webm             Mobile/fallback prerender
```

Paths in `data/*.ts` always start with `/` (Next.js public path) — never relative.

---

## 10. Build outputs

```
.next/                              Next.js build output (gitignored)
dist/                               Server bundle (if SSR)
node_modules/                       (gitignored)
```

---

## 11. What the v2 prototype already has that we keep

From the existing Vite build, port these forward:

- `src/components/ui/PixelButton.tsx` → `src/components/ui/PixelButton.tsx`
- `src/components/ui/SectionHeader.tsx` → same
- `src/components/ui/StatBar.tsx` → same
- `src/components/ui/InventorySlot.tsx` → same
- `src/components/ui/InventoryModal.tsx` → same
- `src/components/ui/QuestEntry.tsx` → rename to `templates/RoleEntry.tsx`
- `src/components/ui/DayNightToggle.tsx` → same
- `src/components/ui/CRTScanlineOverlay.tsx` → same
- `src/components/ui/ScrollHUD.tsx` → same
- `src/components/boot/BootScreen.tsx` → same
- `src/lib/store.ts` → same
- `src/lib/sound.ts` → same
- `src/data/portfolioData.ts` → **split** into per-type files under `data/`

What gets **rewritten**:
- `src/components/3d/ThreeScene.tsx` → split into R3F components under `components/three/`
- `src/components/3d/voxelModels.ts` → split into per-milestone components

---

## 12. Open questions

**[OPEN]** Confirm Next.js migration vs staying on Vite — affects routing strategy.

**[OPEN]** Content parser pipeline (option B in §7) — build now or defer?

**[OPEN]** Leadership subpages — needed, or grid-card-only?

**[OPEN]** Should `/projects/[slug]` and `/leadership/[slug]` share a single generic `<DetailLayout />` wrapper for hero, breadcrumbs, and CTA, or stay independent?

---

## 13. Change log

**v1.0 — 2026-05-27**
- Initial template-first architecture
- Next.js 15 App Router structure
- Section/Template/Data triangle defined
- Migration map from existing Vite prototype
