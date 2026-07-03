import type { Metadata } from 'next';
import './globals.css';
import { archivo, newsreader, geistMono } from '@/lib/fonts';
import RevealEngine from '@/components/RevealEngine';
import SmoothScroll from '@/components/SmoothScroll';
import DevConsole from '@/components/hidden/DevConsole';
import DirectorsMode from '@/components/hidden/DirectorsMode';
import IdleGrainBreath from '@/components/hidden/IdleGrainBreath';
import { LanguageProvider } from '@/lib/i18n';

const siteUrl = 'https://nov.dj';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NOV — Official Presskit',
    template: '%s | NOV',
  },
  description:
    'Official presskit for NOV, a Buenos Aires DJ and producer creating deep, hypnotic and emotionally evolving progressive house sets.',
  keywords: [
    'NOV',
    'DJ',
    'Producer',
    'Buenos Aires',
    'Progressive House',
    'Deep House',
    'Organic House',
    'Official Presskit',
    'Hypnotic Groove',
    'Argentina',
  ],
  authors: [{ name: 'NOV' }],
  openGraph: {
    title: 'NOV — Official Presskit',
    description: 'Deep, hypnotic and emotionally evolving sets. Progressive house from Buenos Aires.',
    url: siteUrl,
    siteName: 'NOV',
    locale: 'es_AR',
    type: 'website',
    images: [{ url: '/images/nov-booth-motion.jpg', width: 1537, height: 1023, alt: 'NOV in the booth' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOV — Official Presskit',
    description: 'Deep, hypnotic and emotionally evolving sets.',
    images: ['/images/nov-booth-motion.jpg'],
  },
  robots: { index: true, follow: true },
};

/**
 * Critical CSS for the hero shell, inlined so it's parsed synchronously
 * with the HTML — no wait on the external stylesheet. On a throttled
 * connection (measured: ~500ms+ on a slow 3G profile, no CPU throttle
 * needed) the hero word would otherwise flash unstyled top-left in a
 * fallback serif before snapping into its centered, sized, positioned
 * final state — precisely the "loading NOV jumps into hero NOV" bug.
 * This guarantees the word is already in its final position, size and
 * font family (a plain serif stack here — the real Newsreader swaps in
 * seamlessly once the stylesheet loads, a sub-pixel shift at most,
 * because next/font's fallback metric matching is doing its job).
 *
 * Coupled to markup: if Arrival's hero shell classes change
 * (components/sections/Arrival.tsx), update the selectors below to match.
 */
const criticalHeroCss = `
  html,body{background:#050505;margin:0}
  #arrival,#arrival *{box-sizing:border-box}
  #arrival{position:relative;height:260vh}
  #arrival>section{position:sticky;top:0;display:flex;height:100svh;flex-direction:column;justify-content:space-between;overflow:hidden}
  #arrival .container{width:100%;max-width:1320px;margin-inline:auto;padding-inline:clamp(24px,5vw,72px)}
  #arrival .container.relative{display:flex;flex:1 1 0%;flex-direction:column;justify-content:space-between;padding-block:2rem}
  #arrival .flex.flex-col.items-center{display:flex;flex-direction:column;align-items:center;text-align:center}
  #arrival h1{margin:0 0 0 0.06em;font-family:Georgia,'Times New Roman',serif;font-weight:300;font-size:clamp(4.5rem,15vw,13rem);line-height:1;letter-spacing:0.06em;color:#EAEAE6;text-align:center}
`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'NOV',
  genre: ['Progressive House', 'Deep House', 'Organic House', 'Hypnotic Groove'],
  url: siteUrl,
  sameAs: [
    'https://soundcloud.com/novnovnovnovnovnovnov',
    'https://youtube.com/@novnovnovnovnovnovnov',
  ],
  location: {
    '@type': 'Place',
    name: 'Buenos Aires, Argentina',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${archivo.variable} ${newsreader.variable} ${geistMono.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalHeroCss }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-0 text-ink antialiased">
        <div aria-hidden="true" className="grain" />
        <RevealEngine />
        <DevConsole />
        <DirectorsMode />
        <IdleGrainBreath />
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
