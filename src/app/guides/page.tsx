import type { Metadata } from 'next';
import Link from 'next/link';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import RevealMount from '@/components/v2/RevealMount';
import '@/components/v2/v2.css';
import { RELEASED_GUIDES } from './_data/guides';

const DESC =
  'Technical guides to quantum-secure Bitcoin: how post-quantum signatures, ' +
  'addresses, mining, and migration work on a live network.';

export const metadata: Metadata = {
  title: 'Guides',
  description: DESC,
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Guides | Bitcoin Quantum',
    description: DESC,
    url: '/guides',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides | Bitcoin Quantum',
    description: DESC,
  },
};

export default function GuidesHub() {
  return (
    <div className={v2FontClassName}>
      <div className="bqv2" data-theme="light" data-headline="grotesque">
        <RevealMount />
        <V2Nav />
        <main>
          <article className="section">
            <div className="wrap">
              <span className="eyebrow reveal">Guides</span>
              <header className="guide-header">
                <h1>Quantum-Secure Bitcoin</h1>
                <p>{DESC}</p>
              </header>
              <div className="guide" style={{ maxWidth: '72ch' }}>
                {RELEASED_GUIDES.map((g) => (
                  <Link key={g.slug} href={g.href} className="data-row" style={{ display: 'block', textDecoration: 'none' }}>
                    <div className="row-head">
                      <span className="label">{g.title}</span>
                      <span className="ratio">&rarr;</span>
                    </div>
                    <p className="detail">{g.blurb}</p>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </main>
        <V2Footer />
      </div>
    </div>
  );
}
