// Floating glass dock navbar

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
        whileHover={{ scale: 1.01, y: -2 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl rounded-2xl transition-all duration-500 ${
          isScrolled
            ? "bg-background/50 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/20"
            : "bg-background/20 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/10"
        }`}
      >
        <div className="px-5 md:px-8">
          <div className="flex items-center h-20">
            {/* Logo — left */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#hero");
              }}
              className="text-lg font-bold tracking-tight hover:text-amber-500 transition-colors shrink-0 w-20"
            >
              {profile.name.split(" ")[0]}
              <span className="text-amber-500">.</span>
            </a>

            {/* Desktop Navigation — centered, bigger buttons */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-3">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm px-6 py-3 h-auto rounded-xl bg-white/5 backdrop-blur-md border border-white/15 hover:bg-white/10 hover:border-white/25 hover:shadow-lg hover:shadow-black/10 transition-all"
                  >
                    {link.label}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Toggle — right */}
            <div className="flex items-center justify-end w-20">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-xl bg-white/5 backdrop-blur-md border border-white/15 hover:bg-white/10 hover:border-white/25"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </motion.div>
            </div>
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
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm rounded-2xl bg-background/50 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/20 p-4"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection(link.href)}
                  className="w-full justify-start rounded-xl bg-white/5 backdrop-blur-md border border-white/15 hover:bg-white/10 hover:border-white/25 py-3 h-auto"
                >
                  {link.label}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
