// GitHub section — polished motion: staggered reveals, spring hovers, animated stats

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

// ── Staggered count-up stat ──
function StatBadge({
  icon: Icon,
  value,
  label,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (!el) return;
    const ctl = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.22, 0.8, 0.36, 1],
      onUpdate(v) {
        if (el) el.textContent = Math.round(v).toLocaleString();
      },
    });
    return () => ctl.stop();
  }, [inView, value, delay]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2 text-sm text-muted-foreground"
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span ref={ref} className="font-semibold text-foreground tabular-nums">0</span>
      <span>{label}</span>
    </motion.span>
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
      level:
        day.contributionCount === 0 ? 0
        : day.contributionCount <= 3 ? 1
        : day.contributionCount <= 6 ? 2
        : day.contributionCount <= 9 ? 3
        : 4,
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

// ── Glow backdrop for graph card ──
function GraphGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl" aria-hidden="true">
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-emerald-500/[0.04] blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-brand/[0.04] blur-3xl" />
    </div>
  );
}

// ── Skeleton ──
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

// ── Card wrapper — hover lift + border glow ──
function CardFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`rounded-2xl border border-border/20 bg-background/40 backdrop-blur-sm overflow-hidden ${className}`}
      whileHover={{ y: -2, borderColor: "oklch(1 0 0 / 0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

// ── Section header ──
function SectionHeader({ text }: { text: string }) {
  return (
    <div className="px-6 py-4 border-b border-border/30">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{text}</p>
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
    <div ref={sectionRef} className="space-y-5">
      {/* ── Contribution Graph — scale + opacity entrance ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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

      {/* ── Stat row — each badge staggers in with spring ── */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {stats.map((stat, i) => (
          <StatBadge
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            delay={0.2 + i * 0.08}
          />
        ))}
      </div>

      {/* ── Projects + Activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Projects — animated row entries, spring hover, accent bar reveal */}
        <CardFrame>
          <SectionHeader text="Pinned Projects" />
          {pinnedRepos.length > 0 ? (
            <div className="divide-y divide-border/10">
              {pinnedRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.sourceUrl || repo.liveUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{
                    backgroundColor: "oklch(1 0 0 / 0.04)",
                    transition: { duration: 0.15, ease: "easeOut" },
                  }}
                  className="group flex items-center gap-4 px-6 py-4 relative"
                >
                  {/* Left accent — springs in on hover */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r bg-transparent"
                    whileHover={{ backgroundColor: "var(--brand)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{ originX: 0 }}
                  />

                  <div className="min-w-0 flex-1">
                    <motion.p
                      className="text-sm font-medium truncate"
                      whileHover={{ color: "var(--foreground)" }}
                    >
                      {repo.title}
                    </motion.p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {repo.description}
                    </p>
                  </div>

                  <motion.div
                    className="flex items-center gap-3 shrink-0 text-xs text-muted-foreground"
                    whileHover={{ x: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {repo.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stars}
                      </span>
                    )}
                    {repo.language && (
                      <motion.span
                        className="px-1.5 py-0.5 rounded font-medium border border-border/40"
                        whileHover={{ borderColor: "oklch(1 0 0 / 0.2)", color: "var(--foreground)" }}
                      >
                        {repo.language}
                      </motion.span>
                    )}
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group-hover:opacity-100 opacity-0 transition-opacity"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </motion.span>
                  </motion.div>
                </motion.a>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 flex flex-col items-center gap-3">
              <motion.div
                animate={{ rotate: [0, -5, 5, -3, 0] }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
              >
                <GitFork className="w-8 h-8 text-muted-foreground/30" />
              </motion.div>
              <p className="text-sm text-muted-foreground">No pinned projects yet</p>
            </div>
          )}
        </CardFrame>

        {/* Activity — terminal panel */}
        <CardFrame>
          <div className="px-6 py-4 border-b border-border/30 flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Recent Activity
            </p>
            {/* Live dot */}
            <motion.span
              className="ml-auto w-2 h-2 rounded-full bg-emerald-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
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
              <p className="text-sm text-muted-foreground py-12 text-center">
                No recent activity
              </p>
            )}
          </div>
        </CardFrame>
      </div>
    </div>
  );
}
