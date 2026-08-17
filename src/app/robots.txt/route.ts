import { SITE_URL } from '@/lib/seo'

/**
 * /robots.txt — hand-written rather than generated from Next's
 * `MetadataRoute.Robots` shape, which can only emit rules, `Host` and
 * `Sitemap`. We need a free-text line to advertise /llms.txt, so this is a
 * plain route handler instead.
 *
 * Prerendered at build time; this is a static asset, not a backend route.
 */
export const dynamic = 'force-static'

function body(): string {
  return `User-Agent: *
Allow: /
Disallow: /api/

Host: ${SITE_URL}
Sitemap: ${SITE_URL}/sitemap.xml

# A plain-text map of this site for AI retrieval agents, in the
# llmstxt.org format. Not a crawl directive — a pointer.
# llms.txt: ${SITE_URL}/llms.txt
`
}

export function GET() {
  return new Response(body(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
