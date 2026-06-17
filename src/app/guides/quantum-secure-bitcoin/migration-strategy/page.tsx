import type { Metadata } from 'next';
import GuideLayout from '../../_components/GuideLayout';

const TABLE_OF_CONTENTS = [
  { id: 'hard-vs-gradual', title: 'Hard Cutover vs Gradual Migration' },
  { id: 'dual-signature', title: 'Dual-Signature Blocks' },
  { id: 'lost-coins', title: 'The Lost Coins Problem' },
  { id: 'exposed-keys', title: 'Already-Exposed Public Keys' },
  { id: 'hardware-wallets', title: 'Hardware Wallet Updates' },
  { id: 'canary-network', title: 'The Canary Network Thesis' },
];

const DESC =
  'Hard cutover versus gradual migration in a monetary system. Lost wallets, exposed ' +
  'keys, hardware updates, and why a separate network proves the migration works before ' +
  'Bitcoin needs it.';

export const metadata: Metadata = {
  title: 'The Gradual Migration: Why Both Signature Types Must Coexist',
  description: DESC,
  alternates: { canonical: '/guides/quantum-secure-bitcoin/migration-strategy' },
  openGraph: {
    title: 'The Gradual Migration',
    description: 'Why both ECDSA and Dilithium must coexist during the quantum transition.',
    url: '/guides/quantum-secure-bitcoin/migration-strategy',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Gradual Migration',
    description: 'Why both signature types must coexist during the quantum transition.',
  },
};

export default function MigrationStrategyGuide() {
  return (
    <GuideLayout
      title="The Gradual Migration"
      description="You cannot flip a switch and change the cryptography under a monetary system carrying hundreds of billions in value. Both signature types must coexist — and the migration will take years."
      tableOfContents={TABLE_OF_CONTENTS}
    >
      <section id="hard-vs-gradual">
        <h2>Hard Cutover vs Gradual Migration</h2>
        <p>
          There are two approaches to migrating a blockchain&rsquo;s signature scheme. A{' '}
          <strong>hard cutover</strong> would set a block height after which only post-quantum
          signatures are accepted &mdash; all existing UTXOs must be moved to new address types before
          the deadline. A <strong>gradual migration</strong> introduces new signature types alongside
          the existing ones, allowing both to coexist indefinitely while the ecosystem transitions.
        </p>
        <p>
          For a monetary system, the gradual approach is the only responsible choice. A hard cutover
          creates a deadline after which any unmigrated funds become permanently inaccessible. Given
          that Bitcoin has millions of inactive wallets, addresses with lost keys, and users in
          jurisdictions with limited access to updated wallet software, a hard cutover would effectively
          confiscate funds from people who cannot or do not migrate in time.
        </p>
        <p>
          The gradual approach has its own costs &mdash; maintaining two cryptographic codepaths
          increases complexity, doubles the testing surface, and means the chain carries ECDSA&rsquo;s
          quantum vulnerability until the last ECDSA UTXO is spent. But the alternative (forced migration
          or fund loss) is worse for a system whose value proposition is property rights and censorship
          resistance.
        </p>
      </section>

      <section id="dual-signature">
        <h2>Dual-Signature Blocks</h2>
        <p>
          In a gradual migration, any single block may contain both ECDSA and Dilithium transactions.
          The node software must validate each transaction with the appropriate algorithm, and the
          consensus rules must define how both types count toward block weight and sigop limits.
        </p>
        <p>
          The BTQ implementation handles this through size-based auto-detection in the script interpreter
          (public keys over 100 bytes route to Dilithium; otherwise ECDSA) and parallel address systems
          (distinct prefixes for each key type). The wallet can hold both ECDSA and Dilithium keys, and
          the payout system handles mixed batches &mdash; processing ECDSA payouts in large batches and
          Dilithium payouts in smaller groups of 15.
        </p>
        <p>
          For Bitcoin, the equivalent would be a soft fork adding a new output type (like
          BIP-360&rsquo;s P2QRH) that existing nodes treat as &ldquo;anyone can spend&rdquo; while
          upgraded nodes enforce the post-quantum signature rules. This is the standard Bitcoin upgrade
          mechanism &mdash; the same approach used for SegWit and Taproot. Old transactions remain valid.
          New transactions gain quantum resistance. The two coexist within the same block and the same
          chain.
        </p>
      </section>

      <section id="lost-coins">
        <h2>The Lost Coins Problem</h2>
        <p>
          An estimated 3&ndash;4 million bitcoin are held in wallets where the owner has permanently lost
          access to the private keys &mdash; through hardware failure, lost seed phrases, death without
          estate planning, or early coins that were never valued enough to protect. These coins cannot be
          migrated to quantum-resistant addresses because nobody holds the keys needed to sign a
          migration transaction.
        </p>
        <p>
          When a cryptographically relevant quantum computer (CRQC) arrives, these coins become claimable
          by anyone with quantum capability &mdash; but only if the public key is exposed. Coins at
          hashed addresses (P2PKH, P2WPKH) where the public key was never revealed remain protected by
          Hash160, which is quantum-safe against preimage attacks. Coins at P2PK addresses (where the
          full public key is on-chain) or at reused addresses (where the public key was revealed during a
          previous spend) are immediately vulnerable.
        </p>
        <p>
          This creates a supply shock scenario: millions of bitcoin that the market has priced as
          permanently lost could suddenly become spendable. Whether this represents theft (taking coins
          from people who lost their keys) or recovery (coins returning to circulation) is a philosophical
          question with no consensus answer. From a protocol perspective, the question is whether to allow
          it, prevent it (by freezing vulnerable outputs), or ignore it.
        </p>
      </section>

      <section id="exposed-keys">
        <h2>Already-Exposed Public Keys</h2>
        <p>
          Beyond lost coins, an estimated 5&ndash;10 million bitcoin sit at addresses where the public
          key has already been exposed through previous transactions or the P2PK output format. These
          funds are actively at quantum risk, and their owners may or may not be aware.
        </p>
        <p>
          The most prominent example: Satoshi Nakamoto&rsquo;s estimated 1.1 million bitcoin are in P2PK
          format, with public keys permanently visible on-chain. These coins have never moved and their
          owner is unknown or deceased. A quantum computer could derive the private keys and spend these
          coins to any address.
        </p>
        <p>
          Some proposals suggest freezing or burning coins at quantum-vulnerable addresses after a
          migration grace period &mdash; essentially invalidating outputs where the public key is exposed
          and the owner has not migrated to a quantum-safe address by the deadline. This would prevent
          quantum theft but raises profound questions about Bitcoin&rsquo;s property rights guarantees.
          If the protocol can invalidate your coins because you did not upgrade your wallet software, the
          social contract around ownership becomes conditional.
        </p>
        <p>
          There is no consensus on this question. It is one of the hardest governance challenges Bitcoin
          will face in the quantum era, and different implementations may make different choices. A
          separate network exploring these tradeoffs provides data and precedent without forcing the
          decision on Bitcoin prematurely.
        </p>
      </section>

      <section id="hardware-wallets">
        <h2>Hardware Wallet Updates</h2>
        <p>
          Millions of bitcoin are secured by hardware wallets &mdash; Ledger, Trezor, Coldcard, and
          others. These devices sign transactions internally, keeping private keys isolated from
          internet-connected computers. Migrating to post-quantum signatures requires firmware updates to
          every hardware wallet in use.
        </p>
        <p>The challenges are practical:</p>
        <ul>
          <li>
            <strong>Storage constraints</strong>: Dilithium private keys (2,560 bytes each) are 80x
            larger than ECDSA keys (32 bytes). Hardware wallets with limited secure memory may need new
            hardware, not just firmware updates.
          </li>
          <li>
            <strong>User action required</strong>: Firmware updates require physical interaction with the
            device. Users who store hardware wallets in safe deposit boxes or security vaults may not
            update for years.
          </li>
          <li>
            <strong>End-of-life devices</strong>: Older hardware wallet models may not receive PQC
            firmware updates. Users must migrate to new hardware and transfer funds.
          </li>
          <li>
            <strong>Seed phrase incompatibility</strong>: BIP-39 seed phrases derive ECDSA keys through a
            specific derivation path. Dilithium HD derivation is not yet standardized, so seed phrases
            cannot (yet) recover Dilithium keys. Users must maintain separate backups.
          </li>
        </ul>
        <p>
          The hardware wallet ecosystem moves slower than software. Any realistic migration timeline must
          account for the 2&ndash;5 year cycle of hardware wallet replacement and the reality that some
          users will not update until forced by urgency.
        </p>
      </section>

      <section id="canary-network">
        <h2>The Canary Network Thesis</h2>
        <p>
          The term &ldquo;canary network&rdquo; comes from coal mining, where canaries were sent into
          mines to detect dangerous gases before human miners were at risk. Applied to quantum
          cryptography: a network that implements post-quantum migration now &mdash; with all its
          complexity, vulnerabilities, and governance challenges &mdash; serves as an early warning
          system and testing ground for the migration that Bitcoin will eventually face.
        </p>
        <p>
          The BTQ project explicitly adopts this framing. Rather than positioning itself as a Bitcoin
          replacement, it positions itself as a proving ground: a place where the OP_SUCCESSx bypass can
          be discovered and fixed, where the emission schedule mismatch can be caught by community review,
          where the witness discount implications can be modeled with real transactions &mdash; all
          before these issues affect Bitcoin&rsquo;s $1 trillion+ market cap.
        </p>
        <p>
          The value of a canary network is proportional to its fidelity to the system it protects. By
          maintaining Bitcoin&rsquo;s UTXO model, proof-of-work consensus, wallet architecture, and P2P
          network protocol, a fork like BTQ ensures that the vulnerabilities it discovers and the
          solutions it develops are directly transferable to Bitcoin Core. The more similar the codebase,
          the more relevant the findings. This is why BTQ is a direct fork of Bitcoin Core v26 rather than
          a clean-room reimplementation &mdash; compatibility is a feature, not a compromise.
        </p>
      </section>
    </GuideLayout>
  );
}
