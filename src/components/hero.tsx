// Hero section with profile card, avatar, and animated background

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/lib/seed-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, GitFork, Globe, Link2 } from "lucide-react";

// Hero section component with glassmorphism profile card
export function Hero() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient" />

      {/* Profile Card with glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card className="glass-card p-8 md:p-12">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50 shadow-xl"
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Name and Title */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl font-bold tracking-tight"
              >
                {profile.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-muted-foreground"
              >
                {profile.title}
              </motion.p>
            </div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground max-w-md leading-relaxed"
            >
              {profile.bio}
            </motion.p>

            {/* Location */}
            {profile.location && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </motion.div>
            )}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/50 hover:bg-background/80 transition-colors border border-border"
                aria-label="GitHub Profile"
              >
                <GitFork className="w-5 h-5" />
              </a>
              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-background/50 hover:bg-background/80 transition-colors border border-border"
                  aria-label="LinkedIn Profile"
                >
                  <Link2 className="w-5 h-5" />
                </a>
              )}
              {profile.social.twitter && (
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-background/50 hover:bg-background/80 transition-colors border border-border"
                  aria-label="Twitter Profile"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="p-3 rounded-full bg-background/50 hover:bg-background/80 transition-colors border border-border"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </motion.div>

            {/* CTA Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                Open to opportunities
              </Badge>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
