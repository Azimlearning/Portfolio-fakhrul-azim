---
description: Scaffold a new project entry — data file edit + media folder, no component code
---

# /add-project

Add a new project to the portfolio following the template-first pattern (`file-structure.md` §4.1).

## When to use this command

The user wants to add a new project to the portfolio. Examples:
- "Add a new project called X"
- "I want to feature a new project"
- "Help me add my new robotics build to the portfolio"

## What this command does

1. Asks the user for the minimum required fields (name, slug, tagline, tier, status, dates, tech stack, links).
2. Generates a new `Project` object and appends it to `src/data/projects.ts`.
3. Creates the media folder `public/media/projects/<slug>/`.
4. Reminds the user what media to drop in.
5. Verifies the slug is unique and doesn't collide with existing routes.
6. Does NOT create any new component files. The grid and `/projects/[slug]` route auto-discover the entry.

## Steps

### 1. Ask for the project details
Prompt the user for these fields (one message, all at once, so they can fill in):

- `name` — display name (e.g. "Robotics Pipeline v2")
- `slug` — URL segment, kebab-case (e.g. "robotics-pipeline-v2")
- `tagline` — one-liner under the name
- `tier` — `common | rare | epic | legendary` (see `design-theme-v3.md` §4 for tier meaning)
- `status` — `complete | in-progress | started | archived`
- `featured` — `true | false` (whether to surface on the grid)
- `dateRange.start` — YYYY-MM
- `dateRange.end` — YYYY-MM or `null` (present)
- `role` — the contributor's role
- `techStack` — array of strings
- `summary` — one-sentence card description
- `description` — long-form markdown body
- `links.github` — URL or `null`
- `links.live` — URL or `null`
- `links.writeup` — URL or `null`

### 2. Verify the slug
- Check `src/data/projects.ts` for existing slugs — must be unique.
- Slug must be kebab-case (lowercase, hyphens only, no underscores or spaces).
- Slug must not collide with reserved route names (e.g. `api`, `_next`, `_error`).

### 3. Generate the entry object
Append to the `projects` array in `src/data/projects.ts`. The next sequential ID (e.g. `prj-009` if 008 is the highest existing) is assigned automatically.

### 4. Create the media folder
```bash
mkdir -p public/media/projects/<slug>
```

Then tell the user:
> Drop a `cover.png` (1200×630) and any gallery images (`01.png`, `02.png`, …) into `public/media/projects/<slug>/`.

### 5. Confirm
Print a summary:
- New entry: `prj-XXX · <name>` (`<slug>`)
- Route: `/projects/<slug>` (now live)
- Grid: will appear if `featured: true`
- Media: pending in `public/media/projects/<slug>/`

## Don't do these

- Don't create a new component file. The template (`src/components/templates/ProjectCard.tsx`) renders any `Project`.
- Don't hardcode the project anywhere outside `src/data/projects.ts`.
- Don't add `if (project.slug === '...')` branches in the template — extend the `Project` type instead and handle the new field generically.

## Reference

- `file-structure.md` §4.1 — full step-by-step
- `src/types/portfolio.ts` — `Project` interface
- `portfolio-content.md` §6 — project entries source of truth (sync per `file-structure.md` §7)
