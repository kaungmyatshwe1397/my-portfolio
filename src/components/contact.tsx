// Contact section — clean, text-forward CTA with animated email and social links

"use client";

import { motion } from "framer-motion";
import { TextAnimate } from "@/components/ui/text-animate";
import { MapPin, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/seed-data";

// Social link icons
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

// Social links data — only real URLs, no dead links
const socialLinks = [
  { href: profile.social.github, label: "GitHub", icon: FaGithub },
  { href: profile.social.twitter, label: "X", icon: FaTwitter },
  { href: profile.social.linkedin, label: "LinkedIn", icon: FaLinkedin },
].filter((link): link is { href: string; label: string; icon: typeof FaGithub } => !!link.href && link.href !== "#");

// Stagger container
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Contact() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="max-w-3xl mx-auto space-y-12"
    >
      {/* Status line */}
      <motion.div variants={item} className="flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-sm text-foreground/60">
          Available for work
        </span>
        <span className="text-foreground/20">·</span>
        <span className="flex items-center gap-1.5 text-sm text-foreground/60">
          <MapPin className="w-3 h-3" />
          {profile.location || "Myanmar"}
        </span>
      </motion.div>

      {/* Intro text */}
      <motion.div variants={item}>
        <TextAnimate
          as="p"
          by="word"
          animation="blurInUp"
          duration={1}
          startOnView
          once
          className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl"
        >
          I am always open to new opportunities, collaborations, and interesting conversations. Whether you have a project in mind or just want to say hi — my inbox is open.
        </TextAnimate>
      </motion.div>

      {/* Email — the hero CTA */}
      <motion.div variants={item}>
        <motion.a
          href={`mailto:${profile.email}`}
          className="group inline-flex items-center gap-2 md:gap-3 text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground hover:text-foreground/80 transition-colors duration-200 break-all md:break-normal"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent group-hover:from-foreground/80 group-hover:to-foreground/50 transition-all duration-300">
            {profile.email}
          </span>
          <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 text-foreground/40 group-hover:text-foreground/70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
        </motion.a>
      </motion.div>

      {/* Divider */}
      <motion.div variants={item}>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      </motion.div>

      {/* Social links — clean horizontal row */}
      <motion.div variants={item} className="flex items-center gap-2">
        {socialLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={link.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -2 }}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-foreground/40 hover:text-foreground hover:bg-foreground/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 transition-all duration-200"
          >
            <link.icon className="w-4 h-4" />
          </motion.a>
        ))}

        {/* Email icon link */}
        <motion.a
          href={`mailto:${profile.email}`}
          aria-label="Email"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.54, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          className="flex items-center justify-center w-10 h-10 rounded-lg text-foreground/40 hover:text-foreground hover:bg-foreground/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 transition-all duration-200"
        >
          <FiMail className="w-4 h-4" />
        </motion.a>
      </motion.div>

      {/* Closing line */}
      <motion.p
        variants={item}
        className="text-xs text-foreground/30 tracking-wide"
      >
        Built with Next.js, Tailwind CSS, and a lot of coffee.
      </motion.p>
    </motion.div>
  );
}
