import type { Metadata } from 'next';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import RevealMount from '@/components/v2/RevealMount';
import '@/components/v2/v2.css';
import Link from 'next/link';

const TESTNET_DESC =
  'Join the Bitcoin Quantum testnet. Download BTQ Core, run a quantum-safe node, ' +
  'and mine quantum-safe blocks using NIST-standardized post-quantum cryptography.';

export const metadata: Metadata = {
  title: 'Testnet',
  description: TESTNET_DESC,
  alternates: { canonical: '/testnet' },
  openGraph: {
    title: 'Testnet — Bitcoin Quantum',
    description: TESTNET_DESC,
    url: '/testnet',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Testnet — Bitcoin Quantum',
    description: TESTNET_DESC,
  },
};

type Resource = {
  tag: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  external?: boolean;
};

const resources: Resource[] = [
  {
    tag: 'Binaries',
    title: 'Testnet release',
    body: 'BTQ Core binaries for Windows, macOS, and Linux, plus checksums. Always points at the latest tagged release.',
    href: 'https://github.com/btq-ag/btq-core/releases',
    cta: 'Download',
    external: true,
  },
  {
    tag: 'Operator guide',
    title: 'Mining guide',
    body: 'End-to-end walkthrough — daemon config, wallet creation, generating a Dilithium address, connecting to the pool.',
    href: 'https://docs.bitcoinquantum.com/mining/guide',
    cta: 'Read the guide',
    external: true,
  },
  {
    tag: 'Explorer',
    title: 'Block explorer',
    body: 'Inspect blocks, transactions, and post-quantum signature data on the live testnet chain.',
    href: 'https://explorer.bitcoinquantum.com',
    cta: 'Open explorer',
    external: true,
  },
  {
    tag: 'Pool',
    title: 'Mining pool',
    body: 'The public testnet pool — point your hashpower here to start earning testnet BTQ.',
    href: 'https://pool.bitcoinquantum.com',
    cta: 'Join the pool',
    external: true,
  },
];

export default function TestnetPage() {
  const [primary, ...secondary] = resources;

  return (
    <div className={v2FontClassName}>
      <div className="bqv2" data-theme="light" data-headline="grotesque">
        <RevealMount />
        <V2Nav />

        <main>
          {/* ===== HERO ===== */}
          <header className="section page-hero">
            <div className="lattice-corner" aria-hidden="true" />
            <div className="wrap">
              <span className="eyebrow reveal">
                <span className="live-dot-inline" aria-hidden="true" /> Testnet live
              </span>
              <h1 className="display display-narrow ml-display reveal d1">
                Run a <span className="serif">quantum-safe</span> node.
              </h1>
              <p className="lead lead-medium ml-lead reveal d2">
                The public test network is live. Download a release, spin up a node in under
                fifteen minutes, and help stress-test post-quantum Bitcoin before mainnet.
              </p>
              <div className="hero-cta ml-cta reveal d3">
                <a
                  href="https://github.com/btq-ag/btq-core/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Download binaries <span className="arrow">→</span>
                </a>
                <a
                  href="https://docs.bitcoinquantum.com/mining/guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Mining guide
                </a>
              </div>
              <span className="foot ml-foot reveal">
                Available for Windows, macOS, and Linux
              </span>
            </div>
          </header>

          {/* ===== QUICK START ===== */}
          <section id="quickstart" className="section section-flush-top">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">Quick start</span>
                <h2 className="h2">From zero to a quantum-safe node in four steps.</h2>
              </div>
              <ol className="testnet-steps reveal d1">
                <li>
                  <span className="step-idx">01</span>
                  <div>
                    <h4>Download the latest release</h4>
                    <p>
                      Grab the binaries for your platform from the{' '}
                      <a
                        href="https://github.com/btq-ag/btq-core/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        BTQ-Core releases page
                      </a>
                      . Verify checksums, then extract.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="step-idx">02</span>
                  <div>
                    <h4>Configure your node</h4>
                    <p>
                      Set up <code>btq.conf</code> with the testnet flag, RPC credentials,
                      and any pool settings. The{' '}
                      <a
                        href="https://docs.bitcoinquantum.com/mining/guide"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        mining guide
                      </a>{' '}
                      walks through
                      every option.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="step-idx">03</span>
                  <div>
                    <h4>Create a Dilithium wallet</h4>
                    <p>
                      Run <code>btq-cli -testnet createwallet &quot;main&quot;</code>, then
                      generate a quantum-safe address with{' '}
                      <code>getnewdilithiumaddress</code>.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="step-idx">04</span>
                  <div>
                    <h4>Connect &amp; mine</h4>
                    <p>
                      Point a miner at the public pool, or solo-mine against your own node.
                      Watch the live chain at{' '}
                      <a
                        href="https://explorer.bitcoinquantum.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        explorer.bitcoinquantum.com
                      </a>
                      .
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* ===== RESOURCES ===== */}
          <section id="resources" className="section section-bg-2">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">Resources</span>
                <h2 className="h2">Everything you&apos;ll need.</h2>
              </div>
              <div className="resources-grid">
                <a
                  href={primary.href}
                  target={primary.external ? '_blank' : undefined}
                  rel={primary.external ? 'noopener noreferrer' : undefined}
                  className="resource-primary reveal"
                >
                  <span className="ref-tag">{primary.tag}</span>
                  <h3 className="h3">{primary.title}</h3>
                  <p>{primary.body}</p>
                  <span className="btn btn-accent" style={{ marginTop: 'auto' }}>
                    {primary.cta} <span className="arrow">→</span>
                  </span>
                </a>
                <div className="resource-stack">
                  {secondary.map((r, i) => {
                    const cls = `ref-card resource-row reveal d${i + 1}`;
                    const Inner = (
                      <>
                        <div>
                          <span className="ref-tag">{r.tag}</span>
                          <h3>{r.title}</h3>
                          <p>{r.body}</p>
                        </div>
                        <span className="ref-link">
                          {r.cta} <span>→</span>
                        </span>
                      </>
                    );
                    return r.external ? (
                      <a
                        key={r.title}
                        href={r.href}
                        className={cls}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {Inner}
                      </a>
                    ) : (
                      <Link key={r.title} href={r.href} className={cls}>
                        {Inner}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ===== NEED HELP ===== */}
          <section className="cta section">
            <div className="wrap">
              <span className="eyebrow reveal">Need help?</span>
              <h2 className="h2 reveal d1">Talk to the testnet community.</h2>
              <p className="lead reveal d2">
                Join the Telegram channel to ask questions, report bugs, or compare notes with
                other operators. Core contributors hang out there too.
              </p>
              <div className="cta-row reveal d2">
                <a
                  href="https://t.me/+bE6I4gqX4Vo1ODJh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                >
                  Join Telegram <span className="arrow">→</span>
                </a>
                <a
                  href="https://github.com/btq-ag/btq-core/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  File a GitHub issue
                </a>
              </div>
            </div>
          </section>
        </main>

        <V2Footer />
      </div>
    </div>
  );
}
