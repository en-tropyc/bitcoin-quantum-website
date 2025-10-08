import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0B1426] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <h3 className="font-bold text-xl text-white font-dm-mono">
                Bitcoin Quantum
              </h3>
            </div>
            <p className="text-white/70 font-dm-mono max-w-md">
              BTC in quantum state - the evolution of Bitcoin for the quantum era.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-dm-mono">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/introduction" className="text-white/70 hover:text-white transition-colors font-dm-mono">
                  Introduction
                </Link>
              </li>
              {/* <li>
                <Link href="/resources" className="text-white/70 hover:text-white transition-colors font-dm-mono">
                  Resources
                </Link>
              </li> */}
              <li>
                <Link href="/development" className="text-white/70 hover:text-white transition-colors font-dm-mono">
                  Development
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-white transition-colors font-dm-mono">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-white mb-4 font-dm-mono">Community</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors font-dm-mono">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors font-dm-mono">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors font-dm-mono">
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/50 font-dm-mono">
            © 2025 Bitcoin Quantum • All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
