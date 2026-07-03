# Portfolio Development — Kickoff Prompt
Paste this as the first message to your AI coding agent in a new Claude Code session.
The agent already has CLAUDE.md context from the .claude folder — this prompt activates it.

---

## BEGIN PROMPT (copy everything below this line)

---

You are the lead developer on my personal portfolio website. This is the kickoff for active development. Read everything before touching a file.

## Step 1 — Read the spec docs (do this before any other action)

Read these four files in this order. Do not skip any. Do not start coding until you've read all four.

1. `CLAUDE.md` — project orientation, hard rules, common tasks
2. `prd.md` — what we're building, audience, success criteria, development principles
3. `design-theme-v3.md` — visual language, motion language, 3D pipeline rules
4. `file-structure.md` — folder architecture, the template-first pattern

Also read `portfolio-content.md` — this is the content source (bio, projects, leadership roles, skills). Note that it's not finalized. Build templates with placeholder data; slot real content in later.

## Step 2 — Understand the current state

There is an existing prototype at the root of this repo (Vite + React 19 + raw Three.js). It was built to a previous spec (v2). It is not the target — it is a reference.

**What's worth keeping from the prototype:**
- All 2D UI components (`PixelButton`, `SectionHeader`, `StatBar`, `InventorySlot`, `InventoryModal`, `DayNightToggle`, `CRTScanlineOverlay`, `ScrollHUD`, `BootScreen`) — these mostly match the spec. Port them.
- `store.ts`, `sound.ts` — keep, minor edits only.
- `portfolioData.ts` — split this into per-type files under `src/data/` (see `file-structure.md` §3).

**What needs to be replaced:**
- The entire 3D pipeline — v2 used vanilla Three.js with a 4× pixelation render target. v3 uses React Three Fiber + `@react-three/drei` + `@react-three/postprocessing` + GSAP ScrollTrigger. The pixelation pass is **deleted entirely** — if you see `PixelationPass` anywhere, delete it.
- The camera driver — v2 used raw `scrollProgress → camera.position.lerp`. v3 uses a GSAP-scrubbed timeline with 20+ sub-targets. No per-frame lerp.

## Step 3 — Confirm one decision before starting (ask me, don't assume)

**Framework migration:** The spec calls for Next.js 15 (App Router) because it gives us dynamic routes for `/projects/[slug]` and `/leadership/[slug]` subpages naturally. The current prototype is Vite. Before you write any new code:

1. List what it would take to migrate to Next.js 15 (rough effort, what changes, what carries over).
2. List what it would take to stay on Vite + React Router for the same dynamic routes.
3. Give me your recommendation.
4. Wait for my answer before proceeding.

Everything else in the spec is decided. This is the only open call I need from you before work begins.

## Step 4 — Your first sprint

Once I've confirmed the framework decision, work through this sequence. **Do not skip ahead.**

### Sprint 1A — Foundation (do this first, ~1 day)
- Initialize the new project structure (Next.js 15 or Vite per my decision)
- Set up Tailwind v4 with the `@theme` tokens from `design-theme-v3.md` §4
- Install and configure: Zustand, Lenis, GSAP + ScrollTrigger, Motion (Framer)
- Install R3F dependencies: `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- Self-host fonts: Press Start 2P, VT323, Geist Sans, Geist Mono
- Set up `src/types/portfolio.ts` — all entry-type interfaces from `file-structure.md` §5
- Set up `src/data/` — one file per entry type, seeded with placeholder data from `portfolio-content.md`

Do not proceed to 1B until 1A compiles cleanly with `tsc --noEmit`.

### Sprint 1B — 2D UI components
Port the 2D UI components from the existing prototype into the new structure (`src/components/ui/`). Run the design drift check (`.claude/commands/check-design-drift.md`) after each component. No new 2D UI components — port what exists.

Then build the template components (`src/components/templates/`): `ProjectCard`, `RoleEntry`, `SkillBar`, `EducationCard`, `CertCard`. Each takes a typed entry as a prop. No hardcoded content. Render gracefully when fields are `null`.

Then build the section composers (`src/components/sections/`): each section maps over its data array and renders the template. `ProjectsSection` maps `projects[]` → `<ProjectCard />`. That's the whole pattern.

The home page `/` should render all sections with placeholder data and pass the design drift check before you touch the 3D layer.

### Sprint 1C — 3D scene (start here only after 1B is done)
Build the 3D scene in R3F. Start with the skeleton, not the art.

**Order:**
1. `src/components/three/Scene.tsx` — `<Canvas>` with all children stubbed
2. `src/components/three/EffectsChain.tsx` — full EffectComposer chain per `design-theme-v3.md` §8.3 (DoF → Bloom → CA → Vignette → Noise)
3. `src/components/three/CameraController.tsx` — GSAP ScrollTrigger timeline, 20+ sub-targets, `scrub: 0.5`
4. `src/components/three/Atmosphere.tsx` — `<Sky />`, `<Stars />`, `<fog />`
5. `src/components/three/milestones/HeroRoom.tsx` — the hero scene only (placeholder chibi box is fine)
6. Run `/review-3d` audit before adding more milestones

Get one milestone working and post-processed before building the other four.

## Hard rules (read `design-theme-v3.md` §2.4 for the full list)

These are non-negotiable. Run `/check-design-drift` before every commit.

- `border-radius: 0` on all 2D UI cards, buttons, inputs. Zero exceptions except the DayNightToggle pill.
- No `backdrop-blur` on any 2D UI surface.
- All `box-shadow` in 2D UI has `0` blur — hard offset shadows only.
- No `PixelationPass` anywhere. If you find one, delete it.
- No `camera.position.lerp(...)` in `useFrame` for scroll — use the GSAP timeline only.
- Adding a new project/role/entry = `src/data/<type>.ts` edit only. No new component code.
- The 2D UI and 3D rules are completely separate. Pixel grammar in 2D. Cinematic atmosphere in 3D.

## Success check for this kickoff

After Sprint 1B (before starting 3D), the site should:
- Compile with `tsc --noEmit` — zero type errors
- Render all sections on `/` with placeholder data
- Pass the design drift check (no hard violations)
- Show boot screen → reveal → sections with correct pixel grammar
- Have clean template pattern: adding a dummy project to `data/projects.ts` shows up in the grid automatically

After Sprint 1C (first 3D milestone done):
- R3F canvas renders without console errors
- EffectComposer chain active (bloom visible, no pixelation)
- Camera scrubs with scroll via GSAP timeline
- Day/night toggle transitions via GSAP (not per-frame lerp)
- `/review-3d` audit passes

## What I care most about (the non-technical read)

When I scroll through this site, I want the 3D world to feel like a film — heavy post-processing, atmospheric depth, camera that has weight and anticipation. The 2D UI should feel like a pixel RPG — hard edges, hard shadows, typed-in boot sequence. The contrast between those two layers is the whole idea.

The thing that killed v2 was the camera moving like a tutorial and the pixelation making it look like Minecraft. Both of those are structural decisions, not art decisions. The spec in `design-theme-v3.md` §3.2 explicitly reverses those decisions. Trust the spec.

Start with the framework question. I'll answer and then you build.

---

## END PROMPT
