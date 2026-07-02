import type { Metadata } from 'next';
import './globals.css';
import { archivo, newsreader, geistMono } from '@/lib/fonts';
import RevealEngine from '@/components/RevealEngine';
import SmoothScroll from '@/components/SmoothScroll';
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-0 text-ink antialiased">
        <div aria-hidden="true" className="grain" />
        <RevealEngine />
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
