import type { Metadata } from 'next';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import CryptographySection from '@/components/v2/CryptographySection';
import RevealMount from '@/components/v2/RevealMount';
import '@/components/v2/v2.css';

const PROTOCOL_DESC =
  "The architecture of Bitcoin Quantum: Bitcoin Core's UTXO model and SHA-256 proof-of-work, " +
  'signed with NIST-standardized CRYSTALS-Dilithium primitives.';

export const metadata: Metadata = {
  title: 'Protocol',
  description: PROTOCOL_DESC,
  alternates: { canonical: '/protocol' },
  openGraph: {
    title: 'Protocol — Bitcoin Quantum',
    description: PROTOCOL_DESC,
    url: '/protocol',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protocol — Bitcoin Quantum',
    description: PROTOCOL_DESC,
  },
};

/* Four specs that earn the stat-card treatment. Signatures lives in
   the Cryptography section beneath; Halving is a sub-detail of Supply. */
const specs = [
  { val: 'SHA-256',                  label: 'Proof-of-work consensus' },
  { val: '21',     unit: 'M',        label: 'Maximum BTQ supply' },
  { val: '1',      unit: ' min',     label: 'Target block time' },
  { val: '8',      unit: ' MB',      label: 'Per-block size limit' },
];

const netparams = [
  { net: 'Mainnet', rpc: '8334',  p2p: '9333',  prefix: 'b, D, dbtc' },
  { net: 'Testnet', rpc: '18334', p2p: '19333', prefix: 'n, tdbt'   },
  { net: 'Regtest', rpc: '18443', p2p: '19444', prefix: 'n, rdbt'   },
];

const refs = [
  {
    tag: 'Source',
    title: 'BTQ-Core',
    body: 'The full-node implementation, forked from Bitcoin Core and extended for post-quantum signatures.',
    href: 'https://github.com/btq-ag/btq-core',
    cta: 'View on GitHub',
    external: true,
  },
  {
    tag: 'Specification',
    title: 'Whitepaper integration design',
    body: 'How CRYSTALS-Dilithium is wired through the UTXO model, scripting system, and consensus rules.',
    href: 'https://github.com/btq-ag/btq-core/blob/master/WHITEPAPER_INTEGRATION_DESIGN.md',
    cta: 'Read the doc',
    external: true,
  },
  {
    tag: 'Standard',
    title: 'NIST FIPS 204',
    body: 'The standardized Module-Lattice-Based Digital Signature Algorithm — the cryptography behind every BTQ spend.',
    href: 'https://csrc.nist.gov/pubs/fips/204/final',
    cta: 'NIST publication',
    external: true,
  },
  {
    tag: 'Operator guide',
    title: 'Mining guide',
    body: 'Step-by-step setup for running a node and connecting to the testnet pool, including the full CLI reference.',
    href: 'https://docs.bitcoinquantum.com/mining/guide',
    cta: 'Read the guide',
    external: true,
  },
];

export default function ProtocolPage() {
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
              <span className="eyebrow reveal">Protocol</span>
              <h1 className="display display-medium ml-display reveal d1">
                Bitcoin Core, <span className="serif">hardened</span> for the quantum era.
              </h1>
              <p className="lead lead-wide ml-lead reveal d2">
                Bitcoin Quantum keeps Bitcoin&apos;s UTXO model, scripting system, halving
                schedule and SHA-256 proof-of-work intact — and replaces the signature
                algorithm with NIST-standardized post-quantum primitives.
              </p>
            </div>
          </header>

          {/* ===== SPECIFICATIONS ===== */}
          <section className="section section-bg-2">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">Specifications</span>
                <h2 className="h2">Protocol parameters at a glance.</h2>
              </div>
              <div className="cards-stat">
                {specs.map((s, i) => (
                  <div key={s.label} className={`fact reveal${i ? ` d${i}` : ''}`}>
                    <div className="fact-num">
                      {s.val}
                      {s.unit && <span className="suffix">{s.unit}</span>}
                    </div>
                    <div className="fact-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== CRYPTOGRAPHY (dark band, shared with home) ===== */}
          <CryptographySection id="cryptography" />

          {/* ===== NETWORK PARAMETERS ===== */}
          <section className="section" id="network">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">Network parameters</span>
                <h2 className="h2">Ports and address prefixes.</h2>
                <p className="lead lead-wide ml-lead">
                  The same three-network split Bitcoin operators expect — Mainnet for production,
                  Testnet for the public test network, Regtest for local development.
                </p>
              </div>
              <div className="netparams reveal d1">
                <table>
                  <thead>
                    <tr>
                      <th>Network</th>
                      <th>RPC port</th>
                      <th>P2P port</th>
                      <th>Address prefix</th>
                    </tr>
                  </thead>
                  <tbody>
                    {netparams.map((row) => (
                      <tr key={row.net}>
                        <td className="net-name">{row.net}</td>
                        <td className="mono">{row.rpc}</td>
                        <td className="mono">{row.p2p}</td>
                        <td className="mono">{row.prefix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ===== REFERENCES ===== */}
          <section className="section section-bg-2" id="references">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">References</span>
                <h2 className="h2">Read the source.</h2>
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
                    <span className="ref-link">
                      {r.cta} <span>→</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        <V2Footer />
      </div>
    </div>
  );
}
