import { describe, expect, it } from 'vitest';
import { GET } from '@/app/[slug]/route';
import { LINKS, REDIRECTS, RESERVED_PATHS, resolveRedirect } from '@/lib/config/links';

/**
 * These tests guard the only mistakes in this repository that a deploy cannot
 * undo. Everything here ends up inside a QR code on a physical object that
 * cannot be recalled, corrected or reprinted once it is in the world.
 *
 * They are deliberately few. This is not coverage — it is the blast radius.
 */

const call = (slug: string) =>
  GET(new Request(`https://example.test/${slug}`), { params: Promise.resolve({ slug }) });

describe('destinations', () => {
  it('every non-empty destination is a valid absolute https URL', () => {
    for (const [key, value] of Object.entries(LINKS)) {
      if (value === '' || key === 'bookingEmail') continue;
      expect(() => new URL(value), `${key} is not a valid URL`).not.toThrow();
      expect(new URL(value).protocol, `${key} must be https`).toBe('https:');
    }
  });

  it('the booking address is a plausible email', () => {
    expect(LINKS.bookingEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('no destination has stray whitespace', () => {
    for (const [key, value] of Object.entries(LINKS)) {
      expect(value, `${key} has stray whitespace`).toBe(value.trim());
    }
  });
});

describe('namespace', () => {
  it('no redirect slug collides with a reserved path', () => {
    for (const slug of Object.keys(REDIRECTS)) {
      expect(
        (RESERVED_PATHS as readonly string[]).includes(slug),
        `/${slug} is both a redirect and a path reserved for a real page`,
      ).toBe(false);
    }
  });

  it('reserved paths are refused, so a future page is never shadowed', async () => {
    for (const path of RESERVED_PATHS) {
      expect((await call(path)).status, `/${path} must stay free`).toBe(404);
    }
  });
});

describe('redirect behaviour', () => {
  it('resolves known slugs and refuses unknown or empty ones', () => {
    expect(resolveRedirect('ig')).toBe(LINKS.instagram);
    expect(resolveRedirect('instagram')).toBe(LINKS.instagram);
    expect(resolveRedirect('spotify')).toBeNull(); // no destination yet
    expect(resolveRedirect('noexiste')).toBeNull();
    expect(resolveRedirect('constructor')).toBeNull(); // not a prototype key
  });

  it('is 307 — never 301 or 308', async () => {
    // A permanent redirect is cached by browsers indefinitely. A phone that
    // scanned the booth QR once would resolve to the OLD destination forever,
    // which is exactly what this whole layer exists to prevent.
    for (const slug of ['ig', 'instagram', 'soundcloud', 'youtube']) {
      const res = await call(slug);
      expect(res.status, `/${slug} must be 307`).toBe(307);
      expect(res.headers.get('location')).toBe(resolveRedirect(slug));
      expect(res.headers.get('cache-control')).toBe('no-store');
      expect(res.headers.get('x-robots-tag')).toBe('noindex');
    }
  });

  it('a slug with no destination 404s instead of falling back to the home page', async () => {
    // Silently landing a visitor on / would hide a broken printed QR.
    expect((await call('spotify')).status).toBe(404);
    expect((await call('noexiste')).status).toBe(404);
  });
});
