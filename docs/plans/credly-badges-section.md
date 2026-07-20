# Plan: Add Credly Badges & Certificates Section

**Related Issue:** [#1 — Add Credly Badges & Certificates Section](https://github.com/kaungmyatshwe1397/my-portfolio/issues/1)

---

## Overview

Add a new "Certifications" section to the portfolio that displays Credly badges and other certification links (e.g., Anthropic course badge) as floating cards with hover and glow effects in a 4-per-row responsive grid.

**Key principle:** This feature is purely additive. No existing components, styles, or logic will be modified.

---

## Architecture

### Data Layer

Create a new file `src/data/badges.ts` — a simple array of badge objects. Adding a new badge = adding one entry to this array. No code changes needed.

```ts
// src/data/badges.ts
export interface Badge {
  id: string
  title: string
  issuer: string
  link: string        // URL to the credential (Credly share link, Anthropic link, etc.)
  embedUrl?: string   // Optional: Credly embed URL for iframe rendering
  image?: string      // Optional: fallback image URL if no embed
}

export const badges: Badge[] = [
  {
    id: 'credly-1',
    title: 'Badge Name',
    issuer: 'Issuer',
    link: 'https://credly.com/badges/...',
    embedUrl: 'https://www.credly.com/embed/badges/...',
  },
  {
    id: 'anthropic-course',
    title: 'Anthropic Course Certificate',
    issuer: 'Anthropic',
    link: 'https://...',
    image: '/images/badges/anthropic.png',  // or external URL
  },
]
```

### Component: `Certifications`

Create `src/components/certifications.tsx` — a client component following existing patterns.

**Structure:**

```
Certifications (client component)
├── Section heading via MorphingText (same pattern as other sections)
├── Badge grid (CSS Grid, 4 columns on desktop)
│   ├── BadgeCard (floating card with glow)
│   │   ├── Badge image or Credly embed iframe
│   │   ├── Title + issuer text
│   │   └── "View Credential" link
│   └── ... (mapped from badges array)
```

### Page Integration

Add `<Certifications />` to `src/app/page.tsx`, wrapped in `<SectionReveal>` like all other sections. Place it **after the GitHub section and before the Contact section**.

```tsx
<SectionReveal character="confident">
  <Certifications />
</SectionReveal>
```

Add `id="certifications"` to the section for navbar anchor navigation. Update `src/components/navbar.tsx` to include a nav link to `#certifications`.

---

## Style & Design Specifications

### Layout

- **Grid:** CSS Grid with `grid-template-columns: repeat(4, 1fr)` on desktop (≥1024px)
- **Responsive:**
  - Desktop (≥1024px): 4 columns
  - Tablet (≥640px): 2 columns
  - Mobile (<640px): 1 column
- **Gap:** `gap-6` (24px) between cards
- **Max width:** Contained within the same `max-w-6xl mx-auto px-6` container used by other sections

### Badge Card — Floating Effect

Each card should feel like it's floating above the background:

```css
/* Base state */
.badge-card {
  position: relative;
  background: oklch(0.15 0 0 / 0.6);        /* semi-transparent dark */
  backdrop-filter: blur(12px);                /* frosted glass */
  border: 1px solid oklch(1 0 0 / 0.08);     /* subtle white border */
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  /* Subtle floating shadow */
  box-shadow: 0 4px 24px oklch(0 0 0 / 0.2),
              0 0 0 1px oklch(1 0 0 / 0.05);
}
```

### Badge Card — Hover Effect

On hover, the card lifts and glows:

```css
.badge-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px oklch(0 0 0 / 0.3),
              0 0 30px oklch(var(--brand) / 0.15),  /* brand glow */
              0 0 60px oklch(var(--brand) / 0.05);  /* outer glow spread */
  border-color: oklch(var(--brand) / 0.3);
}
```

### Badge Card — Glow Pulse (Optional Accent)

A subtle animated glow ring using the `--brand` color variable, applied via a `::before` pseudo-element:

```css
.badge-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 16px;
  background: conic-gradient(
    from 0deg,
    transparent,
    oklch(var(--brand) / 0.2),
    transparent
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
  filter: blur(8px);
}

.badge-card:hover::before {
  opacity: 1;
}
```

### Badge Image / Embed

- **Credly badges:** Render via `<iframe>` with Credly embed URL. Set `width="130"` `height="130"` (or responsive sizing). Style iframe with `border: none`, `border-radius: 12px`.
- **Non-Credly badges (Anthropic):** Render via `<img>` with `object-fit: contain`, `max-width: 130px`, `border-radius: 12px`.
- Image/embed container: centered within the card, with `margin-bottom: 16px`.

### Text Styles

- **Title:** `text-base font-semibold text-white` — bold, clear
- **Issuer:** `text-sm text-neutral-400` — subtle, secondary
- **"View Credential" link:** `text-xs text-neutral-500 hover:text-[oklch(var(--brand))]` — understated, brand color on hover
- Use Geist Sans (already loaded in the project)

### Section Heading

Follow the same pattern as other sections:
- Wrap in the section with `id="certifications"`
- Use `<MorphingText>` with relevant rotating strings, e.g.:
  - `["Certifications", "Badges", "Credentials", "Achievements"]`

### Animation

Use Framer Motion (already in the project) for entrance animations:
- **Staggered card reveal:** Cards animate in with `whileInView`, staggered by index
- **Initial state:** `opacity: 0, y: 30` (slight upward slide)
- **Animate state:** `opacity: 1, y: 0`
- **Easing:** `[0.22, 1, 0.36, 1]` (matches existing project easing)
- **Viewport:** `{ once: true, margin: "-80px" }` (matches existing pattern)

---

## Files to Create

| File | Purpose |
|---|---|
| `src/data/badges.ts` | Badge data array + Badge interface |
| `src/components/certifications.tsx` | Certifications section component |

## Files to Modify

| File | Change |
|---|---|
| `src/app/page.tsx` | Import and render `<Certifications />` wrapped in `<SectionReveal>`, placed after GitHub section |
| `src/components/navbar.tsx` | Add `#certifications` nav link |

> **Note:** These modifications are additive — no existing logic or styles are changed, only new elements are inserted.

---

## Acceptance Criteria

- [ ] New `Certifications` section appears between GitHub and Contact sections
- [ ] Badge data is defined in a separate `src/data/badges.ts` file — adding a badge = adding one object
- [ ] Credly badges render via iframe embed
- [ ] Non-Credly badges (Anthropic) render via image
- [ ] Cards float with `translateY(-8px)` on hover
- [ ] Glow effect using `--brand` color on hover
- [ ] 4-column grid on desktop, 2 on tablet, 1 on mobile
- [ ] Staggered entrance animation via Framer Motion
- [ ] Section is accessible via navbar anchor `#certifications`
- [ ] No existing components, styles, or logic are broken

---

## Implementation Order

1. Create `src/data/badges.ts` with the Badge interface and initial badge entries
2. Create `src/components/certifications.tsx` with the full section (grid, cards, animations, hover/glow effects)
3. Update `src/app/page.tsx` to import and render the new section
4. Update `src/components/navbar.tsx` to add the certifications nav link
5. Test responsive behavior at all breakpoints
6. Verify no existing functionality is broken
