// Static seed data for the portfolio
// This data is used as fallback when GitHub API is unavailable

import type { Profile, Technology } from "./types";

// Developer profile information
export const profile: Profile = {
  name: "Kaung Myat Shwe",
  title: "Full Stack Developer",
  bio: "Passionate about building modern web applications with clean code and great user experiences. I love working with React, Next.js, and exploring new technologies.",
  avatar: "/images/profilePic.jpg",
  email: "kaungmyatshwe1@gmail.com",
  location: "Myanmar",
  social: {
    github: "https://github.com/kaungmyatshwe1397",
    linkedin: "https://linkedin.com/in/kaungmyat-shwe-017a6a363",
    twitter: "https://twitter.com/kaungmyatshwe",
    website: "https://kaungmyatshwe1397.vercel.app",
  },
};

// Technology stack
export const technologies: Technology[] = [
  // Languages
  { name: "TypeScript", icon: "SiTypescript", category: "language", proficiency: 5, color: "#3178C6" },
  { name: "JavaScript", icon: "SiJavascript", category: "language", proficiency: 5, color: "#F7DF1E" },
  { name: "C", icon: "SiC", category: "language", proficiency: 3, color: "#A8B9CC" },
  { name: "HTML", icon: "SiHtml5", category: "language", proficiency: 3, color: "#E34F26" },

  // Frameworks
  { name: "React", icon: "SiReact", category: "framework", proficiency: 5, color: "#61DAFB" },
  { name: "Next.js", icon: "SiNextdotjs", category: "framework", proficiency: 5, color: "#000000" },
  { name: "Node.js", icon: "SiNodedotjs", category: "framework", proficiency: 4, color: "#339933" },
  { name: "Express", icon: "SiExpress", category: "framework", proficiency: 4, color: "#000000" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", category: "framework", proficiency: 5, color: "#06B6D4" },

  // Tools
  { name: "Git", icon: "SiGit", category: "tool", proficiency: 5, color: "#F05032" },
  { name: "Docker", icon: "SiDocker", category: "tool", proficiency: 3, color: "#2496ED" },
  { name: "VS Code", icon: "VscCode", category: "tool", proficiency: 5, color: "#007ACC" },

  // Databases
  { name: "PostgreSQL", icon: "SiPostgresql", category: "database", proficiency: 4, color: "#4169E1" },
  { name: "SQLite", icon: "SiSqlite", category: "database", proficiency: 4, color: "#003B57" },
  { name: "Redis", icon: "SiRedis", category: "database", proficiency: 3, color: "#DC382D" },
  { name: "Prisma", icon: "SiPrisma", category: "database", proficiency: 4, color: "#2D3748" },
  { name: "TypeORM", icon: "SiTypeorm", category: "database", proficiency: 4, color: "#FE0803" },

  // Cloud
  { name: "AWS", icon: "FaAws", category: "cloud", proficiency: 3, color: "#FF9900" },
  { name: "Vercel", icon: "SiVercel", category: "cloud", proficiency: 5, color: "#000000" },
  { name: "Google Cloud", icon: "SiGooglecloud", category: "cloud", proficiency: 5, color: "#4285F4" },
];

// GitHub fallback data (used when API is unavailable)
export const githubFallback = {
  login: "kaungmyatshwe1397",
  name: "Kaung Myat Shwe",
  avatar_url: "/images/avatar/avatar.jpg",
  bio: "Full Stack Developer",
  public_repos: 15,
  followers: 50,
  following: 30,
  html_url: "https://github.com/kaungmyatshwe1397",
  created_at: "2020-01-01T00:00:00Z",
};
