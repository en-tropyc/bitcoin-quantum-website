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
  {
    slug: 'mining-and-bootstrapping',
    href: '/guides/quantum-secure-bitcoin/mining-and-bootstrapping',
    title: 'Mining a Quantum-Resistant Network',
    blurb:
      'SHA-256 proof-of-work is unchanged, so existing ASICs work. The hard parts ' +
      'are paying miners in 15x-larger transactions and bootstrapping without stealth.',
  },
];
