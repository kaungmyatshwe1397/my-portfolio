# Tasks: Developer Portfolio Website

**Input**: Design documents from `/specs/001-developer-portfolio/`

**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Not included (per constitution: No Tests principle)

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create Next.js project, install dependencies, configure tooling

- [ ] T001 Create Next.js 16 project with TypeScript, Tailwind CSS, App Router, and src directory: `npx create-next-app@latest my-portfolio --typescript --tailwind --app --src-dir`
- [ ] T002 Install production dependencies: `npm install framer-motion lucide-react next-themes`
- [ ] T003 Install dev dependencies: `npm install --save-dev husky lint-staged prettier eslint-config-prettier`
- [ ] T004 Initialize shadcn/ui and add base components: `npx shadcn@latest init && npx shadcn@latest add card badge avatar button skeleton dialog tooltip tabs`
- [ ] T005 Initialize Magic UI and add components: `npx magicui@latest init && npx magicui@latest add animated-beam dock theme-toggler particles magic-card marquee number-ticker orbiting-circles shimmer-button text-reveal`
- [ ] T006 [P] Setup Husky git hooks: `npx husky init`, create `.husky/pre-commit` with `npx lint-staged`
- [ ] T007 [P] Create `lint-staged.config.js` with ESLint + Prettier rules for staged files
- [ ] T008 [P] Create `.env.local` file with `GITHUB_USERNAME` and `GITHUB_TOKEN` placeholders
- [ ] T009 [P] Create `public/images/` directory structure for project thumbnails and avatar

**Checkpoint**: Project initialized, all dependencies installed, git hooks configured

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T010 [P] Create TypeScript interfaces for all entities in `src/lib/types.ts` (Profile, Project, Technology, GitHubProfile, GitHubRepo, GitHubEvent)
- [ ] T011 [P] Create seed data file with profile, projects, and technologies in `src/lib/seed-data.ts`
- [ ] T012 [P] Create utility functions (cn helper, formatters) in `src/lib/utils.ts`
- [ ] T013 Create GitHub API client with fetch, cache, and fallback logic in `src/lib/github.ts`
- [ ] T014 Create custom hook for GitHub data fetching with loading/error states in `src/hooks/use-github.ts`
- [ ] T015 Configure global CSS with glassmorphism utilities, noise texture, and theme variables in `src/app/globals.css`
- [ ] T016 Create root layout with ThemeProvider (next-themes), font setup, and metadata in `src/app/layout.tsx`
- [ ] T017 Create main page component with section structure in `src/app/page.tsx`

**Checkpoint**: Foundation ready — data layer, types, utilities, and layout complete. User story implementation can now begin.

---

## Phase 3: User Story 1 — View Developer Profile (Priority: P1) 🎯 MVP

**Goal**: Display developer's profile information with glassmorphism styling, tech stack visualization, and responsive layout

**Independent Test**: Load homepage and verify name, title, bio, avatar, and tech stack display with glassmorphism styling and smooth animations on mobile and desktop

### Implementation for User Story 1

- [ ] T018 [P] [US1] Create Hero section component with profile card, avatar, name, title, bio using glassmorphism styling in `src/components/hero.tsx`
- [ ] T019 [P] [US1] Create TechStack section component with technology badges/cards and category grouping in `src/components/tech-stack.tsx`
- [ ] T020 [US1] Integrate Magic UI OrbitingCircles for tech stack visualization around avatar in `src/components/tech-stack.tsx`
- [ ] T021 [US1] Add Framer Motion scroll-triggered reveal animations (fade-up) for Hero section in `src/components/hero.tsx`
- [ ] T022 [US1] Add Framer Motion staggered entrance animations for tech stack items in `src/components/tech-stack.tsx`
- [ ] T023 [US1] Implement mobile-first responsive layout for Hero and TechStack sections (320px to 4K)
- [ ] T024 [US1] Add glassmorphism CSS classes (backdrop-blur, border, opacity) in `src/app/globals.css`

**Checkpoint**: User Story 1 complete — profile section displays with glassmorphism, tech stack visualization, and responsive layout

---

## Phase 4: User Story 2 — Explore Project Showcase (Priority: P1)

**Goal**: Display project cards with filtering, hover effects, and links to live demos/source code

**Independent Test**: Navigate to projects section, verify cards show thumbnails, titles, descriptions, tags, and links. Test tag filtering and hover interactions.

### Implementation for User Story 2

- [ ] T025 [P] [US2] Create ProjectCard component with thumbnail, title, description, tags, and links in `src/components/project-card.tsx`
- [ ] T026 [US2] Create Projects section component with grid layout and tag filter buttons in `src/components/projects.tsx`
- [ ] T027 [US2] Implement tag filtering logic with Framer Motion layout animations for smooth filtering in `src/components/projects.tsx`
- [ ] T028 [US2] Add Magic UI MagicCard or NeonGradientCard effect to project cards in `src/components/project-card.tsx`
- [ ] T029 [US2] Add Framer Motion hover/tap gesture animations for project card interactions in `src/components/project-card.tsx`
- [ ] T030 [US2] Implement glassmorphism overlay effect on project card hover in `src/components/project-card.tsx`
- [ ] T031 [US2] Add gradient placeholder for failed project images in `src/components/project-card.tsx`
- [ ] T032 [US2] Ensure responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop) in `src/components/projects.tsx`

**Checkpoint**: User Story 2 complete — project showcase with filtering, hover effects, and responsive grid

---

## Phase 5: User Story 3 — View Real-Time GitHub Activity (Priority: P2)

**Goal**: Fetch and display GitHub profile stats, top repositories, and recent activity with loading/error states

**Independent Test**: Verify GitHub section shows profile stats, repos, followers, and recent activity. Test skeleton loading states and API failure fallback.

### Implementation for User Story 3

- [ ] T033 [P] [US3] Create GitHubStats component with profile info, repo count, followers, stars display in `src/components/github-stats.tsx`
- [ ] T034 [P] [US3] Create GitHubRepos component to display top repositories with stars and language in `src/components/github-repos.tsx`
- [ ] T035 [P] [US3] Create GitHubActivity component to display recent commits/PRs feed in `src/components/github-activity.tsx`
- [ ] T036 [US3] Integrate useGitHub hook with loading skeleton states using shadcn Skeleton in `src/components/github-stats.tsx`
- [ ] T037 [US3] Add Magic UI NumberTicker for animated GitHub stat counters in `src/components/github-stats.tsx`
- [ ] T038 [US3] Implement graceful fallback UI when GitHub API fails with link to profile in `src/components/github-stats.tsx`
- [ ] T039 [US3] Add ISR revalidation configuration for GitHub data caching in `src/lib/github.ts`
- [ ] T040 [US3] Integrate GitHub sections into main page with responsive layout in `src/app/page.tsx`

**Checkpoint**: User Story 3 complete — real-time GitHub data with animated stats, loading states, and error handling

---

## Phase 6: User Story 4 — Experience Spatial Animations and Wow Factor (Priority: P2)

**Goal**: Add immersive animations, parallax effects, cursor-tracking, and Magic UI visual effects

**Independent Test**: Scroll through site verifying parallax, cursor-tracking, reveal animations, and at least one standout interactive element (particles, orbiting circles, or animated beams)

### Implementation for User Story 4

- [ ] T041 [P] [US4] Create Navbar component with Magic UI Dock for floating navigation in `src/components/navbar.tsx`
- [ ] T042 [P] [US4] Add Magic UI ThemeToggler for animated dark/light mode switch in `src/components/navbar.tsx`
- [ ] T043 [US4] Add Magic UI Particles background effect to Hero section in `src/components/hero.tsx`
- [ ] T044 [US4] Implement Framer Motion parallax scrolling effect on Hero background elements in `src/components/hero.tsx`
- [ ] T045 [US4] Add Framer Motion cursor-tracking 3D tilt effect on Hero card in `src/components/hero.tsx`
- [ ] T046 [US4] Add Magic UI TextReveal animations for section headings on scroll in `src/components/hero.tsx`, `src/components/projects.tsx`
- [ ] T047 [US4] Add Framer Motion scroll-triggered reveal animations to all sections in `src/app/page.tsx`
- [ ] T048 [US4] Add Magic UI AnimatedBeam connecting elements (e.g., tech stack to projects) in `src/components/animated-beam-connector.tsx`
- [ ] T049 [US4] Add Magic UI Marquee for infinite scrolling tech stack display in `src/components/tech-stack.tsx`
- [ ] T050 [US4] Implement loading animation on first page load in `src/app/layout.tsx`

**Checkpoint**: User Story 4 complete — immersive spatial animations, parallax, cursor effects, and Magic UI wow factors

---

## Phase 7: User Story 5 — Contact and Connect (Priority: P3)

**Goal**: Display contact information and social links with glassmorphism styling

**Independent Test**: Verify contact section shows email, social links (LinkedIn, Twitter, GitHub) as glassmorphism-styled buttons. Test email mailto link and social profile links open correctly.

### Implementation for User Story 5

- [ ] T051 [P] [US5] Create Contact section component with email and social media links in `src/components/contact.tsx`
- [ ] T052 [US5] Add glassmorphism card styling to contact section in `src/components/contact.tsx`
- [ ] T053 [US5] Add Framer Motion hover animations for contact buttons in `src/components/contact.tsx`
- [ ] T054 [US5] Add Magic UI ShimmerButton or PulsatingButton for email CTA in `src/components/contact.tsx`
- [ ] T055 [US5] Create Footer component with social links and copyright in `src/components/footer.tsx`
- [ ] T056 [US5] Integrate Contact and Footer sections into main page in `src/app/page.tsx`

**Checkpoint**: User Story 5 complete — contact section with social links and footer

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final polish, accessibility, performance optimization, and deployment readiness

- [ ] T057 [P] Add WCAG 2.1 AA accessibility: semantic HTML, ARIA labels, keyboard navigation across all components
- [ ] T058 [P] Add light mode theme styling (adapted glassmorphism) in `src/app/globals.css`
- [ ] T059 [P] Optimize images: convert to WebP, add lazy loading, use Next.js Image component
- [ ] T060 [P] Add smooth scroll behavior and section navigation in `src/app/layout.tsx`
- [ ] T061 Run Lighthouse audit and optimize for 90+ mobile score
- [ ] T062 Verify all edge cases: API failures, image failures, slow connections, 320px width
- [ ] T063 [P] Update `README.md` with setup instructions, environment variables, and deployment guide
- [ ] T064 Run quickstart.md validation scenarios to verify all features work end-to-end
- [ ] T065 Final build verification: `npm run build && npm run start`

**Checkpoint**: Portfolio complete — accessible, performant, deployment-ready

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion — BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational (Phase 2) completion
  - US1 (Profile) and US2 (Projects) can run in parallel after Phase 2
  - US3 (GitHub) can run in parallel with US1/US2
  - US4 (Animations) can run in parallel but integrates across all components
  - US5 (Contact) can run in parallel after Phase 2
- **Polish (Phase 8)**: Depends on all user stories being complete

### User Story Dependencies

- **US1 (Profile)**: Can start after Phase 2 — no dependencies on other stories
- **US2 (Projects)**: Can start after Phase 2 — independent of US1
- **US3 (GitHub)**: Can start after Phase 2 — independent of US1/US2
- **US4 (Animations)**: Can start after Phase 2 — integrates with US1/US2/US3 components
- **US5 (Contact)**: Can start after Phase 2 — independent of all other stories

### Within Each User Story

- Components before integration
- Core functionality before animations
- Desktop layout before responsive refinements
- Story complete before moving to next priority

### Parallel Opportunities

- T006, T007, T008, T009 (Setup) can run in parallel
- T010, T011, T012 (Foundational types/data) can run in parallel
- T018, T019 (US1 components) can run in parallel
- T025, T026 (US2 components) can run in parallel
- T033, T034, T035 (US3 components) can run in parallel
- T041, T042 (US4 navbar components) can run in parallel
- T051, T055 (US5 components) can run in parallel
- T057, T058, T059, T060, T063 (Polish) can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all US1 component tasks together (after Phase 2):
Task T018: "Create Hero section component in src/components/hero.tsx"
Task T019: "Create TechStack section component in src/components/tech-stack.tsx"

# After components created, integrate animations:
Task T020: "Integrate OrbitingCircles in tech-stack.tsx"
Task T021: "Add scroll animations to hero.tsx"
Task T022: "Add stagger animations to tech-stack.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T009)
2. Complete Phase 2: Foundational (T010-T017)
3. Complete Phase 3: User Story 1 (T018-T024)
4. **STOP and VALIDATE**: Profile section works with glassmorphism and responsive layout
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add US1 (Profile) → Test → Deploy (MVP!)
3. Add US2 (Projects) → Test → Deploy
4. Add US3 (GitHub) → Test → Deploy
5. Add US4 (Animations) → Test → Deploy
6. Add US5 (Contact) → Test → Deploy
7. Polish → Final deploy

### Parallel Strategy

After Phase 2 completes:
- US1, US2, US3, US5 can all start in parallel
- US4 (Animations) integrates across all, so start after US1/US2 components exist

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- No test tasks included (per constitution: No Tests principle)
- All file paths use `src/` directory per Next.js App Router convention
