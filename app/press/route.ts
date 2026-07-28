/**
 * /press → the Press Kit, which is the Home.
 *
 * A stable, sendable URL for bookers and promoters. It redirects rather than
 * rendering the same content at a second address: two URLs serving one page
 * would split SEO authority between them and needs a canonical tag to resolve,
 * and canonical tags fail silently. A redirect cannot.
 *
 * 307, not 308 — for the same reason as every other redirect here, and because
 * this one is expected to invert: when the site grows past a single page, /
 * becomes the landing and /press becomes the real Press Kit page. That day this
 * file is deleted, not rewritten. A cached permanent redirect would outlive it.
 *
 * As a static segment this takes precedence over app/[slug], so /press can
 * never be captured by the redirect layer.
 *
 * Location is relative on purpose. An absolute URL built from SITE.domain would
 * send visitors to whatever domain that constant currently names — wrong on
 * every preview deployment, and wrong in production for as long as the constant
 * lags behind the real host. A relative Location always resolves against the
 * host the request actually arrived on.
 */
export async function GET() {
  return new Response(null, {
    status: 307,
    headers: {
      Location: '/',
      'Cache-Control': 'no-store',
    },
  });
}
