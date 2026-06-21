// Static seed data for the portfolio
// This data is used as fallback when GitHub API is unavailable

import type { Profile, Project, Technology } from "./types";

// Developer profile information
export const profile: Profile = {
  name: "Kaung Myat Shwe",
  title: "Full Stack Developer",
  bio: "Passionate about building modern web applications with clean code and great user experiences. I love working with React, Next.js, and exploring new technologies.",
  avatar: "/images/profilePic.jpg",
  email: "kaungmyatshwe@example.com",
  location: "Myanmar",
  social: {
    github: "https://github.com/kaungmyatshwe1397",
    linkedin: "https://linkedin.com/in/kaungmyatshwe",
    twitter: "https://twitter.com/kaungmyatshwe",
    website: "https://kaungmyatshwe.dev",
  },
};

// Portfolio projects
export const projects: Project[] = [
  {
    id: "portfolio-website",
    title: "Developer Portfolio",
    description:
      "Modern portfolio website with glassmorphism UI, real-time GitHub data, and spatial animations.",
    longDescription:
      "A sleek, mobile-first portfolio built with Next.js 16, shadcn/ui, Magic UI, and Framer Motion. Features include real-time GitHub integration, dark/light theme toggle, and immersive animations.",
    thumbnail: "/images/projects/portfolio.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://kaungmyatshwe.dev",
    sourceUrl: "https://github.com/kaung-myat-shwe/portfolio",
    featured: true,
    sortOrder: 1,
  },
  {
    id: "task-manager",
    title: "Task Manager App",
    description:
      "A productivity app for managing tasks with drag-and-drop, tags, and team collaboration.",
    thumbnail: "/images/projects/task-manager.jpg",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "#",
    sourceUrl: "https://github.com/kaung-myat-shwe/task-manager",
    featured: true,
    sortOrder: 2,
  },
  {
    id: "e-commerce",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce platform with payment integration, admin dashboard, and real-time inventory.",
    thumbnail: "/images/projects/ecommerce.jpg",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Prisma"],
    liveUrl: "#",
    sourceUrl: "https://github.com/kaung-myat-shwe/ecommerce",
    featured: true,
    sortOrder: 3,
  },
  {
    id: "weather-app",
    title: "Weather Dashboard",
    description:
      "Beautiful weather dashboard with forecasts, maps, and location-based weather data.",
    thumbnail: "/images/projects/weather.jpg",
    tags: ["React", "OpenWeather API", "Chart.js"],
    liveUrl: "#",
    sourceUrl: "https://github.com/kaung-myat-shwe/weather-app",
    featured: false,
    sortOrder: 4,
  },
];

// Technology stack
export const technologies: Technology[] = [
  // Languages
  { name: "TypeScript", icon: "FileCode", category: "language", proficiency: 5 },
  { name: "JavaScript", icon: "Braces", category: "language", proficiency: 5 },
  { name: "C", icon: "Terminal", category: "language", proficiency: 3 },
  { name: "HTML", icon: "Terminal", category: "language", proficiency: 3 },
  
  

  // Frameworks
  { name: "React", icon: "Atom", category: "framework", proficiency: 5 },
  { name: "Next.js", icon: "Layers", category: "framework", proficiency: 5 },
  { name: "Node.js", icon: "Server", category: "framework", proficiency: 4 },
  { name: "Express", icon: "Route", category: "framework", proficiency: 4 },
  { name: "Tailwind CSS", icon: "Paintbrush", category: "framework", proficiency: 5 },

  // Tools
  { name: "Git", icon: "GitBranch", category: "tool", proficiency: 5 },
  { name: "Docker", icon: "Container", category: "tool", proficiency: 3 },
  { name: "VS Code", icon: "Code", category: "tool", proficiency: 5 },

  // Databases
  { name: "PostgreSQL", icon: "Database", category: "database", proficiency: 4 },
  { name: "Bettersqlite", icon: "HardDrive", category: "database", proficiency: 4 },
  { name: "Redis", icon: "Zap", category: "database", proficiency: 3 },
  { name: "Prisma", icon: "Database", category: "database", proficiency: 4 },
  { name: "TypeORM", icon: "Database", category: "database", proficiency: 4 },

  // Cloud
  { name: "AWS", icon: "Cloud", category: "cloud", proficiency: 3 },
  { name: "Vercel", icon: "Triangle", category: "cloud", proficiency: 5 },
  { name: "GoogleCloud", icon: "Cloud", category: "cloud", proficiency: 5 },
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
