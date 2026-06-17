import type { Metadata } from 'next';
import GuideLayout from '../../_components/GuideLayout';

const TABLE_OF_CONTENTS = [
  { id: 'why-hd-wallets-matter', title: 'Why HD Wallets Matter' },
  { id: 'what-btq-has', title: 'What BTQ Has: The BIP-32 Skeleton' },
  { id: 'why-the-stub-breaks', title: 'Why the Stub Breaks' },
  { id: 'why-lattices-break-bip32', title: 'Why Lattices Break Naive BIP-32' },
  { id: 'construction-1', title: 'Construction 1: ML-DSA (Hardened Only)' },
  { id: 'construction-2', title: 'Construction 2: Raccoon-G (Non-Hardened)' },
  { id: 'the-size-cost', title: 'The Size Cost' },
  { id: 'the-gap-table', title: 'The Gap Between Paper and Code' },
  { id: 'what-this-means', title: 'What This Means in Practice' },
  { id: 'references', title: 'References' },
];

interface Reference {
  id: string;
  cite: React.ReactNode;
}

const REPO = 'https://github.com/btq-ag/btq-core/blob/v0.3.0-testnet';

const REFERENCES: Reference[] = [
  {
    id: 'ref-1',
    cite: (
      <>
        BTQ-Core (v0.3.0-testnet): Dilithium HD key class hierarchy in{' '}
        <a href={`${REPO}/src/crypto/dilithium_hd_key.h`} target="_blank" rel="noopener noreferrer">
          dilithium_hd_key.h
        </a>
        .
      </>
    ),
  },
  {
    id: 'ref-2',
    cite: (
      <>
        BTQ-Core (v0.3.0-testnet): non-hardened private key derivation stub in{' '}
        <a href={`${REPO}/src/crypto/dilithium_hd_key.cpp#L73-L77`} target="_blank" rel="noopener noreferrer">
          dilithium_hd_key.cpp L73&ndash;77
        </a>
        .
      </>
    ),
  },
  {
    id: 'ref-3',
    cite: (
      <>
        BTQ-Core (v0.3.0-testnet): non-hardened public key derivation stub in{' '}
        <a href={`${REPO}/src/crypto/dilithium_hd_key.cpp#L151-L155`} target="_blank" rel="noopener noreferrer">
          dilithium_hd_key.cpp L151&ndash;155
        </a>
        .
      </>
    ),
  },
  {
    id: 'ref-4',
    cite: (
      <>
        BTQ-Core (v0.3.0-testnet): the <code>SetSeed()</code> comment acknowledging the simplification in{' '}
        <a href={`${REPO}/src/crypto/dilithium_hd_key.cpp#L93`} target="_blank" rel="noopener noreferrer">
          dilithium_hd_key.cpp L93
        </a>
        .
      </>
    ),
  },
  {
    id: 'ref-5',
    cite: (
      <>
        Deegan, Fitzwater, Gur &amp; Nugent.{' '}
        <em>Lattice HD Wallets: Post-Quantum BIP32 Hierarchical Deterministic Wallets from Lattice Assumptions.</em>{' '}
        ePrint 2026/380.{' '}
        <a href="https://eprint.iacr.org/2026/380" target="_blank" rel="noopener noreferrer">
          eprint.iacr.org/2026/380
        </a>
      </>
    ),
  },
  {
    id: 'ref-6',
    cite: (
      <>
        Project Eleven.{' '}
        <em>lattice-hd-wallets</em> reference implementation (commit 461a5ed), proof-of-concept, unaudited.{' '}
        <a href="https://github.com/p-11/lattice-hd-wallets" target="_blank" rel="noopener noreferrer">
          github.com/p-11/lattice-hd-wallets
        </a>
      </>
    ),
  },
];

const DESC =
  'BIP-32 hierarchical deterministic wallets let you recover every key from a single ' +
  'seed phrase. Dilithium breaks that entirely. The BTQ codebase has a stub — here’s why ' +
  'it doesn’t work and what would be needed to fix it.';

export const metadata: Metadata = {
  title: 'HD Wallet Derivation: The Hardest Unsolved Problem in Post-Quantum Bitcoin',
  description: DESC,
  alternates: { canonical: '/guides/quantum-secure-bitcoin/hd-wallet-derivation' },
  openGraph: {
    title: 'HD Wallet Derivation in Post-Quantum Bitcoin',
    description: 'Why BIP-32 seed phrases don’t work with Dilithium — and what it would take to fix that.',
    url: '/guides/quantum-secure-bitcoin/hd-wallet-derivation',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HD Wallet Derivation in Post-Quantum Bitcoin',
    description: 'Why BIP-32 seed phrases don’t work with Dilithium — and what it would take to fix that.',
  },
};

const SIZE_ROWS = [
  { component: 'Private key', bip32: '32 B', mldsa: '2,560 B', raccoon: '16,128 B' },
  { component: 'Public key', bip32: '33 B', mldsa: '1,312 B', raccoon: '16,144 B' },
  { component: 'Signature', bip32: '64 B', mldsa: '2,420 B', raccoon: '20,768 B' },
];

const COMPARE_ROWS = [
  { feature: 'Secret distribution', mldsa: 'Bounded uniform', raccoon: 'Discrete Gaussian' },
  { feature: 'Public key structure', mldsa: 'Rounded (lossy)', raccoon: 'Full (linear)' },
  { feature: 'Non-hardened derivation', mldsa: 'Not possible', raccoon: 'Supported via Gaussian stability' },
  { feature: 'Signing architecture', mldsa: 'Rejection sampling', raccoon: 'Fiat-Shamir without aborts' },
  { feature: 'NIST status', mldsa: 'Standardized (FIPS 204)', raccoon: 'Not on NIST track' },
  { feature: 'Hardware implementation', mldsa: 'Straightforward', raccoon: 'Challenging (Gaussian sampling)' },
];

const GAP_ROWS = [
  {
    feature: 'Hardened derivation with unlinkability and unforgeability proofs',
    paper: 'Provably secure via DetKeyGen (Construction 1)',
    code: 'Stub only — XOR on 32 of 2,528 bytes',
  },
  {
    feature: 'Non-hardened public key derivation (watch-only wallets)',
    paper: 'Raccoon-G with Gaussian linearity (Construction 2)',
    code: 'Not implemented — XOR produces invalid keys',
  },
  {
    feature: 'Raccoon-G signature scheme',
    paper: 'Introduced, formally analyzed, reference implementation in Rust',
    code: 'Not present in codebase',
  },
  {
    feature: 'Watch-only wallet via public derivation',
    paper: 'Provably secure under M-LWE, M-SIS, H-MLWE',
    code: 'Broken — derived pubkey does not match derived privkey',
  },
  {
    feature: 'Rerandomizable key pairs from fixed randomness',
    paper: 'RandPK/RandSK construction with proofs',
    code: 'Absent',
  },
];

const PRIVATE_DERIV = `// Non-hardened private key derivation (dilithium_hd_key.cpp:73-77)
for (size_t i = 0; i < std::min(key.size(), (size_t)32); ++i) {
  new_key_data[i] ^= vout[i];
}`;

const PUBLIC_DERIV = `// Non-hardened public key derivation (dilithium_hd_key.cpp:151-155)
for (size_t i = 0; i < std::min(pubkey.size(), (size_t)32); ++i) {
  new_pubkey_data[i] ^= vout[i];
}`;

const CONSTRUCTION_1 = `// Construction 1: Hardened derivation (ML-DSA)
Setup:    sd, cc ← {0,1}^λ;  (sk, pk) := SIG.DetKeyGen(seed)
CKDer:    (sd', cc') := HMAC(xpriv, cc, t)
          (sk', pk') := SIG.DetKeyGen(sd')`;

const CONSTRUCTION_2 = `// Construction 2: Non-hardened derivation (Raccoon-G)
RandPK(t, ρ): (s', e') ← D^ℓ_σt × D^k_σt  via  Sam(ρ)
              return t' = As' + e' + t
RandSK(s, ρ): return s + s'
// Child derivation from public key alone:
CKDerpub:  (ω, cc') := HMAC(pk, cc, t)
           pk' := SIG.RandPK(pk, ω)`;

function Cite({ n }: { n: number }) {
  return (
    <sup className="cite">
      <a href={`#ref-${n}`}>{n}</a>
    </sup>
  );
}

export default function HDWalletDerivationGuide() {
  return (
    <GuideLayout
      title="HD Wallet Derivation"
      description="The hardest unsolved problem in post-quantum Bitcoin: can you recover all your keys from a single seed phrase? Short answer — not yet. Not in any cryptographically meaningful way."
      tableOfContents={TABLE_OF_CONTENTS}
    >
      <section id="why-hd-wallets-matter">
        <h2>Why HD Wallets Matter</h2>
        <p>
          BIP-32 hierarchical deterministic wallets are one of the most important usability innovations
          in Bitcoin&rsquo;s history. They let you generate an unlimited number of addresses from a
          single 12- or 24-word seed phrase. Lose your hardware wallet, and you can recover every key,
          every address, every coin &mdash; from those words alone.
        </p>
        <p>
          The mechanism relies on a specific algebraic property of elliptic curve cryptography: private
          keys are 256-bit integers, and you can derive child keys by adding another integer to the
          parent. The corresponding public key can be derived independently by adding the same value
          multiplied by the generator point. This linearity &mdash; the fact that scalar addition on the
          private key corresponds to point addition on the public key &mdash; is what makes non-hardened
          derivation possible.
        </p>
        <p>
          Non-hardened derivation is what enables watch-only wallets: a server or auditor can hold only
          the extended public key, derive all child public keys to monitor incoming payments, and never
          possess the ability to spend. Hardware wallets, payment processors, exchanges, and custody
          solutions all depend on this property. Without it, every new address requires a round trip to
          the signing device.
        </p>
      </section>

      <section id="what-btq-has">
        <h2>What BTQ Has: The BIP-32 Skeleton</h2>
        <p>
          The BTQ codebase contains a BIP-32-shaped class hierarchy for Dilithium HD key derivation. The
          structure is familiar to anyone who has read Bitcoin Core&rsquo;s key handling code:
        </p>
        <ul>
          <li>
            <strong><code>DilithiumExtKey</code></strong> &mdash; extended private key with chaincode and
            depth tracking. Methods: <code>SetSeed()</code>, <code>Derive()</code>, <code>Neuter()</code>.
          </li>
          <li>
            <strong><code>DilithiumExtPubKey</code></strong> &mdash; extended public key for watch-only
            derivation. Methods: <code>Derive()</code>.
          </li>
        </ul>
        <p>
          The scaffolding is complete: depth counters, parent fingerprints, child indices, chaincodes,
          and separate paths for hardened (index &ge; 2<sup>31</sup>) and non-hardened derivation. Both{' '}
          <code>Derive()</code> methods use HMAC-SHA512 to produce derivation material, exactly as BIP-32
          specifies.<Cite n={1} />
        </p>
      </section>

      <section id="why-the-stub-breaks">
        <h2>Why the Stub Breaks</h2>
        <p>
          The actual derivation logic &mdash; the part that transforms a parent key into a child key
          &mdash; is a placeholder. Both the private and public derivation paths use the same approach:
          XOR the first 32 bytes of HMAC output into the key material, and leave the remaining bytes
          unchanged.
        </p>
        <div className="script-block" style={{ whiteSpace: 'pre' }}>{PRIVATE_DERIV}</div>
        <p>
          A Dilithium2 private key is 2,528 bytes. This code modifies only the first 32 &mdash; roughly
          1.3% of the key material.<Cite n={2} /> The same pattern appears in public key derivation, where
          32 bytes of a 1,312-byte public key are XORed:
        </p>
        <div className="script-block" style={{ whiteSpace: 'pre' }}>{PUBLIC_DERIV}</div>
        <p>This produces three distinct failures:<Cite n={3} /></p>
        <ul>
          <li>
            <strong>Key pair inconsistency</strong>: The derived private key does not correspond to the
            derived public key. Signing with the child private key produces signatures that the child
            public key will not verify.
          </li>
          <li>
            <strong>No security guarantees</strong>: XORing arbitrary bytes into a structured lattice key
            does not preserve any of the mathematical properties that make Dilithium secure. The resulting
            key may not even be a valid Dilithium key.
          </li>
          <li>
            <strong>No derivation consistency</strong>: The same derivation applied independently to a
            private key and its corresponding public key produces unrelated results, breaking the
            fundamental property that makes watch-only wallets possible.
          </li>
        </ul>
        <p>
          The code itself acknowledges this limitation. A comment in <code>SetSeed()</code> reads:
          &ldquo;This is a simplified approach &mdash; in practice, Dilithium needs 1312 bytes.&rdquo;<Cite n={4} />
        </p>
      </section>

      <section id="why-lattices-break-bip32">
        <h2>Why Lattices Break Naive BIP-32</h2>
        <p>
          The stub in BTQ&rsquo;s codebase is not simply incomplete engineering &mdash; it reflects two
          fundamental structural obstacles that prevent any straightforward translation of BIP-32 to the
          lattice setting.
        </p>
        <ul>
          <li>
            <strong>Obstacle 1: Rounding.</strong> ML-DSA (standardized Dilithium) drops low-order bits
            from the public key to reduce its size. In the notation of the specification, the published
            key is <em>t&#x0302; = &lfloor;As + e&rceil;</em> rather than the raw value. Rounding is a
            lossy, non-linear operation &mdash; it does not distribute over addition. This makes
            non-hardened derivation structurally impossible for any scheme that rounds its public keys,
            because you cannot add a derivation offset to a rounded value and get a result that matches
            rounding the sum.
          </li>
          <li>
            <strong>Obstacle 2: Noise Accumulation.</strong> Even without rounding, lattice public keys
            have the form <em>t = As + e</em>. Each derivation step adds fresh noise, widening the
            distribution and potentially making derived keys statistically distinguishable from freshly
            generated ones. This breaks unlinkability &mdash; an observer could tell that two addresses
            share a parent, which BIP-32 is specifically designed to prevent.
          </li>
        </ul>
        <p>
          These are not engineering challenges to be solved with better code. They are mathematical
          properties of the ML-DSA construction itself. Any solution must either accept the limitations
          (hardened derivation only) or use a different signature scheme entirely.
        </p>
      </section>

      <section id="construction-1">
        <h2>Construction 1: ML-DSA (Hardened Only)</h2>
        <p>
          A 2026 paper by Deegan, Fitzwater, Gur, and Nugent provides the first formal treatment of
          post-quantum HD wallets with provable security under standard lattice assumptions (M-LWE,
          M-SIS).<Cite n={5} /> Their first construction uses NIST-standardized ML-DSA but accepts a
          significant limitation: <strong>all derivation requires the private key</strong>.
        </p>
        <p>
          The approach is straightforward: use HMAC to derive a fresh seed from the parent&rsquo;s
          extended private key, then feed that seed into ML-DSA&rsquo;s deterministic <code>DetKeyGen</code>{' '}
          to produce a complete child key pair. Because the public key is never involved in the derivation
          input, <code>CKDerpub</code> (child key derivation from public key) cannot be defined.
        </p>
        <div className="script-block" style={{ whiteSpace: 'pre' }}>{CONSTRUCTION_1}</div>
        <p>
          This is what BTQ&rsquo;s stub <em>should</em> be doing for hardened derivation: instead of XORing
          32 bytes into an existing key, it should use the HMAC output as a complete seed for{' '}
          <code>DetKeyGen</code>, producing a fresh, valid ML-DSA key pair. The security proof bounds the
          unlinkability advantage by{' '}
          <em>q<sub>hmac</sub>&middot;(q<sub>pk</sub>+1)/2<sup>&lambda;</sup> + &epsilon;<sub>ML-DSA</sub></em>.
        </p>
        <p>
          The tradeoff: seed-based recovery works (you can regenerate every key from the master seed), but
          watch-only wallets do not. Every address derivation requires access to the private key,
          eliminating one of BIP-32&rsquo;s most important features.
        </p>
      </section>

      <section id="construction-2">
        <h2>Construction 2: Raccoon-G (Non-Hardened)</h2>
        <p>
          The paper&rsquo;s primary contribution is a second construction that recovers full non-hardened
          derivation &mdash; including watch-only wallets &mdash; but requires a different signature
          scheme: Raccoon-G, a variant of the Raccoon threshold signature scheme that replaces
          sums-of-uniform secrets with <strong>discrete Gaussian secrets</strong>.
        </p>
        <p>
          Two key modifications make this possible. First, the full unrounded public key <em>t = As + e</em>{' '}
          is published (not the rounded <em>t&#x0302;</em>). Rounding to <em>t&#x0302;</em> is performed
          inline during <code>Sign</code> and <code>Verify</code> only, preserving linearity for
          derivation. Second, the scheme introduces two rerandomization functions:
        </p>
        <div className="script-block" style={{ whiteSpace: 'pre' }}>{CONSTRUCTION_2}</div>
        <p>
          The critical insight is <strong>Gaussian stability</strong>: by the Micciancio&ndash;Peikert
          lemma, the sum of independent Gaussians of width &sigma; is statistically close to a Gaussian of
          width &sigma;&radic;n at derivation depth n. This means derived keys remain in the same
          distributional family as freshly generated ones, enabling provable unlinkability &mdash; an
          observer cannot tell that two child keys share a parent.
        </p>
        <p>
          The security proof uses a five-hybrid argument showing that depth-n signatures are
          indistinguishable from depth-1 signatures, relying on H-MLWE (Hint Module Learning With Errors)
          hardness. Unforgeability is proved under UF-CMA-HRK (unforgeability under honestly rerandomized
          keys).
        </p>
        <p>
          <strong>Bounded derivation depth:</strong> Unlike classical BIP-32 (where non-hardened
          derivation depth is unlimited), noise accumulation imposes a maximum tree depth fixed at key
          generation time. In practice this matches BIP-44&rsquo;s deployment pattern: hardened derivation
          for the first three levels (purpose, coin type, account) resets noise, and non-hardened
          derivation at the final two levels (change, address index) branches from those hardened roots.
        </p>
        <p>
          <strong>Chain code caveat:</strong> The same warning applies as in classical BIP-32 &mdash; if
          an attacker obtains a child&rsquo;s secret key together with the chain code, they can recover the
          parent secret key for all siblings in the non-hardened subtree. Hardened nodes eliminate this by
          deriving the offset from the parent private key.
        </p>
      </section>

      <section id="the-size-cost">
        <h2>The Size Cost</h2>
        <p>
          Raccoon-G recovers the algebraic properties needed for non-hardened derivation, but at a
          dramatic cost in key and signature sizes. The unrounded public key and Gaussian secret
          distribution both require substantially more storage than ML-DSA:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>BIP-32</th>
                <th>ML-DSA</th>
                <th>Raccoon-G</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_ROWS.map((row) => (
                <tr key={row.component}>
                  <td>{row.component}</td>
                  <td>{row.bip32}</td>
                  <td>{row.mldsa}</td>
                  <td>{row.raccoon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Raccoon-G signatures are nearly 9x larger than ML-DSA and over 320x larger than classical ECDSA.
          A single Raccoon-G transaction would consume approximately 20 KB for the signature alone &mdash;
          compared to the roughly 250-byte total size of a standard Bitcoin transaction today.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>ML-DSA</th>
                <th>Raccoon-G</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{row.mldsa}</td>
                  <td>{row.raccoon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          This is the fundamental tradeoff: non-hardened derivation (and thus watch-only wallets) is
          possible in the post-quantum setting, but only with a signature scheme that produces keys and
          signatures an order of magnitude larger than even ML-DSA&rsquo;s already-large outputs.
        </p>
      </section>

      <section id="the-gap-table">
        <h2>The Gap Between Paper and Code</h2>
        <p>
          The following summarizes what the research literature describes versus what exists in the BTQ
          v0.3.0-testnet codebase:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Capability</th>
                <th>Research</th>
                <th>BTQ v0.3</th>
              </tr>
            </thead>
            <tbody>
              {GAP_ROWS.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{row.paper}</td>
                  <td>{row.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The project has the BIP-32 scaffolding &mdash; depth, fingerprint, chaincode, the
          hardened/non-hardened flag &mdash; but the cryptographic core that would make any of it
          functional is absent. The paper&rsquo;s primary contribution (provably-secure non-hardened
          post-quantum public key derivation via Raccoon-G) would need to be implemented from scratch. A
          reference implementation exists in Rust with a Python bridge to the Raccoon-G reference code, but
          it is proof-of-concept only &mdash; unaudited and not intended for production.<Cite n={6} />
        </p>
      </section>

      <section id="what-this-means">
        <h2>What This Means in Practice</h2>
        <p>
          For users of a Dilithium-based Bitcoin fork today, the practical consequence is significant:{' '}
          <strong>you cannot rely on a seed phrase to recover your wallet</strong>. Each Dilithium key
          pair must be backed up individually, and the wallet file itself becomes the critical backup
          artifact rather than a mnemonic phrase.
        </p>
        <p>The path forward involves hard choices:</p>
        <ul>
          <li>
            <strong>Construction 1 (hardened-only)</strong> is implementable today using
            NIST-standardized ML-DSA. It restores seed-based recovery by using <code>DetKeyGen</code> to
            derive complete key pairs from HMAC-expanded seeds. Watch-only wallets are sacrificed. This is
            what BTQ&rsquo;s stub should be replaced with as a minimum viable improvement.
          </li>
          <li>
            <strong>Construction 2 (Raccoon-G)</strong> recovers full BIP-32 functionality including
            watch-only wallets, but requires adopting an unstandardized signature scheme with 20 KB
            signatures and 16 KB keys. No production implementation exists. Hardware wallet support would
            be challenging due to Gaussian sampling requirements.
          </li>
          <li>
            <strong>Hybrid approaches</strong> could use classical BIP-32 derived seeds at each path as
            input to Dilithium key generation. This preserves seed recovery and uses standardized
            algorithms, but does not enable public-key-only derivation.
          </li>
        </ul>
        <p>
          This is arguably the hardest unsolved problem in post-quantum Bitcoin engineering. The signature
          swap, the block size expansion, the address format changes &mdash; those are large engineering
          tasks, but they have clear solutions. HD wallet derivation for lattice signatures remains an
          open research problem with no production-ready answer. The Deegan et al. paper demonstrates that
          the problem is solvable in principle &mdash; but the solution demands either accepting reduced
          functionality or adopting cryptographic primitives that have not yet been vetted by the
          standards process.
        </p>
      </section>

      <section id="references">
        <h2>References</h2>
        <ol className="references">
          {REFERENCES.map((ref) => (
            <li key={ref.id} id={ref.id}>
              {ref.cite}
            </li>
          ))}
        </ol>
      </section>
    </GuideLayout>
  );
}
