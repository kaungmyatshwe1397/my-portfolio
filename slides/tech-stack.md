---
marp: true
paginate: true
transition: fade
---

<!-- slide 1 -->

# How this project is built

One idea per page: tech stack, agents, skills, methodology, trigger, commands.

---

<!-- slide 2 -->

# Tech stack

- **Next.js** for the app shell and static deployment
- **TypeScript** for safer component props and data flow
- **Tailwind CSS** for layout, spacing, and visual consistency
- **Shadcn** for UI components
- **motion** for animation motion and trasition and transformation

---

<!-- slide 3 -->

# Agents

- **CaludeCode** helps with code changes, reviews, and repo-aware edits
- **Subagents** For dead-code-detection

---

<!-- slide 4 -->

# Skills

- **Specs** define the feature before implementation starts
- **Plans** shape the design and architecture choices
- **Tasks** break the work into ordered, buildable steps

---

<!-- slide 5 -->

# Methodology

- Mainly Use Spec-Driven-Development with the help of Github speckit

---

<!-- slide 6 -->

# Trigger and commands

- NO AUTOMATIC TRIGGER AND COMMAND FOR AGENTS , SUB AGENTS AND SKILLS
- AUTOMATION CI CD WORKFOLLOW IS TRIGGERED WHEN GIT PUSH
