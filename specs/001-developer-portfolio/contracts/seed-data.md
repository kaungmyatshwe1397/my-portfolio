# Seed Data Contract

**Feature**: 001-developer-portfolio
**Date**: 2026-06-22

## Overview

Seed data provides static fallback content and initial portfolio information. It is stored as typed TypeScript constants in `src/lib/seed-data.ts`. This data is used for:

1. Profile, projects, and tech stack display (always)
2. GitHub data fallback when API is unavailable

## Exported Constants

### `profile: Profile`

Developer's personal information and social links.

```typescript
export const profile: Profile = {
  name: "Kaung Myat Shwe",
  title: "Full Stack Developer",
  bio: "Passionate about building modern web applications...",
  avatar: "/images/avatar.jpg",
  email: "kaungmyatshwe@example.com",
  location: "Myanmar",
  social: {
    github: "https://github.com/kaung-myat-shwe",
    linkedin: "https://linkedin.com/in/kaungmyatshwe",
    twitter: "https://twitter.com/kaungmyatshwe",
  },
};
```

---

### `projects: Project[]`

Array of portfolio projects, sorted by `sortOrder`.

```typescript
export const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Modern developer portfolio with glassmorphism UI",
    thumbnail: "/images/projects/portfolio.jpg",
    tags: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    liveUrl: "https://kaungmyatshwe.dev",
    sourceUrl: "https://github.com/kaung-myat-shwe/portfolio",
    featured: true,
    sortOrder: 1,
  },
  // ... more projects
];
```

---

### `technologies: Technology[]`

Array of tech stack items grouped by category.

```typescript
export const technologies: Technology[] = [
  { name: "TypeScript", icon: "FileCode", category: "language", proficiency: 5 },
  { name: "React", icon: "Atom", category: "framework", proficiency: 5 },
  { name: "Next.js", icon: "Layers", category: "framework", proficiency: 5 },
  { name: "Tailwind CSS", icon: "Paintbrush", category: "framework", proficiency: 4 },
  { name: "Node.js", icon: "Server", category: "framework", proficiency: 4 },
  { name: "PostgreSQL", icon: "Database", category: "database", proficiency: 3 },
  // ... more technologies
];
```

---

### `githubFallback: GitHubProfile`

Fallback GitHub profile data when API is unavailable.

```typescript
export const githubFallback: GitHubProfile = {
  login: "kaung-myat-shwe",
  name: "Kaung Myat Shwe",
  avatar_url: "/images/avatar.jpg",
  bio: "Full Stack Developer",
  public_repos: 0,
  followers: 0,
  following: 0,
  html_url: "https://github.com/kaung-myat-shwe",
  created_at: "2024-01-01T00:00:00Z",
};
```

---

## Usage Pattern

```typescript
import { profile, projects, technologies } from "@/lib/seed-data";

// Always use seed data for profile/projects/tech stack
// Use GitHub API for real-time data, fall back to githubFallback on error
```

## Customization

The developer updates `seed-data.ts` directly to:
- Add/remove projects
- Update profile information
- Modify tech stack
- Change display order
