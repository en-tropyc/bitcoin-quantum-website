import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bitcoin Quantum',
    short_name: 'BTQ',
    description: 'Bitcoin for the post-quantum era. NIST-standardized quantum-safe cryptography.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F1F2F4',
    theme_color: '#0B5A8E',
    icons: [
      // src/app/icon.png and src/app/apple-icon.png are served at these
      // URLs automatically by Next.js's file-based icon convention.
      { src: '/icon.png',        sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon.png',  sizes: '180x180', type: 'image/png' },
    ],
  };
}
