// GitHub section — Bento grid layout with polished cards, spotlight effects, and terminal activity

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { ActivityCalendar } from "react-activity-calendar";
import { Terminal, AnimatedSpan, TypingAnimation } from "@/components/ui/terminal";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Star,
  GitFork,
  Users,
  GitCommit,
  ExternalLink,
  Clock,
  Calendar,
  Code2,
  TrendingUp,
} from "lucide-react";
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
} from "@/lib/github";

// ── Animation config ──
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ── Count-up number ──
function CountUp({ value, delay = 0 }: { value: number; delay?: number }) {
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
    <span ref={ref} className="font-semibold text-foreground tabular-nums text-xl md:text-2xl">
      0
    </span>
  );
}

// ── Contribution Card ──
function ContributionCard({
  contributions,
  contributionData,
}: {
  contributions: ContributionCalendar | null;
  contributionData: { date: string; count: number; level: number }[];
}) {
  return (
    <motion.div variants={cardVariants} className="lg:col-span-3">
      <Card className="relative h-full overflow-hidden">
        <BorderBeam
          size={80}
          duration={12}
          colorFrom="rgba(57, 211, 83, 0.5)"
          colorTo="rgba(57, 211, 83, 0)"
          borderWidth={1}
        />
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xs font-medium text-muted-foreground/80 tracking-wide">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400/80" />
                <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
              </span>
              contribution-activity
            </CardTitle>
            {contributions && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <CountUp value={contributions.totalContributions} delay={0.5} />
                <span className="text-xs text-muted-foreground">this year</span>
              </motion.div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
              <p className="text-sm text-muted-foreground py-8 text-center">
                No contribution data available
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Stats Card — 2×2 grid of count-up stats ──
function StatsCard({
  stats,
}: {
  stats: { icon: React.ComponentType<{ className?: string }>; value: number; label: string }[];
}) {
  return (
    <motion.div variants={cardVariants} className="lg:col-span-1">
      <MagicCard
        className="h-full"
        gradientSize={160}
        gradientColor="rgba(255, 255, 255, 0.06)"
        gradientOpacity={1}
        gradientFrom="rgba(255, 255, 255, 0.08)"
        gradientTo="rgba(255, 255, 255, 0)"
      >
        <div className="p-2">
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400/80" />
              <span className="w-2 h-2 rounded-full bg-amber-400/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            </span>
            <p className="text-xs font-medium text-muted-foreground/60 tracking-wide">stats</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-200 cursor-default"
              >
                <stat.icon className="w-4 h-4 text-muted-foreground" />
                <CountUp value={stat.value} delay={0.4 + i * 0.1} />
                <span className="text-xs text-muted-foreground capitalize">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </MagicCard>
    </motion.div>
  );
}

// ── Profile Card — 3D tilt, avatar, bio ──
function ProfileCard({ profile }: { profile: GitHubProfile }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const joinYear = new Date(profile.created_at).getFullYear();

  return (
    <motion.div
      variants={cardVariants}
      className="lg:col-span-1 lg:row-span-2"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="h-full"
      >
        <Card className="relative h-full">
          <BorderBeam
            size={60}
            duration={8}
            colorFrom="rgba(255, 255, 255, 0.3)"
            colorTo="rgba(255, 255, 255, 0)"
            borderWidth={1}
            reverse
          />
          <CardContent className="flex flex-col items-center justify-center gap-5 p-6 h-full text-center">
            {/* Avatar with ring */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-white/[0.15] ring-offset-2 ring-offset-background">
                <img
                  src={profile.avatar_url}
                  alt={profile.name || profile.login}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online indicator */}
              <motion.span
                className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-card"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Name + handle */}
            <div className="space-y-1">
              <p className="text-base font-semibold text-foreground">
                {profile.name || profile.login}
              </p>
              <p className="text-xs text-muted-foreground font-mono">@{profile.login}</p>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px]">
                {profile.bio}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                Joined {joinYear}
              </span>
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3 h-3" />
                {profile.public_repos} repos
              </span>
            </div>

            {/* GitHub link */}
            <motion.a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 px-4 py-1.5 text-xs font-mono rounded-lg border border-white/[0.15] text-muted-foreground hover:text-foreground hover:border-white/[0.3] hover:bg-white/[0.04] transition-all duration-200"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              View Profile →
            </motion.a>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// ── Projects Card — horizontal scroll ──
function ProjectsCard({ pinnedRepos }: { pinnedRepos: ProjectRepo[] }) {
  return (
    <motion.div variants={cardVariants} className="lg:col-span-3">
      <Card className="relative h-full">
        <BorderBeam
          size={70}
          duration={10}
          delay={2}
          colorFrom="rgba(255, 255, 255, 0.2)"
          colorTo="rgba(255, 255, 255, 0)"
          borderWidth={1}
        />
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center gap-2 text-xs font-medium text-muted-foreground/80 tracking-wide">
            <span className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400/80" />
              <span className="w-2 h-2 rounded-full bg-amber-400/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            </span>
            pinned-projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pinnedRepos.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-thin pb-1">
              {pinnedRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.sourceUrl || repo.liveUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.15 },
                  }}
                  className="group flex-shrink-0 w-52 snap-start rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  <div className="p-4">
                    {/* Repo name */}
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground truncate pr-2">
                        {repo.title}
                      </p>
                      <motion.span
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                      >
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                      </motion.span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                      {repo.description}
                    </p>

                    {/* Footer: language + stars */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stars}
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <div className="py-10 flex flex-col items-center gap-3">
              <motion.div
                animate={{ rotate: [0, -5, 5, -3, 0] }}
                transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
              >
                <GitFork className="w-8 h-8 text-muted-foreground/30" />
              </motion.div>
              <p className="text-sm text-muted-foreground">No pinned projects yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Activity Card — terminal with live events ──
function ActivityCard({ events }: { events: GitHubEvent[] }) {
  return (
    <motion.div variants={cardVariants} className="lg:col-span-3">
      <Card className="relative h-full">
        <BorderBeam
          size={65}
          duration={14}
          delay={4}
          colorFrom="rgba(52, 211, 153, 0.4)"
          colorTo="rgba(52, 211, 153, 0)"
          borderWidth={1}
        />
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-xs font-medium text-muted-foreground/80 tracking-wide">
              <span className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400/80" />
                <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
              </span>
              recent-activity
            </CardTitle>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Clock className="w-3 h-3 text-muted-foreground" />
              </motion.div>
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <Terminal
              className="max-w-full w-full border-none bg-transparent max-h-64"
              sequence
              startOnView
            >
              {events.slice(0, 6).flatMap((event) => {
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
          ) : (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No recent activity
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Helpers ──

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

function timeDisplay(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

function getLanguageColor(lang: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    Python: "#3776AB",
    Rust: "#DEA584",
    Go: "#00ADD8",
    Java: "#ED8B00",
    "C++": "#F34B7D",
    C: "#555555",
    Ruby: "#CC342D",
    PHP: "#777BB4",
    Swift: "#FA7343",
    Kotlin: "#7F52FF",
    Dart: "#0175C2",
    Shell: "#89E051",
    HTML: "#E34F26",
    CSS: "#1572B6",
    Vue: "#4FC08D",
    Svelte: "#FF3E00",
  };
  return colors[lang] || "#8b8b8b";
}

// ── Skeleton ──
function Skeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3" aria-busy="true" aria-label="Loading GitHub data">
      <div className="lg:col-span-3 h-48 rounded-xl ring-1 ring-foreground/10 bg-card animate-pulse" />
      <div className="lg:col-span-1 h-48 rounded-xl ring-1 ring-foreground/10 bg-card animate-pulse" />
      <div className="lg:col-span-1 h-64 rounded-xl ring-1 ring-foreground/10 bg-card animate-pulse" />
      <div className="lg:col-span-3 h-32 rounded-xl ring-1 ring-foreground/10 bg-card animate-pulse" />
      <div className="lg:col-span-4 h-48 rounded-xl ring-1 ring-foreground/10 bg-card animate-pulse" />
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

  if (loading) return <Skeleton />;

  const totalStars = calculateTotalStars(repos);
  const contributionData = contributions ? transformContributions(contributions) : [];

  const stats = [
    { icon: GitFork, value: profile?.public_repos || 0, label: "repos" },
    { icon: Star, value: totalStars, label: "stars" },
    { icon: Users, value: profile?.followers || 0, label: "followers" },
    { icon: GitCommit, value: contributions?.totalContributions || 0, label: "commits" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 lg:grid-cols-4 gap-3"
    >
      {/* Row 1: Contribution graph (3 cols) + Stats (1 col) */}
      <ContributionCard
        contributions={contributions}
        contributionData={contributionData}
      />
      <StatsCard stats={stats} />

      {/* Row 2-3: Profile (1 col, 2 rows) + Projects (3 cols) + Activity (3 cols) */}
      {profile && <ProfileCard profile={profile} />}
      <ProjectsCard pinnedRepos={pinnedRepos} />
      <ActivityCard events={events} />
    </motion.div>
  );
}
