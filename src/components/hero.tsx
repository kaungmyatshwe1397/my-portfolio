// Hero section — split screen with avatar and highlighted about info

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/seed-data";
import { Particles } from "@/components/ui/particles";
import { Highlighter } from "@/components/ui/highlighter";
import { GlareHover } from "@/components/ui/glare-hover";
import { MapPin, Briefcase } from "lucide-react";

// Entrance animations
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.3, type: "spring" as const, stiffness: 120, damping: 15 },
  },
};

export function Hero() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-24">
      {/* Particles background */}
      <Particles
        className="absolute inset-0"
        quantity={80}
        color="oklch(0.7 0 0)"
        size={0.6}
        staticity={30}
        ease={80}
      />

      {/* Split layout */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 md:gap-16"
      >
        {/* ── Left: Avatar ── */}
        <motion.div
          variants={scaleIn}
          className="flex-shrink-0"
        >
          <GlareHover
            className="rounded-full"
            color="#ffffff"
            opacity={0.3}
            size={200}
            duration={600}
          >
            <motion.div
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-brand/40 shadow-2xl ring-4 ring-brand/10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </GlareHover>
        </motion.div>

        {/* ── Right: About Info ── */}
        <div className="flex flex-col gap-6 text-center md:text-left min-w-0 overflow-hidden">
          {/* Name */}
          <motion.h1
            variants={fadeUp}
            custom={0.2}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Hi, I&apos;m{" "}
            <span className="text-brand">{profile.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={fadeUp}
            custom={0.35}
            className="text-lg md:text-2xl text-muted-foreground relative"
          >
            <Highlighter action="highlight" color="#87CEFA" isView>
              Full Stack Developer
            </Highlighter>
          </motion.p>

          {/* Bio with targeted highlights */}
          <motion.p
            variants={fadeUp}
            custom={0.5}
            className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-xl relative"
          >
            Passionate about building modern web applications with{" "}
            <Highlighter action="underline" color="#FF9800" isView>
              clean code
            </Highlighter>{" "}
            and{" "}
            <Highlighter action="highlight" color="#90EE90" isView>
              great user experiences
            </Highlighter>
            . I love working with React, Next.js, and exploring new technologies.
          </motion.p>

          {/* Location & Status */}
          <motion.div
            variants={fadeUp}
            custom={0.65}
            className="flex flex-wrap items-center gap-4 justify-center md:justify-start text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-brand" />
              Open to opportunities
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
