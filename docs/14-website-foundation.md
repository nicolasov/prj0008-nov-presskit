# 14 · Website Foundation

This document records the Phase 1 architectural decision that prepares
`prj0008-nov-presskit` to eventually become the official NOV website.

The repository name stays unchanged for now. Do not rename the project, move
the existing press kit code, or redesign the experience as part of this phase.

## Current decision

For Phase 1, the homepage (`/`) immediately redirects visitors to NOV's
configured default public destination. Today that destination is Instagram.

This is intentional because the root URL will be used on QR codes, printed
material, flyers, business cards, stickers, and social profiles before the full
NOV website is ready. Those surfaces should keep working even when the website
evolves.

## Configuration files

The public growth foundation lives in `lib/config/`:

- `links.ts` stores public destinations and route paths.
- `site.ts` stores site-level identity and domain configuration.
- `analytics.ts` stores analytics provider flags and IDs from environment
  variables.
- `redirect.ts` exposes the reusable redirect helper used by the homepage.

## Why links are centralized

Public links are brand infrastructure. Instagram, SoundCloud, YouTube,
WhatsApp, future music links, route paths, and contact destinations may appear
in QR campaigns, metadata, structured data, buttons, cards, footers, and future
landing pages.

Keeping them in `lib/config/links.ts` avoids duplicated URLs and prevents old
printed or social entry points from drifting away from the live destination.

When a public link changes, change it once in `LINKS`.

## Why `page.tsx` never contains URLs

The homepage is a traffic entry point, not the owner of marketing destinations.
It should know only that the visitor goes to `LINKS.defaultDestination`.

This makes `/` safe to repurpose later. When the full NOV website ships, the
default destination can change without auditing page code for hidden external
URLs.

## Why `redirect.ts` exists

`lib/config/redirect.ts` creates one reusable redirect boundary:

```ts
buildRedirectUrl('instagram', window.location.search);
```

Internally it resolves the destination through `LINKS`, preserves incoming
query parameters such as UTM tags, and returns the final destination URL.
Future smart redirects, campaign routing, validation, or analytics hooks can be
added there without rewriting pages.

## Redirect behavior

The homepage is a minimal Client Component that waits `250ms` and then calls
`window.location.replace()` to the configured destination.

This keeps the user-facing experience effectively the same while giving Google
Analytics 4 enough time to initialize and send the first `page_view` before the
browser leaves for Instagram.

QR and print traffic remain reversible while the official website is still
forming.

## Site configuration

`lib/config/site.ts` is the single place for site identity:

```ts
export const SITE = {
  name: 'NOV',
  shortName: 'NOV',
  domain: 'nov.vercel.app',
  description: '',
};
```

When the custom domain is ready, change `SITE.domain` from `nov.vercel.app` to
`nov.dj`. Metadata and structured data should read from this file.

## Analytics architecture

`lib/config/analytics.ts` exists now so analytics and tracking URLs do not
become scattered through the app.

Supported future providers:

- Vercel Analytics
- Google Analytics 4

Everything must be driven by environment variables. Do not commit private keys
or tracking IDs outside the appropriate public environment variables.

Current variables:

- `NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED`
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

Google Analytics 4 is integrated through Next.js App Router using the official
`GoogleAnalytics` component from `@next/third-parties/google`. It only loads
when `NEXT_PUBLIC_GA4_MEASUREMENT_ID` exists.

## Why the QR should not point directly to Instagram

The QR should point to NOV's own URL, not Instagram directly, because NOV needs
to own the entry point.

Advantages:

- The destination can change later without reprinting the QR.
- The same QR can survive the transition from redirect to landing page.
- UTM-tagged campaign URLs stay standardized inside the project.
- Future analytics, smart redirects, or campaign logic can be added without
  changing printed assets.

## Why a redirect-owned URL is better

Instagram is today's destination, not the permanent identity of the project.
Using `https://nov.vercel.app/` as the public redirect keeps the brand URL
stable while the underlying destination evolves.

## Tracking URLs for QR campaigns

UTM helpers live in `lib/config/analytics.ts`.

Use:

```ts
buildTrackingUrl({
  path: '/',
  utm: {
    source: 'qr',
    medium: 'dj_booth',
    campaign: 'instagram',
  },
});
```

Current recommended DJ booth QR URL:

```text
https://nov.vercel.app/?utm_source=qr&utm_medium=dj_booth&utm_campaign=instagram
```

The predefined config for this campaign lives in:

```ts
ANALYTICS.qrCampaigns.djBoothInstagram
```

This makes future QR variants easy to create for cards, stickers, flyers,
posters, festivals, or event-specific campaigns without copying query strings
by hand.

## Important note about the current redirect

The homepage still exists only to redirect to Instagram, but it now renders an
extremely light client page first.

That page waits `250ms`, preserves the original query string, lets GA4 load and
register the initial `page_view`, and then performs `window.location.replace()`
to the final configured destination.

The UX remains practically unchanged for visitors, while QR traffic becomes
measurable through the project's own URL.

## How to change Instagram

Edit only:

```ts
LINKS.instagram
```

in `lib/config/links.ts`.

Do not edit `app/page.tsx`.

## How to change analytics

Edit the measurement ID through environment variables:

```text
NEXT_PUBLIC_GA4_MEASUREMENT_ID
```

The integration is mounted centrally in `app/layout.tsx` and reads from
`lib/config/analytics.ts`.

For local setup:

- `.env.example` contains the public GA4 variable name.
- For local testing, use `NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-KWL6930X3V`.

## How to change the default destination

Edit only:

```ts
LINKS.defaultDestination
```

in `lib/config/links.ts`.

For example, when the landing page is ready:

```ts
defaultDestination: 'website'
```

## How to add public links

Add the key once to `LINKS` in `lib/config/links.ts`.

Use that key everywhere else. Do not paste the URL directly into components,
metadata, route handlers, or future pages.

If the value is not ready yet, keep it as an empty string and let the consuming
UI decide whether to render it.

## How to migrate from `nov.vercel.app` to `nov.dj`

1. Configure `nov.dj` in Vercel.
2. Update DNS and verify the domain.
3. Change `SITE.domain` in `lib/config/site.ts` to `nov.dj`.
4. Configure branded email separately before relying on `booking@nov.dj`.
5. Add canonical URLs, sitemap, robots, and Open Graph review in a later SEO
   phase.

## Future migration plan

The repository should evolve from Press Kit to NOV Website in small, reversible
steps:

1. Keep the current redirect foundation while printed and social traffic points
   at `/`.
2. Add real routes beside the existing code without moving legacy components.
3. Restore `/` as a landing page when ready by changing
   `LINKS.defaultDestination` and replacing the temporary redirect page.
4. Expose `/press` as the press kit entry point.
5. Add `/music`, `/booking`, `/media`, `/contact`, and `/about` only when each
   page has real content and documentation.
6. Move from `nov.vercel.app` to `nov.dj` by changing `SITE.domain` after
   infrastructure is verified.

## Future roadmap

Do not implement these items during Phase 1. They are documented here so future
agents understand the intended direction:

- Landing Page
- Press Kit
- Link Hub
- Booking
- Music
- Media
- Contact
- Open Graph
- SEO
- Sitemap
- Custom Domain
- QR Tracking
- Vercel Analytics
- Google Analytics
- Microsoft Clarity
- Meta Pixel
- A/B Testing
- Smart Redirects

## Guidance for future AI agents

Before editing code, read this file, `docs/README.md`, `docs/01-project-vision.md`,
and `docs/08-roadmap.md`.

Preserve these rules:

- Do not rename `prj0008-nov-presskit` until explicitly requested.
- Do not move existing press kit code as part of redirect or config work.
- Do not hardcode public URLs in pages or components.
- Start with config and documentation, then implement.
- Keep `/` reversible until the official NOV website is intentionally launched.
