import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(0,240,255,0.1)] py-8 mt-10 relative z-10">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="text-white/50 text-sm font-dm-mono">Bitcoin Quantum © 2025</div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/introduction" className="text-white/50 text-sm hover:text-[#00f0ff] transition-colors font-dm-mono">Introduction</Link>
          <Link href="/development" className="text-white/50 text-sm hover:text-[#00f0ff] transition-colors font-dm-mono">Development</Link>
          <Link href="/testnet" className="text-white/50 text-sm hover:text-[#00f0ff] transition-colors font-dm-mono">Testnet</Link>
          <Link href="/faq" className="text-white/50 text-sm hover:text-[#00f0ff] transition-colors font-dm-mono">FAQ</Link>
          <a href="https://x.com/btc_quantum" target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-[#00f0ff] transition-colors font-dm-mono">Twitter</a>
        </div>
        <div className="font-dm-mono text-xs text-white/50 bg-[#0c1017] px-3 py-1.5 rounded-md border border-[rgba(0,240,255,0.1)]">
          testnet v0.1.0
        </div>
      </div>
    </footer>
  );
}
