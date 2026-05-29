'use client';

import { useState } from 'react';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import { v2FontClassName } from '@/components/v2/fonts';
import '@/components/v2/v2.css';
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
    answer: `Bitcoin Quantum is Bitcoin designed for the post-quantum era. It maintains Bitcoin's economic model and network architecture while implementing quantum-resistant cryptographic primitives. Bitcoin Quantum remains a peer-to-peer network with no central authority or banks. It is open, its design is public, nobody owns or controls Bitcoin Quantum and everyone can take part.`
  },
  {
    id: 2,
    category: 'security',
    question: 'Why do we need quantum-resistant cryptocurrency?',
    answer: `Current cryptocurrencies like Bitcoin use ECDSA signatures that could be broken by sufficiently powerful quantum computers using Shor's algorithm. Bitcoin Quantum uses NIST-standardized post-quantum algorithms that remain secure against both classical and quantum computer attacks.`
  },
  {
    id: 3,
    category: 'technical',
    question: 'What cryptographic algorithms does BTQ use?',
    answer: `Bitcoin Quantum combines NIST-standardized post-quantum cryptography with Bitcoin's proven architecture to create a digital store of value secure against both classical and quantum threats. BTQ uses NIST-standardized CRYSTALS-Dilithium signatures to replace Bitcoin's quantum-vulnerable ECDSA, providing long-term security against emerging quantum computers. The protocol is designed with cryptographic agility, ready to adopt emerging NIST or otherwise standardized algorithms as the post-quantum ecosystem matures.`
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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className={v2FontClassName}>
      <div className="bqv2" data-theme="light" data-headline="grotesque">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <V2Nav />

        <main>
          {/* ===== HERO ===== */}
          <header className="section" style={{ paddingTop: 'clamp(128px, 16vw, 184px)' }}>
            <div className="wrap">
              <span className="eyebrow">Help center</span>
              <h1 className="display" style={{ marginTop: 24, maxWidth: '18ch' }}>
                Common questions about <span className="serif">Bitcoin&nbsp;Quantum</span>.
              </h1>
              <p className="lead" style={{ marginTop: 26, maxWidth: '54ch' }}>
                A working knowledge base — covering the cryptography, the network, security
                assumptions, and how BTQ relates to Bitcoin. Filter by topic or scan the full
                list.
              </p>
            </div>
          </header>

          {/* ===== FILTER + Q&A ===== */}
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="wrap">
              <div className="faq-filters" role="tablist" aria-label="Filter questions">
                {categories.map((category) => {
                  const on = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActiveCategory(category.id)}
                      className={`faq-pill${on ? ' on' : ''}`}
                    >
                      {category.label}
                      <span className="pill-count">{category.count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="faq-list">
                {filteredFAQs.map((faq) => {
                  const open = openItems.includes(faq.id);
                  return (
                    <div key={faq.id} className={`faq-card${open ? ' open' : ''}`}>
                      <button
                        type="button"
                        className="faq-q"
                        aria-expanded={open}
                        onClick={() => toggleItem(faq.id)}
                      >
                        <span>{faq.question}</span>
                        <span className="faq-chev" aria-hidden="true">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </button>
                      {open && (
                        <div className="faq-a">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="faq-empty">
                  No questions in this category yet.
                </div>
              )}
            </div>
          </section>

          {/* ===== STILL HAVE QUESTIONS CTA ===== */}
          <section className="cta section">
            <div className="wrap">
              <span className="eyebrow">Still stuck?</span>
              <h2 className="h2">Ask the testnet community.</h2>
              <p className="lead">
                Core contributors and other operators hang out on Telegram. For bugs or feature
                requests, file an issue on the BTQ-Core GitHub.
              </p>
              <div className="cta-row">
                <a
                  href="https://t.me/+bE6I4gqX4Vo1ODJh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent"
                >
                  Join Telegram <span className="arrow">→</span>
                </a>
                <Link href="/testnet" className="btn btn-ghost">
                  Explore the testnet
                </Link>
              </div>
            </div>
          </section>
        </main>

        <V2Footer />
      </div>
    </div>
  );
}
