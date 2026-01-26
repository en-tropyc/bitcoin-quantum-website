import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | Bitcoin Quantum Frequently Asked Questions',
  description:
    'Get answers to common questions about Bitcoin Quantum (BTQ). Learn about quantum-resistant cryptography, BTQ vs Bitcoin differences, mining, security, and the 21 million supply cap.',
  keywords:
    'Bitcoin Quantum FAQ, BTQ questions, quantum-resistant cryptocurrency FAQ, BTQ mining questions, BTQ security',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'Bitcoin Quantum FAQ',
    description:
      'Frequently asked questions about Bitcoin Quantum. Everything you need to know about BTQ.',
    url: 'https://bitcoinquantum.com/faq',
    type: 'website',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
