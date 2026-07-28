import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DEFAULT_REDIRECT_UTM } from '@/lib/config/analytics';
import { SITE } from '@/lib/config/site';
import { buildPageLocation } from './redirect-tracking';

/**
 * The printed QR carries no parameters — just <domain>/ig. The campaign is
 * attached here instead, which is what keeps the physical object free of
 * anything that could go stale.
 *
 * That makes this file the only thing standing between a working redirect and
 * a campaign that silently reports nothing: if the defaults stopped being
 * applied, every scan would still reach Instagram perfectly while the reports
 * went empty. Nothing else in the system would notice.
 */

const GA_ID = 'G-TEST123';
const SECRET = 'test-secret';

const IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';

describe('the campaign is attached at request time, not printed', () => {
  it('applies the default campaign when the QR arrives clean', () => {
    const params = new URL(buildPageLocation('ig', '')).searchParams;
    expect(params.get('utm_source')).toBe(DEFAULT_REDIRECT_UTM.utm_source);
    expect(params.get('utm_medium')).toBe(DEFAULT_REDIRECT_UTM.utm_medium);
    expect(params.get('utm_campaign')).toBe(DEFAULT_REDIRECT_UTM.utm_campaign);
  });

  it('never overwrites a campaign that arrived with the request', () => {
    const location = buildPageLocation(
      'ig',
      '?utm_source=newsletter&utm_medium=email&utm_campaign=spring',
    );
    const params = new URL(location).searchParams;
    expect(params.get('utm_source')).toBe('newsletter');
    expect(params.get('utm_medium')).toBe('email');
    expect(params.get('utm_campaign')).toBe('spring');
  });

  it('leaves a partial incoming campaign alone rather than blending the two', () => {
    // Mixing an external utm_source with our booth medium would invent a
    // campaign that never existed.
    const params = new URL(buildPageLocation('ig', '?utm_source=flyer')).searchParams;
    expect(params.get('utm_source')).toBe('flyer');
    expect(params.get('utm_medium')).toBeNull();
    expect(params.get('utm_campaign')).toBeNull();
  });

  it('keeps non-campaign parameters and still applies the default', () => {
    const params = new URL(buildPageLocation('ig', '?fbclid=abc123')).searchParams;
    expect(params.get('fbclid')).toBe('abc123');
    expect(params.get('utm_medium')).toBe(DEFAULT_REDIRECT_UTM.utm_medium);
  });

  it('takes the host from config, never from the request', () => {
    // Preview URLs, the project's auto-assigned host and localhost would
    // otherwise scatter one campaign across several hostnames in the reports.
    const url = new URL(buildPageLocation('ig', ''));
    expect(url.host).toBe(SITE.domain);
    expect(url.pathname).toBe('/ig');
  });
});

// ─────────────────────────────────────────────────────────────

async function track(args: Parameters<typeof import('./redirect-tracking').trackRedirect>[0]) {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_GA4_MEASUREMENT_ID', GA_ID);
  vi.stubEnv('GA4_API_SECRET', SECRET);
  const { trackRedirect } = await import('./redirect-tracking');
  await trackRedirect(args);
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

const sentBody = () => JSON.parse(fetchMock.mock.calls[0][1].body as string);
const sentUrl = () => new URL(String(fetchMock.mock.calls[0][0]));

const scan = { slug: 'ig', destination: 'https://instagram.com/nov', search: '' };

describe('a clean QR scan reaches GA4 already attributed', () => {
  beforeEach(async () => {
    await track({ ...scan, userAgent: IPHONE, cookieHeader: null });
  });

  it('sends the hit with the right credentials', () => {
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(sentUrl().searchParams.get('measurement_id')).toBe(GA_ID);
    expect(sentUrl().searchParams.get('api_secret')).toBe(SECRET);
  });

  it('carries the campaign inside page_location, where GA4 parses it', () => {
    const params = new URL(sentBody().events[0].params.page_location).searchParams;
    expect(params.get('utm_source')).toBe('qr');
    expect(params.get('utm_medium')).toBe('booth');
    expect(params.get('utm_campaign')).toBe('instagram');
  });

  it('sends page_view, so standard acquisition reports work without setup', () => {
    expect(sentBody().events[0].name).toBe('page_view');
    expect(sentBody().events[0].params.engagement_time_msec).toBe(1);
  });

  it('reuses the GA client_id when the visitor already has one', async () => {
    fetchMock.mockClear();
    await track({ ...scan, userAgent: IPHONE, cookieHeader: '_ga=GA1.1.555.1700000000' });
    expect(sentBody().client_id).toBe('555.1700000000');
  });
});

describe('what must never reach GA4', () => {
  it('nothing, when a link-preview crawler is behind the request', async () => {
    await track({ ...scan, userAgent: 'WhatsApp/2.23.20', cookieHeader: null });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('nothing, when the secret is missing — and it must not throw', async () => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_GA4_MEASUREMENT_ID', GA_ID);
    vi.stubEnv('GA4_API_SECRET', '');
    const { trackRedirect } = await import('./redirect-tracking');
    await expect(
      trackRedirect({ ...scan, userAgent: IPHONE, cookieHeader: null }),
    ).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('a failing analytics call never breaks the redirect', () => {
  it('swallows a network error', async () => {
    fetchMock.mockRejectedValue(new Error('network down'));
    await expect(
      track({ ...scan, userAgent: IPHONE, cookieHeader: null }),
    ).resolves.toBeUndefined();
  });
});
