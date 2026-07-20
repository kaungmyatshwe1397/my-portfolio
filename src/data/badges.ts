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
  {
    id: "load-balancing-compute-engine",
    title: "Implement Load Balancing on Compute Engine",
    issuer: "Google Cloud",
    link: "https://www.credly.com/badges/0d3f064b-b695-4d07-b8dd-b3f594e66bb1/public_url",
    image: "/images/badges/load-balancing-compute-engine.png",
  },
  {
    id: "app-dev-environment-gcp",
    title: "Set Up an App Dev Environment on Google Cloud",
    issuer: "Google Cloud",
    link: "https://www.credly.com/badges/c14461f6-c8b4-4e4a-80b6-72655e20246c/public_url",
    image: "/images/badges/app-dev-environment-gcp.png",
  },
];
