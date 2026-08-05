import type { Metadata } from 'next';

export const SITE_URL = 'https://bitcoinquantum.com';
export const SITE_NAME = 'Bitcoin Quantum';

/**
 * The project's real X account. Also mirrored in the Organization `sameAs`
 * block in the root layout and in the guide footers — keep them in sync.
 */
export const X_HANDLE = '@btc_quantum';

/** Profile URL for the same account, for Organization `sameAs` and footers. */
export const X_ACCOUNT_URL = `https://x.com/${X_HANDLE.slice(1)}`;

type SocialType = 'website' | 'article';

/**
 * Next.js replaces the `openGraph` and `twitter` metadata objects wholesale
 * rather than deep-merging them, so a page that declares its own `twitter`
 * block silently drops every field the root layout set — including
 * `twitter:site` and `twitter:creator`. Spreading this helper keeps the
 * account attribution attached to every page.
 */
export function socialMeta({
  title,
  description,
  path,
  type = 'website',
  twitterTitle,
  twitterDescription,
}: {
  title: string;
  description: string;
  path: string;
  type?: SocialType;
  /** Falls back to `title` / `description` when a card needs no tighter copy. */
  twitterTitle?: string;
  twitterDescription?: string;
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle ?? title,
      description: twitterDescription ?? description,
      site: X_HANDLE,
      creator: X_HANDLE,
    },
  };
}

/** Canonical absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * BreadcrumbList JSON-LD. `trail` is ordered root-first and excludes Home,
 * which is always prepended as position 1.
 */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
