// Hero section — bento grid with particles, magic cards, shimmer CTA

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/seed-data";
import { Particles } from "@/components/ui/particles";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
  MapPin,
  Mail,
  GitFork,
  Globe,
  Link2,
  Briefcase,
  Code2,
} from "lucide-react";

// Staggered tile animation
const tile = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.15 * i, duration: 0.5, ease: "easeOut" as const },
  }),
};

// Social link button component
function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-xl glass-hover border border-white/10 hover:border-primary/30 transition-all"
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}

// Gold gradient colours for MagicCard
const GRADIENT_FROM = "#FFD700";
const GRADIENT_TO = "#FFA500";

// Bento hero section
export function Hero() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-24">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient" />

      {/* Particles background */}
      <Particles
        className="absolute inset-0"
        quantity={80}
        color="oklch(0.7 0 0)"
        size={0.6}
        staticity={30}
        ease={80}
      />

      {/* Bento Grid */}
      <motion.div
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto_auto] gap-4"
      >
        {/* ── Avatar Tile (spans 1 col × 2 rows on desktop) ── */}
        <motion.div variants={tile} custom={0} className="md:row-span-2">
          <MagicCard
            className="h-full p-6 flex flex-col items-center justify-center gap-4 group"
            gradientSize={250}
            gradientFrom={GRADIENT_FROM}
            gradientTo={GRADIENT_TO}
            gradientColor="#262626"
            gradientOpacity={0.6}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 180 }}
              className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-primary/40 shadow-xl ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-500"
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code2 className="w-4 h-4 text-primary" />
              <span>Full Stack Developer</span>
            </div>
          </MagicCard>
        </motion.div>

        {/* ── Name + Title Tile ── */}
        <motion.div variants={tile} custom={1} className="md:col-span-2">
          <MagicCard
            className="h-full p-6 flex flex-col justify-center"
            gradientSize={300}
            gradientFrom={GRADIENT_FROM}
            gradientTo={GRADIENT_TO}
            gradientColor="#262626"
            gradientOpacity={0.5}
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
              Hi, I&apos;m{" "}
              <span className="text-primary">
                {profile.name.split(" ")[0]}
              </span>
              <span className="text-primary">.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {profile.title} from{" "}
              <span className="text-foreground font-medium">
                {profile.location}
              </span>
            </p>
          </MagicCard>
        </motion.div>

        {/* ── Location + Status Tile ── */}
        <motion.div variants={tile} custom={2}>
          <MagicCard
            className="h-full p-5 flex flex-col gap-3 justify-center"
            gradientSize={200}
            gradientFrom={GRADIENT_FROM}
            gradientTo={GRADIENT_TO}
            gradientColor="#262626"
            gradientOpacity={0.6}
          >
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 text-primary shrink-0" />
              <span>Open to opportunities</span>
            </div>
            <ShimmerButton
              className="w-fit text-xs px-4 py-2"
              shimmerColor="#FFD700"
              background="oklch(0.269 0 0)"
              borderRadius="9999px"
            >
              Available for hire
            </ShimmerButton>
          </MagicCard>
        </motion.div>

        {/* ── Social Links Tile ── */}
        <motion.div variants={tile} custom={3}>
          <MagicCard
            className="h-full p-5 flex flex-col gap-3 justify-center"
            gradientSize={200}
            gradientFrom={GRADIENT_FROM}
            gradientTo={GRADIENT_TO}
            gradientColor="#262626"
            gradientOpacity={0.6}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">
              Connect
            </p>
            <div className="flex flex-wrap gap-2">
              <SocialLink
                href={profile.social.github}
                label="GitHub"
                icon={GitFork}
              />
              {profile.social.linkedin && (
                <SocialLink
                  href={profile.social.linkedin}
                  label="LinkedIn"
                  icon={Link2}
                />
              )}
              {profile.social.twitter && (
                <SocialLink
                  href={profile.social.twitter}
                  label="Twitter"
                  icon={Globe}
                />
              )}
              <SocialLink
                href={`mailto:${profile.email}`}
                label="Email"
                icon={Mail}
              />
            </div>
          </MagicCard>
        </motion.div>

        {/* ── Bio Tile (spans 2 cols on desktop) ── */}
        <motion.div variants={tile} custom={4} className="md:col-span-2">
          <MagicCard
            className="h-full p-6 flex flex-col justify-center"
            gradientSize={300}
            gradientFrom={GRADIENT_FROM}
            gradientTo={GRADIENT_TO}
            gradientColor="#262626"
            gradientOpacity={0.5}
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">
              About Me
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {profile.bio}
            </p>
          </MagicCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
