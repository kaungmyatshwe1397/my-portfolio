// Animated background mesh — subtle drifting gradient orbs
// Sits behind all content, glassmorphism cards blur it beautifully

"use client";

import { motion } from "framer-motion";

// Each orb is a large soft gradient blob that drifts slowly
const orbs = [
  {
    color: "oklch(0.74 0.12 95 / 8%)", // brand — warm amber
    size: "40vw",
    x: ["15%", "25%", "10%", "15%"],
    y: ["10%", "30%", "20%", "10%"],
    duration: 25,
  },
  {
    color: "oklch(0.6 0.08 250 / 6%)", // cool blue
    size: "35vw",
    x: ["70%", "60%", "75%", "70%"],
    y: ["60%", "40%", "55%", "60%"],
    duration: 30,
  },
  {
    color: "oklch(0.74 0.12 95 / 5%)", // brand — fainter
    size: "30vw",
    x: ["50%", "40%", "55%", "50%"],
    y: ["80%", "70%", "85%", "80%"],
    duration: 22,
  },
];

export function BackgroundMesh() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(60px)",
            willChange: "transform",
          }}
          animate={{
            x: orb.x,
            y: orb.y,
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle noise texture — adds grain depth without competing */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
