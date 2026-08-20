import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from '../_og';

export const runtime = 'nodejs';
export const alt = 'Bitcoin Quantum — A field guide to BTQ transaction types';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({ eyebrow: 'FIELD GUIDE', title: 'Ten spend types, live on-chain', path: '/transaction-types' });
}
