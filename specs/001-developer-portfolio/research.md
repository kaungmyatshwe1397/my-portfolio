# Research Findings: Developer Portfolio

**Feature**: 001-developer-portfolio
**Date**: 2026-06-22

## Technology Stack Validation

### Next.js 16.2.9

- **Status**: ✅ Validated
- **Source**: [nextjs.org/docs](https://nextjs.org/docs/getting-started/installation)
- **Key Features**: App Router, Turbopack (default bundler), React 19 canary, TypeScript 5.1+ support
- **Minimum Node.js**: 20.9
- **Browser Support**: Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+

### shadcn/ui

- **Status**: ✅ Validated
- **Source**: [ui.shadcn.com](https://ui.shadcn.com/docs/components)
- **Components Used**: Card, Badge, Avatar, Button, Skeleton, Dialog, Tooltip, Tabs
- **Note**: No "dither" component exists. Visual effects handled by Magic UI or custom CSS.

### Magic UI

- **Status**: ✅ Validated
- **Source**: [magicui.design](https://magicui.design/docs/components)
- **Components Selected**:
  - `AnimatedBeam` — Visual connection effects between elements
  - `Dock` — macOS-style floating navigation
  - `ThemeToggler` — Animated dark/light mode switch
  - `Particles` — Background particle effects
  - `MagicCard` / `NeonGradientCard` — Glowing project cards
  - `Marquee` — Infinite scrolling tech stack
  - `NumberTicker` — Animated counters for GitHub stats
  - `OrbitingCircles` — Tech stack visualization
  - `ShimmerButton` / `PulsatingButton` — CTA buttons
  - `TextReveal` — Scroll-triggered text animations

### Tailwind CSS v4

- **Status**: ✅ Validated
- **Source**: Bundled with Next.js 16 installer defaults
- **Note**: Uses CSS-first configuration, @theme directive

### Framer Motion

- **Status**: ✅ Validated
- **Purpose**: Animation orchestration for all three UI libraries
- **Key Features**: Scroll-triggered animations, layout animations, gestures, stagger

### GitHub REST API v3

- **Status**: ✅ Validated
- **Source**: [docs.github.com](https://docs.github.com/en/rest/users/users)
- **Endpoints**:
  - `GET /users/{username}` — Profile info
  - `GET /users/{username}/repos` — Repository list
  - `GET /users/{username}/events/public` — Recent activity
- **Rate Limits**: 60/hr unauthenticated, 5,000/hr with PAT
- **Strategy**: Server-side fetch with ISR caching, seed data fallback

---

## UI Library Synergy Strategy

### Division of Labor

| Library | Role | Purpose |
|---------|------|---------|
| shadcn/ui | Structural foundation | Accessible, Radix-based primitives (Card, Button, Dialog) |
| Magic UI | Visual effects | Animated decorations (particles, beams, glowing cards) |
| Framer Motion | Animation engine | Orchestration, gestures, scroll-triggered animations |

### Integration Pattern

1. **shadcn/ui** provides the semantic HTML structure and accessibility
2. **Magic UI** wraps or enhances with animated visual effects
3. **Framer Motion** controls animation timing, sequencing, and interaction

### No Overlap Justification

- shadcn/ui: No animated effects, focused on accessibility and structure
- Magic UI: No structural primitives, focused on visual decoration
- Framer Motion: Not a UI library, pure animation orchestration
- Total: 3 libraries with distinct, non-overlapping responsibilities

---

## Dependency Management Strategy

### Production Dependencies (`dependencies`)

These are bundled with the application and required at runtime:

| Package | Purpose |
|---------|---------|
| next | Framework (App Router, Turbopack) |
| react, react-dom | UI library (bundled with Next.js) |
| framer-motion | Animation engine |
| lucide-react | Icon library |
| next-themes | Dark/light mode management |
| @radix-ui/* | shadcn/ui primitives (auto-installed) |
| magicui/* | Magic UI components (auto-installed) |

### Dev Dependencies (`devDependencies`)

These are only used during development and build:

| Package | Purpose |
|---------|---------|
| typescript | Type checking |
| tailwindcss | Styling (bundled with Next.js, but listed as devDep) |
| eslint, eslint-config-next | Linting |
| prettier | Code formatting |
| eslint-config-prettier | ESLint + Prettier integration |
| husky | Git hooks manager |
| lint-staged | Run linters on staged files |

### Code Quality Enforcement

**Pre-commit Hook Workflow**:
1. Developer stages files with `git add`
2. Developer runs `git commit`
3. Husky triggers pre-commit hook
4. lint-staged runs on staged files only:
   - `*.{ts,tsx,js,jsx}` → ESLint (fix) + Prettier (write)
   - `*.{css,json,md}` → Prettier (write)
5. If linting fails, commit is blocked
6. If linting passes, commit proceeds

**Benefits**:
- Consistent code style across all commits
- No manual lint step required
- Catches errors before they reach CI/CD
- Fast feedback loop (only lints changed files)

---

## Open Decisions

| Decision | Options | Recommendation | Status |
|----------|---------|----------------|--------|
| Wow factor component | Magic UI Particles, OrbitingCircles, AnimatedBeam, or data stream | OrbitingCircles for tech stack + Particles for hero | Deferred to implementation |
| Hero background | Particles, AnimatedGrid, NoiseTexture, or data stream | Particles (lightweight, impressive) | Deferred to implementation |
| Navigation style | Dock (floating) or traditional navbar | Dock (modern, matches portfolio aesthetic) | Deferred to implementation |
