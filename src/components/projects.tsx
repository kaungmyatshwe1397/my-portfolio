// Projects section — live GitHub repos with seed data fallback

"use client";

import { useEffect, useState } from "react";
import { AnimatedList } from "@/components/ui/animated-list";
import { projects } from "@/lib/seed-data";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGitHubRepos, repoToProject } from "@/lib/github";
import type { ProjectRepo } from "@/lib/types";

// Convert seed Project data to ProjectRepo shape for fallback
function seedToProjectRepo(seed: (typeof projects)[number]): ProjectRepo {
  return {
    id: seed.id,
    title: seed.title,
    description: seed.description,
    tags: seed.tags,
    liveUrl: seed.liveUrl || undefined,
    sourceUrl: seed.sourceUrl || undefined,
    featured: seed.featured,
    sortOrder: seed.sortOrder,
    stars: 0,
    forks: 0,
    updatedAt: new Date().toISOString(),
  };
}

// Get all unique tags from project repos
function getAllTags(repos: ProjectRepo[]): string[] {
  const tags = new Set<string>();
  repos.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

// Loading skeleton for projects grid
function ProjectsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Tag filter skeleton */}
      <div className="flex flex-wrap justify-center gap-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>
      {/* Animated list skeletons */}
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="glass-card p-5 flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex flex-wrap gap-2 pt-1">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Projects section with live GitHub data and seed fallback
export function Projects() {
  const [repos, setRepos] = useState<ProjectRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    async function loadRepos() {
      try {
        const data = await fetchGitHubRepos();

        // Filter out forks and convert to display format
        const ownRepos = data
          .filter((repo) => !repo.fork)
          .map(repoToProject)
          .sort((a, b) => b.sortOrder - a.sortOrder);

        if (ownRepos.length > 0) {
          setRepos(ownRepos);
        } else {
          // API returned empty — use seed fallback
          setRepos(projects.map(seedToProjectRepo));
          setUsingFallback(true);
        }
      } catch (err) {
        // API failed — use seed fallback
        console.warn("GitHub API unavailable, using seed data:", err);
        setRepos(projects.map(seedToProjectRepo));
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    loadRepos();
  }, []);

  if (loading) {
    return <ProjectsSkeleton />;
  }

  const allTags = getAllTags(repos);
  const filteredProjects = selectedTag
    ? repos.filter((p) => p.tags.includes(selectedTag))
    : repos;

  return (
    <div className="space-y-8">
      {/* Fallback notice */}
      {usingFallback && (
        <p className="text-center text-sm text-muted-foreground">
          Showing sample projects — live GitHub data unavailable.
        </p>
      )}

      {/* Tag filters */}
      <div className="flex flex-wrap justify-center gap-2">
        <Badge
          variant={selectedTag === null ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/20 transition-colors"
          onClick={() => setSelectedTag(null)}
        >
          All
        </Badge>
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/20 transition-colors"
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Animated project list */}
      <AnimatedList delay={450} className="w-full gap-4 items-stretch">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </AnimatedList>
    </div>
  );
}
