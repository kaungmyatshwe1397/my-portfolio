// About section — text-driven with scroll reveal, hyper text, and text animate effects

"use client";

import { HyperText } from "@/components/ui/hyper-text";
import { TextReveal } from "@/components/ui/text-reveal";
import { TextAnimate } from "@/components/ui/text-animate";
import { MorphingText } from "@/components/ui/morphing-text";
import { motion } from "framer-motion";

// Highlights — what defines the work
const highlights = [
  "Building full-stack applications with TypeScript, React, and Next.js",
  "Designing interfaces that feel native — fast, accessible, and intentional",
  "Shipping projects that solve real problems, not just fill a portfolio",
  "Exploring systems programming, cloud infrastructure, and developer tooling",
];

export function About() {
  return (
    <section id="about" className="relative">
      {/* Opening — name reveal + rotating roles */}
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-8 pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hyper text — letter scramble on the name */}
          <HyperText
            as="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            duration={1200}
            startOnView
            animateOnHover
          >
            Kaung Myat Shwe
          </HyperText>

          {/* Morphing roles */}
          <div className="flex justify-center">
            <MorphingText
              className="h-10 md:h-12 text-xl md:text-2xl lg:text-3xl text-foreground/80"
              texts={[
                "Full Stack Developer",
                "UI Engineer",
                "Problem Solver",
                "Builder",
              ]}
            />
          </div>

          {/* Intro line — blur in */}
          <TextAnimate
            as="p"
            by="word"
            animation="blurInUp"
            duration={1}
            delay={0.3}
            startOnView
            className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed"
          >
            I build things for the web — from polished frontends to robust backends.
            Based in Myanmar, shipping globally.
          </TextAnimate>
        </div>
      </div>

      {/* Scroll-driven text reveal — the core bio */}
      <TextReveal className="max-w-5xl mx-auto">
        I am a full-stack developer who cares deeply about craft. I write TypeScript and build interfaces with React and Next.js that feel fast and intentional. Every pixel, every transition, every API call — it all matters. I believe great software is built by developers who sweat the details, who think about the person on the other side of the screen. I am not just writing code. I am building experiences that people trust.
      </TextReveal>

      {/* Highlights — staggered entrance */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 py-24 space-y-6">
        <TextAnimate
          as="h3"
          by="character"
          animation="blurIn"
          duration={0.8}
          startOnView
          once
          className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/50 mb-8"
        >
          What I focus on
        </TextAnimate>

        <div className="space-y-5">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: 0.15 + i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-start gap-4 group"
            >
              <span className="mt-2 w-8 h-[1px] bg-foreground/20 group-hover:bg-foreground/50 group-hover:w-12 transition-all duration-300 shrink-0" />
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
