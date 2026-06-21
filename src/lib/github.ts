// GitHub API client with caching and fallback

import type { GitHubProfile, GitHubRepo, GitHubEvent } from "./types";
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
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
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

// Get top repositories by stars
export function getTopRepos(repos: GitHubRepo[], count: number = 5): GitHubRepo[] {
  return [...repos]
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, count);
}

// Format event type for display
export function formatEventType(type: string): string {
  const eventMap: Record<string, string> = {
    PushEvent: "Pushed to",
    CreateEvent: "Created",
    PullRequestEvent: "PR in",
    IssuesEvent: "Issue in",
    ForkEvent: "Forked",
    WatchEvent: "Starred",
  };
  return eventMap[type] || type;
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
