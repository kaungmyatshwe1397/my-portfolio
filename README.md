# Developer Portfolio

A modern, mobile-first developer portfolio website built with Next.js 16, shadcn/ui, Magic UI, Framer Motion, and Tailwind CSS.

## Features

- 🎨 **Glassmorphism Design** - Frosted glass UI effects
- 🌙 **Dark/Light Mode** - Animated theme toggle
- ⚡ **Real-time GitHub Data** - Stats, repos, and activity
- 🎭 **Spatial Animations** - Parallax, cursor-tracking, reveal effects
- 📱 **Mobile First** - Responsive from 320px to 4K
- ♿ **Accessible** - WCAG 2.1 AA compliant

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: shadcn/ui + Magic UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm, pnpm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone git@github.com:kaungmyatshwe1397/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your GitHub username and optional PAT

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Run Prettier
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with ThemeProvider
│   ├── page.tsx        # Main portfolio page
│   └── globals.css     # Global styles + glassmorphism
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── hero.tsx        # Hero section
│   ├── projects.tsx    # Project showcase
│   ├── project-card.tsx # Project card component
│   ├── github-stats.tsx # GitHub data
│   ├── tech-stack.tsx  # Tech stack visualization
│   ├── contact.tsx     # Contact section
│   ├── navbar.tsx      # Navigation
│   ├── footer.tsx      # Footer
│   └── loading-screen.tsx # Client-side loading splash
├── lib/
│   ├── github.ts       # GitHub API client
│   ├── seed-data.ts    # Static fallback data
│   ├── types.ts        # TypeScript interfaces
│   └── utils.ts        # Utility functions
└── pitch/
    └── slides.md       # Marp presentation slides
```

## CI/CD Workflows

### Marp Presentation Deployment

A GitHub Actions workflow (`.github/workflows/marp.presentation.yaml`) automatically converts the Marp presentation slides to HTML and deploys them to GitHub Pages on every push to `main`.

**How it works:**
1. Checks out the repository
2. Converts `pitch/slides.md` to HTML using `@marp-team/marp-cli`
3. Deploys the output to the `gh-pages` branch

The live presentation is available at: [GitHub Pages](https://kaungmyatshwe1397.github.io/my-portfolio/)

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kaungmyatshwe1397/my-portfolio)

### Netlify

```
```
## Customization
```
```
### Profile Data

Edit `src/lib/seed-data.ts` to update:
- Personal information
- Projects
- Tech stack

### Styling

- Glassmorphism classes in `src/app/globals.css`
- Theme colors in CSS variables
- Component styles in individual files

## License

MIT

## Author

**Kaung Myat Shwe**
- GitHub: [@kaungmyatshwe1397](https://github.com/kaungmyatshwe1397)
- LinkedIn: [kaungmyatshwe](https://linkedin.com/in/kaungmyatshwe)

## 📊 Presentation Slides
* [Chapter 3: PechaKucha Presentation (Live Slides)](https://kaungmyatshwe1397.github.io/my-portfolio/)
