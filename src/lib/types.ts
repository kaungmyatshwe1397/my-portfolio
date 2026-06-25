// TypeScript interfaces for the Developer Portfolio

// Developer profile information (seed data)
export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  location?: string;
  resumeUrl?: string;
  social: SocialLinks;
}

// Social media links
export interface SocialLinks {
  github: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

// Technology stack item (seed data)
export interface Technology {
  name: string;
  icon: string;
  category: TechCategory;
  proficiency?: number; // 1-5
  color?: string; // Brand color hex
}

// Technology categories
export type TechCategory =
  | "language"
  | "framework"
  | "tool"
  | "database"
  | "cloud"
  | "design";

// GitHub user profile (API data)
export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
}

// GitHub repository (API data)
export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  language: string;
  topics: string[];
  fork: boolean;
  updated_at: string;
}

// GitHub event (API data)
export interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
  payload: Record<string, unknown>;
}

// Pinned repository from GitHub GraphQL API
export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string } | null;
  repositoryTopics: {
    nodes: { topic: { name: string } }[];
  } | null;
  updatedAt: string;
}

// GitHub contribution graph data (from GraphQL API)
export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  firstDay: string;
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

// Enriched project repo for display (derived from GitHubRepo or seed Project)
export interface ProjectRepo {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
  sortOrder: number;
  stars: number;
  forks: number;
  language?: string;
  updatedAt: string;
}
