import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Introduction() {
  return (
    <div className="min-h-screen bg-[#0B1426] flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0B1426] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-dm-mono">
                Introduction to Bitcoin Quantum
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-dm-mono">
                Bitcoin evolved for the quantum era
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16 bg-[#0B1426]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              
              {/* What is Bitcoin Quantum */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">What is BTQ (Bitcoin Quantum)?</h2>
                <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                  {"BTQ is a post-quantum POW cryptocurrency designed for the post-quantum era. It maintains Bitcoin's economic model and network architecture while implementing quantum-resistant cryptographic primitives and enhanced transaction capacity specifically designed for large post-quantum signatures."}
                </p>
                <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                  {"Built on Bitcoin Core's proven codebase, BTQ features a 64 MiB block size limit (compared to Bitcoin's 1MB) and integrates a PPK (Post-Quantum Key) infrastructure that enables seamless integration of future quantum-resistant signature algorithms as they become available."}
                </p>
              </div>

              {/* The Quantum Threat */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">The Quantum Threat</h2>
                <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                  Quantum computers use the principles of quantum mechanics to process information in ways that 
                  classical computers cannot. While this technology holds immense promise for scientific advancement, 
                  it also poses a significant threat to current cryptographic systems.
                </p>
                <ul className="list-disc list-inside text-white/80 mb-6 font-dm-mono text-lg leading-relaxed space-y-2">
                  <li>Current Bitcoin uses ECDSA (Elliptic Curve Digital Signature Algorithm)</li>
                  <li>{"Quantum computers could break ECDSA using Shor's algorithm"}</li>
                  <li>This could compromise private keys and digital signatures</li>
                  <li>The threat is real and approaching within the next 10-20 years</li>
                </ul>
              </div>

              {/* Our Solution */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">Post-Quantum Architecture</h2>
                <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                  BTQ implements integrated support for multiple post-quantum signature algorithms:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-blue-500/20 p-6 rounded-lg border border-blue-500/30">
                    <h3 className="text-xl font-semibold text-blue-300 mb-3 font-dm-mono">
                      <a
                        href="https://pq-crystals.org/dilithium/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors"
                      >
                        Dilithium
                      </a>
                    </h3>
                    <p className="text-white/80 font-dm-mono">
                      {"NIST-standardized lattice-based digital signature algorithm integrated into BTQ's PPK infrastructure for quantum-resistant transactions."}
                    </p>
                  </div>
                  <div className="bg-green-500/20 p-6 rounded-lg border border-green-500/30">
                    <h3 className="text-xl font-semibold text-green-300 mb-3 font-dm-mono">
                      <a
                        href="https://falcon-sign.info/" target="_blank" rel="noopener noreferrer" className="hover:text-green-200 transition-colors"
                      >
                        Falcon
                      </a>
                    </h3>
                    <p className="text-green-200 font-dm-mono">
                      Compact lattice-based signatures optimized for smaller signature sizes 
                      while maintaining post-quantum security guarantees.
                    </p>
                  </div>
                  <div className="bg-purple-500/20 p-6 rounded-lg border border-purple-500/30">
                    <h3 className="text-xl font-semibold text-purple-300 mb-3 font-dm-mono">
                      <a
                        href="https://sphincs.org/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-200 transition-colors"
                      >
                        SPHINCS+
                      </a>
                    </h3>
                    <p className="text-purple-200 font-dm-mono">
                      Hash-based signature scheme providing conservative security assumptions 
                      and additional quantum resistance layers.
                    </p>
                  </div>
                  <div className="bg-orange-500/20 p-6 rounded-lg border border-orange-500/30">
                    <h3 className="text-xl font-semibold text-orange-300 mb-3 font-dm-mono">PQC Infrastructure</h3>
                    <p className="text-orange-200 font-dm-mono">
                      Post-Quantum cryptographic agility enabling future integration of new 
                      quantum-resistant algorithms as they are developed and standardized.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">Key Features</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 font-dm-mono">Enhanced Block Capacity</h3>
                      <p className="text-white/70 font-dm-mono">
                        64 MiB block size limit with 32 MiB soft cap to accommodate larger post-quantum signatures 
                        while maintaining network efficiency.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 font-dm-mono">Bitcoin Economic Model</h3>
                      <p className="text-white/70 font-dm-mono">
                        {"Maintains Bitcoin's proven UTXO model, scripting system, and economic incentives while adding post-quantum security features."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2 font-dm-mono">Three-Phase Roadmap</h3>
                      <p className="text-white/70 font-dm-mono">
                        Currently in Phase 2 (v1.1.0) with Dilithium integration. Phase 3 will activate 
                        full consensus-level post-quantum signatures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-white/5 p-8 rounded-lg text-center">
                <h2 className="text-2xl font-bold text-white mb-4 font-dm-mono">Ready to Learn More?</h2>
                <p className="text-white/70 mb-6 font-dm-mono">
                  Explore our Progress, FAQ and prepare to use Bitcoin Quantum.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/development"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors font-dm-mono"
                  >
                    View Development
                  </Link>
                  <Link
                    href="/faq"
                    className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors font-dm-mono"
                  >
                    Read FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
