'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'security' | 'trading';
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: 'general',
    question: 'What is BTQ (Bitcoin Quantum)?',
    answer: `BTQ is a post-quantum POW cryptocurrency designed for the post-quantum era. It maintains Bitcoin's economic model and network architecture while implementing quantum-resistant cryptographic primitives and enhanced transaction capacity for large post-quantum signatures. Currently in Phase 2 (v1.1.0) of development with active Dilithium integration.`
  },
  {
    id: 2,
    category: 'security',
    question: 'Why do we need quantum-resistant cryptocurrency?',
    answer: `Current cryptocurrencies like Bitcoin use ECDSA signatures that could be broken by sufficiently powerful quantum computers using Shor's algorithm. BTQ uses NIST-standardized post-quantum algorithms (Dilithium, Falcon, SPHINCS+) that remain secure against both classical and quantum computer attacks.`
  },
  {
    id: 3,
    category: 'technical',
    question: 'What cryptographic algorithms does BTQ use?',
    answer: `BTQ implements integrated support for multiple post-quantum signature algorithms: Dilithium (lattice-based), Falcon (compact signatures), and SPHINCS+ (hash-based). These are integrated through BTQ's PPK (Post-Quantum Key) infrastructure, which enables future algorithm integration as standards evolve.`
  },
  {
    id: 4,
    category: 'general',
    question: 'How is BTQ different from Bitcoin?',
    answer: `BTQ is built on Bitcoin Core's proven codebase but features a 64 MiB block size limit (vs Bitcoin's 1MB) to accommodate larger post-quantum signatures. It maintains Bitcoin's UTXO model, scripting system, and economic incentives while adding quantum-resistant cryptography through the PPK infrastructure.`
  },
  {
    id: 5,
    category: 'trading',
    question: 'Where can I get BTQ?',
    answer: `BTQ is currently in active development. You can run BTQ Core on testnet for development and testing. Exchange listings will be available after mainnet launch. You can also mine BTQ using the same proof-of-work algorithms as Bitcoin. Check the Resources page for testnet access and build instructions.`
  },
  {
    id: 6,
    category: 'security',
    question: 'How secure is BTQ?',
    answer: `BTQ is designed to be secure against both classical and quantum computer attacks using NIST-standardized post-quantum algorithms. The codebase follows Bitcoin Core's proven security model with additional quantum-resistant features. For security issues, contact oscar@btq.com or barney@btq.com.`
  },
  {
    id: 7,
    category: 'technical',
    question: 'Can I migrate from Bitcoin to BTQ?',
    answer: `BTQ is a separate blockchain from Bitcoin with its own native tokens. Migration would involve using exchanges or atomic swaps when these become available. BTQ maintains Bitcoin's familiar UTXO model and scripting system to ease the transition for developers and users.`
  },
  {
    id: 8,
    category: 'general',
    question: 'What is the maximum supply of BTQ?',
    answer: `Similar to Bitcoin, BTQ maintains a capped supply of 21 million coins with the same halving schedule and block reward structure. This preserves Bitcoin's proven economic model while adding post-quantum security features.`
  },
  {
    id: 9,
    category: 'technical',
    question: 'How does BTQ mining work?',
    answer: `BTQ uses the same SHA-256 proof-of-work algorithm as Bitcoin, making it compatible with existing mining hardware. The enhanced 64 MiB block size allows for more transactions per block while maintaining the same mining difficulty adjustment and reward structure.`
  },
  {
    id: 10,
    category: 'security',
    question: 'When will quantum computers threaten current cryptocurrencies?',
    answer: `Experts estimate that cryptographically-relevant quantum computers may emerge within 10-20 years. BTQ provides protection against this future threat today by implementing NIST-standardized post-quantum algorithms that are secure against both classical and quantum attacks.`
  },
  {
    id: 11,
    category: 'trading',
    question: 'What are the transaction fees?',
    answer: `BTQ uses the same fee structure as Bitcoin, with fees determined by transaction size and network congestion. Post-quantum signatures are larger than ECDSA signatures, but the 64 MiB block size accommodates this while keeping fees reasonable for typical transactions.`
  },
  {
    id: 12,
    category: 'general',
    question: 'Is BTQ open source?',
    answer: `Yes, BTQ is completely open source under the MIT license. All source code, documentation, and development resources are available at https://github.com/btq-ag/BTQ-Core for community review, contribution, and verification.`
  }
];

const categories = [
  { id: 'all', label: 'All Questions', count: faqData.length },
  { id: 'general', label: 'General', count: faqData.filter(faq => faq.category === 'general').length },
  { id: 'technical', label: 'Technical', count: faqData.filter(faq => faq.category === 'technical').length },
  { id: 'security', label: 'Security', count: faqData.filter(faq => faq.category === 'security').length },
  { id: 'trading', label: 'Trading', count: faqData.filter(faq => faq.category === 'trading').length }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0B1426] flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#0B1426] text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-dm-mono">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-dm-mono">
                Everything you need to know about BTC in quantum state
              </p>
            </div>
          </div>
        </section>

        <div className="py-16 bg-[#0B1426]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Category Filter */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium font-dm-mono transition-colors ${
                      activeCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-white/10 rounded-lg">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg font-medium text-white font-dm-mono pr-4">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0">
                      {openItems.includes(faq.id) ? (
                        <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </span>
                  </button>
                  
                  {openItems.includes(faq.id) && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-white/10 pt-4">
                        <p className="text-white/80 leading-relaxed font-dm-mono">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* No results */}
            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/50 font-dm-mono">
                  No questions found in this category.
                </p>
              </div>
            )}

            {/* Call to Action */}
            <section className="mt-16 bg-white/5 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4 font-dm-mono">
                Still Have Questions?
              </h2>
              <p className="text-white/70 mb-6 font-dm-mono">
                Can't find the answer you're looking for? Explore our other resources or join our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/resources"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors font-dm-mono"
                >
                  View Resources
                </Link>
                <a
                  href="#"
                  className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors font-dm-mono"
                >
                  Join Community
                </a>
                <Link
                  href="/introduction"
                  className="text-blue-600 hover:text-blue-700 px-6 py-3 font-semibold font-dm-mono"
                >
                  Learn More →
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