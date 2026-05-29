'use client';

import { useState } from 'react';
import V2Nav from '@/components/v2/V2Nav';
import V2Footer from '@/components/v2/V2Footer';
import { v2FontClassName } from '@/components/v2/fonts';
import RevealMount from '@/components/v2/RevealMount';
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
    answer:
      "Bitcoin, rebuilt on cryptography that quantum computers cannot break. Same proof-of-work consensus, same 21-million-coin supply, same peer-to-peer architecture — with the signature algorithm replaced by NIST-standardized post-quantum primitives. Open-source, no central authority, no one owns it.",
  },
  {
    id: 2,
    category: 'security',
    question: 'Why do we need quantum-resistant cryptocurrency?',
    answer:
      "Bitcoin's signatures use ECDSA, which Shor's algorithm can break on a sufficiently powerful quantum computer. Once that happens, every revealed public key on the chain becomes recoverable. Bitcoin Quantum closes that door before it opens by signing with NIST-standardized lattice cryptography.",
  },
  {
    id: 3,
    category: 'technical',
    question: 'What cryptographic algorithms does BTQ use?',
    answer:
      "CRYSTALS-Dilithium (ML-DSA, NIST FIPS 204) replaces ECDSA for transaction signing. The protocol is designed with cryptographic agility, so additional NIST-standardized algorithms can be adopted as the post-quantum ecosystem matures.",
  },
  {
    id: 4,
    category: 'general',
    question: 'How is BTQ different from Bitcoin?',
    answer:
      "Two things change. Signatures switch from ECDSA to CRYSTALS-Dilithium, and block size grows from 1 MB to 64 MiB to absorb the larger post-quantum signatures. Everything else — the UTXO model, the scripting system, the halving schedule, SHA-256 proof-of-work — stays exactly as Bitcoin defined it.",
  },
  {
    id: 5,
    category: 'trading',
    question: 'Where can I get BTQ?',
    answer:
      "Today: testnet only. Run a node, mine quantum-safe blocks, and earn testnet BTQ — the mining guide walks through every step. Mainnet launch will bring exchange listings; until then, the testnet is the way to participate.",
  },
  {
    id: 6,
    category: 'security',
    question: 'How secure is BTQ?',
    answer:
      "Bitcoin Core's security model, hardened with NIST FIPS 204 signatures. Spends are cryptographically secure against both classical and quantum attacks. To report a security issue, email oscar@btq.com or barney@btq.com.",
  },
  {
    id: 7,
    category: 'technical',
    question: 'Can I migrate from Bitcoin to BTQ?',
    answer:
      "No — Bitcoin Quantum is a separate chain with its own native coin. Moving value across requires exchanges or atomic swaps once those are available. The UTXO model and scripting system carry over directly, so developer tooling translates one-to-one.",
  },
  {
    id: 8,
    category: 'general',
    question: 'What is the maximum supply of BTQ?',
    answer:
      "21 million coins. The same halving schedule (every 210,000 blocks), the same reward decay, the same monetary policy that makes Bitcoin sound money.",
  },
  {
    id: 9,
    category: 'technical',
    question: 'How does BTQ mining work?',
    answer:
      "Same SHA-256 proof-of-work as Bitcoin — existing ASIC miners work without modification. Difficulty adjustment, reward structure, and 10-minute target block time are all preserved. The only difference is block size: 64 MiB instead of 1 MB, sized for larger post-quantum signatures.",
  },
  {
    id: 10,
    category: 'security',
    question: 'When will quantum computers threaten current cryptocurrencies?',
    answer:
      "Consensus estimates put cryptographically-relevant quantum computers ten to twenty years out — possibly sooner. The migration to post-quantum cryptography needs to happen before that threshold. Bitcoin Quantum is that migration, available today.",
  },
  {
    id: 11,
    category: 'trading',
    question: 'What are the transaction fees?',
    answer:
      "Same fee market as Bitcoin: paid per byte, set by congestion, mined by whoever bids highest. Post-quantum signatures are larger, so the 64 MiB block size keeps per-byte fees competitive with what Bitcoin users already expect.",
  },
  {
    id: 12,
    category: 'general',
    question: 'Is BTQ open source?',
    answer:
      "Yes — MIT-licensed. Source, documentation, and the full development history live at github.com/btq-ag/btq-core. Review, fork, contribute, or run your own audit.",
  },
];

const categories = [
  { id: 'all', label: 'All', count: faqData.length },
  { id: 'general', label: 'General', count: faqData.filter((f) => f.category === 'general').length },
  { id: 'technical', label: 'Technical', count: faqData.filter((f) => f.category === 'technical').length },
  { id: 'security', label: 'Security', count: faqData.filter((f) => f.category === 'security').length },
  { id: 'trading', label: 'Trading', count: faqData.filter((f) => f.category === 'trading').length },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs =
    activeCategory === 'all' ? faqData : faqData.filter((faq) => faq.category === activeCategory);

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
        <RevealMount />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <V2Nav />

        <main>
          {/* ===== HERO ===== */}
          <header className="section page-hero">
            <div className="lattice-corner" aria-hidden="true" />
            <div className="wrap">
              <span className="eyebrow reveal">Help center</span>
              <h1 className="display display-wide ml-display reveal d1">
                <span className="serif">Everything</span> you&apos;d ask about Bitcoin&nbsp;Quantum.
              </h1>
              <p className="lead lead-wide ml-lead reveal d2">
                A working knowledge base — cryptography, network parameters, security
                assumptions, and how BTQ relates to Bitcoin. Filter by topic or scan everything.
              </p>
            </div>
          </header>

          {/* ===== FILTER + Q&A ===== */}
          <section className="section section-flush-top">
            <div className="wrap">
              <div className="faq-filters reveal" role="tablist" aria-label="Filter questions">
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
                    <div key={faq.id} className={`faq-card reveal${open ? ' open' : ''}`}>
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
                <div className="faq-empty">No questions in this category yet.</div>
              )}
            </div>
          </section>

          {/* ===== STILL HAVE QUESTIONS CTA ===== */}
          <section className="cta section">
            <div className="wrap">
              <span className="eyebrow reveal">Still stuck?</span>
              <h2 className="h2 reveal d1">Ask the testnet community.</h2>
              <p className="lead reveal d2">
                Core contributors and other operators hang out on Telegram. For bugs or feature
                requests, file an issue on the BTQ-Core GitHub.
              </p>
              <div className="cta-row reveal d2">
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
