import { ImageResponse } from 'next/og';

/**
 * Single global OG / Twitter card for every page on the site.
 * Next.js auto-injects `<meta property="og:image">` + the Twitter
 * variant from this file's URL.
 *
 * 1200x630 is the canonical Twitter / LinkedIn / Slack preview size.
 */
export const runtime = 'edge';
export const alt = 'Bitcoin Quantum — Bitcoin for the post-quantum era';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Brand palette (mirrors v2.css design tokens)
const BG       = '#F1F2F4';
const HEADLINE = '#0B5A8E';
const ACCENT   = '#35A4EA';
const INK      = '#14171C';
const INK_2    = '#4B515A';
const INK_3    = '#888F99';

export default async function Image() {
  // Pull Archivo (display) + Newsreader (italic flourish) at build time
  // so the OG image renders in the brand voice.
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
          padding: '72px 80px',
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
            width: 520,
            height: 520,
            backgroundImage: `radial-gradient(${ACCENT}22 2px, transparent 2px)`,
            backgroundSize: '24px 24px',
            opacity: 0.6,
          }}
        />

        {/* eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: ACCENT,
            fontSize: 22,
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          <div style={{ width: 3, height: 22, background: ACCENT, marginRight: 14 }} />
          POST-QUANTUM BITCOIN
        </div>

        {/* headline — Satori collapses inline whitespace between adjacent
            spans, so each "word" is its own flex item with gap for spaces. */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 104,
            fontWeight: 800,
            color: HEADLINE,
            letterSpacing: -3,
            lineHeight: 1.02,
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
              }}
            >
              secured
            </span>
            <span>for</span>
          </div>
          <span>the quantum era.</span>
        </div>

        {/* footer row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: INK_2,
            fontSize: 22,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', color: INK, fontWeight: 700 }}>
            <span style={{ color: INK }}>bitcoin</span>
            <span style={{ color: ACCENT, marginLeft: 6 }}>QUANTUM</span>
          </div>
          <div style={{ color: INK_3, fontSize: 18, letterSpacing: 2, textTransform: 'uppercase' }}>
            bitcoinquantum.com
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
