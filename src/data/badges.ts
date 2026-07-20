export interface Badge {
  id: string;
  title: string;
  issuer: string;
  link: string;
  embedUrl?: string;
  image?: string;
}

export const badges: Badge[] = [
  {
    id: "ai-fluency-framework-foundations",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic Education",
    link: "https://verify.skilljar.com/c/48455ktuhkuf",
    image: "/images/badges/ai-fluency.png",
  },
  {
    id: "introduction-to-subagents",
    title: "Introduction to Subagents",
    issuer: "Anthropic Education",
    link: "https://verify.skilljar.com/c/zx84nhjv5ker",
    image: "/images/badges/introduction-to-subagents.jpg",
  },
  {
    id: "claude-code-101",
    title: "Claude Code 101",
    issuer: "Anthropic Education",
    link: "https://verify.skilljar.com/c/gxdussn42sso",
    image: "/images/badges/claude-code-101.jpg",
  },
];
