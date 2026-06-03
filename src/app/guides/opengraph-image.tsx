import { renderGuideOg, OG_SIZE, OG_CONTENT_TYPE } from './_og';

export const runtime = 'nodejs';
export const alt = 'Bitcoin Quantum — Quantum-Secure Bitcoin guides';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderGuideOg({ eyebrow: 'GUIDES', title: 'Quantum-Secure Bitcoin' });
}
