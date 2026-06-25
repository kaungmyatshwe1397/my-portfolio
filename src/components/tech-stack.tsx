// Tech stack section — dual marquee of branded tech pills with glow hover

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

// Single tech pill — icon + name with brand glow on hover
function TechPill({ tech, index }: { tech: (typeof technologies)[number]; index: number }) {
  const Icon = getIcon(tech.icon);
  const brandColor = tech.color || "var(--primary)";

  return (
    <motion.div
      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/[0.25] bg-white/[0.08] backdrop-blur-md cursor-default select-none overflow-hidden"
      style={{
        boxShadow: "0 4px 16px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.4)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        "--brand": brandColor,
      } as React.CSSProperties}
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 2.8 + (index % 4) * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: (index % 6) * 0.15,
      }}
    >
      {/* Glow backdrop — appears on hover */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${brandColor}15, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Top edge shimmer — brand tinted */}
      <span
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${brandColor}60, transparent)` }}
        aria-hidden="true"
      />

      {/* Icon */}
      <Icon
        className="relative w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110"
        style={{ color: brandColor }}
      />

      {/* Name */}
      <span className="relative text-sm font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
        {tech.name}
      </span>
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
      <Marquee pauseOnHover className="[--duration:35s] [--gap:0.75rem]">
        {topRow.map((tech, i) => (
          <TechPill key={tech.name} tech={tech} index={i} />
        ))}
      </Marquee>
      <Marquee pauseOnHover reverse className="[--duration:40s] [--gap:0.75rem]">
        {bottomRow.map((tech, i) => (
          <TechPill key={tech.name} tech={tech} index={i + half} />
        ))}
      </Marquee>
    </motion.div>
  );
}
