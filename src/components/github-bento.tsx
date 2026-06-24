// GitHub section — contribution graph as centerpiece, stats as ambient data

"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { Star, GitFork, Users, GitCommit, ExternalLink, Clock } from "lucide-react";
import { githubFallback } from "@/lib/seed-data";
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

// ── Animated number that counts up on scroll ──
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (!el) return;

    const controls = animate(0, end, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (el) el.textContent = `${Math.round(v).toLocaleString()}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, end, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

// ── Helpers ──

function ScrollRepeat({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });
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

function getTerminalEvent(eventType: string): string {
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
      level: day.contributionCount === 0 ? 0 : day.contributionCount <= 3 ? 1 : day.contributionCount <= 6 ? 2 : day.contributionCount <= 9 ? 3 : 4,
    })),
  );
}

function timeDisplay(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

// ── Decorative graph background glow ──
function GraphGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" aria-hidden="true">
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-emerald-500/[0.03] blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-brand/[0.03] blur-3xl" />
    </div>
  );
}

// ── Loading skeleton ──
function Skeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/20 bg-background/50 h-48 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border/20 bg-background/50 h-64 animate-pulse" />
        <div className="rounded-2xl border border-border/20 bg-background/50 h-64 animate-pulse" />
      </div>
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
  const sectionRef = useRef<HTMLDivElement>(null);

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

  if (loading) return <Skeleton />;

  const totalStars = calculateTotalStars(repos);
  const contributionData = contributions ? transformContributions(contributions) : [];

  const stats = [
    { icon: GitFork, value: profile?.public_repos || 0, label: "repos" },
    { icon: Star, value: totalStars, label: "stars" },
    { icon: Users, value: profile?.followers || 0, label: "followers" },
    { icon: GitCommit, value: contributions?.totalContributions || 0, label: "contributions" },
  ];

  return (
    <div ref={sectionRef} className="space-y-4">
      {/* ── Contribution Graph — the centerpiece ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative rounded-2xl border border-border/20 bg-background/40 backdrop-blur-sm overflow-hidden"
      >
        <GraphGlow />
        <div className="relative px-6 pt-5 pb-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Contribution Activity
          </p>
          <div className="overflow-x-auto flex justify-center">
            {contributionData.length > 0 ? (
              <ActivityCalendar
                data={contributionData}
                theme={{
                  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                }}
                colorScheme="dark"
                blockSize={11}
                blockMargin={3}
                fontSize={10}
                showColorLegend={false}
                showMonthLabels
                showTotalCount={false}
              />
            ) : (
              <p className="text-sm text-muted-foreground py-12">No contribution data available</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Ambient stat row ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground"
      >
        {stats.map((stat) => (
          <span key={stat.label} className="flex items-center gap-2">
            <stat.icon className="w-3.5 h-3.5" />
            <span className="font-semibold text-foreground">
              <CountUp end={stat.value} />
            </span>
            <span>{stat.label}</span>
          </span>
        ))}
      </motion.div>

      {/* ── Projects + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Projects — card with left accent stripe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-border/20 bg-background/40 backdrop-blur-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border/30">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Pinned Projects
            </p>
          </div>
          <div className="divide-y divide-border/20">
            {pinnedRepos.length > 0 ? (
              pinnedRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.sourceUrl || repo.liveUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.35, ease: "easeOut" }}
                  className="group flex items-center gap-4 px-6 py-4 hover:bg-background/50 transition-colors relative"
                >
                  {/* Left accent bar — brand color on hover */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-brand transition-colors rounded-r" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{repo.title}</p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{repo.description}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground">
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />{repo.stars}
                      </span>
                    )}
                    {repo.language && (
                      <span className="font-medium">{repo.language}</span>
                    )}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.a>
              ))
            ) : (
              <p className="px-6 py-12 text-sm text-muted-foreground text-center">No pinned projects</p>
            )}
          </div>
        </motion.div>

        {/* Activity — terminal readout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-border/20 bg-background/40 backdrop-blur-sm overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-border/30 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Recent Activity
            </p>
          </div>
          <div className="p-4">
            {events.length > 0 ? (
              <ScrollRepeat>
                <Terminal className="max-w-full w-full border-none bg-transparent" sequence>
                  {events.slice(0, 5).flatMap((event) => {
                    const cmd = getTerminalEvent(event.type);
                    const time = timeDisplay(event.created_at);
                    const repo = event.repo.name.split("/").pop() || event.repo.name;
                    return [
                      <TypingAnimation key={`${event.id}-cmd`} className="text-emerald-400 font-mono text-sm">
                        {`$ ${cmd} ${repo}`}
                      </TypingAnimation>,
                      <AnimatedSpan key={`${event.id}-out`} className="text-muted-foreground text-xs pl-4">
                        ✔ {event.repo.name} — {time}
                      </AnimatedSpan>,
                    ];
                  })}
                </Terminal>
              </ScrollRepeat>
            ) : (
              <p className="text-sm text-muted-foreground py-12 text-center">No recent activity</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
