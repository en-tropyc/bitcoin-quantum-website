'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Fixed v2 nav. Renders in light or dark mode based on parent theme.
 * Inline anchors point at home-page sections via `/#hash` so they
 * work the same from every route.
 */
export default function V2Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <Link href="/" aria-label="Bitcoin Quantum home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/v2/logo-light.svg" alt="Bitcoin Quantum" className="nav-logo light-v" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/v2/logo-dark.svg" alt="Bitcoin Quantum" className="nav-logo dark-v" />
      </Link>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
        <li><Link href="/protocol" onClick={closeMenu}>Protocol</Link></li>
        <li><Link href="/testnet" onClick={closeMenu}>Testnet</Link></li>
        <li><Link href="/faq" onClick={closeMenu}>FAQ</Link></li>
      </ul>
      <div className="nav-right">
        <Link href="/#cta" className="btn btn-primary">
          Get started <span className="arrow">→</span>
        </Link>
        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
