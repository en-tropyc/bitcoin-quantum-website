'use client';

import Link from 'next/link';

export default function TestnetBanner() {
  return (
    <Link
      href="/testnet"
      className="group relative block w-full border-b border-[rgba(0,240,255,0.2)] overflow-hidden"
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-[0.12] group-hover:opacity-[0.18] transition-opacity"
        style={{
          background: 'linear-gradient(90deg, #00f0ff, #a855f7, #00f0ff, #a855f7)',
          backgroundSize: '300% 100%',
          animation: 'gradient-shift 10s ease-in-out infinite',
        }}
      />
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-3 font-dm-mono text-sm">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00f0ff] rounded-full animate-pulse" />
            <span className="text-[#00f0ff] font-semibold">Testnet</span>
            <span className="text-white/80">is live — Run a quantum-secure miner</span>
          </span>
          <svg
            className="w-4 h-4 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
