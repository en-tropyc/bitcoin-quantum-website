import type { Metadata } from 'next';
import { v2FontClassName } from '@/components/v2/fonts';
import V2Page from './V2Page';
import '@/components/v2/v2.css';

export const metadata: Metadata = {
  title: 'Bitcoin Quantum — Bitcoin for the post-quantum era',
  description:
    "Bitcoin Quantum (BTQ) is a quantum-resistant cryptocurrency built on Bitcoin's proven architecture with NIST-standardized CRYSTALS-Dilithium signatures. The same 21 million coins and the same network you trust — rebuilt on cryptography that quantum computers cannot break.",
  keywords:
    'Bitcoin Quantum, BTQ, quantum-resistant cryptocurrency, post-quantum Bitcoin, CRYSTALS-Dilithium, quantum-safe blockchain, quantum computing Bitcoin',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Bitcoin Quantum — Quantum-Resistant Bitcoin',
    description:
      'The same 21 million coins and the same network you trust — rebuilt on cryptography that quantum computers cannot break.',
    url: 'https://bitcoinquantum.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Quantum — Quantum-Resistant Bitcoin',
    description:
      'The same 21 million coins and the same network you trust — rebuilt on cryptography that quantum computers cannot break.',
  },
};

export default function Home() {
  return (
    <div className={v2FontClassName}>
      <V2Page />
    </div>
  );
}
