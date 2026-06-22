// Tech stack section — single marquee of floating brand logos

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { technologies } from "@/lib/seed-data";
import { Marquee } from "@/components/ui/marquee";
import { Code } from "lucide-react";

// Import all icon subsets from react-icons
import * as siIcons from "react-icons/si";
import * as faIcons from "react-icons/fa";
import * as vscIcons from "react-icons/vsc";

// Merge all icon subsets into one lookup
const allIcons: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  ...siIcons,
  ...faIcons,
  ...vscIcons,
};

// Get icon component by name
function getIcon(name: string): React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }> {
  return (allIcons[name] || Code) as React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;
}

// Single floating logo
function LogoItem({ tech, index }: { tech: (typeof technologies)[number]; index: number }) {
  const Icon = getIcon(tech.icon);
  const brandColor = tech.color || "var(--primary)";

  return (
    <motion.div
      className="flex items-center justify-center p-4 cursor-default select-none"
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 2.5 + (index % 4) * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: (index % 6) * 0.2,
      }}
      whileHover={{
        scale: 1.25,
        rotate: 360,
        transition: { type: "spring" as const, stiffness: 200, damping: 10 },
      }}
    >
      <Icon className="w-10 h-10" style={{ color: brandColor }} />
    </motion.div>
  );
}

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Split technologies into two rows for visual variety
  const half = Math.ceil(technologies.length / 2);
  const topRow = technologies.slice(0, half);
  const bottomRow = technologies.slice(half);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <Marquee pauseOnHover className="[--duration:25s]">
        {topRow.map((tech, i) => (
          <LogoItem key={tech.name} tech={tech} index={i} />
        ))}
      </Marquee>
      <Marquee pauseOnHover reverse className="[--duration:30s]">
        {bottomRow.map((tech, i) => (
          <LogoItem key={tech.name} tech={tech} index={i + half} />
        ))}
      </Marquee>
    </motion.div>
  );
}
