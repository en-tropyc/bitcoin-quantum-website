import { renderGuideOg, OG_SIZE, OG_CONTENT_TYPE } from '../../_og';

export const runtime = 'nodejs';
export const alt = 'Beyond Dilithium — Bitcoin Quantum guide';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderGuideOg({ eyebrow: 'GUIDE · QUANTUM-SECURE BITCOIN', title: 'Beyond Dilithium' });
}
