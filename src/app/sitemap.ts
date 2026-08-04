import { MetadataRoute } from 'next'
import { RELEASED_GUIDES } from './guides/_data/guides'
import { SITE_URL } from '@/lib/seo'

/**
 * `lastmod` deliberately does NOT use build time. Stamping every URL with
 * `new Date()` re-dates the whole site on each deploy, including pages that
 * did not change, and search engines discount a lastmod that behaves that
 * way. Static pages carry the date their content last changed; guides read
 * their real `dateModified` from the guide registry.
 */
const STATIC_PAGES: {
  path: string
  lastModified: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}[] = [
  { path: '', lastModified: '2026-07-22', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/protocol', lastModified: '2026-07-22', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/testnet', lastModified: '2026-07-22', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/guides', lastModified: '2026-07-29', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/faq', lastModified: '2026-07-22', changeFrequency: 'monthly', priority: 0.7 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...RELEASED_GUIDES.map((guide) => ({
      url: `${SITE_URL}${guide.href}`,
      lastModified: guide.dateModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
