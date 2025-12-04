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
                Introducing Bitcoin Quantum
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
                <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">What is Bitcoin Quantum?</h2>
                <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                  {"Bitcoin Quantum is Bitcoin designed for the post-quantum era. It maintains Bitcoin's economic model and network architecture while implementing quantum-resistant cryptographic primitives and enhanced transaction capacity specifically designed for large post-quantum signatures."}
                </p>
                <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                  Like Bitcoin, Bitcoin Quantum is peer-to-peer with no central authority or banks. Managing transactions and the issuing of bitcoins is carried out collectively by the network. Bitcoin Quantum is open, its design is public, nobody owns or controls Bitcoin Quantum and <strong>everyone can take part</strong>.
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
                  <li>Quantum computers could break ECDSA using <a href="https://en.wikipedia.org/wiki/Shor's_algorithm" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Shor's algorithm</a></li>
                  <li>This could compromise user's private keys, making funds vulnerable to theft or unauthorized access</li>
                  <li>The threat is real and approaching quickly</li>
                </ul>
              </div>

              {/* Post-Quantum Architecture */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">Post-Quantum Architecture</h2>
                <p className="text-xl text-white/90 mb-6 font-dm-mono leading-relaxed">
                  {"Bitcoin's security model, rebuilt for the quantum era."}
                </p>
                <p className="text-white/80 mb-8 font-dm-mono text-lg leading-relaxed">
                  BTQ combines NIST-standardized post-quantum cryptography with Bitcoin's proven consensus architecture to create a blockchain secured against both classical and quantum threats.
                </p>
                <ul className="space-y-6 text-white/80 font-dm-mono text-lg leading-relaxed">
                  <li>
                    <strong className="text-white">Quantum-Resistant Signatures:</strong> NIST-standardized CRYSTALS-Dilithium signatures replace Bitcoin's quantum-vulnerable ECDSA, providing long-term security against emerging quantum computers.
                  </li>
                  <li>
                    <strong className="text-white">Bitcoin Foundation:</strong> Built on Bitcoin's proven UTXO model, scripting system, and SHA-256 consensus—battle-tested architecture with modern cryptographic foundations.
                  </li>
                  <li>
                    <strong className="text-white">Cryptographic Agility:</strong> Extensible protocol design enables future integration of additional post-quantum algorithms as cryptographic standards evolve.
                  </li>
                </ul>
              </div>

              {/* Key Features */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-3 font-dm-mono">Quantum-Safe Today</h3>
                    <p className="text-white/80 font-dm-mono">
                      Production-ready protection using NIST FIPS 204 standardized cryptography, securing your assets against future quantum threats.
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-3 font-dm-mono">Bitcoin Compatible</h3>
                    <p className="text-white/80 font-dm-mono">
                      Familiar architecture, transaction model, and wallet experience. If you understand Bitcoin, you understand BTQ.
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-3 font-dm-mono">Canary Network</h3>
                    <p className="text-white/80 font-dm-mono">
                      An experimental proving ground for quantum-safe technologies—validating solutions that may inform Bitcoin's own evolution.
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-3 font-dm-mono">NIST Standardized</h3>
                    <p className="text-white/80 font-dm-mono">
                      Built on peer-reviewed, government-validated post-quantum cryptography—not experimental or unproven algorithms.
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-3 font-dm-mono">Future Ready</h3>
                    <p className="text-white/80 font-dm-mono">
                      Designed for cryptographic agility, ready to adopt emerging NIST-standardized algorithms like Falcon and SPHINCS+ as the ecosystem matures.
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-3 font-dm-mono">Independent Network</h3>
                    <p className="text-white/80 font-dm-mono">
                      Distinct genesis block, network identifiers, and address formats ensure clean separation and prevent cross-chain replay attacks.
                    </p>
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
