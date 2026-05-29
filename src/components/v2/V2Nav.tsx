'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/protocol', label: 'Protocol' },
  { href: '/testnet',  label: 'Testnet'  },
  { href: '/faq',      label: 'FAQ'      },
] as const;

/**
 * Fixed v2 nav. Renders in light or dark mode based on parent theme.
 * The current page (matched against href) gets aria-current="page",
 * which the stylesheet uses to draw the active underline.
 */
export default function V2Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname?.startsWith(href + '/'));

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <Link href="/" aria-label="Bitcoin Quantum home" className="nav-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/v2/logo-light.svg" alt="Bitcoin Quantum" className="nav-logo light-v" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/v2/logo-dark.svg" alt="Bitcoin Quantum" className="nav-logo dark-v" />
        <span className="nav-tagline" aria-hidden="true">Powered by BTQ Technologies</span>
      </Link>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
        {NAV_LINKS.map(({ href, label }) => {
          const active = isActive(href);
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={closeMenu}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
        {/* Mobile-only tagline that surfaces inside the open menu.
            Hidden by default; CSS reveals it at ≤620px when .open. */}
        <li className="nav-mobile-tagline" aria-hidden="true">
          Powered by BTQ Technologies
        </li>
      </ul>
      <div className="nav-right">
        <ThemeToggle />
        <Link href="/testnet#resources" className="btn btn-primary">
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
