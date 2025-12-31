import Header from '@/components/Header';
import Link from 'next/link';

const participantGuides = [
  {
    icon: "⛏️",
    title: "Miners",
    description: "Run a node, help secure the network, and mine blocks on testnet. Download the binaries and mining guide above to get started.",
    link: "#quickstart",
    linkText: "Quick Start →",
  },
  {
    icon: "🔧",
    title: "Developers",
    description: "Build on Bitcoin Quantum. Create interfaces, build tooling, launch a mining pool, or integrate BTQ into your applications using the RPC API.",
    link: "https://github.com/btq-ag/btq-core",
    linkText: "View on GitHub →",
    external: true,
  },
  {
    icon: "🔬",
    title: "Researchers",
    description: "Dive into our post-quantum cryptographic primitives. Review the technical blueprint for BTQ-Core integration and how Bitcoin Quantum works.",
    link: "https://github.com/btq-ag/BTQ-Core/blob/master/WHITEPAPER_INTEGRATION_DESIGN.md",
    linkText: "Technical Blueprint →",
    external: true,
  },
];

const resources = [
  { icon: "🔍", title: "Block Explorer", subtitle: "View transactions & blocks", href: "https://explorer.bitcoinquantum.com" },
  { icon: "⛏️", title: "Mining Pool", subtitle: "Join the testnet pool", href: "https://pool.bitcoinquantum.com" },
  { icon: "📁", title: "GitHub Releases", subtitle: "Binaries & checksums", href: "https://github.com/btq-ag/BTQ-Core/tags" },
];

export default function Testnet() {
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

            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10">
              Download the testnet binaries and join the network. Help us build and test the future of Bitcoin.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/btq-miner-v0.1.0-linux-x64.zip"
                download
                className="inline-flex items-center gap-2 bg-[#00f0ff] text-[#06080c] px-7 py-3.5 rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.3),0_0_60px_rgba(0,240,255,0.15)] hover:-translate-y-0.5 transition-all"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download for Linux
              </a>
              <a
                href="/btq_mining_instructions.md"
                download
                className="inline-flex items-center gap-2 bg-transparent text-white border border-[rgba(0,240,255,0.1)] px-7 py-3.5 rounded-lg font-semibold hover:border-[rgba(0,240,255,0.25)] hover:bg-[#0c1017] transition-all"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>
                </svg>
                Mining Guide
              </a>
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
                      <a href="/btq-miner-v0.1.0-linux-x64.zip" download className="text-[#00f0ff] hover:underline">
                        latest release for Linux
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
                    <h3 className="text-lg font-semibold mb-1">Download the mining guide</h3>
                    <p className="text-white/60 text-sm">
                      Get the{' '}
                      <a href="/btq_mining_instructions.md" download className="text-[#00f0ff] hover:underline">
                        mining guide
                      </a>
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
                  <div className="w-12 h-12 bg-[rgba(0,240,255,0.15)] rounded-xl flex items-center justify-center text-2xl mb-5">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {resources.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.href}
                  target={resource.href.startsWith('http') ? '_blank' : undefined}
                  rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 bg-[#0c1017] border border-[rgba(0,240,255,0.1)] rounded-xl p-5 hover:border-[rgba(0,240,255,0.25)] hover:bg-[#111820] transition-all"
                >
                  <span className="text-2xl">{resource.icon}</span>
                  <div>
                    <strong className="block font-semibold">{resource.title}</strong>
                    <small className="text-white/50 text-sm">{resource.subtitle}</small>
                  </div>
                </a>
              ))}
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

      {/* Custom Footer for Testnet */}
      <footer className="border-t border-[rgba(0,240,255,0.1)] py-8 mt-10 relative z-10">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="text-white/50 text-sm">Bitcoin Quantum © 2025</div>
          <div className="flex gap-6">
            <Link href="/" className="text-white/50 text-sm hover:text-[#00f0ff] transition-colors">Main Site</Link>
            <a href="https://github.com/btq-ag/btq-core" target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-[#00f0ff] transition-colors">GitHub</a>
            <a href="#" className="text-white/50 text-sm hover:text-[#00f0ff] transition-colors">Docs</a>
            <a href="#" className="text-white/50 text-sm hover:text-[#00f0ff] transition-colors">Discord</a>
            <a href="https://x.com/btc_quantum" target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-[#00f0ff] transition-colors">Twitter</a>
          </div>
          <div className="font-dm-mono text-xs text-white/50 bg-[#0c1017] px-3 py-1.5 rounded-md border border-[rgba(0,240,255,0.1)]">
            testnet v0.1.0
          </div>
        </div>
      </footer>
    </div>
  );
}
