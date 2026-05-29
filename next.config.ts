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
