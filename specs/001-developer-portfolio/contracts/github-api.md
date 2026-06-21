# GitHub API Contract

**Feature**: 001-developer-portfolio
**Date**: 2026-06-22

## Overview

The portfolio consumes GitHub's public REST API v3 to display real-time developer statistics and activity. No authentication is required for public data, but a Personal Access Token (PAT) increases rate limits from 60 to 5,000 requests/hour.

## Endpoints Used

### 1. Get User Profile

```
GET https://api.github.com/users/{username}
```

**Purpose**: Fetch developer's public profile information.

**Response (200 OK)**:
```json
{
  "login": "octocat",
  "name": "The Octocat",
  "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
  "bio": "GitHub mascot",
  "public_repos": 8,
  "followers": 1000,
  "following": 10,
  "html_url": "https://github.com/octocat",
  "created_at": "2011-01-25T18:44:36Z"
}
```

**Rate Limit**: 60/hr (unauthenticated), 5,000/hr (with PAT)

---

### 2. List User Repositories

```
GET https://api.github.com/users/{username}/repos?sort=updated&per_page=10
```

**Purpose**: Fetch developer's most recently updated repositories.

**Query Parameters**:
- `sort` — `updated` (default), `created`, `pushed`, `full_name`
- `per_page` — Number of results (max 100, we use 10)
- `type` — `owner` (default), `all`, `member`

**Response (200 OK)**:
```json
[
  {
    "id": 1296269,
    "name": "Hello-World",
    "description": "This your first repo!",
    "html_url": "https://github.com/octocat/Hello-World",
    "homepage": "https://github.com",
    "stargazers_count": 80,
    "language": "JavaScript",
    "topics": ["react", "nextjs"],
    "fork": false,
    "updated_at": "2026-06-20T12:00:00Z"
  }
]
```

---

### 3. List Public Events

```
GET https://api.github.com/users/{username}/events/public?per_page=10
```

**Purpose**: Fetch developer's most recent public activity.

**Response (200 OK)**:
```json
[
  {
    "id": "1234567890",
    "type": "PushEvent",
    "repo": {
      "name": "octocat/Hello-World"
    },
    "created_at": "2026-06-20T12:00:00Z",
    "payload": {
      "push_id": 123,
      "size": 1
    }
  }
]
```

---

## Error Handling

| Status | Scenario | Fallback |
|--------|----------|----------|
| 200 | Success | Use response data |
| 403 | Rate limited | Show seed data fallback + "last updated" timestamp |
| 404 | User not found | Show error message + link to GitHub |
| 5xx | Server error | Show seed data fallback + retry button |
| Network | Offline/timeout | Show seed data fallback |

## Headers to Read

| Header | Purpose |
|--------|---------|
| `X-RateLimit-Remaining` | Monitor remaining requests |
| `X-RateLimit-Reset` | When rate limit resets (Unix timestamp) |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_USERNAME` | Yes | Developer's GitHub username |
| `GITHUB_TOKEN` | No | Personal Access Token for higher rate limits |
