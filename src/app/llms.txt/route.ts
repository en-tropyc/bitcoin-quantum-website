import { RELEASED_GUIDES } from '../guides/_data/guides'
import { SITE_URL } from '@/lib/seo'

/**
 * /llms.txt — a plain-text map of the site for AI retrieval agents, in the
 * llmstxt.org format. Generated from the same guide registry the sitemap and
 * the guides index use, so it cannot drift out of sync.
 *
 * Prerendered at build time; this is a static asset, not a backend route.
 */
export const dynamic = 'force-static'

function body(): string {
  const guides = RELEASED_GUIDES.map(
    (g) => `- [${g.title}](${SITE_URL}${g.href}): ${g.blurb}`
  ).join('\n')

  return `# Bitcoin Quantum (BTQ)

> Bitcoin Quantum is a quantum-resistant fork of Bitcoin. It preserves Bitcoin's
> UTXO model, SHA-256 proof-of-work and 21 million coin supply cap, and replaces
> ECDSA transaction signatures with NIST-standardized CRYSTALS-Dilithium
> (ML-DSA, FIPS 204). A public testnet is live; mainnet has not launched.

Key network parameters: 21,000,000 BTQ maximum supply; 1 minute target block
time; 8 MB per-block size limit; CRYSTALS-Dilithium (ML-DSA) signatures per NIST
FIPS 204; BIP-360 Pay-to-Merkle-Root (P2MR) outputs. The full-node
implementation is BTQ Core, an MIT-licensed fork of Bitcoin Core.

## Core pages

- [Bitcoin Quantum](${SITE_URL}): What BTQ is, why post-quantum signatures matter, and the headline network parameters.
- [Protocol](${SITE_URL}/protocol): Architecture — UTXO model, SHA-256 proof-of-work, Dilithium signing, network parameters and ports.
- [Whitepaper](${SITE_URL}/whitepaper): "Bitcoin Quantum: A Post-Quantum Bitcoin Model" — the full protocol specification, with a downloadable PDF.
- [Testnet](${SITE_URL}/testnet): Run a node. BTQ Core downloads, the mining guide, block explorer and public mining pool.
- [FAQ](${SITE_URL}/faq): Common questions on cryptography, BTQ vs Bitcoin, mining, security model and supply.

## Technical guides

${guides}

## Related sources

- [BTQ Core source](https://github.com/btq-ag/btq-core): The full-node implementation (MIT).
- [BTQ Core documentation](https://docs.bitcoinquantum.com): Operator and mining documentation.
- [Block explorer](https://explorer.bitcoinquantum.com): Live testnet chain data.
- [NIST FIPS 204](https://csrc.nist.gov/pubs/fips/204/final): The ML-DSA standard BTQ signatures implement.
- [BIP-360](https://bip360.org/): The Pay-to-Merkle-Root output type BTQ implements.
`
}

export function GET() {
  return new Response(body(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
