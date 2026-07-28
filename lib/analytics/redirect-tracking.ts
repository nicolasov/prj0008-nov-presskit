import { ANALYTICS, DEFAULT_REDIRECT_UTM } from '@/lib/config/analytics';
import { createSiteUrl } from '@/lib/config/site';

/**
 * Server-side measurement for the redirect layer.
 *
 * The redirect returns a 307 with no HTML, so there is no page for gtag.js to
 * load into — client-side analytics can never see a QR scan. It also should
 * not: measuring from the browser means asking a phone on club wifi to fetch
 * a script from googletagmanager.com before it navigates away. On a slow
 * connection it loses the scan entirely, which is exactly the traffic we care
 * about. Measuring here captures every hit and costs the visitor nothing.
 *
 * Two rules this file must never break:
 *   1. It must not delay the redirect. Sent via after(), post-response.
 *   2. It must not be able to break the redirect. Everything is wrapped; a
 *      failure here is silent by design. Analytics is never worth a dead QR.
 */

const MP_ENDPOINT = 'https://www.google-analytics.com/mp/collect';

/**
 * Link-preview crawlers. Sharing a redirect URL on WhatsApp makes its crawler
 * fetch the link to build a preview card — a real request that never
 * corresponded to a human scanning anything. Counting those would silently
 * inflate every campaign number.
 */
const BOT_PATTERN =
  /bot|crawler|spider|crawling|facebookexternalhit|whatsapp|telegram|slack|discord|twitter|linkedin|preview|skype|applebot|vercel|monitor|curl|wget|headless/i;

export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true; // no UA at all is a scanner, not a phone
  return BOT_PATTERN.test(userAgent);
}

/**
 * GA4 identifies a visitor by client_id. Reusing the one already in the `_ga`
 * cookie stitches this hit to the same person's later visit to the site;
 * without it every scan looks like a brand-new user forever.
 *
 * Cookie format: GA1.1.<client_id_part_1>.<client_id_part_2>
 */
export function readClientId(cookieHeader: string | null): string {
  const match = cookieHeader?.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
  if (match) return match[1];
  // First contact: mint one in GA4's shape so the hit is still attributable.
  return `${Math.floor(Math.random() * 1e9)}.${Math.floor(Date.now() / 1000)}`;
}

/**
 * Builds the page_location reported to GA4.
 *
 * The host comes from SITE, never from the incoming request: the request host
 * varies with the deployment (preview URLs, the project's auto-assigned host,
 * localhost) and would scatter one campaign across several hostnames in the
 * reports. One configured domain keeps it in one place, and migrating to a
 * custom domain stays a single-value change.
 *
 * A request that already carries utm_* is left exactly as it came. Only a
 * request with none gets the default campaign, so an incoming campaign is
 * never silently rewritten into ours.
 */
export function buildPageLocation(slug: string, search: string): string {
  const url = new URL(createSiteUrl(`/${slug}`));
  const incoming = new URLSearchParams(search);

  for (const [key, value] of incoming) url.searchParams.set(key, value);

  const carriesCampaign = [...incoming.keys()].some((key) => key.startsWith('utm_'));
  if (!carriesCampaign) {
    for (const [key, value] of Object.entries(DEFAULT_REDIRECT_UTM)) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

type TrackArgs = {
  slug: string;
  destination: string;
  search: string;
  userAgent: string | null;
  cookieHeader: string | null;
};

/**
 * Sends one page_view to GA4.
 *
 * page_view rather than a custom event on purpose: GA4 parses utm_* out of
 * page_location, so the standard acquisition reports work without any custom
 * dimension setup. The redirect never renders the client tag, so this cannot
 * double-count.
 */
export async function trackRedirect({
  slug,
  destination,
  search,
  userAgent,
  cookieHeader,
}: TrackArgs): Promise<void> {
  const { measurementId } = ANALYTICS.ga4;
  const apiSecret = process.env.GA4_API_SECRET;

  // Not configured, or not a human. Either way: nothing to send, nothing to log.
  if (!measurementId || !apiSecret || isBot(userAgent)) return;

  try {
    const url = new URL(MP_ENDPOINT);
    url.searchParams.set('measurement_id', measurementId);
    url.searchParams.set('api_secret', apiSecret);

    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        client_id: readClientId(cookieHeader),
        events: [
          {
            name: 'page_view',
            params: {
              page_location: buildPageLocation(slug, search),
              page_title: `redirect: /${slug}`,
              redirect_slug: slug,
              redirect_destination: destination,
              // GA4 discards events with no engagement signal.
              engagement_time_msec: 1,
            },
          },
        ],
      }),
    });
  } catch {
    // Deliberately silent. The visitor is already on their way to Instagram;
    // a failed analytics call must never surface, retry or block.
  }
}
