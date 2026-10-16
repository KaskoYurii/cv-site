# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal CV site for Yurii Kasko: a single-page React 19 + TypeScript app built with Vite and Tailwind CSS v4, deployed on Vercel (https://kasko-yurii.vercel.app/).

## Commands

- `npm run dev`: start the Vite dev server
- `npm run build`: type-check (`tsc -b`), client build, SSR build of `src/entry-server.tsx`, then `scripts/prerender.js` writes the rendered English HTML into `dist/index.html`
- `npm run lint`: ESLint
- `npm run preview`: serve the production build

There are no tests.

## Content rules

All copy is CV content. Do not add facts, contacts, links, stack items, or claims the user has not supplied, even when they could be inferred from the code. Propose new content and wait for confirmation first.

## Design work

For any UI, visual, layout, or motion change, always load **all** of the design skills in `.claude/skills`, not just one:

- `frontend-design`
- `emil-design-eng`
- `ui-ux-pro-max`, including its `references/` files and search scripts
- `animation-vocabulary`
- `vercel-react-view-transitions`

Before writing code, agree on the direction with the user: palette tokens, type, and ASCII wireframes for desktop and mobile.

Current direction: agency / Awwwards style, chosen by the user. Light page `#ecedef` with black sections (experience, footer) and one cobalt accent. Unbounded is the display face (uppercase, huge), Onest is for text. Motion: Lenis smooth scroll, the hero name lines slide up from a mask on load, headings `[data-reveal]` once on scroll, the statement words light up via CSS `animation-timeline: view()`, the stack runs as a marquee, and a cursor dot with `mix-blend-difference` follows the mouse. Everything has a reduced-motion fallback in `global.css`.

## Architecture

- **i18n is hand-rolled.** There is no i18next. [src/lang.ts](src/lang.ts) imports `src/locales/en.json` and `ua.json`. `useLang()` returns `t` typed from `en.json` and reads the language from a small `useSyncExternalStore` store. Every key must exist in both files, and any change to the copy must be made in both languages. The language is stored in `localStorage` and defaults to `ua` for `uk*` browsers.
- **Prerender + hydration.** The page is rendered to static HTML at build time, and [src/main.tsx](src/main.tsx) hydrates it. The server snapshot is always English, and the stored language applies after hydration. Anything that touches `window`, `localStorage`, or `document` must run inside an effect or event handler, never at module level or during render, or the SSR build breaks. `.js [data-reveal]` hides headings only when JS runs (the `js` class is set inline in `index.html`).
- **Data outside the locales:**
  - Job ids, companies, and dates live in [src/components/jobs.ts](src/components/jobs.ts), ongoing first, then newest first. Their roles and bullets are keyed by job id under `experience` in the locale files.
  - Projects live in two places. [src/components/Projects.tsx](src/components/Projects.tsx) has an array with each project's id, url, stack, and optional screenshot. The text (name, role, one-line summary, achievements) lives under `projects.items.<id>` in the locale files. Screenshots are 1200×750 files in `public/projects/`, and `.gitignore` has explicit exceptions for them. If a product has no presentable UI yet, a drawn illustration is used instead (`illustration: true`).
  - The stack list is a plain array in [src/components/TechStack.tsx](src/components/TechStack.tsx), and the hero contacts are an array in [src/components/HeroSection.tsx](src/components/HeroSection.tsx).
- **Shared UI.** `focusRing` and `SectionTitle` live in [src/components/Section.tsx](src/components/Section.tsx).
- **Theme tokens** (`page`, `ink`, `muted`, `rule`, `accent`, `accent-soft`, `font-display`) live in `@theme` in [src/styles/global.css](src/styles/global.css). There is one color scheme.
- **Fonts** are self-hosted in `public/fonts`: Unbounded and Onest, variable, latin and cyrillic subsets (OFL). The latin files are preloaded in `index.html`.
- **App-level effects.** [src/App.tsx](src/App.tsx) starts Lenis (skipped under reduced motion) and the IntersectionObserver that adds `.is-in` to `[data-reveal]` elements.
- **GitHub graph.** It fetches from the third-party `github-contributions-api.jogruber.de` at runtime.
- **Path alias.** `@/` maps to `src/`.

## CV PDF

`public/CV-Yurii_kasko.pdf` is the downloadable CV (`cvHref` in `SiteHeader.tsx`). Its source is [cv/cv.html](cv/cv.html), a standalone A4 print page that is not part of the Vite build. When CV content changes, update `cv.html` and re-export the PDF.

## SEO

`og-preview.png` (1200×630) is referenced with a `?v=N` query string. Bump N when the image changes so link-preview caches refresh. `robots.txt`, `sitemap.xml`, and the `Person` JSON-LD in `index.html` are maintained by hand. The Ukrainian version is not indexed separately, and that is intentional for now.

The meta description, Open Graph, and Twitter tags are hard-coded in [index.html](index.html). Keep them in sync with the hero copy.
