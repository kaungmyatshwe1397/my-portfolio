// GitHub stats section with profile info, contribution graph, and activity

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { Star, GitFork, Users, GitCommit } from "lucide-react";
import { githubFallback } from "@/lib/seed-data";
import type { GitHubProfile, GitHubRepo, GitHubEvent, ContributionCalendar } from "@/lib/types";
import {
  fetchGitHubProfile,
  fetchGitHubRepos,
  fetchGitHubEvents,
  calculateTotalStars,
  getRelativeTime,
} from "@/lib/github";

// Map GitHub event types to terminal-style git commands
function getTerminalCommand(eventType: string): string {
  switch (eventType) {
    case "PushEvent":
      return "git push";
    case "CreateEvent":
      return "git init";
    case "PullRequestEvent":
      return "gh pr create";
    case "IssuesEvent":
      return "gh issue open";
    case "ForkEvent":
      return "gh repo fork";
    case "WatchEvent":
      return "gh repo star";
    default:
      return "git activity";
  }
}

// Transform GitHub API contribution data into react-activity-calendar format
function transformContributions(data: ContributionCalendar) {
  const levels = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
  return data.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: day.contributionCount === 0 ? 0
        : day.contributionCount <= 3 ? 1
        : day.contributionCount <= 6 ? 2
        : day.contributionCount <= 9 ? 3
        : 4,
    }))
  );
}

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
export function GitHubStats({ contributions }: { contributions: ContributionCalendar | null }) {
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
  const contributionData = contributions ? transformContributions(contributions) : [];

  return (
    <div className="space-y-10">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, value: profile?.followers || 0, label: "Followers", color: "text-primary", delay: 0.1 },
          { icon: GitFork, value: profile?.public_repos || 0, label: "Repositories", color: "text-primary", delay: 0.2 },
          { icon: Star, value: totalStars, label: "Total Stars", color: "text-yellow-500", delay: 0.3 },
          { icon: GitCommit, value: contributions?.totalContributions || 0, label: "Contributions", color: "text-green-500", delay: 0.4 },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: stat.delay }}
          >
            <Card className="glass-card p-6 text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Contribution Graph & Recent Activity side by side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Contribution Graph — takes more space */}
        {contributionData.length > 0 && (
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-card p-6 h-full">
              <h3 className="text-xl font-semibold mb-4">Contribution Graph</h3>
              <div className="overflow-x-auto">
                <ActivityCalendar
                  data={contributionData}
                  theme={{
                    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                  }}
                  colorScheme="dark"
                  blockSize={13}
                  blockMargin={3}
                  fontSize={12}
                  showColorLegend
                  showMonthLabels
                  showTotalCount={false}
                />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Recent Activity — takes less space */}
        {events.length > 0 && (
          <motion.div
            className={contributionData.length > 0 ? "lg:col-span-2" : "lg:col-span-5"}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <Terminal className="max-w-full w-full" sequence>
              {events.slice(0, 5).flatMap((event) => {
                const cmd = getTerminalCommand(event.type);
                const time = getRelativeTime(event.created_at);
                const repo = event.repo.name.split("/").pop() || event.repo.name;
                return [
                  <TypingAnimation key={`${event.id}-cmd`} className="text-emerald-400 font-mono">
                    {`$ ${cmd} ${repo}`}
                  </TypingAnimation>,
                  <AnimatedSpan key={`${event.id}-out`} className="text-slate-400 text-xs pl-4">
                    ✔ {event.repo.name} — {time}
                  </AnimatedSpan>,
                ];
              })}
            </Terminal>
          </motion.div>
        )}
      </div>

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
