// GitHub section — OS Desktop layout with widgets, folders, terminal

"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
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
  Folder,
  FolderGit2,
  Clock,
  BarChart3,
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

// ── Helpers ──

function ScrollRepeat({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });
  const wasInView = useRef(false);
  const reEntryCount = useRef(0);
  if (isInView && !wasInView.current) reEntryCount.current += 1;
  wasInView.current = isInView;
  return (
    <div ref={ref} className="contents">
      <div key={reEntryCount.current} className="contents">{children}</div>
    </div>
  );
}

function getTerminalCommand(eventType: string): string {
  const map: Record<string, string> = {
    PushEvent: "git push",
    CreateEvent: "git init",
    PullRequestEvent: "gh pr create",
    IssuesEvent: "gh issue open",
    ForkEvent: "gh repo fork",
    WatchEvent: "gh repo star",
  };
  return map[eventType] || "git activity";
}

function transformContributions(data: ContributionCalendar) {
  return data.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level:
        day.contributionCount === 0 ? 0
        : day.contributionCount <= 3 ? 1
        : day.contributionCount <= 6 ? 2
        : day.contributionCount <= 9 ? 3
        : 4,
    })),
  );
}

function getRelativeTimeDisplay(dateString: string): string {
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

// ── Sub-components ──

// macOS-style window title bar with traffic-light dots
function WindowBar({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-background/50">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
      </div>
      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="text-xs font-medium text-muted-foreground truncate">{label}</span>
    </div>
  );
}

// Small desktop widget for a stat
function StatWidget({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:border-border/50 transition-colors"
      whileHover={{ scale: 1.02, backgroundColor: "var(--background)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="w-9 h-9 rounded-lg bg-background border border-border/30 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-semibold tabular-nums">{value.toLocaleString()}</p>
        <p className="text-[11px] text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

// Project folder card
function ProjectFolder({
  project,
  index,
}: {
  project: ProjectRepo;
  index: number;
}) {
  return (
    <motion.a
      href={project.sourceUrl || project.liveUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.35, ease: "easeOut" }}
      className="group flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-background/50 hover:bg-background transition-colors"
    >
      <div className="w-9 h-9 rounded-lg bg-background border border-border/30 flex items-center justify-center shrink-0 group-hover:border-brand/30 transition-colors">
        <FolderGit2 className="w-4 h-4 text-muted-foreground group-hover:text-brand transition-colors" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate group-hover:text-brand transition-colors">
          {project.title}
        </p>
        <p className="text-[11px] text-muted-foreground truncate">
          {project.description}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {project.stars > 0 && (
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Star className="w-3 h-3 text-muted-foreground" />
            {project.stars}
          </span>
        )}
        {project.language && (
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-border/40 text-muted-foreground font-medium">
            {project.language}
          </span>
        )}
      </div>
    </motion.a>
  );
}

// Loading state
function DesktopSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 rounded-xl border border-border/20 bg-background/50 h-64 animate-pulse" />
      <div className="rounded-xl border border-border/20 bg-background/50 h-64 animate-pulse" />
      <div className="lg:col-span-1 rounded-xl border border-border/20 bg-background/50 h-48 animate-pulse" />
      <div className="lg:col-span-2 rounded-xl border border-border/20 bg-background/50 h-48 animate-pulse" />
    </div>
  );
}

// ── Main ──

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
      } catch {
        setProfile(githubFallback as GitHubProfile);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <DesktopSkeleton />;

  const totalStars = calculateTotalStars(repos);
  const contributionData = contributions
    ? transformContributions(contributions)
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* ── Contribution Graph Widget (2 cols) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="lg:col-span-2 flex flex-col rounded-xl border border-border/20 bg-background/50 overflow-hidden shadow-sm"
      >
        <WindowBar label="Contribution Graph" icon={BarChart3} />
        <div className="p-4 overflow-x-auto">
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
            <p className="text-sm text-muted-foreground py-8 text-center">
              No contribution data available
            </p>
          )}
        </div>
      </motion.div>

      {/* ── Stats Widgets Panel (1 col) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className="flex flex-col rounded-xl border border-border/20 bg-background/50 overflow-hidden shadow-sm"
      >
        <WindowBar label="Stats" icon={Users} />
        <div className="p-3 grid grid-cols-2 gap-2">
          <StatWidget
            icon={Users}
            value={profile?.followers || 0}
            label="Followers"
          />
          <StatWidget
            icon={GitFork}
            value={profile?.public_repos || 0}
            label="Repos"
          />
          <StatWidget
            icon={Star}
            value={totalStars}
            label="Stars"
          />
          <StatWidget
            icon={GitCommit}
            value={contributions?.totalContributions || 0}
            label="Contributions"
          />
        </div>
        {/* Tech tags */}
        <div className="px-4 pb-4 pt-1">
          <p className="text-[11px] font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Technologies
          </p>
          <div className="flex flex-wrap gap-1.5">
            {technologies.slice(0, 12).map((tech) => (
              <span
                key={tech.name}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border border-border/30 bg-background/50 text-muted-foreground hover:text-foreground hover:border-border/50 transition-colors"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: tech.color }}
                />
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Pinned Projects Folder Grid (1 col) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
        className="flex flex-col rounded-xl border border-border/20 bg-background/50 overflow-hidden shadow-sm"
      >
        <WindowBar label="Pinned Projects" icon={Folder} />
        <div className="p-3 space-y-2">
          {pinnedRepos.length > 0 ? (
            pinnedRepos.map((repo, i) => (
              <ProjectFolder key={repo.id} project={repo} index={i} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No pinned projects
            </p>
          )}
        </div>
      </motion.div>

      {/* ── Terminal — Recent Activity (2 cols) ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="lg:col-span-2 flex flex-col rounded-xl border border-border/20 bg-background/50 overflow-hidden shadow-sm"
      >
        <WindowBar label="Recent Activity" icon={Clock} />
        <div className="p-4 overflow-y-auto max-h-72">
          {events.length > 0 ? (
            <ScrollRepeat>
              <Terminal className="max-w-full w-full border-none bg-transparent" sequence>
                {events.slice(0, 5).flatMap((event) => {
                  const cmd = getTerminalCommand(event.type);
                  const time = getRelativeTimeDisplay(event.created_at);
                  const repo =
                    event.repo.name.split("/").pop() || event.repo.name;
                  return [
                    <TypingAnimation
                      key={`${event.id}-cmd`}
                      className="text-emerald-400 font-mono text-sm"
                    >
                      {`$ ${cmd} ${repo}`}
                    </TypingAnimation>,
                    <AnimatedSpan
                      key={`${event.id}-out`}
                      className="text-muted-foreground text-xs pl-4"
                    >
                      ✔ {event.repo.name} — {time}
                    </AnimatedSpan>,
                  ];
                })}
              </Terminal>
            </ScrollRepeat>
          ) : (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No recent activity
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
