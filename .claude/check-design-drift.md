---
description: Audit the codebase against design-theme-v3.md §18 drift detection checklist
---

# /check-design-drift

Run the drift detection checklist from `design-theme-v3.md` §18 against the current working tree. Report violations before they get committed.

## When to use this command

- Before committing UI changes
- After porting components from the v2 prototype
- When reviewing PRs / feature branches
- After any change touching `src/components/`, `src/app/globals.css`, or `tailwind.config.ts`

## What this command checks

### Visual grammar (2D UI)
- `border-radius` — must be `0` on cards/buttons/inputs/modals (DayNightToggle pill is the only exception)
- `backdrop-blur` — forbidden on 2D UI surfaces
- `box-shadow` — every declaration must have `0` blur (search for non-zero blur values)
- `bg-*/N` opacity — forbidden on card backgrounds (any `/`-suffix opacity below 1)
- All cards have `border-[3px] border-ink` (or equivalent `--ink` color)
- Hover states use `translate-x-* translate-y-*` + shadow shrink — never `scale(*)` or `hover:scale-*`

### Visual grammar (3D)
- `<EffectsChain />` is present in the scene tree
- Bloom + DoF + Vignette + Noise are wired
- **No `PixelationPass` anywhere** — if found, flag as a hard violation
- No raw `BoxGeometry` cubes used for ground planes — use lit gradient mesh or `<ContactShadows />`
- `<Sky />` or HDRI `<Environment />` present — no skybox cube
- Voxel scope: chibi + key objects only, not full environments

### Typography
- Body prose uses `font-sans` (Geist Sans / Inter)
- Display elements use `font-pixel` (Press Start 2P)
- HUD/terminal elements use `font-terminal` (VT323)
- No pixel font in body paragraphs (`<p>`, `<li>`, etc.)

### Camera + motion
- GSAP ScrollTrigger drives camera in `src/components/three/CameraController.tsx`
- ScrollTrigger `scrub` value is `0.5` (camera) or `false` (2D reveals)
- Lenis is mounted at app root (`src/app/layout.tsx` or `useLenis` hook)
- Day/night transitions use one GSAP timeline (not per-frame lerp)
- No raw `camera.position.lerp(...)` in `useFrame` for scroll-driven movement

### Templates
- Every section that lists entries iterates over `data/<type>.ts` via `.map(...)`
- No hardcoded entry content in section components
- All entry types have a template component in `src/components/templates/`
- No `if (entry.id === '...')` branches in templates

### 3D scene performance
- < 80 draw calls (instrument if not measured)
- < 250k triangles
- Mobile fallback `.webm` exists at `/public/fallback-scene.webm`
- Performance probe mounted at scene init

## How to run

1. Open relevant source files and scan for the patterns above.
2. Use `rg` (ripgrep) for fast searches:
   ```bash
   rg "rounded-(sm|md|lg|xl|2xl|full)" src/components --type tsx
   rg "backdrop-blur" src/components --type tsx
   rg "shadow-\[\d+px_\d+px_\d+px" src/components  # finds shadows with non-zero blur
   rg "hover:scale|hover:transform.*scale" src/components
   rg "PixelationPass" src
   rg "camera\.position\.lerp" src/components/three
   ```
3. For each violation found, report:
   - File and line
   - The violating pattern
   - The §X rule it breaks
   - Suggested fix

## Output format

Group findings by severity:

```
🔴 HARD VIOLATIONS (must fix before commit):
  - <file>:<line> — PixelationPass found, must be deleted (§3.3, §8.3)
  - <file>:<line> — backdrop-blur on card (§2.4)

🟡 SOFT VIOLATIONS (should fix, flag if not):
  - <file>:<line> — Card uses bg-white/70 (§2.4)
  
🟢 PASSED (X categories)
```

## Don't

- Don't refactor code without asking — just report findings.
- Don't relax rules. If a rule blocks a needed feature, escalate as an `[OPEN]` question in `design-theme-v3.md`.

## Reference

- `design-theme-v3.md` §2.4 — hard prohibitions
- `design-theme-v3.md` §18 — full drift detection checklist
- `design-theme-v3.md` §7 — borders & shadows vocabulary
- `design-theme-v3.md` §8 — 3D rendering pipeline
