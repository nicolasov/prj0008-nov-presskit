import { RESERVED_PATHS, resolveRedirect } from '@/lib/config/links';

/**
 * The public redirect layer.
 *
 * Every external destination NOV publishes is reached through a URL we own, so
 * a printed QR never points at a platform directly. When Instagram's handle
 * changes, one line in lib/config/links.ts changes with it and every QR
 * already in the world keeps working.
 *
 * ⚠️ 307, never 301 or 308.
 * Permanent redirects are cached by browsers, often indefinitely and with no
 * practical way to clear them. A phone that scanned the booth QR once would
 * keep resolving to the OLD destination forever — which would defeat the
 * entire reason this layer exists. The redirect is temporary by design,
 * because the destination is temporary by design.
 *
 * This handler owns every unmatched root path. Static segments (app/press,
 * and any real page added later) take precedence over this dynamic one, so
 * adding a page never collides with it — as long as its path is not also a
 * redirect slug. RESERVED_PATHS keeps that guarantee, and a test enforces it.
 */

const NOT_FOUND_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex',
} as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  // Reserved for real pages. Refused explicitly rather than by omission, so a
  // future /booking page can never be shadowed by a redirect someone printed.
  if ((RESERVED_PATHS as readonly string[]).includes(slug)) {
    return new Response(null, { status: 404, headers: NOT_FOUND_HEADERS });
  }

  const destination = resolveRedirect(slug);

  // Unknown slug, or a platform we don't have yet. 404 is deliberate: silently
  // dropping the visitor on the home page would hide a broken printed QR.
  if (destination === null) {
    return new Response(null, { status: 404, headers: NOT_FOUND_HEADERS });
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: destination,
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
    },
  });
}
