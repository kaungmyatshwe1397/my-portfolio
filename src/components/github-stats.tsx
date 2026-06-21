// GitHub stats section with profile info, repos, and activity

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { GitBranch, Star, GitFork, Users, ExternalLink } from "lucide-react";
import { githubFallback } from "@/lib/seed-data";
import type { GitHubProfile, GitHubRepo, GitHubEvent } from "@/lib/types";
import {
  fetchGitHubProfile,
  fetchGitHubRepos,
  fetchGitHubEvents,
  calculateTotalStars,
  getTopRepos,
  formatEventType,
  getRelativeTime,
} from "@/lib/github";

// Loading skeleton for GitHub stats
function GitHubSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="glass-card p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
      ))}
    </div>
  );
}

// GitHub stats section component
export function GitHubStats() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, reposData, eventsData] = await Promise.all([
          fetchGitHubProfile(),
          fetchGitHubRepos(),
          fetchGitHubEvents(),
        ]);

        setProfile(profileData);
        setRepos(reposData);
        setEvents(eventsData);
      } catch (err) {
        console.error("Failed to load GitHub data:", err);
        setError(true);
        setProfile(githubFallback as GitHubProfile);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return <GitHubSkeleton />;
  }

  const totalStars = calculateTotalStars(repos);
  const topRepos = getTopRepos(repos, 5);

  return (
    <div className="space-y-8">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold">{profile?.followers || 0}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card p-6 text-center">
            <GitFork className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p className="text-3xl font-bold">{profile?.public_repos || 0}</p>
            <p className="text-sm text-muted-foreground">Repositories</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-3xl font-bold">{totalStars}</p>
            <p className="text-sm text-muted-foreground">Total Stars</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card p-6 text-center">
            <GitFork className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-3xl font-bold">{topRepos.length}</p>
            <p className="text-sm text-muted-foreground">Top Repos</p>
          </Card>
        </motion.div>
      </div>

      {/* Top Repositories */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold mb-4">Top Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topRepos.map((repo) => (
            <Card key={repo.id} className="glass-card p-4 hover:bg-background/80 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary transition-colors flex items-center gap-2"
                >
                  {repo.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {repo.stargazers_count}
                  </span>
                </div>
              </div>
              {repo.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {repo.description}
                </p>
              )}
              {repo.language && (
                <Badge variant="outline" className="mt-2 text-xs">
                  {repo.language}
                </Badge>
              )}
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      {events.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {events.slice(0, 5).map((event) => (
              <Card key={event.id} className="glass-card p-3 flex items-center gap-3">
                <Badge variant="secondary" className="shrink-0">
                  {formatEventType(event.type)}
                </Badge>
                <span className="text-sm truncate">{event.repo.name}</span>
                <span className="text-xs text-muted-foreground ml-auto shrink-0">
                  {getRelativeTime(event.created_at)}
                </span>
              </Card>
            ))}
          </div>
        </motion.div>
      )}

      {/* Error fallback */}
      {error && (
        <Card className="glass-card p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Unable to load live GitHub data
          </p>
          <a
            href={profile?.html_url || "https://github.com/kaung-myat-shwe"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View GitHub Profile →
          </a>
        </Card>
      )}
    </div>
  );
}
