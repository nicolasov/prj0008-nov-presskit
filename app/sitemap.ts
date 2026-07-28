import type { MetadataRoute } from 'next';
import { createSiteUrl } from '@/lib/config/site';

/**
 * One page, because there is one page. The Press Kit is the Home.
 *
 * Redirect slugs are deliberately absent: a sitemap is a list of pages worth
 * indexing, and they are not pages. /press is absent for the same reason — it
 * redirects here, so listing it would offer Google two URLs for one document.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: createSiteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
