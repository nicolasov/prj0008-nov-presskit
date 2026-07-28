export const SITE = {
  name: 'NOV',
  shortName: 'NOV',
  domain: 'nov.vercel.app',
  description: '',
} as const;

export const SITE_URL = `https://${SITE.domain}`;

export function createSiteUrl(path = '/'): string {
  return new URL(path, SITE_URL).toString();
}
