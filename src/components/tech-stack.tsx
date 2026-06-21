// Tech stack section with technology badges and category grouping

"use client";

import { motion } from "framer-motion";
import { technologies } from "@/lib/seed-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { TechCategory } from "@/lib/types";
import {
  FileCode,
  Braces,
  Terminal,
  Database,
  Atom,
  Layers,
  Server,
  Route,
  Paintbrush,
  GitBranch,
  Container,
  Code,
  HardDrive,
  Zap,
  Cloud,
  Triangle,
} from "lucide-react";

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCode,
  Braces,
  Terminal,
  Database,
  Atom,
  Layers,
  Server,
  Route,
  Paintbrush,
  GitBranch,
  Container,
  Code,
  HardDrive,
  Zap,
  Cloud,
  Triangle,
};

// Category display names
const categoryNames: Record<TechCategory, string> = {
  language: "Languages",
  framework: "Frameworks & Libraries",
  tool: "Tools",
  database: "Databases",
  cloud: "Cloud & Deployment",
  design: "Design",
};

// Get icon component by name
function getIcon(name: string) {
  return iconMap[name] || Code;
}

// Group technologies by category
function groupByCategory() {
  const grouped: Record<string, typeof technologies> = {};
  technologies.forEach((tech) => {
    if (!grouped[tech.category]) {
      grouped[tech.category] = [];
    }
    grouped[tech.category].push(tech);
  });
  return grouped;
}

// Animation variants for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Tech stack section component
export function TechStack() {
  const grouped = groupByCategory();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Object.entries(grouped).map(([category, techs]) => (
        <motion.div key={category} variants={itemVariants}>
          <Card className="glass-card p-6 h-full">
            <h3 className="text-lg font-semibold mb-4 text-primary">
              {categoryNames[category as TechCategory] || category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech) => {
                const Icon = getIcon(tech.icon);
                return (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="outline"
                      className="flex items-center gap-2 px-3 py-1.5 hover:bg-primary/10 transition-colors cursor-default"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tech.name}</span>
                      {tech.proficiency && (
                        <span className="text-xs text-muted-foreground">
                          {"★".repeat(tech.proficiency)}
                        </span>
                      )}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
