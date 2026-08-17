import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '../../../_og';

export const runtime = 'nodejs';
export const alt = 'The 20x Problem — Bitcoin Quantum guide';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({ eyebrow: 'GUIDE · QUANTUM-SECURE BITCOIN', title: 'The 20x Problem', path: '/guides' });
}
