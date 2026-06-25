import type { Metadata } from 'next';
import { Archivo, Manrope } from 'next/font/google';
import './globals.css';
import RevealInit from '@/components/RevealInit';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-archivo',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const siteUrl = 'https://nov.dj';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NOV — DJ & Productor | Buenos Aires',
    template: '%s | NOV',
  },
  description:
    'NOV es un DJ y productor de Buenos Aires que construye sets hipnóticos y cargados de groove. Progressive house, deep & organic, ambient & downtempo.',
  keywords: [
    'NOV',
    'DJ',
    'Productor',
    'Buenos Aires',
    'Progressive House',
    'Deep House',
    'DJ Booking',
    'Sets hipnóticos',
    'Groove',
    'Argentina',
  ],
  authors: [{ name: 'NOV' }],
  openGraph: {
    title: 'NOV — DJ & Productor | Buenos Aires',
    description: 'Sets hipnóticos cargados de groove. Progressive house, deep & organic, ambient. Buenos Aires, Argentina.',
    url: siteUrl,
    siteName: 'NOV',
    locale: 'es_AR',
    type: 'website',
    images: [{ url: '/images/nov-stage.jpg', width: 1200, height: 630, alt: 'NOV DJ & Productor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NOV — DJ & Productor | Buenos Aires',
    description: 'Sets hipnóticos cargados de groove.',
    images: ['/images/nov-stage.jpg'],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicGroup',
  name: 'NOV',
  genre: ['Progressive House', 'Deep House', 'Ambient', 'Downtempo'],
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
    <html lang="es" className={`${archivo.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div aria-hidden="true" className="grain" />
        <RevealInit />
        {children}
      </body>
    </html>
  );
}
