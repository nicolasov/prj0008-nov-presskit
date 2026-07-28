import { createSiteUrl } from '@/lib/config/site';
import { LINKS, type LinkKey } from '@/lib/config/links';

export const CLIENT_REDIRECT_DELAY_MS = 250;

export function getLink(key: LinkKey): string {
  return LINKS[key];
}

export function buildRedirectUrl(key: LinkKey, search = ''): string {
  const destination = getLink(key);
  const url = new URL(
    destination.startsWith('http://') || destination.startsWith('https://')
      ? destination
      : createSiteUrl(destination),
  );
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);

  for (const [paramKey, value] of params.entries()) {
    url.searchParams.append(paramKey, value);
  }

  return url.toString();
}
