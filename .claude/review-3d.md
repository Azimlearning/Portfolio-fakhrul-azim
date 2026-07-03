---
description: Audit the R3F scene against design-theme-v3.md §8 performance and rendering rules
---

# /review-3d

Focused review of the 3D scene. Performance, post-processing chain, camera setup, voxel scope.

## When to use this command

- After changes to `src/components/three/**`
- When frame rate drops below target
- Before launching v3
- When iterating on visual quality of the scene

## What this command checks

### 8.1 World architecture
- Single `<Canvas>` at scene root
- Five milestone components present
- Each milestone in its own file under `src/components/three/milestones/`
- `<Atmosphere />`, `<EffectsChain />`, `<CameraController />` mounted

### 8.2 Voxel style guide
- Voxel scope is chibi + key objects only — not entire environments
- Ground planes are smooth (lit gradient mesh or contact shadow plane)
- Materials use `meshStandardMaterial` with `flatShading: true`, `roughness: 0.85`, `metalness: 0.1`
- Emissive surfaces tagged with `userData.isEmissive*` flags
- Day emissive intensity ≈ 0.3, night ≈ 2.5

### 8.3 Post-processing chain
- `<EffectComposer>` present in `EffectsChain.tsx`
- Order: DepthOfField → Bloom → ChromaticAberration → Vignette → Noise
- Bloom intensity switches on day/night (day 0.3, night 1.0)
- Bloom threshold switches (day 0.95, night 0.5)
- No PixelationPass anywhere — if found, hard violation

### 8.4 Camera
- `PerspectiveCamera` with FOV 35°
- GSAP timeline scrubs camera position + look-at
- ScrollTrigger `scrub: 0.5` (not 0, not true)
- 20+ camera sub-targets between milestones (anticipation, glide, settle)
- Look-at has its own timeline (sometimes leads/lags position)
- Idle drift on chibi (amplitude 0.12, period 2.5s)

### 8.5 Performance budget
Measure with React DevTools / Spector.js / browser perf panel:

| Metric | Target | How to measure |
|---|---|---|
| Total triangles | < 250k | `renderer.info.render.triangles` |
| Draw calls | < 80 | `renderer.info.render.calls` |
| Texture memory | < 60MB | `renderer.info.memory.textures` |
| Frame time | < 16ms desktop / < 33ms mobile | Performance panel |
| Bundle size | R3F+drei+postprocessing < 350KB gz | `npm run build` output |

### 8.6 Mobile fallback
- Performance probe at scene mount (`useMobile` hook or equivalent)
- Mobile drops Noise + ChromaticAberration
- Mobile lowers Bloom kernel size to `KernelSize.SMALL`
- `.webm` fallback exists at `/public/fallback-scene.webm`
- Fallback `<video>` swaps in if frame budget exceeded

### 8.7 Rendering model
- `<Canvas>` is `position: fixed; inset: 0; z-index: -1`
- 2D `<main>` has `position: relative; z-index: 10`
- 3D camera reads from Zustand `scrollProgress` AND GSAP timeline
- `aria-hidden="true"` on canvas element

## How to run

1. Inspect `src/components/three/Scene.tsx` and each milestone component.
2. Run dev server, open in browser, attach React DevTools.
3. Use Spector.js or Three.js Inspector to measure draw calls, triangles, texture mem.
4. Run `npm run build`, check bundle output for R3F-related chunks.
5. Test on a throttled mid-range mobile profile in Chrome DevTools.

## Output format

```
3D SCENE AUDIT — <timestamp>

ARCHITECTURE:
  ✓ Canvas single root
  ✓ 5 milestones present
  ✗ EffectsChain missing Vignette — add per §8.3

VOXEL SCOPE:
  ✓ Chibi + key objects voxel
  ✗ Ground plane in HeroRoom uses BoxGeometry grid — replace with gradient mesh (§8.2)

POST-PROCESSING:
  ✓ DoF, Bloom, CA, Noise present
  ✗ Vignette missing
  ✓ No PixelationPass

CAMERA:
  ✓ FOV 35°
  ✓ GSAP ScrollTrigger driving
  ✗ Only 5 keyframes — add sub-targets per §8.4

PERFORMANCE:
  ✓ 187k triangles
  ✗ 102 draw calls — over budget by 22, use <Instances>
  ✓ 42MB texture memory

MOBILE:
  ✓ webm fallback exists
  ✗ Performance probe not wired
```

## Don't

- Don't optimize without measuring first.
- Don't disable post-processing wholesale to hit framerate. The post-FX *is* the v3 aesthetic. Drop noise/CA first, then DoF, then bloom — bloom is last to cut.
- Don't reintroduce pixelation post-process under any circumstances.

## Reference

- `design-theme-v3.md` §8 (3D / voxel system) — full spec
- `design-theme-v3.md` §13.1 — performance non-negotiables
