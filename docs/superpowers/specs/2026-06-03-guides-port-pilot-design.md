# Guides Port — Pilot Article Design

**Date:** 2026-06-03
**Status:** Pilot spec ready for review
**Branch:** `feat/guides-quantum-secure-bitcoin`

## Goal

Bring the long-form educational guides from `qdayanon-content-engine` into
bitcoinquantum.com, restyled into the site's `.bqv2` design system, lightly
edited into the @btc_quantum voice, with good social-share (OG) images.

This spec covers a **single pilot article** end-to-end as the approved template.
The remaining guides are explicitly out of scope here and follow once the pilot
is approved.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Scope | One pilot article, end-to-end (layout + voice + OG) |
| Pilot | `quantum-secure-bitcoin/signature-migration` ("From ECDSA to Dilithium", Guide 1) |
| Route | `/guides` (matches source paths; eases later redirects from qdayanon) |
| OG images | Dynamic per-article via Next `ImageResponse` |
| Voice | Restyle + light voice pass (no technical claims altered) |
| Authoring | Port JSX into a new v2 `GuideLayout` (no MDX, no new deps) |

## Source

- Layout: `frontend/src/app/(public)/guides/_components/GuideLayout.tsx` — qdayanon
  Victorian/sepia theme (`#2C1810`, `#F4ECD8`, `IM Fell DW Pica`, double borders),
  a `PublicHeader`, and a "Latest Dispatches" panel fetching qdayanon's API. **None
  of this comes over.**
- Article: `frontend/src/app/(public)/guides/quantum-secure-bitcoin/signature-migration/page.tsx`
  (~305 lines). Inline JSX prose, 7 TOC sections:
  1. Why ECDSA Breaks
  2. What Replaces It: CRYSTALS-Dilithium
  3. The Size Comparison
  4. New Opcodes for a New Signature
  5. Auto-Detection: Running Both in One Block
  6. Wallet Integration
  7. What Bitcoin Itself Is Doing

## Architecture

### Routes & files (new)

```
src/app/guides/
  page.tsx                                  → /guides  (hub: series intro + article list)
  _components/GuideLayout.tsx                  shared v2 layout
  quantum-secure-bitcoin/
    signature-migration/
      page.tsx                              → the pilot article
      opengraph-image.tsx                   → dynamic per-article OG image
```

Edits to existing files:
- `src/components/v2/V2Nav.tsx` — add `{ href: '/guides', label: 'Guides' }` to `NAV_LINKS`.
- `src/app/sitemap.ts` — add `/guides` and `/guides/quantum-secure-bitcoin/signature-migration`.
- `src/components/v2/v2.css` — add a scoped `.guide` prose block (see below).

### `GuideLayout` component

A server component, mirroring how other v2 pages are assembled.

- **Props:** `title: string`, `description: string`, `tableOfContents: {id,title}[]`,
  `children: React.ReactNode`.
- **Structure:** root `<div className={`bqv2 ${v2FontClassName}`}>` → `<V2Nav/>` →
  breadcrumb (Home / Guides / {title}) → header (title + description) → two-column
  body: sticky TOC `<aside>` + `<article className="guide">{children}</article>` →
  `<V2Footer/>` → `<RevealMount/>`.
- **Dropped from source:** `PublicHeader`, "Latest Dispatches", `/archives`/`/posts`
  links, all sepia styling and the serif body font.
- **Responsive:** single column on mobile (TOC collapses above content), two-column
  with sticky TOC at `lg`.

### `.guide` prose styles (in `v2.css`, scoped under `.bqv2 .guide`)

Token-driven, no new colors:
- `h2` — `var(--ink)` / `var(--display)`, bottom hairline `var(--line)`, scroll-margin
  for anchored TOC jumps.
- `p`, `li` — `var(--ink-2)`, readable measure (`max-width` ~70ch).
- `code`/`pre` — `var(--mono)`, `var(--bg-2)` surface, `var(--line)` border.
- `table` — bordered, `var(--line)`; used for the size-comparison section.
- `strong` — `var(--ink)`. `a` — `var(--accent-ink)`.

### Dynamic OG image (`opengraph-image.tsx`)

Extends the existing root `src/app/opengraph-image.tsx` template (same approach,
fonts, palette, wordmark — proven in this repo):
- `runtime = 'nodejs'`, `size = 1200×630`, `contentType = 'image/png'`.
- Loads Archivo 800 + Newsreader italic from the jsdelivr `@fontsource` URLs (as the
  root image already does); embeds `public/v2/logo-light.svg` as a data URL.
- Layout: wordmark top-left; eyebrow `GUIDE · QUANTUM-SECURE BITCOIN` in accent;
  the article title as the large Archivo headline; `bitcoinquantum.com →` bottom-right;
  faint accent dot-grid corner.
- Pilot title rendered: "From ECDSA to Dilithium".
- Article `metadata.openGraph.images` / `twitter.images` resolve to this file's route
  automatically (Next convention); `type: 'article'`.

### Page metadata (pilot)

Server component exporting `metadata`: templated `title`, description, `alternates.canonical`
= `/guides/quantum-secure-bitcoin/signature-migration`, `openGraph` (`type: 'article'`,
url, the dynamic image), `twitter` (`summary_large_image`). Mirrors the metadata pattern
already used by `/protocol` and `/testnet`.

### Guides hub (`/guides`)

A server component in the v2 system: short intro to the Quantum-Secure Bitcoin series
and a list of articles. **Only released articles are listed — unreleased guides are
omitted entirely** (no "coming soon" placeholders), keeping the page clean and not
visibly promising a full series before it ships. For the pilot that means a single
linked article: `signature-migration`. The list is data-driven (an array of released
articles) so adding a guide later is one entry. Its own `metadata` + canonical `/guides`.

## Voice pass (restyle + light)

Applied to the ported prose. **No technical claims, numbers, or section structure
change.** Edits limited to:
- Remove em dashes (voice-dna hard rule) → commas/periods/colons/parentheses.
- Remove any banned phrases and the "Not X. Y." negation pattern if present.
- Trim throat-clearing / filler sentences.
- Recolor sepia hex (`#2C1810`, `#8B4513`, `#F4ECD8`) → v2 tokens.
Reference: `docs/content/voice/voice-dna.md` (local, gitignored).

## Out of scope (follow-ups after pilot approval)

- The other 7 `quantum-secure-bitcoin` series articles.
- The 4 standalone guides (`bitcoin-quantum-security`, `quantum-secure-bitcoin` hub
  as a full guide, `post-quantum-cryptography`, `quantum-computing`).
- "Latest Dispatches" / any dynamic feed.
- 301 redirects from qdayanon source URLs.
- A full series index beyond the minimal hub.

## Testing / verification

- `npm run build` passes (no type errors; OG route compiles in the Node runtime).
- `npm run lint` clean.
- Manual: `/guides` and the pilot render in the v2 light/dark themes; TOC anchors jump
  correctly; OG image renders at `/guides/quantum-secure-bitcoin/signature-migration/opengraph-image`
  and previews correctly (1200×630).

## Risks

- **OG fonts fetched at build** from jsdelivr — same dependency the root OG image
  already accepts; acceptable.
- **Cross-branch `.gitignore`** — this branch re-adds the `/docs/whitepaper/` +
  `/docs/content/` ignores (also in PR #34). Identical additions; trivial merge.
