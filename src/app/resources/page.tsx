import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resources | Bitcoin Quantum Tools & Downloads',
  description:
    'Bitcoin Quantum resources including BTQ Core wallet downloads, developer documentation, build instructions, network tools, and testnet access. Everything you need to build on BTQ.',
  keywords:
    'BTQ resources, Bitcoin Quantum wallet, BTQ Core download, BTQ developer tools, BTQ documentation',
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: 'Bitcoin Quantum Resources & Tools',
    description:
      'Download wallets, access developer documentation, and explore network tools for Bitcoin Quantum.',
    url: 'https://bitcoinquantum.com/resources',
    type: 'website',
  },
};

export default function Resources() {
  const wallets = [
    {
      name: "BTQ Core",
      description: "Official full-node implementation with complete blockchain validation and post-quantum signature support",
      type: "Desktop",
      platforms: ["Windows", "macOS", "Linux"],
      features: ["Full Node", "Dilithium Support", "PPK Infrastructure"]
    },
    {
      name: "BTQ Wallet (GUI)",
      description: "User-friendly graphical interface for BTQ Core with quantum-resistant features",
      type: "Desktop",
      platforms: ["Windows", "macOS", "Linux"],
      features: ["Easy Setup", "Post-Quantum Ready", "Built-in Mining"]
    },
    {
      name: "Hardware Integration",
      description: "Future hardware wallet support for quantum-resistant key storage",
      type: "Hardware",
      platforms: ["Planned"],
      features: ["Cold Storage", "Quantum-Safe Keys", "In Development"]
    }
  ];

  const exchanges = [
    {
      name: "BTQ Testnet",
      description: "Active testnet for development and testing BTQ transactions",
      type: "Test Network",
      features: ["Free Test Coins", "Development Ready", "Quantum Testing"]
    },
    {
      name: "Exchange Listings",
      description: "BTQ exchange integration in development",
      type: "Multiple Platforms",
      features: ["Mainnet Required", "Post-Launch", "Coming Soon"]
    }
  ];

  const tools = [
    {
      name: "BTQ Network Info",
      description: "Network ports: Mainnet P2P 8334, RPC 8332, Testnet P2P 18334, RPC 18332",
      link: "#",
      icon: (
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    },
    {
      name: "Build Instructions",
      description: "Complete build guide for compiling BTQ Core from source",
      link: "https://github.com/btq-ag/BTQ-Core",
      icon: (
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/>
          <path d="M17.64 15L22 10.64a1 1 0 0 0 0-1.41l-4.23-4.23a1 1 0 0 0-1.41 0L12 9.36"/>
          <path d="M21 2l-2 2"/>
        </svg>
      )
    },
    {
      name: "Regtest Environment",
      description: "Local development environment with instant block generation",
      link: "#",
      icon: (
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      )
    },
    {
      name: "Network Status",
      description: "Monitor BTQ network health and post-quantum signature adoption",
      link: "#",
      icon: (
        <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M3 3v18h18"/>
          <path d="M18 17V9M13 17V5M8 17v-3"/>
        </svg>
      )
    }
  ];

  const developers = [
    {
      name: "BTQ-Core Repository",
      description: "Official BTQ Core source code, documentation, and development resources",
      link: "https://github.com/btq-ag/BTQ-Core",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    },
    {
      name: "Build Documentation",
      description: "Platform-specific build instructions for Windows, macOS, Linux, and more",
      link: "https://github.com/btq-ag/BTQ-Core/tree/master/doc",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
      )
    },
    {
      name: "Post-Quantum Integration",
      description: "PPK infrastructure and Dilithium signature implementation details",
      link: "https://github.com/btq-ag/BTQ-Core/tree/master/doc-btq",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    },
    {
      name: "Developer Notes",
      description: "Contributing guidelines, code review process, and development workflow",
      link: "https://github.com/btq-ag/BTQ-Core/blob/master/doc-btq/CONTRIBUTING.md",
      icon: (
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B1426] flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0B1426] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-dm-mono">
                Bitcoin Quantum Resources
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-dm-mono">
                Tools and resources for BTC in quantum state
              </p>
            </div>
          </div>
        </section>

        <div className="py-16 bg-[#0B1426]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Wallets Section */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4 font-dm-mono">Quantum Wallets</h2>
                <p className="text-xl text-white/70 font-dm-mono">
                  Secure storage for BTC in quantum state
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wallets.map((wallet, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white font-dm-mono">{wallet.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded font-dm-mono">
                        {wallet.type}
                      </span>
                    </div>
                    <p className="text-white/70 mb-4 font-dm-mono">{wallet.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-white mb-2 font-dm-mono">Platforms:</p>
                      <div className="flex flex-wrap gap-2">
                        {wallet.platforms.map((platform, idx) => (
                          <span key={idx} className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded font-dm-mono">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-sm font-medium text-white mb-2 font-dm-mono">Features:</p>
                      <ul className="text-sm text-white/70 space-y-1 font-dm-mono">
                        {wallet.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="text-green-400 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full bg-white/10 text-white py-2 px-4 rounded hover:bg-white/20 transition-colors font-dm-mono font-medium border border-white/20">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Exchanges Section */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4 font-dm-mono">Exchanges</h2>
                <p className="text-xl text-white/70 font-dm-mono">
                  Trade Bitcoin Quantum on these supported exchanges
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {exchanges.map((exchange, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white font-dm-mono">{exchange.name}</h3>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded font-dm-mono">
                        {exchange.type}
                      </span>
                    </div>
                    <p className="text-white/70 mb-4 font-dm-mono">{exchange.description}</p>
                    
                    <div className="mb-6">
                      <p className="text-sm font-medium text-white mb-2 font-dm-mono">Features:</p>
                      <ul className="text-sm text-white/70 space-y-1 font-dm-mono">
                        {exchange.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <span className="text-green-400 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full bg-white/10 text-white py-2 px-4 rounded hover:bg-white/20 transition-colors font-dm-mono font-medium border border-white/20">
                      Visit Exchange
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Tools Section */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4 font-dm-mono">Network Tools</h2>
                <p className="text-xl text-white/70 font-dm-mono">
                  Explore and interact with the Bitcoin Quantum network
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tools.map((tool, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6 text-center hover:bg-white/10 transition-colors">
                    <div className="text-[#00f0ff] mb-4 flex justify-center">{tool.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-dm-mono">{tool.name}</h3>
                    <p className="text-white/70 mb-4 font-dm-mono text-sm">{tool.description}</p>
                    <Link
                      href={tool.link}
                      className="text-white hover:text-white/80 font-medium font-dm-mono"
                    >
                      Access Tool →
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Developer Resources */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4 font-dm-mono">Developer Resources</h2>
                <p className="text-xl text-white/70 font-dm-mono">
                  Build applications and integrations with Bitcoin Quantum
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {developers.map((resource, index) => (
                  <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
                    <div className="flex items-center mb-4">
                      <span className="text-[#00f0ff] mr-4">{resource.icon}</span>
                      <h3 className="text-lg font-semibold text-white font-dm-mono">{resource.name}</h3>
                    </div>
                    <p className="text-white/70 mb-4 font-dm-mono">{resource.description}</p>
                    <Link
                      href={resource.link}
                      className="text-white hover:text-white/80 font-medium font-dm-mono"
                    >
                      Learn More →
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* Call to Action */}
            <section className="bg-white/5 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4 font-dm-mono">Need Help?</h2>
              <p className="text-white/70 mb-6 font-dm-mono">
                {"Can't find what you're looking for? Check out our FAQ or join our community."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/faq"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors font-dm-mono"
                >
                  View FAQ
                </Link>
                <a
                  href="#"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors font-dm-mono"
                >
                  Join Community
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}