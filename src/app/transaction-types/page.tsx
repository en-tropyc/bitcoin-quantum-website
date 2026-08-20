import type { Metadata } from 'next';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import RevealMount from '@/components/v2/RevealMount';
import JsonLd from '@/components/JsonLd';
import { SITE_NAME, SITE_URL, absoluteUrl, breadcrumbSchema, socialMeta } from '@/lib/seo';
import '@/components/v2/v2.css';

const TT_DESC =
  'Every BTQ transaction type explained: five ECDSA types kept for Bitcoin compatibility ' +
  'and five Dilithium P2MR types for post-quantum custody, each linked to a confirmed ' +
  'testnet transaction you can inspect in the explorer.';

/** Canonical path of the served PDF (lives in /public). */
const TT_PDF = '/bitcoinquantum_transaction_types.pdf';

/** Live testnet explorer; every example transaction deep-links into it. */
const EXPLORER = 'https://explorer.bitcoinquantum.com';

const shortTx = (txid: string) => `${txid.slice(0, 8)}…${txid.slice(-8)}`;
const txUrl = (txid: string) => `${EXPLORER}/tx/${txid}`;

export const metadata: Metadata = {
  title: 'Transaction Types Field Guide',
  description: TT_DESC,
  keywords: [
    'BTQ transaction types',
    'Dilithium P2MR transactions',
    'BIP-360 Pay-to-Merkle-Root',
    'post-quantum multisig',
    'ECDSA compatibility',
    'BTQ testnet explorer',
    'quantum-resistant Bitcoin addresses',
  ],
  alternates: { canonical: '/transaction-types' },
  ...socialMeta({
    title: 'A Field Guide to BTQ Transaction Types | Bitcoin Quantum',
    description: TT_DESC,
    path: '/transaction-types',
    type: 'article',
  }),
};

const TT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  '@id': absoluteUrl('/transaction-types'),
  url: absoluteUrl('/transaction-types'),
  headline: 'A Field Guide to BTQ Transaction Types',
  description: TT_DESC,
  inLanguage: 'en-US',
  datePublished: '2026-07-28',
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl('/transaction-types') },
  author: [
    { '@type': 'Person', name: 'Oscar Chambers' },
    { '@type': 'Person', name: 'Barney Chambers' },
  ],
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
  },
  about: [
    { '@type': 'Thing', name: 'ML-DSA', sameAs: 'https://csrc.nist.gov/pubs/fips/204/final' },
    { '@type': 'Thing', name: 'BIP-360 Pay-to-Merkle-Root', sameAs: 'https://bip360.org/' },
    { '@type': 'Thing', name: 'ECDSA' },
    { '@type': 'Thing', name: 'Multisig' },
  ],
};

const TT_BREADCRUMBS = breadcrumbSchema([{ name: 'Transaction Types', path: '/transaction-types' }]);

interface TxType {
  type: string;
  family: 'ECDSA' | 'Dilithium';
  why: string;
  txid: string;
}

/** The guide's full catalogue (its Tables 1 and A), ECDSA family first. */
const catalogue: TxType[] = [
  {
    type: 'Legacy P2PKH',
    family: 'ECDSA',
    why: 'Classic Bitcoin compatibility',
    txid: '8491a822c29e9a3a905f50e20e6c13465f36247842dce7afb0c188ca104d629f',
  },
  {
    type: 'P2SH-SegWit',
    family: 'ECDSA',
    why: 'Bridge for older SegWit wallets',
    txid: '2c9af353c0045e61696af9b818c378074fd0cc552182f7be70c77bb10594e330',
  },
  {
    type: 'Bech32 (P2WPKH)',
    family: 'ECDSA',
    why: 'Default modern SegWit receive',
    txid: '559e061bb24e6ee1c85c132e319223bf9bd9aace9420d65a995d44e1bb1d54e5',
  },
  {
    type: 'Bech32m / Taproot',
    family: 'ECDSA',
    why: 'Advanced ECDSA script trees',
    txid: '5ed561a69a31c55f73fa566bc1f060539e71167522a6fd9680046d93ed489a22',
  },
  {
    type: 'wsh 2-of-3 multisig',
    family: 'ECDSA',
    why: 'Shared ECDSA custody',
    txid: '7b07314d73b0f12782e677c46a668c1abb059054ef1a1b4ee58462586e1fee94',
  },
  {
    type: 'P2MR single-key',
    family: 'Dilithium',
    why: 'Standard post-quantum receive',
    txid: '18bd0dc86094a8390583fb155313cefae0427dd766fe01c9a328133e4209f4c2',
  },
  {
    type: 'P2MR OP_TRUE leaf',
    family: 'Dilithium',
    why: 'Demo of the P2MR script-path layout',
    txid: 'a0a068b8a7a02a35f941a354db9fbc08a60cc8d7dd84cd9923b09c633b218daa',
  },
  {
    type: 'P2MR multisig 2-of-3',
    family: 'Dilithium',
    why: 'Dilithium multisig custody',
    txid: '3301fec1f5899252cf582c64c0f92f877755ab0f29783bb7001e422fdb75ab9c',
  },
  {
    type: 'P2MR threshold 2-of-3',
    family: 'Dilithium',
    why: 'The same 2-of-3 rule, threshold-script style',
    txid: 'd1b2602835b76ee714189f70d3a91f5d32fd003ebe283370970a6f3c1f7415c4',
  },
  {
    type: 'Legacy Base58 Dilithium',
    family: 'Dilithium',
    why: 'Historical format — where BTQ came from',
    txid: '665eb4ac94212f050a3c5cb8a5eba30666e3a9216611d0f21854fe37a7c14ba4',
  },
];

/** The guide's §6 — four side-by-side comparisons to learn from. */
const tours = [
  {
    title: 'Same send, different witness',
    body: 'An ECDSA bech32 spend next to a Dilithium P2MR spend: the same “send coins” idea, very different witness weight.',
    links: [
      { label: 'ECDSA bech32', txid: catalogue[2].txid },
      { label: 'Dilithium P2MR', txid: catalogue[5].txid },
    ],
  },
  {
    title: 'Same custody, different cryptography',
    body: 'The ECDSA 2-of-3 next to the Dilithium CHECKMULTISIG 2-of-3: the same approval rule, different signature algorithm.',
    links: [
      { label: 'ECDSA wsh 2-of-3', txid: catalogue[4].txid },
      { label: 'Dilithium 2-of-3', txid: catalogue[7].txid },
    ],
  },
  {
    title: 'Structure first, signatures second',
    body: 'The bare OP_TRUE leaf first, then a real Dilithium leaf spend: P2MR structure, then Dilithium authorization.',
    links: [
      { label: 'OP_TRUE leaf', txid: catalogue[6].txid },
      { label: 'Dilithium P2MR', txid: catalogue[5].txid },
    ],
  },
  {
    title: 'One rule, two script styles',
    body: 'CHECKMULTISIG Dilithium beside the threshold accumulator: the same 2-of-3 rule expressed two different ways.',
    links: [
      { label: 'CHECKMULTISIG', txid: catalogue[7].txid },
      { label: 'Threshold accumulator', txid: catalogue[8].txid },
    ],
  },
];

/** The guide's §5 design note, condensed. */
const p2mrReasons = [
  'One address type — one Dilithium look (tbtq1z…), not a pile of similar-looking formats.',
  'Room for scripts — single-key, multisig and custom leaves live in the same tree model.',
  'Cleaner upgrades — Dilithium opcodes belong in P2MR tapscript, not mixed into ECDSA-era witness-v0 shapes.',
  'Easier ops — mining, wallets and explorers can all treat one Dilithium receive type as the default.',
];

const codeLines = [
  '<span class="cm"># ECDSA bech32 — the modern Bitcoin default</span>',
  '<span class="cm">$</span> <span class="hl">btq-cli</span> <span class="kw">-testnet</span> <span class="fn">getnewaddress</span>',
  '<span class="nm">tbtq1q7v3x…</span>       <span class="cm"># tbtq1q… — ECDSA</span>',
  '',
  '<span class="cm"># Dilithium P2MR — post-quantum custody</span>',
  '<span class="cm">$</span> <span class="hl">btq-cli</span> <span class="kw">-testnet</span> <span class="fn">getnewdilithiumaddress</span>',
  '<span class="nm">tbtq1z9u4k…</span>       <span class="cm"># tbtq1z… — Dilithium</span>',
  '',
  '<span class="cm"># Different prefix on purpose: Dilithium should</span>',
  '<span class="cm"># be obvious at a glance.</span>',
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 12 5 5L20 6" />
    </svg>
  );
}

const refs = [
  {
    tag: 'Read',
    title: 'The guide (PDF)',
    body: 'The full 9-page document — read it inline or download it for offline.',
    href: TT_PDF,
    cta: 'Open PDF',
    external: false,
  },
  {
    tag: 'Explore',
    title: 'Block explorer',
    body: 'Every example in the guide links straight into the live testnet explorer.',
    href: EXPLORER,
    cta: 'Open explorer',
    external: true,
  },
  {
    tag: 'Architecture',
    title: 'Protocol',
    body: 'The UTXO model, signature scheme and network parameters behind these types.',
    href: '/protocol',
    cta: 'Read the protocol',
    external: false,
  },
  {
    tag: 'Implementation',
    title: 'BTQ Core',
    body: 'The full-node implementation that validates every one of these spends.',
    href: 'https://github.com/btq-ag/btq-core',
    cta: 'View source',
    external: true,
  },
];

export default function TransactionTypesPage() {
  return (
    <div className={v2FontClassName}>
      <JsonLd data={TT_SCHEMA} />
      <JsonLd data={TT_BREADCRUMBS} />
      <div className="bqv2" data-theme="light" data-headline="grotesque">
        <RevealMount />
        <V2Nav />

        <main>
          {/* ===== HERO ===== */}
          <header className="section page-hero tt-hero">
            <div className="lattice-corner" aria-hidden="true" />
            <div className="wrap">
              <span className="eyebrow reveal">Field guide</span>
              <h1 className="display display-medium ml-display reveal d1">
                Every BTQ spend type, <span className="serif">live on-chain.</span>
              </h1>
              <p className="lead tt-lead ml-lead reveal d2">
                A Field Guide to BTQ Transaction Types tours the ten address and spend
                constructions BTQ ships — the ECDSA family Bitcoin users already know, and
                the Dilithium P2MR family that keeps custody post-quantum. Every type comes
                with a real, confirmed testnet transaction to open in the explorer.
              </p>
              <div className="hero-cta reveal d3">
                <a href={TT_PDF} className="btn btn-primary">
                  Read the PDF <span className="arrow">→</span>
                </a>
                <a href={TT_PDF} download="bitcoinquantum_transaction_types.pdf" className="btn btn-ghost">
                  Download PDF
                </a>
              </div>
              <div className="tt-meta reveal d3">
                <span className="chip"><b>9 pages</b></span>
                <span className="chip"><b>10 live examples</b></span>
                <span className="chip"><b>28 July 2026</b></span>
                <span className="chip"><b>v0.4.2-testnet</b></span>
              </div>
            </div>
          </header>

          {/* ===== PREMISE ===== */}
          <section className="statement section">
            <div className="wrap indent">
              <span className="eyebrow reveal">The premise</span>
              <p className="big reveal d1" style={{ marginTop: 4 }}>
                Two families. <span className="serif">One ledger.</span>
              </p>
              <div className="statement-foot">
                <p className="reveal d1">
                  BTQ keeps the ECDSA address types Bitcoin users know — legacy, P2SH-SegWit,
                  bech32, Taproot and wsh multisig — so existing wallets, exchanges and tools
                  can move value from day one. Alongside them runs the post-quantum family:
                  Dilithium signatures inside BIP-360 Pay-to-Merkle-Root outputs, where a
                  1,312-byte public key stays hidden behind a 32-byte Merkle root until the
                  moment it is spent.
                </p>
                <p className="reveal d2">
                  For each of the ten types, the guide covers what it is, why BTQ includes it
                  and who it is useful for — then points to a mined testnet transaction to
                  inspect: inputs, outputs, script types and witnesses, right in the explorer.
                  Learn by clicking, not just by reading.
                </p>
              </div>
            </div>
          </section>

          {/* ===== CATALOGUE ===== */}
          <section className="section section-bg-2 tt-sec" id="catalogue">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">Inside the guide</span>
                <h2 className="h2">Ten types. All with receipts.</h2>
                <p className="lead tt-lead ml-lead">
                  Every address and spend construction BTQ ships, from legacy ECDSA
                  compatibility to Dilithium post-quantum custody. Each row links to a
                  confirmed testnet transaction.
                </p>
              </div>
              <div className="tt-catalog reveal d1">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Family</th>
                      <th>Why it&apos;s here</th>
                      <th>Live example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogue.map((row) => (
                      <tr key={row.txid}>
                        <td className="tt-type">{row.type}</td>
                        <td>
                          <span className={`tt-fam${row.family === 'Dilithium' ? ' is-pq' : ''}`}>
                            {row.family}
                          </span>
                        </td>
                        <td>{row.why}</td>
                        <td>
                          <a href={txUrl(row.txid)} target="_blank" rel="noopener noreferrer" className="tt-txid">
                            {shortTx(row.txid)} ↗
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ===== SIDE-BY-SIDE TOURS ===== */}
          <section className="section tt-sec" id="tours">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">Start here</span>
                <h2 className="h2">Four side-by-side tours.</h2>
                <p className="lead tt-lead ml-lead">
                  The guide&apos;s suggested path through the explorer — open each pair in two
                  tabs and compare what you see.
                </p>
              </div>
              <div className="tt-tour">
                {tours.map((t, i) => (
                  <div key={t.title} className={`tt-step reveal${i ? ` d${Math.min(i, 3)}` : ''}`}>
                    <span className="tt-step-idx">{String(i + 1).padStart(2, '0')}</span>
                    <h3>{t.title}</h3>
                    <p>{t.body}</p>
                    <div className="tt-step-links">
                      {t.links.map((l) => (
                        <a key={l.txid + l.label} href={txUrl(l.txid)} target="_blank" rel="noopener noreferrer">
                          {l.label} · {shortTx(l.txid)} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== DESIGN NOTE (dark band) ===== */}
          <section className="under section" id="p2mr">
            <div className="wrap">
              <div className="under-grid">
                <div className="reveal">
                  <span className="eyebrow">Design note</span>
                  <h2 className="h2">Why P2MR is the Dilithium home.</h2>
                  <p className="lead">
                    BTQ does not sprinkle Dilithium across every script type. It lives in one
                    place — Pay-to-Merkle-Root, witness version 2 — for four practical reasons.
                  </p>
                  <ul>
                    {p2mrReasons.map((r) => (
                      <li key={r}><CheckIcon /> {r}</li>
                    ))}
                  </ul>
                </div>
                <div className="code reveal d1">
                  <div className="code-bar">
                    <span className="dot" /><span className="dot" /><span className="dot" />
                    <span className="fname">shell · btq-cli testnet</span>
                  </div>
                  <div className="code-body">
                    {codeLines.map((line, i) => (
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

          {/* ===== DOWNLOAD CARD ===== */}
          <section className="section">
            <div className="wrap">
              <div className="tt-dl reveal">
                <span className="eyebrow">Read the full guide</span>
                <h3>A Field Guide to BTQ Transaction Types</h3>
                <p>
                  The complete 9-page community note by Oscar and Barney Chambers — what every
                  type is, why BTQ ships it, and where to see it live. Written against the
                  public testnet, with all ten transaction identifiers in the appendix.
                </p>
                <div className="hero-cta">
                  <a href={TT_PDF} className="btn btn-primary">
                    Download PDF <span className="arrow">→</span>
                  </a>
                </div>
                <div className="tt-meta">
                  <span className="chip"><b>397 KB</b></span>
                  <span className="chip"><b>9 pages</b></span>
                  <span className="chip"><b>10 live examples</b></span>
                </div>
              </div>
            </div>
          </section>

          {/* ===== REFERENCES ===== */}
          <section className="section section-bg-2" id="references">
            <div className="wrap">
              <div className="sec-head reveal">
                <span className="eyebrow">Go deeper</span>
                <h2 className="h2">The chain behind the guide.</h2>
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
        </main>

        <V2Footer />
      </div>
    </div>
  );
}
