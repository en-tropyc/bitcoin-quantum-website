import type { Metadata } from 'next';
import { Archivo, Newsreader, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import V2Page from './V2Page';
import './v2.css';

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['400', '500'],
  display: 'swap',
});
const hanken = Hanken_Grotesk({
  variable: '--font-hanken',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bitcoin Quantum — Bitcoin for the post-quantum era',
  description:
    'The same 21 million coins and the same network you trust — rebuilt on cryptography that quantum computers cannot break.',
  alternates: { canonical: '/v2' },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <div className={`${archivo.variable} ${newsreader.variable} ${hanken.variable} ${plexMono.variable}`}>
      <V2Page />
    </div>
  );
}
