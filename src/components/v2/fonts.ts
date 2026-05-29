import { Archivo, Newsreader, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';

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

export const v2FontClassName = [
  archivo.variable,
  newsreader.variable,
  hanken.variable,
  plexMono.variable,
].join(' ');
