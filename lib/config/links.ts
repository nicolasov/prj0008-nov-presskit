/**
 * The single source of truth for every public destination NOV owns or points to.
 *
 * ⚠️ This file backs printed material. A QR code carries a URL from here into
 * the physical world, where it cannot be revoked or corrected. A typo below is
 * the only mistake in this repository that a deploy cannot undo. Change it
 * deliberately, and let the tests run.
 *
 * When a destination changes, change it HERE and nowhere else. Never paste a
 * public URL into a component, a route, metadata or structured data.
 */

/**
 * External destinations, keyed by platform.
 *
 * An empty string means "we don't have this yet". A redirect to an empty
 * destination returns 404 — deliberately. A QR that promises Spotify and
 * silently drops the visitor on the home page is worse than one that fails
 * honestly.
 */
export const LINKS = {
  instagram: 'https://instagram.com/NOVNOVNOVNOVNOVNOVNOV',
  soundcloud: 'https://soundcloud.com/novnovnovnovnovnovnov',
  youtube: 'https://youtube.com/@novnovnovnovnovnovnov',
  spotify: '',
  beatport: '',

  whatsapp: 'https://wa.me/5491132102111',
  bookingEmail: 'booking@nov.dj',
} as const;

export type LinkKey = keyof typeof LINKS;

/**
 * Booking form endpoint (Formspree).
 *
 * Public by design — it is a form action, not a credential, and Formspree
 * handles abuse on their side. That is the point: the alternative was our own
 * API route, which was an unauthenticated, unthrottled endpoint that anyone
 * could POST to in a loop.
 *
 * Reused from the account already in use across the ecosystem rather than
 * adding a second email service for one form.
 */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdlejre';

/**
 * Public redirect slugs → the LINKS key they resolve to.
 *
 * These are the URLs that end up in QR codes, bios and captions. Adding a
 * redirect is one line here — no new file, no new route.
 *
 * `ig` and `instagram` both exist on purpose: `ig` is the short form we
 * publish, `instagram` catches anyone who guesses the long one. Both read the
 * same destination, so they can never drift apart.
 */
export const REDIRECTS = {
  ig: 'instagram',
  instagram: 'instagram',
  spotify: 'spotify',
  beatport: 'beatport',
  soundcloud: 'soundcloud',
  youtube: 'youtube',
} as const satisfies Record<string, LinkKey>;

export type RedirectSlug = keyof typeof REDIRECTS;

/**
 * Root paths reserved for real pages that do not exist yet.
 *
 * A redirect slug must never take one of these, or the page could not be built
 * later without breaking a URL that is already in the world. Enforced by test.
 */
export const RESERVED_PATHS = ['music', 'booking', 'contact'] as const;

/** Resolves a slug to its destination, or null if it has none yet. */
export function resolveRedirect(slug: string): string | null {
  if (!Object.hasOwn(REDIRECTS, slug)) return null;
  const destination = LINKS[REDIRECTS[slug as RedirectSlug]];
  return destination === '' ? null : destination;
}
