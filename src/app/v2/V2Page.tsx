'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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
function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 12 5 5L20 6" />
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
        <span key={i} className="row" dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </div>
  );
}

/* ===== Intersection-driven reveal: adds .in to anything with .reveal ===== */
function useRevealOnScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>('.bqv2 .reveal'));
    if (reduce) {
      items.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    items.forEach((el) => io.observe(el));
    // Safety net — anything still off-screen after 2.5s gets revealed.
    const t = window.setTimeout(() => {
      items.forEach((el) => el.classList.add('in'));
    }, 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);
}

/* ============================================================
   Page
   ============================================================ */
export default function V2Page() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useRevealOnScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  // Real btq-cli testnet session using the commands documented in
  // /testnet/mining-guide. Kept here as a static brand element.
  const code = useMemo(
    () => [
      '<span class="cm"># Generate a quantum-safe Dilithium address</span>',
      '<span class="cm"># and sign a testnet transaction.</span>',
      '',
      '<span class="cm">$</span> <span class="hl">btq-cli</span> <span class="kw">-testnet</span> <span class="fn">createwallet</span> <span class="st">&quot;main&quot;</span>',
      '{ <span class="st">&quot;name&quot;</span>: <span class="st">&quot;main&quot;</span> }',
      '',
      '<span class="cm">$</span> <span class="hl">btq-cli</span> <span class="kw">-testnet</span> <span class="kw">-rpcwallet=main</span> \\',
      '    <span class="fn">getnewdilithiumaddress</span>',
      '<span class="nm">tdbt1qk4xv…q7n</span>        <span class="cm"># Dilithium-bech32</span>',
      '',
      '<span class="cm">$</span> <span class="hl">btq-cli</span> <span class="kw">-testnet</span> <span class="kw">-rpcwallet=main</span> \\',
      '    <span class="fn">sendtoaddress</span> <span class="st">&quot;tdbt1qk4xv…q7n&quot;</span> <span class="nm">0.50</span>',
      '<span class="nm">8a7f…e2c1</span>',
      '',
      '<span class="cm"># Every spend signed with ML-DSA — quantum-safe.</span>',
    ],
    []
  );

  return (
    <div className="bqv2" data-theme="light" data-headline="grotesque">
      {/* ===================== NAV ===================== */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <a href="#top" aria-label="Bitcoin Quantum home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/v2/logo-light.svg" alt="Bitcoin Quantum" className="nav-logo light-v" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/v2/logo-dark.svg" alt="Bitcoin Quantum" className="nav-logo dark-v" />
        </a>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          <li><a href="#technology" onClick={closeMenu}>Technology</a></li>
          <li><a href="#under" onClick={closeMenu}>Cryptography</a></li>
          <li><a href="#roadmap" onClick={closeMenu}>Network</a></li>
          <li><a href="#cta" onClick={closeMenu}>Community</a></li>
        </ul>
        <div className="nav-right">
          <a href="#cta" className="btn btn-primary">
            Get started <span className="arrow">→</span>
          </a>
          <button
            className="nav-toggle"
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

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
                  <a href="#cta" className="btn btn-primary">
                    Get started <span className="arrow">→</span>
                  </a>
                  <a href="#under" className="btn btn-ghost">Read the whitepaper</a>
                </div>
              </div>
              <div className="hero-visual reveal d2" aria-hidden="true">
                <div className="lattice" />
                <svg className="arcs" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M-12 72 Q 50 -16 112 72" strokeWidth="0.4" style={{ opacity: 0.45 }} />
                  <path d="M-12 92 Q 52 18 112 96" strokeWidth="0.35" style={{ opacity: 0.3 }} />
                  <path d="M 14 114 Q 64 36 120 64" strokeWidth="0.35" style={{ opacity: 0.22 }} />
                </svg>
                <div className="rings">
                  <div className="ring" style={{ width: '70%', height: '70%', opacity: 0.28 }} />
                  <div className="ring" style={{ width: '94%', height: '94%', opacity: 0.16 }} />
                </div>
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
                  <StatNumber value={100} suffix="%" />
                  <div className="fact-label">Quantum-resistant addresses</div>
                </div>
                <div className="fact reveal d2">
                  <StatNumber value={10} suffix="&nbsp;min" />
                  <div className="fact-label">Average block time</div>
                </div>
                <div className="fact reveal d3">
                  <StatNumber fixed="NIST" />
                  <div className="fact-label">Standardized cryptography</div>
                </div>
              </div>
              <span className="foot reveal">Protocol parameters · testnet live as of May 2026</span>
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
                  21 million coins. Ten-minute blocks. Halvings and proof-of-work. The monetary
                  policy you already trust, hardened for what&apos;s coming.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ===================== DARK CODE BAND ===================== */}
        <section className="under section" id="under">
          <div className="wrap">
            <div className="under-grid">
              <div className="reveal">
                <span className="eyebrow">Under the hood</span>
                <h2 className="h2">Cryptography that outlasts the quantum threat.</h2>
                <p className="lead">
                  Every address is generated and spent with NIST-standardized post-quantum
                  primitives — verifiable today, secure against the computers of tomorrow.
                </p>
                <ul>
                  <li><CheckIcon /> CRYSTALS-Dilithium (ML-DSA, NIST FIPS&nbsp;204) signatures replace ECDSA</li>
                  <li><CheckIcon /> Native <code>dilithium-bech32</code> and <code>dilithium-legacy</code> address formats</li>
                  <li><CheckIcon /> Cryptographic agility — ready to adopt new NIST PQC standards</li>
                </ul>
              </div>
              <div className="code reveal d1">
                <div className="code-bar">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                  <span className="fname">shell · btq-cli testnet</span>
                </div>
                <div className="code-body">
                  {code.map((line, i) => (
                    <span
                      key={i}
                      className="ln"
                      dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== LIVE TESTNET STRIP ===================== */}
        <section className="testnet section" id="testnet">
          <div className="wrap">
            <div className="testnet-grid">
              <div className="testnet-pitch">
                <span className="live-badge reveal">
                  <span className="live-dot" aria-hidden="true" />
                  Testnet live · v0.3.0
                </span>
                <h2 className="h2 reveal d1" style={{ marginTop: 20 }}>
                  Run a quantum-secure node.
                </h2>
                <p className="lead reveal d2">
                  Spin up a testnet node in under fifteen minutes. Mine quantum-safe blocks,
                  validate transactions, and help stress-test the network before mainnet.
                </p>
                <div className="testnet-cta reveal d3">
                  <a
                    href="https://github.com/btq-ag/btq-core/releases/tag/v0.3.0-testnet"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Download binaries <span className="arrow">→</span>
                  </a>
                  <a href="/testnet/mining-guide" className="btn btn-ghost">
                    Mining guide
                  </a>
                </div>
                <span className="foot reveal">Windows · Linux · MIT-licensed</span>
              </div>

              <ol className="testnet-steps reveal d1">
                <li>
                  <span className="step-idx">01</span>
                  <div>
                    <h4>Download the release</h4>
                    <p>
                      Grab the{' '}
                      <a
                        href="https://github.com/btq-ag/btq-core/releases/tag/v0.3.0-testnet"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        v0.3.0 testnet binaries
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
                      <a href="/testnet/mining-guide">mining guide</a> — extraction, daemon
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
              <h2 className="h2">Three ways to engage with the network.</h2>
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
                <a href="/testnet/mining-guide" className="path-link">
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
                <a
                  href="https://github.com/btq-ag/BTQ-Core/blob/master/WHITEPAPER_INTEGRATION_DESIGN.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="path-link"
                >
                  Technical blueprint <span className="arrow">→</span>
                </a>
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
              Spin up a quantum-safe wallet on testnet, read the whitepaper, or talk to us about
              institutional custody. The transition starts today.
            </p>
            <div className="cta-row reveal d2">
              <a href="#" className="btn btn-accent">
                Create a wallet <span className="arrow">→</span>
              </a>
              <a href="#under" className="btn btn-ghost">Read the whitepaper</a>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-top">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/v2/logo-dark.svg" alt="Bitcoin Quantum" className="footer-logo" />
              <p className="footer-blurb">
                Bitcoin for the post-quantum era. The same sound money, secured by cryptography
                built to outlast quantum computers.
              </p>
            </div>
            <div>
              <h4>Learn</h4>
              <ul>
                <li><a href="#under">Whitepaper</a></li>
                <li><a href="#technology">Technology</a></li>
                <li><a href="#under">Cryptography</a></li>
                <li><a href="#roadmap">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>Network</h4>
              <ul>
                <li><a href="#roadmap">Roadmap</a></li>
                <li><a href="#">Testnet</a></li>
                <li><a href="#">Block explorer</a></li>
                <li><a href="#">Run a node</a></li>
              </ul>
            </div>
            <div>
              <h4>Community</h4>
              <ul>
                <li><a href="#">GitHub</a></li>
                <li><a href="#">Forum</a></li>
                <li><a href="#">X / Twitter</a></li>
                <li><a href="#">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Bitcoin Quantum. Open-source under MIT.</span>
            <span>Not financial advice · bitcoinquantum.com</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
