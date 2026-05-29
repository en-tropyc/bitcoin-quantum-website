import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Single global OG / Twitter card for every page on the site.
 * Next.js auto-injects `<meta property="og:image">` + the Twitter
 * variant from this file's URL.
 *
 * 1200x630 is the canonical Twitter / LinkedIn / Slack preview size.
 *
 * Runs in the Node runtime (not edge) so we can read the real logo
 * SVG off disk and embed it instead of re-typing a wordmark.
 */
export const runtime = 'nodejs';
export const alt = 'Bitcoin Quantum — Bitcoin for the post-quantum era';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Brand palette (mirrors v2.css design tokens)
const BG       = '#F1F2F4';
const HEADLINE = '#0B5A8E';
const ACCENT   = '#35A4EA';
const INK_3    = '#888F99';

// Real wordmark from /public/v2 → data URL so Satori can render it.
const logoSvg = readFileSync(
  join(process.cwd(), 'public/v2/logo-light.svg'),
  'utf-8'
);
const LOGO_DATA_URL = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

export default async function Image() {
  // @fontsource via jsdelivr has stable URLs (Google Fonts hashed
  // paths change). Pulling the Latin subset binaries at build time.
  const [archivo, newsreaderItalic] = await Promise.all([
    fetch('https://cdn.jsdelivr.net/npm/@fontsource/archivo@5/files/archivo-latin-800-normal.woff')
      .then((r) => r.arrayBuffer()),
    fetch('https://cdn.jsdelivr.net/npm/@fontsource/newsreader@5/files/newsreader-latin-500-italic.woff')
      .then((r) => r.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: '64px 80px',
          fontFamily: 'Archivo',
          position: 'relative',
        }}
      >
        {/* faint accent dot grid in the corner */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 540,
            height: 540,
            backgroundImage: `radial-gradient(${ACCENT}22 2px, transparent 2px)`,
            backgroundSize: '24px 24px',
            opacity: 0.65,
          }}
        />

        {/* top — real Bitcoin Quantum wordmark */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_DATA_URL}
          alt="Bitcoin Quantum"
          width={356}
          height={45}
        />

        {/* middle — headline. Satori collapses inline whitespace
            between adjacent spans, so each word is its own flex item
            with `gap` providing the spaces. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 102,
            fontWeight: 800,
            color: HEADLINE,
            letterSpacing: -3,
            lineHeight: 1.04,
            maxWidth: 1000,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.28em' }}>
            <span>Bitcoin,</span>
            <span
              style={{
                fontFamily: 'Newsreader',
                fontStyle: 'italic',
                fontWeight: 500,
                letterSpacing: -1,
                /* Satori's baseline lands each font on its own
                   intrinsic baseline, which makes Newsreader's smaller
                   x-height sit visibly higher than the surrounding
                   Archivo. Nudge it down to share the visual baseline. */
                transform: 'translateY(11px)',
              }}
            >
              secured
            </span>
            <span>for</span>
          </div>
          <span>the quantum era.</span>
        </div>

        {/* bottom — eyebrow tag and URL CTA */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: ACCENT,
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            <div style={{ width: 3, height: 22, background: ACCENT, marginRight: 14 }} />
            POST-QUANTUM BITCOIN
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: HEADLINE,
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            bitcoinquantum.com
            <span style={{ display: 'flex', alignItems: 'center', fontSize: 32 }}>→</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Archivo', data: archivo, weight: 800, style: 'normal' },
        { name: 'Newsreader', data: newsreaderItalic, weight: 500, style: 'italic' },
      ],
    }
  );
}
