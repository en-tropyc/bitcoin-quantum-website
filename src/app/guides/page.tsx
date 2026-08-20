import type { Metadata } from 'next';
import Link from 'next/link';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import RevealMount from '@/components/v2/RevealMount';
import JsonLd from '@/components/JsonLd';
import '@/components/v2/v2.css';
import { RELEASED_GUIDES } from './_data/guides';
import { SITE_URL, socialMeta } from '@/lib/seo';

const DESC =
  'Technical guides to quantum-secure Bitcoin: how post-quantum signatures, ' +
  'addresses, mining, and migration work on a live network.';

export const metadata: Metadata = {
  title: 'Guides',
  description: DESC,
  keywords: [
    'quantum-secure Bitcoin guides',
    'post-quantum Bitcoin tutorial',
    'CRYSTALS-Dilithium',
    'Bitcoin quantum migration',
    'BTQ technical guides',
  ],
  alternates: { canonical: '/guides' },
  ...socialMeta({
    title: 'Guides | Bitcoin Quantum',
    description: DESC,
    path: '/guides',
  }),
};

const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Quantum-Secure Bitcoin Guides',
  description: DESC,
  url: `${SITE_URL}/guides`,
  inLanguage: 'en-US',
  isPartOf: { '@type': 'WebSite', name: 'Bitcoin Quantum', url: SITE_URL },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: RELEASED_GUIDES.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.title,
      url: `${SITE_URL}${g.href}`,
    })),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
  ],
};

export default function GuidesHub() {
  return (
    <div className={v2FontClassName}>
      <div className="bqv2" data-theme="light" data-headline="grotesque">
        <JsonLd data={collectionSchema} />
        <JsonLd data={breadcrumbSchema} />
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
              <div className="guide guide-hub">
                {RELEASED_GUIDES.map((g, i) => (
                  <Link key={g.slug} href={g.href} className="data-row">
                    <span className="guide-num" aria-hidden="true">{i + 1}</span>
                    <div className="guide-card-body">
                      <div className="row-head">
                        <span className="label">{g.title}</span>
                        <span className="ratio">&rarr;</span>
                      </div>
                      <p className="detail">{g.blurb}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Companion material — same row language as the series, but a
                  document rather than a numbered guide, so it sits outside the
                  list and carries a PDF badge instead of a number. */}
              <div className="guide-hub-companion reveal">
                <span className="eyebrow">Companion material</span>
                <div className="guide guide-hub">
                  <Link href="/transaction-types" className="data-row">
                    <span className="guide-num guide-num-doc" aria-hidden="true">PDF</span>
                    <div className="guide-card-body">
                      <div className="row-head">
                        <span className="label">A Field Guide to BTQ Transaction Types</span>
                        <span className="ratio">&rarr;</span>
                      </div>
                      <p className="detail">
                        Every address and spend type BTQ ships — five ECDSA, five Dilithium
                        P2MR — each linked to a confirmed testnet transaction to inspect in
                        the explorer.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </main>
        <V2Footer />
      </div>
    </div>
  );
}
