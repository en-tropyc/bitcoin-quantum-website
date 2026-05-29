import type { Metadata } from 'next';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Page from './V2Page';
import '@/components/v2/v2.css';

// Home uses the tagline as its absolute title (root layout's title
// template only fires when a page sets a string title; .absolute opts
// out of the template). `og:site_name` from layout.tsx still shows
// "Bitcoin Quantum" above this in link previews.
const HOME_DESC =
  'Bitcoin rebuilt on post-quantum cryptography. ' +
  'Same 21 million coins, same proof-of-work network.';

export const metadata: Metadata = {
  // Browser tab gets the brand explicitly (template doesn't apply to
  // .absolute titles). OG/Twitter titles below keep the clean tagline
  // since og:site_name carries "Bitcoin Quantum" in link previews.
  title: { absolute: 'Bitcoin, secured for the quantum era | Bitcoin Quantum' },
  description: HOME_DESC,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Bitcoin, secured for the quantum era.',
    description: HOME_DESC,
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin, secured for the quantum era.',
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
