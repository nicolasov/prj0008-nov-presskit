export type ArtistPhoto = { src: string; alt: string };

/**
 * Real photographs of NOV *with* each artist, keyed by the exact name used in
 * the Live marquee (lib data below / components/sections/Live.tsx).
 *
 * STRICT RULE — never a placeholder. Only add an entry when a genuine photo of
 * NOV *together with* that artist exists. If there is no real photograph, leave
 * the artist out entirely: the Live section then shows nothing for that name,
 * rather than inventing an image. Monochrome grading and the slow dissolve are
 * handled by the section; here we only map name → image.
 *
 * Currently empty on purpose: no verified "NOV with artist" photographs exist
 * yet. The moment a real one is dropped in here, it appears automatically —
 * quietly dissolving into the right of the Live section — the instant that name
 * reaches the focus of the marquee. Example of the shape:
 *
 *   'Jimmy Van M': { src: '/images/nov-with-jimmy-van-m.jpg', alt: 'NOV with Jimmy Van M, Buenos Aires' },
 */
export const ARTIST_PHOTOS: Record<string, ArtistPhoto> = {};

export const artistPhoto = (name?: string | null): ArtistPhoto | null =>
  (name && ARTIST_PHOTOS[name]) || null;
