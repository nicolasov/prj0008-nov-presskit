import type { MetadataRoute } from 'next';
import { REDIRECTS } from '@/lib/config/links';
import { createSiteUrl } from '@/lib/config/site';

/**
 * The redirect slugs are disallowed explicitly.
 *
 * They already return X-Robots-Tag: noindex, but that header is only seen by a
 * crawler that follows the redirect — and a crawler that follows it lands on
 * Instagram, which reads as a sneaky redirect. Keeping crawlers out of these
 * paths entirely is the cleaner signal. They exist for phones, not for Google.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: Object.keys(REDIRECTS).map((slug) => `/${slug}`),
    },
    sitemap: createSiteUrl('/sitemap.xml'),
  };
}
