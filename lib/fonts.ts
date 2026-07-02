import { Archivo, Newsreader, Geist_Mono } from 'next/font/google';

export const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-archivo',
  display: 'swap',
});

export const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-geist-mono',
  display: 'swap',
});
