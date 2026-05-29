import type { Metadata, Viewport } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F1F2F4' },
    { media: '(prefers-color-scheme: dark)',  color: '#081019' },
  ],
};

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Bitcoin Quantum (BTQ) is Bitcoin rebuilt on NIST-standardized post-quantum cryptography. " +
  "The same 21 million coins and the same proof-of-work network, signed with CRYSTALS-Dilithium.";

export const metadata: Metadata = {
  metadataBase: new URL('https://bitcoinquantum.com'),
  title: {
    template: '%s — Bitcoin Quantum',
    default: 'Bitcoin Quantum — Bitcoin for the post-quantum era',
  },
  description: DESCRIPTION,
  keywords: [
    'Bitcoin Quantum', 'BTQ', 'quantum-resistant cryptocurrency',
    'post-quantum Bitcoin', 'CRYSTALS-Dilithium', 'ML-DSA', 'NIST FIPS 204',
    'quantum-safe blockchain', 'quantum computing Bitcoin', 'lattice cryptography',
  ],
  authors: [{ name: "Bitcoin Quantum" }],
  creator: "Bitcoin Quantum",
  publisher: "Bitcoin Quantum",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: 'Bitcoin Quantum — Bitcoin for the post-quantum era',
    description: DESCRIPTION,
    url: 'https://bitcoinquantum.com',
    siteName: 'Bitcoin Quantum',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Quantum — Bitcoin for the post-quantum era',
    description: DESCRIPTION,
    creator: '@bitcoinquantum',
    site: '@bitcoinquantum',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${dmSans.variable} ${GeistMono.variable} antialiased`}
      >
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Bitcoin Quantum',
            alternateName: 'BTQ',
            url: 'https://bitcoinquantum.com',
            logo: 'https://bitcoinquantum.com/icon.png',
            sameAs: [
              'https://x.com/btc_quantum',
              'https://github.com/btq-ag/btq-core',
              'https://t.me/+bE6I4gqX4Vo1ODJh',
            ],
            description:
              "Bitcoin Quantum is a quantum-resistant cryptocurrency built on Bitcoin's proven architecture with NIST-standardized CRYSTALS-Dilithium signatures.",
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Bitcoin Quantum',
            url: 'https://bitcoinquantum.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://bitcoinquantum.com/faq?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
