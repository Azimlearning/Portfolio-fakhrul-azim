# CLAUDE.md
**Project:** Personal Portfolio — Fakhrul Azim
**Audience:** Claude Code (and other agentic coders working this repo)
**Last updated:** 2026-05-27

This file is what Claude reads first when working in this repo. It tells you how the project is organized, what the rules are, and where to look for the rest.

---

## What this project is

A personal portfolio website. Pixel-grammar 2D UI + cinematic voxel 3D world. Built with Next.js 15, React Three Fiber, GSAP ScrollTrigger, Tailwind v4.

**Audience:** Technical recruiters (8-second scan) and craft-aware developers (3-second impression). See `prd.md` §2.

---

## Document map — read these before writing code

| If you need to know... | Read this file |
|---|---|
| What we're building and for whom | `prd.md` |
| Visual language, motion language, 3D pipeline | `design-theme-v3.md` |
| File / folder architecture and template patterns | `file-structure.md` |
| Content (bio, projects, roles) entries | `portfolio-content.md` |
| Current project state and decisions made | `prd.md` §11 + each doc's §changelog |

**Read order for a new contributor:**
1. This file (CLAUDE.md) — orientation
2. `prd.md` — what and why
3. `design-theme-v3.md` — visual rules, hard prohibitions
4. `file-structure.md` — where things go
5. `portfolio-content.md` — only when touching content

---

## Hard rules (do these before anything else)

### 1. Template-first architecture
Adding a new project, role, skill, or any entry is a **data-file edit**, never new component code. Every entry type has a template component in `src/components/templates/` that renders any instance of that type from `src/data/<type>.ts`.

If you find yourself writing a one-off React component for one specific project, **stop and re-read `file-structure.md` §4**.

### 2. The 2D / 3D wall
2D UI rules and 3D rendering rules **never leak into each other**:
- 2D UI: hard borders, hard shadows (0 blur), Press Start 2P at display, no `backdrop-blur`, no `rounded-*`
- 3D scene: bloom, DoF, atmospheric fog, gradient sky — all required

If you're adding `backdrop-blur` to a card, you're wrong. If you're adding pixelation to the 3D scene, you're wrong.

See `design-theme-v3.md` §2.4 for the full prohibition list.

### 3. Website first, info second
Content (`portfolio-content.md`) is not finalized. Build templates with placeholder data. Render gracefully when fields are `null`. Never block development on content decisions.

### 4. Performance as a feature
60fps with bloom + DoF is the target. If a feature drops frame rate below target, the feature gets cut, not the frame rate. Drift detection runs before every commit (`design-theme-v3.md` §18).

### 5. Living documentation
All spec docs are versioned and dated. Significant decisions get changelog entries. Open questions are flagged `[OPEN]` and tracked in each doc's open-questions section.

---

## Repo layout — the short version

```
portfolio/
├── .claude/                    Slash commands, subagents, settings (this folder helps you)
├── CLAUDE.md                   This file
├── design-theme-v3.md          Visual + motion + 3D rules
├── file-structure.md           Folder architecture + template pattern
├── prd.md                      Product brief
├── portfolio-content.md        Content entries (source of truth)
└── src/
    ├── app/                    Next.js App Router pages
    ├── components/
    │   ├── sections/           Section composers (data → templates)
    │   ├── templates/          Entry templates (generic over entry types)
    │   ├── ui/                 Pure UI primitives
    │   ├── three/              R3F scene (canvas, milestones, effects)
    │   └── boot/               Boot screen
    ├── data/                   Entry instances (the slot-in zone)
    ├── lib/                    Store, sound, lenis, gsap, tokens
    ├── types/                  TypeScript interfaces
    ├── hooks/                  Custom hooks
    └── styles/                 Fonts and base styles
```

Full layout in `file-structure.md` §2–§3.

---

## Tech stack — quick reference

- **Framework:** Next.js 15 (App Router) — confirm before migrating from current Vite prototype
- **Language:** TypeScript strict mode
- **Styling:** Tailwind CSS v4 with `@theme` tokens (`@theme { --font-pixel: ... }`)
- **3D:** React Three Fiber + `@react-three/drei` + `@react-three/postprocessing`
- **3D camera:** GSAP + ScrollTrigger (scrubbed timeline, NOT raw scroll lerp)
- **Smooth scroll:** Lenis (required, not optional)
- **2D motion:** Motion (Framer Motion)
- **State:** Zustand
- **Sound:** Web Audio API (synthetic, opt-in)
- **Deploy:** Vercel

**Forbidden / removed:**
- ~~Pixelation post-process on the 3D scene~~ — deleted in v3
- ~~Raw scroll → camera lerp~~ — replaced by GSAP ScrollTrigger
- ~~Vanilla Three.js~~ — replaced by R3F (v2 used vanilla; v3 doesn't)
- Tone.js, shadcn, Material UI, `backdrop-filter` on 2D UI

---

## Common tasks

### Add a new project
1. Edit `src/data/projects.ts`, append a `Project` object
2. Drop cover image to `public/media/projects/<slug>/cover.png`
3. Done. The grid and `/projects/[slug]` route pick it up.

Or use the slash command: `/add-project`

### Add a new leadership role
Same pattern — `src/data/roles.ts`, then images in `public/media/leadership/<slug>/`.

Slash command: `/add-role`

### Update bio / contact / identity
Edit `src/data/identity.ts`. It's a singleton object.

### Add a new 3D milestone
1. Create `src/components/three/milestones/<Name>.tsx`
2. Compose voxel meshes inside; export default with `MilestoneProps` interface
3. Add coordinates to `src/data/milestones.ts`
4. Import in `src/components/three/Scene.tsx`
5. Add to the GSAP camera timeline in `CameraController.tsx`

### Run the dev server
```bash
npm run dev          # Next.js dev mode
npm run lint         # tsc --noEmit + eslint
npm run build        # production build
```

### Audit design drift before committing
Slash command: `/check-design-drift` — runs through `design-theme-v3.md` §18 checklist.

---

## Slash commands available

These live in `.claude/commands/`:

- `/add-project` — scaffold a new project entry (data file + media folder + slug check)
- `/add-role` — scaffold a new leadership role entry
- `/check-design-drift` — audit code against design-theme-v3 §18 checklist
- `/review-3d` — audit 3D scene against §8 performance budget and rendering rules
- `/sync-content` — sync `portfolio-content.md` entries to `src/data/*.ts` files
- `/spec` — quick reference / show current spec versions and open questions

See `.claude/commands/<name>.md` for each command's full spec.

---

## Subagents available

These live in `.claude/agents/`:

- `design-reviewer` — focused on `design-theme-v3.md` §2.4 hard prohibitions and §18 drift checklist
- `template-guard` — ensures changes follow the template-first pattern from `file-structure.md` §4
- `3d-scene-auditor` — audits R3F scene against `design-theme-v3.md` §8 (performance, post-processing, camera)

Invoke them for focused review tasks. They're scoped to their domain.

---

## When in doubt

- **Visual decision unclear?** `design-theme-v3.md` first; if not there, flag as `[OPEN]` and ask.
- **Where does this file go?** `file-structure.md` §3 has the full tree.
- **What's the right type / interface?** `src/types/portfolio.ts`.
- **What's the current decision on X?** Look at the changelog of the relevant doc.
- **Is X allowed?** If `design-theme-v3.md` §2.4 doesn't mention it, default to "yes but flag." If §2.4 says no, the answer is no.

---

## Things that have changed recently

- **v3 direction (2026-05-27):** Pivoted from pixelated-everything voxel world to **pixel UI + cinematic 3D**. The 3D rendering pipeline is completely different from the current Vite prototype. See `design-theme-v3.md` §1.2 and §20.
- **R3F is in (2026-05-27):** v2 banned `@react-three/fiber`; v3 mandates it.
- **GSAP for camera (2026-05-27):** v2 §3.2 banned GSAP from touching the camera; v3 reverses this — GSAP ScrollTrigger now drives the camera scrub.
- **Pixelation is out (2026-05-27):** The 4× pixelation render target from v2 §8.3 is deleted entirely.

---

## Open questions

Each spec doc has its own open-questions section. The highest-priority ones to resolve before deep dev work:

1. Confirm migration to Next.js (vs keep Vite) — `prd.md` §12, `design-theme-v3.md` §19
2. Decide whether leadership roles need detail subpages — `prd.md` §12, `file-structure.md` §12
3. Pick content sync strategy (manual vs parser) — `file-structure.md` §7

---

## Project status

**Current state:** v3 spec drafted. Existing Vite prototype reflects v2 spec (with pixelation). Migration to v3 pending direction confirmation from the project owner.

**Next milestone:** Confirm Next.js migration → port 2D UI components → rebuild 3D layer in R3F with new pipeline.
