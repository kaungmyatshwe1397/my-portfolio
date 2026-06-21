<!--
Sync Impact Report
Version change: N/A → 1.0.0 (initial ratification)
Modified principles: N/A (first version)
Added sections:
  - Core Principles (6 principles)
  - Development Constraints
  - Development Workflow
  - Governance
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ no changes needed (Constitution Check section is generic)
  - .specify/templates/spec-template.md ✅ no changes needed (already flexible)
  - .specify/templates/tasks-template.md ✅ no changes needed (test tasks already marked OPTIONAL)
Follow-up TODOs: None
-->

# My Portfolio Constitution

## Core Principles

### I. Clean Code

All code MUST be readable at a glance. Variable names MUST describe
what they hold. Function names MUST describe what they do. No clever
tricks — prefer the obvious solution over the clever one.

Rationale: This is a personal portfolio; clarity beats performance
optimization. Code is read more than it is written.

### II. No Over-Engineering

MUST NOT add abstractions, patterns, or infrastructure that the
current feature does not need. No premature optimization. No
"we might need this later" code. Build exactly what is needed now,
nothing more.

Rationale: A portfolio site is small. Extra layers add confusion
with zero benefit.

### III. Simple Comments

Every new function MUST have a short comment explaining what it
does in plain language. Comments MUST be written so a junior
developer can understand them. No jargon. No assumed context.
If a function does something non-obvious, explain why inline.

Rationale: Comments are for humans, not machines. Keep them short
and helpful.

### IV. No Tests

Tests are not required for this project. Do not add test files,
test frameworks, or test scripts unless explicitly asked.

Rationale: This is a personal portfolio, not a production service.
Manual verification is sufficient.

### V. Documentation Freshness

Documentation MUST be kept up to date with code changes. When
adding or changing a feature, verify docs still match reality.
Use Context7 MCP to check library/framework documentation is
current before referencing external APIs or patterns.

Rationale: Outdated docs are worse than no docs. Context7 MCP
provides live, version-accurate documentation.

### VI. Minimal Code

Every solution MUST use the fewest lines of practical code.
Prefer built-in APIs over libraries. Prefer one clear function
over three small ones if readability is not harmed. Delete dead
code immediately — do not comment it out.

Rationale: Less code means less to maintain, less to debug, and
easier onboarding.

## Development Constraints

- **Framework**: Whatever the plan specifies; no opinion imposed
  here.
- **Dependencies**: Minimize external packages. Only add a
  dependency if the built-in alternative is significantly worse.
- **File structure**: Flat when possible. Deep nesting MUST be
  justified by actual module boundaries.
- **Styling**: Keep CSS/utility classes minimal. No custom
  design systems unless the project demands it.

## Development Workflow

- Read the current plan before starting any feature.
- Check Context7 MCP for up-to-date docs on any library used.
- Write the minimum code to satisfy the requirement.
- Add a plain-language comment to every new function.
- Verify docs still match after changes.
- Commit with a clear message describing what changed and why.

## Governance

This constitution is the single source of truth for development
principles on this project. All implementation plans and specs
MUST comply with these principles.

**Amendment process**: Update this file, bump the version, update
`LAST_AMENDED_DATE`, and note the change in the Sync Impact Report
comment at the top.

**Versioning**: MAJOR for principle removals or redefinitions,
MINOR for new principles or material expansions, PATCH for
clarifications and wording fixes.

**Compliance**: Plan and spec templates include a Constitution Check
section. Every feature MUST pass that check before implementation
begins.

**Version**: 1.0.0 | **Ratified**: 2026-06-21 | **Last Amended**: 2026-06-21
