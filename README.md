# Bitcoin Quantum Website

Marketing site for **Bitcoin Quantum (BTQ)** — Bitcoin rebuilt on post-quantum cryptography. Same 21 million coins, same proof-of-work network, with signatures replaced by NIST-standardized post-quantum primitives (CRYSTALS-Dilithium / ML-DSA, FIPS 204).

Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4. It's a fully static marketing site — no backend, database, or API routes; content is authored directly in the page components.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm

### Development

```bash
npm install
npm run dev      # dev server with Turbopack → http://localhost:3000
```

### Production

```bash
npm run build    # production build with Turbopack
npm start        # serve the build
```

### Lint

```bash
npm run lint     # eslint (next/core-web-vitals + next/typescript)
```

There is no test suite, and type errors surface during `npm run build` (no separate typecheck script).

## Pages

| Route       | Source                            | Notes                                              |
| ----------- | --------------------------------- | -------------------------------------------------- |
| `/`         | `src/app/page.tsx` → `V2Page.tsx` | Homepage                                           |
| `/protocol` | `src/app/protocol/page.tsx`       | Architecture, UTXO model, post-quantum signatures  |
| `/testnet`  | `src/app/testnet/page.tsx`        | Run a node, mine, download BTQ Core                |
| `/faq`      | `src/app/faq/page.tsx`            | Interactive FAQ with category filtering            |

Retired routes are 301-redirected in `next.config.ts` (`/introduction → /`, `/resources → /testnet`, `/v2 → /`).

## Architecture

### Design system ("v2")

All live pages render inside the **v2 design system**, scoped under the `.bqv2` CSS class:

- **`src/components/v2/v2.css`** — the active styles, fully scoped under `.bqv2` so they can't leak.
- **`src/app/globals.css`** — an older theme, largely vestigial. New UI should be built against v2.

A page opts into v2 by wrapping its content in an element with the `bqv2` class plus `v2FontClassName`, and importing `v2.css`:

```tsx
import { v2FontClassName } from '@/components/v2/fonts';
import '@/components/v2/v2.css';

<div className={`bqv2 ${v2FontClassName}`} data-theme="light">…</div>
```

Key primitives in `src/components/v2/`:

- **`fonts.ts`** — wires four `next/font/google` families to CSS variables consumed by `v2.css`: Archivo (display), Newsreader (serif), Hanken Grotesk (sans), IBM Plex Mono (mono). Fonts render wrong if `v2FontClassName` is missing.
- **`V2Nav` / `V2Footer`** — shared page chrome. Nav links live in `V2Nav`'s `NAV_LINKS` array.
- **`useTheme.ts` / `ThemeToggle.tsx`** — light/dark via a `data-theme` attribute on each `.bqv2` root, persisted to `localStorage` (`bqv2-theme`), falling back to `prefers-color-scheme`. Server renders light, then the client syncs.
- **`RevealMount.tsx`** — drop it on a page and tag elements with `className="reveal"` for scroll-driven fade/slide-in (respects `prefers-reduced-motion`, with a safety timer so content can't stay hidden).
- **`CryptographySection.tsx`** — shared content block used by `/` and `/protocol`.

### Metadata & SEO

SEO is load-bearing on this site:

- Root `layout.tsx` sets the title template (`%s | Bitcoin Quantum`), default OG/Twitter tags, `metadataBase`, and injects JSON-LD (Organization + WebSite) via `JsonLd`.
- Each server-component page exports its own `metadata` (title, description, canonical).
- **Client pages can't export `metadata`** — `/faq` is `'use client'`, so its metadata lives in `faq/layout.tsx`. Use this pattern for interactive pages.
- SEO infra: `robots.ts`, `manifest.ts`, `sitemap.ts` (keep in sync with routes), and a dynamic `opengraph-image.tsx`.

### Path alias

`@/*` → `src/*` (see `tsconfig.json`).

## Deployment

Deployed on Vercel (includes `@vercel/analytics`). As a standard Next.js app it also runs on any platform supporting Next.js 15.
