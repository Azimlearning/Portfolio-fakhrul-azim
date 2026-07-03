---
description: Scaffold a new leadership / involvement role entry
---

# /add-role

Add a new leadership role to the portfolio following the template-first pattern.

## When to use this command

The user wants to add a new role to the leadership / involvement section. Examples:
- "Add a new role — I was secretary of X"
- "I want to feature my work directing Y event"

## What this command does

1. Asks for the role's fields (organization, position, dates, scope, highlights).
2. Generates a new `Role` object and appends it to `src/data/roles.ts`.
3. Creates the media folder `public/media/leadership/<slug>/`.
4. Verifies the slug is unique.
5. Does NOT create any new component files.

## Steps

### 1. Ask for role details

- `slug` — kebab-case URL segment (e.g. `utp-griffin-esports-president`)
- `organization` — e.g. "UTP Griffin Esports Club"
- `position` — e.g. "President"
- `tier` — `common | rare | epic | legendary`
- `featured` — `true | false`
- `dateRange.start` — YYYY-MM
- `dateRange.end` — YYYY-MM or `null`
- `scope` — short context string (e.g. "100+ members", "3 nationwide events")
- `description` — markdown body
- `highlights` — array of bullet-point strings (3–6 ideal)
- `links.site` — URL or `null`

### 2. Verify the slug
- Unique within `src/data/roles.ts`
- Kebab-case
- Doesn't collide with reserved routes

### 3. Generate the entry
Append to the `roles` array in `src/data/roles.ts`. Next ID (e.g. `ldr-008`) assigned.

### 4. Create media folder
```bash
mkdir -p public/media/leadership/<slug>
```

Cover image at `cover.png` (1200×630 ideally), gallery images as `01.png`, `02.png`, etc.

### 5. Confirm
Print summary:
- Entry: `ldr-XXX · <organization> — <position>` (`<slug>`)
- Route: `/leadership/<slug>` (if subpages are enabled — see open question in `file-structure.md` §12)
- Grid: appears if `featured: true`

## Reference

- `src/types/portfolio.ts` — `Role` interface
- `portfolio-content.md` §7 — leadership entries source of truth
- `file-structure.md` §4 — template pattern
