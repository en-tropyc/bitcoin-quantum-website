import Link from 'next/link';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import RevealMount from '@/components/v2/RevealMount';
import JsonLd from '@/components/JsonLd';
import '@/components/v2/v2.css';

const SITE_URL = 'https://bitcoinquantum.com';

interface TocEntry {
  id: string;
  title: string;
}

interface GuideLayoutProps {
  title: string;
  description: string;
  tableOfContents: TocEntry[];
  children: React.ReactNode;
  /** Canonical path for this guide, e.g. "/guides/quantum-secure-bitcoin/signature-migration". */
  slug: string;
  /** ISO date (YYYY-MM-DD) the guide was first published. */
  datePublished: string;
  /** ISO date the guide was last substantively updated. Defaults to datePublished. */
  dateModified?: string;
  /** Topical keywords for the article schema. */
  keywords?: string[];
}

export default function GuideLayout({
  title,
  description,
  tableOfContents,
  children,
  slug,
  datePublished,
  dateModified,
  keywords,
}: GuideLayoutProps) {
  const canonicalUrl = `${SITE_URL}${slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
      { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    url: canonicalUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: 'en-US',
    image: `${SITE_URL}/opengraph-image`,
    author: { '@type': 'Organization', name: 'Bitcoin Quantum', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Bitcoin Quantum',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
    },
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
  };

  return (
    <div className={v2FontClassName}>
      <div className="bqv2" data-theme="light" data-headline="grotesque">
        <JsonLd data={breadcrumbSchema} />
        <JsonLd data={articleSchema} />
        <RevealMount />
        <V2Nav />

        <main>
          <article className="section guide-page">
            <div className="wrap">
              <nav className="guide-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span className="sep">/</span>
                <Link href="/guides">Guides</Link>
                <span className="sep">/</span>
                <span className="current">{title}</span>
              </nav>

              <header className="guide-header">
                <h1>{title}</h1>
                <p>{description}</p>
              </header>

              <div className="guide-body">
                <aside className="guide-toc">
                  <div className="guide-toc-inner">
                    <h2>In this guide</h2>
                    <ol>
                      {tableOfContents.map((entry, i) => (
                        <li key={entry.id}>
                          <a href={`#${entry.id}`}>
                            <span className="n">{i + 1}.</span>
                            {entry.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </aside>

                <div className="guide">{children}</div>
              </div>

              <div className="guide-back">
                <Link href="/guides">&larr; Back to Guides</Link>
              </div>
            </div>
          </article>
        </main>

        <V2Footer />
      </div>
    </div>
  );
}
