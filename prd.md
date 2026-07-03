# prd.md
**Project:** Personal Portfolio — Fakhrul Azim
**Version:** 1.0
**Status:** Active. Living document.
**Companions:** `design-theme-v3.md`, `file-structure.md`, `portfolio-content.md`, `CLAUDE.md`
**Last updated:** 2026-05-27

---

## 0. Purpose

This is the **product brief**. It says what we're building, who it's for, what success looks like, and what we're explicitly not building. It does not say *how* — that's `design-theme-v3.md` (visual) and `file-structure.md` (technical).

---

## 1. The product in one paragraph

A personal portfolio website for Fakhrul Azim — Computer Science student at UTP, PETRONAS intern, esports org president. The site combines a pixel-grammar 2D UI with a cinematic 3D voxel world. Visitors scroll through five 3D milestone scenes while the 2D layer presents projects, leadership work, skills, and contact info. Adding new projects or roles is a data-file edit, not a code change.

---

## 2. Audience

In priority order:

1. **Technical recruiters & hiring managers** at FAANG-tier, premium product companies (Linear, Vercel, Figma adjacents), and design-aware tech firms. They scan in 8 seconds and decide whether to read more. They need to find name, role, projects, and contact fast.
2. **Engineering peers and design-aware developers** — people who recognize the difference between "made with Three.js tutorials" and "shipped to a real awwwards-tier standard." This audience evaluates craft. They are the people whose retweets matter.
3. **University and student-org contacts** — peers, club members, event collaborators. They already know Azim; the site needs to reinforce, not introduce.

**Anti-audience (do not optimize for):** Generic enterprise corporate recruiters who'd be confused by anything non-templated. They were the audience for v2's earlier RPG-character-sheet direction; v3 explicitly chooses craft signal over corporate-safe.

---

## 3. Success criteria

The site is successful if all of these are true after launch:

- **Recruiter test (8s scan):** A first-time visitor can locate Azim's name, current role, top three projects, and a way to contact him within 8 seconds of landing on `/`.
- **Craft test (3s impression):** A developer who has seen motionsites.ai, jesse-zhou.com, or top awwwards portfolios recognizes this site as that tier of work within 3 seconds.
- **Performance:** LCP < 1.8s on mid-tier laptop, 60fps sustained on the 3D scene, mobile graceful fallback works.
- **Update velocity:** Adding a new project takes < 10 minutes total — most of that writing the description, not editing components.
- **Accessibility:** WCAG AA on both day and night themes. `prefers-reduced-motion` honored.
- **SEO:** Indexed for `"fakhrul azim portfolio"`, `"fakhrul azim petronas"`, `"fakhrul azim utp"`. Open Graph cards render correctly on LinkedIn, Twitter, Discord.

---

## 4. Scope

### 4.1 In scope (v3.0)

**Pages:**
- `/` — home with all sections
- `/projects/[slug]` — individual project detail subpages
- `/leadership/[slug]` — individual role detail subpages

**Sections on `/`:**
- Hero — name, role, scroll prompt
- About — portrait, bio, education card, core strengths (stat bars)
- Projects — grid of featured projects (uses `<ProjectCard />`)
- Leadership — grid of featured roles (uses `<RoleEntry />`)
- Contact — form, primary contact info

**Features:**
- 3D scrolling voxel world with cinematic post-processing
- Day/night theme toggle (persists to localStorage)
- Boot sequence opening
- Pixel-style 2D UI throughout
- Audio FX (opt-in, off by default)
- Rarity tier system for projects (common/rare/epic/legendary)
- Mobile responsive — graceful fallback for low-perf devices
- Reduced-motion fallback

### 4.2 Deferred to v3.1+

- Gemini chatbot ("Neural Agent Portal") — v2 §10.13 — gated until core ships
- Blog / writing section — not yet
- CMS integration (Sanity) — only if project count exceeds 12
- Analytics dashboard — basic Vercel Analytics OK; nothing custom

### 4.3 Out of scope

- E-commerce / payments
- Multi-user / auth
- Comments / discussion
- RSS feed (no blog yet)
- Multi-language i18n (English only)
- Mobile native app

---

## 5. Development principles

### 5.1 Website first, info second
**Content is not blocked on content being final.** `portfolio-content.md` is being iterated — projects may be added/removed, bios may shift, decisions like which roles are featured may flip. The website must not block on these.

**Approach:**
- Build templates with placeholder data first.
- All entry data lives in `data/<type>.ts` files — separate from components.
- Render gracefully when fields are `null` (skip, show `—`, or hide cleanly).
- A complete UI with 80% real content beats a delayed launch with 100% real content.

### 5.2 Template-first architecture
See `file-structure.md` §1 and §4. Every entry type follows the **types → data → template → section** triangle. Adding a new entry must never require new component code.

This is a hard rule. If you find yourself writing a one-off component for one project, you're doing it wrong.

### 5.3 Design system is non-negotiable
The hard prohibitions in `design-theme-v3.md` §2.4 are enforcement targets. Drift detection (§18 of design spec) runs before every commit. The 2D UI rules and 3D rendering rules cannot leak into each other — pixel grammar in 2D, cinematic atmosphere in 3D, no exceptions.

### 5.4 Performance is a feature
A 60fps voxel scene with bloom + DoF beats a 30fps scene with more detail. Cull aggressively. Instance everything repeated. Compress all assets. If a feature drops the frame rate below target, the feature gets cut, not the frame rate.

### 5.5 Living documentation
Every spec doc in this repo is versioned and marked living. Open questions are flagged `[OPEN]` and listed at the bottom of each doc. Decisions get changelog entries. Nothing is finalized until the changelog says so.

---

## 6. Tech stack summary

Full details in `design-theme-v3.md` §3. Top-line:

- **Framework:** Next.js 15 (App Router) — [OPEN: confirm vs current Vite prototype]
- **Language:** TypeScript strict mode
- **Styling:** Tailwind CSS v4 with `@theme` tokens
- **3D:** React Three Fiber + drei + postprocessing
- **3D camera:** GSAP ScrollTrigger scrubbed timeline
- **Smooth scroll:** Lenis
- **2D motion:** Motion (Framer Motion)
- **State:** Zustand
- **Sound:** Web Audio API (synthetic, no samples)
- **Deploy:** Vercel

---

## 7. Content model summary

Every content entry has a unique stable ID (`prj-001`, `ldr-002`, etc.) and a YAML+markdown shape defined in `portfolio-content.md`. The TypeScript interfaces in `src/types/portfolio.ts` mirror these.

**Entry types:**
- `Identity` — singleton (name, bio, links)
- `Project` (`prj-XXX`) — array
- `Role` (`ldr-XXX`) — array — leadership / involvement
- `Experience` (`exp-XXX`) — array — work history
- `Education` (`edu-XXX`) — array
- `Certificate` (`cert-XXX`) — array
- `Skill` — array — for stat bars
- `Strength` — array — core strengths
- `Reference` (`ref-XXX`) — array
- `Milestone` — array — 3D scene anchor points

All content sourced from `portfolio-content.md`. See `file-structure.md` §7 for sync strategy.

---

## 8. User journeys

### 8.1 The recruiter scan (primary)
1. Lands on `/`
2. Hero loads — sees name, role one-liner, instant
3. Scrolls — 3D camera moves, sections enter
4. Glances at project grid — sees cards with cover images and tier badges
5. Clicks one project that catches their eye → `/projects/<slug>` detail
6. Reads description, scans tech stack, finds repo link
7. Clicks back, scrolls to Contact
8. Clicks email / LinkedIn
9. Total time: 30–90 seconds

**The 3D scene is atmosphere, not navigation.** The 2D UI must be self-sufficient.

### 8.2 The craft-aware peer (secondary)
1. Lands on `/`
2. Notices the boot sequence — smiles
3. Sees the smooth 3D camera move + post-processing — recognizes it's not a Three.js tutorial clone
4. Toggles day/night — appreciates the transition
5. Opens DevTools out of curiosity — sees clean component structure
6. Scrolls slowly to watch the camera move through all five milestones
7. Maybe shares the link

### 8.3 The mobile visitor
1. Lands on `/`
2. 3D scene either renders at reduced quality OR shows `.webm` fallback
3. Content sections scroll naturally
4. Project cards are touch-friendly
5. Detail subpages render full content
6. Contact form works

---

## 9. Constraints

- **Solo developer build.** No team. Scope must fit one person's iteration time.
- **Free / hobbyist hosting tier OK.** Vercel free tier is sufficient. No databases. No paid services beyond domain.
- **No personal data collection.** Contact form goes to a static endpoint or email service. No user accounts. No analytics that store PII.
- **Browser support:** Latest Chrome, Safari, Firefox, Edge. No IE. iOS Safari 16+. Android Chrome current.

---

## 10. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| 3D scene tanks performance on low-end devices | High | Mobile performance probe + `.webm` fallback (design §8.6) |
| Voxel + premium rendering still reads "Minecraft" | Medium | Reviews against motionsites.ai aesthetic at every milestone; iterate atmosphere/lighting until peer reviews land |
| Adding new projects becomes painful | Medium | Template-first architecture enforced; `.claude/commands/add-project.md` scaffold |
| Content drift between `portfolio-content.md` and `data/` | Medium | Sync strategy in `file-structure.md` §7; eventually automate |
| Spec docs balloon and become stale | Low | Living doc convention; every change logs |
| Recruiter doesn't get the gaming reference | Medium | Pixel grammar restraint — gaming language only at display sizes; recruiter test enforced |

---

## 11. Decision log (recent)

- **2026-05-27**: Direction set to Hybrid (Option C) — pixel UI + cinematic 3D. See design-theme-v3 §1.2.
- **2026-05-27**: GSAP ScrollTrigger now allowed to drive 3D camera (v2 §3.2 prohibition reversed).
- **2026-05-27**: R3F + drei + postprocessing now in (v2 §3.3 reversed).
- **2026-05-27**: 4× pixelation post-process removed entirely.

---

## 12. Open questions

**[OPEN]** Confirm Next.js migration vs staying on Vite. Migration recommended but adds 1–2 days work.

**[OPEN]** Leadership detail subpages — needed or grid-card only?

**[OPEN]** Content sync strategy — manual mirror or parser pipeline? Recommendation: manual for now.

**[OPEN]** Chatbot (Gemini portal) — in v3.0 or defer to v3.1? Recommendation: defer.

**[OPEN]** Voxel chibi authoring — hand MagicaVoxel or procedural R3F? Recommendation: MagicaVoxel for production, procedural for prototype.

**[OPEN]** Launch target — when does v3.0 ship? No deadline currently committed.

---

## 13. Change log

**v1.0 — 2026-05-27**
- Initial PRD for v3.0 direction
- Scope, audience, success criteria, development principles defined
- Open questions consolidated
