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
    slug: 'block-size-tradeoffs',
    href: '/guides/quantum-secure-bitcoin/block-size-tradeoffs',
    title: 'The 15x Problem',
    blurb:
      'Why quantum-resistant transactions need bigger blocks, and how every ' +
      'parameter change cascades through emission schedules, witness economics, ' +
      'chain growth, and node viability.',
  },
];
