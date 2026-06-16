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
    slug: 'taproot-quantum-vulnerability',
    href: '/guides/quantum-secure-bitcoin/taproot-quantum-vulnerability',
    title: 'Why Taproot Is Quantum-Vulnerable',
    blurb:
      'Taproot exposes the public key on-chain, so a quantum-resistant script in a ' +
      "P2TR container is false security. BIP-360's P2MR removes the key path entirely.",
  },
];
