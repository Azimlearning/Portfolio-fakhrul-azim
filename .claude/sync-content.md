---
description: Sync entries from portfolio-content.md into src/data/*.ts files
---

# /sync-content

`portfolio-content.md` is the human-authored content source. `src/data/*.ts` is what the app reads. This command reconciles them.

## When to use this command

- After editing `portfolio-content.md` (adding/updating entries)
- When the app shows stale or missing content
- Before launch / before snapshot

## What this command does

Manual sync strategy per `file-structure.md` §7 option A:

1. Reads `portfolio-content.md`
2. For each fenced YAML block (per entry section), extracts the entry data
3. Maps YAML field names to `Project` / `Role` / `Experience` / etc. TypeScript interfaces
4. For each entry type, updates the corresponding `src/data/<type>.ts` file
5. Preserves any data-file-only fields (e.g. computed slugs if not in markdown)
6. Reports diffs

## Sync rules

### Per-section mapping
| Markdown section | Data file | Type |
|---|---|---|
| §1 Identity | `src/data/identity.ts` | `Identity` |
| §3 Education | `src/data/education.ts` | `Education[]` |
| §4 Skills | `src/data/skills.ts` + `src/data/strengths.ts` | `Skill[]`, `Strength[]` |
| §5 Work experience | `src/data/experience.ts` | `Experience[]` |
| §6 Projects | `src/data/projects.ts` | `Project[]` |
| §7 Leadership | `src/data/roles.ts` | `Role[]` |
| §8 Certificates | `src/data/certificates.ts` | `Certificate[]` |
| §9 Highlights | `src/data/highlights.ts` | `string[]` |
| §10 References | `src/data/references.ts` | `Reference[]` |

### Slug derivation
If a YAML block lacks a `slug` field, derive from the entry name:
- Lowercase
- Replace spaces with hyphens
- Strip non-alphanumeric except hyphens
- Verify uniqueness within the array

### Status interpretation
- `status: started` entries are **NOT rendered** (per `portfolio-content.md` §0) — include in data file with `featured: false` to keep tracked but hidden
- `status: archived` — same treatment

### TODO / null fields
Empty fields in markdown become `null` in TypeScript. Templates handle null gracefully.

## Steps

1. Read `portfolio-content.md`.
2. Walk through each `### XXX-NNN` heading and its YAML block.
3. Parse YAML → TypeScript object.
4. For each entry type, regenerate `src/data/<type>.ts` array:
   ```ts
   import type { Project } from '@/types/portfolio';
   export const projects: Project[] = [
     { id: 'prj-001', slug: 'vera-ai', ... },
     // ...
   ];
   ```
5. Report:
   - Added: `prj-009 — Robotics Pipeline v2`
   - Updated: `prj-003 — Crowd-View-AI (tier changed common → rare)`
   - Removed: `prj-007 — Online Store System (was archived, now removed from data)`
   - No change: `prj-001, prj-002, prj-004, ...`

## Confirm before writing
Show the user the diff and ask before overwriting `src/data/*.ts` files. Never silent-write the whole content layer.

## Don't

- Don't drop data-file-only fields (e.g. analytics tags, layout overrides) that aren't in the markdown.
- Don't change the entry order arbitrarily — preserve the markdown order, with featured entries first.
- Don't touch files outside `src/data/` and `src/types/portfolio.ts` (interface tweaks if needed).
- Don't auto-commit. Always leave the diff for the user to review.

## Reference

- `portfolio-content.md` — the content source
- `file-structure.md` §7 — sync strategy
- `src/types/portfolio.ts` — interface definitions
