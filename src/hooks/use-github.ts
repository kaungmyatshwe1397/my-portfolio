// Custom hook for fetching GitHub data with loading and error states

"use client";

import { useState, useEffect } from "react";
import type { GitHubProfile, GitHubRepo, GitHubEvent, GitHubData } from "@/lib/types";

// Hook to fetch all GitHub data
export function useGitHub(): GitHubData {
  const [data, setData] = useState<GitHubData>({
    profile: null,
    repos: [],
    events: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchAllData() {
      try {
        setData((prev) => ({ ...prev, loading: true, error: null }));

        // Fetch all data in parallel
        const [profileRes, reposRes, eventsRes] = await Promise.allSettled([
          fetch("/api/github/profile"),
          fetch("/api/github/repos"),
          fetch("/api/github/events"),
        ]);

        // Process profile
        let profile: GitHubProfile | null = null;
        if (profileRes.status === "fulfilled" && profileRes.value.ok) {
          profile = await profileRes.value.json();
        }

        // Process repos
        let repos: GitHubRepo[] = [];
        if (reposRes.status === "fulfilled" && reposRes.value.ok) {
          repos = await reposRes.value.json();
        }

        // Process events
        let events: GitHubEvent[] = [];
        if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
          events = await eventsRes.value.json();
        }

        setData({
          profile,
          repos,
          events,
          loading: false,
          error: null,
        });
      } catch (error) {
        setData((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Failed to fetch GitHub data",
        }));
      }
    }

    fetchAllData();
  }, []);

  return data;
}

// Hook to fetch only GitHub profile
export function useGitHubProfile() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const res = await fetch("/api/github/profile");
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, loading, error };
}
