// Project card component with GitHub stats, tags, and hover effects

"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink, GitFork, Star, Clock } from "lucide-react";
import type { ProjectRepo } from "@/lib/types";

// Format relative time for display (client-safe)
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

// Gradient colours keyed by language
const langGradients: Record<string, string> = {
  TypeScript: "from-blue-500/20 to-blue-700/20",
  JavaScript: "from-yellow-500/20 to-yellow-700/20",
  Python: "from-green-500/20 to-green-700/20",
  Go: "from-cyan-500/20 to-cyan-700/20",
  Rust: "from-orange-500/20 to-orange-700/20",
  Java: "from-red-500/20 to-red-700/20",
  HTML: "from-orange-400/20 to-orange-600/20",
  CSS: "from-blue-400/20 to-purple-500/20",
};

// Project card with glassmorphism hover effect and GitHub stats
export function ProjectCard({ project }: { project: ProjectRepo }) {
  const gradient =
    langGradients[project.language || ""] || "from-primary/20 to-primary/5";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card overflow-hidden group h-full flex flex-col">
        {/* Language gradient header */}
        <div
          className={`relative h-32 bg-gradient-to-br ${gradient} flex items-center justify-center`}
        >
          <span className="text-4xl font-bold text-foreground/20 select-none">
            {project.title.charAt(0)}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                aria-label="Source Code"
              >
                <GitFork className="w-5 h-5 text-white" />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* GitHub stats */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            {project.stars > 0 && (
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500" />
                {project.stars}
              </span>
            )}
            {project.language && (
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                {project.language}
              </Badge>
            )}
            <span className="flex items-center gap-1 ml-auto">
              <Clock className="w-3 h-3" />
              {timeAgo(project.updatedAt)}
            </span>
          </div>

          {/* Tags (topics) */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 5).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{project.tags.length - 5}
              </Badge>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
