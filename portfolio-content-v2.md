# portfolio-content.md
**Project:** Personal Portfolio — Fakhrul Azim
**Version:** 1.4
**Purpose:** Single source of truth for all content (biodata, projects, leadership, skills, references). Agent-readable. Companion to `design-theme.md`.
**Last updated:** 2026-07-04

> **v1.4 sourcing note.** Azim provided a full copy-paste of his LinkedIn Activity/Posts feed (40 posts) — the piece the official PDF export can't reach. This resolved several open date/naming conflicts with real dates from his own contemporaneous posts, added real descriptions to two previously-thin entries (LDR-009, LDR-010), and surfaced enough new material to justify a real structural fix: **Leadership (§7) and Events (§7A) are now separate sections** rather than one blurred list — see the rule added to §0. Also added PRJ-013 through PRJ-020 as placeholder entries for the 8 unconfirmed GitHub repos from the v1.3 pass, per Azim's instruction to add all 8 now and describe them later — these are marked "PLACEHOLDER" and should not render on the live site until real descriptions replace the GitHub one-liners (see §14, point 0). Corrected a likely-typo GPA (5.58 → 3.58) using Azim's own graduation announcement post.

---

## 0. How to use this document

This is the **content layer**. `design-theme.md` says *how things look*; this file says *what things say*.

- Every entry (project, role, experience, certificate) has a **unique ID** (`PRJ-001`, `LDR-002`, etc.). IDs are stable — never reuse, never renumber.
- Every entry starts with a fenced **YAML block** for structured fields, followed by **markdown prose** for narrative. Agents parse the YAML, humans read the prose.
- `featured: true` means *display in the portfolio*. `featured: false` means *keep in content but hide* (e.g. coursework you don't want to surface).
- `status: complete | in-progress | started | archived`. **`started` = WIP repos, do NOT render.**
- `tier: common | rare | epic | legendary` — maps to the rarity color tokens in `design-theme.md §4`.
- Dates are `YYYY-MM`. Use `YYYY-MM → YYYY-MM` for ranges, `→ present` for ongoing, `expected` flag for future end-dates.
- Empty fields = TODO. Leave them as `null` or blank; render as `—` or skip in UI.
- **Leadership (§7) vs. Events (§7A) — this distinction matters, don't blur it.** §7 is for roles where Azim held an actual title with defined responsibility (President, Secretary, Project Director, Assistant Head of Department, a named committee seat with a specific job — e.g. "Communications Committee Member," "Ceremony & Protocol Committee Member"). §7A is for things he attended, volunteered at, or competed in with **no** organizing title — workshops, field trips, seminars, career fairs, forums, or playing on a team without directing it. When adding new content from LinkedIn posts or elsewhere: if the post describes a title/role and specific owned responsibilities, it's §7. If it describes showing up, learning, or participating, it's §7A. When genuinely ambiguous (e.g. "volunteered with the committee" but no title given), default to §7A and flag it — don't inflate participation into leadership.

For an agent adding new content: see **§13 Scaffolding** and **§14 Agent notes**.

---

## 1. Identity

```yaml
name_full: Fakhrul Azim Bin Ahmed Mardzukie
name_display: Fakhrul Azim
name_short: Azim
handle: fakhrulazim
pronouns: he/him          # confirmed via LinkedIn profile, 2026-07
nationality: Malaysian
languages:
  - Malay (native)
  - English (fluent)
  # CONFIRM additional languages if any
```

### Taglines (multiple lengths for different surfaces)

```yaml
boot_subtitle:   "AI · AUTOMATION · DATA · LEADERSHIP"
hero_oneliner:   "Computer Science student & PETRONAS intern building AI-powered automation, data systems, and workflow tools."
hero_microline:  "Building useful tools. Learning new tech. Sharing what I learn."
```

### Bio (short — about card / metas)
> Computer Science student at Universiti Teknologi PETRONAS, majoring in Data Analytics. Currently interning at PETRONAS Upstream, where I build AI-driven automation and data systems for real operational workflows. Outside of the lab I lead a 100+ member esports organization and have run nationwide tournaments and international student events.

### Bio (long — about page)
> I'm a final-year Computer Science student at Universiti Teknologi PETRONAS, majoring in Data Analytics with a minor in Financial Management. My internship at PETRONAS Upstream sits at the intersection of three things I care about: AI integration, process automation, and the kind of clean data plumbing that makes an organization actually move faster. I've built knowledge-based AI assistants, Power BI dashboards for leadership, and Python automation tools that have replaced hours of manual reporting.
>
> The other half of my time has gone into running things. I've served as President of a 100+ member esports organization, coordinated an international student event in Osaka, and directed a nationwide MLBB tournament. The pattern across both halves: I like systems — technical or organizational — that turn chaos into something legible.

### Location

```yaml
city: Kuala Lumpur
state: Wilayah Persekutuan
country: Malaysia
timezone: Asia/Kuala_Lumpur     # UTC+08:00
study_city: Seri Iskandar, Perak
```

### Avatar / portrait references

```yaml
photo_2d: null              # TODO: drop at /public/media/portrait.jpg
voxel_avatar_ref: null      # TODO: drop reference image at /content/media/avatar-ref.png
voxel_avatar_glb: null      # TODO: drop compiled .glb at /public/glb/avatar.glb
```

---

## 2. Contacts

```yaml
primary:
  email: fakhrulazim.am@gmail.com
  phone: "+60 19-712 5300"
links:
  linkedin: https://www.linkedin.com/in/fakhrulazim/
  github: https://github.com/Azimlearning
  resume_pdf: /public/resume.pdf      # TODO: drop PDF
  portfolio: https://portfolio-fakhrul-azim.vercel.app/
secondary:
  twitter: null
  discord: null
  instagram: null
  behance: null
```

> Pixel-icon mapping for links (see `design-theme.md §11.1`): email = envelope, phone = handset, LinkedIn = "in" badge, GitHub = cat-octocat 8-bit, Resume = scroll/paper, Twitter = bird.

---

## 3. Education

### EDU-001 · Universiti Teknologi PETRONAS

```yaml
id: edu-001
featured: true
institution: Universiti Teknologi PETRONAS
abbreviation: UTP
city: Seri Iskandar
state: Perak
country: Malaysia
degree: Bachelor of Computer Science (Hons)
major: Data Analytics
minor: Financial Management
date_start: 2023-08       # CONFIRMED via LinkedIn PDF export, 2026-07 — was previously a placeholder "2022"
date_end: 2026-12
expected: true
gpa: 3.4
gpa_scale: 4.0
```

**Notes.** Final-year student. Major-aligned with my work on data systems and AI; minor in Financial Management informs the commercial-KPI side of the PETRONAS internship.

---

### EDU-002 · Kolej MARA Kuala Nerang

```yaml
id: edu-002
featured: true
institution: Kolej MARA Kuala Nerang
abbreviation: KMKN
country: Malaysia
degree: Foundation in Engineering & Technology
major: Engineering and Technology
date_start: 2022-08
date_end: 2023-06
expected: false
gpa: 3.58                  # corrected 2026-07 — Azim's own LinkedIn graduation post states "CGPA 3.58, Second Class Upper." Prior value of 5.58 in this file was very likely a transposition typo; 3.58/4.0 is also the only value of the two that's a valid GPA.
gpa_scale: 4.0
```

**Notes.** Foundation program bridging secondary school and university; graduated Second Class Upper. Immediate precursor to UTP. Graduation ceremony held May 28, 2023 at Grand Alora Hotel, Alor Setar (per Azim's own LinkedIn post).

---

### EDU-003 · MARA Junior Science College (MRSM)

```yaml
id: edu-003
featured: true
institution: MARA Junior Science College (MRSM)
abbreviation: MRSM
country: Malaysia
degree: Sijil Pelajaran Malaysia (SPM) (form 5), IGCSE (form 4)
major: Science Stream
date_start: 2017
date_end: 2022
expected: false
```

**Notes.** Secondary education, science stream. Included for a complete education timeline; likely low-priority on the portfolio itself (probably not featured on the live site, just kept here for completeness) — confirm whether this should render at all.

---

## 4. Skills

### Programming languages

```yaml
languages:
  - { name: Python,     proficiency: 90, tier: legendary, years: 3 }
  - { name: JavaScript, proficiency: 80, tier: epic,      years: 2 }
  - { name: R,          proficiency: 75, tier: epic,      years: 2 }
  - { name: Java,       proficiency: 70, tier: rare,      years: 2 }
  - { name: "C++",      proficiency: 65, tier: rare,      years: 1 }
  - { name: SQL,        proficiency: 70, tier: rare,      years: 2 }
  - { name: Dart,       proficiency: 60, tier: rare,      years: 1 }   # via Flutter / OnlyVolunteer
```

### Tools, platforms, frameworks

```yaml
tools:
  - { name: Git,             category: dev }
  - { name: Firebase,        category: backend }
  - { name: Power BI,        category: data-viz }
  - { name: SharePoint,      category: enterprise }
  - { name: Power Automate,  category: automation }
  - { name: Figma,           category: design }
  - { name: Adobe Illustrator, category: design }
  - { name: MySQL,           category: database }
  - { name: Next.js,         category: frontend }
  - { name: React,           category: frontend }
  - { name: Flutter,         category: mobile }
  - { name: LangChain,       category: ai }       # inferred from VERA-AI
  - { name: YOLO,            category: ai-cv }
  - { name: Google Gemini API, category: ai }
  - { name: LangGraph,       category: ai }       # inferred from Synapse, Arcana, Buildora, GlucoLens — CONFIRM
  - { name: FastAPI,         category: backend }  # inferred from Synapse — CONFIRM
  - { name: Neo4j,           category: database }  # inferred from Arcana — CONFIRM
  - { name: Pinecone,        category: database }  # inferred from Arcana — CONFIRM
  - { name: TypeScript,      category: frontend }  # inferred from Arcana/Synapse frontends — CONFIRM
```

> **CONFIRM tags above.** These five are inferred from prior conversation context describing Synapse/Arcana/Buildora/GlucoLens, not verified against actual repo manifests (`requirements.txt` / `package.json`). Cheap to confirm — see §15.

### Core strengths (best as stat bars — see `design-theme.md §10.6`)

```yaml
strengths:
  - { name: "AI Integration & RAG",          score: 90 }
  - { name: "Process Automation",            score: 85 }
  - { name: "Data Analysis & Visualization", score: 85 }
  - { name: "Project Leadership",            score: 95 }
  - { name: "Full-Stack Development",        score: 70 }   # CONFIRM
  - { name: "Computer Vision Systems",       score: 70 }
```

> Scores are 0–100 for stat-bar fill width. They're directional, not measured. Tune freely.

---

## 5. Work experience

### EXP-001 · PETRONAS Upstream — Intern, Data Analytics & Business Intelligence

```yaml
id: exp-001
slug: petronas-upstream-internship
featured: true
tier: legendary
status: complete
date_start: 2025-05
date_end: 2025-12
organization: PETRONAS
division: Upstream
city: Kuala Lumpur
country: Malaysia
role: Intern · Data Analytics & Business Intelligence
employment_type: Internship
tech: [Python, Power BI, SharePoint, Power Automate, Figma, Adobe Illustrator, Next.js, Firebase, LLM, RAG]
related_projects:
  - prj-001   # VERA-AI
  - prj-002   # PETRONAS Systemic Shifts Microsite
  - prj-005   # PowerPoint Automation Suite
```

**Summary.** 8-month internship across product design, process automation, data visualization, and AI development for an upstream business unit.

**Responsibilities.**
- **Product design.** Designed and managed internal department websites and digital platforms using Figma and Adobe Illustrator, lifting stakeholder engagement and communication efficiency.
- **Process automation.** Built a centralized data collection and storage architecture with Microsoft Power Automate + SharePoint, automating manual reporting and streamlining cross-functional workflows.
- **Data visualization.** Engineered interactive Power BI dashboards and advanced Excel trackers visualizing commercial KPIs for the Upstream Leadership Team (ULT).
- **AI development.** Led development of VERA-AI, a knowledge-based AI assistant integrated with structured departmental data to automate internal query resolution.

**Impact.** Three production-grade tools shipped (VERA-AI, the Systemic Shifts microsite, the PowerPoint Automation Suite). Manual reporting effort reduced; ULT now has self-serve dashboards.

---

## 6. Projects

> Featured projects appear in the **Projects Vault** section of the portfolio. Sort order: tier desc → date desc. The old "8 slots" cap from `design-theme.md §15` is stale now that PRJ-009 through PRJ-012 exist — with the three coursework entries (PRJ-006/007/008) collapsing into a single "Coursework" list item per Azim's direction, the vault is effectively **9 individual slots + 1 collapsed coursework slot**, not a fixed 8. See the site redesign plan for the active-bento layout this maps to.

### PRJ-001 · VERA-AI

```yaml
id: prj-001
slug: vera-ai
featured: true
tier: legendary
status: complete
date: 2025
date_start: 2025-05
date_end: 2025-12
category: ai-ml
icon: brain
repo: https://github.com/Azimlearning/VERA-AI
demo: null
cover: null                  # TODO: /content/media/prj-001-cover.png
tech: [Python, JavaScript, LLM, RAG, Vector Search, Embeddings, LangChain]
related_experience: exp-001
context: PETRONAS Internship
```

**Summary.** Enterprise-grade RAG-powered AI assistant for PETRONAS Upstream.

**Description.** Built an advanced AI assistant integrated with a structured departmental knowledge base to automate internal queries and workflow support. Designed the backend retrieval logic and the embedding/vector-search pipeline to make scattered institutional knowledge accessible through natural language.

**Impact.** Designed for real operational use cases on the upstream team. Reduces manual dependency for repeat queries; the team uses it as a first-line lookup before escalating to humans.

---

### PRJ-002 · PETRONAS Upstream Systemic Shifts Microsite

```yaml
id: prj-002
slug: petronas-systemic-shifts-microsite
featured: true
tier: epic
status: complete
date: 2025
category: web-platform
icon: globe
repo: https://github.com/Azimlearning/PETRONAS-Upstream-Systemic-Shifts-Microsite-AI
demo: null
cover: null
tech: [Next.js, Firebase, AI Chatbots, Analytics]
related_experience: exp-001
context: PETRONAS Internship
```

**Summary.** Modern AI-integrated corporate microsite for PETRONAS Upstream.

**Description.** A Next.js + Firebase web platform built during the PETRONAS internship, integrating AI-powered functionality including chatbot assistants, analytics surfaces, and content automation. Treated as an internal product, not a one-off landing page — designed for ongoing department use.

**Impact.** Corporate-grade digital surface used internally for the Systemic Shifts initiative. Stakeholders interact with AI-driven content tools directly rather than through emails and slides.

---

### PRJ-003 · Crowd-View-AI

```yaml
id: prj-003
slug: crowd-view-ai
featured: true
tier: epic
status: complete
date: 2025
category: ai-cv
icon: eye
repo: https://github.com/Azimlearning/Crowed-View-AI    # note: typo in repo name "Crowed"
demo: null
cover: null
tech: [Python, YOLO, Computer Vision, Gemini AI]
related_experience: null
context: Personal / showcase
```

**Summary.** Real-time venue intelligence — seat occupancy and crowd flow analytics.

**Description.** A computer-vision system that uses YOLO-based seat detection combined with Gemini-powered insights to track seat occupancy in real time, flag under-used areas, and surface smart operational recommendations. The interesting part is the hybrid: deterministic CV for the count, generative AI for the narrative ("Section B has been below 30% capacity for 40 minutes — consider redirecting").

**Impact.** Smart-operations prototype for venues; pattern is reusable for any space where occupancy decisions matter (events, esports tournaments, classrooms).

---

### PRJ-004 · OnlyVolunteer

```yaml
id: prj-004
slug: only-volunteer
featured: true
tier: epic
status: complete
date: 2024
category: mobile-platform
icon: handshake
repo: https://github.com/Azimlearning/Only-Volunteer
demo: null
cover: null
tech: [Flutter, Dart, Firebase, Google Gemini AI]
related_experience: null
context: KitaHack — GDGoC Malaysia hackathon
```

**Summary.** AI-powered volunteer & aid management platform.

**Description.** A cross-platform (Flutter Web + mobile) volunteer coordination system built for KitaHack, the GDGoC Malaysia hackathon. The core problem: aid coordination in Malaysia is fragmented — multiple orgs, no shared volunteer roster, redundant outreach. OnlyVolunteer centralizes the roster and uses Gemini-powered smart routing to match volunteers to needs intelligently rather than first-come-first-served. Designed the system architecture and the AI chatbot orchestration; Firebase backs the realtime sync.

**Impact.** Hackathon prototype demonstrating an end-to-end AI-native civic platform. Cross-platform from day one.

---

### PRJ-005 · PowerPoint Automation Suite

```yaml
id: prj-005
slug: powerpoint-automation-suite
featured: true
tier: rare
status: complete
date: 2025
category: automation
icon: gear
repo: https://github.com/Azimlearning/Powerpoint-Automation-Suite   # confirmed public via GitHub repo list, 2026-07 — not private after all
demo: null
cover: null
tech: [Python, python-pptx, openpyxl]
related_experience: exp-001
context: PETRONAS Internship
```

**Summary.** Python tool that extracts structured data, tables, and images from PowerPoint and exports formatted Excel reports.

**Description.** Internal automation built during the PETRONAS internship. Takes arbitrary PPTX decks, walks the slide tree, pulls out structured content (tables, images, text boxes by layout), and writes a standardized Excel report for downstream reporting. Killed a hand-copying step that was eating hours per week. GitHub's own listing describes it as "AI summarization, table & image extraction, data processing, and deployment tools" — slightly broader than the extraction-only framing above; worth a quick look at which framing you prefer.

**Impact.** Reduced manual reporting effort; standardized internal documentation workflows across the department.

---

### PRJ-006 · Database Management System (Java OOP)

```yaml
id: prj-006
slug: dbms-java-oop
featured: true
tier: common
status: complete
date: 2023      # CONFIRM
category: coursework
icon: database
repo: https://github.com/Azimlearning/javafx-task-manager-system    # PROBABLE match, not confirmed — GitHub lists this as "JavaFX Task Manager System... built as an object-oriented programming assignment," same tech (Java/JavaFX/OOP) but a different working title than "Database Management System." Confirm this is the same project before publishing.
demo: null
cover: null
tech: [Java, OOP, JavaFX/Swing]    # CONFIRM UI library
related_experience: null
context: UTP coursework — Object-Oriented Programming
```

**Summary.** Database management system applying OOP fundamentals (encapsulation, inheritance, abstraction).

**Description.** Coursework project building a small DBMS with a user-facing interface for registration and dashboard functionality. Used to demonstrate clean OOP design — proper class hierarchies, encapsulated data access, abstracted I/O layer. **Naming flag:** the matched repo describes itself as a "desktop task management application," not a DBMS — possibly the same assignment described two different ways, possibly two different things. Confirm before this goes live.

**Impact.** Coursework artifact; included to show CS fundamentals are solid.

---

### PRJ-007 · Online Store System (C++)

```yaml
id: prj-007
slug: online-store-cpp
featured: true
tier: common
status: complete
date: 2023      # CONFIRM
category: coursework
icon: cart
repo: null      # checked full GitHub repo list, 2026-07 — no C++ repo exists on Azimlearning at all. Likely submitted directly to UTP without a public push, or lives under a group member's account.
demo: null
cover: null
tech: ["C++", "Structured Programming"]
related_experience: null
context: UTP coursework — Structured Programming
```

**Summary.** C++ store system: product management, order processing, user authentication.

**Description.** Coursework. Structured-programming exercise — file I/O, modular function design, basic auth flow, persistent order state. Reliable, not fancy.

**Impact.** Coursework artifact; shows comfort with lower-level languages and structured paradigms.

---

### PRJ-008 · Data Science Analysis & Recommendation System (R)

```yaml
id: prj-008
slug: ds-recommendation-r
featured: true
tier: common
status: complete
date: 2024      # CONFIRM
category: data-science
icon: chart
repo: https://github.com/Azimlearning/R-Data-Science-Analysis-Recommendation-System   # confirmed via GitHub repo list, 2026-07
demo: null
cover: null
tech: [R, ggplot2, tidyverse, "Statistical Modeling"]
related_experience: null
context: UTP coursework — Data Science
```

**Summary.** Data-driven recommendation system: analysis, visualization, predictive modeling in R.

**Description.** Coursework. Applied statistical techniques and basic ML concepts to generate actionable recommendations from a structured dataset. Pipeline: clean → explore → model → visualize. Useful as a portfolio piece for the data-analytics major.

**Impact.** Coursework artifact; aligned with my Data Analytics major.

---

> **UI note.** PRJ-006, PRJ-007, and PRJ-008 above display as one collapsed "Coursework" list item on the live site, not three full cards — confirmed with Azim during the site redesign planning pass. Kept as full individual entries here since the content itself is still worth keeping on record.

---

### PRJ-009 · Synapse

```yaml
id: prj-009
slug: synapse
featured: true
tier: epic
status: in-progress
date: 2026
date_start: 2026-06
date_end: null
category: ai-ml
icon: brain
repo: null      # CONFIRM — likely github.com/Azimlearning/Synapse, not verified this pass
demo: null
cover: null
tech: [Python, LangGraph, FastAPI, Next.js, TypeScript, "Server-Sent Events"]   # CONFIRM
related_experience: null
context: "hackAstone 2026 submission; adapted for Codex Community Hackathon KL 2026"
```

**Summary.** Adaptive agentic science-learning platform for Malaysian SPM students.

**Description.** A LangGraph multi-agent pipeline — Diagnostician, Pedagogy Strategist, Component Composer, and Tutor Loop agents working in sequence — diagnoses a student's gap in a science topic and composes a tailored interactive lesson in response. Built on a Next.js + FastAPI stack with a typed SSE wire protocol streaming agent reasoning to the frontend in real time. Ships with a 14-component interaction library spanning Biology, Chemistry, and Physics, organized by fidelity tier (three flagship fully-faithful interactives plus eleven lighter patterns).

**Impact.** Submitted as a full Word report + 12-slide deck for hackAstone 2026 (deadline July 1, 2026, 23:59 CET). Now being adapted by a five-person team for the Codex Community Hackathon KL 2026 (July 11–18, in-person demo at Sunway University) under the "Raising the Floor: AI for Malaysia Boleh" theme.

> **Repo note (2026-07).** No repo literally named "Synapse" exists on Azimlearning. `GenUI-Education` (public, TypeScript, updated 2 days ago, no description given) is a plausible match given the subject matter — confirm if that's the right repo before it's linked here.

---

### PRJ-010 · Arcana

```yaml
id: prj-010
slug: arcana
featured: true
tier: legendary      # flagship-tier, matches VERA-AI — confirmed with Azim during site redesign planning
status: in-progress
date: 2026
date_start: 2025      # CONFIRM — exact FYP start month
date_end: null
category: ai-ml
icon: network
repo: https://github.com/Azimlearning/Arcana    # confirmed public repo, 2026-07 (not a branch link needed — main repo is public)
demo: null
cover: null
tech: [Python, LangGraph, Neo4j, "Next.js 14", FastAPI, Pinecone, Firebase, GraphRAG]   # Python confirmed as primary language via GitHub; rest still CONFIRM
related_experience: null
context: "Final Year Project (FYP), Universiti Teknologi PETRONAS"
```

**Summary.** Graph-native multi-agent research platform — final year project.

**Description.** A research-assistant platform built around a hybrid GraphRAG retrieval core combining Neo4j's graph structure with Pinecone vector search, orchestrated by LangGraph agents. Frontend is Next.js 14 with a FastAPI backend and Firebase for auxiliary storage. Supporting documentation includes a 23-slide literature review deck covering 20 papers across 8 research domains, plus a Gantt-chart-based FYP schedule. **Updated 2026-07 per the repo's own description:** "Graph-native multi-agent RAG research assistant — hybrid retrieval + a **21-agent** pipeline turn your documents into cited answers, study tools, and a knowledge graph you can explore." (Prior versions of this file said 20 agents — 21 is the repo's own count, use that going forward.)

**Impact.** Flagship final-year project, positioned as a full case study alongside VERA-AI on the portfolio. In active development toward FYP submission.

---

### PRJ-011 · Buildora

```yaml
id: prj-011
slug: buildora
featured: true
tier: epic
status: complete
date: 2026
date_start: 2026-01    # CONFIRM
date_end: 2026-04      # CONFIRM — through UMHackathon Final Round submission
category: ai-ml
icon: hammer
repo: https://github.com/Azimlearning/Buildora    # confirmed public repo, 2026-07 — primary language Python per GitHub
demo: null
cover: null
tech: [LangGraph, Python, "Document Parsing", "CIDB Compliance Scoring"]   # CONFIRM full stack breakdown
related_experience: null
context: "UMHackathon 2026 Final Round, Team Dang Wangi"
```

**Summary.** Four-agent LangGraph platform for Malaysian construction project management.

**Description.** Built with Team Dang Wangi as a four-agent LangGraph system handling document parsing, schedule/cost monitoring, CIDB compliance scoring, and automated report generation for construction project managers. Entered under Domain 2 (AI for Economic Empowerment and Decision Intelligence).

**Impact.** Reached the Final Round of UMHackathon 2026. All five required Final Round deliverables submitted: code repo, QATD, deployment plan, business proposal, and pitch deck.

---

### PRJ-012 · GlucoLens

```yaml
id: prj-012
slug: glucolens
featured: true
tier: epic
status: complete
date: 2026
date_start: 2026-02    # CONFIRM
date_end: 2026-04      # CONFIRM
category: ai-ml
icon: heart-pulse
repo: https://github.com/Azimlearning/GlucoLens    # confirmed public repo, 2026-07
demo: null
cover: null
tech: [LangGraph, "GPT-4o", Firebase, "Next.js 14"]   # CONFIRM full stack breakdown
related_experience: null
context: "National Deep Tech Challenge 2026 (UMCIE), Team Dang Wangi"
```

**Summary.** Clinical nutrition companion for Malaysian Type 2 Diabetes patients.

**Description.** Built after Team Dang Wangi pivoted from construction AI to healthtech for the National Deep Tech Challenge, licensing the MyDietCam IP (PI 2021004897) as the technical foundation. **Updated 2026-07 per the repo's own description:** transforms meal photos into clinical data for real-time feedback and dietitian insights — a multi-agent system using LangGraph and GPT-4o handles the dietary tracking and guidance layer, with Firebase backing the data store and a Next.js 14 frontend. (The "clinical nutrition companion" framing from the repo is sharper than the original "dietary management app" summary above — worth using on the site.)

**Impact.** Full implementation plan, funding-stage analysis, pitch deck, and business plan completed for the Deep Tech Challenge submission.

---

> **GitHub repo scan, 2026-07.** Azim provided the full `github.com/Azimlearning?tab=repositories` list (30 repos total) — this let PRJ-005/008/010/011/012 get real confirmed repo links above. It also surfaced repos that don't correspond to anything in this file yet. Listed below exactly as GitHub describes them, **not added as PRJ entries** because tier/featured status shouldn't be guessed for work Claude has no other context on — needs Azim's call on which of these become real entries.

**Worth a real look (substantial descriptions, likely genuine standalone projects):**
- **OmniX** (Public, TypeScript) — "Single-user, local-first AI creative super-tool (PDF · Image · Video · Face) — Next.js + pay-per-use AI providers, no subscriptions, keys never leave the server."
- **InstagrabDB** (Public, Python) — "A self-running capture and extraction pipeline that automatically syncs Instagram saved reels/posts to a Notion database and uses AI to extract tools, GitHub repos, and workflows from video content."
- **SignalMap** (Public, TypeScript) — "Talentbank hackathon project." Note: this doesn't match the "TNG Digital FinHack" framing used elsewhere for SignalMap — GitHub's own tag says Talentbank. Flagging the conflict rather than picking one.
- **MeshGuard** (Public, JavaScript) — "MeshGuard is a proof-of-concept application built for the V-HACK 2026 Hackathon. It tackles the 'First Responder of the Future' challenge by demonstrating a Decentralized Swarm Intelligence Network." (Per prior context, this didn't advance — still fine as a common-tier entry if you want it shown.)
- **Pulse-of-Malaysia** (Public, TypeScript) + **suicide-vulnerability-dashboard** (Public, fork, "USMDATACHALLANGE 5.0") — "To provide data-driven insights into the relationship between economic vulnerability and suicide risk in Malaysia, enabling proactive policy interventions and resource allocation." Reads like a genuine data-for-policy hackathon entry (USM Data Challenge 5.0) — a real, serious piece of work if you want it represented, just say so and it can be written up properly and respectfully.
- **Pickup-App-optimal-route-analyze** (Public, Python) — "A full-stack project that analyzes and generates optimal pickup and delivery routes using advanced routing logic and optimization techniques."
- **AI-Powered-Python-Project-Group-Assignment-** (Public, Python) — "A university group assignment project developed in Python, focusing on AI-related concepts and implementation." Possibly a 4th coursework entry to fold into the collapsed coursework list alongside PRJ-006/007/008.
- **GenUI-Education** (Public, TypeScript) — see the repo note under PRJ-009 above; possible Synapse match.

**Probably not portfolio-worthy (practice repos, forks, or no description at all) — listed for completeness, not recommended for featuring:**
- Manga-Shelf (Public, TypeScript, no description)
- Mini-AI-Projects / Webdev-Mini-Projects (Public — explicitly "collections... for practice and learning")
- codenpray-finagent (Private, fork of a teammate's repo)
- Basic-AI-model, Basic-Ai-Scraper, githubws (Private, no descriptions, oldest/earliest repos)
- Systemic-Shifts-Microsite (Private) — exists alongside the already-documented public `PETRONAS-Upstream-Systemic-Shifts-Microsite-AI`; likely an earlier or internal-only version of PRJ-002, not a separate project.

If any move from `started` to `complete`, or get confirmed as real, append them using the **Template: New Project** in §13.

---

### PRJ-013 · OmniX

```yaml
id: prj-013
slug: omnix
featured: true
tier: common      # PLACEHOLDER tier — Azim to describe and re-tier
status: complete
date: 2026
date_start: null
date_end: null
category: ai-ml
icon: sparkles
repo: https://github.com/Azimlearning/OmniX
demo: null
cover: null
tech: [TypeScript, "Next.js", ai, ffmpeg, "video-editor", "local-first"]   # from GitHub repo topics
related_experience: null
context: null   # AWAITING DESCRIPTION FROM AZIM
```

**Summary.** Single-user, local-first AI creative super-tool (PDF · Image · Video · Face).

**Description.** PLACEHOLDER — per GitHub: "Single-user, local-first AI creative super-tool (PDF · Image · Video · Face) — Next.js + pay-per-use AI providers, no subscriptions, keys never leave the server." Azim to provide the real write-up.

**Impact.** TBD.

---

### PRJ-014 · InstagrabDB

```yaml
id: prj-014
slug: instagrabdb
featured: true
tier: common      # PLACEHOLDER tier
status: complete
date: 2026
date_start: null
date_end: null
category: automation
icon: instagram
repo: https://github.com/Azimlearning/InstagrabDB
demo: null
cover: null
tech: [Python, Notion, AI]   # CONFIRM
related_experience: null
context: null   # AWAITING DESCRIPTION FROM AZIM
```

**Summary.** Self-running Instagram-to-Notion extraction pipeline.

**Description.** PLACEHOLDER — per GitHub: "A self-running capture and extraction pipeline that automatically syncs Instagram saved reels/posts to a Notion database and uses AI to extract tools, GitHub repos, and workflows from video content." Azim to provide the real write-up.

**Impact.** TBD.

---

### PRJ-015 · SignalMap

```yaml
id: prj-015
slug: signalmap
featured: true
tier: common      # PLACEHOLDER tier
status: complete
date: 2026
date_start: null
date_end: null
category: data-science
icon: radar
repo: https://github.com/Azimlearning/SignalMap
demo: null
cover: null
tech: [TypeScript]   # CONFIRM
related_experience: null
context: "Talentbank hackathon"   # GitHub's own tag — conflicts with prior 'TNG Digital FinHack' framing, CONFIRM which
```

**Summary.** Real-time AI talent-demand intelligence dashboard.

**Description.** PLACEHOLDER — GitHub tags this as a "Talentbank hackathon project." Azim to confirm which hackathon this was actually for and provide the real write-up.

**Impact.** TBD.

---

### PRJ-016 · MeshGuard

```yaml
id: prj-016
slug: meshguard
featured: true
tier: common      # matches "did not advance" per prior context
status: complete
date: 2026
date_start: 2026-03    # approximate, repo updated Mar 19 2026
date_end: 2026-03
category: ai-ml
icon: shield
repo: https://github.com/Azimlearning/MeshGuard
demo: null
cover: null
tech: [JavaScript]   # CONFIRM
related_experience: null
context: "V-HACK 2026 Hackathon"
```

**Summary.** Decentralized swarm intelligence network for first-responder coordination.

**Description.** Per GitHub: "MeshGuard is a proof-of-concept application built for the V-HACK 2026 Hackathon. It tackles the 'First Responder of the Future' challenge by demonstrating a Decentralized Swarm Intelligence Network." Per prior context, did not advance in this hackathon.

**Impact.** Proof-of-concept, did not advance past this round.

---

### PRJ-017 · Pulse-of-Malaysia

```yaml
id: prj-017
slug: pulse-of-malaysia
featured: true
tier: common      # PLACEHOLDER tier
status: complete
date: 2026
date_start: 2026-03    # approximate, repo updated Mar 20 2026
date_end: null
category: data-science
icon: chart
repo: https://github.com/Azimlearning/Pulse-of-Malaysia
demo: null
cover: null
tech: [TypeScript]   # CONFIRM
related_experience: null
context: "USM Data Challenge 5.0"   # paired with the suicide-vulnerability-dashboard fork, same challenge
```

**Summary.** Data-driven analysis of economic vulnerability and suicide-risk factors in Malaysia, for policy intervention.

**Description.** PLACEHOLDER — per GitHub: "To provide data-driven insights into the relationship between economic vulnerability and suicide risk in Malaysia, enabling proactive policy interventions and resource allocation." Built alongside a forked companion repo (`suicide-vulnerability-dashboard`) for the same USM Data Challenge 5.0 submission. A sensitive subject — Azim to confirm exactly how he wants this represented before it goes live; handle the framing carefully (this reads as legitimate public-health/policy research, not personal content, but the wording matters).

**Impact.** TBD.

---

### PRJ-018 · Pickup-App-optimal-route-analyze

```yaml
id: prj-018
slug: pickup-app-optimal-route-analyze
featured: true
tier: common      # PLACEHOLDER tier
status: complete
date: 2025
date_start: 2025-11    # approximate, repo updated Nov 5 2025
date_end: null
category: automation
icon: route
repo: https://github.com/Azimlearning/Pickup-App-optimal-route-analyze
demo: null
cover: null
tech: [Python]   # CONFIRM
related_experience: null
context: null   # AWAITING DESCRIPTION FROM AZIM
```

**Summary.** Full-stack pickup/delivery route optimization tool.

**Description.** PLACEHOLDER — per GitHub: "A full-stack project that analyzes and generates optimal pickup and delivery routes using advanced routing logic and optimization techniques." Azim to provide the real write-up.

**Impact.** TBD.

---

### PRJ-019 · AI-Powered Python Project (Group Assignment)

```yaml
id: prj-019
slug: ai-powered-python-group-assignment
featured: true
tier: common      # likely coursework-tier — CONFIRM whether this folds into the collapsed Coursework list with PRJ-006/007/008
status: complete
date: 2025
date_start: null
date_end: null
category: coursework
icon: cpu
repo: https://github.com/Azimlearning/AI-Powered-Python-Project-Group-Assignment-
demo: null
cover: null
tech: [Python, ai]   # CONFIRM
related_experience: null
context: "UTP coursework group assignment"
```

**Summary.** University group assignment applying AI concepts in Python.

**Description.** PLACEHOLDER — per GitHub: "A university group assignment project developed in Python, focusing on AI-related concepts and implementation." Azim to provide the real write-up and confirm whether this should join the coursework collapse alongside PRJ-006/007/008.

**Impact.** TBD.

---

### PRJ-020 · GenUI-Education

```yaml
id: prj-020
slug: genui-education
featured: true
tier: common      # PLACEHOLDER — may turn out to BE Synapse (PRJ-009), see note there
status: complete
date: 2026
date_start: null
date_end: null
category: ai-ml
icon: brain
repo: https://github.com/Azimlearning/GenUI-Education
demo: null
cover: null
tech: [TypeScript]   # CONFIRM
related_experience: null
context: null   # AWAITING CONFIRMATION — may be a duplicate of PRJ-009 Synapse rather than a separate project
```

**Summary.** No GitHub description given.

**Description.** PLACEHOLDER — GitHub lists no description for this repo. Azim to confirm whether this is a separate project or the actual repo for Synapse (PRJ-009), and provide the real write-up either way.

**Impact.** TBD.

---

## 7. Leadership & involvement

### LDR-001 · Wa No Kizuna: Bonds of Harmony — Secretary

```yaml
id: ldr-001
slug: wa-no-kizuna
featured: true
tier: legendary
status: complete
date_start: 2024-05      # corrected from 2024-04 per LinkedIn PDF export, 2026-07 (LinkedIn shows "4 months" duration matching May–Aug)
date_end: 2024-08
role: Secretary (High Committee)
organization: UTP × Osaka universities × Japan Da'wah Centre
location: Osaka, Japan
event_type: International student program
team_size: 20 committees
sponsorship_secured: "RM100,000+"
duration_event: 10 days
icon: torii
```

**Summary.** Secretary on the high-committee bench of a 10-day international student program in Osaka.

**Description.** Managed communication and documentation as a high-committee member, coordinating between 20 committees, UTP management, Osaka universities, corporate sponsors, and Japan Da'wah Centre. Supervised the protocol department to ensure smooth on-the-ground execution of the 10-day event. Ran under UTP's "Harmoni UTP" committee structure — LinkedIn lists this as a separate concurrent entry (May–Aug 2024) but it appears to be the parent committee for this same program rather than a distinct role. Not broken out separately here to avoid double-counting the same work; flag if that's wrong. **Precise event dates confirmed via Azim's own LinkedIn post (2026-07): the on-the-ground program ran August 19–29, 2024** — the May–Aug date range above covers the committee's planning period, not just the trip itself.

**Impact.** Contributed to securing RM100,000+ in sponsorships; the event ran on schedule across multiple Japanese institutional partners.

---

### LDR-002 · UTP Griffin Esports Club — President

```yaml
id: ldr-002
slug: griffin-esports-president
featured: true
tier: legendary
status: complete
date_start: 2024-05
date_end: 2025-01
role: President
organization: UTP Griffin Esports Club
location: UTP, Seri Iskandar
team_size: 100+ members
departments_managed: 3
sponsorship_secured: "RM20,000+"
events_delivered: 10+
icon: trophy
```

**Summary.** Directed a 100+ member esports organization across three departments.

**Description.** Led UTP Griffin Esports Club — restructured operations across three departments, secured RM20,000+ in sponsorships, and institutionalized processes that had previously been informal. Delivered 10+ competitive and recruitment events, raising club visibility regionally and nationally. Led UTP's representation at SUKIPT 2024 (national stage) and spearheaded Convocyber 2024 — a 52-team nationwide MLBB tournament generating RM5,000+ sponsorships and an RM3,500 prize pool.

**Progression at Griffin** (per LinkedIn, added 2026-07 — same club, shown here as one entry rather than fragmenting into four): Committee Member, Team Management (Sep 2023–Jan 2024) → Head of Department, Event Management (Jan–May 2024) → **President** (May 2024–Jan 2025). Also a Griffin Committee Member for UTP Super Sport 2023 (Sep–Oct 2023) alongside the Team Management role.

**Highlights.**
- SUKIPT 2024 national-stage representation — UTP MLBB team secured silver medals, Sept 11–14, 2024, at Universiti Utara Malaysia, Kedah (per a repost, not Azim's own committee role — he represented UTP but the team management credit belongs to a teammate)
- Convocyber 2024 — **title corrected to Project Director** (LinkedIn's experience section says "Project Manager," Azim's own post says "Project Director" — using his own framing). Ran Oct 3–6, 2024 (live tournament), team of 22, 52 teams, RM5,000+ sponsorship, RM3,500 prize pool, Bo1 Round Robin → Bo3 Playoffs → Bo5 Finals format
- 3-department restructure
- **Griffin Campus Clash** — Project Director, May 17–19, 2024. 3-day offline tournament, Tekken 8 + MLBB, 16 MLBB teams (60+ participants) + 8 Tekken 8 players, team of 13. His second event leading at Griffin.
- **Mobile Legends Championship Weekend** — Project Director, Mar 8–9, 2024. His **first-ever** Project Director role: 16 teams (80+ participants), team of 10, fully online.

**Impact.** The club went from informal to institutional under this term — sponsorship pipeline, event cadence, and national visibility all locked in.

---

### LDR-003 · GDSC-UTP — Asst Head of Department, Event Management

```yaml
id: ldr-003
slug: gdsc-utp-event-mgmt
featured: true
tier: epic
status: complete
date_start: 2024-02      # corrected from 2024-05 per LinkedIn PDF export, 2026-07 ("1 year 1 month" duration matches Feb'24–Feb'25)
date_end: 2025-02
role: Assistant Head of Department, Event Management
organization: Google Developer Student Clubs — UTP
location: UTP, Seri Iskandar
team_size: 35 committee members
icon: code
```

**Summary.** Supervised 35 committee members across workshops, recruitment drives, and collaborations.

**Description.** Coordinated event-management arm of GDSC-UTP: workshop programming, recruitment pipelines, cross-club collaborations. Acted as Project Director for GDSC Kickoff × Family Day 2024 (June 12, 2024) — led 17 committee members across 4 departments to deliver the chapter's large-scale onboarding event.

**Highlights** (dates/details confirmed via Azim's own posts, 2026-07):
- Supervisor, Kickoff (Jan 2025)
- Supervisor, Recruitment Drive (Jan 2025)
- Supervisor, Training of Trainers — Event Management (Nov 17, 2024) — led a team of 4, 30+ participants
- Supervisor, Training of Trainers — Creative Development (Nov 20, 2024) — led a team of 4, covering Photoshop/Canva skills
- Committee Member, Ceremony & Protocol — **VB.NET Workshop** (Jun 21–22, 2024, with MPU4 Group OpportuniTea) — developed event tentative, registration/feedback forms, on-site coordination
- Committee Member, Ceremony & Protocol — **Flutter Firebase Workshop** (May 31–Jun 2, 2024) — registration, feedback, event flow (previously conflated with the VB.NET workshop above; these are two separate events)
- Committee Member, Ceremony & Protocol — Git/GitHub Workshop (Feb 8, 2024)

**Impact.** Healthy onboarding event for the academic year; sustainable event cadence across two semesters.

---

### LDR-004 · Celcomdigi Esports Battle Arena — Project Director

```yaml
id: ldr-004
slug: celcomdigi-esports-battle-arena
featured: true
tier: epic
status: complete
date_start: 2024-08      # LinkedIn PDF export (2026-07) says September 2024 — flagging discrepancy, not overwriting without confirmation
date_end: 2024-11
role: Project Director
organization: UTP × CelcomDigi
location: Hybrid (online + offline)
team_size: 30
sponsorship_secured: "RM10,000 (CelcomDigi)"
tournament_format: Two-phase (offline + online)
teams_participating: 24
game: MLBB
icon: console
```

**Summary.** Directed a two-phase 24-team MLBB tournament with corporate sponsorship.

**Description.** Led a 30-person team to organize the Celcomdigi Esports Battle Arena — a two-phase offline-then-online MLBB tournament with 24 teams. Owned sponsorship outreach, event streaming, logistics, and overall execution end-to-end. **Confirmed via Azim's own post (2026-07):** the live event ran Nov 2–6, 2024 (Online Group Stages Nov 2–3, Offline Finals Nov 6 at Block B, UTP), with 30 committee members split across 5 departments — Logistics, Media & Promotion, Public Relations, Ceremony & Protocol, Broadcast & Production.

**Impact.** RM10,000 corporate sponsorship secured from CelcomDigi; clean offline-to-online phase transition; production-grade stream.

---

### LDR-005 · UTP CYBERHAX — Asst Head of Department, Activity & Welfare

```yaml
id: ldr-005
slug: cyberhax-activity-welfare
featured: true
tier: rare
status: complete
date_start: 2024-05
date_end: 2024-12
role: Assistant Head of Department, Activity & Welfare
organization: UTP CYBERHAX (cybersecurity club)
location: UTP, Seri Iskandar
team_size: 20
events_delivered: 5     # hackathons + CTFs
icon: lock
```

**Summary.** Managed 20 committee members across 5 major events including hackathons and CTFs.

**Description.** Assistant Head of the Activity & Welfare department at UTP CYBERHAX, the campus cybersecurity club. Assisted in leading the Cyber Skill Level-Up @ Flag Dive Workshop (July 13, 2024, organized with RE:HACK and HIBISCUS LAB) — a hands-on cybersecurity training event with a 20-member execution team across 4 departments, covering Cryptography, Steganography, Digital Forensics, Web Security, OSINT, and CTF challenges.

**Highlights** (resolved via Azim's own posts, 2026-07 — previously flagged as a possible naming mismatch, now confirmed as two genuinely separate items):
- **Assistant Project Director, Cyber Skill Level-Up @ Flag Dive Workshop** (Jul 13, 2024) — this *is* the same event as the main description above, not a separate one. Earlier LinkedIn-sourced naming ("Cybersecurity CTF Workshop") was just a shorthand for the same thing.
- **Supervisor, Firmus Field Trip** (Sep 4, 2024) — a genuinely separate event: supervised a team of 4 organizing a company visit to Firmus, a cybersecurity firm.

**Impact.** Five major events delivered cleanly across the term; workshop attendance hit targets.

---

### LDR-006 · Celcomdigi Esports Battle Arena Coordinated Sub-Roles

> _(Sub-role consolidated under LDR-004 — kept here as a placeholder slot in case I want to break it out later.)_

---

### LDR-007 · Debat Anti Rasuah SPRM 2024 — Secretary

```yaml
id: ldr-007
slug: debat-anti-rasuah-sprm
featured: true
tier: common
status: complete
date_start: 2024-05
date_end: 2024-06
role: Secretary
organization: SPRM (Suruhanjaya Pencegahan Rasuah Malaysia)
event_type: Nationwide inter-university debate competition
icon: scale
```

**Summary.** Documentation and communication lead for a nationwide inter-university debate competition.

**Description.** Managed documentation and communication ensuring smooth execution of a nationwide inter-university Malaysian debate competition organized in partnership with SPRM. Acted as the high-coordination point between organizers and participants. **Confirmed via Azim's own post (2026-07):** the competition ran June 7–9, 2024; his HICOM duties included managing minutes of meeting and planning sessions throughout.

**Impact.** Event delivered with full documentation; demonstrated coordination experience outside the tech/esports lane.

---

### LDR-008 · UCIS Student Society — Committee Member

```yaml
id: ldr-008
slug: ucis-student-society
featured: true
tier: common
status: complete
date_start: 2024-01
date_end: 2024-12
role: Committee Member, Event Management Department
organization: UCIS Student Society
location: UTP, Seri Iskandar
icon: users
```

**Summary.** Year-long committee involvement in event management for the UCIS Student Society.

**Description.** New entry, added 2026-07 from LinkedIn export — not previously recorded in this file. Committee Member in the Event Management Department for a full year; also served in the Ceremony and Protocol Department for UTPCC (Jul–Sep 2024).

**Impact.** Sustained year-long involvement — TODO: get specifics from Azim on what this delivered, LinkedIn only lists title and dates.

---

### LDR-009 · UTP SYNTECH Organization — Committee Member

```yaml
id: ldr-009
slug: utp-syntech
featured: true
tier: common
status: complete
date_start: 2023-09
date_end: 2024-12
role: Committee Member, Technical Department
organization: UTP SYNTECH Organization
location: UTP, Seri Iskandar
icon: cpu
```

**Summary.** 1 year 4 months in the Technical Department, plus a ceremony/protocol role for an awards event.

**Description.** New entry, added 2026-07 from LinkedIn export — not previously recorded in this file. Technical Department committee member across the full stretch; separately served Ceremony and Protocol duties for the CIS Dean's List Award Ceremony (Feb 28, 2024, confirmed via Azim's own post) — coordinated VIP movements throughout the ceremony.

**Impact.** TODO: get specifics from Azim on the Technical Department work — LinkedIn only lists title and dates for that half; the CIS Dean's List sub-role is now documented above.

---

### LDR-010 · Mechaspeher MPU4 Community Engagement Project — Committee Member

```yaml
id: ldr-010
slug: mechaspeher-mpu4-community-engagement
featured: true
tier: common
status: complete
date_start: 2024-02      # per LinkedIn experience section — CONFLICTS with the event date below, see description
date_end: 2024-09
role: Committee Member, Public Relations
organization: Universiti Teknologi PETRONAS
location: Teluk Intan, Perak, Malaysia
icon: megaphone
```

**Summary.** Public-relations and on-the-ground role for an MPU4 digital-creativity project for school students.

**Description.** Resolved 2026-07 via Azim's own post: Mechaspeher was an MPU4 project introducing primary/secondary school students to digital creativity via green screen technology, delivered Jan 8–9, 2025. As a PR committee member Azim helped secure sponsorships, then on event days served as Emcee, a facilitator helping students use OBS Studio and CapCut, and ran hands-on green screen recording sessions. The team also completed a Training of Trainers session with Pejabat Pendidikan Daerah (PPD) Hilir Perak beforehand. **Date conflict, unresolved:** LinkedIn's experience section gives the committee role as Feb–Sep 2024, but the event itself — per Azim's own post — happened Jan 8–9, **2025**, after the stated end date. Possible explanations: the LinkedIn end date is wrong, or committee planning ran Feb–Sep 2024 for a program whose actual delivery slipped to January 2025. Needs Azim's confirmation.

**Impact.** Contributed to SDG Goal 4 (Quality Education) through direct student-facing digital-skills facilitation.

---

### LDR-011 · ASEAN Student Mobility Programme 2025 — Ceremony & Protocol Committee

```yaml
id: ldr-011
slug: asean-student-mobility-2025
featured: true
tier: rare
status: complete
date_start: 2025-02
date_end: 2025-02
role: Ceremony & Protocol (CNP) Committee Member
organization: UTP ASEAN Student Association (UTP-ASA)
location: UTP, Seri Iskandar
event_type: International student exchange program
duration_event: 5 days
icon: globe
```

**Summary.** Emcee and youth-dialogue coordinator for a 5-day ASEAN student exchange program.

**Description.** New entry, added 2026-07 from Azim's own LinkedIn post. Ran Feb 19–23, 2025, hosting students from Indonesia, Thailand, Vietnam, Myanmar, Cambodia, and the Philippines. Azim's specific responsibilities: Gala Dinner Emcee (drafted the script and hosted the night), Youth Dialogue Coordinator (invited speakers for a panel on ASEAN youth and sustainability), CSR activity support at Salvation Army, and city-tour guide for international students in Ipoh and KL. Part of the broader ASEAN Universities Exhibition and Forum 2025 (AEF2025).

**Impact.** Direct emcee/coordinator responsibilities on a multi-national program — good evidence of public speaking and cross-cultural coordination beyond the esports/tech lane.

---

### LDR-012 · CONVOFEST 2024 — Games and Competition (GNC) Committee

```yaml
id: ldr-012
slug: convofest-2024-gnc
featured: true
tier: rare
status: complete
date_start: 2024-10
date_end: 2024-10
role: Games and Competition (GNC) Committee Member
organization: Universiti Teknologi PETRONAS
location: UTP, Seri Iskandar
team_size: 15
icon: gamepad
```

**Summary.** Ran the MiniCyber 2024 booth at UTP's largest annual student event.

**Description.** New entry, added 2026-07 from Azim's own LinkedIn post. CONVOFEST 2024 (Oct 26–28, 2024) drew 2,000+ UTP students. As part of a 15-person GNC high-committee, Azim led operations for the MiniCyber 2024 booth end-to-end (setup through execution) and handled internal communication and cross-committee promotion.

**Impact.** MiniCyber 2024 booth raised approximately RM6,000 and drew strong student traffic.

---

### LDR-013 · UTP Cube Open 2024 — Communications Committee

```yaml
id: ldr-013
slug: utp-cube-open-2024
featured: true
tier: common
status: complete
date_start: 2024-09
date_end: 2024-09
role: Communications Committee Member
organization: UTP Chinese Cultural Club (UTPCC), with Malaysia Cube Sports Association (MYCSA) and World Cube Association (WCA)
location: UTP, Seri Iskandar
event_type: WCA-sanctioned speedcubing competition
icon: cube
```

**Summary.** Sponsorship outreach and judging for a WCA-sanctioned speedcubing competition.

**Description.** New entry, added 2026-07 from Azim's own LinkedIn post. Ran Sep 6–8, 2024, drawing 50+ participants from Malaysia and abroad across 3x3x3, 2x2x2, 4x4x4, and blindfolded categories. Pre-event, Azim contacted 50+ companies for sponsorship using a structured proposal/email/call script; on event days, served as a judge/timekeeper.

**Impact.** Direct exposure to corporate sponsorship outreach and official competition judging — outside his usual esports/tech committee work.

---

### LDR-014 · MCF-UTP National Youth Chess Championship 2024 — Assistant Head of Department, CNP

```yaml
id: ldr-014
slug: mcf-utp-chess-championship-2024
featured: true
tier: rare
status: complete
date_start: 2024-05
date_end: 2024-05
role: Assistant Head of Department (AHOD), Ceremony & Protocol
organization: Malaysian Chess Federation (MCF) × Universiti Teknologi PETRONAS
location: UTP, Seri Iskandar
event_type: National youth chess championship
icon: chess-knight
```

**Summary.** AHOD for ceremony and scorekeeping at a 100+ player national youth chess championship.

**Description.** New entry, added 2026-07 from Azim's own LinkedIn post. Ran May 25–27, 2024, gathering 100+ players across six age categories (Under-8 to Under-18, Open and Girls divisions). As Assistant Head of Department for Ceremony & Protocol, assisted in running the opening/closing ceremonies and managed the scorekeeping process.

**Impact.** A genuine title-holding leadership role (AHOD) outside esports/tech entirely — worth keeping visible for range.

---

## 7A. Events & Activities Attended

> **New section, added 2026-07.** Distinct from §7 Leadership — see the rule in §0. These are things Azim attended, volunteered at, or competed in, with no organizing title. Lighter-weight entries than Leadership/Projects on purpose — likely renders as a simple timeline/list on the site, not full cards. All sourced from Azim's own LinkedIn posts.

| ID | Date | Activity | Organizer | What Azim did |
|---|---|---|---|---|
| EVT-001 | 2025-02-23 | Talentbank Career Fair 2025 | Talentbank, Sunway Pyramid Convention Centre | Attended — visited booths, networked, asked about internships |
| EVT-002 | 2025-02-13 | AWS Malaysia industry visit | Computer Information Sciences UTP × AWS Malaysia | Attended — AI/ML and GenAI session, career discussions |
| EVT-003 | 2024-10-02 to 2024-10-03 | TEC24 career fair | UTP Business and Enterprise (BAE) Dept | Volunteered — sponsorship items, front-counter/participant guidance (60+ companies attended) |
| EVT-004 | 2024-07-13 | UTP Recruitment Day 2024 | UTP Management | Volunteered as company usher (assigned to KPOC) — no formal title given, borderline vs. §7, kept here |
| EVT-005 | 2024-02-29 | Ethical Hacking Workshop with LGMS Berhad | UTP Syntech Club × LGMS Berhad | Attended — penetration testing, OSSTMM methodology |
| EVT-006 | 2024-02-24 | Hacking 101 workshop | CYBERHAX UTP | Attended, competed — **won 1st place** in the mini CTF competition |
| EVT-007 | 2024-01-17 | Fundamentals of Cloud Computing workshop | Syntech Club UTP × RunCloud Education | Attended |
| EVT-008 | 2024-07-03 | Tesla Malaysia field trip | UCIS-SS (UTP Computer Information Science Student Society) | Attended — facility tour, hands-on with vehicles |
| EVT-009 | 2024-05-10 | Malaysia Artificial Intelligence Nexus 2024 | External forum | Attended |
| EVT-010 | 2024-03-09 | LinkedIn personal-branding workshop | External speaker | Attended |
| EVT-011 | 2023-11-04 | IoT/Robotics workshop (ESP32) | UTP Petrobots | Attended |
| EVT-012 | 2023-10-25 | Cyber Awareness Seminar | UCIS-SS × Yayasan Digital Malaysia | Attended |
| EVT-013 | 2023-10-19 to 2023-10-22 | UTP Super Sports 2023 — FIFA/Valorant tournaments | UTP Griffin Esports Club × UTP Super Sports | Committee member — his first-ever event management experience, precursor to his Griffin Esports progression (see LDR-002) |
| EVT-014 | 2023-10-06 to 2023-10-08 | UTP Super Sports 2023 — MLBB | "The Pythons" (CS/IT/IS/Business Management student team) | Competed as a player, representing his department's team; exited at group stage |

**Achievement worth flagging separately:** at **InnoFest 2023** (Kolej MARA Kuala Nerang innovation competition, reported by Azim Feb 2024), Azim won **Silver in the Idea Category** for "Car Fumes Pencil" — a concept for a filter system that captures and repurposes carbon from vehicle exhaust into pencil-manufacturing material. This is a real invention/ideation award, not just attendance — worth its own line in highlights (§9) or a small "Awards" subsection if Azim wants it more visible than a table row.

---

## 8. Certificates

> ⚠️ **TODO.** Resume does not list certificates and LinkedIn was not scrapable. Add yours using the template in §13. Examples of common ones for your stack: Google Data Analytics, Microsoft Power BI Data Analyst (PL-300), AWS Cloud Practitioner, Coursera ML, etc.

```yaml
# Example entry — REPLACE WITH REAL CERT
# - id: cert-001
#   slug: example-cert
#   featured: true
#   tier: rare
#   issuer: Example Issuer
#   name: Example Certification
#   date_issued: 2025-01
#   date_expires: null
#   credential_id: ABC123
#   credential_url: https://...
#   skills: [skill-a, skill-b]
certificates: []
```

---

## 9. Highlights (one-liners for hero & about strip)

> These are short stat-bar-or-banner lines. Used on the hero scroll, the about strip, and as `<meta>` descriptions. Pick top 4–6 per surface.

```yaml
highlights:
  - "Built VERA-AI — enterprise RAG assistant for PETRONAS Upstream"
  - "Led 100+ member esports org; secured RM20,000+ in sponsorships"
  - "Coordinated Wa No Kizuna 2024 in Osaka, Japan — RM100,000+ sponsorships"
  - "Project Director, 24-team nationwide MLBB tournament w/ CelcomDigi"
  - "Spearheaded Convocyber 2024 — 52 teams, national reach"
  - "PETRONAS Upstream intern (2025) — AI, automation, data viz"
  - "UTP National stage rep — SUKIPT 2024"
  - "Stack: Python · RAG · Power BI · Next.js · YOLO · Gemini"
  - "Built Synapse — adaptive AI science tutor for hackAstone 2026"
  - "Arcana — graph-native multi-agent research platform (FYP)"
  - "Silver Award, InnoFest 2023 — 'Car Fumes Pencil' carbon-reuse concept"
  - "UMHackathon 2026 Final Round finalist — Buildora, Team Dang Wangi"
  - "National Deep Tech Challenge 2026 entrant — GlucoLens"
```

---

## 10. References

> Both pulled from resume. **Do not surface phone/email publicly on the portfolio** — gate behind a click-to-reveal or include only on the downloadable resume PDF.

### REF-001 · Dr Aliza Bt Sarlan

```yaml
id: ref-001
name: Dr Aliza Bt Sarlan
title: Dean, Centre for Foundation Studies
secondary_role: Advisor — UTP Griffin Esports Club
institution: Universiti Teknologi PETRONAS
phone: "+60 5-368 7400"
email: aliza_sarlan@utp.edu.my
public_visible: false      # gate behind click-to-reveal or PDF-only
```

### REF-002 · Ts. Saipunidzam bin Mahamad

```yaml
id: ref-002
name: Ts. Saipunidzam bin Mahamad
title: Senior Lecturer, Computer & Information Science
secondary_role: Advisor — GDSC-UTP Club
institution: Universiti Teknologi PETRONAS
phone: "+60 5-368 7408"
email: saipunidzam_mahamad@utp.edu.my
public_visible: false
```

---

## 11. Tier-assignment logic (so future additions stay consistent)

Use this as the rubric when classifying new entries:

| Tier | Signal |
|---|---|
| **legendary** | Production impact + scale (>RM50k value, >50 people, national/international reach), or flagship technical work (VERA-AI tier). Max 3–4 entries across the whole portfolio. |
| **epic** | Strong individual contribution + measurable outcome (RM5k–50k value, 20–50 people, regional reach). Showcase projects. |
| **rare** | Solid work, clear deliverable, smaller scope (sub-RM5k, <20 people, internal/local reach). |
| **common** | Coursework, learning artifacts, small personal experiments, supporting roles. Still included if quality is high. |

Distribution target: ~3 legendary / ~3–4 epic / ~3–4 rare / unlimited common. **If everything is legendary, nothing is.**

---

## 12. Featured ordering (current portfolio v1.0 sequence)

```yaml
projects_grid_order:        # revised 2026-07-03 — no longer an 8-slot cap, see §6 note
  - prj-010    # Arcana                 (legendary, flagship — FYP, in progress)
  - prj-001    # VERA-AI                (legendary, flagship)
  - prj-009    # Synapse                (epic — hackAstone / Codex, in progress)
  - prj-011    # Buildora               (epic — UMHackathon Final Round)
  - prj-012    # GlucoLens              (epic — Deep Tech Challenge)
  - prj-002    # PETRONAS Microsite     (epic, flagship)
  - prj-003    # Crowd-View-AI          (epic)
  - prj-004    # OnlyVolunteer          (epic)
  - prj-005    # PPT Automation         (rare)
  - coursework # prj-006 + prj-007 + prj-008 collapsed into one list item (common)
  # PRJ-013 through PRJ-020 (OmniX, InstagrabDB, SignalMap, MeshGuard, Pulse-of-Malaysia,
  # Pickup-App, AI-Powered-Python-Group-Assignment, GenUI-Education) intentionally NOT
  # ordered here yet — they're placeholder entries awaiting real descriptions from Azim.
  # Add them here once written up; don't render with placeholder copy in the meantime.

leadership_list_order:      # vertical quest list §10.5 — updated 2026-07 with LDR-008 through LDR-014
  - ldr-001    # Wa No Kizuna           (legendary)
  - ldr-002    # Griffin Esports Pres   (legendary)
  - ldr-003    # GDSC Event Mgmt        (epic)
  - ldr-004    # Celcomdigi Battle      (epic)
  - ldr-005    # CYBERHAX               (rare)
  - ldr-011    # ASEAN Student Mobility (rare)
  - ldr-012    # CONVOFEST GNC          (rare)
  - ldr-014    # MCF-UTP Chess Champ    (rare)
  - ldr-007    # Debat Anti Rasuah      (common)
  - ldr-008    # UCIS Student Society   (common)
  - ldr-009    # UTP SYNTECH            (common)
  - ldr-010    # Mechaspeher MPU4       (common)
  - ldr-013    # UTP Cube Open          (common)

experience_order:
  - exp-001    # PETRONAS Upstream      (legendary)
```

---

## 13. SCAFFOLDING — Templates for new entries

> Copy-paste a template below, change the ID (next sequential number), fill in fields. Keep IDs stable forever.

### Template · New Project

```markdown
### PRJ-XXX · {Project Name}

\`\`\`yaml
id: prj-xxx
slug: kebab-case-slug
featured: true | false
tier: common | rare | epic | legendary
status: complete | in-progress | started | archived
date: YYYY               # year only is fine for short projects
date_start: YYYY-MM      # use range fields for longer projects
date_end: YYYY-MM
category: ai-ml | web-platform | mobile-platform | automation | data-science | coursework | tool | game | other
icon: short-keyword-for-pixel-icon
repo: https://github.com/... | null
demo: https://... | null
cover: /content/media/prj-xxx-cover.png | null
tech: [Tech1, Tech2, Tech3]
related_experience: exp-xxx | null
context: "where this lived (internship / hackathon / coursework / personal)"
\`\`\`

**Summary.** One sentence — what is it.

**Description.** Two–four sentences — what you built, how, why. Lead with verbs (Built, Designed, Architected).

**Impact.** One–two sentences — what happened because it exists. Metrics if real, qualitative if not.
```

### Template · New Work Experience

```markdown
### EXP-XXX · {Organization} — {Role}

\`\`\`yaml
id: exp-xxx
slug: kebab-case-slug
featured: true | false
tier: common | rare | epic | legendary
status: complete | in-progress
date_start: YYYY-MM
date_end: YYYY-MM | "present"
organization: Organization Name
division: Department or null
city: City
country: Country
role: Job Title
employment_type: Internship | Full-time | Part-time | Contract | Volunteer
tech: [Tool1, Tool2]
related_projects: [prj-xxx, prj-yyy]
\`\`\`

**Summary.** One sentence framing the role.

**Responsibilities.**
- Bullet of what you owned (verb-led).
- Another.
- Another.

**Impact.** Outcome of the role. Use metrics if you have them.
```

### Template · New Leadership Role

```markdown
### LDR-XXX · {Organization} — {Role}

\`\`\`yaml
id: ldr-xxx
slug: kebab-case-slug
featured: true | false
tier: common | rare | epic | legendary
status: complete | in-progress
date_start: YYYY-MM
date_end: YYYY-MM | "present"
role: Position Title
organization: Org Name
location: City, Country
event_type: optional context tag
team_size: 0 members | N committees
sponsorship_secured: "RM0,000" | null
icon: short-keyword
\`\`\`

**Summary.** One-line role description.

**Description.** 2–4 sentences — what you did, scale, context.

**Highlights.** (Optional)
- Bullet
- Bullet

**Impact.** Outcome statement.
```

### Template · New Certificate

```markdown
### CERT-XXX · {Cert Name}

\`\`\`yaml
id: cert-xxx
slug: kebab-case-slug
featured: true
tier: common | rare | epic | legendary
issuer: Issuing Organization
name: Full Certification Name
date_issued: YYYY-MM
date_expires: YYYY-MM | null
credential_id: ABCD-1234
credential_url: https://...
skills: [skill-a, skill-b]
\`\`\`

**Notes.** (Optional) Anything you want recruiters to know about the cert.
```

### Template · New Skill (add to §4)

```yaml
# For Programming languages:
- { name: SkillName, proficiency: 0-100, tier: common|rare|epic|legendary, years: N }

# For Tools:
- { name: SkillName, category: dev|backend|frontend|data-viz|ai|ai-cv|mobile|database|enterprise|automation|design }

# For Core strengths:
- { name: "Strength Name", score: 0-100 }
```

---

## 14. Notes for the AI coding agent

> Read this before generating any UI from this file.

0. **`context: null` + a "PLACEHOLDER" description = do not render**, even if `featured: true`. Several entries added 2026-07 (PRJ-013 through PRJ-020) are skeleton entries with only a GitHub one-liner, waiting on Azim's real write-up. Rendering these as full cards would show thin/generic copy on the live site — treat `featured: true` + placeholder description as "hold, don't ship" until the description is replaced.

1. **Parse the YAML inside fenced ` ```yaml ` blocks** under each entry. The prose below is for display copy, not for parsing structured fields.
2. **`featured: false` entries should NOT render** in the public portfolio but should remain in this file (kept as content even if hidden).
3. **`status: started`** = work in progress / unfinished GitHub repos. Do NOT render.
4. **Map `tier` to color tokens** from `design-theme.md §4.2 / §4.3` (day/night). `common` uses the default `--ink` shadow; `rare`/`epic`/`legendary` use their named tokens.
5. **Project sort order** in the Inventory Grid: use `projects_grid_order` from §12 verbatim if present, otherwise sort by tier desc → date desc.
6. **Leadership list order** in the Quest list: use `leadership_list_order` from §12 verbatim if present, otherwise sort by date desc.
7. **Linked entries.** `related_experience` and `related_projects` are cross-references; render as small "linked" pills under the card or as in-text anchors.
8. **Voice rules for any agent-generated copy.**
   - Technical-confident, not boastful. Let metrics carry the weight.
   - Active verbs first: *Built*, *Designed*, *Led*, *Coordinated*, *Engineered*.
   - No "passionate about" / "highly skilled" filler.
   - Don't repeat the org name three times in a card; once is enough.
9. **Empty / null fields** render as `—` in any structured display, or simply skip the row.
10. **Date display.** In hero context use year only (`2025`); in cards use month-year (`May 2025`); in the resume PDF use full ranges.
11. **Icon mapping.** The `icon` field is a *keyword*, not a path. The agent maps keyword → pixel sprite. Use `/public/sprites/{icon}.svg` if a sprite exists; fall back to a generic `cube.svg`.
12. **Mobile.** When the inventory grid collapses to 2 columns, **show all 8 featured projects**, just stacked.

---

## 15. Open TODOs

**New this pass (v1.4, LinkedIn Activity import) — need Azim's input:**
- [ ] Write real descriptions for PRJ-013 through PRJ-020 (OmniX, InstagrabDB, SignalMap, MeshGuard, Pulse-of-Malaysia, Pickup-App-optimal-route-analyze, AI-Powered-Python-Group-Assignment, GenUI-Education) — currently GitHub one-liners only, marked as do-not-render placeholders
- [ ] Confirm SignalMap's hackathon: GitHub says "Talentbank hackathon project," prior context said TNG Digital FinHack
- [ ] Confirm whether GenUI-Education is the real Synapse (PRJ-009) repo or a separate project
- [ ] Confirm framing for Pulse-of-Malaysia / suicide-vulnerability-dashboard (PRJ-017) — sensitive subject, needs Azim's input on exactly how to present it
- [ ] Confirm whether PRJ-019 (AI-Powered-Python-Group-Assignment) should fold into the coursework collapse with PRJ-006/007/008
- [ ] Resolve the Mechaspeher/LDR-010 date conflict (committee dates Feb–Sep 2024 vs. event date Jan 2025)
- [ ] Get a real description for the "Technical Department" half of LDR-009 (UTP SYNTECH) — the Ceremony & Protocol half now has one
- [ ] Decide whether to give the InnoFest 2023 Silver Award ("Car Fumes Pencil") its own Awards subsection, or leave it as a highlights-only mention
- [ ] Minor, non-content: Azim's LinkedIn headline says "University Teknologi PETRONAS" — missing the "i" in Universiti. Worth a quick fix on LinkedIn itself, unrelated to this file.

**Carried over from v1.3 — still open:**
- [ ] Confirm whether `javafx-task-manager-system` really is PRJ-006, given the name mismatch (task manager vs. DBMS)
- [ ] PRJ-007 (C++ Online Store) has no matching repo anywhere in the 30-repo list

**Carried over from v1.2 — still open:**
- [ ] Confirm date discrepancy: LDR-004 (CelcomDigi) — this file's Aug 2024 committee-start vs. LinkedIn profile's Sept 2024 (the live event dates, Nov 2–6, are now confirmed and not in dispute)
- [ ] Decide whether EDU-003 (MRSM) should render on the portfolio

**Carried over from v1.0/v1.1 — still open:**
- [ ] Confirm exact tech stack details for PRJ-009/010/011/012 beyond primary language
- [ ] Confirm start/end dates for PRJ-009 (Synapse) and PRJ-011/012 where still approximate
- [ ] Write full case-study depth for PRJ-010 (Arcana) — good one-liner now, needs the full case-study version
- [ ] Add certificates to §8 — confirmed empty on LinkedIn, not a scraping gap
- [ ] Add demo URLs, cover images, portrait, resume PDF (see prior versions' TODOs — unchanged)
- [ ] Add `Full-Stack Development` score in §4 (currently 70 — CONFIRM)
- [ ] Optional: break LDR-006 placeholder out into a separate role if relevant; otherwise delete the placeholder
- [ ] Double-check PETRONAS internship duration: EXP-001 records `2025-05 → 2025-12` (8 months) vs. "7-month internship" used elsewhere

---

## 16. Change log

| Version | Date | Notes |
|---|---|---|
| 1.0 | 2026-05-27 | Initial content lock. Sourced from resume PDF + GitHub profile + pinned repos (VERA-AI, PETRONAS Systemic Shifts, Crowd-View-AI, OnlyVolunteer). LinkedIn not scrapable. Certificates empty pending user input. |
| 1.1 | 2026-07-03 | Added PRJ-009 (Synapse), PRJ-010 (Arcana, flagship/legendary), PRJ-011 (Buildora), PRJ-012 (GlucoLens) — sourced from prior conversation context, not a fresh scrape (see sourcing note at top of file). Confirmed GitHub's 4 pinned repos unchanged via profile page. LinkedIn still robots-blocked. GitHub REST API hit the anonymous rate limit before the full repo list could be enumerated. Added `portfolio` URL. Added 5 `CONFIRM`-tagged skills. Updated §6/§12 to reflect the coursework-collapse decision made during the site redesign planning pass and to drop the stale "8 slots" framing. |
| 1.2 | 2026-07-04 | Imported Azim's LinkedIn "Save to PDF" export. Corrected UTP start date (2023-08, not the placeholder 2022) and confirmed pronouns (He/Him). Added EDU-002 (Kolej MARA Kuala Nerang) and EDU-003 (MRSM) — previously missing from this file entirely. Corrected LDR-001 and LDR-003 start dates to match LinkedIn's stated durations. Flagged a start-date conflict on LDR-004. Enriched LDR-002, LDR-003, and LDR-005 with sub-role highlights pulled from LinkedIn. Added three new leadership entries (LDR-008 UCIS Student Society, LDR-009 UTP SYNTECH, LDR-010 Mechaspeher MPU4) that had no prior record in this file — all three are thin (LinkedIn exports title/dates only, no description) and need a sentence from Azim. Confirmed LinkedIn has no certificates listed (not a scrape failure — the profile section is genuinely empty). Noted that LinkedIn's PDF export does not include Activity/Posts (events attended/participated) or the profile photo — separate follow-ups needed for both. |
| 1.3 | 2026-07-04 | Imported Azim's full GitHub repo list (30 repos). Confirmed real repo URLs for PRJ-005, PRJ-008, PRJ-010 (Arcana), PRJ-011 (Buildora), PRJ-012 (GlucoLens) — resolving several long-standing `CONFIRM` tags. Updated PRJ-010 and PRJ-012 descriptions with more accurate wording straight from GitHub (Arcana is a 21-agent pipeline, not 20; GlucoLens is framed as a "clinical nutrition companion"). Flagged a probable-but-unconfirmed repo match for PRJ-006 (name mismatch: "task manager" vs. "DBMS"). Confirmed no C++ repo exists anywhere in the account for PRJ-007. Documented ~8 previously-unknown repos (OmniX, InstagrabDB, SignalMap, MeshGuard, Pulse-of-Malaysia/suicide-vulnerability-dashboard, Pickup-App-optimal-route-analyze, AI-Powered-Python-Project-Group-Assignment-, GenUI-Education) as a candidate list rather than adding them as PRJ entries outright — need Azim's decision on which to feature. |
| 1.4 | 2026-07-04 | Structural change: split §7 Leadership into **§7 Leadership** (title-holding roles) and new **§7A Events & Activities Attended** (participation without a title), per Azim's explicit request — rule documented in §0. Imported Azim's full LinkedIn Activity/Posts feed (40 posts) — resolved several open date/naming conflicts using his own contemporaneous posts (Wa No Kizuna event dates, Convocyber's real title "Project Director," the CYBERHAX workshop-naming ambiguity, CIS Dean's List and Mechaspeher real descriptions). Added 4 new Leadership entries (LDR-011 ASEAN Student Mobility, LDR-012 CONVOFEST GNC, LDR-013 UTP Cube Open, LDR-014 MCF-UTP Chess Championship) and 14 new Events entries (EVT-001 through EVT-014). Flagged a new, unresolved date conflict on LDR-010 (Mechaspeher). Added PRJ-013 through PRJ-020 as placeholder entries for all 8 GitHub candidates from v1.3, per Azim's instruction — marked do-not-render until real descriptions arrive. Corrected EDU-002 GPA from 5.58 to 3.58 using Azim's own graduation post (5.58 was very likely a digit-transposition typo from an earlier source). Added an InnoFest 2023 Silver Award ("Car Fumes Pencil") to highlights — a real invention/ideation award that wasn't recorded anywhere in this file before. |

---

*End of file.*
