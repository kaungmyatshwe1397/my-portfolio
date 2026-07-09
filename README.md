# Kaung Myat Shwe — Developer Portfolio

**[Live → kaungmyatshwe1397.vercel.app](https://kaungmyatshwe1397.vercel.app)**

My personal portfolio — a single-page app showcasing who I am, what I work with, and what I'm building. Built as a scroll-driven experience with animated glassmorphism UI, real-time GitHub integration, and motion effects throughout. Every section loads with its own character — from a splash loading screen to scroll-triggered reveals that guide visitors through my profile naturally.

## What's Inside

| Section        | What it shows                                                            |
| -------------- | ------------------------------------------------------------------------ |
| **Hero**       | First impression — animated gradient mesh background with light rays     |
| **About**      | Who I am, with scroll-triggered text reveal effects                      |
| **Tech Stack** | Languages, frameworks, tools, databases, and cloud platforms I work with |
| **GitHub**     | Live contribution graph and pinned repos pulled from the GitHub API      |
| **Contact**    | Ways to reach me, plus social links                                      |

## Built With

- **Next.js 16** — App Router, Turbopack, server components
- **TypeScript** + **Tailwind CSS v4**
- **Framer Motion** — scroll-driven animations, section reveals, morphing text
- **shadcn/ui** + **Magic UI** — glassmorphism cards, marquees, particles, border beams
- **GitHub API** — real-time contributions and pinned repository data

## Running Locally

> For developers who want to fork or contribute.

```bash
git clone git@github.com:kaungmyatshwe1397/my-portfolio.git
cd my-portfolio
npm install
cp .env.example .env.local   # add your GitHub username + token
npm run dev                    # → http://localhost:3000
```

The GitHub token needs `read:user` scope. See [`.env.example`](.env.example) for the full format.

<details>
<summary>Other scripts</summary>

| Command               | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `npm run build`       | Production build                                         |
| `npm run start`       | Start production server                                  |
| `npm run lint`        | Run ESLint                                               |
| `npm run screenshots` | Capture section screenshots (dev server must be running) |

</details>

## Presentation

A [Marp](https://marp.app/) presentation about this portfolio — auto-deployed to GitHub Pages on every push to `main`.

**[View Slides → kaungmyatshwe1397.github.io/my-portfolio](https://kaungmyatshwe1397.github.io/my-portfolio/)**

Built as a PechaKucha-style deck (6 slides, 20s auto-advance) covering the design philosophy and goals behind the portfolio. Source lives at [`slides/presentationMarp.md`](slides/presentationMarp.md), with a companion tech stack deck at [`slides/techstack.md`](slides/techstack.md).

## Connect

- **GitHub**: [@kaungmyatshwe1397](https://github.com/kaungmyatshwe1397)
- **LinkedIn**: [kaungmyatshwe](https://linkedin.com/in/kaungmyat-shwe-017a6a363)
- **Twitter**: [@kaungmyatshwe](https://twitter.com/kaungmyatshwe)
- **Email**: kaungmyatshwe1@gmail.com

## License

MIT
