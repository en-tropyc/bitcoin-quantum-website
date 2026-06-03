import Link from 'next/link';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import RevealMount from '@/components/v2/RevealMount';
import '@/components/v2/v2.css';

interface TocEntry {
  id: string;
  title: string;
}

interface GuideLayoutProps {
  title: string;
  description: string;
  tableOfContents: TocEntry[];
  children: React.ReactNode;
}

export default function GuideLayout({
  title,
  description,
  tableOfContents,
  children,
}: GuideLayoutProps) {
  return (
    <div className={v2FontClassName}>
      <div className="bqv2" data-theme="light" data-headline="grotesque">
        <RevealMount />
        <V2Nav />

        <main>
          <article className="section">
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
