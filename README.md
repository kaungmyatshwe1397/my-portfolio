# Kaung Myat Shwe — Developer Portfolio

[![Deployed on Vercel](https://img.shields.io/badge/vercel-live-000?logo=vercel&logoColor=white)](https://kaungmyatshwe1397.vercel.app)
[![Next.js](https://img.shields.io/badge/next.js-16-000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/typeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

> A scroll-driven portfolio with animated glassmorphism UI, real-time GitHub integration, and motion effects. Every section loads with its own character — from a splash screen to scroll-triggered reveals.

## Sections

| | Section | Description |
| --- | --- | --- |
| 🌀 | **Hero** | Animated gradient mesh background with light rays |
| ✍️ | **About** | Scroll-triggered text reveal effects |
| 🧩 | **Tech Stack** | Languages, frameworks, tools, databases, and cloud platforms |
| 📊 | **GitHub** | Live contribution graph and pinned repos via GitHub API |
| 🏅 | **Certifications** | Badge cards with glow effects (Anthropic, Google Cloud) |
| 📬 | **Contact** | Social links and ways to reach me |

## Tech Stack

- **Next.js 16** — App Router, Turbopack, server components
- **TypeScript** + **Tailwind CSS v4**
- **Framer Motion** — scroll-driven animations, section reveals, morphing text
- **shadcn/ui** + **Magic UI** — glassmorphism cards, marquees, particles, border beams
- **GitHub API** — real-time contributions and pinned repository data

## Getting Started

```bash
git clone git@github.com:kaungmyatshwe1397/my-portfolio.git
cd my-portfolio
npm install
cp .env.example .env.local   # add your GitHub username + token
npm run dev                    # → http://localhost:3000
```

The GitHub token needs `read:user` scope — see [`.env.example`](.env.example).

<details>
<summary>All scripts</summary>

| Command               | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `npm run build`       | Production build                                         |
| `npm run start`       | Start production server                                  |
| `npm run lint`        | Run ESLint                                               |
| `npm run screenshots` | Capture section screenshots (dev server must be running) |

</details>

## Presentation

A [Marp](https://marp.app/) presentation auto-deployed to GitHub Pages on every push to `main`.

**[View Slides → kaungmyatshwe1397.github.io/my-portfolio](https://kaungmyatshwe1397.github.io/my-portfolio/)**

PechaKucha-style deck (6 slides, 20s auto-advance) covering the design philosophy. Source: [`slides/presentationMarp.md`](slides/presentationMarp.md) · Tech stack deck: [`slides/tech-stack.md`](slides/tech-stack.md).

## Analytics

Lightweight, privacy-friendly page analytics via [GoatCounter](https://www.goatcounter.com/) — tracks page views with zero cookies and no personal data collection.

## Connect

[![GitHub](https://img.shields.io/badge/-@kaungmyatshwe1397-181717?logo=github&logoColor=white)](https://github.com/kaungmyatshwe1397)
[![LinkedIn](https://img.shields.io/badge/-kaungmyatshwe-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/kaungmyat-shwe-017a6a363)
[![Twitter](https://img.shields.io/badge/-@kaungmyatshwe-1DA1F2?logo=x&logoColor=white)](https://twitter.com/kaungmyatshwe)
[![Email](https://img.shields.io/badge/kaungmyatshwe1-gmail.com-D14836?logo=gmail&logoColor=white)](mailto:kaungmyatshwe1@gmail.com)

## License

[MIT](./LICENSE)
