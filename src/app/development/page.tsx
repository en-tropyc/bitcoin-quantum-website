import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Development() {
  const roadmapItems = [
    {
      title: "Core Protocol Research",
      quarter: "2025 Q3",
      status: "completed",
      description: "Initial research into post-quantum cryptographic algorithms and Bitcoin protocol modifications"
    },
    {
      title: "Dilithium Integration",
      quarter: "2025 Q4",
      status: "in-progress", 
      description: "Implementation of Dilithium post-quantum signature scheme in BTQ Core"
    },
    {
      title: "Testnet Launch",
      quarter: "2025 Q4",
      status: "in-progress",
      description: "Public testnet deployment with quantum-resistant features for community testing"
    },
    {
      title: "PPK Infrastructure",
      quarter: "2026 Q1",
      status: "pending",
      description: "Complete Post-Quantum Key infrastructure implementation and testing"
    },
    {
      title: "Mainnet Preparation",
      quarter: "2026 Q1",
      status: "pending",
      description: "Final testing, security audits, and preparation for mainnet launch"
    },
    {
      title: "Mainnet Launch",
      quarter: "2026 Q2",
      status: "pending",
      description: "Official launch of Bitcoin Quantum mainnet with full quantum resistance"
    },
    {
      title: "Hardware Integration",
      quarter: "2026 Q3",
      status: "pending",
      description: "Hardware wallet support and quantum-safe key storage solutions"
    },

  ];

  const releases = [
    {
      version: "v0.1.0-beta",
      date: "2025-01-15",
      title: "Testnet Beta Release",
      description: "First public testnet with Dilithium signature support",
      link: "https://github.com/btq-ag/BTQ-Core/releases/tag/v0.3.0-beta"
    },
    {
      version: "v0.2.1",
      date: "2024-12-20",
      title: "Core Protocol Updates",
      description: "Enhanced post-quantum cryptographic implementations",
      link: "https://github.com/btq-ag/BTQ-Core/releases/tag/v0.2.1"
    },
    {
      version: "v0.2.0",
      date: "2024-11-10",
      title: "Dilithium Integration",
      description: "Initial implementation of Dilithium post-quantum signatures",
      link: "https://github.com/btq-ag/BTQ-Core/releases/tag/v0.2.0"
    },
    {
      version: "v0.1.0",
      date: "2024-10-01",
      title: "Initial Release",
      description: "First release with basic post-quantum research implementation",
      link: "https://github.com/btq-ag/BTQ-Core/releases/tag/v0.1.0"
    }
  ];

  const developerNotes = [
    {
      title: "Dilithium Signature Performance Analysis",
      date: "2025-01-20",
      author: "Core Team",
      description: "Detailed analysis of Dilithium signature performance on various hardware configurations",
      link: "https://hackmd.io/@btq-team/dilithium-performance"
    },
    {
      title: "Post-Quantum Key Migration Strategy",
      date: "2025-01-15",
      author: "Research Team",
      description: "Comprehensive guide for migrating from ECDSA to post-quantum signatures",
      link: "https://hackmd.io/@btq-team/key-migration"
    },
    {
      title: "Testnet Configuration Guide",
      date: "2025-01-10",
      author: "DevOps Team",
      description: "Step-by-step guide for setting up and running BTQ testnet nodes",
      link: "https://hackmd.io/@btq-team/testnet-setup"
    },
    {
      title: "Quantum Threat Assessment",
      date: "2025-01-05",
      author: "Security Team",
      description: "Analysis of current quantum computing threats to Bitcoin and mitigation strategies",
      link: "https://hackmd.io/@btq-team/quantum-threats"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1426] flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0B1426] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-dm-mono">
                Development Progress
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-dm-mono">
                Building Bitcoin Quantum for the quantum era
              </p>
            </div>
          </div>
        </section>

        <div className="py-16 bg-[#0B1426]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Development Roadmap - Left Column */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4 font-dm-mono">Development Roadmap</h2>
                  <p className="text-xl text-white/70 font-dm-mono">
                    Our path to delivering quantum-resistant Bitcoin
                  </p>
                </div>

                <div className="space-y-8">
                  {roadmapItems.map((item, index) => (
                    <div key={index} className="relative">
                      {/* Timeline line */}
                      {index < roadmapItems.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-20 bg-white/20"></div>
                      )}
                      
                      <div className="flex items-start space-x-6">
                        {/* Status indicator */}
                        <div className={`w-12 h-12 rounded-full ${getStatusColor(item.status)} flex items-center justify-center flex-shrink-0 mt-2`}>
                          <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                        
                        {/* Content - No background box, content on background */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-semibold text-white font-dm-mono">{item.title}</h3>
                            <div className="flex items-center space-x-3">
                              <div className="bg-white/10 border border-white/20 rounded px-3 py-1">
                                <span className="text-sm text-white/80 font-dm-mono font-medium">{item.quarter}</span>
                              </div>
                              <div className={`px-3 py-1 rounded text-xs font-medium font-dm-mono ${
                                item.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                item.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                              }`}>
                                {getStatusText(item.status)}
                              </div>
                            </div>
                          </div>
                          <p className="text-white/70 font-dm-mono text-base leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Releases and Developer Notes */}
              <div className="space-y-12">
                
                {/* Releases Section */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2 font-dm-mono">Releases</h2>
                    <p className="text-white/70 font-dm-mono">Latest releases and updates</p>
                  </div>
                  
                  <div className="space-y-4">
                    {releases.map((release, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white font-dm-mono">{release.title}</h3>
                          <span className="text-sm text-white/60 font-dm-mono">{release.date}</span>
                        </div>
                        <p className="text-white/70 mb-3 font-dm-mono text-sm">{release.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono text-white/80 bg-white/10 px-2 py-1 rounded">
                            {release.version}
                          </span>
                          <a
                            href={release.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-dm-mono text-sm"
                          >
                            View on GitHub →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Developer Notes Section */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2 font-dm-mono">Latest Developer Notes</h2>
                    <p className="text-white/70 font-dm-mono">Technical insights and updates from our team</p>
                  </div>
                  
                  <div className="space-y-4">
                    {developerNotes.map((note, index) => (
                      <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white font-dm-mono">{note.title}</h3>
                          <span className="text-sm text-white/60 font-dm-mono">{note.date}</span>
                        </div>
                        <p className="text-white/70 mb-3 font-dm-mono text-sm">{note.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/60 font-dm-mono">by {note.author}</span>
                          <a
                            href={note.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 font-dm-mono text-sm"
                          >
                            Read on HackMD →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Call to Action */}
            <section className="mt-16 bg-white/5 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4 font-dm-mono">Get Involved</h2>
              <p className="text-white/70 mb-6 font-dm-mono">
                Join our development community and help build the future of quantum-resistant Bitcoin
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/btq-ag/BTQ-Core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors font-dm-mono"
                >
                  Contribute on GitHub
                </a>
                <Link
                  href="/resources"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors font-dm-mono"
                >
                  View Resources
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
