// Liquid Glass — Apple-inspired transparent glass with refraction and specular highlights

"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidGlassProps extends Omit<HTMLMotionProps<"div">, "whileHover"> {
  children: React.ReactNode;
  className?: string;
  /** Enable hover lift effect (default: true) */
  hover?: boolean;
}

export function LiquidGlass({
  children,
  className,
  hover = true,
  style,
  ...props
}: LiquidGlassProps) {
  return (
    <motion.div
      className={cn("relative rounded-2xl overflow-hidden", className)}
      whileHover={hover ? { y: -3 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          0 1px 4px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.08),
          inset 0 -1px 0 rgba(255, 255, 255, 0.03)
        `,
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        ...style,
      }}
      {...props}
    >
      {/* Specular highlight — light sweep across the surface */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl z-10"
        style={{
          background: `linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.35) 0%,
            rgba(255, 255, 255, 0.08) 30%,
            rgba(255, 255, 255, 0.02) 50%,
            rgba(255, 255, 255, 0.06) 70%,
            rgba(255, 255, 255, 0.2) 100%
          )`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}
