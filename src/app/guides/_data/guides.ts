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
    slug: 'hd-wallet-derivation',
    href: '/guides/quantum-secure-bitcoin/hd-wallet-derivation',
    title: 'HD Wallet Derivation',
    blurb:
      'Seed-phrase recovery breaks entirely with Dilithium. Why lattices defeat ' +
      'naive BIP-32, what the BTQ stub gets wrong, and the Raccoon-G path to a fix.',
  },
];
