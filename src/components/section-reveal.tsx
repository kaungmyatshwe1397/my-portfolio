// Scroll-triggered section reveal — different character per section

"use client";

import { motion } from "framer-motion";

type SectionCharacter = "default" | "confident" | "intimate";

const variants = {
  default: {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  },
  confident: {
    hidden: { opacity: 0, y: 60, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
  intimate: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
};

const transitions = {
  default: { duration: 0.6, ease: "easeOut" as const },
  confident: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  intimate: { duration: 0.8, ease: "easeOut" as const },
};

export function SectionReveal({
  children,
  character = "default",
}: {
  children: React.ReactNode;
  character?: SectionCharacter;
}) {
  return (
    <motion.div
      variants={variants[character]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px" }}
      transition={transitions[character]}
    >
      {children}
    </motion.div>
  );
}
