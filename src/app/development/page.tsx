import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Development() {
  const roadmapItems = [
    {
      title: "Phase 0: Foundation",
      quarter: "2025 Q3",
      status: "completed",
      description: [
        "Initial research into post-quantum cryptographic algorithms",
        "Bitcoin protocol modification analysis",
        "Selection of NIST-standardized post-quantum algorithms",
        "Foundation architecture planning"
      ]
    },
    {
      title: "Phase 1: Integrating Dilithium",
      quarter: "2025 Q4",
      status: "in-progress",
      description: "Extending Dilithium support for addresses, transactions, scripts and consensus/mining"
    },
    {
      title: "Phase 2: Testnet",
      quarter: "2025 Q4",
      status: "pending",
      description: "Security, testing, and deployment, and whitepaper release"
    },
    {
      title: "Phase 3: Mainnet",
      quarter: "2026 Q1",
      status: "planned",
      description: "Mainnet launch with Dilithium support and open-source release"
    }
   
  ];

  const releases = [
    {
      version: "v0.1.0",
      date: "2025-08-20",
      title: "Pre-Release v0.1.0",
      description: "Introducing major consensus changes in preperation for PQC signatures, regtest mining support, and genesis block configs",
      link: "https://github.com/btq-ag/BTQ-Core/releases/tag/v0.1.0"
    },
 
  ];

  const developerNotes = [
    {
      title: "Dilithium Integration Phase 1 Complete",
      date: "2025-09-10",
      author: "Core Team",
      description: "Phase 1 of Dilithium integration is complete. This milestone lays the foundation for address, script, and wallet integration.",
      link: "https://hackmd.io/WuxQHXcKSlO_VfTXkwmz7A"
    },
    {
      title: "SegWit v2 for PQC: Architectural Decision",
      date: "2025-09-05",
      author: "Core Team",
      description: "We’re integrating post-quantum signatures via SegWit v2. Consensus-level changes like quantum PoW are deferred, keeping focus on the immediate risk: signature security.",
      link: "https://hackmd.io/q7D9SELdSFOgeHFZb_-E3A"
    },
    {
      title: "v0.1.0 Pre-Release: Chain Live + Genesis Mined",
      date: "2025-08-19",
      author: "Core Team",
      description: "BTQ Core v0.1.0 is live. This baseline unlocks the next stage: rigorous test coverage and protocol work for PQC signatures.",
      link: "https://hackmd.io/@bitcoinquantum/SyUdwPIsgx"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500 animate-pulse';
      case 'pending':
        return 'bg-gray-500';
      case 'planned':
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
                Building Bitcoin for the quantum era
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

                <div className="relative">
                  {/* Continuous timeline line */}
                  <div className="absolute left-6 top-6 w-0.5 bg-white/20" style={{height: 'calc(100% - 3rem)'}}></div>
                  
                  <div className="space-y-8">
                    {roadmapItems.map((item, index) => {
                      const isSubtle = item.status === 'pending' || item.status === 'planned';
                      return (
                        <div key={index} className={`relative ${isSubtle ? 'opacity-60' : ''}`}>
                          <div className="flex items-start space-x-6">
                            {/* Status indicator */}
                            <div className={`w-12 h-12 rounded-full ${getStatusColor(item.status)} flex items-center justify-center flex-shrink-0 mt-2 relative z-10`}>
                              <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>
                            
                            {/* Content - No background box, content on background */}
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className={`text-xl font-semibold font-dm-mono ${isSubtle ? 'text-white/70' : 'text-white'}`}>{item.title}</h3>
                                <div className={`border rounded px-3 py-1 ${isSubtle ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'}`}>
                                  <span className={`text-xs font-dm-mono font-medium ${isSubtle ? 'text-white/60' : 'text-white/80'}`}>{item.quarter}</span>
                                </div>
                              </div>
                              {Array.isArray(item.description) ? (
                                <ul className={`font-dm-mono text-base leading-relaxed space-y-1 ${isSubtle ? 'text-white/50' : 'text-white/70'}`}>
                                  {item.description.map((bullet, bulletIndex) => (
                                    <li key={bulletIndex} className="flex items-start">
                                      <span className={`mr-2 mt-1 ${isSubtle ? 'text-white/40' : 'text-white/50'}`}>•</span>
                                      <span>{bullet}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className={`font-dm-mono text-base leading-relaxed ${isSubtle ? 'text-white/50' : 'text-white/70'}`}>
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column - Releases and Developer Notes */}
              <div className="space-y-12">
                
                {/* Releases Section */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2 font-dm-mono">Releases</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {releases.slice(0, 3).map((release, index) => (
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
                  
                  <div className="mt-4 text-right">
                    <a
                      href="https://github.com/btq-ag/BTQ-Core/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-dm-mono text-sm"
                    >
                      View all releases →
                    </a>
                  </div>
                </div>

                {/* Developer Notes Section */}
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2 font-dm-mono">Latest Developer Notes</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {developerNotes.slice(0, 3).map((note, index) => (
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
                  
                  <div className="mt-4 text-right">
                    <a
                      href="https://hackmd.io/team/bitcoinquantum?nav=overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-dm-mono text-sm"
                    >
                      View all notes →
                    </a>
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
