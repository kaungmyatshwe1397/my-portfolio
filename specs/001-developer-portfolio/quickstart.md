# Quickstart Guide: Developer Portfolio

**Feature**: 001-developer-portfolio
**Date**: 2026-06-22

## Prerequisites

- Node.js 20.9 or later
- npm, pnpm, yarn, or bun package manager
- GitHub account (for API data)
- (Optional) GitHub Personal Access Token for higher API rate limits

## Setup

### 1. Create Next.js Project

```bash
npx create-next-app@latest my-portfolio --typescript --tailwind --app --src-dir
cd my-portfolio
```

### 2. Install Dependencies

```bash
# Production dependencies
npm install framer-motion lucide-react next-themes

# Dev dependencies
npm install --save-dev husky lint-staged prettier eslint-config-prettier

# shadcn/ui (adds to dependencies automatically)
npx shadcn@latest init
npx shadcn@latest add card badge avatar button skeleton dialog tooltip tabs

# Magic UI (adds to dependencies automatically)
npx magicui@latest init
npx magicui@latest add animated-beam dock theme-toggler particles magic-card marquee number-ticker orbiting-circles shimmer-button text-reveal
```

### 3. Setup Git Hooks (Husky + lint-staged)

```bash
# Initialize Husky
npx husky init

# Create pre-commit hook
echo 'npx lint-staged' > .husky/pre-commit
```

Create `lint-staged.config.js` in project root:

```javascript
// Runs linters on staged files before commit
module.exports = {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{css,json,md}": ["prettier --write"],
};
```

Add to `package.json`:

```json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{css,json,md}": ["prettier --write"]
  }
}
```

### 3. Configure Environment

Create `.env.local`:

```env
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-personal-access-token  # Optional, for higher rate limits
```

### 4. Add Seed Data

Create `src/lib/seed-data.ts` with your profile, projects, and tech stack data.

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the portfolio.

---

## Validation Scenarios

### Scenario 1: Profile Section Displays Correctly

**Steps**:
1. Open `http://localhost:3000`
2. Verify hero section shows name, title, avatar, and bio
3. Verify glassmorphism card effect is visible (frosted glass, backdrop blur)
4. Resize browser to 320px width — verify mobile layout

**Expected**: Profile information displays in a glassmorphism-styled card. Layout is responsive and readable on mobile.

---

### Scenario 2: Project Showcase Works

**Steps**:
1. Scroll to projects section
2. Verify project cards show thumbnail, title, description, and tags
3. Click a technology tag filter
4. Hover over a project card

**Expected**: Projects filter by tag with smooth animation. Hover reveals additional details with glassmorphism overlay.

---

### Scenario 3: GitHub Data Loads

**Steps**:
1. Scroll to GitHub section
2. Verify profile stats appear (repos, followers, stars)
3. Verify recent activity feed shows commits/PRs
4. Check browser Network tab for GitHub API calls

**Expected**: Real-time GitHub data displays within 3 seconds. Skeleton loaders show during loading.

---

### Scenario 4: GitHub API Failure Handling

**Steps**:
1. Disconnect network or set invalid GitHub username
2. Reload the page
3. Scroll to GitHub section

**Expected**: Graceful fallback message with link to GitHub profile. No broken layout or error crash.

---

### Scenario 5: Animations and Wow Factor

**Steps**:
1. Move cursor across hero section
2. Scroll through all sections
3. Interact with tech stack items

**Expected**: Parallax effects on hero, staggered reveal animations on scroll, interactive hover states on tech stack.

---

### Scenario 6: Build and Deploy

**Steps**:
```bash
npm run build
npm run start
```

**Expected**: Build completes without errors. Production server runs correctly at `http://localhost:3000`.

---

## Deployment

### Vercel (Recommended)

```bash
npx vercel
```

### Netlify

```bash
npm run build
# Deploy .next folder or use Netlify's Next.js runtime
```

### Cloudflare Pages

```bash
npm run build
# Deploy using Cloudflare's Next.js adapter
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| GitHub data not loading | Check `GITHUB_USERNAME` in `.env.local`. Verify username is correct. |
| Rate limit errors | Add `GITHUB_TOKEN` to `.env.local` for 5,000 req/hr limit. |
| Animations janky | Check browser DevTools Performance tab. Reduce motion if needed. |
| Build fails | Run `npm run lint` to find errors. Check TypeScript types. |
