import type { Metadata } from 'next';
import GuideLayout from '../../_components/GuideLayout';

const TABLE_OF_CONTENTS = [
  { id: 'the-15x-problem', title: 'The 15x Problem' },
  { id: 'block-capacity', title: 'Block Capacity Impact' },
  { id: 'witness-discount', title: 'The Witness Discount Question' },
  { id: 'chain-growth', title: 'Chain Growth and Node Viability' },
  { id: 'emission-schedule', title: 'Emission Schedule and Block Timing' },
  { id: 'no-free-lunch', title: 'No Free Lunch' },
  { id: 'references', title: 'References' },
];

const DESC =
  'Dilithium signatures are 34x larger than ECDSA. That cascades through block sizes, ' +
  'witness economics, emission schedules, and chain growth. A technical analysis of the tradeoffs.';

export const metadata: Metadata = {
  title: 'The 15x Problem: Why Quantum-Resistant Transactions Need Bigger Blocks',
  description: DESC,
  alternates: { canonical: '/guides/quantum-secure-bitcoin/block-size-tradeoffs' },
  openGraph: {
    title: 'The 15x Problem',
    description: 'Why quantum-resistant transactions need bigger blocks, and what that costs.',
    url: '/guides/quantum-secure-bitcoin/block-size-tradeoffs',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The 15x Problem',
    description: 'Why quantum-resistant transactions need bigger blocks.',
  },
};

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
        BTQ-Core consensus parameters (v0.3.0-testnet): block size, weight, sigops, and witness scale
        in{' '}
        <a href={`${REPO}/src/consensus/consensus.h`} target="_blank" rel="noopener noreferrer">
          consensus.h
        </a>
        , script limits in{' '}
        <a href={`${REPO}/src/script/script.h`} target="_blank" rel="noopener noreferrer">
          script.h
        </a>
        , and the halving interval, block spacing, and 5 BTQ subsidy in{' '}
        <a href={`${REPO}/src/kernel/chainparams.cpp`} target="_blank" rel="noopener noreferrer">
          chainparams.cpp
        </a>
        .
      </>
    ),
  },
  {
    id: 'ref-2',
    cite: (
      <>
        Open Quantum Safe.{' '}
        <em>Post-quantum signature sizes</em> (ML-DSA 2,420 bytes; FALCON ~666; SPHINCS+ 7,856 to 49,856).{' '}
        <a href="https://openquantumsafe.org/liboqs/algorithms/" target="_blank" rel="noopener noreferrer">
          openquantumsafe.org
        </a>
      </>
    ),
  },
  {
    id: 'ref-3',
    cite: (
      <>
        Lombrozo, Lau &amp; Wuille.{' '}
        <em>BIP 141: Segregated Witness</em> (the weight formula and witness discount).{' '}
        <a href="https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki" target="_blank" rel="noopener noreferrer">
          bitcoin/bips/bip-0141
        </a>
      </>
    ),
  },
  {
    id: 'ref-4',
    cite: (
      <>
        Beast, Heilman &amp; Foster.{' '}
        <em>BIP-360: Pay-to-Merkle-Root (P2MR)</em>, originally drafted as P2QRH.{' '}
        <a href="https://bip360.org/" target="_blank" rel="noopener noreferrer">
          bip360.org
        </a>
      </>
    ),
  },
];

function Cite({ n }: { n: number }) {
  return (
    <sup className="cite">
      <a href={`#ref-${n}`}>{n}</a>
    </sup>
  );
}

const CHAIN_GROWTH = [
  { metric: 'Full-block chain growth / 10 min', btc: '~4 MB', btq: '~80 MB' },
  { metric: 'Chain growth / day (full blocks)', btc: '~576 MB', btq: '~11.5 GB' },
  { metric: 'UTXO set growth / 10 min (full blocks)', btc: '~1 MB', btq: '~5.3 MB' },
];

export default function BlockSizeTradeoffsGuide() {
  return (
    <GuideLayout
      title="The 15x Problem"
      description="Why quantum-resistant transactions need bigger blocks, and how every parameter change cascades through emission schedules, witness economics, chain growth, and node viability."
      tableOfContents={TABLE_OF_CONTENTS}
    >
      <section id="the-15x-problem">
        <h2>The 15x Problem</h2>
        <p>
          A typical Bitcoin transaction with one input and two outputs (a payment and change) is
          roughly 250 bytes. The same transaction signed with Dilithium2 is approximately 3,824 bytes,
          about 15 times larger. This single ratio drives nearly every protocol-level change required
          to build a quantum-resistant Bitcoin.
        </p>
        <p>
          The size increase comes from the witness data. A Dilithium witness stack contains a 2,421-byte
          signature (2,420 bytes plus one byte for the sighash type) and a 1,312-byte public key. Compare
          that to ECDSA&rsquo;s ~72-byte signature and 33-byte compressed public key. The transaction
          header, input outpoints, and output scripts stay roughly the same size. The authentication data
          is what explodes.
        </p>
        <p>
          This is not a flaw in Dilithium. It is the cost of quantum resistance. Every post-quantum
          signature scheme produces larger signatures than ECDSA: FALCON signatures are ~666 bytes,
          ML-DSA (Dilithium) signatures are ~2,420 bytes, and SPHINCS+ signatures range from 7,856 to
          49,856 bytes.<Cite n={2} /> No known post-quantum scheme matches ECDSA&rsquo;s compactness. The
          question is not whether transactions get larger, but how to absorb the increase.
        </p>
      </section>

      <section id="block-capacity">
        <h2>Block Capacity Impact</h2>
        <p>
          Bitcoin&rsquo;s block weight limit is 4,000,000 weight units (4 MW), which translates to a
          maximum serialized block size of roughly 4 MB once you account for the SegWit witness discount.
          With 250-byte ECDSA transactions, that fits approximately 16,000 transactions per block.
        </p>
        <p>
          With 3,824-byte Dilithium transactions, the same 4 MB block fits approximately 1,050
          transactions, a 15x reduction in throughput at the same block size. To maintain even
          Bitcoin&rsquo;s current transaction throughput (already considered low), you need larger blocks.
        </p>
        <p>
          The BTQ project raised <code>MAX_BLOCK_SERIALIZED_SIZE</code> to 8 MB and{' '}
          <code>MAX_BLOCK_WEIGHT</code> to 8,000,000 weight units. Even then, a full block holds only
          about 2,100 Dilithium transactions, roughly 13% of what Bitcoin processes per block. The sigops
          limit was doubled to 80,000 to cover the validation cost of the larger signatures.<Cite n={1} />
        </p>
        <p>
          Other protocol limits needed adjustment too: <code>MAX_SCRIPT_ELEMENT_SIZE</code> rose from 520
          bytes to 15,000 (to fit Dilithium5 signatures plus keys on the stack),{' '}
          <code>MAX_SCRIPT_SIZE</code> rose to 100,000 bytes (for complex multi-sig scripts), and{' '}
          <code>MAX_PROTOCOL_MESSAGE_LENGTH</code> rose to 70 MB (to handle P2P block propagation).<Cite n={1} />
        </p>
      </section>

      <section id="witness-discount">
        <h2>The Witness Discount Question</h2>
        <p>
          Bitcoin&rsquo;s SegWit upgrade introduced a witness discount: witness data (signatures and
          public keys) counts at 1/4 weight, while non-witness data (outputs, scripts) counts at full
          weight.<Cite n={3} /> The economic rationale is sound: witness data is only needed for
          validation and can be pruned by archival nodes, while output data (the UTXO set) must be kept
          permanently. The discount rewards transactions that use more prunable witness space relative to
          permanent UTXO space.
        </p>
        <p>
          For quantum-resistant transactions, where the witness dominates transaction size, the discount
          matters even more. Without it, Dilithium&rsquo;s 3,733-byte witness costs the same block weight
          as 3,733 bytes of UTXO data, erasing any economic signal about what is prunable.
        </p>
        <p>
          The BTQ project initially disabled the witness discount (setting weight equal to serialized
          size) for simplicity, but community analysis quickly surfaced the consequences. Without the
          discount, full blocks would generate ~75 GB per day of permanent UTXO set growth at the
          increased block size, a rate that would make running a full node impractical within weeks.
        </p>
        <p>
          The fix was to restore and increase the witness scale factor to 16 (up from Bitcoin&rsquo;s 4),
          so witness data counts at 1/16 weight.<Cite n={1} /> That stronger discount reflects the reality
          that in a Dilithium world, an even larger share of each transaction is prunable witness data.
          The per-input witness overhead (3,733 bytes) at 1/16 weight costs only ~233 weight units,
          comparable to the ~26 weight units for ECDSA&rsquo;s ~105-byte witness at Bitcoin&rsquo;s 1/4
          discount.
        </p>
      </section>

      <section id="chain-growth">
        <h2>Chain Growth and Node Viability</h2>
        <p>
          Chain growth rate determines who can run a full node, the foundation of Bitcoin&rsquo;s
          decentralization. The arithmetic is straightforward:
        </p>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Bitcoin</th>
                <th>BTQ (8 MB, 1-min)</th>
              </tr>
            </thead>
            <tbody>
              {CHAIN_GROWTH.map((row) => (
                <tr key={row.metric}>
                  <td>{row.metric}</td>
                  <td>{row.btc}</td>
                  <td>{row.btq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p>
          These figures assume full blocks, a worst case for a young network. In practice, BTQ blocks are
          far from full during bootstrapping. But the limits matter because they define the maximum stress
          the network can sustain, and an attacker with enough funds could fill blocks to this level.
        </p>
        <p>
          The growth rate is manageable with modern hardware (a 4 TB SSD stores roughly a year of
          full-block data), but it is a meaningful increase over Bitcoin&rsquo;s current ~600 MB per day.
          This is an inherent cost of quantum resistance: larger signatures mean more data, however you
          structure the blocks. The design goal is to keep that cost within reach of commodity hardware,
          not to eliminate it.
        </p>
      </section>

      <section id="emission-schedule">
        <h2>Emission Schedule and Block Timing</h2>
        <p>
          Block timing interacts with the emission schedule in ways that are easy to get wrong. BTQ
          adopted 1-minute blocks (10x faster than Bitcoin) to compensate for the reduced per-block
          transaction capacity. Faster blocks mean more total block space per hour, partially offsetting
          the 15x transaction size increase.<Cite n={1} />
        </p>
        <p>
          But Bitcoin&rsquo;s halving schedule is defined in block count, not wall-clock time. With
          Bitcoin&rsquo;s 210,000-block interval and 10-minute blocks, halvings land every ~4 years. With
          1-minute blocks and the same interval, halvings would land every ~5 months, burning through the
          entire 21 million coin supply in under 3 years.
        </p>
        <p>
          The fix is to scale the interval proportionally: 2,100,000 blocks (10x the Bitcoin interval) at
          1-minute spacing reproduces the same ~4-year halving cadence. The block reward was set to 5 BTQ
          (against Bitcoin&rsquo;s initial 50 BTC), with the same 21 million total supply cap. The
          difficulty retarget window was set to 20,160 blocks (2 weeks at 1-minute spacing, matching
          Bitcoin&rsquo;s 2-week retarget).<Cite n={1} />
        </p>
        <p>
          Getting these parameters right is critical. Errors in the emission schedule affect miner
          incentives, supply dynamics, and network security. During development, community review caught a
          mismatch where block timing was set to 10 minutes while the halving interval assumed 1-minute
          blocks, which would have produced ~40-year halvings. It was corrected before mainnet deployment,
          a reminder of why public code review matters for consensus-critical parameters.
        </p>
      </section>

      <section id="no-free-lunch">
        <h2>No Free Lunch</h2>
        <p>
          The block size analysis points to one constraint: quantum resistance has a storage cost, and no
          amount of engineering eliminates it. You can redistribute the cost through witness discounts,
          offset reduced throughput with faster blocks, and manage chain growth through pruning and
          archival strategies, but the data itself has to exist somewhere.
        </p>
        <p>
          Every proposed answer to Bitcoin&rsquo;s quantum vulnerability faces the same constraint.
          BIP-360&rsquo;s P2MR addresses (originally drafted as P2QRH) carry the same signature size
          overhead.<Cite n={4} /> Any post-quantum scheme adopted by Bitcoin Core will require consensus
          changes to block weight calculations, script limits, and possibly block timing. The question is
          not whether to pay this cost, but when and how.
        </p>
        <p>
          What projects like BTQ provide is a live dataset for evaluating these tradeoffs. Theoretical
          chain-growth calculations are easy to dismiss. Numbers from a running chain processing real
          transactions are harder to ignore, and easier to use as the basis for informed protocol design.
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
