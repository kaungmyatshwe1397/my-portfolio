// Footer — minimal, creative closing with back-to-top

"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/seed-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-foreground/[0.06]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Creative line */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <p className="text-sm text-foreground/50 font-mono">
              <span className="text-foreground/30">const</span>{" "}
              <span className="text-foreground/60">site</span>{" "}
              <span className="text-foreground/30">=</span>{" "}
              <span className="text-foreground/40">{"{"}</span>
            </p>
            <p className="text-sm text-foreground/50 font-mono pl-4">
              <span className="text-foreground/30">author</span>
              <span className="text-foreground/20">:</span>{" "}
              <span className="text-foreground/60">&quot;{profile.name}&quot;</span>
              <span className="text-foreground/20">,</span>
            </p>
            <p className="text-sm text-foreground/50 font-mono pl-4">
              <span className="text-foreground/30">year</span>
              <span className="text-foreground/20">:</span>{" "}
              <span className="text-foreground/60">{currentYear}</span>
              <span className="text-foreground/20">,</span>
            </p>
            <p className="text-sm text-foreground/50 font-mono pl-4">
              <span className="text-foreground/30">status</span>
              <span className="text-foreground/20">:</span>{" "}
              <span className="text-emerald-400/70">&quot;shipping&quot;</span>
            </p>
            <p className="text-sm text-foreground/50 font-mono">
              <span className="text-foreground/40">{"}"}</span>
              <span className="text-foreground/20">;</span>
            </p>
          </div>

          {/* Right: Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 text-sm text-foreground/30 hover:text-foreground/60 transition-colors duration-200 cursor-pointer"
            aria-label="Back to top"
          >
            <span className="font-mono">scrollTo(0)</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
