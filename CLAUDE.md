# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for **Bitcoin Quantum (BTQ)**, a quantum-resistant fork of Bitcoin (post-quantum signatures via CRYSTALS-Dilithium / ML-DSA / NIST FIPS 204; same 21M supply and proof-of-work). Pure Next.js 15 App Router site — no backend, no database, no API routes. Content is hardcoded in page components.

## Commands

```bash
npm run dev      # dev server with Turbopack (http://localhost:3000)
npm run build    # production build with Turbopack
npm start        # serve the production build
npm run lint     # eslint (flat config, next/core-web-vitals + next/typescript)
```

There is no test suite. There is no separate typecheck script — type errors surface during `build`.

## Architecture

### "v2" is the live site; `globals.css` is legacy

The codebase carries two parallel design systems. **Everything currently routed uses the v2 system.** Don't be misled by the older one:

- **`src/components/v2/v2.css`** — the active design system. All selectors are scoped under `.bqv2` so they can't leak. This is what every live page renders inside.
- **`src/app/globals.css`** — the older dark/cyan theme (`@theme inline`, `.gradient-text`, grid background). Imported by the root layout but largely vestigial. Don't build new UI against it.

The README.md is **stale** — it documents retired `/introduction` and `/resources` pages and the old design. Trust the code over the README. Retired routes are 301-redirected in `next.config.ts` (`/introduction → /`, `/resources → /testnet`, `/v2 → /`).

### v2 design-system primitives

Any new page must opt into the v2 system the same way existing pages do:

1. Wrap the page in an element with **both** the `bqv2` class and `className={v2FontClassName}` (from `src/components/v2/fonts.ts`), and `import '@/components/v2/v2.css'`.
2. `v2FontClassName` wires up the four `next/font/google` families as CSS variables: Archivo (`--display`), Newsreader (`--serif`), Hanken Grotesk (`--sans`), IBM Plex Mono (`--mono`). v2.css reads these variables — fonts will be wrong if the class is missing.
3. Shared chrome: **`V2Nav`** (top nav, links live in its `NAV_LINKS` array — update there when adding a route) and **`V2Footer`**.
4. **Theming** (`useTheme.ts`): light/dark is driven by a `data-theme` attribute set on every `.bqv2` root, persisted to `localStorage['bqv2-theme']`, falling back to `prefers-color-scheme`. An explicit user toggle locks the choice. `ThemeToggle` is the UI. Server always renders light, then the client syncs — expect a brief flash, and never rely on theme during SSR.
5. **Scroll reveals**: drop a `<RevealMount />` anywhere on the page and tag elements with `className="reveal"`. They fade/slide in via IntersectionObserver, respect `prefers-reduced-motion`, and a 2.5s safety timer force-reveals anything still hidden so a failed observer can't strand content invisibly.

`CryptographySection` is a shared content block used by both `/` and `/protocol`.

### Routes

`src/app/` — `/` (`page.tsx` → `V2Page.tsx`), `/protocol`, `/testnet`, `/faq`. Keep `sitemap.ts` in sync when adding/removing routes.

### Metadata & SEO

This site is SEO-heavy; treat metadata as load-bearing, not boilerplate.

- Root `layout.tsx` defines the title template (`%s | Bitcoin Quantum`), default OG/Twitter tags, `metadataBase`, and injects two JSON-LD blobs (Organization + WebSite) via the `JsonLd` component.
- Each server-component page exports its own `metadata` with a `title` (slots into the template), `description`, and `alternates.canonical`.
- **Client pages can't export `metadata`.** `/faq` is `'use client'`, so its metadata lives in a sibling `faq/layout.tsx`. Use this pattern for any interactive page.
- The home page uses `title: { absolute: ... }` to opt out of the template (so the brand isn't doubled).
- Other SEO infra: `robots.ts`, `manifest.ts`, `opengraph-image.tsx` (dynamic OG image), `sitemap.ts`.

### Config notes

`next.config.ts` holds the route redirects, security headers, image formats (avif/webp), and the one allowed remote image host (`explorer.bitcoinquantum.com`). React strict mode is on.

## Path alias

`@/*` → `src/*` (see `tsconfig.json`).
