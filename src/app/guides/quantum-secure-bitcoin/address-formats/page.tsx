import type { Metadata } from 'next';
import GuideLayout from '../../_components/GuideLayout';

const TABLE_OF_CONTENTS = [
  { id: 'hash160-trick', title: 'The Hash160 Trick' },
  { id: 'dual-prefixes', title: 'Dual Address Prefixes' },
  { id: 'bech32m', title: 'Bech32m Encoding' },
  { id: 'address-reuse', title: 'Why Address Reuse Gets Worse' },
  { id: 'p2mr-addresses', title: 'P2MR: The Quantum-Safe Address' },
  { id: 'references', title: 'References' },
];

interface Reference {
  id: string;
  cite: React.ReactNode;
}

const REFERENCES: Reference[] = [
  {
    id: 'ref-1',
    cite: (
      <>
        Bitcoin Improvement Proposals.{' '}
        <em>BIP-173: Base32 address format (Bech32)</em> and{' '}
        <em>BIP-350: Bech32m format for v1+ witness addresses</em>.{' '}
        <a href="https://github.com/bitcoin/bips/blob/master/bip-0173.mediawiki" target="_blank" rel="noopener noreferrer">
          bip-0173
        </a>
        ,{' '}
        <a href="https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki" target="_blank" rel="noopener noreferrer">
          bip-0350
        </a>
        .
      </>
    ),
  },
  {
    id: 'ref-2',
    cite: (
      <>
        Beast.{' '}
        <em>BIP-360: Pay-to-Merkle-Root (P2MR)</em>, originally drafted as P2QRH.{' '}
        <a href="https://bip360.org/" target="_blank" rel="noopener noreferrer">
          bip360.org
        </a>
      </>
    ),
  },
];

const DESC =
  'A 1,312-byte Dilithium public key compressed to a 20-byte address using the same ' +
  'Hash160 function Bitcoin has always used. Dual prefixes, bech32m encoding, and why ' +
  'address reuse matters more than ever.';

export const metadata: Metadata = {
  title: 'Quantum-Safe Addresses: How Hash160 Keeps Them Small',
  description: DESC,
  alternates: { canonical: '/guides/quantum-secure-bitcoin/address-formats' },
  openGraph: {
    title: 'Quantum-Safe Addresses',
    description: 'How Hash160 keeps quantum-resistant addresses small.',
    url: '/guides/quantum-secure-bitcoin/address-formats',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum-Safe Addresses',
    description: 'How Hash160 keeps quantum-resistant addresses small.',
  },
};

const PREFIX_ROWS = [
  { format: 'Legacy (Base58)', ecdsa: 'B...', dilithium: 'D...' },
  { format: 'SegWit (Bech32)', ecdsa: 'qbtc1q...', dilithium: 'dbtc1q...' },
  { format: 'Testnet (Bech32)', ecdsa: 'tbtq1q...', dilithium: 'tdbt1q...' },
  { format: 'P2MR (SegWit v2)', ecdsa: 'N/A', dilithium: 'bc1z...' },
];

function Cite({ n }: { n: number }) {
  return (
    <sup className="cite">
      <a href={`#ref-${n}`}>{n}</a>
    </sup>
  );
}

export default function AddressFormatsGuide() {
  return (
    <GuideLayout
      title="Quantum-Safe Addresses"
      description="How a 1,312-byte public key becomes a 20-byte address — the same Hash160 compression Bitcoin has always used, applied to Dilithium keys with dual prefixes for safety."
      tableOfContents={TABLE_OF_CONTENTS}
    >
      <section id="hash160-trick">
        <h2>The Hash160 Trick</h2>
        <p>
          One of the most common misconceptions about post-quantum Bitcoin addresses is that they must
          be enormous &mdash; after all, if the public key is 1,312 bytes, wouldn&rsquo;t the address
          be correspondingly large? The answer is no, thanks to a design decision Satoshi made in 2009.
        </p>
        <p>
          Bitcoin addresses are not public keys. They are <strong>hashes of public keys</strong>. The
          standard construction applies two hash functions in sequence: RIPEMD160(SHA256(public_key)),
          producing a 20-byte key ID. This 20-byte hash is then encoded with a prefix byte and a
          checksum to create the address you see in wallets.
        </p>
        <p>
          The same construction works for Dilithium keys. Take the 1,312-byte Dilithium public key,
          apply SHA256, then apply RIPEMD160, and you get a 20-byte key ID &mdash; exactly the same
          size as a Bitcoin ECDSA key ID. The full public key never appears on-chain until the moment
          you spend from the address. Until then, only the 20-byte hash is stored in the UTXO set.
        </p>
        <p>
          This has a critical security benefit: the hash provides pre-image resistance. Even a quantum
          computer running Grover&rsquo;s algorithm gets only a quadratic speedup against hash functions
          &mdash; reducing RIPEMD160&rsquo;s security from 160 bits to approximately 80 bits, which is
          still computationally infeasible. As long as you never reveal the full public key (by spending
          from the address), a quantum attacker cannot apply Shor&rsquo;s algorithm because they
          don&rsquo;t have the elliptic curve point to work with.
        </p>
      </section>

      <section id="dual-prefixes">
        <h2>Dual Address Prefixes</h2>
        <p>
          A quantum-resistant chain that supports both ECDSA and Dilithium must distinguish between the
          two address types. Sending funds to the wrong address type could result in lost coins if the
          recipient&rsquo;s wallet doesn&rsquo;t support the corresponding signature scheme.
        </p>
        <p>
          The BTQ implementation uses distinct prefixes for each key type across all address formats:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Format</th>
                <th>ECDSA</th>
                <th>Dilithium</th>
              </tr>
            </thead>
            <tbody>
              {PREFIX_ROWS.map((row) => (
                <tr key={row.format}>
                  <td>{row.format}</td>
                  <td>{row.ecdsa === 'N/A' ? <em>N/A</em> : <code>{row.ecdsa}</code>}</td>
                  <td><code>{row.dilithium}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The prefix distinction serves as a visual safety check &mdash; users and wallet software can
          immediately identify whether an address expects an ECDSA or Dilithium signature. This prevents
          accidental cross-scheme transactions during the migration period. The convention of
          &ldquo;D&rdquo; for Dilithium addresses provides intuitive recognition.
        </p>
      </section>

      <section id="bech32m">
        <h2>Bech32m Encoding</h2>
        <p>
          Modern Bitcoin addresses use Bech32 or Bech32m encoding (BIP-173, BIP-350), which provides
          error detection, is case-insensitive, and avoids visually ambiguous characters. Bech32m (the
          improved variant) is used for SegWit version 1+ outputs, including Taproot and P2MR.<Cite n={1} />
        </p>
        <p>
          A Bech32m address has three parts: a human-readable prefix (HRP), a separator
          (&ldquo;1&rdquo;), and a data section including a version byte and the witness program. For
          Dilithium SegWit addresses, the witness program is the same 20-byte Hash160 of the Dilithium
          public key. For P2MR addresses, the witness program is the 32-byte Merkle root of the script
          tree.
        </p>
        <p>
          The error detection properties of Bech32m are especially important for Dilithium addresses
          because the consequences of sending to a wrong address are the same as in Bitcoin &mdash; the
          funds are permanently lost. The encoding guarantees detection of up to 4 character errors and
          provides a high probability of detecting random errors beyond that.
        </p>
      </section>

      <section id="address-reuse">
        <h2>Why Address Reuse Gets Worse</h2>
        <p>
          Address reuse has always been discouraged in Bitcoin for privacy reasons. In a quantum world,
          the reasons become existential.
        </p>
        <p>
          When you spend from a Bitcoin address, your full public key appears in the transaction input.
          If you receive more funds to the same address afterward, those funds are now sitting behind an{' '}
          <strong>exposed public key</strong>. A classical attacker cannot exploit this (reversing ECDSA
          from the public key is infeasible classically). A quantum attacker can.
        </p>
        <p>
          With Dilithium, the same dynamic applies: the public key (1,312 bytes) appears in the witness
          when you spend. If you reuse the address and receive more funds, those funds are protected only
          by the Hash160 &mdash; which remains quantum-safe &mdash; <em>but</em> the full Dilithium
          public key is now in the blockchain history. A future quantum computer capable of breaking
          Dilithium (if MLWE turns out to be weaker than believed) would have the key available to attack.
        </p>
        <p>
          The recommendation is the same for both ECDSA and Dilithium, but with higher stakes: use a
          fresh address for every receive. This keeps the public key hidden behind its Hash160 until you
          spend, maximizing the number of cryptographic barriers an attacker must overcome.
        </p>
      </section>

      <section id="p2mr-addresses">
        <h2>P2MR: The Quantum-Safe Address</h2>
        <p>
          Pay-to-Merkle-Root (P2MR) addresses, as proposed in BIP-360, use SegWit version 2 with the{' '}
          <code>bc1z...</code> prefix. Unlike P2PKH or P2WPKH (which store a hash of the public key) or
          P2TR (which stores the tweaked public key directly), P2MR stores only the 32-byte Merkle root
          of the script tree.<Cite n={2} />
        </p>
        <p>
          No public key of any kind appears on-chain until the output is spent. Even then, only the
          specific script branch used in the spend is revealed &mdash; other branches remain hidden,
          preserving privacy about alternative spending conditions (just as in Taproot&rsquo;s script
          path).
        </p>
        <p>
          For quantum resistance, P2MR provides the strongest possible guarantee: the Dilithium public
          key is hidden until spend time, and the Dilithium signature scheme itself is believed secure
          against quantum adversaries. There is no key-path bypass, no exposed public key to attack
          preemptively, and the on-chain footprint (32-byte Merkle root) is identical to a Taproot output
          &mdash; no storage penalty for the additional security.
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
