# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal CV site for Yurii Kasko: a single-page React 19 + TypeScript app built with Vite and Tailwind CSS v4, deployed on Vercel (https://kasko-yurii.vercel.app/).

## Commands

- `npm run dev`: start the Vite dev server
- `npm run build`: type-check (`tsc -b`), then production build
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

- **i18n is hand-rolled.** There is no i18next. [src/lang.ts](src/lang.ts) imports `src/locales/en.json` and `ua.json`, and `useLang()` returns `t` typed from `en.json`. Every key must exist in both files, and any change to the copy must be made in both languages. The language is stored in `localStorage` and defaults to `ua` for `uk*` browsers.
- **Data outside the locales:**
  - Job ids, companies, and dates live in [src/components/jobs.ts](src/components/jobs.ts), ongoing first, then newest first. Their roles and bullets are keyed by job id under `experience` in the locale files.
  - The stack list is a plain array in [src/components/TechStack.tsx](src/components/TechStack.tsx), and the hero contacts are an array in [src/components/HeroSection.tsx](src/components/HeroSection.tsx).
- **Shared UI.** `focusRing` and `SectionTitle` live in [src/components/Section.tsx](src/components/Section.tsx).
- **Theme tokens** (`page`, `ink`, `muted`, `rule`, `accent`, `accent-soft`, `font-display`) live in `@theme` in [src/styles/global.css](src/styles/global.css). There is one color scheme.
- **App-level effects.** [src/App.tsx](src/App.tsx) starts Lenis (skipped under reduced motion) and the IntersectionObserver that adds `.is-in` to `[data-reveal]` elements.
- **GitHub graph.** It fetches from the third-party `github-contributions-api.jogruber.de` at runtime.
- **Path alias.** `@/` maps to `src/`.

## CV PDF

`public/CV-Yurii_kasko.pdf` is the downloadable CV (`cvHref` in `SiteHeader.tsx`). Its source is [cv/cv.html](cv/cv.html), a standalone A4 print page that is not part of the Vite build. When CV content changes, update `cv.html` and re-export the PDF.

## SEO

The meta description, Open Graph, and Twitter tags are hard-coded in [index.html](index.html). Keep them in sync with the hero copy.
