// Hero section — morphing reveal driven by scroll

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/seed-data";
import { Particles } from "@/components/ui/particles";
import { Highlighter } from "@/components/ui/highlighter";
import { GlareHover } from "@/components/ui/glare-hover";
import { MapPin, Briefcase } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Morphing transforms — scroll 0→1 maps across the section
  // 0–0.35: full hero | 0.35–0.55: morph | 0.55–1: settled compact
  const avatarScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.35]);
  const avatarY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 0.8, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 80]);
  const particlesOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  // Scroll indicator — thin progress bar, fades out as hero morphs
  const barScaleX = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const barOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[130vh] min-h-[800px]"
    >
      {/* Sticky container — stays in view while user scrolls through the section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Particles — fade as you scroll */}
        <motion.div className="absolute inset-0" style={{ opacity: particlesOpacity }}>
          <Particles
            className="absolute inset-0"
            quantity={80}
            color="oklch(0.7 0 0)"
            size={0.6}
            staticity={30}
            ease={80}
          />
        </motion.div>

        {/* Morphing content */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 md:gap-16 px-4"
        >
          {/* Avatar — shrinks and lifts */}
          <motion.div
            style={{ scale: avatarScale, y: avatarY }}
            className="flex-shrink-0 origin-center"
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

          {/* Text — fades and drifts down */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="flex flex-col gap-6 text-center md:text-left min-w-0 overflow-hidden"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I&apos;m{" "}
              <span className="text-brand">{profile.name}</span>
            </h1>

            <p className="text-lg md:text-2xl text-muted-foreground relative">
              <Highlighter action="highlight" color="#87CEFA" isView>
                Full Stack Developer
              </Highlighter>
            </p>

            <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-xl relative">
              Passionate about building modern web applications with{" "}
              <Highlighter action="underline" color="#FF9800" isView>
                clean code
              </Highlighter>{" "}
              and{" "}
              <Highlighter action="highlight" color="#90EE90" isView>
                great user experiences
              </Highlighter>
              . I love working with React, Next.js, and exploring new technologies.
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-brand" />
                Open to opportunities
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll progress indicator — thin brand bar, bottom edge */}
        <motion.div
          style={{ scaleX: barScaleX, opacity: barOpacity }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand origin-left rounded-full"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
