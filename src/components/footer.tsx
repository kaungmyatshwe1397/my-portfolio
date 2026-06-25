// Footer with social links and copyright

"use client";

import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { profile } from "@/lib/seed-data";

// Footer component with social links
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} {profile.name}. All rights reserved.
          </p>

          {/* Social Links */}
          <nav className="flex items-center gap-4" aria-label="Social links">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            )}
            {profile.social.twitter && (
              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-muted rounded-full transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
