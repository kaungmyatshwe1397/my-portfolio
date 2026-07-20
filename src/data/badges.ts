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
];
