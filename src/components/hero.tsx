// Hero section — single glass container: photo + about me side by side

"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/seed-data";
import { Particles } from "@/components/ui/particles";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { MapPin, Briefcase } from "lucide-react";

// Staggered text entrance
const textContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt on the whole card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 25, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [4, -4]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-4, 4]),
    springConfig
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Scroll transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const cardScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const cardY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.5],
    [1, 0.8, 0]
  );
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const particlesOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.15]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -20]);

  // Scroll progress bar
  const barScaleX = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
  const barOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[120vh] md:h-[130vh] min-h-[700px] md:min-h-[800px]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Particles */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: particlesOpacity }}
        >
          <Particles
            className="absolute inset-0"
            quantity={60}
            color="oklch(0.75 0.02 260)"
            size={0.5}
            staticity={40}
            ease={80}
          />
        </motion.div>

        {/* Single container with photo + text */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            y: contentY,
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }}
          className="relative z-10 w-full max-w-5xl px-6 md:px-10"
        >
          <motion.div
            style={{ scale: cardScale, y: cardY }}
            className="origin-center"
          >
            {/* Glass container — one card for everything */}
            <LiquidGlass
              className="rounded-3xl cursor-default"
            >
              <div className="flex flex-col md:flex-row">
                {/* LEFT: Photo */}
                <div className="relative w-full md:w-[42%] flex-shrink-0">
                  <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-full">
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  {/* Subtle gradient edge where photo meets text */}
                  <div
                    className="hidden md:block absolute top-0 right-0 w-16 h-full pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(8,8,16,0.85))",
                    }}
                  />
                </div>

                {/* RIGHT: About me */}
                <motion.div
                  variants={textContainer}
                  initial="hidden"
                  animate="show"
                  style={{ opacity: textOpacity, y: textY }}
                  className="flex flex-col justify-center gap-5 px-8 py-10 md:px-12 md:py-14"
                >
                  <motion.div variants={textItem}>
                    <p className="text-sm font-medium tracking-widest uppercase text-brand/80 mb-2">
                      About me
                    </p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                      Hi, I&apos;m{" "}
                      <span className="text-brand">{profile.name}</span>
                    </h1>
                  </motion.div>

                  <motion.div variants={textItem}>
                    <p className="text-lg md:text-xl font-semibold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                      Full Stack Developer
                    </p>
                  </motion.div>

                  <motion.div variants={textItem}>
                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-md">
                      Passionate about building modern web applications with{" "}
                      <span className="text-foreground font-medium">
                        clean code
                      </span>{" "}
                      and{" "}
                      <span className="text-foreground font-medium">
                        great user experiences
                      </span>
                      . I love working with React, Next.js, and exploring new
                      technologies.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={textItem}
                    className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground pt-2"
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
                </motion.div>
              </div>
            </LiquidGlass>
          </motion.div>
        </motion.div>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: barScaleX, opacity: barOpacity }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand origin-left rounded-full"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
