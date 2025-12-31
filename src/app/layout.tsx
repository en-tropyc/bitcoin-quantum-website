import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import { GeistMono } from "geist/font/mono";
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
        {children}
      </body>
    </html>
  );
}
