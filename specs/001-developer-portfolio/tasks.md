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

# Design Elevation: Cinematic Scroll Narrative

**Status**: Not Started
**Goal**: Transform from generic Magic UI template to premium cinematic scroll narrative
**Spec**: See "Design Elevation: Cinematic Scroll Narrative" section in spec.md

---

## Phase 9: Foundation — Remove Visual Noise

**Purpose**: Strip generic effects that make the site look like a template. Each removal should be verified — the site must still feel alive after each change.

- [x] T066 Remove `<Meteors>` component from `src/app/page.tsx` — delete the meteor effect div and import
- [x] T067 Remove `AnimatedShinyText` from all section headings in `src/app/page.tsx` — replace with standard typography
- [x] T068 Remove animated gradient background from `src/app/page.tsx` — replace with solid or subtle static background
- [x] T069 Remove `BorderBeam` usage from any component (check `src/components/github-bento.tsx` and others)
- [x] T070 Remove generic `whileHover={{ scale }}` from elements where it doesn't serve a purpose — save hover states for moments that matter
- [x] T071 Verify site still feels alive after all removals — check that particles, section-reveal, and cursor interactions still work

**Checkpoint**: Site is cleaner, less noisy. Effects that remain are intentional, not decorative.

---

## Phase 10: Design System — Accent Color & Typography

**Purpose**: Add one accent color to the monochrome design system. Refine typography hierarchy for premium feel.

- [x] T072 Choose an accent color — consider deriving from profile photo or a personal preference. Add to CSS custom properties in `src/app/globals.css` (both light and dark modes)
- [x] T073 Apply accent color intentionally — one place per section max. Examples: a link, a heading accent, a button, a hover state
- [x] T074 Refine typography scale in `src/app/globals.css` — ensure clear heading/body distinction with proper font sizes, weights, and line heights
- [x] T075 Refine section spacing — replace uniform `py-20` with varied spacing that creates rhythm (larger gaps between major sections, tighter within)
- [x] T076 Verify the design feels premium, not flat — the accent color should draw the eye, not decorate

**Checkpoint**: Design system is refined. Monochrome + accent feels intentional and premium.

---

## Phase 11: Hero — Scroll-Driven Signature Interaction

**Purpose**: Build the scroll-driven hero interaction — the missing piece that makes the portfolio memorable.

- [x] T077 Prototype 2-3 scroll-driven hero concepts using Framer Motion's `useScroll` and `useTransform` in `src/components/hero.tsx`. Options: text reveal on scroll, avatar morph, parallax depth layers
- [x] T078 Implement the chosen scroll-driven hero interaction — must feel cinematic, not gimmicky. The scroll should *be* the animation
- [x] T079 Add scroll progress indicator or visual cue that there's more below — subtle, not a "scroll down" arrow
- [x] T080 Ensure the hero interaction works on mobile (touch scroll) and doesn't cause performance issues
- [ ] T081 Verify the hero makes visitors pause — show to someone and ask "does this make you want to keep scrolling?"

**Checkpoint**: Hero has one signature scroll-driven interaction that feels premium and memorable.

---

## Phase 12: Section Transitions — Narrative Pacing

**Purpose**: Make transitions between sections feel like narrative bridges, not dividers. Create rhythm in the scroll experience.

- [x] T082 Redesign `SectionReveal` component — replace generic fade-up with a transition that matches the section's character. Skills section might reveal differently than GitHub section
- [x] T083 Add breathing room between sections — vary the spacing to create tempo (fast dense moments, slow cinematic pauses)
- [x] T084 Refine the loading screen → hero transition — should feel like a cinematic handoff, not a hard cut
- [x] T085 Add one "surprise" moment in the scroll — a section that breaks the pattern slightly (e.g., a different layout treatment, a moment of stillness)
- [ ] T086 Verify the scroll has *pacing* — it should feel like a story, not a document

**Checkpoint**: The scroll experience has narrative rhythm. Transitions feel considered, not template-driven.

---

## Phase 13: Polish — Micro-Interactions & Details

**Purpose**: Refine the details that make a site feel premium. Every interaction should feel inevitable.

- [x] T087 Audit all remaining hover states — each one should feel intentional, not default. Remove unnecessary ones, enhance the ones that matter
- [x] T088 Refine the navbar — ensure it feels like part of the narrative, not an overlay. Consider making it less prominent or context-aware
- [x] T089 Polish the contact section — it's the last impression. Make it feel like a natural ending, not an afterthought
- [x] T090 Verify mobile experience — all scroll interactions, spacing, and typography must work on mobile
- [ ] T091 Final review — open the site and feel *proud*. If any section feels template-driven, refine it

**Checkpoint**: Portfolio feels premium, personal, and memorable. Every detail is considered.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 9 (Remove Noise)**: No dependencies — start immediately. This is the foundation.
- **Phase 10 (Design System)**: Depends on Phase 9 — need clean slate before adding accent color
- **Phase 11 (Hero)**: Can start after Phase 9 — independent of design system work
- **Phase 12 (Transitions)**: Depends on Phase 9 — need clean sections before refining transitions
- **Phase 13 (Polish)**: Depends on all previous phases — final pass

### Parallel Opportunities

- T066, T067, T068, T069, T070 (Phase 9) can run in parallel — all are removals in different files
- T072, T074 (Phase 10) can run in parallel — accent color and typography are independent
- T077 (Phase 11) is sequential — prototype first, then implement
- T082, T083 (Phase 12) can run in parallel — different aspects of transitions

### Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Site feels empty after removing effects | High | Remove one at a time, verify after each. Keep particles. |
| Scroll-driven hero doesn't feel premium | High | Prototype 2-3 options, get feedback before committing |
| Accent color feels arbitrary | Medium | Derive from profile photo or meaningful choice, test with 2-3 options |
| Mobile scroll interaction is janky | Medium | Test on real devices early, use `useScroll` with proper throttling |
| Limited content feels stretched | Low | Narrative pacing handles this — curated, not empty

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create Next.js project, install dependencies, configure tooling

- [x] T001 Create Next.js 16 project with TypeScript, Tailwind CSS, App Router, and src directory: `npx create-next-app@latest my-portfolio --typescript --tailwind --app --src-dir`
- [x] T002 Install production dependencies: `npm install framer-motion lucide-react next-themes`
- [x] T003 Install dev dependencies: `npm install --save-dev husky lint-staged prettier eslint-config-prettier`
- [x] T004 Initialize shadcn/ui and add base components: `npx shadcn@latest init && npx shadcn@latest add card badge avatar button skeleton dialog tooltip tabs`
- [x] T005 Initialize Magic UI and add components: `npx shadcn@latest add @magicui/animated-beam @magicui/dock @magicui/particles @magicui/magic-card @magicui/marquee @magicui/number-ticker @magicui/orbiting-circles @magicui/shimmer-button @magicui/text-reveal`
- [x] T006 [P] Setup Husky git hooks: `npx husky init`, create `.husky/pre-commit` with `npx lint-staged`
- [x] T007 [P] Create `lint-staged.config.js` with ESLint + Prettier rules for staged files
- [x] T008 [P] Create `.env.local` file with `GITHUB_USERNAME` and `GITHUB_TOKEN` placeholders
- [x] T009 [P] Create `public/images/` directory structure for project thumbnails and avatar

**Checkpoint**: Project initialized, all dependencies installed, git hooks configured

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T010 [P] Create TypeScript interfaces for all entities in `src/lib/types.ts` (Profile, Project, Technology, GitHubProfile, GitHubRepo, GitHubEvent)
- [x] T011 [P] Create seed data file with profile, projects, and technologies in `src/lib/seed-data.ts`
- [x] T012 [P] Create utility functions (cn helper, formatters) in `src/lib/utils.ts`
- [x] T013 Create GitHub API client with fetch, cache, and fallback logic in `src/lib/github.ts`
- [x] T014 Create custom hook for GitHub data fetching with loading/error states in `src/hooks/use-github.ts`
- [x] T015 Configure global CSS with glassmorphism utilities, noise texture, and theme variables in `src/app/globals.css`
- [x] T016 Create root layout with ThemeProvider (next-themes), font setup, and metadata in `src/app/layout.tsx`
- [x] T017 Create main page component with section structure in `src/app/page.tsx`

**Checkpoint**: Foundation ready — data layer, types, utilities, and layout complete. User story implementation can now begin.

---

## Phase 3: User Story 1 — View Developer Profile (Priority: P1) 🎯 MVP

**Goal**: Display developer's profile information with glassmorphism styling, tech stack visualization, and responsive layout

**Independent Test**: Load homepage and verify name, title, bio, avatar, and tech stack display with glassmorphism styling and smooth animations on mobile and desktop

### Implementation for User Story 1

- [x] T018 [P] [US1] Create Hero section component with profile card, avatar, name, title, bio using glassmorphism styling in `src/components/hero.tsx`
- [x] T019 [P] [US1] Create TechStack section component with technology badges/cards and category grouping in `src/components/tech-stack.tsx`
- [x] T020 [US1] Integrate Magic UI OrbitingCircles for tech stack visualization around avatar in `src/components/tech-stack.tsx`
- [x] T021 [US1] Add Framer Motion scroll-triggered reveal animations (fade-up) for Hero section in `src/components/hero.tsx`
- [x] T022 [US1] Add Framer Motion staggered entrance animations for tech stack items in `src/components/tech-stack.tsx`
- [x] T023 [US1] Implement mobile-first responsive layout for Hero and TechStack sections (320px to 4K)
- [x] T024 [US1] Add glassmorphism CSS classes (backdrop-blur, border, opacity) in `src/app/globals.css`

**Checkpoint**: User Story 1 complete — profile section displays with glassmorphism, tech stack visualization, and responsive layout

---

## Phase 4: User Story 2 — Explore Project Showcase (Priority: P1)

**Goal**: Display project cards with filtering, hover effects, and links to live demos/source code

**Independent Test**: Navigate to projects section, verify cards show thumbnails, titles, descriptions, tags, and links. Test tag filtering and hover interactions.

### Implementation for User Story 2

- [x] T025 [P] [US2] Create ProjectCard component with thumbnail, title, description, tags, and links in `src/components/project-card.tsx`
- [x] T026 [US2] Create Projects section component with grid layout and tag filter buttons in `src/components/projects.tsx`
- [x] T027 [US2] Implement tag filtering logic with Framer Motion layout animations for smooth filtering in `src/components/projects.tsx`
- [x] T028 [US2] Add Magic UI MagicCard or NeonGradientCard effect to project cards in `src/components/project-card.tsx`
- [x] T029 [US2] Add Framer Motion hover/tap gesture animations for project card interactions in `src/components/project-card.tsx`
- [x] T030 [US2] Implement glassmorphism overlay effect on project card hover in `src/components/project-card.tsx`
- [x] T031 [US2] Add gradient placeholder for failed project images in `src/components/project-card.tsx`
- [x] T032 [US2] Ensure responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop) in `src/components/projects.tsx`

**Checkpoint**: User Story 2 complete — project showcase with filtering, hover effects, and responsive grid

---

## Phase 5: User Story 3 — View Real-Time GitHub Activity (Priority: P2)

**Goal**: Fetch and display GitHub profile stats, top repositories, and recent activity with loading/error states

**Independent Test**: Verify GitHub section shows profile stats, repos, followers, and recent activity. Test skeleton loading states and API failure fallback.

### Implementation for User Story 3

- [x] T033 [P] [US3] Create GitHubStats component with profile info, repo count, followers, stars display in `src/components/github-stats.tsx`
- [x] T034 [P] [US3] Create GitHubRepos component to display top repositories with stars and language in `src/components/github-repos.tsx`
- [x] T035 [P] [US3] Create GitHubActivity component to display recent commits/PRs feed in `src/components/github-activity.tsx`
- [x] T036 [US3] Integrate useGitHub hook with loading skeleton states using shadcn Skeleton in `src/components/github-stats.tsx`
- [x] T037 [US3] Add Magic UI NumberTicker for animated GitHub stat counters in `src/components/github-stats.tsx`
- [x] T038 [US3] Implement graceful fallback UI when GitHub API fails with link to profile in `src/components/github-stats.tsx`
- [x] T039 [US3] Add ISR revalidation configuration for GitHub data caching in `src/lib/github.ts`
- [x] T040 [US3] Integrate GitHub sections into main page with responsive layout in `src/app/page.tsx`

**Checkpoint**: User Story 3 complete — real-time GitHub data with animated stats, loading states, and error handling

---

## Phase 6: User Story 4 — Experience Spatial Animations and Wow Factor (Priority: P2)

**Goal**: Add immersive animations, parallax effects, cursor-tracking, and Magic UI visual effects

**Independent Test**: Scroll through site verifying parallax, cursor-tracking, reveal animations, and at least one standout interactive element (particles, orbiting circles, or animated beams)

### Implementation for User Story 4

- [x] T041 [P] [US4] Create Navbar component with Magic UI Dock for floating navigation in `src/components/navbar.tsx`
- [x] T042 [P] [US4] Add Magic UI ThemeToggler for animated dark/light mode switch in `src/components/navbar.tsx`
- [x] T043 [US4] Add Magic UI Particles background effect to Hero section in `src/components/hero.tsx`
- [x] T044 [US4] Implement Framer Motion parallax scrolling effect on Hero background elements in `src/components/hero.tsx`
- [x] T045 [US4] Add Framer Motion cursor-tracking 3D tilt effect on Hero card in `src/components/hero.tsx`
- [x] T046 [US4] Add Magic UI TextReveal animations for section headings on scroll in `src/components/hero.tsx`, `src/components/projects.tsx`
- [x] T047 [US4] Add Framer Motion scroll-triggered reveal animations to all sections in `src/app/page.tsx`
- [x] T048 [US4] Add Magic UI AnimatedBeam connecting elements (e.g., tech stack to projects) in `src/components/animated-beam-connector.tsx`
- [x] T049 [US4] Add Magic UI Marquee for infinite scrolling tech stack display in `src/components/tech-stack.tsx`
- [x] T050 [US4] Implement loading animation on first page load in `src/app/layout.tsx`

**Checkpoint**: User Story 4 complete — immersive spatial animations, parallax, cursor effects, and Magic UI wow factors

---

## Phase 7: User Story 5 — Contact and Connect (Priority: P3)

**Goal**: Display contact information and social links with glassmorphism styling

**Independent Test**: Verify contact section shows email, social links (LinkedIn, Twitter, GitHub) as glassmorphism-styled buttons. Test email mailto link and social profile links open correctly.

### Implementation for User Story 5

- [x] T051 [P] [US5] Create Contact section component with email and social media links in `src/components/contact.tsx`
- [x] T052 [US5] Add glassmorphism card styling to contact section in `src/components/contact.tsx`
- [x] T053 [US5] Add Framer Motion hover animations for contact buttons in `src/components/contact.tsx`
- [x] T054 [US5] Add Magic UI ShimmerButton or PulsatingButton for email CTA in `src/components/contact.tsx`
- [x] T055 [US5] Create Footer component with social links and copyright in `src/components/footer.tsx`
- [x] T056 [US5] Integrate Contact and Footer sections into main page in `src/app/page.tsx`

**Checkpoint**: User Story 5 complete — contact section with social links and footer

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final polish, accessibility, performance optimization, and deployment readiness

- [x] T057 [P] Add WCAG 2.1 AA accessibility: semantic HTML, ARIA labels, keyboard navigation across all components
- [x] T058 [P] Add light mode theme styling (adapted glassmorphism) in `src/app/globals.css`
- [x] T059 [P] Optimize images: convert to WebP, add lazy loading, use Next.js Image component
- [x] T060 [P] Add smooth scroll behavior and section navigation in `src/app/layout.tsx`
- [x] T061 Run Lighthouse audit and optimize for 90+ mobile score
- [x] T062 Verify all edge cases: API failures, image failures, slow connections, 320px width
- [x] T063 [P] Update `README.md` with setup instructions, environment variables, and deployment guide
- [x] T064 Run quickstart.md validation scenarios to verify all features work end-to-end
- [x] T065 Final build verification: `npm run build && npm run start`

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
