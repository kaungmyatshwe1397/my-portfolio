import React, { type ComponentPropsWithoutRef, type CSSProperties } from "react"

import { cn } from "@/lib/utils"

// ── Shared shimmer styles ──
function shimmerStyle(
  shimmerColor: string,
  shimmerSize: string,
  shimmerDuration: string,
  borderRadius: string,
  background: string,
): CSSProperties {
  return {
    "--spread": "90deg",
    "--shimmer-color": shimmerColor,
    "--radius": borderRadius,
    "--speed": shimmerDuration,
    "--cut": shimmerSize,
    "--bg": background,
  } as CSSProperties
}

const shimmerBase = cn(
  "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-6 py-3 whitespace-nowrap text-white [background:var(--bg)]",
  "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px",
)

// ── Inner shimmer content (shared between button and link) ──
function ShimmerContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* spark container */}
      <div className="-z-30 blur-[2px] @container-[size] absolute inset-0 overflow-visible">
        {/* spark */}
        <div className="animate-shimmer-slide absolute inset-0 aspect-[1] h-[100cqh] rounded-none [mask:none]">
          <div className="animate-spin-around absolute -inset-full w-auto [translate:0_0] rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      {children}

      {/* Highlight */}
      <div
        className={cn(
          "absolute inset-0 size-full",
          "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]",
          "transform-gpu transition-all duration-300 ease-in-out",
          "group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]",
          "group-active:shadow-[inset_0_-10px_10px_#ffffff3f]",
        )}
      />

      {/* backdrop */}
      <div className="absolute inset-(--cut) -z-20 [border-radius:var(--radius)] [background:var(--bg)]" />
    </>
  )
}

// ── ShimmerButton (<button>) ──
export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      borderRadius = "100px",
      shimmerDuration = "3s",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        style={shimmerStyle(shimmerColor, shimmerSize, shimmerDuration, borderRadius, background)}
        className={cn(shimmerBase, className)}
        ref={ref}
        {...props}
      >
        <ShimmerContent>{children}</ShimmerContent>
      </button>
    )
  }
)

ShimmerButton.displayName = "ShimmerButton"

// ── ShimmerLink (<a>) — same visual, semantically correct for navigation ──
export interface ShimmerLinkProps extends ComponentPropsWithoutRef<"a"> {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ShimmerLink = React.forwardRef<
  HTMLAnchorElement,
  ShimmerLinkProps
>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.05em",
      borderRadius = "100px",
      shimmerDuration = "3s",
      background = "rgba(0, 0, 0, 1)",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <a
        style={shimmerStyle(shimmerColor, shimmerSize, shimmerDuration, borderRadius, background)}
        className={cn(shimmerBase, className)}
        ref={ref}
        {...props}
      >
        <ShimmerContent>{children}</ShimmerContent>
      </a>
    )
  }
)

ShimmerLink.displayName = "ShimmerLink"
