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
    slug: 'multi-algorithm-future',
    href: '/guides/quantum-secure-bitcoin/multi-algorithm-future',
    title: 'Beyond Dilithium',
    blurb:
      'SIKE was eliminated after years of analysis — one algorithm is never enough. ' +
      'Falcon, SPHINCS+, and designing for cryptographic agility from the start.',
  },
];
