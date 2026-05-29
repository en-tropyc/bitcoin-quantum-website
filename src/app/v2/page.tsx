import type { Metadata } from 'next';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Page from './V2Page';
import '@/components/v2/v2.css';

export const metadata: Metadata = {
  title: 'Bitcoin Quantum — Bitcoin for the post-quantum era',
  description:
    'The same 21 million coins and the same network you trust — rebuilt on cryptography that quantum computers cannot break.',
  alternates: { canonical: '/v2' },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={v2FontClassName}>
      <V2Page />
    </div>
  );
}
