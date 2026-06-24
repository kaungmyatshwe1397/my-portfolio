# Cinematic Scroll Narrative

## Problem Statement

How might we transform a technically solid but visually generic portfolio into something that feels premium, personal, and memorable — using scroll-driven storytelling as the primary differentiator, while preserving interaction-driven and ambient elements already in place?

## Recommended Direction

**Monolith + Story: A cinematic scroll narrative portfolio.**

The portfolio becomes a single, cohesive scroll experience with narrative pacing. The hero is one massive, confident statement with a signature scroll-driven reveal. Content below unfolds through story rhythm — fast dense moments, slow cinematic pauses, breathing room. Every micro-interaction feels considered, not added.

**What changes:**
- The hero becomes a scroll-driven cinematic moment (the missing piece)
- Effects are curated, not stacked — one signature interaction per section instead of seven layered effects
- The monochrome palette gets one accent color, used intentionally
- Transitions between sections become narrative bridges, not just dividers
- Typography and spacing do the heavy lifting; animation serves the story

**What stays:**
- Loading screen (it's a great first impression)
- Interaction-driven hover/cursor effects (already working well)
- Ambient effects like particles (already working well)
- Next.js + shadcn + Framer Motion stack
- Single-page architecture with anchor navigation
- GitHub API integration and data structure

**What gets removed or reduced:**
- Meteors effect (too generic, competes with particles)
- AnimatedShinyText on headings (template feel)
- BorderBeam (adds noise, not signal)
- Generic whileHover scale on everything (save hover states for moments that matter)
- Uniform py-20 spacing (sections should breathe differently)
- Animated gradient background (too busy, competes with content)

## Key Assumptions to Validate

- [ ] Scroll-driven hero interaction is achievable with Framer Motion's scroll APIs — Test with a simple proof-of-concept before full implementation
- [ ] Restraint reads as premium, not boring — Show the redesigned hero to 2-3 people and ask "does this feel premium or empty?"
- [ ] One accent color is enough visual interest — Validate that the monochrome + accent approach doesn't feel flat
- [ ] Narrative pacing works with limited content — Ensure the story doesn't feel stretched thin with current content

## MVP Scope

**In:**
- Redesigned hero with one scroll-driven signature interaction
- Curated effects (remove noise, keep signal)
- One accent color added to design system
- Section transitions that feel like narrative bridges
- Typography and spacing refinement
- Keep loading screen, interaction-driven, and ambient elements

**Out:**
- Full section-by-section redesign (hero first, then iterate)
- New page routes or structural changes
- Content creation (work with what exists)
- New dependencies or libraries

## Not Doing (and Why)

- **Not rebuilding from scratch** — The structure and component architecture are solid. We're elevating the design language, not rewriting the codebase.
- **Not adding more effects** — The problem is too many effects, not too few. Curation over accumulation.
- **Not creating a gallery-style experience** — Each section won't have a distinct visual identity. Consistency with one or two surprise moments is the goal.
- **Not changing the content strategy** — Limited content is fine for this approach. A narrative doesn't need a lot of content — it needs the right content, well-paced.
- **Not adding new dependencies** — Everything achievable with existing Framer Motion + CSS + current stack.

## Open Questions

- What is the signature scroll-driven interaction for the hero? (Morphing avatar? Text reveal? Parallax depth? Need to prototype 2-3 options.)
- Which accent color? (Needs to feel personal, not arbitrary. Could derive from the profile photo or a meaningful choice.)
- Which effects to keep vs. remove? (Particles stay — what about the gradient background?)
- How to handle the transition between loading screen and hero? (Currently a hard cut. Could be a cinematic handoff.)
