import type { Metadata } from 'next';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import RevealMount from '@/components/v2/RevealMount';
import JsonLd from '@/components/JsonLd';
import { SITE_NAME, SITE_URL, absoluteUrl, breadcrumbSchema, socialMeta } from '@/lib/seo';
import '@/components/v2/v2.css';

const WP_DESC =
  'The Bitcoin Quantum whitepaper: how NIST-standardized ML-DSA (Dilithium) signatures, ' +
  'BIP-360 Pay-to-Merkle-Root and a signature-scheme lifecycle retrofit Bitcoin Core ' +
  'with post-quantum security — without changing the UTXO model, proof-of-work or the ' +
  '21 million coin supply.';

/** Canonical path of the served PDF (lives in /public). */
const WP_PDF = '/whitepaper.pdf';

export const metadata: Metadata = {
  title: 'Whitepaper',
  description: WP_DESC,
  keywords: [
    'Bitcoin Quantum whitepaper',
    'post-quantum Bitcoin whitepaper',
    'CRYSTALS-Dilithium / ML-DSA',
    'BIP-360 Pay-to-Merkle-Root',
    'Bitcoin quantum threat model',
    'NIST FIPS 204',
    'quantum-resistant Bitcoin paper',
  ],
  alternates: { canonical: '/whitepaper' },
  ...socialMeta({
    title: 'Bitcoin Quantum: A Post-Quantum Bitcoin Model | Whitepaper',
    description: WP_DESC,
    path: '/whitepaper',
    type: 'article',
  }),
};

const WP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  '@id': absoluteUrl('/whitepaper'),
  url: absoluteUrl('/whitepaper'),
  headline: 'Bitcoin Quantum: A Post-Quantum Bitcoin Model',
  description: WP_DESC,
  inLanguage: 'en-US',
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl('/whitepaper') },
  author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
  },
  about: [
    { '@type': 'Thing', name: 'CRYSTALS-Dilithium', sameAs: 'https://csrc.nist.gov/pubs/fips/204/final' },
    { '@type': 'Thing', name: 'ML-DSA', sameAs: 'https://csrc.nist.gov/pubs/fips/204/final' },
    { '@type': 'Thing', name: 'BIP-360 Pay-to-Merkle-Root', sameAs: 'https://bip360.org/' },
    { '@type': 'Thing', name: 'Post-quantum cryptography' },
    { '@type': 'Thing', name: 'Bitcoin', sameAs: 'https://en.wikipedia.org/wiki/Bitcoin' },
  ],
};

const WP_BREADCRUMBS = breadcrumbSchema([{ name: 'Whitepaper', path: '/whitepaper' }]);

/** Headline numbers the paper establishes, for the dark facts band. */
const wpNumbers = [
  { val: '2,420', suffix: ' B', label: 'Raw ML-DSA-44 signature before the sighash byte' },
  { val: '1,312', suffix: ' B', label: 'ML-DSA-44 public key — absent from the output; revealed only on spend' },
  { val: '≤1.2k', suffix: ' qbits', label: 'Logical qubits estimated to break secp256k1' },
  { val: '≤90', suffix: ' M', label: 'Toffoli gates in the 1,200-qubit attack circuit' },
];

interface Chapter {
  num: string;
  title: string;
  blurb: string;
}

/** Top-level sections of the paper, condensed for a scannable contents list. */
const chapters: Chapter[] = [
  {
    num: '01',
    title: 'Introduction',
    blurb:
      "Why Bitcoin's ECDLP assumption is the vulnerable link, and what a codebase fork that " +
      'ships ML-DSA actually preserves vs. replaces.',
  },
  {
    num: '02',
    title: 'Quantum threats to Bitcoin',
    blurb:
      'Fast-clock architectures, the vulnerability classes that matter, and why proof-of-work is ' +
      'not the main attack surface on a 1-minute confirmation model.',
  },
  {
    num: '03',
    title: 'Design goals and non-goals',
    blurb:
      'A deliberate boundary: preserve Bitcoin’s UTXO, Script and proof-of-work semantics while ' +
      'changing only what the transition demands — and make no claim about migrating the Bitcoin ledger itself.',
  },
  {
    num: '04',
    title: 'Post-quantum signatures',
    blurb:
      'CRYSTALS-Dilithium and why BTQ selects ML-DSA-44 over Falcon and SPHINCS+ for a transactional hot path ' +
      '— security category, byte sizes, and the three-way algorithm assessment.',
  },
  {
    num: '05',
    title: 'Consensus parameter changes',
    blurb:
      'Block weight and witness scale, a 60-second block time, and an LWMA difficulty algorithm ' +
      'that adapts faster than Bitcoin’s two-week retarget.',
  },
  {
    num: '06',
    title: 'Address and script system',
    blurb:
      'Address-namespace design and BIP-360 Pay-to-Merkle-Root (P2MR) — how a 1,312-byte key stays ' +
      'unexposed behind a 32-byte root until the output is spent.',
  },
  {
    num: '07',
    title: 'Sighash and signing',
    blurb:
      'A worked P2WSH-style Dilithium spend with SIGHASH_ALL, and how the 2,420-byte signature ' +
      'pushes through Script unchanged from the spending model.',
  },
  {
    num: '08',
    title: 'Wallet integration',
    blurb:
      'Key types and identifiers, hardened-only HD derivation, storage and encryption, and the ' +
      'RPC surface exposed to wallet software.',
  },
  {
    num: '09',
    title: 'Network parameters',
    blurb:
      'A separate, replay-isolated ledger with its own chain identity, monetary policy and address ' +
      'namespaces rather than a soft-fork of Bitcoin.',
  },
  {
    num: '10',
    title: 'Security analysis',
    blurb:
      'A reduction to MLWE/MSIS, what BTQ does and does not protect, and the migration and ' +
      'operational risks a transition carries.',
  },
];

const refs = [
  {
    tag: 'Read',
    title: 'The paper (PDF)',
    body: 'The full 22-page document, ready to read inline or download for offline.',
    href: WP_PDF,
    cta: 'Open PDF',
    external: false,
  },
  {
    tag: 'BIP',
    title: 'BIP-360 · Pay-to-Merkle-Root',
    body: 'The output type BTQ implements so a 1,312-byte ML-DSA key stays unexposed until the output is spent.',
    href: 'https://bip360.org/',
    cta: 'Read the BIP',
    external: true,
  },
  {
    tag: 'Implementation',
    title: 'BTQ Core',
    body: 'The full-node reference implementation each protocol claim maps back to.',
    href: 'https://github.com/btq-ag/btq-core',
    cta: 'View source',
    external: true,
  },
  {
    tag: 'Standard',
    title: 'NIST FIPS 204',
    body: 'The standardized Module-Lattice-Based Digital Signature Algorithm BTQ implements.',
    href: 'https://csrc.nist.gov/pubs/fips/204/final',
    cta: 'NIST publication',
    external: true,
  },
];

export default function WhitepaperPage() {
  return (
    <div className={v2FontClassName}>
      <JsonLd data={WP_SCHEMA} />
      <JsonLd data={WP_BREADCRUMBS} />
      <div className="bqv2" data-theme="light" data-headline="grotesque">
        <RevealMount />
        <V2Nav />

        <main>
          {/* ===== HERO ===== */}
          <header className="section page-hero">
            <div className="lattice-corner" aria-hidden="true" />
            <div className="wrap">
              <span className="eyebrow reveal">Whitepaper</span>
              <h1 className="display display-medium ml-display reveal d1">
                Bitcoin, <span className="serif">modelled</span> for the quantum era.
              </h1>
              <p className="lead lead-wide ml-lead reveal d2">
                Bitcoin Quantum: A Post-Quantum Bitcoin Model — how NIST-standardized ML-DSA
                signatures, BIP-360 Pay-to-Merkle-Root and a signature-scheme lifecycle
                preserve Bitcoin&apos;s UTXO and proof-of-work architecture while replacing
                quantum-vulnerable cryptography and selected network parameters.
              </p>
              <div className="hero-cta reveal d3">
                <a href={WP_PDF} className="btn btn-primary">
                  Read the PDF <span className="arrow">→</span>
                </a>
                <a href={WP_PDF} download="bitcoin-quantum-whitepaper.pdf" className="btn btn-ghost">
                  Download PDF
                </a>
              </div>
              <div className="wp-meta reveal d3">
                <span className="chip"><b>22 pages</b></span>
                <span className="chip"><b>v1.0</b></span>
                <span className="chip"><b>August 2026</b></span>
                <span className="chip"><b>CC-BY-4.0</b></span>
              </div>
            </div>
          </header>

          {/* ===== ABSTRACT / STATEMENT ===== */}
          <section className="statement section">
            <div className="wrap indent">
              <span className="eyebrow reveal">The abstract</span>
              <p className="big reveal d1" style={{ marginTop: 4 }}>
                Retire the one assumption quantum algorithms can<span className="serif"> </span>break.
              </p>
              <div className="statement-foot">
                <p className="reveal d1">
                  Bitcoin Quantum is a UTXO-model cryptocurrency whose transaction authorization
                  need not rest on the elliptic-curve assumption Shor&apos;s algorithm is known to
                  break. It ships ML-DSA-44 — NIST&apos;s FIPS 204 standard derived from
                  CRYSTALS-Dilithium — as its signature scheme, implements BIP-360
                  Pay-to-Merkle-Root for addresses, and retains SHA-256 proof of work.
                </p>
                <p className="reveal d2">
                  The urgency is quantitative: recent estimates reduce secp256k1 key recovery to
                  ≤1,200 logical qubits and ≤90 million Toffoli gates. Under the paper&apos;s
                  fast-clock superconducting model, the attack could execute in minutes — a
                  window fast enough to enable on-spend attacks on some cryptocurrencies. The
                  paper describes the protocol and its security properties under a quantum adversary.
                </p>
              </div>
            </div>
          </section>

          {/* ===== NUMBERS BAND ===== */}
          <section className="under section">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">By the numbers</span>
                <h2 className="h2">Costs the model quantifies.</h2>
              </div>
              <div className="cards-stat">
                {wpNumbers.map((n, i) => (
                  <div key={n.label} className={`fact reveal${i ? ` d${i}` : ''}`}>
                    <div className="fact-num">
                      {n.val}
                      {n.suffix && <span className="suffix">{n.suffix}</span>}
                    </div>
                    <div className="fact-label">{n.label}</div>
                  </div>
                ))}
              </div>
              <span className="wp-under-note reveal">
                1,200 logical qubits / 90M Toffoli gates: upper-bound resource estimates from
                Babbush et al., <em>Securing Elliptic Curve Cryptocurrencies against Quantum
                Vulnerabilities</em> (2026).
              </span>
            </div>
          </section>

          {/* ===== INSIDE THE PAPER ===== */}
          <section className="section section-bg-2" id="contents">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">Inside the paper</span>
                <h2 className="h2">Ten sections. One question.</h2>
                <p className="lead lead-wide ml-lead">
                  How a Bitcoin fork preserves Bitcoin&apos;s UTXO and proof-of-work architecture
                  while replacing quantum-vulnerable cryptography.
                </p>
              </div>
              <div className="wp-chapters">
                {chapters.map((c, i) => (
                  <div key={c.num} className={`wp-chapter reveal${i ? ` d${Math.min(i, 3)}` : ''}`}>
                    <span className="wp-ch-idx">{c.num}</span>
                    <h3>{c.title}</h3>
                    <p>{c.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== REFERENCES ===== */}
          <section className="section" id="references">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">Read it, don&apos;t just take our word</span>
                <h2 className="h2">The paper and the standards behind it.</h2>
              </div>
              <div className="refs">
                {refs.map((r, i) => (
                  <a
                    key={r.title}
                    href={r.href}
                    className={`ref-card reveal${i ? ` d${i}` : ''}`}
                    target={r.external ? '_blank' : undefined}
                    rel={r.external ? 'noopener noreferrer' : undefined}
                  >
                    <span className="ref-tag">{r.tag}</span>
                    <h3>{r.title}</h3>
                    <p>{r.body}</p>
                    <span className="ref-link">{r.cta} <span>→</span></span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ===== DOWNLOAD CARD ===== */}
          <section className="section section-flush-top">
            <div className="wrap">
              <div className="wp-dl reveal">
                <span className="eyebrow">Read the full document</span>
                <h3>Bitcoin Quantum: A Post-Quantum Bitcoin Model</h3>
                <p>
                  The complete 22-page whitepaper, released under CC-BY-4.0. Download the PDF
                  or read it right in your browser.
                </p>
                <div className="hero-cta">
                  <a href={WP_PDF} className="btn btn-primary">
                    Download PDF <span className="arrow">→</span>
                  </a>
                </div>
                <div className="wp-meta">
                  <span className="chip"><b>265 KB</b></span>
                  <span className="chip"><b>CC-BY-4.0</b></span>
                  <span className="chip"><b>ML-DSA (FIPS 204)</b></span>
                </div>
              </div>
            </div>
          </section>
        </main>

        <V2Footer />
      </div>
    </div>
  );
}