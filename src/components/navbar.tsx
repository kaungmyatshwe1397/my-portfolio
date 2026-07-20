// Dock-style navbar with glassmorphism

"use client";

import { motion } from "framer-motion";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Home,
  Code2,
  GitFork,
  Award,
  Mail,
} from "lucide-react";

// Navigation links with icons
const navLinks = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#skills", label: "Skills", icon: Code2 },
  { href: "#github", label: "GitHub", icon: GitFork },
  { href: "#certifications", label: "Certifications", icon: Award },
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
        className="bg-white/[0.08] backdrop-blur-[24px] saturate-180 border-white/[0.25] shadow-lg shadow-black/[0.25] rounded-2xl ring-1 ring-inset ring-white/[0.15]"
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
