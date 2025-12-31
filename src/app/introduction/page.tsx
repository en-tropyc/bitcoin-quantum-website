import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureCarousel from '@/components/FeatureCarousel';
import Link from 'next/link';

export default function Introduction() {
  return (
    <div className="min-h-screen bg-[#06080c] flex flex-col relative">
      {/* Grid background */}
      <div className="grid-background" />

      <Header />

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-dm-mono">
                Introducing <span className="gradient-text">Bitcoin Quantum</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-dm-mono">
                Bitcoin evolved for the quantum era
              </p>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              {/* Sticky Sidebar */}
              <aside className="hidden lg:block lg:col-span-4">
                <div className="sticky top-24 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
                  {/* Quick Facts */}
                  <div className="bg-[#0c1017] p-6 rounded-lg border border-[rgba(0,240,255,0.1)]">
                    <h3 className="text-lg font-semibold text-white mb-4 font-dm-mono">Quick Facts</h3>
                    <ul className="space-y-3 text-sm font-dm-mono">
                      <li className="flex items-start gap-3">
                        <span className="text-[#00f0ff] mt-0.5">&#x2022;</span>
                        <span className="text-white/80">CRYSTALS-Dilithium signatures (NIST FIPS 204)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#00f0ff] mt-0.5">&#x2022;</span>
                        <span className="text-white/80">SHA-256 proof-of-work consensus</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#00f0ff] mt-0.5">&#x2022;</span>
                        <span className="text-white/80">Bitcoin-compatible UTXO model</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#00f0ff] mt-0.5">&#x2022;</span>
                        <span className="text-white/80">21 million BTQ supply cap</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-[#00f0ff] mt-0.5">&#x2022;</span>
                        <span className="text-white/80">Quantum-safe from genesis block</span>
                      </li>
                    </ul>
                  </div>

                  {/* Section Navigation */}
                  <div className="bg-[#0c1017] p-6 rounded-lg border border-[rgba(0,240,255,0.1)]">
                    <h3 className="text-lg font-semibold text-white mb-4 font-dm-mono">On This Page</h3>
                    <nav className="space-y-2 font-dm-mono">
                      <a href="#what-is-btq" className="block text-white/60 hover:text-[#00f0ff] transition-colors text-sm">
                        What is Bitcoin Quantum?
                      </a>
                      <a href="#quantum-threat" className="block text-white/60 hover:text-[#00f0ff] transition-colors text-sm">
                        The Quantum Threat
                      </a>
                      <a href="#architecture" className="block text-white/60 hover:text-[#00f0ff] transition-colors text-sm">
                        Post-Quantum Architecture
                      </a>
                      <a href="#features" className="block text-white/60 hover:text-[#00f0ff] transition-colors text-sm">
                        Key Features
                      </a>
                    </nav>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-8">
                <div className="prose prose-lg max-w-none">

              {/* What is Bitcoin Quantum */}
              <div id="what-is-btq" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">What is Bitcoin Quantum?</h2>
                <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                  {"Bitcoin Quantum is Bitcoin designed for the post-quantum era. It maintains Bitcoin's economic model and network architecture while implementing quantum-resistant cryptographic primitives and enhanced transaction capacity specifically designed for large post-quantum signatures."}
                </p>
                <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                  Like Bitcoin, Bitcoin Quantum is peer-to-peer with no central authority or banks. Managing transactions and the issuing of bitcoins is carried out collectively by the network. Bitcoin Quantum is open, its design is public, nobody owns or controls Bitcoin Quantum and <strong>everyone can take part</strong>.
                </p>
              </div>

              {/* The Quantum Threat */}
              <div id="quantum-threat" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">The Quantum Threat</h2>
                <p className="text-white/80 mb-6 font-dm-mono text-lg leading-relaxed">
                  Quantum computers use the principles of quantum mechanics to process information in ways that 
                  classical computers cannot. While this technology holds immense promise for scientific advancement, 
                  it also poses a significant threat to current cryptographic systems.
                </p>
                <ul className="list-disc list-inside text-white/80 mb-6 font-dm-mono text-lg leading-relaxed space-y-2">
                  <li>Current Bitcoin uses ECDSA (Elliptic Curve Digital Signature Algorithm)</li>
                  <li>Quantum computers could break ECDSA using <a href="https://en.wikipedia.org/wiki/Shor%27s_algorithm" target="_blank" rel="noopener noreferrer" className="text-[#00f0ff] hover:text-[#00f0ff]/80 underline">Shor&apos;s algorithm</a></li>
                  <li>This could compromise user&apos;s private keys, making funds vulnerable to theft or unauthorized access</li>
                  <li>The threat is real and approaching quickly</li>
                </ul>
              </div>

              {/* Post-Quantum Architecture */}
              <div id="architecture" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold text-white mb-6 font-dm-mono">Post-Quantum Architecture</h2>
                <p className="text-xl text-white/90 mb-6 font-dm-mono leading-relaxed">
                  {"Bitcoin's security model, rebuilt for the quantum era."}
                </p>
                <p className="text-white/80 mb-8 font-dm-mono text-lg leading-relaxed">
                  Bitcoin Quantum combines NIST-standardized post-quantum cryptography with Bitcoin&apos;s proven architecture to create a digital store of value secure against both classical and quantum threats.
                </p>
                <ul className="space-y-6 text-white/80 font-dm-mono text-lg leading-relaxed">
                  <li>
                    <strong className="text-white">Quantum-Resistant Signatures:</strong> NIST-standardized CRYSTALS-Dilithium signatures replace Bitcoin&apos;s quantum-vulnerable ECDSA, providing long-term security against emerging quantum computers.
                  </li>
                  <li>
                    <strong className="text-white">Bitcoin Foundation:</strong> Built on Bitcoin&apos;s proven UTXO model, scripting system, and SHA-256 consensus—battle-tested architecture with modern cryptographic foundations.
                  </li>
                  <li>
                    <strong className="text-white">Cryptographic Agility:</strong> Extensible protocol design enables future integration of additional post-quantum algorithms as cryptographic standards evolve.
                  </li>
                </ul>
              </div>

              {/* Key Features Carousel */}
              <FeatureCarousel />

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-[rgba(0,240,255,0.08)] to-[rgba(167,139,250,0.08)] p-8 rounded-lg border border-[rgba(0,240,255,0.1)] text-center">
                <h2 className="text-2xl font-bold text-white mb-4 font-dm-mono">Ready to Learn More?</h2>
                <p className="text-white/70 mb-6 font-dm-mono">
                  Explore our Progress, FAQ and prepare to use Bitcoin Quantum.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/development"
                    className="bg-[#00f0ff] text-[#06080c] px-6 py-3 rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:-translate-y-0.5 transition-all font-dm-mono"
                  >
                    View Development
                  </Link>
                  <Link
                    href="/faq"
                    className="border border-[rgba(0,240,255,0.1)] text-white px-6 py-3 rounded-lg font-semibold hover:border-[rgba(0,240,255,0.25)] hover:bg-[#0c1017] transition-all font-dm-mono"
                  >
                    Read FAQ
                  </Link>
                </div>
              </div>

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
