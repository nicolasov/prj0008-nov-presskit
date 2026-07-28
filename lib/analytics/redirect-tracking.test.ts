import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * The QR code carries utm_* parameters because they are the only attribution
 * that cannot be added after printing. This asserts they actually survive the
 * trip into the GA4 payload — the printed campaign is worthless otherwise, and
 * nothing else in the system would reveal the loss.
 */

const GA_ID = 'G-TEST123';
const SECRET = 'test-secret';

const QR_URL =
  'https://novdj.vercel.app/ig?utm_source=qr&utm_medium=booth&utm_campaign=instagram';

const IPHONE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';

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

describe('the QR campaign reaches GA4', () => {
  beforeEach(async () => {
    await track({
      slug: 'ig',
      destination: 'https://instagram.com/nov',
      requestUrl: QR_URL,
      userAgent: IPHONE,
      cookieHeader: null,
    });
  });

  it('sends the hit with the right credentials', () => {
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(sentUrl().searchParams.get('measurement_id')).toBe(GA_ID);
    expect(sentUrl().searchParams.get('api_secret')).toBe(SECRET);
  });

  it('carries the utm parameters inside page_location, where GA4 parses them', () => {
    const location = sentBody().events[0].params.page_location as string;
    const params = new URL(location).searchParams;
    expect(params.get('utm_source')).toBe('qr');
    expect(params.get('utm_medium')).toBe('booth');
    expect(params.get('utm_campaign')).toBe('instagram');
  });

  it('sends page_view, so standard acquisition reports work without setup', () => {
    expect(sentBody().events[0].name).toBe('page_view');
    expect(sentBody().events[0].params.engagement_time_msec).toBe(1);
  });
});

describe('what must never reach GA4', () => {
  it('nothing, when a link-preview crawler is behind the request', async () => {
    await track({
      slug: 'ig',
      destination: 'https://instagram.com/nov',
      requestUrl: QR_URL,
      userAgent: 'WhatsApp/2.23.20',
      cookieHeader: null,
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('nothing, when the secret is missing — and it must not throw', async () => {
    vi.resetModules();
    vi.stubEnv('NEXT_PUBLIC_GA4_MEASUREMENT_ID', GA_ID);
    vi.stubEnv('GA4_API_SECRET', '');
    const { trackRedirect } = await import('./redirect-tracking');
    await expect(
      trackRedirect({
        slug: 'ig',
        destination: 'https://instagram.com/nov',
        requestUrl: QR_URL,
        userAgent: IPHONE,
        cookieHeader: null,
      }),
    ).resolves.toBeUndefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('a failing analytics call never breaks the redirect', () => {
  it('swallows a network error', async () => {
    fetchMock.mockRejectedValue(new Error('network down'));
    await expect(
      track({
        slug: 'ig',
        destination: 'https://instagram.com/nov',
        requestUrl: QR_URL,
        userAgent: IPHONE,
        cookieHeader: null,
      }),
    ).resolves.toBeUndefined();
  });
});
