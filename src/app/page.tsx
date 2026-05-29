import type { Metadata } from 'next';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Page from './V2Page';
import '@/components/v2/v2.css';

// Home keeps the long brand title (root layout's title template only
// fires when a page sets a string title; .absolute opts out of the template).
const HOME_DESC =
  'The same 21 million coins and the same proof-of-work network you trust — ' +
  'rebuilt on NIST-standardized post-quantum cryptography.';

export const metadata: Metadata = {
  title: { absolute: 'Bitcoin Quantum — Bitcoin for the post-quantum era' },
  description: HOME_DESC,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Bitcoin Quantum — Bitcoin for the post-quantum era',
    description: HOME_DESC,
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Quantum — Bitcoin for the post-quantum era',
    description: HOME_DESC,
  },
};

export default function Home() {
  return (
    <div className={v2FontClassName}>
      <V2Page />
    </div>
  );
}
