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
    slug: 'address-formats',
    href: '/guides/quantum-secure-bitcoin/address-formats',
    title: 'Quantum-Safe Addresses',
    blurb:
      'A 1,312-byte Dilithium public key still hashes to a 20-byte address. How ' +
      'Hash160, dual prefixes, and bech32m keep quantum-resistant addresses small.',
  },
];
