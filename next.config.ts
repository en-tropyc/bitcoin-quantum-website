import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode for better React performance
  reactStrictMode: true,

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'explorer.bitcoinquantum.com',
      },
    ],
  },

  // Permanent redirects for retired routes
  async redirects() {
    return [
      { source: '/v2',                   destination: '/', permanent: true },
      { source: '/introduction',         destination: '/', permanent: true },
      { source: '/resources',            destination: '/testnet', permanent: true },
      { source: '/testnet/mining-guide', destination: 'https://docs.bitcoinquantum.com/mining/guide', permanent: true },
      // btq-core's README and contrib docs point downloads at btqcore.org, which
      // nobody has registered. They are being repointed here, so /download has to
      // resolve. /testnet already is the download page — it carries the release
      // links, the platform matrix and the SoftwareApplication schema — so this
      // redirects rather than duplicating it.
      { source: '/download',  destination: '/testnet#resources', permanent: true },
      { source: '/downloads', destination: '/testnet#resources', permanent: true },
      // An internal mining draft used to be served straight out of /public. It
      // has been moved to /docs (not deployed), but it was publicly reachable
      // and crawlable, so the URL redirects to the maintained guide instead of
      // starting to 404.
      { source: '/btq_mining_instructions.md', destination: 'https://docs.bitcoinquantum.com/mining/guide', permanent: true },
      // The series lives one level down from its own path. /guides already is
      // the Quantum-Secure Bitcoin collection, so send the guessable parent
      // there rather than standing up a near-duplicate hub page.
      { source: '/guides/quantum-secure-bitcoin', destination: '/guides', permanent: true },
    ];
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
