/**
 * Site identity.
 *
 * `domain` is the one place the public host is written down. It feeds
 * metadataBase, Open Graph, Twitter cards and JSON-LD, so it must name the host
 * the site is ACTUALLY reachable at — an aspirational value silently breaks
 * every link preview, because absolute asset URLs resolve against a host that
 * does not answer.
 *
 * Migrating to a custom domain is this line, and only this line.
 */
export const SITE = {
  name: 'NOV',
  shortName: 'NOV',
  domain: 'prj0008-nov-presskit.vercel.app',
  description: '',
} as const;

export const SITE_URL = `https://${SITE.domain}`;

export function createSiteUrl(path = '/'): string {
  return new URL(path, SITE_URL).toString();
}
