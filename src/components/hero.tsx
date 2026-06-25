// Hero section — minimal: particles + scroll morphing, content lives in About section

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Particles } from "@/components/ui/particles";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.6, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const particlesOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.15]);
  const chevronOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[60vh] md:h-[70vh] min-h-[400px] md:min-h-[500px]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
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

        {/* Minimal centered content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="relative z-10 text-center px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-medium tracking-[0.25em] uppercase text-muted-foreground mb-4"
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground"
          >
            K<span className="text-brand">M</span>S
          </motion.h1>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: chevronOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase text-muted-foreground/50">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
