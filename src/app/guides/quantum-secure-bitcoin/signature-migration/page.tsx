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
