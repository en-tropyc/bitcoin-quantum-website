import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import JsonLd from "@/components/JsonLd";
import MagneticCursor from "@/components/MagneticCursor";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bitcoinquantum.com'),
  title: "Bitcoin Quantum",
  description: "Bitcoin Quantum represents the evolution of Bitcoin for the quantum era. Explore quantum-resistant cryptography and the future of decentralized digital currency.",
  keywords: "Bitcoin, Quantum Computing, Cryptocurrency, Quantum Resistance, Blockchain, BTC",
  authors: [{ name: "Bitcoin Quantum" }],
  creator: "Bitcoin Quantum",
  publisher: "Bitcoin Quantum",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Bitcoin Quantum - BTC in Quantum State",
    description: "The evolution of Bitcoin for the quantum era",
    url: "https://bitcoinquantum.com",
    siteName: "Bitcoin Quantum",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitcoin Quantum - BTC in Quantum State",
    description: "The evolution of Bitcoin for the quantum era",
    creator: "@bitcoinquantum",
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
              'https://github.com/btq-ag/BTQ-Core',
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
        <MagneticCursor />
        {children}
      </body>
    </html>
  );
}
