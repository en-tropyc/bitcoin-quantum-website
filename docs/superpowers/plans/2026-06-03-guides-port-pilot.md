# Guides Port — Pilot Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship one fully-styled, voice-edited guide article ("From ECDSA to Dilithium") on bitcoinquantum.com under `/guides`, with a shared v2 `GuideLayout`, a `/guides` hub, and a dynamic per-article OG image — as the approved template for porting the rest.

**Architecture:** Port the qdayanon JSX article into the repo's `.bqv2` design system. A new server-component `GuideLayout` provides nav/breadcrumb/sticky-TOC/footer chrome; article prose uses semantic HTML styled by a new `.guide` block in `v2.css` (no per-element color classes). A per-route `opengraph-image.tsx` extends the existing root OG template. The hub lists only released articles from a data array.

**Tech Stack:** Next.js 15 App Router (server components), TypeScript, Tailwind v4 + scoped `v2.css`, `next/og` `ImageResponse` (Node runtime).

**Spec:** `docs/superpowers/specs/2026-06-03-guides-port-pilot-design.md`

**No test runner exists in this repo.** Verification per task = `npm run lint` + `npm run build` (type errors surface here) + a stated visual check. Commit after each task.

---

## File Structure

```
src/app/guides/
  page.tsx                                           CREATE  /guides hub (server component)
  opengraph-image.tsx                                CREATE  hub OG image
  _components/GuideLayout.tsx                         CREATE  shared v2 layout (server component)
  _data/guides.ts                                     CREATE  released-articles array (data-driven hub)
  quantum-secure-bitcoin/signature-migration/
    page.tsx                                          CREATE  pilot article
    opengraph-image.tsx                               CREATE  per-article OG image
src/components/v2/v2.css                              MODIFY  add `.guide` prose block (+ breadcrumb/TOC)
src/components/v2/V2Nav.tsx                           MODIFY  add Guides nav link
src/app/sitemap.ts                                    MODIFY  add /guides + pilot URLs
```

---

## Task 1: `.guide` styles + breadcrumb/TOC in `v2.css`

**Files:**
- Modify: `src/components/v2/v2.css` (append at end of file)

- [ ] **Step 1: Append the guide style block to `v2.css`**

Append this to the end of `src/components/v2/v2.css`. All selectors are scoped under `.bqv2` and use existing design tokens only.

```css

/* ============================================================
   Guides — long-form article prose + layout chrome
   ============================================================ */

.bqv2 .guide-breadcrumb {
  font-family: var(--mono);
  font-size: 13px;
  letter-spacing: 0.02em;
  color: var(--ink-3);
  margin-bottom: 28px;
}
.bqv2 .guide-breadcrumb a { color: var(--ink-3); text-decoration: none; }
.bqv2 .guide-breadcrumb a:hover { color: var(--accent-ink); }
.bqv2 .guide-breadcrumb .sep { margin: 0 8px; opacity: 0.5; }
.bqv2 .guide-breadcrumb .current { color: var(--ink-2); }

.bqv2 .guide-header { margin-bottom: 40px; }
.bqv2 .guide-header h1 {
  font-family: var(--display);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
  color: var(--headline);
  font-size: clamp(34px, 5vw, 52px);
  margin: 0 0 16px;
}
.bqv2 .guide-header p {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(18px, 2.2vw, 22px);
  color: var(--ink-2);
  max-width: 60ch;
  margin: 0;
}

/* two-column body: sticky TOC + article */
.bqv2 .guide-body { display: flex; flex-direction: column; gap: 40px; }
@media (min-width: 1024px) {
  .bqv2 .guide-body { flex-direction: row; gap: 56px; }
  .bqv2 .guide-toc { width: 220px; flex-shrink: 0; }
  .bqv2 .guide-toc-inner { position: sticky; top: 100px; }
}
.bqv2 .guide-toc h2 {
  font-family: var(--mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-3);
  border-bottom: 1px solid var(--line);
  padding-bottom: 10px;
  margin: 0 0 14px;
}
.bqv2 .guide-toc ol { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
.bqv2 .guide-toc a {
  display: flex; gap: 8px;
  font-size: 14px; color: var(--ink-2); text-decoration: none; line-height: 1.4;
}
.bqv2 .guide-toc a:hover { color: var(--accent-ink); }
.bqv2 .guide-toc a .n { color: var(--ink-3); }

/* article prose */
.bqv2 .guide { flex: 1; min-width: 0; max-width: 72ch; }
.bqv2 .guide section { margin-bottom: 44px; scroll-margin-top: 96px; }
.bqv2 .guide h2 {
  font-family: var(--display);
  font-weight: 700;
  font-size: clamp(22px, 3vw, 28px);
  color: var(--ink);
  letter-spacing: -0.01em;
  border-bottom: 1px solid var(--line);
  padding-bottom: 10px;
  margin: 0 0 18px;
}
.bqv2 .guide p { color: var(--ink-2); line-height: 1.7; margin: 0 0 16px; }
.bqv2 .guide p:last-child { margin-bottom: 0; }
.bqv2 .guide strong { color: var(--ink); font-weight: 700; }
.bqv2 .guide a { color: var(--accent-ink); text-decoration: underline; text-underline-offset: 2px; }
.bqv2 .guide ul { margin: 0 0 16px; padding-left: 22px; display: flex; flex-direction: column; gap: 8px; }
.bqv2 .guide li { color: var(--ink-2); line-height: 1.6; }
.bqv2 .guide sup { font-size: 0.7em; }
.bqv2 .guide code {
  font-family: var(--mono);
  font-size: 0.88em;
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 1px 5px;
}

/* data rows (size comparison, opcode list) */
.bqv2 .guide .data-row {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 12px 16px;
  margin-bottom: 10px;
}
.bqv2 .guide .data-row .row-head {
  display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 4px;
}
.bqv2 .guide .data-row .label { font-weight: 700; color: var(--ink); }
.bqv2 .guide .data-row code.label { font-family: var(--mono); word-break: break-all; }
.bqv2 .guide .data-row .ratio { color: var(--accent-ink); font-weight: 700; flex-shrink: 0; }
.bqv2 .guide .data-row .detail { color: var(--ink-3); font-size: 0.92em; }
.bqv2 .guide .data-row .src { font-size: 0.8em; }

/* script / code block */
.bqv2 .guide .script-block {
  font-family: var(--mono);
  font-size: 14px;
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  color: var(--ink);
  padding: 16px;
  margin: 0 0 8px;
  overflow-x: auto;
}
.bqv2 .guide .script-block .tag { color: var(--accent-ink); }

.bqv2 .guide-back { margin-top: 48px; }
.bqv2 .guide-back a { color: var(--ink-3); text-decoration: none; font-size: 14px; }
.bqv2 .guide-back a:hover { color: var(--accent-ink); }
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no new errors (CSS isn't linted by eslint; this confirms nothing else broke).

- [ ] **Step 3: Commit**

```bash
git add src/components/v2/v2.css
git commit -m "feat(guides): add .guide prose + layout styles to v2.css"
```

---

## Task 2: `GuideLayout` component

**Files:**
- Create: `src/app/guides/_components/GuideLayout.tsx`

- [ ] **Step 1: Create the component**

Mirrors the exact v2 page wrapper used by `src/app/protocol/page.tsx` (outer `v2FontClassName` div → `.bqv2` themed div → `RevealMount`/`V2Nav`/`main`/`V2Footer`).

```tsx
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
```

- [ ] **Step 2: Lint + typecheck via build**

Run: `npm run lint && npm run build`
Expected: PASS (no unused imports, no type errors). The component isn't routed yet; build just confirms it compiles.

- [ ] **Step 3: Commit**

```bash
git add src/app/guides/_components/GuideLayout.tsx
git commit -m "feat(guides): add v2 GuideLayout (nav, breadcrumb, sticky TOC)"
```

---

## Task 3: Pilot article page

**Files:**
- Create: `src/app/guides/quantum-secure-bitcoin/signature-migration/page.tsx`

Content ported from qdayanon `frontend/src/app/(public)/guides/quantum-secure-bitcoin/signature-migration/page.tsx`. **Restyle + light voice pass applied:** all `text-[#2C1810]`/sepia classes removed (styling comes from `.guide` CSS); em dashes replaced with commas/colons/parentheses (voice-dna rule); no technical claims, numbers, or section order changed. Data arrays (size comparison, opcodes) preserved and rendered with the `.data-row` class.

- [ ] **Step 1: Create the page with full content**

```tsx
import type { Metadata } from 'next';
import GuideLayout from '../../_components/GuideLayout';

const TABLE_OF_CONTENTS = [
  { id: 'why-ecdsa-breaks', title: 'Why ECDSA Breaks' },
  { id: 'what-replaces-it', title: 'What Replaces It: CRYSTALS-Dilithium' },
  { id: 'size-comparison', title: 'The Size Comparison' },
  { id: 'new-opcodes', title: 'New Opcodes for a New Signature' },
  { id: 'auto-detection', title: 'Auto-Detection: Running Both in One Block' },
  { id: 'wallet-integration', title: 'Wallet Integration' },
  { id: 'what-bitcoin-is-doing', title: 'What Bitcoin Itself Is Doing' },
];

const DESC =
  "What changing Bitcoin's signature algorithm actually requires: the opcodes, " +
  'size impacts, wallet changes, and auto-detection needed to run ECDSA and ' +
  'Dilithium in one blockchain.';

export const metadata: Metadata = {
  title: "From ECDSA to Dilithium: What Changing Bitcoin's Signatures Requires",
  description: DESC,
  alternates: { canonical: '/guides/quantum-secure-bitcoin/signature-migration' },
  openGraph: {
    title: 'From ECDSA to Dilithium',
    description: "What changing Bitcoin's signature algorithm actually requires, in working code.",
    url: '/guides/quantum-secure-bitcoin/signature-migration',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From ECDSA to Dilithium',
    description: "What changing Bitcoin's signature algorithm actually requires.",
  },
};

const SIZE_ROWS = [
  { component: 'Public key', ecdsa: '33 bytes', dilithium: '1,312 bytes', ratio: '40x' },
  { component: 'Signature', ecdsa: '~72 bytes', dilithium: '2,420 bytes', ratio: '34x' },
  { component: 'Private key', ecdsa: '32 bytes', dilithium: '2,560 bytes', ratio: '80x' },
  { component: 'Per-input witness', ecdsa: '~105 bytes', dilithium: '~3,733 bytes', ratio: '36x' },
  { component: '1-input transaction', ecdsa: '~250 bytes', dilithium: '~3,824 bytes', ratio: '15x' },
];

const OPCODES = [
  { name: 'OP_CHECKSIGDILITHIUM', hex: '0xbb', line: 218, purpose: 'Verify Dilithium signature against pubkey and sighash' },
  { name: 'OP_CHECKSIGDILITHIUMVERIFY', hex: '0xbc', line: 219, purpose: 'Same, but aborts script on failure' },
  { name: 'OP_CHECKMULTISIGDILITHIUM', hex: '0xbd', line: 220, purpose: 'M-of-N multi-signature with Dilithium keys' },
  { name: 'OP_CHECKMULTISIGDILITHIUMVERIFY', hex: '0xbe', line: 221, purpose: 'Same, aborts on failure' },
  { name: 'OP_DILITHIUM_PUBKEY', hex: '0xbf', line: 222, purpose: 'Marks stack item as Dilithium public key' },
];

const REPO = 'https://github.com/btq-ag/btq-core/blob/v0.3.0-testnet';

export default function SignatureMigrationGuide() {
  return (
    <GuideLayout
      title="From ECDSA to Dilithium"
      description="What changing Bitcoin's signature algorithm actually requires: from the mathematical vulnerability to the new opcodes, wallet formats, and the challenge of running two cryptographic systems in parallel."
      tableOfContents={TABLE_OF_CONTENTS}
    >
      <section id="why-ecdsa-breaks">
        <h2>Why ECDSA Breaks</h2>
        <p>
          Bitcoin&rsquo;s digital signatures use the Elliptic Curve Digital Signature Algorithm (ECDSA)
          on the secp256k1 curve. When you create a Bitcoin wallet, your software picks a random
          256-bit number (the private key), multiplies it by a fixed generator point on the curve
          (producing the public key), then hashes the public key to create your address. Security
          rests on the assumption that reversing the multiplication, computing the private key from
          the public key, is computationally infeasible.
        </p>
        <p>
          This assumption holds against classical computers. The best known classical attack
          (Pollard&rsquo;s rho) requires approximately 2<sup>128</sup> operations for secp256k1, a
          number so large that no classical computer could complete it before the heat death of the
          universe. But Peter Shor demonstrated in 1994 that a quantum computer can solve the
          underlying problem, the elliptic curve discrete logarithm, in polynomial time.
        </p>
        <p>
          A 2021 study by Webber et al. estimated that breaking secp256k1 would require approximately
          2,330 logical qubits. With current error correction overhead (roughly 1,000 to 10,000
          physical qubits per logical qubit), this translates to millions of physical qubits: beyond
          today&rsquo;s machines, but within the range that multiple hardware roadmaps target for the
          2030s and 2040s.
        </p>
        <p>
          The vulnerability is specific: it applies to any output where the public key has been
          revealed on-chain. This includes all Pay-to-Public-Key (P2PK) outputs (early Bitcoin, including
          Satoshi&rsquo;s coins), any address that has been spent from (the public key appears in the
          transaction input), and Taproot (P2TR) outputs where the tweaked public key is always visible.
          Unspent outputs at hashed addresses (P2PKH, P2WPKH) are protected until the moment you spend
          them, at which point the public key is exposed.
        </p>
      </section>

      <section id="what-replaces-it">
        <h2>What Replaces It: CRYSTALS-Dilithium</h2>
        <p>
          CRYSTALS-Dilithium, standardized by NIST as FIPS 204 (published August 2024), is a
          lattice-based digital signature scheme. Its security rests on the Module Learning With Errors
          (MLWE) problem, a fundamentally different mathematical structure from the elliptic curve
          problems that Shor&rsquo;s algorithm exploits.
        </p>
        <p>
          In simplified terms: MLWE asks you to distinguish between a system of linear equations with
          small random errors and a truly random system. This problem has no known efficient quantum
          algorithm. Where Shor&rsquo;s algorithm provides an exponential speedup against ECDSA, the
          best known quantum approach to MLWE (Grover-enhanced lattice sieving) provides only a modest
          improvement that can be compensated by slightly increasing key sizes.
        </p>
        <p>
          Dilithium provides the same formal security guarantee as ECDSA, Existential Unforgeability
          under Chosen Message Attack (EUF-CMA), meaning an attacker who can request signatures on
          messages of their choice still cannot forge a signature on a new message. The key difference
          is that this guarantee is expected to hold against both classical and quantum adversaries.
        </p>
        <p>
          The BTQ project chose Dilithium2 (NIST Security Level 2, equivalent to 128-bit quantum
          security) as its default parameter set. Higher security levels (Dilithium3 at Level 3,
          Dilithium5 at Level 5) are available in the codebase but produce even larger keys and
          signatures. Level 2 represents the pragmatic balance: adequate security margin against
          foreseeable quantum threats while minimizing the size penalty that propagates through every
          layer of the system.
        </p>
      </section>

      <section id="size-comparison">
        <h2>The Size Comparison</h2>
        <p>
          The most consequential difference between ECDSA and Dilithium is not speed. Dilithium
          verification (~1.5ms) is actually faster than ECDSA verification (~2ms). It is size.
        </p>
        <div>
          {SIZE_ROWS.map((row) => (
            <div key={row.component} className="data-row">
              <div className="row-head">
                <span className="label">{row.component}</span>
                <span className="ratio">{row.ratio}</span>
              </div>
              <div className="detail">
                ECDSA: {row.ecdsa} &rarr; Dilithium2: {row.dilithium}
              </div>
            </div>
          ))}
        </div>
        <p>
          Every one of these size increases propagates through the system: block sizes must grow to
          maintain throughput, network message limits must increase for block propagation, script
          size limits must accommodate larger stack elements, and wallet storage expands significantly.
          The 15x transaction size increase is the single most important number in quantum-resistant
          Bitcoin design. Every engineering decision downstream flows from it.
        </p>
      </section>

      <section id="new-opcodes">
        <h2>New Opcodes for a New Signature</h2>
        <p>
          Bitcoin&rsquo;s script language uses <code>OP_CHECKSIG</code> (opcode 0xac) to verify ECDSA
          signatures. A quantum-resistant chain needs equivalent opcodes for Dilithium verification.
          The BTQ implementation adds five new opcodes in the unused opcode space above
          Bitcoin&rsquo;s <code>OP_CHECKSIGADD</code>:
        </p>
        <div>
          {OPCODES.map((op) => (
            <div key={op.hex} className="data-row">
              <div className="row-head">
                <code className="label">{op.name}</code>
                <span className="ratio">{op.hex}</span>
              </div>
              <p className="detail">{op.purpose}</p>
              <a
                className="src"
                href={`${REPO}/src/script/script.h#L${op.line}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                script.h L{op.line} · v0.3.0-testnet
              </a>
            </div>
          ))}
        </div>
        <p>
          A standard Dilithium P2PKH (Pay-to-Public-Key-Hash) script looks almost identical to
          Bitcoin&rsquo;s, with only the final opcode changed:
        </p>
        <div className="script-block">
          <div><span className="tag">Bitcoin:</span> OP_DUP OP_HASH160 &lt;20-byte hash&gt; OP_EQUALVERIFY OP_CHECKSIG</div>
          <div><span className="tag">BTQ:</span> OP_DUP OP_HASH160 &lt;20-byte hash&gt; OP_EQUALVERIFY OP_CHECKSIGDILITHIUM</div>
        </div>
        <p>
          The opcode placement (0xbb to 0xbf) required careful consideration. These values originally
          fell within the <code>OP_SUCCESSx</code> range defined in BIP-342, which meant any Taproot
          script containing them would unconditionally succeed without validation. That was a critical
          vulnerability discovered during development and patched by narrowing the OP_SUCCESSx range to
          start at 0xc0.{' '}
          <a href={`${REPO}/src/script/script.cpp#L347-L356`} target="_blank" rel="noopener noreferrer">
            View source: src/script/script.cpp L347&ndash;356
          </a>
        </p>
      </section>

      <section id="auto-detection">
        <h2>Auto-Detection: Running Both in One Block</h2>
        <p>
          A quantum-resistant Bitcoin cannot require an instant cutover from ECDSA to Dilithium.
          Wallets must be upgraded, keys migrated, and funds moved, a process that will take years.
          During the transition, both signature types must coexist in the same blockchain, even in the
          same block.
        </p>
        <p>
          The BTQ implementation achieves this through size-based auto-detection in the script
          interpreter. When the interpreter encounters signature or public key data on the stack:
        </p>
        <ul>
          <li>Public key &gt; 100 bytes routes to the Dilithium verification path</li>
          <li>Signature &gt; 500 bytes skips DER encoding checks (Dilithium uses raw format)</li>
          <li>Otherwise, standard ECDSA verification</li>
        </ul>
        <p>
          This approach means existing ECDSA transactions work unchanged: no special flags, no version
          bumps, no opt-in. The interpreter simply recognizes the cryptographic primitive from the data
          size and routes accordingly. A single block can contain a mix of ECDSA and Dilithium
          transactions with no coordination between them.
        </p>
      </section>

      <section id="wallet-integration">
        <h2>Wallet Integration</h2>
        <p>
          Wallet software must store, encrypt, and manage Dilithium keys alongside existing ECDSA keys.
          The BTQ implementation adds dedicated key types to the wallet database:
        </p>
        <ul>
          <li>
            <strong>Unencrypted storage</strong>: Dilithium private keys (2,560 bytes each) are stored
            under a <code>DILITHIUM_KEY</code> record type, keyed by the 20-byte key ID (the same
            RIPEMD160(SHA256(pubkey)) hash used for addresses).
          </li>
          <li>
            <strong>Encrypted storage</strong>: When the wallet is encrypted, keys are wrapped with
            AES-256-CBC using the wallet&rsquo;s master key, the same encryption mechanism used for
            ECDSA keys. The encrypted form is stored as <code>DILITHIUM_CRYPTED_KEY</code>.
          </li>
          <li>
            <strong>Memory security</strong>: Private key objects use secure heap allocation with guard
            pages and call <code>memory_cleanse()</code> on destruction to prevent key material from
            lingering in memory.
          </li>
        </ul>
        <p>
          A practical limitation: BIP-32 hierarchical deterministic (HD) derivation, which allows
          recovery of all keys from a single seed phrase, does not yet have a standard equivalent for
          Dilithium. The BTQ codebase includes an HD derivation implementation using HMAC-SHA512, but
          it is not yet wired into wallet key generation. Until this matures, users must back up the
          full wallet file rather than relying on a seed phrase alone.
        </p>
      </section>

      <section id="what-bitcoin-is-doing">
        <h2>What Bitcoin Itself Is Doing</h2>
        <p>
          Bitcoin Core has not yet begun implementing post-quantum signatures, but the research
          community is active. The most developed proposal is BIP-360 by Hunter Beast, which defines a
          Pay-to-Quantum-Resistant-Hash (P2QRH) output type supporting multiple PQC signature schemes
          including FALCON, SPHINCS+, and lattice-based options.
        </p>
        <p>
          Other proposals explore using <code>OP_CAT</code> (if re-enabled) to verify arbitrary
          signature schemes in Bitcoin Script without dedicated opcodes, and hash-based emergency
          signatures (Lamport/Winternitz) as a rapid-deployment fallback.
        </p>
        <p>
          The consensus challenge is significant: Bitcoin&rsquo;s conservative governance culture makes
          sweeping cryptographic changes politically difficult. Every approach involves tradeoffs
          between signature size, block space, backward compatibility, and activation risk. Projects
          that implement these changes on separate networks, as BTQ has done with Dilithium and as
          Ethereum researchers are exploring with their own PQC proposals, provide working reference
          implementations that the Bitcoin community can evaluate against real-world performance data.
        </p>
      </section>
    </GuideLayout>
  );
}
```

- [ ] **Step 2: Build + lint**

Run: `npm run lint && npm run build`
Expected: PASS. Route `/guides/quantum-secure-bitcoin/signature-migration` appears in the build output.

- [ ] **Step 3: Visual check**

Run: `npm run dev`, open `http://localhost:3000/guides/quantum-secure-bitcoin/signature-migration`.
Expected: v2 blue theme (no sepia), sticky TOC on desktop, anchor links jump to sections, size/opcode rows render as bordered cards, no em dashes in the prose.

- [ ] **Step 4: Commit**

```bash
git add src/app/guides/quantum-secure-bitcoin/signature-migration/page.tsx
git commit -m "feat(guides): port signature-migration article (v2 restyle + voice pass)"
```

---

## Task 4: Per-article OG image

**Files:**
- Create: `src/app/guides/quantum-secure-bitcoin/signature-migration/opengraph-image.tsx`

Adapted from `src/app/opengraph-image.tsx` (same fonts, palette, wordmark). Differences: a `GUIDE · QUANTUM-SECURE BITCOIN` eyebrow and the article title as the headline.

- [ ] **Step 1: Create the OG image route**

```tsx
import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'From ECDSA to Dilithium — Bitcoin Quantum guide';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG       = '#F1F2F4';
const HEADLINE = '#0B5A8E';
const ACCENT   = '#35A4EA';
const INK_3    = '#888F99';

const EYEBROW = 'GUIDE · QUANTUM-SECURE BITCOIN';
const TITLE   = 'From ECDSA to Dilithium';

const logoSvg = readFileSync(
  join(process.cwd(), 'public/v2/logo-light.svg'),
  'utf-8'
);
const LOGO_DATA_URL = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

export default async function Image() {
  const archivo = await fetch(
    'https://cdn.jsdelivr.net/npm/@fontsource/archivo@5/files/archivo-latin-800-normal.woff'
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: '64px 80px',
          fontFamily: 'Archivo',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 540,
            height: 540,
            backgroundImage: `radial-gradient(${ACCENT}22 2px, transparent 2px)`,
            backgroundSize: '24px 24px',
            opacity: 0.65,
          }}
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO_DATA_URL} alt="Bitcoin Quantum" width={300} height={38} />

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 1000 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              color: ACCENT,
              letterSpacing: 4,
              textTransform: 'uppercase',
              fontWeight: 600,
              fontSize: 22,
              marginBottom: 24,
            }}
          >
            <div style={{ width: 3, height: 22, background: ACCENT, marginRight: 14 }} />
            {EYEBROW}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 88,
              fontWeight: 800,
              color: HEADLINE,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            {TITLE}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            color: HEADLINE,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <span style={{ color: INK_3, fontWeight: 500, marginRight: 'auto', fontSize: 22 }}>
            bitcoinquantum.com/guides
          </span>
          bitcoinquantum.com
          <span style={{ display: 'flex', alignItems: 'center', fontSize: 32, marginLeft: 12 }}>→</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Archivo', data: archivo, weight: 800, style: 'normal' }],
    }
  );
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: PASS. The build emits an `opengraph-image` route under the article path.

- [ ] **Step 3: Visual check**

Run: `npm run dev`, open `http://localhost:3000/guides/quantum-secure-bitcoin/signature-migration/opengraph-image`.
Expected: 1200×630 PNG, wordmark top-left, accent eyebrow, "From ECDSA to Dilithium" headline, URL bottom-right. View page source of the article and confirm `<meta property="og:image">` points at this route.

- [ ] **Step 4: Commit**

```bash
git add src/app/guides/quantum-secure-bitcoin/signature-migration/opengraph-image.tsx
git commit -m "feat(guides): dynamic OG image for signature-migration"
```

---

## Task 5: Released-articles data + `/guides` hub + hub OG

**Files:**
- Create: `src/app/guides/_data/guides.ts`
- Create: `src/app/guides/page.tsx`
- Create: `src/app/guides/opengraph-image.tsx`

- [ ] **Step 1: Create the released-articles data**

Only released articles appear here (spec: no "coming soon"). Adding a guide later is one entry.

```ts
export interface GuideListing {
  slug: string;
  href: string;
  title: string;
  blurb: string;
}

export const RELEASED_GUIDES: GuideListing[] = [
  {
    slug: 'signature-migration',
    href: '/guides/quantum-secure-bitcoin/signature-migration',
    title: 'From ECDSA to Dilithium',
    blurb:
      "What changing Bitcoin's signature algorithm actually requires: opcodes, " +
      'size impacts, wallet changes, and running both schemes in one block.',
  },
];
```

- [ ] **Step 2: Create the hub page**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import RevealMount from '@/components/v2/RevealMount';
import '@/components/v2/v2.css';
import { RELEASED_GUIDES } from './_data/guides';

const DESC =
  'Technical guides to quantum-secure Bitcoin: how post-quantum signatures, ' +
  'addresses, mining, and migration work on a live network.';

export const metadata: Metadata = {
  title: 'Guides',
  description: DESC,
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'Guides | Bitcoin Quantum',
    description: DESC,
    url: '/guides',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides | Bitcoin Quantum',
    description: DESC,
  },
};

export default function GuidesHub() {
  return (
    <div className={v2FontClassName}>
      <div className="bqv2" data-theme="light" data-headline="grotesque">
        <RevealMount />
        <V2Nav />
        <main>
          <article className="section">
            <div className="wrap">
              <span className="eyebrow reveal">Guides</span>
              <header className="guide-header">
                <h1>Quantum-Secure Bitcoin</h1>
                <p>{DESC}</p>
              </header>
              <div className="guide" style={{ maxWidth: '72ch' }}>
                {RELEASED_GUIDES.map((g) => (
                  <Link key={g.slug} href={g.href} className="data-row" style={{ display: 'block', textDecoration: 'none' }}>
                    <div className="row-head">
                      <span className="label">{g.title}</span>
                      <span className="ratio">&rarr;</span>
                    </div>
                    <p className="detail">{g.blurb}</p>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </main>
        <V2Footer />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create the hub OG image**

Copy `src/app/guides/quantum-secure-bitcoin/signature-migration/opengraph-image.tsx` to `src/app/guides/opengraph-image.tsx` and change only these three top-level constants:

```tsx
export const alt = 'Bitcoin Quantum — Quantum-Secure Bitcoin guides';
const EYEBROW = 'GUIDES';
const TITLE   = 'Quantum-Secure Bitcoin';
```

(Everything else in the file is identical to Task 4.)

- [ ] **Step 4: Build + lint**

Run: `npm run lint && npm run build`
Expected: PASS. `/guides` and its `opengraph-image` appear in build output.

- [ ] **Step 5: Visual check**

Run: `npm run dev`, open `http://localhost:3000/guides`.
Expected: hub lists exactly one article (From ECDSA to Dilithium) as a clickable card; clicking it reaches the article. OG at `/guides/opengraph-image` renders.

- [ ] **Step 6: Commit**

```bash
git add src/app/guides/_data/guides.ts src/app/guides/page.tsx src/app/guides/opengraph-image.tsx
git commit -m "feat(guides): add /guides hub (released-articles list) + hub OG"
```

---

## Task 6: Wire up navigation + sitemap

**Files:**
- Modify: `src/components/v2/V2Nav.tsx:8-12`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Add the Guides nav link**

In `src/components/v2/V2Nav.tsx`, change the `NAV_LINKS` array to:

```tsx
const NAV_LINKS = [
  { href: '/protocol', label: 'Protocol' },
  { href: '/testnet',  label: 'Testnet'  },
  { href: '/guides',   label: 'Guides'   },
  { href: '/faq',      label: 'FAQ'      },
] as const;
```

- [ ] **Step 2: Add sitemap entries**

In `src/app/sitemap.ts`, add these two objects to the returned array (after the `/testnet` entry):

```ts
    {
      url: `${baseUrl}/guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/quantum-secure-bitcoin/signature-migration`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
```

- [ ] **Step 3: Build + lint**

Run: `npm run lint && npm run build`
Expected: PASS.

- [ ] **Step 4: Visual check**

Run: `npm run dev`, open `http://localhost:3000/` and any page.
Expected: "Guides" appears in the top nav between Testnet and FAQ; it's marked active on `/guides`. `http://localhost:3000/sitemap.xml` lists both new URLs.

- [ ] **Step 5: Commit**

```bash
git add src/components/v2/V2Nav.tsx src/app/sitemap.ts
git commit -m "feat(guides): add Guides to nav and sitemap"
```

---

## Final verification

- [ ] **Full build + lint clean**

Run: `npm run build && npm run lint`
Expected: both pass with no errors.

- [ ] **Manual smoke (dark mode + responsive)**

Run: `npm run dev`. On `/guides/quantum-secure-bitcoin/signature-migration`: toggle the theme (dark renders correctly), narrow the viewport (TOC collapses above content, no horizontal scroll), confirm every TOC anchor scrolls to its section.

---

## Self-review notes

- **Spec coverage:** routes (Task 5/6), GuideLayout (Task 2), `.guide` CSS (Task 1), pilot article + voice pass (Task 3), dynamic OG (Task 4), nav + sitemap (Task 6), hub with released-only list (Task 5). All spec sections mapped.
- **Dropped from source (per spec):** PublicHeader, Latest Dispatches, /archives, /posts, sepia theme, serif body — none appear in any task.
- **Voice pass** is concrete in Task 3 (em dashes → commas/colons/parens; the prose above already has this applied, not a placeholder).
- **Type consistency:** `GuideLayout` prop names (`title`, `description`, `tableOfContents`, `children`), `TocEntry`/`GuideListing` shapes, and `RELEASED_GUIDES` usage match across Tasks 2, 3, 5.
