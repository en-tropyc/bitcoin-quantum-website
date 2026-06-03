import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Shared renderer for the guides' Open Graph images so the hub and every
 * article card stay visually identical and any fix lands in one place.
 *
 * Fonts and the wordmark are read off disk (vendored in /public) rather than
 * fetched from a CDN, so image generation has no network dependency and can't
 * break on a CDN outage or a non-200 response.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const BG = '#F1F2F4';
const HEADLINE = '#0B5A8E';
const ACCENT = '#35A4EA';
const INK_3 = '#888F99';

const archivo = readFileSync(join(process.cwd(), 'public/fonts/archivo-800.woff'));
const logoSvg = readFileSync(join(process.cwd(), 'public/v2/logo-light.svg'), 'utf-8');
const LOGO_DATA_URL = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

export function renderGuideOg({ eyebrow, title }: { eyebrow: string; title: string }) {
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

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_DATA_URL} alt="Bitcoin Quantum" width={300} height={38} />

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: ACCENT,
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: 22,
              marginBottom: 24,
            }}
          >
            <div style={{ width: 3, height: 22, background: ACCENT, marginRight: 14 }} />
            {eyebrow}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 88,
              fontWeight: 800,
              color: HEADLINE,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            color: HEADLINE,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <span style={{ color: INK_3, fontWeight: 500, marginRight: 'auto', fontSize: 22 }}>
            bitcoinquantum.com/guides
          </span>
          bitcoinquantum.com
          <span style={{ display: 'flex', alignItems: 'center', fontSize: 32, marginLeft: 12 }}>→</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: 'Archivo', data: archivo, weight: 800, style: 'normal' }],
    }
  );
}
