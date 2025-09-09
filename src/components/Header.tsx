import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
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
              href="/faq" 
              className="text-white hover:text-gray-300 px-3 py-2 font-dm-mono font-medium transition-colors"
            >
              FAQ
            </Link>
            <div className="ml-8 pl-8 border-l border-gray-600">
              <span className="text-white font-dm-mono text-sm tracking-widest opacity-80">
                BTC IN QUANTUM STATE
              </span>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}