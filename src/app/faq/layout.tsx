import { Metadata } from 'next';

const FAQ_DESC =
  'Common questions about Bitcoin Quantum (BTQ) — quantum-resistant cryptography, ' +
  'BTQ vs Bitcoin differences, mining, security model, and the 21 million supply cap.';

export const metadata: Metadata = {
  title: 'FAQ',
  description: FAQ_DESC,
  keywords: [
    'Bitcoin Quantum FAQ', 'BTQ questions',
    'quantum-resistant cryptocurrency FAQ', 'BTQ mining questions', 'BTQ security',
  ],
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'FAQ — Bitcoin Quantum',
    description: FAQ_DESC,
    url: '/faq',
    type: 'article',
  },
  twitter: {
    title: 'FAQ — Bitcoin Quantum',
    description: FAQ_DESC,
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
