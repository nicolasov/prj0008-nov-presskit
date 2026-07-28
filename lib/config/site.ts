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
 *
 * Deliberately an alias rather than the project's auto-assigned
 * <project>.vercel.app host: renaming the Vercel project would change that
 * host and break every URL already published. Pointing the public identity at
 * an alias decouples it from the project name entirely.
 */
export const SITE = {
  name: 'NOV',
  shortName: 'NOV',
  domain: 'novdj.vercel.app',
  description: '',
} as const;

export const SITE_URL = `https://${SITE.domain}`;

export function createSiteUrl(path = '/'): string {
  return new URL(path, SITE_URL).toString();
}
