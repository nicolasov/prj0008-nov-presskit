import { describe, expect, it, vi } from 'vitest';
import { LINKS, REDIRECTS, RESERVED_PATHS, resolveRedirect } from '@/lib/config/links';
import { isBot, readClientId } from '@/lib/analytics/redirect-tracking';

// after() only exists inside a Next request scope. These tests assert redirect
// semantics, not Next's post-response plumbing, so it is stubbed to run inline.
vi.mock('next/server', () => ({ after: (p: unknown) => p }));

const { GET } = await import('@/app/[slug]/route');

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

describe('measurement', () => {
  it('excludes link-preview crawlers, which would inflate every campaign', () => {
    // Sharing a redirect on WhatsApp makes its crawler fetch the link. Real
    // request, no human.
    expect(isBot('WhatsApp/2.23.20')).toBe(true);
    expect(isBot('facebookexternalhit/1.1')).toBe(true);
    expect(isBot('Twitterbot/1.0')).toBe(true);
    expect(isBot('Mozilla/5.0 (compatible; Googlebot/2.1)')).toBe(true);
    expect(isBot(null)).toBe(true);
  });

  it('counts a real phone', () => {
    expect(
      isBot(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
      ),
    ).toBe(false);
  });

  it('reuses the GA client_id so a scan stitches to the same visitor', () => {
    expect(readClientId('_ga=GA1.1.1234567890.1700000000; other=x')).toBe('1234567890.1700000000');
  });

  it('mints a client_id in GA shape on first contact', () => {
    expect(readClientId(null)).toMatch(/^\d+\.\d+$/);
  });
});
