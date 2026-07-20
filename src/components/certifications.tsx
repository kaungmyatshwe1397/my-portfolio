// Certifications section — floating badge cards with glow effects

"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { badges } from "@/data/badges";
import type { Badge } from "@/data/badges";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function BadgeCard({ badge }: { badge: Badge }) {
  return (
    <motion.a
      href={badge.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={card}
      className="badge-card group relative block rounded-2xl p-6 no-underline"
    >
      {/* Glow ring pseudo-element — handled via CSS class */}

      {/* Badge image or embed */}
      <div className="mx-auto mb-4 flex h-[130px] w-[130px] items-center justify-center">
        {badge.embedUrl ? (
          <iframe
            src={badge.embedUrl}
            title={badge.title}
            className="h-[130px] w-[130px] rounded-xl border-none"
            loading="lazy"
          />
        ) : badge.image ? (
          <img
            src={badge.image}
            alt={badge.title}
            className="max-h-[130px] max-w-[130px] rounded-xl object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex h-[130px] w-[130px] items-center justify-center rounded-xl bg-white/5 text-neutral-500">
            <ExternalLink className="h-8 w-8" />
          </div>
        )}
      </div>

      {/* Text */}
      <h3 className="text-base font-semibold text-white">{badge.title}</h3>
      <p className="mt-1 text-sm text-neutral-400">{badge.issuer}</p>
      <p className="mt-3 text-xs text-neutral-500 transition-colors group-hover:text-brand">
        View Credential →
      </p>
    </motion.a>
  );
}

export function Certifications() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {badges.map((badge) => (
        <BadgeCard key={badge.id} badge={badge} />
      ))}
    </motion.div>
  );
}
