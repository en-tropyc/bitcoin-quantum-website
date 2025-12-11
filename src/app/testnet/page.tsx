import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

const networkSpecs = [
  { label: "Network", value: "BTQ Testnet" },
  { label: "Consensus", value: "SHA-256 PoW" },
  { label: "Block Time", value: "TBD" },
  { label: "Block Size", value: "TBD" },
  { label: "P2P Port", value: "TBD" },
  { label: "RPC Port", value: "TBD" },
];

const testnetResources = [
  {
    title: "Block Explorer",
    url: "https://explorer.bitcoinquantum.com",
    description: "View blocks, transactions, and network statistics in real-time.",
  },
  {
    title: "Mining Pool",
    url: "https://pool.bitcoinquantum.com",
    description: "Join the official Bitcoin Quantum mining pool and contribute hashpower.",
  },
];

const joiningSteps = [
  { step: 1, title: "Download BTQ Core", description: "Coming soon" },
  { step: 2, title: "Configure for Testnet", description: "Coming soon" },
  { step: 3, title: "Connect to Network", description: "Coming soon" },
  { step: 4, title: "Start Mining", description: "Coming soon" },
];

export default function Testnet() {
  return (
    <div className="min-h-screen bg-[#0B1426] flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0B1426] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <h1 className="text-4xl md:text-5xl font-bold font-dm-mono">
                  Testnet
                </h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-dm-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                  Coming Soon
                </span>
              </div>
              <p className="text-xl md:text-2xl text-white/80 font-dm-mono">
                Run a miner on the Bitcoin Quantum testnet
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 bg-[#0B1426]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Overview */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">Overview</h2>
              <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                The Bitcoin Quantum testnet is a public testing environment where miners and developers can experiment with quantum-resistant mining before mainnet launch. 
              </p>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-200/90 font-dm-mono text-sm">
                  <strong>Note:</strong> Testnet coins have no real-world value. The testnet may be reset during development as needed.
                </p>
              </div>
            </div>

            {/* Network Details
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">Network Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {networkSpecs.map((spec) => (
                  <div key={spec.label} className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-white/50 text-sm font-dm-mono mb-1">{spec.label}</p>
                    <p className="text-white font-semibold font-dm-mono">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Testnet Resources */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">Testnet Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testnetResources.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-white font-dm-mono">{resource.title}</h3>
                      <svg
                        className="w-5 h-5 text-white/50 group-hover:text-white transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <p className="text-white/70 font-dm-mono">{resource.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* How to Join */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">How to Join</h2>
              <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                Detailed instructions for joining the testnet will be available when the network launches. Here is what the process will look like:
              </p>
              <div className="space-y-4">
                {joiningSteps.map((item) => (
                  <div key={item.step} className="flex items-start gap-4 bg-white/5 p-4 rounded-lg border border-white/10">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold font-dm-mono">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white font-dm-mono">{item.title}</h3>
                      <p className="text-white/50 font-dm-mono text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white/5 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-bold text-white mb-4 font-dm-mono">Stay Updated</h2>
              <p className="text-white/70 mb-6 font-dm-mono">
                Follow our progress and be notified when the testnet launches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/development"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors font-dm-mono"
                >
                  View Development
                </Link>
                <a
                  href="https://x.com/btc_quantum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors font-dm-mono"
                >
                  Follow on Twitter
                </a>
                <Link
                  href="/faq"
                  className="text-white/70 hover:text-white px-6 py-3 font-dm-mono transition-colors"
                >
                  Read FAQ →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
