import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '../_og';

export const runtime = 'nodejs';
export const alt = 'Bitcoin Quantum — Testnet';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({ eyebrow: 'TESTNET', title: 'Run a quantum-safe node', path: '/testnet' });
}
