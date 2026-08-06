import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '../_og';

export const runtime = 'nodejs';
export const alt = 'Bitcoin Quantum — Protocol';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({ eyebrow: 'PROTOCOL', title: 'Bitcoin Core, hardened', path: '/protocol' });
}
