# Data Model: Developer Portfolio

**Feature**: 001-developer-portfolio
**Date**: 2026-06-22

## Overview

This portfolio uses no database. Data comes from two sources:
1. **Seed data** — hardcoded TypeScript files for profile, projects, and tech stack
2. **GitHub API** — real-time fetched data for GitHub stats and activity

---

## Entities

### Profile (Seed Data)

The developer's identity and contact information.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Full display name |
| title | string | Yes | Professional title (e.g., "Full Stack Developer") |
| bio | string | Yes | Short biography (2-3 sentences) |
| avatar | string | Yes | Path to avatar image |
| email | string | Yes | Contact email address |
| location | string | No | City/country |
| resumeUrl | string | No | Link to resume/CV |
| social | SocialLinks | Yes | Social media profiles |

**SocialLinks**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| github | string | Yes | GitHub profile URL |
| linkedin | string | No | LinkedIn profile URL |
| twitter | string | No | Twitter/X profile URL |
| website | string | No | Personal website URL |

---

### Project (Seed Data)

Individual portfolio project entries.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | Unique identifier (slug) |
| title | string | Yes | Project name |
| description | string | Yes | Short description (1-2 sentences) |
| longDescription | string | No | Detailed description |
| thumbnail | string | Yes | Path to project screenshot/image |
| tags | string[] | Yes | Technology tags (e.g., ["React", "Node.js"]) |
| liveUrl | string | No | Live demo URL |
| sourceUrl | string | No | GitHub repository URL |
| featured | boolean | Yes | Show in featured section |
| sortOrder | number | Yes | Display order (lower = first) |

---

### Technology (Seed Data)

Tech stack items for the skills section.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Technology name |
| icon | string | Yes | Icon identifier (Lucide icon name or custom) |
| category | TechCategory | Yes | Classification |
| proficiency | number (1-5) | No | Skill level (optional, for visualization) |

**TechCategory** (enum):
- `language` — Programming languages
- `framework` — Frameworks and libraries
- `tool` — Development tools
- `database` — Data storage
- `cloud` — Cloud services
- `design` — Design tools

---

### GitHubProfile (API Data)

Real-time GitHub user data fetched from `GET /users/{username}`.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| login | string | API | GitHub username |
| name | string | API | Display name |
| avatar_url | string | API | Profile picture URL |
| bio | string | API | GitHub bio |
| public_repos | number | API | Public repository count |
| followers | number | API | Follower count |
| following | number | API | Following count |
| html_url | string | API | Profile URL |
| created_at | string | API | Account creation date |

---

### GitHubRepo (API Data)

Repository data fetched from `GET /users/{username}/repos`.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| id | number | API | Repository ID |
| name | string | API | Repository name |
| description | string | API | Repository description |
| html_url | string | API | Repository URL |
| homepage | string | API | Live demo URL |
| stargazers_count | number | API | Star count |
| language | string | API | Primary language |
| topics | string[] | API | Repository topics |
| fork | boolean | API | Is a fork |
| updated_at | string | API | Last update timestamp |

---

### GitHubEvent (API Data)

Recent public activity from `GET /users/{username}/events/public`.

| Field | Type | Source | Description |
|-------|------|--------|-------------|
| id | string | API | Event ID |
| type | string | API | Event type (PushEvent, CreateEvent, etc.) |
| repo.name | string | API | Repository name |
| created_at | string | API | Event timestamp |
| payload | object | API | Event-specific data |

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Page Load                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Server Component (Next.js)                                 │
│  ┌──────────────┐    ┌──────────────┐                       │
│  │  Seed Data   │    │  GitHub API  │                       │
│  │  (instant)   │    │  (async)     │                       │
│  └──────────────┘    └──────────────┘                       │
│         │                    │                               │
│         ▼                    ▼                               │
│  ┌──────────────┐    ┌──────────────┐                       │
│  │ Profile      │    │ GitHubStats  │                       │
│  │ Projects     │    │ Repos        │                       │
│  │ TechStack    │    │ Activity     │                       │
│  └──────────────┘    └──────────────┘                       │
│         │                    │                               │
│         ▼                    ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Client Components                       │   │
│  │  (animations, interactivity, glassmorphism)          │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Caching Strategy

| Data Source | Cache Strategy | TTL |
|-------------|---------------|-----|
| Seed data | Static import (no cache needed) | N/A |
| GitHub Profile | ISR (revalidate) | 1 hour |
| GitHub Repos | ISR (revalidate) | 1 hour |
| GitHub Events | ISR (revalidate) | 30 minutes |

When GitHub API fails, fallback to seed data or last-known-good values.
