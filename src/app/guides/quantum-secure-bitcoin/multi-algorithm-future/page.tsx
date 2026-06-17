import type { Metadata } from 'next';
import GuideLayout from '../../_components/GuideLayout';

const TABLE_OF_CONTENTS = [
  { id: 'why-one-isnt-enough', title: "Why One Algorithm Isn't Enough" },
  { id: 'dilithium-first', title: 'Dilithium-First Strategy' },
  { id: 'falcon', title: 'Falcon: Smaller Signatures, Complex Math' },
  { id: 'sphincs', title: 'SPHINCS+: The Conservative Backup' },
  { id: 'framework-design', title: 'Designing a Multi-Algorithm Framework' },
  { id: 'cryptographic-agility', title: 'The Cryptographic Agility Principle' },
];

const DESC =
  'Dilithium is the right first choice for quantum-resistant Bitcoin, but cryptographic ' +
  "agility demands a framework for Falcon, SPHINCS+, and algorithms that don't exist yet.";

export const metadata: Metadata = {
  title: "Beyond Dilithium: Why One Algorithm Isn't Enough",
  description: DESC,
  alternates: { canonical: '/guides/quantum-secure-bitcoin/multi-algorithm-future' },
  openGraph: {
    title: 'Beyond Dilithium',
    description: "Why one post-quantum algorithm isn't enough for a blockchain.",
    url: '/guides/quantum-secure-bitcoin/multi-algorithm-future',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beyond Dilithium',
    description: "Why one post-quantum algorithm isn't enough for a blockchain.",
  },
};

const SIZE_ROWS = [
  { property: 'Public key', dilithium: '1,312 bytes', falcon: '897 bytes' },
  { property: 'Signature', dilithium: '2,420 bytes', falcon: '~666 bytes' },
  { property: 'Per-input witness', dilithium: '~3,733 bytes', falcon: '~1,564 bytes' },
];

export default function MultiAlgorithmFutureGuide() {
  return (
    <GuideLayout
      title="Beyond Dilithium"
      description="Dilithium is the right first choice — NIST-standardized, well-analyzed, good performance. But a responsible blockchain must plan for the possibility that any single algorithm could be weakened."
      tableOfContents={TABLE_OF_CONTENTS}
    >
      <section id="why-one-isnt-enough">
        <h2>Why One Algorithm Isn&rsquo;t Enough</h2>
        <p>
          The history of cryptography is a history of unexpected breaks. MD5 was considered secure for
          fifteen years before practical collision attacks appeared. SHA-1 was the standard for a decade
          before theoretical attacks materialized, followed by practical ones. The NIST PQC competition
          itself eliminated SIKE &mdash; a finalist &mdash; after a devastating classical attack was
          found in 2022, years into the evaluation process.
        </p>
        <p>
          Lattice-based cryptography (the family underlying Dilithium) has been studied seriously for
          roughly two decades. Compare this to RSA&rsquo;s nearly fifty years of analysis or AES&rsquo;s
          twenty-five. While no practical attacks have emerged against MLWE, the shorter track record
          means a non-zero probability of surprises. A blockchain that commits to a single algorithm
          without a migration path is betting its entire security on that algorithm&rsquo;s permanence.
        </p>
        <p>
          The response is not to avoid commitment &mdash; Dilithium is the best available choice today
          &mdash; but to build the architecture for algorithm rotation into the protocol from the start.
          Adding a second algorithm to a system designed for one is far harder than supporting multiple
          algorithms from the beginning.
        </p>
      </section>

      <section id="dilithium-first">
        <h2>Dilithium-First Strategy</h2>
        <p>
          The BTQ project adopts a &ldquo;Dilithium-first&rdquo; strategy: implement one algorithm
          thoroughly before expanding to multiple. This is deliberate pragmatism, not algorithmic
          monoculture.
        </p>
        <p>The rationale for Dilithium as the first algorithm:</p>
        <ul>
          <li>
            <strong>NIST standardization</strong>: Published as FIPS 204 in August 2024, making it the
            first NIST-standardized post-quantum digital signature scheme. This provides institutional
            legitimacy and community trust.
          </li>
          <li>
            <strong>Security analysis</strong>: Dilithium has survived the most extensive public
            cryptanalysis of any PQC signature scheme &mdash; years of scrutiny during the NIST
            competition plus ongoing academic analysis.
          </li>
          <li>
            <strong>Implementation maturity</strong>: Reference implementations exist in multiple
            languages, hardware acceleration (AVX2) is available, and the algorithm has been integrated
            into major TLS libraries.
          </li>
          <li>
            <strong>Performance balance</strong>: Verification (~1.5ms) is faster than ECDSA (~2ms).
            Signing (~3ms) is practical for interactive use. Key and signature sizes, while large, are
            smaller than SPHINCS+ and comparable to Falcon.
          </li>
        </ul>
        <p>
          Implementing one algorithm well teaches lessons that apply to all subsequent algorithms: how to
          handle large signatures in script validation, how to adjust block weight accounting, how to
          manage wallet key storage, and how to design address formats. These are generic problems whose
          solutions transfer to any PQC scheme.
        </p>
      </section>

      <section id="falcon">
        <h2>Falcon: Smaller Signatures, Complex Math</h2>
        <p>
          FALCON (Fast Fourier Lattice-based Compact Signatures over NTRU) was selected alongside
          Dilithium in the NIST PQC competition and is being standardized as FN-DSA (FIPS 206). Its key
          advantage: much smaller signatures.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Dilithium2</th>
                <th>Falcon-512</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_ROWS.map((row) => (
                <tr key={row.property}>
                  <td>{row.property}</td>
                  <td>{row.dilithium}</td>
                  <td>{row.falcon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Falcon&rsquo;s ~666-byte signatures are less than a third the size of Dilithium&rsquo;s, which
          would significantly ease the block capacity and payout batching pressures described earlier. A
          Falcon transaction would be roughly 6x larger than ECDSA instead of 15x.
        </p>
        <p>
          The tradeoff is implementation complexity. Falcon&rsquo;s signing process requires
          high-precision floating-point arithmetic to sample from a discrete Gaussian distribution over
          NTRU lattices. This makes constant-time implementation &mdash; essential for preventing
          side-channel attacks &mdash; considerably harder than for Dilithium, which uses only integer
          arithmetic. The signing process is also more resource-intensive, though verification is fast.
        </p>
        <p>
          For a blockchain, Falcon&rsquo;s smaller signatures make it attractive for transaction
          throughput, while the implementation complexity makes it a higher-risk first choice. As a
          second algorithm added after Dilithium has proven the integration patterns, Falcon could
          provide meaningful size improvements for users willing to accept a newer implementation.
        </p>
      </section>

      <section id="sphincs">
        <h2>SPHINCS+: The Conservative Backup</h2>
        <p>
          SPHINCS+ (standardized as SLH-DSA, FIPS 205) takes a fundamentally different approach to
          post-quantum security. While Dilithium and Falcon rely on the hardness of lattice problems,
          SPHINCS+ relies only on the properties of hash functions &mdash; collision resistance and
          preimage resistance. These are the most studied and trusted primitives in all of cryptography.
        </p>
        <p>
          The security argument for SPHINCS+ is minimal: if hash functions work, SPHINCS+ is secure. No
          algebraic structure, no number-theoretic assumptions, no lattice problems. Just hashing.
          Grover&rsquo;s algorithm provides only a quadratic speedup against hash functions, which is
          compensated by doubling the hash output size.
        </p>
        <p>
          The cost is size. SPHINCS+ signatures range from 7,856 bytes (SPHINCS+-128s, optimized for
          size) to 49,856 bytes (SPHINCS+-256f, optimized for speed at the highest security level). Even
          the smallest parameter set produces signatures 3x larger than Dilithium and 12x larger than
          Falcon. For a blockchain, this means even fewer transactions per block and higher fees.
        </p>
        <p>
          SPHINCS+ serves as the ultimate hedge: if a breakthrough weakens all lattice-based assumptions
          simultaneously, SPHINCS+ remains secure because it depends on entirely different mathematics.
          NIST recommends it specifically for applications requiring long-term signature verification or
          the most conservative security assumptions. In a multi-algorithm blockchain, SPHINCS+ would be
          the option for users who prioritize security certainty above all else.
        </p>
      </section>

      <section id="framework-design">
        <h2>Designing a Multi-Algorithm Framework</h2>
        <p>The BTQ consensus parameters include an explicit framework for multi-algorithm support:</p>
        <div className="script-block">
          <div>enum SignatureAlgorithm {'{'}</div>
          <div>&nbsp;&nbsp;NONE,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Legacy mode (any algorithm accepted)</div>
          <div>&nbsp;&nbsp;DILITHIUM,&nbsp;// CRYSTALS-Dilithium (NIST FIPS 204)</div>
          <div>&nbsp;&nbsp;FALCON,&nbsp;&nbsp;&nbsp;&nbsp;// Falcon (NIST FIPS 206)</div>
          <div>&nbsp;&nbsp;SPHINCS&nbsp;&nbsp;&nbsp;&nbsp;// SPHINCS+ (NIST FIPS 205)</div>
          <div>{'}'}</div>
        </div>
        <p>
          Currently set to <code>NONE</code> (allowing any algorithm), this field is designed for future
          soft-fork activation of algorithm enforcement. The architectural pattern is intentional: adding
          a new algorithm requires implementing the cryptographic primitives, adding opcodes, and
          activating the consensus field &mdash; not redesigning the framework.
        </p>
        <p>Key design decisions for multi-algorithm support:</p>
        <ul>
          <li>
            <strong>Per-output algorithm choice</strong>: Each UTXO can use a different signature scheme.
            Users select their algorithm when creating an address, not when the network activates a
            consensus rule.
          </li>
          <li>
            <strong>Cross-algorithm transactions</strong>: A single transaction can have inputs from
            different algorithm types (e.g., one Dilithium input and one Falcon input). The script
            interpreter validates each input with the appropriate algorithm.
          </li>
          <li>
            <strong>Algorithm-specific weight accounting</strong>: Different signature sizes should
            produce different weight contributions, ensuring that the block weight system correctly
            reflects the actual data burden of each algorithm.
          </li>
        </ul>
        <p>
          For BIP-360&rsquo;s approach to Bitcoin, the P2QRH (Pay-to-Quantum-Resistant-Hash) proposal
          similarly supports multiple algorithms &mdash; the output format includes an algorithm
          identifier so the verifier knows which scheme to use. This convergence in design between
          independent implementations suggests that multi-algorithm support is a natural requirement, not
          an over-engineering choice.
        </p>
      </section>

      <section id="cryptographic-agility">
        <h2>The Cryptographic Agility Principle</h2>
        <p>
          Cryptographic agility is the ability of a system to transition between cryptographic algorithms
          without redesigning the system itself. It has been a design principle in protocol engineering
          since the TLS suite negotiation mechanism, which allows clients and servers to agree on
          algorithms at connection time.
        </p>
        <p>
          For a blockchain, cryptographic agility is harder because the consensus rules are shared and
          immutable. You cannot negotiate algorithms per-connection; you must support specific algorithms
          at the protocol level, and adding new ones requires a consensus change (typically a soft fork).
          But you can design the protocol so that adding a new algorithm is a bounded change &mdash; new
          opcodes, new address prefix, new weight parameters &mdash; rather than a full protocol redesign.
        </p>
        <p>
          The lesson from the PQC transition itself reinforces this principle. The reason Bitcoin faces
          such a difficult migration is that ECDSA was hardcoded as the only signature algorithm, with no
          framework for alternatives. Every proposal to add PQC to Bitcoin requires significant consensus
          changes because the original protocol assumed a single signature scheme would last forever.
        </p>
        <p>
          Building a multi-algorithm framework from the start does not mean implementing every algorithm
          immediately. It means designing the data structures, consensus rules, and validation paths so
          that a future algorithm can be added through a predictable, bounded upgrade process. The cost is
          modest additional complexity in the consensus code. The benefit is avoiding the painful,
          contentious, system-wide migration that Bitcoin now faces.
        </p>
      </section>
    </GuideLayout>
  );
}
