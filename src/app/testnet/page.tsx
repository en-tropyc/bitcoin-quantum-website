import type { Metadata } from 'next';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import '@/components/v2/v2.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Testnet — Bitcoin Quantum',
  description:
    'Join the Bitcoin Quantum testnet. Download BTQ Core, run a quantum-secure node, and mine quantum-safe blocks using NIST-standardized post-quantum cryptography.',
  alternates: { canonical: '/testnet' },
};

type Resource = {
  tag: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  external?: boolean;
  primary?: boolean;
};

const resources: Resource[] = [
  {
    tag: 'Binaries',
    title: 'Testnet release',
    body: 'BTQ Core binaries for Windows and Linux, plus checksums. Always points at the latest tagged release.',
    href: 'https://github.com/btq-ag/btq-core/releases',
    cta: 'Download',
    external: true,
    primary: true,
  },
  {
    tag: 'Operator guide',
    title: 'Mining guide',
    body: 'End-to-end walkthrough — daemon config, wallet creation, generating a Dilithium address, connecting to the pool.',
    href: '/testnet/mining-guide',
    cta: 'Read the guide',
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
        <V2Nav />

        <main>
          {/* ===== HERO ===== */}
          <header className="section" style={{ paddingTop: 'clamp(128px, 16vw, 184px)' }}>
            <div className="wrap">
              <span className="eyebrow">
                <span className="live-dot-inline" aria-hidden="true" /> Testnet live
              </span>
              <h1 className="display" style={{ marginTop: 24, maxWidth: '14ch' }}>
                Run a <span className="serif">quantum-safe</span> node.
              </h1>
              <p className="lead" style={{ marginTop: 26, maxWidth: '50ch' }}>
                The public test network is live. Download a release, spin up a node in under
                fifteen minutes, and help stress-test post-quantum Bitcoin before mainnet.
              </p>
              <div className="hero-cta" style={{ marginTop: 32 }}>
                <a
                  href="https://github.com/btq-ag/btq-core/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Download binaries <span className="arrow">→</span>
                </a>
                <Link href="/testnet/mining-guide" className="btn btn-ghost">
                  Mining guide
                </Link>
              </div>
              <span className="foot" style={{ display: 'block', marginTop: 16 }}>
                Windows · Linux · MIT-licensed
              </span>
            </div>
          </header>

          {/* ===== QUICK START ===== */}
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">Quick start</span>
                <h2 className="h2">From zero to a quantum-safe node in four steps.</h2>
              </div>
              <ol className="testnet-steps">
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
                      <Link href="/testnet/mining-guide">mining guide</Link> walks through
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
          <section className="section" style={{ background: 'var(--bg-2)' }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">Resources</span>
                <h2 className="h2">Everything else you&apos;ll need.</h2>
              </div>
              <div className="resources-grid">
                <a
                  href={primary.href}
                  target={primary.external ? '_blank' : undefined}
                  rel={primary.external ? 'noopener noreferrer' : undefined}
                  className="resource-primary"
                >
                  <span className="ref-tag">{primary.tag}</span>
                  <h3 className="h3">{primary.title}</h3>
                  <p>{primary.body}</p>
                  <span className="btn btn-accent" style={{ marginTop: 'auto' }}>
                    {primary.cta} <span className="arrow">→</span>
                  </span>
                </a>
                <div className="resource-stack">
                  {secondary.map((r) => {
                    const isExternal = r.external;
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
                    return isExternal ? (
                      <a
                        key={r.title}
                        href={r.href}
                        className="ref-card resource-row"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {Inner}
                      </a>
                    ) : (
                      <Link key={r.title} href={r.href} className="ref-card resource-row">
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
              <span className="eyebrow">Need help?</span>
              <h2 className="h2">Talk to the testnet community.</h2>
              <p className="lead">
                Join the Telegram channel to ask questions, report bugs, or compare notes with
                other operators. Core contributors hang out there too.
              </p>
              <div className="cta-row">
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
