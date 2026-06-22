// GitHub API client with caching and fallback

import type { GitHubProfile, GitHubRepo, GitHubEvent, ProjectRepo, ContributionCalendar, PinnedRepo } from "./types";
import { githubFallback } from "./seed-data";

// GitHub API base URL
const GITHUB_API = "https://api.github.com";

// Get GitHub username from environment
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "kaungmyatshwe1397";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Request headers with optional auth
const headers: HeadersInit = GITHUB_TOKEN
  ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
  : {};

// Fetch GitHub profile with fallback
export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      console.warn("GitHub API error, using fallback data");
      return githubFallback as GitHubProfile;
    }

    return response.json();
  } catch (error) {
    console.warn("Failed to fetch GitHub profile:", error);
    return githubFallback as GitHubProfile;
  }
}

// Fetch GitHub repositories with fallback
export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      console.warn("GitHub API error for repos");
      return [];
    }

    return response.json();
  } catch (error) {
    console.warn("Failed to fetch GitHub repos:", error);
    return [];
  }
}

// Convert GitHubRepo to display-friendly ProjectRepo
export function repoToProject(repo: GitHubRepo): ProjectRepo {
  // Humanize repo name: "my-portfolio" → "My Portfolio"
  const title = repo.name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Build tags from language + topics
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language);
  if (repo.topics) tags.push(...repo.topics);

  return {
    id: String(repo.id),
    title,
    description: repo.description || "No description provided.",
    tags,
    liveUrl: repo.homepage || undefined,
    sourceUrl: repo.html_url,
    featured: repo.stargazers_count > 0,
    sortOrder: new Date(repo.updated_at).getTime(),
    stars: repo.stargazers_count,
    forks: 0, // not available in list endpoint
    language: repo.language || undefined,
    updatedAt: repo.updated_at,
  };
}

// Fetch GitHub recent events with fallback
export async function fetchGitHubEvents(): Promise<GitHubEvent[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=10`,
      { headers, next: { revalidate: 1800 } } // Revalidate every 30 min
    );

    if (!response.ok) {
      console.warn("GitHub API error for events");
      return [];
    }

    return response.json();
  } catch (error) {
    console.warn("Failed to fetch GitHub events:", error);
    return [];
  }
}

// Calculate total stars across all repos
export function calculateTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}

// Get relative time string (e.g., "2 hours ago")
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

// Fetch pinned repositories via GraphQL API
export async function fetchPinnedRepos(): Promise<ProjectRepo[]> {
  if (!GITHUB_TOKEN) {
    console.warn("No GITHUB_TOKEN set, cannot fetch pinned repos");
    return [];
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          user(login: "${GITHUB_USERNAME}") {
            pinnedItems(first: 6) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  homepageUrl
                  stargazerCount
                  forkCount
                  primaryLanguage { name }
                  repositoryTopics(first: 10) { nodes { topic { name } } }
                  updatedAt
                }
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn("GitHub GraphQL API error for pinned repos:", response.status);
      return [];
    }

    const data = await response.json();
    const nodes = data?.data?.user?.pinnedItems?.nodes ?? [];

    return nodes.map((repo: PinnedRepo) => {
      const title = repo.name
        .split(/[-_]/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

      const tags: string[] = [];
      if (repo.primaryLanguage?.name) tags.push(repo.primaryLanguage.name);
      if (repo.repositoryTopics?.nodes) {
        tags.push(...repo.repositoryTopics.nodes.map((t) => t.topic.name));
      }

      return {
        id: repo.name,
        title,
        description: repo.description || "No description provided.",
        tags,
        liveUrl: repo.homepageUrl || undefined,
        sourceUrl: repo.url,
        featured: repo.stargazerCount > 0,
        sortOrder: new Date(repo.updatedAt).getTime(),
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.primaryLanguage?.name || undefined,
        updatedAt: repo.updatedAt,
      };
    });
  } catch (error) {
    console.warn("Failed to fetch pinned repos:", error);
    return [];
  }
}

// Fetch GitHub contribution calendar via GraphQL API
export async function fetchGitHubContributions(): Promise<ContributionCalendar | null> {
  if (!GITHUB_TOKEN) {
    console.warn("No GITHUB_TOKEN set, cannot fetch contributions");
    return null;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  firstDay
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }`,
      }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.warn("GitHub GraphQL API error:", response.status);
      return null;
    }

    const data = await response.json();
    return data?.data?.user?.contributionsCollection?.contributionCalendar ?? null;
  } catch (error) {
    console.warn("Failed to fetch GitHub contributions:", error);
    return null;
  }
}
