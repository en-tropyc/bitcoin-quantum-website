import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BTQ Testnet | Run a Quantum-Secure Node',
  description:
    'Join the Bitcoin Quantum testnet. Download BTQ Core binaries, run a quantum-secure node, and help test the future of quantum-resistant Bitcoin. Available for Windows and Linux.',
  keywords:
    'BTQ testnet, Bitcoin Quantum testnet, download BTQ, run BTQ node, quantum-resistant node, BTQ mining',
  alternates: {
    canonical: '/testnet',
  },
  openGraph: {
    title: 'BTQ Testnet - Run a Quantum-Secure Node',
    description: 'Download testnet binaries and join the Bitcoin Quantum network. Help build the future of quantum-resistant Bitcoin.',
    url: 'https://bitcoinquantum.com/testnet',
    type: 'website',
  },
};

const participantGuides = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M14 10l-1 1-5-5-5 5 1 1 4-4v14h2V8l4 4 1-1-6-6z" transform="rotate(45 12 12)"/>
        <path d="M20 14l-4-4-4 4M16 10v10"/>
      </svg>
    ),
    title: "Miners",
    description: "Run a node, help secure the network, and mine blocks on testnet. Download the binaries and mining guide above to get started.",
    link: "#quickstart",
    linkText: "Quick Start →",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "Developers",
    description: "Build on Bitcoin Quantum. Create interfaces, build tooling, launch a mining pool, or integrate BTQ into your applications using the RPC API.",
    link: "https://github.com/btq-ag/btq-core",
    linkText: "View on GitHub →",
    external: true,
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 3h6v2H9zM10 5v4M14 5v4"/>
        <path d="M8 9h8l1 6H7l1-6z"/>
        <path d="M7 15l-1 4h12l-1-4"/>
        <path d="M10 15v4M14 15v4"/>
      </svg>
    ),
    title: "Researchers",
    description: "Dive into our post-quantum cryptographic primitives. Review the technical blueprint for BTQ-Core integration and how Bitcoin Quantum works.",
    link: "https://github.com/btq-ag/BTQ-Core/blob/master/WHITEPAPER_INTEGRATION_DESIGN.md",
    linkText: "Technical Blueprint →",
    external: true,
  },
];

const resources = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
      </svg>
    ),
    title: "Testnet V0.2.0 Release",
    subtitle: "Binaries for Windows and Linux",
    href: "https://github.com/btq-ag/btq-core/releases/tag/v0.2.0-testnet",
    download: true,
    cta: "Download Release",
    highlight: true,
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>
      </svg>
    ),
    title: "Mining Guide",
    subtitle: "Step-by-step instructions",
    href: "/testnet/mining-guide",
    cta: "Read Guide",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: "Block Explorer",
    subtitle: "View transactions & blocks",
    href: "https://explorer.bitcoinquantum.com",
    cta: "Open Explorer",
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "Mining Pool",
    subtitle: "Join the testnet pool",
    href: "https://pool.bitcoinquantum.com",
    cta: "Join Pool",
  },
];

export default function Testnet() {
  const [primaryResource, ...secondaryResources] = resources;

  return (
    <div className="min-h-screen bg-[#06080c] flex flex-col relative">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <Header />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <header className="py-24 md:py-32 text-center">
          <div className="max-w-[1100px] mx-auto px-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.1)] px-4 py-2 rounded-full font-dm-mono text-xs text-[#00f0ff] mb-8 uppercase tracking-widest">
              <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
              Testnet Live
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-5">
              Run a{' '}
              <span className="bg-gradient-to-r from-[#00f0ff] to-[#a78bfa] bg-clip-text text-transparent">
                Quantum-Secure
              </span>{' '}
              Node
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto mb-10">
              Download the testnet binaries and join the network. Help us build and test the future of Bitcoin.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/btq-ag/btq-core/releases/tag/v0.2.0-testnet"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-3 bg-[#00f0ff] text-[#06080c] px-7 py-3.5 rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.3),0_0_60px_rgba(0,240,255,0.15)] hover:-translate-y-0.5 transition-all"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                <span className="flex flex-col items-start leading-tight">
                  <span>Download Binaries</span>
                  <span className="text-xs font-normal opacity-70">Available for Windows & Linux</span>
                </span>
              </a>
              <Link
                href="/testnet/mining-guide"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-[rgba(0,240,255,0.1)] px-7 py-3.5 rounded-lg font-semibold hover:border-[rgba(0,240,255,0.25)] hover:bg-[#0c1017] transition-all"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>
                </svg>
                Mining Guide
              </Link>
            </div>
          </div>
        </header>

        {/* Quick Start Section */}
        <section id="quickstart" className="py-20">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="bg-[#0c1017] border border-[rgba(0,240,255,0.1)] rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Quick Start</h2>
              <p className="text-white/60 text-lg mb-8">Get your node running in under 15 minutes.</p>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-9 h-9 bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.1)] rounded-full flex items-center justify-center font-dm-mono font-semibold text-[#00f0ff] text-sm">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Download the binary</h3>
                    <p className="text-white/60 text-sm">
                      Grab the{' '}
                      <a href="https://github.com/btq-ag/btq-core/releases/tag/v0.2.0-testnet" download className="text-[#00f0ff] hover:underline" target="_blank" rel="noopener noreferrer">
                        latest release for Windows and Linux
                      </a>
                      {' '}for your platform.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-9 h-9 bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.1)] rounded-full flex items-center justify-center font-dm-mono font-semibold text-[#00f0ff] text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Read the mining guide</h3>
                    <p className="text-white/60 text-sm">
                      Read the{' '}
                      <Link href="/testnet/mining-guide" className="text-[#00f0ff] hover:underline">
                        mining guide
                      </Link>
                      {' '}for step-by-step instructions on setup, configuration, and connecting to the pool.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-9 h-9 bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.1)] rounded-full flex items-center justify-center font-dm-mono font-semibold text-[#00f0ff] text-sm">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Follow the guide to run your node</h3>
                    <p className="text-white/60 text-sm">
                      The mining guide covers extraction, daemon configuration, and launching the node.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-9 h-9 bg-[rgba(0,240,255,0.15)] border border-[rgba(0,240,255,0.1)] rounded-full flex items-center justify-center font-dm-mono font-semibold text-[#00f0ff] text-sm">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Create a wallet and start mining</h3>
                    <p className="text-white/60 text-sm">
                      Set up your quantum-resistant Dilithium wallet and connect to the pool. The guide walks you through every command.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section id="guides" className="py-20">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Choose Your Path</h2>
              <p className="text-white/60 text-lg">Detailed guides for every type of participant.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {participantGuides.map((guide) => (
                <a
                  key={guide.title}
                  href={guide.link}
                  target={guide.external ? '_blank' : undefined}
                  rel={guide.external ? 'noopener noreferrer' : undefined}
                  className="block bg-[#0c1017] border border-[rgba(0,240,255,0.1)] rounded-xl p-7 hover:border-[rgba(0,240,255,0.25)] hover:bg-[#111820] hover:-translate-y-1 transition-all group"
                >
                  <div className="w-12 h-12 bg-[rgba(0,240,255,0.15)] rounded-xl flex items-center justify-center text-white/60 mb-5">
                    {guide.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{guide.description}</p>
                  <span className="text-[#00f0ff] text-sm font-medium flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                    {guide.linkText}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="py-20">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Testnet Resources</h2>
              <p className="text-white/60 text-lg">Everything you need to explore and test the network.</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              {primaryResource && (
                <a
                  key={primaryResource.title}
                  href={primaryResource.href}
                  download={primaryResource.download ? true : undefined}
                  target={primaryResource.href.startsWith('http') ? '_blank' : undefined}
                  rel={primaryResource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="relative overflow-hidden rounded-2xl border border-[rgba(0,240,255,0.2)] bg-gradient-to-br from-[rgba(0,240,255,0.12)] via-[rgba(0,10,15,0.9)] to-[rgba(167,139,250,0.08)] p-6 transition-all hover:-translate-y-1 hover:border-[rgba(0,240,255,0.35)] hover:shadow-[0_0_32px_rgba(0,240,255,0.22)]"
                >
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[rgba(0,240,255,0.15)] blur-3xl" />
                  <div className="relative flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(0,240,255,0.18)] text-white">
                        {primaryResource.icon}
                      </span>
                    </div>
                    <div className="relative">
                      <h3 className="text-2xl font-semibold text-white mb-2">{primaryResource.title}</h3>
                      <p className="text-white/70 text-sm md:text-base">{primaryResource.subtitle}</p>
                    </div>
                    <span className="relative inline-flex w-max items-center gap-2 rounded-md bg-[#00f0ff] px-5 py-2 text-sm font-semibold text-[#06080c] shadow-[0_0_22px_rgba(0,240,255,0.3)] transition-all">
                      {primaryResource.cta}
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M13 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </a>
              )}

              <div className="space-y-4">
                {secondaryResources.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.href}
                    download={resource.download ? true : undefined}
                    target={resource.href.startsWith('http') ? '_blank' : undefined}
                    rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block rounded-xl border border-[rgba(0,240,255,0.1)] bg-[#0c1017] p-4 transition-all hover:-translate-y-1 hover:border-[rgba(0,240,255,0.24)] hover:bg-[#111820]"
                  >
                    <div className="flex items-start justify-between gap-3.5">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(0,240,255,0.12)] text-white/80 transition-all group-hover:bg-[rgba(0,240,255,0.18)]">
                          {resource.icon}
                        </span>
                        <div>
                          <h3 className="font-semibold text-white text-base mb-0.5">{resource.title}</h3>
                          <p className="text-sm text-white/65">{resource.subtitle}</p>
                        </div>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="mt-1 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#00f0ff] transition-all group-hover:gap-2.5">
                      {resource.cta}
                      <span aria-hidden>→</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community CTA Section */}
        <section className="py-20">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="bg-gradient-to-br from-[rgba(0,240,255,0.08)] to-[rgba(167,139,250,0.08)] border border-[rgba(0,240,255,0.1)] rounded-2xl p-12 md:p-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Need Help?</h2>
              <p className="text-white/60 text-lg max-w-lg mx-auto mb-8">
                Join our Telegram community to get support, report bugs, and connect with other testnet participants.
              </p>
              <a
                href="https://t.me/+bE6I4gqX4Vo1ODJh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00f0ff] text-[#06080c] px-7 py-3.5 rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.3),0_0_60px_rgba(0,240,255,0.15)] hover:-translate-y-0.5 transition-all"
              >
                Join Telegram
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
