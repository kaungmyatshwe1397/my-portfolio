// Contact section with email and social links

"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, GitFork, Link2, Globe } from "lucide-react";
import { profile } from "@/lib/seed-data";

// Social link button component
function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3 p-4 rounded-lg glass-card hover:bg-background/80 transition-colors"
      aria-label={label}
    >
      <Icon className="w-5 h-5 text-primary" />
      <span className="font-medium">{label}</span>
    </motion.a>
  );
}

// Contact section component
export function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Email CTA */}
      <Card className="glass-card p-8 text-center">
        <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
        <h3 className="text-2xl font-semibold mb-2">Let&apos;s Work Together</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          I&apos;m always open to new opportunities and interesting projects.
          Feel free to reach out!
        </p>
        <Button size="lg" className="rounded-full" onClick={() => window.location.href = `mailto:${profile.email}`}>
          <Mail className="w-5 h-5 mr-2" />
          Send Email
        </Button>
      </Card>

      {/* Social Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SocialLink
          href={profile.social.github}
          icon={GitFork}
          label="GitHub"
        />
        {profile.social.linkedin && (
          <SocialLink
            href={profile.social.linkedin}
            icon={Link2}
            label="LinkedIn"
          />
        )}
        {profile.social.twitter && (
          <SocialLink
            href={profile.social.twitter}
            icon={Globe}
            label="Twitter"
          />
        )}
        {profile.social.website && (
          <SocialLink
            href={profile.social.website}
            icon={Globe}
            label="Website"
          />
        )}
      </div>
    </motion.div>
  );
}
