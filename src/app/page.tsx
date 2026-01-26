import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bitcoin Quantum - Quantum-Resistant Bitcoin for the Post-Quantum Era',
  description:
    "Bitcoin Quantum (BTQ) is a quantum-resistant cryptocurrency built on Bitcoin's proven architecture with NIST-standardized CRYSTALS-Dilithium signatures. Secure your digital assets against quantum computer threats.",
  keywords:
    'Bitcoin Quantum, BTQ, quantum-resistant cryptocurrency, post-quantum Bitcoin, CRYSTALS-Dilithium, quantum-safe blockchain, quantum computing Bitcoin',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bitcoin Quantum - Quantum-Resistant Bitcoin',
    description:
      'The evolution of Bitcoin for the quantum era. Built with NIST-standardized post-quantum cryptography.',
    url: 'https://bitcoinquantum.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Quantum - Quantum-Resistant Bitcoin',
    description: 'The evolution of Bitcoin for the quantum era.',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#06080c] flex flex-col relative">
      {/* Grid background */}
      <div className="grid-background" />

      <Header />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <img
              src="/circlebg.svg"
              alt=""
              className="opacity-80 w-[800px] h-[800px] animate-spin brightness-200 contrast-150"
              style={{ 
                animation: 'spin 60s linear infinite',
                filter: 'brightness(2) contrast(1.5) invert(1)'
              }}
            />
          </div>
          <div className="relative text-center">
            <p className="text-xl md:text-2xl text-white/80 font-dm-mono">
              BTC in Quantum State
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-dm-mono">
                Quantum State of Mind
              </h2>
              <p className="text-white/80 font-dm-mono text-lg leading-relaxed max-w-3xl mx-auto">
                {"Bitcoin Quantum is a peer-to-peer electronic cash system that enables instant payments to anyone, anywhere in the world. It is decentralized, without a central authority, and uses a proof-of-work consensus mechanism to secure the network."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 font-dm-mono">Quantum Proof</h3>
                <p className="text-white/70 font-dm-mono">
                  Native quantum resistance built from the ground up.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 font-dm-mono">Next Generation</h3>
                <p className="text-white/70 font-dm-mono">
                  {"Advanced cryptography meets Bitcoin's proven architecture."}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 font-dm-mono">Future Ready</h3>
                <p className="text-white/70 font-dm-mono">
                  Secure today, quantum-safe tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-dm-mono">
              Bitcoin for a <span className="gradient-text">Quantum Era</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://explorer.bitcoinquantum.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00f0ff] text-[#06080c] px-8 py-3 rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:-translate-y-0.5 transition-all font-dm-mono"
              >
                View Testnet Explorer
              </a>
              <Link
                href="/faq"
                className="border border-[rgba(0,240,255,0.1)] text-white px-8 py-3 rounded-lg font-semibold hover:border-[rgba(0,240,255,0.25)] hover:bg-[#0c1017] transition-all font-dm-mono"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
