/**
 * Analytics configuration. Environment-driven — no measurement ID or secret is
 * ever committed.
 */
export const ANALYTICS = {
  ga4: {
    measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? '',
    enabled: Boolean(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID),
  },
} as const;

/**
 * Campaign applied to a redirect that arrives carrying no utm_* of its own.
 *
 * This exists so the printed QR can stay clean: the sign carries `<domain>/ig`
 * and nothing else, and the campaign is attached here, at request time. Nothing
 * about the campaign is baked into the physical object, so it can be changed
 * later without reprinting — the same reason the redirect layer exists at all.
 *
 * ⚠️ Known trade-off, accepted deliberately: /ig is also linked from the bio
 * and shared by hand, and those arrivals carry no utm_* either, so they are
 * reported under this campaign too. These numbers describe "untagged arrivals
 * at /ig", not strictly "QR scans". While the QR is the main channel that is
 * close enough to be useful. To separate them properly, give the printed code
 * its own slug — do not make this default smarter.
 */
export const DEFAULT_REDIRECT_UTM = {
  utm_source: 'qr',
  utm_medium: 'booth',
  utm_campaign: 'instagram',
} as const;
