// Dock-style navbar with glassmorphism

"use client";

import { motion } from "framer-motion";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Home,
  Code2,
  GitFork,
  Mail,
} from "lucide-react";

// Navigation links with icons
const navLinks = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#skills", label: "Skills", icon: Code2 },
  { href: "#github", label: "GitHub", icon: GitFork },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.5 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <Dock
        direction="middle"
        iconSize={40}
        iconMagnification={56}
        className="bg-background/40 backdrop-blur-2xl border-white/10 shadow-lg shadow-black/10 rounded-2xl"
      >
        {navLinks.map((link) => (
          <DockIcon
            key={link.href}
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => scrollToSection(link.href)}
            aria-label={link.label}
          >
            <link.icon className="w-5 h-5" />
          </DockIcon>
        ))}
      </Dock>
    </motion.div>
  );
}
