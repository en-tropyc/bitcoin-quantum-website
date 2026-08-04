export interface GuideChange {
  /** ISO date (YYYY-MM-DD) the change shipped. */
  date: string;
  /** One sentence, past tense, describing what changed for a reader. */
  summary: string;
}

export interface GuideListing {
  slug: string;
  href: string;
  title: string;
  blurb: string;
  /** ISO date (YYYY-MM-DD) the guide was first published. */
  datePublished: string;
  /**
   * Last substantive edit. Only consulted for guides with no `changes` entries
   * — read `guideDateModified()` rather than this field directly.
   */
  dateModified: string;
  /**
   * Reverse-chronological changelog, newest first. When present it is the
   * single source of truth for the guide's modification date: the rendered
   * "Changes" section, the TechArticle `dateModified`, and the sitemap
   * `lastmod` all derive from it, so there is nothing to keep in sync.
   */
  changes?: GuideChange[];
}

/** Newest change date if the guide keeps a changelog, else its flat field. */
export function guideDateModified(guide: GuideListing): string {
  return guide.changes?.[0]?.date ?? guide.dateModified;
}

export const RELEASED_GUIDES: GuideListing[] = [
  {
    slug: 'signature-migration',
    href: '/guides/quantum-secure-bitcoin/signature-migration',
    datePublished: '2026-06-03',
    dateModified: '2026-06-12',
    title: 'From ECDSA to Dilithium',
    blurb:
      "What changing Bitcoin's signature algorithm actually requires: opcodes, " +
      'size impacts, wallet changes, and running both schemes in one block.',
  },
  {
    slug: 'block-size-tradeoffs',
    href: '/guides/quantum-secure-bitcoin/block-size-tradeoffs',
    datePublished: '2026-06-04',
    dateModified: '2026-06-12',
    title: 'The 20x Problem',
    blurb:
      'Why quantum-resistant transactions need bigger blocks, and how every ' +
      'parameter change cascades through emission schedules, witness economics, ' +
      'chain growth, and node viability.',
  },
  {
    slug: 'taproot-quantum-vulnerability',
    href: '/guides/quantum-secure-bitcoin/taproot-quantum-vulnerability',
    datePublished: '2026-06-17',
    dateModified: '2026-06-17',
    title: 'Why Taproot Is Quantum-Vulnerable',
    blurb:
      'Taproot exposes the public key on-chain, so a quantum-resistant script in a ' +
      "P2TR container is false security. BIP-360's P2MR removes the key path entirely.",
  },
  {
    slug: 'address-formats',
    href: '/guides/quantum-secure-bitcoin/address-formats',
    datePublished: '2026-06-17',
    dateModified: '2026-06-17',
    changes: [
      {
        date: '2026-07-29',
        summary:
          'Corrected the prefix table for the P2MR consolidation, and scoped the Hash160 ' +
          'construction to ECDSA and legacy Dilithium addresses.',
      },
    ],
    title: 'Quantum-Safe Addresses',
    blurb:
      'A 1,312-byte Dilithium public key never lands in an address. Hash160 holds ECDSA ' +
      'and legacy Dilithium addresses to 20 bytes; P2MR commits to a 32-byte Merkle root.',
  },
  {
    slug: 'mining-and-bootstrapping',
    href: '/guides/quantum-secure-bitcoin/mining-and-bootstrapping',
    datePublished: '2026-07-29',
    dateModified: '2026-07-29',
    changes: [
      {
        date: '2026-08-05',
        summary:
          "Corrected the claim that BTQ inherits Bitcoin's difficulty adjustment; it retargets " +
          'every block on a linearly weighted moving average. Added sources for the network ' +
          'parameters and signature sizes.',
      },
    ],
    title: 'Mining a Quantum-Resistant Network',
    blurb:
      'SHA-256 proof-of-work is unchanged, so existing ASICs work. The hard parts ' +
      'are paying miners in 15x-larger transactions and bootstrapping without stealth.',
  },
];
