# design-theme.md
**Project:** Personal Portfolio — Fakhrul Azim
**Version:** 3.0 — *Hybrid Direction*
**Status:** Active. Living document — sections marked **[OPEN]** are unresolved.
**Supersedes:** v2.0 (2026-05-27)
**Last updated:** 2026-05-27

---

## 0. How to use this document

This is the single source of truth for **visual language, motion language, and frontend architecture**. Content (bio, projects, roles) lives in `portfolio-content.md`. Product scope and templates live in `prd.md`. File layout lives in `file-structure.md`.

**v3 is a directional change, not a polish pass.** v2 specced a pixelated-everything voxel world. v3 splits the layers: 2D UI keeps its pixel grammar; the 3D scene becomes cinematic and atmospheric. The contrast between the two is the whole idea.

If something contradicts v2 below and isn't explicitly flagged as a v3 change, assume v2 is right and flag the conflict.

---

## 1. The big idea (v3)

### 1.1 One-line
> A pixel-grammar UI scrolling above a cinematic voxel world — Press Start 2P meets motionsites.ai atmosphere.

### 1.2 What changed from v2
v2's hero move was **render everything voxel, then pixelate the whole frame at 4×**. The result reads as Minecraft because cubes-plus-pixelation is structurally the Minecraft aesthetic, regardless of palette or lighting.

v3 splits it:
- **2D UI layer**: pixel grammar stays — hard borders, hard shadows, Press Start 2P at display, VT323 in HUD, 80/15/5 palette. Everything in §4–§7 of v2 still applies.
- **3D layer**: voxel *geometry* stays (chibi character + key objects are still cubes), but the rendering pipeline goes premium. No pixelation post-process. Add bloom, depth of field, atmospheric fog, contact shadows, gradient sky, soft volumetric lighting.

The chibi character on a smooth, art-directed backdrop is the unclaimed combination — it reads "MagicaVoxel render in a film" rather than "Minecraft mod."

### 1.3 The unclaimed niche (revised)
Most retro/pixel portfolios stay flat 2D. Most premium 3D portfolios (motionsites.ai, awwwards top tier) use abstract gradient meshes or smooth GLTF and feel generic-glossy. The empty middle is **voxel objects rendered with cinematic post-processing, framed by a pixel-language UI**. Very few people are doing this. It has identity that the gradient-mesh portfolios don't, and polish that pure-pixel portfolios can't reach.

### 1.4 Anchor references (revised)
| Source | What we pull |
|---|---|
| **motionsites.ai** | Atmospheric depth, gradient sky, post-processing chain, cinematic camera pacing — now an *aesthetic* reference, not just composition |
| **jesse-zhou.com** | Whole-site 3D world, scroll-driven single-scene storytelling |
| **DJMsXSr1jec (priority ref)** | Camera scrub timing, cinematic transitions, layered atmospheric depth |
| **JS Mastery R3F portfolio series** | R3F + drei + postprocessing + GSAP ScrollTrigger pattern |
| **Olivier Larose / GSAP showcase** | ScrollTrigger camera scrubbing, the "scrubbed timeline" feel |
| **MagicaVoxel community renders (ArtStation)** | Voxel character lit cinematically — the look we're targeting |
| **Yan Liu Design (vibe-coded 404)** | Pixel charm in the 2D UI layer only |
| **Persona 5** | Information density, hard typographic edges, restraint with the gaming language |
| **Stripe dashboard** | Recruiter-safe restraint baseline |

References explicitly **demoted** from v2: Pokémon Gold/Silver, Steam profile pages. They informed v2's all-pixel direction, which we're stepping back from.

---

## 2. Design philosophy

### 2.1 Dual-audience rule (unchanged from v2)
Every screen passes both tests:
- **Recruiter test** — 8-second scan locates name, role, projects, contact.
- **Craft test** — a developer or designer who has seen motionsites.ai, jesse-zhou.com, or top awwwards portfolios recognizes this as that tier of work within 3 seconds.

Note that "gamer test" from v2 has been demoted to "craft test." Gamer recognition is now a bonus, not a target.

### 2.2 The five principles (revised)
1. **Pixel grammar in the UI, cinematic motion in the 3D.** The two layers speak different visual languages on purpose. The tension is the signature.
2. **Hard edges, hard shadows — but only in 2D.** The 2D UI rule from v2 §7 stands: 3px solid borders, 0-blur offset shadows, integer-px translates. The 3D world is the opposite — soft, atmospheric, lit, fogged.
3. **The 3D world is a film, not a diagram.** Camera moves are timeline-scrubbed with anticipation, settle, and overshoot. Lights and atmosphere change with scroll, not just position. Removing the 3D should make the site feel half-empty.
4. **Restraint with the gaming language.** Pixel fonts at display sizes only. Rarity tiers only where information warrants them. Voxel characters communicate personality, not costume.
5. **Performance is a design feature.** 60fps with bloom + DoF on a mid-tier laptop is the target. If post-processing tanks frame rate, post-processing gets cut before we cut motion.

### 2.3 What we explicitly reject (revised)
Same as v2, plus:
- ~~Pixelation post-process on the 3D scene~~ — **removed from the pipeline entirely**
- Voxel environments built from `for (x,z)` cube grids without atmospheric context — voxel objects are art-directed compositions, not Minecraft chunks
- Generic Three.js skybox cubes — atmosphere is shader-driven gradient or HDRI
- ScrollTrigger that only fires section reveals — ScrollTrigger now drives the 3D camera as a scrubbed timeline (§9.3)

### 2.4 Hard prohibitions (mostly unchanged from v2)
All v2 §2.4 prohibitions still apply to the **2D UI layer**:
- `border-radius: 0` on cards/buttons/inputs/modals (DayNightToggle pill is the only exception)
- No `backdrop-filter: blur()` on 2D UI surfaces
- No `box-shadow` with blur > 0 in 2D UI
- No semi-transparent card backgrounds
- No `font-sans` on display elements
- No `scale(1.02)` card hovers — translate + shadow shrink only
- Rarity colors are exclusive to the rarity system
- Every card has a visible 3px ink border

**v3 lifts these prohibitions for the 3D layer only:**
- Atmospheric fog, bloom, DoF, soft volumetric lighting are **required**, not forbidden
- Gradient skybox / shader sky is **required**
- 3D materials may have non-zero roughness, soft normals, and emissive bloom

The wall between 2D and 3D rendering rules is absolute. A pixel-edged 3px ink border on a card is correct. A pixel-edged 3px line in the 3D scene is wrong.

---

## 3. Tech stack (v3)

### 3.1 Locked decisions
| Layer | Choice | Reason |
|---|---|---|
| **Framework** | **Next.js 15 (App Router)** | SSR for SEO, RSC for fast first paint, dynamic routes for `[slug]` subpages (§10 templates) |
| **3D runtime** | **React Three Fiber (R3F)** + `@react-three/drei` | Reversed from v2. Native React composition of the 3D scene matches the template-first architecture (file-structure.md). drei gives us `<Float>`, `<Environment>`, `<ContactShadows>`, `<Sky>`, `<Stars>` out of the box. |
| **3D post-processing** | **`@react-three/postprocessing`** + `postprocessing` library | Reversed from v2. Required for bloom, DoF, vignette, chromatic aberration, film grain. The PixelationPass is **not used**. |
| **Camera scroll driver** | **GSAP + ScrollTrigger** | Reversed from v2 §3.2. ScrollTrigger scrubs the camera along a timeline with eased keyframes. The raw `scrollProgress → lerp` from v2 produced the floaty amateur motion the user flagged. |
| **Smooth scroll** | **Lenis** | Required now (was optional in v2). Without it the granular scroll input cascades into granular camera motion. |
| **Styling** | **Tailwind CSS v4** | Unchanged. Token-driven via `@theme`. |
| **2D motion** | **Motion (Framer Motion)** | Unchanged. Layout animations, stagger reveals, gesture feedback. |
| **State** | **Zustand** | One store: `theme`, `bootComplete`, `audioEnabled`, `scrollProgress`, `activeSection`. |
| **Sound** | **Raw Web Audio API** | Unchanged. Synthetic oscillators. No samples. |
| **Asset pipeline** | **MagicaVoxel → `.vox` → `.glb`** via `vox-to-gltf` | Source `.vox` committed; `.glb` are build artifacts. |
| **Type checking** | **TypeScript strict mode** | Non-negotiable. |
| **Deploy** | **Vercel** | Unchanged. |

### 3.2 What changed from v2 stack
| Decision | v2 | v3 | Why |
|---|---|---|---|
| 3D framework | Vanilla Three.js | **R3F + drei** | Component model matches template-first architecture. Easier to compose milestone scenes as React components. drei primitives give premium feel for free. |
| Post-processing | Custom render target (pixelation only) | **EffectComposer chain** | Bloom, DoF, fog, vignette, film grain are the "premium 3D" signature |
| Camera driver | Raw `scrollY` → lerp at 0.08/frame | **GSAP ScrollTrigger scrubbed timeline** | v2's approach produces the floaty amateur feel; scrubbed timelines feel locked-to-scroll |
| Pixelation pass | 4× downsample + NearestFilter upscale | **Removed entirely** | This is the structural cause of the Minecraft read |
| Lenis smooth scroll | Optional (§3.4) | **Required** | Granular scroll input ruins scrubbed camera |
| GSAP role | 2D section reveals only | **2D reveals + 3D camera scrubbing** | v2 §3.2 prohibition is reversed |

### 3.3 What we are not using
- ~~`@react-three/fiber`~~ — *now used* (was on this list in v2)
- ~~`@react-three/postprocessing`~~ — *now used* (was on this list in v2)
- `@react-three/postprocessing`'s `PixelationPass` — pixelation is removed entirely, not relocated
- Tone.js — replaced by Web Audio API
- Webflow, Framer (no-code), Spline as primary 3D
- shadcn, Material UI — own component vocabulary
- `backdrop-filter` on 2D UI surfaces (still banned)

### 3.4 Migration from current Vite build
The existing prototype is Vite + React 19 + raw Three.js. For v3:
- **Port the 2D UI components as-is** (`PixelButton`, `SectionHeader`, `StatBar`, `InventorySlot`, `QuestEntry`, `BootScreen`, `DayNightToggle`, `CRTScanlineOverlay`, `ScrollHUD`) — these already match the spec.
- **Rewrite the 3D layer**: port `voxelModels.ts` cubes into R3F components (`<HeroRoom />`, `<AboutDesk />`, etc.). Drop the render target pixelation pipeline. Add `<EffectsChain />`.
- **Switch framework**: Vite → Next.js 15. This is a meaningful migration but pays off for `[slug]` dynamic routes (§10 templates).
- **Keep**: `store.ts`, `sound.ts`, `portfolioData.ts` (will be re-shaped into per-type files per `file-structure.md`).

**[OPEN]** *Keep Vite or migrate to Next.js?* — Recommendation is migrate, but the prototype works. Confirm before the dev starts.

---

## 4. Color system (unchanged from v2)

§4.1 Design intent, §4.2 Day palette, §4.3 Night palette, §4.5 Usage rules — **all unchanged**. Reference v2 §4.

### 4.4 Voxel scene lighting (revised for v3)

v2 had only ambient + directional. v3 adds atmospheric depth.

| State | Sky / atmosphere | Ambient | Key light | Fill | Post-FX |
|---|---|---|---|---|---|
| **Day** | `<Sky />` from drei, gradient cream→sky-blue, sun position (10, 6, -2) | `#cfe4f0`, 0.6 | `#fff4dc` directional, 2.5, pos (20, 40, 20) | `#f4ecd8` hemisphere fill, 0.4 | Bloom (intensity 0.3, threshold 0.95), DoF focus on chibi, fog `#f4ecd8` near 30 far 120, vignette 0.2 |
| **Night** | `<Sky />` shifted to deep blue, sun position below horizon; `<Stars />` overlay 350 count | `#0a0c1a`, 0.2 | `#9db8d6` moon directional, 0.5 | `#6e7fa3` rim light, 0.6 | Bloom (intensity 1.0, threshold 0.5) — phosphor screens bloom heavily, DoF same, fog `#0a0c1a` near 25 far 100, vignette 0.4, slight chromatic aberration 0.0008 |

All transitions are GSAP-timeline-tweened on the day/night toggle — duration 800ms, ease `power2.inOut`. No `lerp` per frame; GSAP handles the curve.

---

## 5. Typography (unchanged from v2)

Reference v2 §5 in full. Press Start 2P / VT323 / Geist Sans / Geist Mono stack and surface mapping unchanged. The 3D world has **no typography in 3D space** in v3 — labels and section names sit in the 2D HTML layer above.

---

## 6. Spacing, grid, radius (unchanged from v2)

Reference v2 §6. Hard rule: `border-radius: 0` on 2D UI surfaces.

---

## 7. Borders, shadows, depth (revised)

### 7.1–7.3 unchanged
Reference v2 §7 for border specification, hard-shadow vocabulary, dot-grid background.

### 7.4 Glassmorphism prohibition (revised)
**On 2D UI surfaces: still forbidden.** No `backdrop-filter`, no semi-transparent card backgrounds, no soft glows on 2D borders.

**In 3D rendering: required.** Bloom, DoF, atmospheric fog, soft shadows, volumetric lighting — these are the v3 hero moves. The 3D scene without them is incomplete.

The 2D and 3D rules cannot leak into each other.

---

## 8. 3D / voxel system (rewritten for v3)

### 8.1 World architecture
Still five milestone locations in a single continuous scene. The camera travels between them as the user scrolls. v2 §8.1 coordinates are still valid as starting points but **will be refined** as camera sub-targets are added (§8.4).

```
WORLD (one R3F <Canvas>)
├── <Environment />            HDRI ambient light + IBL
├── <Sky />                    Gradient sky (day/night switches)
├── <Stars />                  Night-only particle field
├── <Atmosphere />             Volumetric fog wrapper
├── <HeroRoom />               M1: chibi at desk
├── <AboutDesk />              M2: portrait + open book
├── <ProjectsVault />          M3: floating cartridges
├── <LeadershipPlaza />        M4: flag + plaza
├── <ContactTerminal />        M5: CRT + chibi at keyboard
├── <ContactShadows />         Soft ground shadows under all chibis/objects
├── <CameraController />       GSAP-driven scrubbed timeline
└── <EffectsChain />           Postprocessing chain
```

### 8.2 Voxel style guide (revised)
**Voxel geometry — what stays voxel:**
- Chibi character (the hero of every shot)
- Key interactive objects: desk, CRT/monitor, terminal keyboard, project cartridges, leadership flag, open book

**Smooth geometry — what becomes atmospheric:**
- Ground / floor planes (now lit gradient planes with contact shadows, not voxel tiles)
- Backdrops and skybox (gradient shaders)
- Decorative atmosphere (volumetric clouds, dust motes, particle drift)

This is the v3 mix. Voxel hero subjects on smooth atmospheric stages.

**Materials (revised):**
- `meshStandardMaterial` with `roughness: 0.85`, `metalness: 0.1`, `flatShading: true` — voxel objects still keep flat-shaded faces, but lit by full PBR pipeline
- Emissive surfaces (screens, headphones, lanterns) use `meshStandardMaterial` with high `emissiveIntensity` so bloom picks them up
- Day: emissive intensity 0.3 (bloom barely catches them)
- Night: emissive intensity 2.5 (bloom is the hero)

### 8.3 Post-processing chain (replaces v2 §8.3 entirely)

The v2 4× pixelation pass is **deleted**. The new chain:

```tsx
<EffectComposer>
  <DepthOfField
    focusDistance={0.02}
    focalLength={0.05}
    bokehScale={2.5}
    height={480}
  />
  <Bloom
    intensity={isNight ? 1.0 : 0.3}
    luminanceThreshold={isNight ? 0.5 : 0.95}
    luminanceSmoothing={0.4}
    mipmapBlur
  />
  <ChromaticAberration
    offset={[0.0004, 0.0004]}
    blendFunction={BlendFunction.NORMAL}
  />
  <Vignette
    eskil={false}
    offset={0.4}
    darkness={isNight ? 0.4 : 0.2}
  />
  <Noise
    opacity={0.025}
    blendFunction={BlendFunction.OVERLAY}
  />
</EffectComposer>
```

**Order matters.** DoF → Bloom → CA → Vignette → Noise. Bloom after DoF so out-of-focus highlights still bloom. Noise last so it overlays the whole composite.

**Performance note.** On mobile (< 640px width) drop Noise and ChromaticAberration, lower Bloom resolution to `KernelSize.SMALL`. Drop DoF if frame budget exceeds 16ms.

### 8.4 Camera — scrubbed timeline (replaces v2 §8.4)

**Type:** `PerspectiveCamera`, FOV 35° (down from v2's 40° — tighter framing reads more cinematic).

**Driver:** GSAP ScrollTrigger scrubs a timeline. The timeline has **20+ sub-targets**, not 5 keyframes. The 5 milestones are anchor points; between them are 3–4 sub-positions per segment that give the camera anticipation, drift, and settle.

```tsx
// Pseudocode
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5, // 0.5s smoothing — locks to scroll but absorbs micro-jitter
  }
});

// M1 → M2 — 4 sub-positions
tl.to(camera.position, { x: 7.5,  y: 6,    z: 8.5,  ease: 'power2.in' });   // M1 land
tl.to(camera.position, { x: 12,   y: 8,    z: 4,    ease: 'none' });        // anticipate
tl.to(camera.position, { x: 22,   y: 10,   z: -6,   ease: 'none' });        // glide
tl.to(camera.position, { x: 32,   y: 11,   z: -11,  ease: 'power2.out' });  // M2 settle
// ... etc for M2→M3, M3→M4, M4→M5
```

**Idle drift** (when scroll is stationary > 500ms): camera position has a slow sine drift on x and y, amplitude 0.15, period 6s. This keeps the world feeling alive even when the user stops scrolling.

**Look-at:** A separate timeline scrubs `<lookAt>` with its own keyframes. Look-at sometimes leads, sometimes lags the camera position — this gives the cinematic "head turn" feel rather than the locked-axis tour-bus feel of v2.

**Voxel object animation (idle):**
- Chibi: vertical bob, amplitude 0.12, period 2.5s (unchanged from v2)
- Cartridges: y-bob staggered phase + slow y-rotation 0.35–0.5 rad/s (unchanged)
- Particles: drift via R3F's `useFrame` + perlin noise

### 8.5 Performance budget (revised)
| Metric | Target | Notes |
|---|---|---|
| Total triangles | < 250k | Same as v2 |
| Draw calls | < 80 | Same. Use `<Instances>` for repeated voxels. |
| Texture memory | < 60MB | Increased from v2's 30MB to allow HDRI |
| LCP | < 1.8s | Slightly relaxed from v2's 1.5s — post-processing adds startup cost |
| Time to interactive | < 4.5s on mid-tier laptop | Same as v2 |
| Target frame rate | 60fps desktop / 30fps mobile graceful | Same as v2 |
| Bundle JS (excluding R3F/drei/postprocessing) | < 250KB gzipped | Increased from v2's 200KB |

**R3F/drei/postprocessing bundle weight:** ~180KB gzipped combined. Acceptable cost for the visual return.

### 8.6 Mobile strategy (revised)
- Screen width ≤640px: drop Noise + ChromaticAberration, lower Bloom kernel, optionally drop DoF
- Performance probe: measure frame time for the first 30 frames. If average > 40ms, switch to **video fallback** (pre-rendered `.webm` of the hero camera move) — unchanged from v2

### 8.7 Rendering model — the layering decision (unchanged from v2 §8.7)
Fixed-canvas model. Three.js canvas is `position: fixed; inset: 0; z-index: -1`. 2D `<main>` scrolls above it with `position: relative; z-index: 10`. The 3D camera tracks scroll position via the Zustand `scrollProgress` float **and** the GSAP timeline.

---

## 9. Motion (revised)

### 9.1 Easing tokens (unchanged)
```
ease-pixel       cubic-bezier(0.16, 1, 0.3, 1)      UI snaps, card reveals, section enters
ease-bounce      cubic-bezier(0.34, 1.56, 0.64, 1)   toggle thumb, achievement stamps
ease-cinematic   power2.inOut (GSAP)                3D camera moves, day/night transitions
ease-linear-step steps(2, end)                     cursor blinks
```
v3 adds `ease-cinematic` for 3D camera and atmospheric transitions.

### 9.2 Duration scale (unchanged)
See v2 §9.2.

### 9.3 GSAP responsibility (REVISED — v2 §3.2 reversed)
**GSAP now drives the 3D camera.** Specifically:
- ScrollTrigger scrubs the camera position + look-at timelines (§8.4)
- ScrollTrigger triggers 2D section reveal animations (entry stagger, hero card fade-in)
- Day/night transition timelines (atmosphere, lighting, post-FX intensity) — orchestrated by GSAP

ScrollTrigger config:
- `scrub: 0.5` for camera (smooth lock)
- `scrub: false` for 2D reveals (fire once on enter)

### 9.4 Motion (Framer) responsibility (unchanged)
React component animations only: boot curtain lift, card stagger, hero entrance, toggle thumb spring. Never use CSS `transition` for these.

### 9.5 Signature motion moments
- **Boot curtain lift** (Motion): 800ms power2.inOut, curtain slides up to reveal scene + UI together
- **Hero card entrance** (Motion): 600ms ease-pixel, 30px y-translate + opacity fade, delay 200ms after boot
- **Camera entry to M1** (GSAP): 1200ms power2.out, camera drops from above into starting position as boot ends
- **Day → night transition** (GSAP timeline, 800ms): atmosphere lerp, fog color, bloom intensity, star opacity, emissive intensity, body bg variable crossfade — **all on one timeline**, sequenced
- **Section reveal** (Framer + ScrollTrigger): when section enters viewport, stagger children with `delayChildren: 0.1, staggerChildren: 0.06`

### 9.6 Reduced motion (unchanged)
`prefers-reduced-motion: reduce` → disable scrub camera, snap camera to milestone positions discretely; disable bloom flicker; disable noise overlay; disable idle drift.

---

## 10. Component vocabulary (revised + extended)

### 10.1–10.14 Existing components (unchanged from v2)
BootScreen, TopBar, HeroCard, InventorySlot, InventoryModal, QuestEntry, StatBar, PixelButton, DayNightToggle, ScrollHUD, Pixel cursor, ContactForm, GeminiChatbot, CRTScanlineOverlay — all carry over. Reference v2 §10 for specifications.

### 10.15 R3F scene components (NEW)
Each milestone is its own component file. This matches the template-first architecture in `file-structure.md`.

**`<HeroRoom />`** — wraps chibi character, voxel desk, voxel CRT, contact shadow underneath. Props: `position`, `theme`. Internal animation handled via `useFrame`.

**`<AboutDesk />`, `<ProjectsVault />`, `<LeadershipPlaza />`, `<ContactTerminal />`** — same pattern.

**`<ChibiCharacter />`** — reusable. Used in HeroRoom (sitting at desk) and ContactTerminal (sitting at keyboard). Props: `pose: 'sitting-desk' | 'sitting-keyboard'`, `position`, `lookAtTarget`.

**`<EffectsChain />`** — wraps `<EffectComposer>` with all post-processing effects. Reads day/night from Zustand store to switch bloom intensity.

**`<CameraController />`** — sets up GSAP ScrollTrigger timeline for camera position + look-at. Mounts once at scene root.

**`<Atmosphere />`** — wraps `<Sky />`, `<Stars />`, `<fog />`. Switches gradient + star opacity on day/night.

### 10.16 Template components (NEW — see file-structure.md for full architecture)
v3 formalizes the template-first pattern. Per-entry-type templates:

- `<ProjectCard />` — one project in the grid. Props: `Project` type.
- `<ProjectDetail />` — full project subpage. Props: `Project` type. Rendered at `/projects/[slug]`.
- `<RoleEntry />` — one leadership role. Props: `Role` type.
- `<RoleDetail />` — full role subpage. Rendered at `/leadership/[slug]`.
- `<CertCard />` — one certificate.
- `<SkillBar />` — one skill (wraps `<StatBar />` from v2 §10.7).
- `<EducationCard />` — one education entry.

Section components iterate over `data/<type>.ts` arrays and render the template for each entry. Adding a new entry = add object to data file. No new component code.

---

## 11. Iconography & decorative motifs (unchanged from v2)
Reference v2 §11.

---

## 12. Sound (unchanged from v2)
Reference v2 §12. Web Audio API, opt-in only, synthetic oscillators.

---

## 13. Performance & accessibility (revised)

### 13.1 Performance non-negotiables
- LCP < 1.8s
- TTI < 4.5s
- 60fps desktop / 30fps mobile minimum
- Lighthouse Performance ≥ 90 on desktop, ≥ 75 on mobile
- 3D scene total bundle (R3F + drei + postprocessing + scene code) ≤ 350KB gzipped
- HDRI textures stream-load after first paint
- All `.glb` assets compressed via `gltf-pipeline -d -m -j` (Draco + Meshopt)
- Mobile performance probe at scene mount; fallback to `.webm` if frame budget exceeded

### 13.2 Accessibility (unchanged from v2 §13.2)
- WCAG AA contrast on all body text pairings, both themes
- `prefers-reduced-motion: reduce` honored everywhere
- Keyboard nav for all interactive elements
- Skip-to-content link
- `aria-label` on the fixed 3D canvas: `"Decorative 3D scene"`
- `aria-hidden="true"` on the canvas — it's atmosphere, not content

### 13.3 SEO (unchanged from v2 §13.3)

---

## 14. Day / night mode (revised)

### 14.1 Trigger (unchanged)
DayNightToggle component, top-right of TopBar. Persists to localStorage.

### 14.2 Transition sequence (revised — now GSAP)
A single GSAP timeline orchestrates 800ms of synchronized change:

```
0ms     → 2D body CSS variables crossfade start (Motion handles)
0ms     → Sky shader uniforms tween (GSAP, 800ms power2.inOut)
0ms     → Fog color tween (GSAP)
0ms     → Ambient + directional light color + intensity tween (GSAP)
100ms   → Bloom intensity ramp (GSAP, 500ms)
200ms   → Star particle opacity tween (GSAP, 600ms)
200ms   → Emissive intensity tween across all flagged materials (GSAP)
800ms   → All transitions settle
```

No `lerp` per frame. GSAP owns the timeline.

### 14.3 Toggle thumb (unchanged)
Square thumb, hard translate, 200ms ease-bounce. v2 §14.3.

### 14.4 What the 3D world shows (revised)
**Day:** Bright gradient sky (cream → soft blue). Sun position visible (10, 6, -2). Voxel objects lit with warm key + cool fill. Emissive surfaces dim (0.3 intensity). Bloom subtle. Fog cream. Vignette light.

**Night:** Sky shifts to deep midnight blue. Sun goes below horizon. `<Stars />` overlay (350 count) fades in. Moon directional light replaces sun (cool blue, low intensity). Emissive surfaces glow hard (2.5 intensity, picked up by bloom). Fog dark blue. Vignette deeper. Subtle chromatic aberration kicks in.

---

## 15. Page / section blueprint (revised — see prd.md for full template architecture)

### 15.1 DOM structure and section IDs
```
<body>
  <div id="lenis-wrapper">           Lenis smooth scroll wrapper
    <BootScreen />                   Curtain (z-index 50)
    <ThreeCanvas />                  position: fixed, z-index: -1
    <Header />                       sticky top, z-index 20
    <main>                           z-index 10
      <section id="hero">            Hero
      <section id="about">           About
      <section id="projects">        Projects grid (ProjectCard template)
      <section id="leadership">      Leadership grid (RoleEntry template)
      <section id="contact">         Contact
    </main>
    <Footer />
    <ScrollHUD />                    z-index 30
  </div>
</body>
```

### 15.2 Section content map
- **Hero** — name display, role one-liner, primary CTA, scroll prompt
- **About** — portrait card, bio prose, stat bars (skills), education card
- **Projects** — featured project grid (uses `<ProjectCard />` template). Each card links to `/projects/[slug]` detail subpage.
- **Leadership** — leadership grid (uses `<RoleEntry />` template). Each entry links to `/leadership/[slug]` detail subpage.
- **Contact** — contact form, primary contact info, optional Gemini chatbot launch

### 15.3 Subpages (NEW in v3)
Dynamic routes:
- `/projects/[slug]` → `<ProjectDetail project={data} />` template
- `/leadership/[slug]` → `<RoleDetail role={data} />` template

Project and role slugs come from the entry IDs in `portfolio-content.md` (e.g. `prj-001` → `/projects/vera-ai`). See file-structure.md for routing details.

---

## 16. File architecture (deferred to file-structure.md)

The full architecture, including the template-first pattern, lives in `file-structure.md`. The short version: `components/sections/` compose `components/templates/` over `data/<type>.ts` arrays. Adding an entry never requires writing component code.

---

## 17. Inspiration ledger (revised)
| Source | Status | What it contributes |
|---|---|---|
| motionsites.ai | **Aesthetic primary** | Atmospheric depth, post-processing, camera pacing |
| jesse-zhou.com | Aesthetic primary | Single-scene continuous 3D world |
| DJMsXSr1jec (YouTube) | Aesthetic primary | Cinematic camera scrubbing technique |
| JS Mastery R3F series | Implementation primary | R3F + drei + postprocessing + GSAP wiring |
| Olivier Larose / GSAP showcase | Implementation primary | ScrollTrigger scrubbed timeline pattern |
| MagicaVoxel ArtStation gallery | Asset primary | Chibi proportions, voxel-rendered-cinematically aesthetic |
| Yan Liu Design 404 | UI grammar only | Pixel UI charm in 2D layer |
| Persona 5 | UI grammar only | Information density, hard type edges |
| Stripe dashboard | UI grammar only | Recruiter-safe restraint baseline |
| ~~Pokémon Gold/Silver~~ | **Demoted** | Was v2 primary; v3 keeps the day/night idea but not the aesthetic |
| ~~Steam profile page~~ | **Demoted** | Was v1 candidate; v3 doesn't lean here |

---

## 18. Drift detection checklist (revised for v3)

Run this before any commit. If anything trips, fix before pushing.

### Visual grammar (2D UI)
- No `rounded-*` on cards/buttons/inputs/modals (except DayNightToggle pill)
- No `backdrop-blur` on 2D UI
- All `box-shadow` declarations have `0` blur
- No `bg-*/N` opacity below 1 on card backgrounds
- All cards have `border-[3px] border-ink`
- Hover state is `translate-x-[2px] translate-y-[2px]` + shadow shrink, never `scale(*)`

### Visual grammar (3D)
- `<EffectsChain />` present in scene tree
- Bloom + DoF + Vignette + Noise all wired
- **No PixelationPass anywhere** — if found, delete
- No raw cubes used for ground planes (use lit gradient mesh or contact shadow plane)
- HDRI or `<Sky />` present — no skybox cube

### Typography
- Body prose uses Geist Sans
- Display elements use Press Start 2P
- HUD/terminal elements use VT323
- No pixel font in body paragraphs

### Camera + motion
- GSAP ScrollTrigger drives camera (not raw scrollProgress lerp)
- ScrollTrigger `scrub` value is 0.5 (camera) or false (2D reveals)
- Lenis is mounted at app root
- Day/night transitions use one GSAP timeline (not per-frame lerp)

### Templates
- Every section that lists entries iterates over `data/<type>.ts` via `.map`
- No hardcoded entry content in section components
- All entry types have a template component in `components/templates/`
- New entries go in `data/<type>.ts` only — no component changes needed

### 3D scene
- < 80 draw calls (use `<Instances>` for repeated voxels)
- < 250k triangles total
- Mobile fallback `.webm` exists at `/public/fallback-scene.webm`
- Performance probe mounted at scene init

---

## 19. Open questions (v3.1)

**[OPEN]** Migrate to Next.js or stay on Vite?
- Next.js gives App Router dynamic routes for `/projects/[slug]` subpages naturally, plus SSR for SEO. Recommendation: migrate.
- Vite is what's already built and works fine for SPA portfolios. If staying Vite, subpages become React Router routes.
- **Decision needed before dev work resumes.**

**[OPEN]** HDRI source for the `<Environment />` preset?
- Polyhaven free HDRIs are CC0 and broadly recommended.
- Custom-rendered HDRI from MagicaVoxel scene would be more on-brand but costs production time.

**[OPEN]** Voxel chibi character source?
- Option 1: Hand-author in MagicaVoxel, export `.vox` → `.glb`, load via drei `useGLTF`.
- Option 2: Procedural construction in R3F using individual voxel meshes (slower to render, easier to iterate).
- Recommendation: option 1 for production, option 2 for prototype.

**[OPEN]** Do leadership roles need detail subpages, or is the grid card enough?
- Projects clearly need detail subpages (writeup, screenshots, tech stack, link out).
- Leadership might be summarized on the main page. Detail subpages add scope.
- **Decision needed before file-structure.md routing is finalized.**

**[OPEN]** Should there be a `/blog` section?
- Not in v3 scope by default.
- If yes, adds another templated entry type (`Post`) with `/blog/[slug]` dynamic route.

**[OPEN]** Real-time chat / Gemini bot in v3?
- v2 §10.13 specified it. Carries over to v3 but is gated behind core scope.

---

## 20. Change log

**v3.0 — 2026-05-27**
- Direction change: pixelated voxel everywhere → pixel UI + cinematic voxel 3D
- §3.1 stack: R3F + drei + postprocessing + GSAP ScrollTrigger + Lenis now locked in
- §3.2/§3.3 v2 prohibitions on R3F, postprocessing, GSAP-for-camera all reversed
- §8.3 pixelation pass deleted, replaced with EffectComposer chain (DoF, Bloom, CA, Vignette, Noise)
- §8.4 camera: raw scrollProgress lerp replaced with GSAP-scrubbed timeline + 20+ sub-targets
- §8.2 voxel scope narrowed: characters + key objects voxel, environments smooth/atmospheric
- §14.2 day/night transition: per-frame lerp replaced with GSAP timeline
- §10.15 R3F scene components added
- §10.16 template components formalized (see file-structure.md)
- §1.4 reference table revised: motionsites.ai promoted to aesthetic primary; Pokémon Gold/Silver demoted
- §17 inspiration ledger rebuilt
- §18 drift detection checklist revised for v3
- §15.3 subpages section added

**v2.0 — 2026-05-27** *(archived)*
- Reference v2 changelog
