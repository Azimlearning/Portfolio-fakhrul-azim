---
description: Quick reference — current spec versions, open questions, recent decisions
---

# /spec

Print a quick reference to the current spec state. Useful at the start of a session or before a decision.

## What this shows

### Current spec versions
- Read the version + date headers from each spec doc:
  - `design-theme-v3.md` → §0 / top matter
  - `prd.md` → top matter
  - `file-structure.md` → top matter
  - `portfolio-content.md` → top matter
  - `CLAUDE.md` → last-updated

### Open questions (across all docs)
Grep `[OPEN]` markers across `*.md` files in the project root. Display as a flat list:

```
[OPEN] design-theme-v3.md §19 — Migrate to Next.js or stay on Vite?
[OPEN] design-theme-v3.md §19 — HDRI source for <Environment />?
[OPEN] design-theme-v3.md §19 — Voxel chibi: hand MagicaVoxel or procedural R3F?
[OPEN] design-theme-v3.md §19 — Leadership detail subpages needed?
[OPEN] design-theme-v3.md §19 — /blog section in scope?
[OPEN] file-structure.md §12 — Content parser pipeline now or later?
[OPEN] prd.md §12 — Launch target?
```

### Recent decisions
Show the most recent entries from each doc's changelog (top 3). For example:

```
DECISIONS (latest first):
2026-05-27 — design-theme v3.0 — Direction set to Hybrid (pixel UI + cinematic 3D)
2026-05-27 — design-theme v3.0 — R3F + drei + postprocessing added; vanilla Three removed
2026-05-27 — design-theme v3.0 — GSAP ScrollTrigger now drives 3D camera (v2 §3.2 reversed)
2026-05-27 — design-theme v3.0 — 4× pixelation post-process deleted
2026-05-27 — prd v1.0 — Initial PRD for v3 direction
2026-05-27 — file-structure v1.0 — Template-first architecture defined
```

### Hard prohibitions (quick reference)
Print `design-theme-v3.md` §2.4 list:

- `border-radius: 0` on cards/buttons/inputs/modals (DayNightToggle pill exception)
- No `backdrop-filter: blur()` on 2D UI surfaces
- No `box-shadow` with blur > 0 in 2D UI
- No semi-transparent card backgrounds
- No `font-sans` on display elements
- No `scale(1.02)` card hovers — translate + shadow shrink only
- Rarity colors exclusive to the rarity system
- Every card has a visible 3px ink border
- 3D: bloom, DoF, atmospheric fog, gradient sky — required, not optional
- 3D: no pixelation post-process

## How to run

1. `cat` each spec doc's header (first 10 lines)
2. `rg "\[OPEN\]" *.md`
3. `rg "^- \*\*v" design-theme-v3.md prd.md file-structure.md | head -10` for recent changelog entries

Format the output as a single readable digest. Don't dump full files.

## Reference

- All spec docs at project root
