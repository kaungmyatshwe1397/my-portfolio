// GitHub section with Bento Grid layout — projects, stats, contribution graph, recent activity

"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedList } from "@/components/ui/animated-list";
import { BorderBeam } from "@/components/ui/border-beam";
import { GlareHover } from "@/components/ui/glare-hover";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from "@/components/ui/terminal";
import {
  Star,
  GitFork,
  Users,
  GitCommit,
  ExternalLink,
  FolderOpen,
  Activity,
  Clock,
  BarChart3,
  Code2,
} from "lucide-react";
import { githubFallback, technologies } from "@/lib/seed-data";
import type {
  GitHubProfile,
  GitHubRepo,
  GitHubEvent,
  ContributionCalendar,
  ProjectRepo,
} from "@/lib/types";
import {
  fetchGitHubProfile,
  fetchGitHubRepos,
  fetchGitHubEvents,
  calculateTotalStars,
  getRelativeTime,
} from "@/lib/github";

// Wrapper that force-remounts children on each re-entry into the viewport,
// resetting all internal state so animations replay from scratch.
function ScrollRepeat({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });
  const wasInView = useRef(false);
  const reEntryCount = useRef(0);

  if (isInView && !wasInView.current) {
    reEntryCount.current += 1;
  }
  wasInView.current = isInView;

  return (
    <div ref={ref} className="contents">
      <div key={reEntryCount.current} className="contents">
        {children}
      </div>
    </div>
  );
}

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
  return data.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level:
        day.contributionCount === 0
          ? 0
          : day.contributionCount <= 3
            ? 1
            : day.contributionCount <= 6
              ? 2
              : day.contributionCount <= 9
                ? 3
                : 4,
    })),
  );
}

// Format relative time for display
function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

// Single pinned project row
function ProjectRow({ project }: { project: ProjectRepo }) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{project.title}</p>
        <p className="text-xs text-muted-foreground truncate">
          {project.description}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {project.stars > 0 && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3 text-yellow-500" />
            {project.stars}
          </span>
        )}
        {project.language && (
          <Badge variant="outline" className="text-[10px] px-1 py-0">
            {project.language}
          </Badge>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded hover:bg-muted transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
          </a>
        )}
      </div>
    </div>
  );
}

// Stat card with effects
function StatCard({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <GlareHover
      className="rounded-xl"
      duration={600}
      color="#ffffff"
      opacity={0.12}
    >
      <Card className="glass-card p-4 text-center relative overflow-hidden h-full">
        <BorderBeam duration={5} size={50} />
        <Icon className={`w-6 h-6 mx-auto mb-1 ${color}`} />
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </Card>
    </GlareHover>
  );
}

// Loading skeleton
function BentoSkeleton() {
  return (
    <BentoGrid className="lg:grid-rows-2">
      {[...Array(4)].map((_, i) => (
        <Card
          key={i}
          className="col-span-3 lg:col-span-1 glass-card p-6 animate-pulse"
        >
          <div className="h-4 w-24 bg-muted rounded mb-4" />
          <div className="h-3 w-full bg-muted rounded mb-2" />
          <div className="h-3 w-3/4 bg-muted rounded" />
        </Card>
      ))}
    </BentoGrid>
  );
}

// Main bento component
export function GitHubBento({
  contributions,
  pinnedRepos,
}: {
  contributions: ContributionCalendar | null;
  pinnedRepos: ProjectRepo[];
}) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

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
        setProfile(githubFallback as GitHubProfile);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <BentoSkeleton />;

  const totalStars = calculateTotalStars(repos);
  const contributionData = contributions
    ? transformContributions(contributions)
    : [];

  return (
    <BentoGrid className="lg:grid-rows-2">
      {/* ── Contribution Graph (top-left, spans 1 col, 1 row) ── */}
      <div className="col-span-3 lg:col-span-1 row-span-1 group relative flex flex-col overflow-hidden rounded-xl bg-background dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
        <BorderBeam duration={8} size={100} />
        <div className="p-4 flex items-center gap-2 border-b border-border/50">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold">Contribution Graph</h3>
        </div>
        <div className="flex-1 p-4 overflow-x-auto">
          {contributionData.length > 0 ? (
            <ActivityCalendar
              data={contributionData}
              theme={{
                light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
              }}
              colorScheme="dark"
              blockSize={11}
              blockMargin={2}
              fontSize={10}
              showColorLegend={false}
              showMonthLabels
              showTotalCount={false}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No contribution data available
            </p>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
      </div>

      {/* ── Stats (top-middle, spans 1 col, 1 row) ── */}
      <div className="col-span-3 lg:col-span-1 row-span-1 group relative flex flex-col overflow-hidden rounded-xl bg-background dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
        <div className="p-4 flex items-center gap-2 border-b border-border/50">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold">GitHub Stats</h3>
        </div>
        <div className="flex-1 p-4 grid grid-cols-2 gap-3">
          <StatCard
            icon={Users}
            value={profile?.followers || 0}
            label="Followers"
            color="text-primary"
          />
          <StatCard
            icon={GitFork}
            value={profile?.public_repos || 0}
            label="Repos"
            color="text-primary"
          />
          <StatCard
            icon={Star}
            value={totalStars}
            label="Stars"
            color="text-yellow-500"
          />
          <StatCard
            icon={GitCommit}
            value={contributions?.totalContributions || 0}
            label="Contributions"
            color="text-green-500"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
      </div>

      {/* ── Projects (top-right, spans 1 col, 1 row) ── */}
      <div className="col-span-3 lg:col-span-1 row-span-1 group relative flex flex-col overflow-hidden rounded-xl bg-background dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
        <div className="p-4 flex items-center gap-2 border-b border-border/50">
          <FolderOpen className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold">Pinned Projects</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <ScrollRepeat>
            <AnimatedList delay={800} className="gap-2">
              {pinnedRepos.map((repo) => (
                <div key={repo.id}>
                  <ProjectRow project={repo} />
                </div>
              ))}
            </AnimatedList>
          </ScrollRepeat>
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
      </div>

      {/* ── Tech Tags (bottom-left, spans 1 col, 1 row) ── */}
      <div className="col-span-3 lg:col-span-1 row-span-1 group relative flex flex-col overflow-hidden rounded-xl bg-background dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
        <div className="p-4 flex items-center gap-2 border-b border-border/50">
          <Code2 className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold">Tech Stack</h3>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-border/50 bg-background/50 hover:bg-background/80 transition-colors"
                style={{ borderLeftColor: tech.color, borderLeftWidth: 3 }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: tech.color }}
                />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
      </div>

      {/* ── Recent Activity (bottom-right, spans 2 cols, 1 row) ── */}
      <div className="col-span-3 lg:col-span-2 row-span-1 group relative flex flex-col overflow-hidden rounded-xl bg-background dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]">
        <div className="p-4 flex items-center gap-2 border-b border-border/50">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold">Recent Activity</h3>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {events.length > 0 ? (
            <ScrollRepeat>
              <Terminal className="max-w-full w-full" sequence>
                {events.slice(0, 5).flatMap((event) => {
                  const cmd = getTerminalCommand(event.type);
                  const time = getRelativeTime(event.created_at);
                  const repo =
                    event.repo.name.split("/").pop() || event.repo.name;
                  return [
                    <TypingAnimation
                      key={`${event.id}-cmd`}
                      className="text-emerald-400 font-mono"
                    >
                      {`$ ${cmd} ${repo}`}
                    </TypingAnimation>,
                    <AnimatedSpan
                      key={`${event.id}-out`}
                      className="text-slate-400 text-xs pl-4"
                    >
                      ✔ {event.repo.name} — {time}
                    </AnimatedSpan>,
                  ];
                })}
              </Terminal>
            </ScrollRepeat>
          ) : (
            <p className="text-sm text-muted-foreground">No recent activity</p>
          )}
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/3 group-hover:dark:bg-neutral-800/10" />
      </div>
    </BentoGrid>
  );
}
