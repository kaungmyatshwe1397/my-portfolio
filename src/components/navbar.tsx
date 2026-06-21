// Floating glass dock navbar with entrance animation

"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/seed-data";

// Navigation links
const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

// Floating glass dock navbar
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Track scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Smooth scroll to section
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.2 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl rounded-2xl transition-all duration-500 ${
          isScrolled
            ? "glass-card shadow-2xl border-white/30"
            : "bg-background/20 backdrop-blur-md border border-white/10 shadow-lg"
        }`}
      >
        <div className="px-4 md:px-6">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="text-lg font-bold tracking-tight hover:text-primary transition-colors shrink-0"
            >
              {profile.name.split(" ")[0]}
              <span className="text-primary">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm glass-hover rounded-xl"
                >
                  {link.label}
                </Button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden glass-hover rounded-xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation — floating dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm glass-card rounded-2xl p-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                onClick={() => scrollToSection(link.href)}
                className="justify-start glass-hover rounded-xl"
              >
                {link.label}
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
