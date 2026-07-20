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
    id: "anthropic-course",
    title: "Anthropic Course Certificate",
    issuer: "Anthropic",
    link: "https://www.anthropic.com",
    image: "/images/badges/anthropic.png",
  },
];
