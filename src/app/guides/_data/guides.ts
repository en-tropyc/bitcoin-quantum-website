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
    title: 'The 20x Problem',
    blurb:
      'Why quantum-resistant transactions need bigger blocks, and how every ' +
      'parameter change cascades through emission schedules, witness economics, ' +
      'chain growth, and node viability.',
  },
  {
    slug: 'taproot-quantum-vulnerability',
    href: '/guides/quantum-secure-bitcoin/taproot-quantum-vulnerability',
    title: 'Why Taproot Is Quantum-Vulnerable',
    blurb:
      'Taproot exposes the public key on-chain, so a quantum-resistant script in a ' +
      "P2TR container is false security. BIP-360's P2MR removes the key path entirely.",
  },
  {
    slug: 'address-formats',
    href: '/guides/quantum-secure-bitcoin/address-formats',
    title: 'Quantum-Safe Addresses',
    blurb:
      'A 1,312-byte Dilithium public key still hashes to a 20-byte address. How ' +
      'Hash160, dual prefixes, and bech32m keep quantum-resistant addresses small.',
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
