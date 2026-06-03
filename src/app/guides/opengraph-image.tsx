import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Bitcoin Quantum — Quantum-Secure Bitcoin guides';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG       = '#F1F2F4';
const HEADLINE = '#0B5A8E';
const ACCENT   = '#35A4EA';
const INK_3    = '#888F99';

const EYEBROW = 'GUIDES';
const TITLE   = 'Quantum-Secure Bitcoin';

const logoSvg = readFileSync(
  join(process.cwd(), 'public/v2/logo-light.svg'),
  'utf-8'
);
const LOGO_DATA_URL = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

export default async function Image() {
  const archivo = await fetch(
    'https://cdn.jsdelivr.net/npm/@fontsource/archivo@5/files/archivo-latin-800-normal.woff'
  ).then((r) => r.arrayBuffer());

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
            {EYEBROW}
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
            {TITLE}
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
      ...size,
      fonts: [{ name: 'Archivo', data: archivo, weight: 800, style: 'normal' }],
    }
  );
}
