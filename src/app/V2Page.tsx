'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import CryptographySection from '@/components/v2/CryptographySection';
import RevealMount from '@/components/v2/RevealMount';

/* ===== Icon glyphs ===== */
function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function LatticeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
/* ===== Animated count-up for stat cards ===== */
function StatNumber({
  value,
  suffix,
  fixed,
}: {
  value?: number;
  suffix?: string;
  fixed?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    if (fixed !== undefined || value === undefined) return;
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !played.current) {
            played.current = true;
            const dur = 1100;
            const t0 = performance.now();
            const frame = (now: number) => {
              const p = Math.min(1, (now - t0) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(Math.round(value * eased));
              if (p < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, fixed]);

  if (fixed !== undefined) {
    return <div className="fact-num">{fixed}</div>;
  }
  return (
    <div className="fact-num" ref={ref}>
      {display}
      <span className="suffix" dangerouslySetInnerHTML={{ __html: suffix ?? '' }} />
    </div>
  );
}

/* ===== Random-but-stable hex band ===== */
function HexRows() {
  // Generate once on mount so SSR & client agree on a single placeholder,
  // then the client fills the actual rows.
  const [rows, setRows] = useState<string[] | null>(null);

  useEffect(() => {
    const HEX = '0123456789ABCDEF';
    const byte = () =>
      HEX[Math.floor(Math.random() * 16)] + HEX[Math.floor(Math.random() * 16)];
    const out: string[] = [];
    for (let r = 0; r < 3; r++) {
      const off = (0x4a0 + r * 0x10).toString(16).toUpperCase().padStart(6, '0');
      const parts: string[] = ['0x' + off + '  '];
      for (let i = 0; i < 64; i++) {
        const b = byte();
        if (Math.random() < 0.08) parts.push(`<span class="hl">${b}</span>`);
        else parts.push(b);
        parts.push(' ');
      }
      out.push(parts.join(''));
    }
    setRows(out);
  }, []);

  return (
    <div className="rows" id="hexRows">
      {(rows ?? ['', '', '']).map((html, i) => (
        // Each row is a horizontal flex container with the same byte
        // sequence rendered twice so the marquee can loop seamlessly.
        // CSS animates the row's transform to -50% (one copy width).
        <span key={i} className="row">
          <span className="row-content" dangerouslySetInnerHTML={{ __html: html }} />
          <span
            className="row-content"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </span>
      ))}
    </div>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function V2Page() {
  return (
    <div className="bqv2" data-theme="light" data-headline="grotesque">
      <RevealMount />
      <V2Nav />

      <main id="top">
        {/* ===================== HERO ===================== */}
        <header className="hero section">
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy">
                <span className="eyebrow reveal">Post-quantum bitcoin</span>
                <h1 className="display reveal d1">
                  Bitcoin, <span className="serif">secured</span> for the quantum era.
                </h1>
                <p className="lead reveal d2">
                  The same 21&nbsp;million coins and the same network you trust — rebuilt on
                  cryptography that quantum computers cannot break.
                </p>
                <div className="hero-cta reveal d3">
                  <a href="/testnet#resources" className="btn btn-primary">
                    Get started <span className="arrow">→</span>
                  </a>
                  <span className="btn btn-ghost" aria-disabled="true">Whitepaper · coming soon</span>
                </div>
              </div>
              <div className="hero-visual reveal d2" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/circlebg.svg" alt="" className="hero-circuit" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/v2/mark-light.svg" alt="" className="hero-mark light-v" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/v2/mark-dark.svg" alt="" className="hero-mark dark-v" />
              </div>
            </div>

            {/* KEY FACTS */}
            <div className="facts">
              <span className="eyebrow reveal">Key facts</span>
              <div className="cards-stat">
                <div className="fact reveal">
                  <StatNumber value={21} suffix="M" />
                  <div className="fact-label">Maximum supply</div>
                </div>
                <div className="fact reveal d1">
                  <StatNumber value={1} suffix="&nbsp;min" />
                  <div className="fact-label">Target block time</div>
                </div>
                <div className="fact reveal d2">
                  <StatNumber value={8} suffix="&nbsp;MB" />
                  <div className="fact-label">Block size limit</div>
                </div>
                <div className="fact reveal d3">
                  <StatNumber fixed="FIPS 204" />
                  <div className="fact-label">NIST-standardized signatures</div>
                </div>
              </div>
              <a
                href="https://docs.bitcoinquantum.com/btq-empirical-behavior-whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="foot reveal facts-link"
              >
                Mining difficulty and parameters <span>→</span>
              </a>
            </div>
          </div>
        </header>

        {/* ===================== STATEMENT ===================== */}
        <section className="statement section">
          <div className="wrap indent">
            <span className="eyebrow reveal">Our thesis</span>
            <p className="big reveal d1" style={{ marginTop: 22 }}>
              Bitcoin solved digital scarcity. Bitcoin&nbsp;Quantum keeps it{' '}
              <span className="serif">sound</span> for the next fifty years.
            </p>
            <div className="statement-foot">
              <p className="reveal d1">
                A sufficiently powerful quantum computer could one day break the elliptic-curve
                signatures that protect ordinary Bitcoin wallets. Bitcoin Quantum closes that door
                before it opens.
              </p>
              <p className="reveal d2">
                We preserve everything that makes Bitcoin sound money — its supply schedule,
                proof-of-work consensus and peer-to-peer architecture — and swap the cryptography
                underneath for primitives proven resistant to quantum attack.
              </p>
            </div>
          </div>
        </section>

        {/* ===================== HEX BAND ===================== */}
        <section className="hexband" aria-hidden="true">
          <span className="tag">Quantum-safe ledger</span>
          <HexRows />
        </section>

        {/* ===================== TECHNOLOGY ===================== */}
        <section className="tech section" id="technology">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">The technology</span>
              <h2 className="h2">Three changes. Everything else stays&nbsp;Bitcoin.</h2>
            </div>
            <div className="cards">
              <article className="card reveal">
                <div className="glyph"><ShieldIcon /></div>
                <div className="card-idx">01</div>
                <h3 className="h3">Quantum-resistant signatures</h3>
                <p>
                  Lattice- and hash-based signature schemes replace ECDSA, so funds stay protected
                  even against Shor&apos;s algorithm on a fault-tolerant quantum machine.
                </p>
              </article>
              <article className="card reveal d1">
                <div className="glyph"><LatticeIcon /></div>
                <div className="card-idx">02</div>
                <h3 className="h3">Built for larger signatures</h3>
                <p>
                  Post-quantum signatures are bigger. The protocol expands transaction capacity to
                  absorb them — keeping fees low and blocks efficient as the network grows.
                </p>
              </article>
              <article className="card reveal d2">
                <div className="glyph"><ClockIcon /></div>
                <div className="card-idx">03</div>
                <h3 className="h3">Bitcoin&apos;s model, unchanged</h3>
                <p>
                  21 million coins. One-minute blocks. Halvings and proof-of-work. The monetary
                  policy you already trust, hardened for what&apos;s coming.
                </p>
              </article>
            </div>
            <Link href="/protocol" className="read-more reveal">
              Read the protocol <span>→</span>
            </Link>
          </div>
        </section>

        <CryptographySection id="under" />

        {/* ===================== LIVE TESTNET STRIP ===================== */}
        <section className="testnet section" id="testnet">
          <div className="wrap">
            <div className="testnet-grid">
              <div className="testnet-pitch">
                <span className="live-badge reveal">
                  <span className="live-dot" aria-hidden="true" />
                  Testnet live
                </span>
                <h2 className="h2 reveal d1" style={{ marginTop: 20 }}>
                  Run a quantum-safe node.
                </h2>
                <p className="lead reveal d2">
                  Spin up a testnet node in under fifteen minutes. Mine quantum-safe blocks,
                  validate transactions, and help stress-test the network before mainnet.
                </p>
                <div className="testnet-cta reveal d3">
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
                <span className="foot reveal">Available for Windows, macOS, and Linux</span>
              </div>

              <ol className="testnet-steps reveal d1">
                <li>
                  <span className="step-idx">01</span>
                  <div>
                    <h4>Download the release</h4>
                    <p>
                      Grab the{' '}
                      <a
                        href="https://github.com/btq-ag/btq-core/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        latest testnet release
                      </a>{' '}
                      for your platform.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="step-idx">02</span>
                  <div>
                    <h4>Configure your node</h4>
                    <p>
                      Follow the{' '}
                      <a
                        href="https://docs.bitcoinquantum.com/mining/guide"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        mining guide
                      </a>{' '}
                      — extraction, daemon
                      config, and pool connection in one place.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="step-idx">03</span>
                  <div>
                    <h4>Create a wallet &amp; mine</h4>
                    <p>
                      Generate a Dilithium key, connect to the pool, and start mining
                      quantum-safe blocks.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* ===================== CHOOSE YOUR PATH ===================== */}
        <section className="paths section" id="paths">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Get involved</span>
              <h2 className="h2">Three ways to join the network.</h2>
            </div>
            <div className="cards">
              <article className="card path-card reveal">
                <div className="glyph">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M9 9h6v6H9z" />
                    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
                  </svg>
                </div>
                <div className="card-idx">01 · Miners</div>
                <h3 className="h3">Run a node, mine quantum-safe blocks.</h3>
                <p>
                  Help secure the network and earn testnet BTQ. Same SHA-256 proof-of-work
                  Bitcoin miners already know — with post-quantum signatures riding on top.
                </p>
                <a
                  href="https://docs.bitcoinquantum.com/mining/guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="path-link"
                >
                  Quick start <span className="arrow">→</span>
                </a>
              </article>

              <article className="card path-card reveal d1">
                <div className="glyph">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
                  </svg>
                </div>
                <div className="card-idx">02 · Developers</div>
                <h3 className="h3">Build wallets, tools, integrations.</h3>
                <p>
                  Bitcoin Core&apos;s UTXO model and scripting system, extended with a clean
                  RPC API for post-quantum signing. Familiar surface, new primitives.
                </p>
                <a
                  href="https://github.com/btq-ag/btq-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="path-link"
                >
                  View on GitHub <span className="arrow">→</span>
                </a>
              </article>

              <article className="card path-card reveal d2">
                <div className="glyph">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M9 3h6v5l3 5a3 3 0 0 1-2.7 4.3H8.7A3 3 0 0 1 6 13l3-5V3Z" />
                    <path d="M9 3h6M8 14h8" />
                  </svg>
                </div>
                <div className="card-idx">03 · Researchers</div>
                <h3 className="h3">Review the cryptographic primitives.</h3>
                <p>
                  Audit the ML-DSA integration and the protocol-level choices behind the
                  larger post-quantum signatures. Comments and issues welcome.
                </p>
                <span className="path-link is-disabled" aria-disabled="true">
                  Technical brief · coming soon
                </span>
              </article>
            </div>
          </div>
        </section>

        {/* ===================== ROADMAP ===================== */}
        <section className="road section" id="roadmap">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">The network</span>
              <h2 className="h2">A measured path to a quantum-safe chain.</h2>
            </div>
            <div className="timeline">
              <div className="phase reveal">
                <div className="ph-tag">Phase 01</div>
                <h3>Specification</h3>
                <p>Peer-reviewed protocol design and the post-quantum signature standard.</p>
                <div className="status">Complete</div>
              </div>
              <div className="phase active reveal d1">
                <div className="ph-tag">Phase 02</div>
                <h3>Testnet</h3>
                <p>Public test network, reference wallets and third-party security audits.</p>
                <div className="status">● Live now</div>
              </div>
              <div className="phase reveal d2">
                <div className="ph-tag">Phase 03</div>
                <h3>Mainnet</h3>
                <p>Genesis launch with full quantum-resistant signing across the network.</p>
                <div className="status">Upcoming</div>
              </div>
              <div className="phase reveal d3">
                <div className="ph-tag">Phase 04</div>
                <h3>Ecosystem</h3>
                <p>Exchange, custody and institutional integrations for the post-quantum era.</p>
                <div className="status">Planned</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== CTA ===================== */}
        <section className="cta section" id="cta">
          <div className="wrap">
            <span className="eyebrow reveal">Get started</span>
            <h2 className="h2 reveal d1">Be ready before quantum is.</h2>
            <p className="lead reveal d2">
              Spin up a quantum-safe wallet on testnet or talk to us about institutional custody.
              The transition starts today.
            </p>
            <div className="cta-row reveal d2">
              <a
                href="https://docs.bitcoinquantum.com/wallet/basics"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
              >
                Create a wallet <span className="arrow">→</span>
              </a>
              <span className="btn btn-ghost" aria-disabled="true">Whitepaper · coming soon</span>
            </div>
          </div>
        </section>
      </main>

      <V2Footer />
    </div>
  );
}
