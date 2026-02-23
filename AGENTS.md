# AGENTS.md

# Project: Scoold site replacement — Astro + Tailwind (enterprise product site)

## Purpose
This document defines project agents (roles), their responsibilities, ownership boundaries, acceptance criteria, and communication patterns for the website rewrite that replaces the current site at https://scoold.com. Use this as the single source of truth for team responsibilities.

## High-level constraints (non-negotiable)
- Site must replace the existing site at the origin and preserve key pages (home, docs, blog, pricing/Buy, demo, FAQ). Source content and feature list used as starting point. :contentReference[oaicite:3]{index=3}
- Tech constraints: Astro (SSG), Tailwind CSS, daisyUI components where possible, no React or other SPA frameworks, Bun as runtime/build tool, use @astrojs/sitemap, support Markdown blog and Starlight docs. All copy must come from `src/data/site-data.json`.

---

## Agents & responsibilities

### Product Owner (PO)
- Final decision maker for product scope, copy approval, and sign-off on releases.
- Responsible for stakeholder communications and prioritization.
- Acceptance criteria owner for feature parity with existing site and enterprise tone.

**Deliverables:** Approved PRD, final copy, acceptance sign-off on releases.

---

### Project Manager (PM)
- Sprint planning, tasks, deadlines, weekly status notes.
- Maintains milestone board (issues labeled: `milestone/*`) and release checklist.

**Deliverables:** Milestone plan, risk register, deployment checklist.

---

### Lead Frontend Engineer (LFE)
- Implement Astro site, integrate Tailwind/daisyUI, ensure no React.
- Implement Bun-based build scripts and CI job(s).
- Implement `src/data/site-data.json` consumption pattern and components that read from it.
- Ensure page-level SEO, JSON-LD, and sitemap integration.

**Acceptance criteria:** passes Lighthouse SEO >= 90 for main landing page, builds with Bun, deploys to GitHub Pages.

---

### UI/UX Designer
- Produce enterprise-focused, light-theme UI (no dark theme except controlled sections).
- Deliver SVG assets (icons/graphics), motion specs (subtle animations).
- Produce component style library using daisyUI/Tailwind tokens.

**Deliverables:** Figma (or equivalent) file, exported SVGs, motion specs.

---

### Content Engineer / Copywriter
- Create `src/data/site-data.json` with structured keys (hero, features, pricing, FAQs, blog metadata).
- Ensure all marketing copy lives only in JSON; no hard-coded strings in templates.

**Deliverables:** `src/data/site-data.json` (PR-ready), blog post markdown examples.

---

### Documentation Engineer
- Add and configure Astro Starlight for `/documentation` and adapt the theme to site brand (light-only).
- Ensure docs content is integrated and builds with the rest of the site. :contentReference[oaicite:4]{index=4}

---

### DevOps / CI Engineer
- Implement GitHub Actions (or Bun-based pipeline) for:
  - `bun install` / deps,
  - `bunx --bun astro build` (or equivalent),
  - Sitemap generation via `@astrojs/sitemap`,
  - Publish to `gh-pages` branch.
- Ensure build artifacts are static and compatible with GitHub Pages.

**Deliverables:** CI pipeline, GitHub Pages deployment, rollout plan.

---

### QA / Accessibility Specialist
- Cross-browser checks, Lighthouse audits, accessibility (WCAG 2.1 AA).
- Automated regression checks (link checks, accessibility smoke tests).
- Validate sitemap and robots.txt.

**Acceptance criteria:** No critical A11y failures; automated smoke tests passing.

---

## Communication & workflow
- Repo branching model: `main` (production), `develop` (integration), feature branches `feat/<what>`.
- Code reviews required for every PR (1 reviewer + owner).
- Slack (or preferred) channel + weekly demo.
- Release cadence: per-PM decision; tag releases with semantic versions for the public site.

---

## Ownership matrix (RACI)
- Product decisions: PO (R), PM (A), LFE (C), Designer (C)
- SEO/metadata: LFE (R), Content (C), QA (A)
- Docs: Documentation Eng (R), PO (C)
- Build/CI: DevOps (R), LFE (C)

---

## Repetition / DRY policy
- All copy stored in `src/data/site-data.json` and imported by components.
- Shared components and layout template only defined once in `/src/components/`.
- Repetition flagged as a blocker (PRs must include a short note when similar content or code is duplicated).

---

## Incident & Rollback plan
- If a deploy causes critical regression, rollback to last `main` tag via GitHub Pages (revert PR + re-deploy).
- Maintain a manual snapshot of `gh-pages` build result for emergency rollbacks.
