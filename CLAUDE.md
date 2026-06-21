# CLAUDE.md — Developer Portfolio Project

## Project Overview

A modern, mobile-first developer portfolio website built with Next.js 16, shadcn/ui, Magic UI, Framer Motion, and Tailwind CSS. Features glassmorphism design, real-time GitHub data, spatial animations, and dark/light theme toggle.

## Tech Stack

- **Framework**: Next.js 16.2.9 (App Router, Turbopack)
- **Language**: TypeScript 5.1+
- **Styling**: Tailwind CSS v4
- **UI Libraries**: shadcn/ui (structural) + Magic UI (animated effects)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Themes**: next-themes (dark/light toggle)
- **API**: GitHub REST API v3

## Key Commands

```bash
# Development
npm run dev              # Start dev server (Turbopack)

# Build & Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Run Prettier

# shadcn/ui
npx shadcn@latest add <component>  # Add shadcn component

# Magic UI
npx magicui@latest add <component>  # Add Magic UI component
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + ThemeProvider
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles + glassmorphism
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── magicui/            # Magic UI components
│   ├── hero.tsx            # Hero section
│   ├── projects.tsx        # Project showcase
│   ├── github-stats.tsx    # GitHub data display
│   ├── tech-stack.tsx      # Tech stack visualization
│   ├── contact.tsx         # Contact section
│   ├── navbar.tsx          # Navigation (Dock)
│   └── footer.tsx          # Footer
├── lib/
│   ├── github.ts           # GitHub API client
│   ├── seed-data.ts        # Static fallback data
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Utility functions
├── hooks/
│   └── use-github.ts       # GitHub data hook
└── public/
    └── images/             # Static assets
```

## Environment Variables

```env
GITHUB_USERNAME=<github-username>     # Required
GITHUB_TOKEN=<personal-access-token>  # Optional (5k req/hr vs 60)
```

## Development Workflow

1. **Pre-commit hooks**: Husky + lint-staged auto-run ESLint + Prettier on staged files
2. **No tests**: Per constitution — manual verification only
3. **Clean code**: Descriptive names, plain-language comments on every function
4. **Minimal code**: Fewest lines practical, no over-engineering

## Design Principles

- **Glassmorphism**: backdrop-filter blur, subtle borders, transparency
- **Mobile-first**: 320px minimum width, responsive to 4K
- **Dark mode primary**: Light mode as alternate with adapted styling
- **60fps animations**: Framer Motion for scroll/hover/parallax effects
- **WCAG 2.1 AA**: Semantic HTML, ARIA labels, 4.5:1 contrast

## Spec-Driven Development

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at `specs/001-developer-portfolio/plan.md`
<!-- SPECKIT END -->

### Feature Specs

- **Spec**: `specs/001-developer-portfolio/spec.md`
- **Plan**: `specs/001-developer-portfolio/plan.md`
- **Tasks**: `specs/001-developer-portfolio/tasks.md`
- **Data Model**: `specs/001-developer-portfolio/data-model.md`
- **Research**: `specs/001-developer-portfolio/research.md`
- **Quickstart**: `specs/001-developer-portfolio/quickstart.md`

## Common Patterns

### Adding a New Component

1. Create file in `src/components/`
2. Use shadcn/ui for structure (Card, Badge, etc.)
3. Add Magic UI effects (particles, shimmer, etc.)
4. Wrap with Framer Motion for animations
5. Export and integrate in `page.tsx`

### GitHub API Usage

```typescript
import { fetchGitHubProfile, fetchGitHubRepos } from "@/lib/github";

// Server Component: fetch with ISR
const profile = await fetchGitHubProfile();

// Client Component: use hook
const { profile, repos, loading, error } = useGitHub();
```

### Theme-Aware Styling

```tsx
import { useTheme } from "next-themes";

// Dark mode: full glassmorphism
// Light mode: adapted styling with reduced blur
```

## Deployment

- **Vercel**: `npx vercel` (recommended)
- **Netlify**: Use Next.js runtime
- **Cloudflare Pages**: Use adapter

## Notes for Claude

- Always check `specs/001-developer-portfolio/tasks.md` for current task list
- Follow task order: Setup → Foundational → US1 → US2 → US3 → US4 → US5 → Polish
- Mark tasks complete in tasks.md as you finish them
- Use `npm install --save-dev` for dev tools, `npm install` for production deps
- Commit after each task or logical group
- No test files — constitution principle IV
