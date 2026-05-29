import type { Metadata } from 'next';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import CryptographySection from '@/components/v2/CryptographySection';
import '@/components/v2/v2.css';

export const metadata: Metadata = {
  title: 'Protocol — Bitcoin Quantum',
  description:
    "The architecture of Bitcoin Quantum: Bitcoin Core's UTXO model and SHA-256 proof-of-work, signed with NIST-standardized CRYSTALS-Dilithium primitives.",
  alternates: { canonical: '/protocol' },
};

const specs = [
  { tag: 'Consensus',    val: 'SHA-256',   label: 'Proof-of-work, ASIC-compatible' },
  { tag: 'Supply',       val: '21',        unit: 'M', label: 'Maximum BTQ, fixed at genesis' },
  { tag: 'Block time',   val: '10',        unit: 'min', label: 'Target average between blocks' },
  { tag: 'Block size',   val: '64',        unit: 'MiB', label: 'Sized for larger PQ signatures' },
  { tag: 'Signatures',   val: 'ML-DSA',    label: 'CRYSTALS-Dilithium · FIPS 204' },
  { tag: 'Halving',      val: '210k',      unit: 'blocks', label: 'Same reward schedule as Bitcoin' },
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
    href: 'https://github.com/btq-ag/BTQ-Core/blob/master/WHITEPAPER_INTEGRATION_DESIGN.md',
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
    href: '/testnet/mining-guide',
    cta: 'Read the guide',
    external: false,
  },
];

export default function ProtocolPage() {
  return (
    <div className={v2FontClassName}>
      <div className="bqv2" data-theme="light" data-headline="grotesque">
        <V2Nav />

        <main>
          {/* ===== HERO ===== */}
          <header className="section" style={{ paddingTop: 'clamp(128px, 16vw, 184px)' }}>
            <div className="wrap">
              <span className="eyebrow">Protocol</span>
              <h1 className="display" style={{ marginTop: 24, maxWidth: '16ch' }}>
                Bitcoin Core, <span className="serif">hardened</span> for the quantum era.
              </h1>
              <p className="lead" style={{ marginTop: 26, maxWidth: '54ch' }}>
                Bitcoin Quantum keeps Bitcoin&apos;s UTXO model, scripting system, halving
                schedule and SHA-256 proof-of-work intact — and replaces the signature
                algorithm with NIST-standardized post-quantum primitives.
              </p>
            </div>
          </header>

          {/* ===== SPECIFICATIONS ===== */}
          <section className="section" style={{ background: 'var(--bg-2)', paddingTop: 'clamp(64px, 8vw, 110px)' }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">Specifications</span>
                <h2 className="h2">Protocol parameters at a glance.</h2>
              </div>
              <div className="specs">
                {specs.map((s) => (
                  <div key={s.tag} className="spec-card">
                    <span className="spec-eyebrow">{s.tag}</span>
                    <div className="spec-val">
                      {s.val}
                      {s.unit && <span className="unit">{s.unit}</span>}
                    </div>
                    <div className="spec-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== CRYPTOGRAPHY (dark band) ===== */}
          <CryptographySection id="cryptography" />

          {/* ===== NETWORK PARAMETERS ===== */}
          <section className="section" id="network">
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">Network parameters</span>
                <h2 className="h2">Ports and address prefixes.</h2>
                <p className="lead" style={{ marginTop: 18, maxWidth: '54ch' }}>
                  The same three-network split Bitcoin operators expect — Mainnet for production,
                  Testnet for the public test network, Regtest for local development.
                </p>
              </div>
              <div className="netparams">
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
          <section className="section" id="references" style={{ background: 'var(--bg-2)' }}>
            <div className="wrap">
              <div className="sec-head">
                <span className="eyebrow">References</span>
                <h2 className="h2">Read the source.</h2>
              </div>
              <div className="refs">
                {refs.map((r) => (
                  <a
                    key={r.title}
                    href={r.href}
                    className="ref-card"
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
