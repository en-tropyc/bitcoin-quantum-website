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
    slug: 'migration-strategy',
    href: '/guides/quantum-secure-bitcoin/migration-strategy',
    title: 'The Gradual Migration',
    blurb:
      'You cannot flip a switch under a monetary system. Why ECDSA and Dilithium ' +
      'must coexist for years, plus lost coins, exposed keys, and the canary-network thesis.',
  },
];
