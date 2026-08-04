import type { Metadata } from 'next';
import GuideLayout from '../../_components/GuideLayout';
import { socialMeta } from '@/lib/seo';

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
  {
    id: 'ref-3',
    cite: (
      <>
        Chambers, O. &amp; Chambers, B.{' '}
        <em>A Field Guide to BTQ Transaction Types</em>, BTQ Core, 28 July 2026 (network{' '}
        <code>v0.4.2-testnet</code>). Documents P2MR as the single home for Dilithium, the retirement
        of the Dilithium witness-v0 format, and legacy Dilithium Base58 as historical, each with a
        confirmed testnet transaction on the{' '}
        <a href="https://explorer.bitcoinquantum.com" target="_blank" rel="noopener noreferrer">
          public explorer
        </a>
        .
      </>
    ),
  },
];

const DESC =
  'A 1,312-byte Dilithium public key never lands in an address. Hash160 holds ECDSA and ' +
  'legacy Dilithium addresses to 20 bytes; current Dilithium destinations commit to a ' +
  '32-byte Merkle root under P2MR. Prefixes, bech32m, and why address reuse matters more ' +
  'than ever.';

export const metadata: Metadata = {
  title: 'Quantum-Safe Addresses: How BTQ Keeps Them Small',
  description: DESC,
  alternates: { canonical: '/guides/quantum-secure-bitcoin/address-formats' },
  ...socialMeta({
    title: 'Quantum-Safe Addresses',
    description:
      'Why a 1,312-byte post-quantum public key still produces a short address.',
    path: '/guides/quantum-secure-bitcoin/address-formats',
    type: 'article',
  }),
};

/**
 * Verified against btq-core `src/kernel/chainparams.cpp` at tag v0.4.2-testnet:
 * mainnet bech32_hrp "qbtc", testnet "tbtq". P2MR is witness v2 under the *same*
 * HRP as ECDSA, distinguished by the version character (q = v0, z = v2) — not a
 * separate HRP. `null` means the combination is not a spendable destination.
 */
const PREFIX_ROWS: { format: string; ecdsa: string | null; dilithium: string | null }[] = [
  { format: 'Legacy (Base58), mainnet', ecdsa: 'B...', dilithium: null },
  { format: 'Legacy (Base58), testnet', ecdsa: 'm... / n...', dilithium: 'n...' },
  { format: 'SegWit v0 (Bech32), mainnet', ecdsa: 'qbtc1q...', dilithium: null },
  { format: 'SegWit v0 (Bech32), testnet', ecdsa: 'tbtq1q...', dilithium: null },
  { format: 'P2MR (SegWit v2, Bech32m), mainnet', ecdsa: null, dilithium: 'qbtc1z...' },
  { format: 'P2MR (SegWit v2, Bech32m), testnet', ecdsa: null, dilithium: 'tbtq1z...' },
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
      description="A 1,312-byte public key still yields a short address, because an address commits to a key rather than carrying one. Hash160 does that for ECDSA and for BTQ's original Dilithium format; today's Dilithium destinations commit to a 32-byte Merkle root under P2MR."
      tableOfContents={TABLE_OF_CONTENTS}
      slug="/guides/quantum-secure-bitcoin/address-formats"
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
          The same construction works on a Dilithium key. Take the 1,312-byte public key, apply
          SHA256, then RIPEMD160, and you get a 20-byte key ID &mdash; exactly the size of a Bitcoin
          ECDSA key ID. BTQ&rsquo;s original Dilithium address format did precisely this, and testnet
          still carries outputs of that shape.<Cite n={3} />
        </p>
        <p>
          That format is now historical. Dilithium was consolidated into <strong>P2MR</strong>
          (Pay-to-Merkle-Root, witness version 2), where the output commits not to a 20-byte hash of
          one public key but to a <strong>32-byte Merkle root</strong> of a script tree &mdash; which
          is what lets a single address stand for a single-key check, a multisig policy, or a
          threshold accumulator.<Cite n={3} /> So Hash160 is the right mental model for ECDSA
          addresses and for the deprecated Dilithium Base58 form; it is not how a Dilithium address
          you generate today is built. The <a href="#p2mr-addresses">P2MR section</a> covers the
          current construction.
        </p>
        <p>
          What survives the change is the property that matters: <strong>an address is a commitment,
          not a key</strong>. Whether it commits to a 20-byte key ID or a 32-byte Merkle root, the
          Dilithium public key itself never appears on-chain until you spend. Twelve bytes of
          difference does not change the economics &mdash; both are trivially small next to the
          1,312-byte key they stand in for.
        </p>
        <p>
          The commitment also carries a security benefit: it provides pre-image resistance. A quantum
          computer running Grover&rsquo;s algorithm gets only a quadratic speedup against hash
          functions &mdash; roughly halving the effective bits, which leaves both constructions
          computationally infeasible to invert. As long as the full public key stays unrevealed, a
          quantum attacker has nothing to run Shor&rsquo;s algorithm against.
        </p>
      </section>

      <section id="dual-prefixes">
        <h2>Dual Address Prefixes</h2>
        <div className="guide-note">
          <span className="guide-note-label">Correction &middot; 29 July 2026</span>
          <p>
            The prefix table below has been corrected. As first published it listed P2MR addresses as{' '}
            <code>bc1z...</code>, which is Bitcoin&rsquo;s human-readable prefix rather than
            BTQ&rsquo;s, and it listed <code>dbtc1q...</code> / <code>tdbt1q...</code> as Dilithium
            receive addresses.
          </p>
          <p>
            Two things changed since. Dilithium was restricted to P2MR (BIP-360) tapscript, so the
            witness-v0 Dilithium bech32 format is no longer a spendable destination on any network.
            And P2MR does not use a Dilithium-specific prefix at all: it shares the ECDSA
            human-readable prefix and is distinguished by the witness version character.
          </p>
          <p>
            The same consolidation makes the Hash160 construction described above a historical
            account rather than a current one. It is how BTQ&rsquo;s original Dilithium Base58
            addresses were built, and how ECDSA addresses are still built, but a Dilithium address
            generated today commits to a 32-byte Merkle root instead. That section has been scoped
            accordingly; it was not removed, because the deprecated outputs it describes are still
            on testnet.
          </p>
          <p>
            The corrected values are verified against btq-core at <code>v0.4.2-testnet</code>,
            against live testnet outputs, and against the BTQ Core field guide to transaction
            types.<Cite n={3} />
          </p>
        </div>
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
                  <td>{row.ecdsa ? <code>{row.ecdsa}</code> : <em>not applicable</em>}</td>
                  <td>
                    {row.dilithium ? <code>{row.dilithium}</code> : <em>not a valid destination</em>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The distinction still serves as a visual safety check, but it is carried by the{' '}
          <strong>witness version character</strong> rather than by a separate prefix. On testnet an
          ECDSA SegWit v0 address reads <code>tbtq1q...</code> and a Dilithium P2MR address reads{' '}
          <code>tbtq1z...</code> &mdash; same human-readable prefix, and the character after the
          &ldquo;1&rdquo; separator tells you which scheme will authorize the spend. Wallet software
          should key off the witness version, not the prefix string.
        </p>
        <p>
          The legacy Base58 Dilithium format remains decodable so history and block explorers still
          render it, and it stays a valid payment destination on testnet only while P2MR-only
          enforcement is unscheduled there. It is deprecated: new wallets and mining payouts should use{' '}
          <code>getnewdilithiumaddress</code>, which returns a P2MR address.
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
          ECDSA SegWit v0 addresses, the witness program is a 20-byte Hash160 of the public key. For
          P2MR addresses &mdash; the only bech32m form Dilithium uses &mdash; the witness program is
          the 32-byte Merkle root of the script tree.
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
          Pay-to-Merkle-Root (P2MR) addresses, as proposed in BIP-360, use SegWit version 2 &mdash;{' '}
          <code>qbtc1z...</code> on mainnet, <code>tbtq1z...</code> on testnet. Unlike P2PKH or
          P2WPKH (which store a hash of the public key) or
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
