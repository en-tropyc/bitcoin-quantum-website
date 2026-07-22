import type { Metadata } from 'next';
import GuideLayout from '../../_components/GuideLayout';

const TABLE_OF_CONTENTS = [
  { id: 'sha256-unchanged', title: 'SHA-256 Mining Is Unchanged' },
  { id: 'grovers-irrelevance', title: "Grover's Algorithm: Not the Threat You Think" },
  { id: 'payout-problem', title: 'The Payout Batching Problem' },
  { id: 'bootstrapping', title: 'Bootstrapping Without Stealth' },
  { id: 'utxo-consolidation', title: 'UTXO Consolidation and Block Timing' },
  { id: 'future-pow', title: 'Future: Quantum-Native Proof-of-Work' },
];

const DESC =
  'SHA-256 proof-of-work is unchanged — existing ASICs work. But payout transactions ' +
  'explode in size, and honest bootstrapping requires different infrastructure than ' +
  'Bitcoin had.';

export const metadata: Metadata = {
  title: "Mining a Quantum-Resistant Network: What Changes and What Doesn't",
  description: DESC,
  alternates: { canonical: '/guides/quantum-secure-bitcoin/mining-and-bootstrapping' },
  openGraph: {
    title: 'Mining a Quantum-Resistant Network',
    description: "What changes and what doesn't when you mine a quantum-resistant blockchain.",
    url: '/guides/quantum-secure-bitcoin/mining-and-bootstrapping',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mining a Quantum-Resistant Network',
    description: 'SHA-256 is unchanged. The hard part is payouts and bootstrapping.',
  },
};

export default function MiningAndBootstrappingGuide() {
  return (
    <GuideLayout
      title="Mining a Quantum-Resistant Network"
      description="The proof-of-work algorithm doesn't change. Existing mining hardware works. But payout transactions are 15x larger, and you can't bootstrap a network in secret when the whole point is transparency."
      tableOfContents={TABLE_OF_CONTENTS}
      slug="/guides/quantum-secure-bitcoin/mining-and-bootstrapping"
      datePublished="2026-07-29"
    >
      <section id="sha256-unchanged">
        <h2>SHA-256 Mining Is Unchanged</h2>
        <p>
          The most counter-intuitive fact about quantum-resistant Bitcoin mining: <strong>the mining
          algorithm does not change</strong>. Proof-of-work mining uses SHA-256d (double SHA-256) to
          find a nonce that produces a block hash below the difficulty target. This is a hash function
          problem, not a public-key cryptography problem. Shor&rsquo;s algorithm &mdash; the quantum
          threat to ECDSA &mdash; has no advantage against hash functions.
        </p>
        <p>This means:</p>
        <ul>
          <li>All existing SHA-256 ASIC hardware (Antminer S19/S21, Whatsminer, etc.) works without modification</li>
          <li>All standard mining software works &mdash; cpuminer, CGMiner, BFGMiner, firmware-level mining</li>
          <li>The Stratum protocol between miners and pools is standard Bitcoin Stratum</li>
          <li>Coinbase transactions (which create new coins) require no signatures &mdash; they are the one transaction type that does not involve ECDSA or Dilithium</li>
        </ul>
        <p>
          The quantum resistance lives entirely in the <strong>signature and script layer</strong> &mdash;
          how transactions are authorized &mdash; not in the <strong>proof-of-work layer</strong> &mdash; how
          blocks are produced. (Signature validation is still a consensus rule: every full node must agree on
          whether a Dilithium spend is valid, or the chain forks. What is left untouched is block production.)
          A miner running SHA-256 hardware against a quantum-resistant chain is doing exactly the same work as
          mining Bitcoin. The block header format, the Merkle tree construction, and the difficulty adjustment
          algorithm are all inherited from Bitcoin Core.
        </p>
      </section>

      <section id="grovers-irrelevance">
        <h2>Grover&rsquo;s Algorithm: Not the Threat You Think</h2>
        <p>
          Grover&rsquo;s algorithm provides a quadratic speedup for unstructured search problems.
          Applied to SHA-256 mining, it would theoretically allow a quantum miner to find valid nonces
          in roughly the square root of the time a classical miner takes. This sounds alarming until you
          examine the actual numbers.
        </p>
        <p>
          Against a full 256-bit pre-image, SHA-256 offers 256 bits of classical security, and Grover&rsquo;s
          algorithm would reduce that to 128 bits &mdash; still astronomically beyond any foreseeable attack.
          But mining is not a pre-image search: a valid block only needs a hash below the current target, so the
          work is proportional to the difficulty (on the order of 2<sup>256</sup> / target), not to a full
          2<sup>256</sup>. Grover&rsquo;s quadratic speedup applies to <em>that</em> search &mdash; a quantum
          miner would need roughly the square root of the classical number of attempts &mdash; but:
        </p>
        <ul>
          <li>
            Grover&rsquo;s algorithm requires coherent quantum computation across the entire search,
            which means the quantum computer must maintain its state without errors for the full
            computation duration.
          </li>
          <li>
            Difficulty retargeting keeps the block interval on schedule, but it does not level the playing
            field. If quantum miners find blocks faster, difficulty rises to restore the target interval &mdash;
            the same mechanism that absorbs classical hardware improvements &mdash; yet a miner with a genuine
            speed advantage keeps that <em>relative</em> edge in hashrate share, exactly as a more efficient ASIC
            does. The real safeguard is that no quantum device is anywhere near that regime.
          </li>
          <li>
            The economic cost of quantum computation currently far exceeds the cost of equivalent
            classical ASIC hashing. A single SHA-256 ASIC produces trillions of hashes per second for a
            few thousand dollars. No quantum computer comes close to this cost-performance ratio.
          </li>
        </ul>
        <p>
          In practical terms, Grover&rsquo;s algorithm is not a meaningful threat to SHA-256 mining in
          any foreseeable timeframe. The quantum threat to Bitcoin is Shor&rsquo;s algorithm against
          ECDSA signatures, not Grover&rsquo;s algorithm against SHA-256 mining.
        </p>
      </section>

      <section id="payout-problem">
        <h2>The Payout Batching Problem</h2>
        <p>
          While mining itself is unchanged, <strong>paying miners is dramatically different</strong>.
          The cost is not on the recipient side &mdash; paying 100 miners is 100 outputs, and each output is
          just a compact hash-committed script (a P2MR output commits to a 32-byte Merkle root, no signature or
          public key). The cost is on the <em>input</em> side: to fund a payout, a pool must spend its
          accumulated coinbase UTXOs, and every spent input carries a full Dilithium witness. In Bitcoin, a
          pool can consume many inputs cheaply &mdash; each contributes ~105 bytes of witness data (72-byte
          ECDSA signature + 33-byte public key), well within standard transaction size limits.
        </p>
        <p>
          With Dilithium signatures, each spent input contributes ~3,732 bytes of witness data (2,420-byte
          signature + 1,312-byte public key). A single transaction spending 100 Dilithium inputs would carry
          roughly 373 KB of witness data alone (100 &times; 3,732) &mdash; well past practical transaction size
          limits. The number of <em>recipients</em> is nearly free; the number of Dilithium-signed <em>inputs</em>
          is what explodes.
        </p>
        <p>
          The practical solution is to cap the number of Dilithium inputs per transaction &mdash; batching in
          groups of roughly 15, with a recursive halving strategy: if an estimated transaction exceeds the size
          limit, it is split into two smaller batches. A pool that needs to consume 100 UTXOs to fund its payouts
          therefore requires roughly 7 separate transactions instead of Bitcoin&rsquo;s single one.
        </p>
        <p>
          Fee implications multiply quickly. A Dilithium payout that spends 15 inputs costs several times the
          fees of an equivalent Bitcoin batch, because fees track witness weight and the witnesses are ~35x
          larger per input. Pool operators must choose whether to absorb these fees (reducing margins), pass
          them to miners (reducing miner income), or adopt a hybrid approach. This is a real operational cost of
          quantum resistance that cannot be optimized away &mdash; larger signatures mean more block space
          consumed per input spent.
        </p>
      </section>

      <section id="bootstrapping">
        <h2>Bootstrapping Without Stealth</h2>
        <p>
          Bitcoin had the luxury of a unique historical circumstance: Satoshi Nakamoto mined alone (or
          nearly alone) for the first year, accumulating approximately 1.1 million bitcoin before the
          network attracted significant participation. This bootstrapping period was possible because
          Bitcoin was unknown, worthless, and of no interest to anyone. The mining difficulty was at the
          minimum, and a single CPU could mine blocks.
        </p>
        <p>
          A quantum-resistant Bitcoin fork launching today does not have this luxury. The concept is known, the
          stakes are understood, and the network must demonstrate value from day one to attract the
          hashrate necessary for security. Without sufficient mining participation, the chain is
          vulnerable to 51% attacks &mdash; rendering the quantum resistance moot if classical attacks
          can rewrite the chain.
        </p>
        <p>
          This creates a bootstrapping dilemma: you need miners to secure the chain, but miners need
          confidence that the chain is worth securing. The pragmatic solution adopted by the BTQ project
          was to launch a centralized mining pool &mdash; providing immediate infrastructure for miners
          while the network builds hashrate.
        </p>
        <p>
          A centralized pool at launch is an honest acknowledgment of the bootstrapping problem. It is
          not the long-term architecture (additional pools and solo mining should emerge as the network
          grows), but it is the minimum viable infrastructure to start. The alternative &mdash; launching
          without mining infrastructure and hoping it appears organically &mdash; would leave the chain
          insecure during its most vulnerable period.
        </p>
      </section>

      <section id="utxo-consolidation">
        <h2>UTXO Consolidation and Block Timing</h2>
        <p>
          Mining pools accumulate many small UTXOs &mdash; one per block mined. Before these can be used
          in payout transactions, they often need to be consolidated into fewer, larger UTXOs. With
          Dilithium, each consolidation input adds ~3,732 bytes of witness data, limiting how many UTXOs
          can be combined in a single transaction.
        </p>
        <p>
          The 1-minute block interval addresses this directly. With 10x more blocks per hour, the chain
          offers 10x more total block space for UTXO consolidation transactions. A pool with 500 pending
          UTXOs can consolidate them over multiple blocks without competing for space with regular
          transactions. The faster block interval also means mining rewards are distributed more
          frequently, reducing the per-block reward variance for small miners.
        </p>
        <p>
          The tradeoff is increased block propagation overhead and faster chain growth. But for a chain
          where Dilithium transactions dominate, the consolidation throughput provided by faster blocks
          is essential for mining pool operations to remain practical.
        </p>
      </section>

      <section id="future-pow">
        <h2>Future: Quantum-Native Proof-of-Work</h2>
        <p>
          While SHA-256 proof-of-work is adequate &mdash; and even advantageous for bootstrapping
          because it leverages existing ASIC infrastructure &mdash; research continues into proof-of-work
          algorithms that provide a natural advantage to quantum hardware.
        </p>
        <p>
          The leading research direction is boson sampling &mdash; a quantum computation task that is
          efficiently solvable on quantum hardware but believed to be classically intractable. A
          boson-sampling-based proof-of-work would create economic incentives for quantum hardware
          adoption while maintaining network security. The design challenge is making the proof
          classically verifiable (so all nodes can validate blocks without quantum hardware) while the
          computation requires quantum resources.
        </p>
        <p>
          This remains an active research area, not a current feature. The pragmatic approach is to
          launch with proven SHA-256 mining and introduce quantum-native PoW as a future upgrade once the
          research matures and quantum hardware becomes more accessible. Premature adoption of unproven
          consensus mechanisms would introduce unnecessary risk to a network whose primary value
          proposition is security.
        </p>
      </section>
    </GuideLayout>
  );
}
