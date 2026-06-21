# Implementation Plan: Developer Portfolio Website

**Branch**: `001-developer-portfolio` | **Date**: 2026-06-22 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-developer-portfolio/spec.md`

## Summary

Build a modern, mobile-first developer portfolio website using Next.js 16 (App Router), shadcn/ui + Magic UI components, Tailwind CSS, Framer Motion, and GitHub API integration. The site features glassmorphism design, spatial animations, real-time GitHub data, and a "wow factor" interactive element. All content is served statically or fetched from public APIs—no database required. Seed data is used for projects and profile information.

## Technical Context

**Language/Version**: TypeScript 5.1+, React 19 (canary via Next.js 16)

**Production Dependencies** (`dependencies`):
- Next.js 16.2.9 (App Router, Turbopack)
- React 19 (canary, bundled with Next.js)
- shadcn/ui components (Radix UI primitives)
- Magic UI components (animated effects)
- Framer Motion (animations, transitions, layout animations)
- Lucide React (icons)
- next-themes (dark/light mode)

**Dev Dependencies** (`devDependencies`):
- TypeScript 5.1+
- Tailwind CSS v4
- ESLint (standard config from Next.js)
- Prettier (code formatting)
- Husky (git hooks)
- lint-staged (run linters on staged files)

**Storage**: N/A (no database) — seed data files + GitHub API

**Testing**: N/A (per constitution: No Tests principle)

**Target Platform**: Web (modern evergreen browsers: Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+)

**Project Type**: Web application (static portfolio site)

**Performance Goals**:
- Lighthouse performance score 90+ on mobile
- Initial content load < 2 seconds on 3G
- GitHub data load < 3 seconds on broadband
- 60fps animations on mid-range devices

**Constraints**:
- No database — all data from seed files or GitHub public API
- Static hosting deployment (Vercel, Netlify, Cloudflare Pages)
- GitHub API rate limit: 60 req/hr unauthenticated, 5,000 req/hr with PAT
- Mobile-first responsive design (320px to 4K)

**Scale/Scope**: Single-developer portfolio, ~5-7 page sections, ~15-20 components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Clean Code | ✅ PASS | All variable/function names will be descriptive. No clever tricks. |
| II. No Over-Engineering | ✅ PASS | Flat component structure. No unnecessary abstractions. Direct API calls. |
| III. Simple Comments | ✅ PASS | Every function will have a plain-language comment. |
| IV. No Tests | ✅ PASS | No test files or frameworks will be added. |
| V. Documentation Freshness | ✅ PASS | Using Context7 MCP / WebFetch to verify docs. All facts validated against official sources. |
| VI. Minimal Code | ✅ PASS | Prefer built-in Next.js features. Minimal external dependencies. |

**Gate Result**: PASS — No violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/001-developer-portfolio/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main portfolio page (single-page app)
│   └── globals.css         # Global styles + glassmorphism utilities
├── components/
│   ├── ui/                 # shadcn/ui components (Card, Badge, Avatar, Button, Skeleton)
│   ├── magicui/            # Magic UI components (animated-beam, dock, theme-toggler, particles, etc.)
│   ├── hero.tsx            # Hero section with profile + animated background
│   ├── projects.tsx        # Project showcase grid with magic card effects
│   ├── github-stats.tsx    # Real-time GitHub data display
│   ├── tech-stack.tsx      # Technology stack visualization with orbiting circles
│   ├── contact.tsx         # Contact links section
│   ├── navbar.tsx          # Sticky navigation with dock
│   └── footer.tsx          # Footer with social links
├── lib/
│   ├── github.ts           # GitHub API client + types
│   ├── seed-data.ts        # Static seed data (projects, profile, tech stack)
│   └── utils.ts            # Utility functions (cn helper, etc.)
├── hooks/
│   └── use-github.ts       # Custom hook for GitHub data fetching
└── public/
    ├── images/             # Project thumbnails, avatar
    └── fonts/              # Custom fonts if needed
```

**Structure Decision**: Single Next.js App Router project. All components in `src/components/`, data in `src/lib/`, hooks in `src/hooks/`. Flat structure with minimal nesting per constitution principle II.

### Development Workflow

**Git Hooks (Husky + lint-staged)**:
- Pre-commit hook runs `lint-staged` on all staged files
- Lint-staged configuration:
  - `*.{ts,tsx,js,jsx}` → ESLint (standard Next.js config) + Prettier
  - `*.{css,json,md}` → Prettier only
- All code MUST pass linting before commit succeeds
- No manual lint step required — hooks enforce automatically

**ESLint Configuration**:
- Uses Next.js built-in ESLint config (`eslint-config-next`)
- Standard rules: `next/core-web-vitals`, `next/typescript`
- No custom rules unless team decides otherwise

**Prettier Configuration**:
- Standard Prettier config
- Integrates with ESLint via `eslint-config-prettier`

**Dependency Management**:
- Production deps in `dependencies` (Next.js, React, UI libraries, Framer Motion, Lucide, next-themes)
- Dev tools in `devDependencies` (TypeScript, Tailwind, ESLint, Prettier, Husky, lint-staged)
- Install with `npm install` (production) or `npm install --save-dev` (dev tools)

## Complexity Tracking

> No violations to justify. All decisions align with constitution principles.

---

## Phase 0: Research Findings

### Technology Validation

| Technology | Version | Validated | Source |
|------------|---------|-----------|--------|
| Next.js | 16.2.9 | ✅ | [nextjs.org/docs](https://nextjs.org/docs/getting-started/installation) |
| shadcn/ui | Latest | ✅ | [ui.shadcn.com](https://ui.shadcn.com/docs/components) |
| Magic UI | Latest | ✅ | [magicui.design](https://magicui.design/docs/components) |
| Tailwind CSS | v4 (bundled with Next.js) | ✅ | Next.js installer defaults |
| GitHub REST API | v3 (2022-11-28) | ✅ | [docs.github.com](https://docs.github.com/en/rest/users/users) |

### UI Library Synergy Strategy

**shadcn/ui** — Base structural components:
- Card, Badge, Avatar, Button, Skeleton, Dialog, Tooltip, Tabs
- Form elements, navigation primitives
- Accessible, Radix-based foundations

**Magic UI** — Animated/decorative effects:
- Animated Beam (visual connection effects)
- Dock (macOS-style navigation)
- Theme Toggler (animated dark/light switch)
- Particles, Pulsating Button, Shimmer Button
- Magic Card, Neon Gradient Card, Shine Border
- Marquee, Number Ticker, Text Reveal
- Orbiting Circles (tech stack visualization)

**Framer Motion** — Animation orchestration:
- Scroll-triggered reveal animations
- Layout animations and transitions
- Gesture handling (hover, tap, drag)
- Staggered children animations
- Parallax and cursor-tracking effects

**Integration Pattern**: shadcn/ui provides the structural skeleton, Magic UI adds visual flair, Framer Motion orchestrates all animations. No additional UI libraries.

### GitHub API Endpoints

| Endpoint | Purpose | Auth Required |
|----------|---------|---------------|
| `GET /users/{username}` | Profile info (name, bio, avatar, repos, followers) | No |
| `GET /users/{username}/repos` | List repositories (stars, language, description) | No |
| `GET /users/{username}/events/public` | Recent public activity (commits, PRs) | No |

**Rate Limits**:
- Unauthenticated: 60 requests/hour
- With PAT: 5,000 requests/hour

**Strategy**: Fetch on server-side (Next.js Server Components) with ISR (Incremental Static Regeneration) to cache responses. Use seed data as fallback when API is unavailable.

### Animation Approach

**Magic UI Components** (visual effects):
- `AnimatedBeam` — Connecting lines between elements (e.g., GitHub stats flow)
- `Dock` — macOS-style floating navigation bar
- `ThemeToggler` — Animated dark/light mode switch
- `Particles` — Background particle effects for hero section
- `MagicCard` / `NeonGradientCard` — Glowing project cards
- `Marquee` — Infinite scrolling tech stack display
- `NumberTicker` — Animated counter for GitHub stats
- `OrbitingCircles` — Technologies orbiting around avatar
- `ShimmerButton` / `PulsatingButton` — Call-to-action buttons
- `TextReveal` — Scroll-triggered text animations

**Framer Motion** (animation orchestration):
- Scroll-triggered reveal animations (fade-up, slide-in)
- Layout animations for project filtering
- Gesture handling (hover, tap effects)
- Staggered children animations
- Parallax and cursor-tracking on hero
- Section transitions

**CSS/Tailwind** (foundational styling):
- Glassmorphism (backdrop-filter: blur, background opacity)
- Noise texture overlay
- Skeleton loading shimmer

---

## Phase 1: Design & Contracts

### Data Model

See [data-model.md](./data-model.md) for complete entity definitions.

**Key Entities**:
- `Profile` — Developer identity (name, title, bio, avatar, links)
- `Project` — Portfolio entries (title, description, tags, links, featured)
- `Technology` — Tech stack items (name, icon, category)
- `GitHubProfile` — Real-time GitHub user data
- `GitHubRepo` — Repository data (name, description, stars, language)
- `GitHubEvent` — Recent activity events

### API Contracts

See [contracts/](./contracts/) for interface definitions.

**External APIs consumed**:
- GitHub REST API v3 (user profile, repos, events)

**Internal interfaces**:
- Seed data module exports (typed TypeScript interfaces)
- GitHub API client functions (fetch + cache + fallback)

### Quickstart Guide

See [quickstart.md](./quickstart.md) for validation scenarios.

---

## Post-Design Constitution Re-Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Clean Code | ✅ PASS | All component names descriptive (Hero, ProjectCard, GitHubStats) |
| II. No Over-Engineering | ✅ PASS | Flat structure, direct API calls, no unnecessary layers |
| III. Simple Comments | ✅ PASS | Will add plain comments to all functions |
| IV. No Tests | ✅ PASS | No test infrastructure added |
| V. Documentation Freshness | ✅ PASS | All tech versions verified via WebFetch against official docs |
| VI. Minimal Code | ✅ PASS | 3 UI libraries (shadcn + Magic UI + Framer Motion) serve distinct purposes with no overlap. Each chosen for specific strength. |

**Gate Result**: PASS — Design complies with all constitution principles. The three-library approach is justified: shadcn/ui for accessible structural components, Magic UI for animated decorative effects, Framer Motion for animation orchestration. No redundancy.
