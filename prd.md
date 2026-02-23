# prd.md

# Project Title
Scoold website replacement — Astro-based static product website (enterprise-focused)

## Overview / Vision
Replace the existing marketing site at https://scoold.com with a modern, fast, SEO-optimized, static site built with Astro, styled with Tailwind and daisyUI. The site must appeal to SME and enterprise buyers: professional, clean, light-theme only with subtle animations and SVG-first graphics. It must be static, fast to build, and deployable to GitHub Pages.

(Starting content and feature list was taken from the current site and used as the content baseline.) :contentReference[oaicite:5]{index=5}

---

## Goals & success metrics
- Feature parity with current marketing content (home, features, pricing, docs, blog, demo, FAQ).
- SEO: top technical checks pass — sitemap present, meta/OG tags, JSON-LD structured data on product pages.
- Performance: Lighthouse Performance >= 80 (goal >= 90 on subsequent optimization), First Contentful Paint < 1.5s on standard connections.
- Build time: faster than previous site builds (target: cold build < 45s for main branch on CI using Bun; note: Bun/ASTRO may show rough edges — validate early). :contentReference[oaicite:6]{index=6}
- CI / deployment: automatic deploy to GitHub Pages on `main` merge.

---

## Users & personas
1. **Engineering Manager (SME)** — evaluates security, SSO, enterprise features (LDAP, SAML, SCIM), wants clear deployment & hosting info.
2. **DevOps / Platform Engineer** — wants hosting options, Docker commands, cloud deploy steps.
3. **Product/Support Manager** — wants a knowledge base & documentation for internal adoption.
4. **Purchasing / Finance** — reviews pricing (Scoold Pro tiers) and license terms.

---

## Key pages / content structure
- `/` Landing / Home (hero, value props, features summary, CTA Download / Buy / Demo)
- `/features` (detailed features, comparison table for Free / Pro / Pro + Source)
- `/pricing` or  Buy CTAs (Pro tiers, one-time fees, EULA)
- `/blog` (collection of Markdown `.md` posts — supports `@tailwindcss/typography`)
- `/documentation` (Astro Starlight powered docs; run `npx astro add starlight` to scaffold / integrate). :contentReference[oaicite:7]{index=7}
- `/documentation/scoold-api` - A page rendering the OpenAPI 3.x schema as a list of interactive REST API endpoints
- `/demo` (link to demo instance https://demo.scoold.com)
- `/download` (links to the latest binary file on GitHub releases)
- `/faq` - Frequently asked questions
- `/sitemap.xml` (generated via `@astrojs/sitemap`). :contentReference[oaicite:8]{index=8}
- `/solutions/scoold-as-community-forum` - part of the "Solutions" section describing a specific use case for the product
- `/solutions/scoold-as-knowledge-base` - part of the "Solutions" section describing a specific use case for the product
- `/solutions/scoold-as-developer-hub` - part of the "Solutions" section describing a specific use case for the product
- `/solutions/scoold-as-support-center` - part of the "Solutions" section describing a specific use case for the product
- `/solutions/scoold-as-questions-and-answers-platform` - part of the "Solutions" section describing a specific use case for the product
- `/solutions/scoold-as-knowledge-sharing-platform` - part of the "Solutions" section describing a specific use case for the product
- `/comparison/scoold-vs-stack-overflow-for-teams` - part of the "Comparison" section describing how the product compares to another competing product
- `/comparison/scoold-vs-apache-answers` - part of the "Comparison" section describing how the product compares to another competing product
- `/comparison/scoold-vs-discourse` - part of the "Comparison" section describing how the product compares to another competing product
- `/integration-with/microsoft-teams` - part of the "Integrations" section describing how the product integrates with other popular products
- `/integration-with/slack` - part of the "Integrations" section describing how the product integrates with other popular products
- `/integration-with/mattermost` - part of the "Integrations" section describing how the product integrates with other popular products
- `/integration-with/zapier` - part of the "Integrations" section describing how the product integrates with other popular products
- `/imprint/impressum` - Legal info about the company behind Scoold - Erudika Ltd., https://erudika.com, VAT Number, Address, Phone.
  `/imprint/contact-us` - a simple contact form links to email, Gitter chat, Github, etc
- `/legal/privacy-policy` - GDPR-compliant privacy policy
- `/legal/terms-of-use` - Terms of Use
- `/legal/licenses` - Must have 2 tabs - "Scoold OSS" containing the Apache 2.0 Open Source license, and "Scoold PRO" containing the EULA
- `/open-source` - A small page highlighting the benefits of Scoold as an open source product - secruity, transparency, no vendor lock-in, etc.
- `/scoold-cloud` - A single page dedicated to describing the hosted version of Scoold Pro and it's features - pricing, availability, easy-of-use, etc. with links to https://cloud
- `/changelog` - a page which renders the Markdown from https://github.com/Erudika/scoold-pro/blob/master/CHANGELOG.md
---

## Functional requirements

### Core tech stack
- Static site generator: **Astro** (no React or SPA frameworks).
- Styling: **Tailwind CSS** + **daisyUI** components where appropriate.
- Build & runtime: **Bun** for speed (use `bun`). Validate integration early; Bun + Astro may require tweaks. :contentReference[oaicite:9]{index=9}
- Optional: **tsdown** for any TypeScript bundling step if we produce a library or want faster TypeScript builds (feasible; tsdown is recommended for library bundling). Validate compatibility with Bun/CI. :contentReference[oaicite:10]{index=10}
- SEO / sitemap: use `@astrojs/sitemap` integration to generate `sitemap.xml` automatically. :contentReference[oaicite:11]{index=11}
- Markdown blog support: ensure `@tailwindcss/typography` is added for readable posts (`bun add -D @tailwindcss/typography`).
- Docs: integrate Astro Starlight for `/documentation`. Use `npx astro add starlight`. :contentReference[oaicite:12]{index=12}

### Content & copy
- All marketing copy and UI text must be stored in **`src/data/site-data.json`** and imported everywhere.
- Provide a schema for `site-data.json` (see example below).
- Enforce in code review: no literal marketing strings in components.

### Design / UI
- Enterprise tone: clean, generous whitespace, neutral brand accent color(s).
- Light-only theme (no global dark mode). Dark color use permitted only in limited areas like footer or specific panels.
- SVG-first: use SVG icons & illustrations. Animations minimal & tasteful (CSS transitions + small, performant SVG animations).
- Use daisyUI components where they fit the design system; customize via Tailwind tokens for enterprise look.
- Images should be optimized and handled by Astro: use the `<Image/>` component in astro to load screenshots and other image files.
- SVG icons should be embedded if feasible (i.e. small enough)

### Accessibility & Internationalization
- WCAG 2.1 AA baseline.
- `lang` attributes and accessible semantics on all pages.
- Prepare for i18n later (content stored in JSON makes translation easy).

### Documentation
- `/documentation` to be built using Astro Starlight template and included in the same site build or as an integration that deploys with the site.

---

## Non-functional requirements
- Static output only; no server-side runtime required on production.
- Deployable to GitHub Pages (static artifacts).
- Build should be fast in CI — prefer Bun-based commands on CI runner, but include fallbacks to Node if critical integrations fail.
- DRY: central layout, components library, and site-data.json. Repetition flagged as a code-review blocker.
- SEO optimization: meta description for every page, structured data (JSON-LD for `Product` and `Organization`), Open Graph images per page (prefer auto-generation or static OG images).

---

## Security & Compliance
- No PII in static content.
- Cookie consent controls if any analytics/scripts included.
- CSP header recommendations included in deployment notes (optional for GitHub Pages but document recommended header values).

---

## Build & CI (example tasks & commands)
> Notes: Bun integration is feasible for Astro but test early; some Astro integrations may have rough edges. :contentReference[oaicite:13]{index=13}

- Local dev:
  - `bun run dev`
- Install deps:
  - `bun install`  (or `bun add -D @tailwindcss/typography` for typography plugin)
- Build:
  - `bun run build`
- Preview:
  - `bun run preview`

**Fallback:** all scripts and commands should be compatible with `npm`

---

## site-data.json — recommended schema + minimal example
All copy must be supplied here. Components read from these keys.

```json
{
  "site": {
    "title": "Scoold",
    "tagline": "The most efficient way to share knowledge within your team or organization",
    "description": "Scoold is open source and works great as a Q&A, forum, knowledge base or customer support platform. Deployable on premises or to any cloud.",
    "url": "https://scoold.com"
  },
  "hero": {
    "title": "The most efficient way to share knowledge within your team or organization",
    "subtitle": "Open source Q&A, forum, or knowledge base — deploy on-prem or to the cloud.",
    "primary_cta": {
      "label": "Download Free",
      "href": "https://github.com"
    },
    "secondary_cta": {
      "label": "Try demo!",
      "href": "https://demo.scoold.com"
    }
  },
  "features": [
    {
      "title": "Full-text search",
      "description": "Each post is indexed for fast and accurate search."
    },
    {
      "title": "LDAP, SAML, SCIM",
      "description": "Enterprise authentication and provisioning support for internal deployments."
    },
    {
      "title": "Reputation & badges",
      "description": "Built-in reputation system with badges and moderation tools."
    }
  ],
  "pricing": {
    "free_label": "Free",
    "pro_price": "€499",
    "pro_label": "Scoold Pro"
  },
  "faq": [
    {
      "q": "What is Scoold Pro and how is it different than Scoold?",
      "a": "Scoold is open source and free; Scoold Pro is a paid, fully supported edition with premium features."
    }
  ]
}