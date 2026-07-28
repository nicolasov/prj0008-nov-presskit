import { createSiteUrl } from '@/lib/config/site';

type UTMParams = {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
};

type TrackingUrlOptions = {
  path?: string;
  utm: UTMParams;
};

export const ANALYTICS = {
  vercel: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED === 'true',
  },
  ga4: {
    measurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? '',
    enabled: Boolean(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID),
  },
  qrCampaigns: {
    djBoothInstagram: {
      source: 'qr',
      medium: 'dj_booth',
      campaign: 'instagram',
    },
  },
} as const;

export function buildUTMQuery(utm: UTMParams): URLSearchParams {
  const params = new URLSearchParams({
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
  });

  if (utm.content) params.set('utm_content', utm.content);
  if (utm.term) params.set('utm_term', utm.term);

  return params;
}

export function buildTrackingUrl({ path = '/', utm }: TrackingUrlOptions): string {
  const url = new URL(createSiteUrl(path));
  url.search = buildUTMQuery(utm).toString();
  return url.toString();
}
