import Link from 'next/link';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import RevealMount from '@/components/v2/RevealMount';
import JsonLd from '@/components/JsonLd';
import '@/components/v2/v2.css';
import { SITE_URL } from '@/lib/seo';
import { RELEASED_GUIDES, guideDateModified } from '../_data/guides';

interface TocEntry {
  id: string;
  title: string;
}

/**
 * "2026-07-29" -> "29 July 2026". Parsed as UTC so the rendered date cannot
 * shift a day depending on where the build runs.
 */
function formatChangeDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

interface GuideLayoutProps {
  title: string;
  description: string;
  tableOfContents: TocEntry[];
  children: React.ReactNode;
  /** Canonical path for this guide, e.g. "/guides/quantum-secure-bitcoin/signature-migration". */
  slug: string;
  /**
   * ISO date (YYYY-MM-DD) the guide was first published. Omit to take the date
   * from the guide registry, which is what `sitemap.ts` and `llms.txt` read —
   * omitting is preferred, because a value passed here that disagrees with the
   * registry publishes one date in the article schema and another in the
   * sitemap.
   */
  datePublished?: string;
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

  // The registry backing sitemap.ts and llms.txt is the source of truth for
  // dates; explicit props override it only where a page still passes them.
  const listing = RELEASED_GUIDES.find((g) => g.href === slug);
  const published = datePublished ?? listing?.datePublished;
  const modified =
    dateModified ?? (listing ? guideDateModified(listing) : undefined) ?? published;
  const changes = listing?.changes ?? [];

  // The Changes section is rendered by this layout, so it is appended to the
  // contents list here rather than repeated in every guide's TOC array.
  const toc =
    changes.length > 0
      ? [...tableOfContents, { id: 'changes', title: 'Changes' }]
      : tableOfContents;

  if (!published) {
    throw new Error(
      `GuideLayout: no datePublished for "${slug}". Add the guide to RELEASED_GUIDES ` +
        'in src/app/guides/_data/guides.ts, or pass datePublished explicitly.'
    );
  }

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
    datePublished: published,
    dateModified: modified,
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
                      {toc.map((entry, i) => (
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

                <div className="guide">
                  {children}

                  {/* Corrections and substantive revisions accumulate here rather
                      than disappearing into the prose, so the guide reads as
                      maintained instead of occasionally patched. */}
                  {changes.length > 0 && (
                    <section id="changes" className="guide-changes">
                      <h2>Changes</h2>
                      <ol>
                        {changes.map((change) => (
                          <li key={change.date}>
                            <time dateTime={change.date}>{formatChangeDate(change.date)}</time>
                            <span>{change.summary}</span>
                          </li>
                        ))}
                        <li>
                          <time dateTime={published}>{formatChangeDate(published)}</time>
                          <span>Published.</span>
                        </li>
                      </ol>
                    </section>
                  )}
                </div>
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
