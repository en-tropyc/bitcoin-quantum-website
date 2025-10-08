'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/bitcoin-quantum-logo.svg"
                alt="Bitcoin Quantum Logo"
                width={200}
                height={50}
                className="h-12"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/introduction" 
              className="text-white hover:text-gray-300 px-3 py-2 font-dm-mono font-medium transition-colors"
            >
              Introduction
            </Link>
            <Link 
              href="/resources" 
              className="text-white hover:text-gray-300 px-3 py-2 font-dm-mono font-medium transition-colors"
            >
              Resources
            </Link>
            <Link 
              href="/development" 
              className="text-white hover:text-gray-300 px-3 py-2 font-dm-mono font-medium transition-colors"
            >
              Development
            </Link>
            <Link 
              href="/faq" 
              className="text-white hover:text-gray-300 px-3 py-2 font-dm-mono font-medium transition-colors"
            >
              FAQ
            </Link>
            <div className="ml-8 pl-8 border-l border-gray-600 text-right">
              <span className="text-white font-dm-mono text-sm tracking-widest opacity-80 text-right">
                POWERED BY BTQ TECHNOLOGIES 
              </span>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0B1426] rounded-lg mt-2">
              <Link
                href="/introduction"
                className="block text-white hover:bg-white/10 px-3 py-2 rounded-md font-dm-mono font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Introduction
              </Link>
              <Link
                href="/resources"
                className="block text-white hover:bg-white/10 px-3 py-2 rounded-md font-dm-mono font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/development"
                className="block text-white hover:bg-white/10 px-3 py-2 rounded-md font-dm-mono font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Development
              </Link>
              <Link
                href="/faq"
                className="block text-white hover:bg-white/10 px-3 py-2 rounded-md font-dm-mono font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-4 mt-4 border-t border-gray-600 text-right">
                <span className="block text-white font-dm-mono text-sm tracking-widest opacity-80 px-3 text-right">
                  POWERED BY BTQ TECHNOLOGIES
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
