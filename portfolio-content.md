# portfolio-content.md
**Project:** Personal Portfolio — Fakhrul Azim
**Version:** 1.0
**Purpose:** Single source of truth for all content (biodata, projects, leadership, skills, references). Agent-readable. Companion to `design-theme.md`.
**Last updated:** 2026-05-27

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

For an agent adding new content: see **§13 Scaffolding** and **§14 Agent notes**.

---

## 1. Identity

```yaml
name_full: Fakhrul Azim Bin Ahmed Mardzukie
name_display: Fakhrul Azim
name_short: Azim
handle: fakhrulazim
pronouns: he/him          # CONFIRM
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
  portfolio: null                     # TODO: fill in after deploy
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
date_start: 2022          # CONFIRM
date_end: 2026-12
expected: true
gpa: 3.4
gpa_scale: 4.0
```

**Notes.** Final-year student. Major-aligned with my work on data systems and AI; minor in Financial Management informs the commercial-KPI side of the PETRONAS internship.

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
```

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

> Featured projects appear in the **Projects Vault** section of the portfolio. Sort order: tier desc → date desc. Up to 8 slots in the inventory grid (`design-theme.md §15`).

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
repo: null                # CONFIRM — private internal tool?
demo: null
cover: null
tech: [Python, python-pptx, openpyxl]
related_experience: exp-001
context: PETRONAS Internship
```

**Summary.** Python tool that extracts structured data, tables, and images from PowerPoint and exports formatted Excel reports.

**Description.** Internal automation built during the PETRONAS internship. Takes arbitrary PPTX decks, walks the slide tree, pulls out structured content (tables, images, text boxes by layout), and writes a standardized Excel report for downstream reporting. Killed a hand-copying step that was eating hours per week.

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
repo: null      # CONFIRM
demo: null
cover: null
tech: [Java, OOP, JavaFX/Swing]    # CONFIRM UI library
related_experience: null
context: UTP coursework — Object-Oriented Programming
```

**Summary.** Database management system applying OOP fundamentals (encapsulation, inheritance, abstraction).

**Description.** Coursework project building a small DBMS with a user-facing interface for registration and dashboard functionality. Used to demonstrate clean OOP design — proper class hierarchies, encapsulated data access, abstracted I/O layer.

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
repo: null      # CONFIRM
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
repo: null      # CONFIRM
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

> **Hidden / unfinished GitHub repos.** Per the user's note, the GitHub account has additional repos beyond the four pinned ones that are *not* finalized choices to feature. Those are intentionally excluded from §6 above. If any move from `started` to `complete`, append them using the **Template: New Project** in §13.

---

## 7. Leadership & involvement

### LDR-001 · Wa No Kizuna: Bonds of Harmony — Secretary

```yaml
id: ldr-001
slug: wa-no-kizuna
featured: true
tier: legendary
status: complete
date_start: 2024-04
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

**Description.** Managed communication and documentation as a high-committee member, coordinating between 20 committees, UTP management, Osaka universities, corporate sponsors, and Japan Da'wah Centre. Supervised the protocol department to ensure smooth on-the-ground execution of the 10-day event.

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

**Highlights.**
- SUKIPT 2024 national-stage representation
- Convocyber 2024 (52-team nationwide tournament, RM5,000+ sponsorships, RM3,500 prize pool)
- 3-department restructure

**Impact.** The club went from informal to institutional under this term — sponsorship pipeline, event cadence, and national visibility all locked in.

---

### LDR-003 · GDSC-UTP — Asst Head of Department, Event Management

```yaml
id: ldr-003
slug: gdsc-utp-event-mgmt
featured: true
tier: epic
status: complete
date_start: 2024-05
date_end: 2025-02
role: Assistant Head of Department, Event Management
organization: Google Developer Student Clubs — UTP
location: UTP, Seri Iskandar
team_size: 35 committee members
icon: code
```

**Summary.** Supervised 35 committee members across workshops, recruitment drives, and collaborations.

**Description.** Coordinated event-management arm of GDSC-UTP: workshop programming, recruitment pipelines, cross-club collaborations. Acted as Project Director for GDSC Kickoff × Family Day 2024 — led 17 committee members to deliver the chapter's large-scale onboarding event.

**Impact.** Healthy onboarding event for the academic year; sustainable event cadence across two semesters.

---

### LDR-004 · Celcomdigi Esports Battle Arena — Project Director

```yaml
id: ldr-004
slug: celcomdigi-esports-battle-arena
featured: true
tier: epic
status: complete
date_start: 2024-08
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

**Description.** Led a 30-person team to organize the Celcomdigi Esports Battle Arena — a two-phase offline-then-online MLBB tournament with 24 teams. Owned sponsorship outreach, event streaming, logistics, and overall execution end-to-end.

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

**Description.** Assistant Head of the Activity & Welfare department at UTP CYBERHAX, the campus cybersecurity club. Assisted in leading the Cyber Skill Level-Up @ Flag Dive Workshop — a hands-on cybersecurity training event with a 20-member execution team.

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

**Description.** Managed documentation and communication ensuring smooth execution of a nationwide inter-university Malaysian debate competition organized in partnership with SPRM. Acted as the high-coordination point between organizers and participants.

**Impact.** Event delivered with full documentation; demonstrated coordination experience outside the tech/esports lane.

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
projects_grid_order:        # 8 slots — inventory grid §15
  - prj-001    # VERA-AI                (legendary)
  - prj-002    # PETRONAS Microsite     (epic)
  - prj-003    # Crowd-View-AI          (epic)
  - prj-004    # OnlyVolunteer          (epic)
  - prj-005    # PPT Automation         (rare)
  - prj-008    # R Data Science         (common)
  - prj-006    # Java DBMS              (common)
  - prj-007    # C++ Store              (common)

leadership_list_order:      # vertical quest list §10.5
  - ldr-001    # Wa No Kizuna           (legendary)
  - ldr-002    # Griffin Esports Pres   (legendary)
  - ldr-003    # GDSC Event Mgmt        (epic)
  - ldr-004    # Celcomdigi Battle      (epic)
  - ldr-005    # CYBERHAX               (rare)
  - ldr-007    # Debat Anti Rasuah      (common)

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

- [ ] Add certificates to §8 (resume has none listed; LinkedIn blocked from auto-scrape)
- [ ] Confirm pronouns (defaulted `he/him`)
- [ ] Confirm UTP start year (defaulted 2022)
- [ ] Confirm repo URLs for PRJ-005, PRJ-006, PRJ-007, PRJ-008 (set to `null` for now)
- [ ] Confirm dates for PRJ-006 / PRJ-007 / PRJ-008 (coursework years approximated)
- [ ] Note: actual repo name is `Crowed-View-AI` (typo in name). Consider renaming on GitHub before launch.
- [ ] Add demo URLs for live projects (VERA-AI internal? Microsite internal? Crowd-View-AI demo video?)
- [ ] Drop project cover images at `/content/media/prj-XXX-cover.png`
- [ ] Drop portrait at `/public/media/portrait.jpg` and voxel avatar reference at `/content/media/avatar-ref.png`
- [ ] Add `Full-Stack Development` score in §4 (currently 70 — CONFIRM)
- [ ] LinkedIn manual sync — copy across anything not in the resume (additional projects, recommendations, languages)
- [ ] Add resume PDF to `/public/resume.pdf`
- [ ] Optional: break LDR-006 placeholder out into a separate role if relevant; otherwise delete the placeholder

---

## 16. Change log

| Version | Date | Notes |
|---|---|---|
| 1.0 | 2026-05-27 | Initial content lock. Sourced from resume PDF + GitHub profile + pinned repos (VERA-AI, PETRONAS Systemic Shifts, Crowd-View-AI, OnlyVolunteer). LinkedIn not scrapable. Certificates empty pending user input. |

---

*End of file.*
