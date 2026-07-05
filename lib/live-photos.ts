export type ArtistPhoto = { src: string; alt: string; temp?: boolean };

/**
 * One unique photograph per artist for the Live section — never a duplicate.
 *
 * ── Temporary (pre-launch) ─────────────────────────────────────────────
 * These are NOT the real "NOV with the artist" photographs. Until those
 * arrive, each artist points at a DIFFERENT real photograph already on the
 * site, so the composition (monochrome, small, heavily vignetted, dissolving
 * from darkness) can be judged as close to the final experience as possible —
 * not with placeholder graphics.
 *
 * TO SWAP IN A REAL PHOTO: change that artist's `src`. Nothing else changes.
 * PRODUCTION RULE: an artist with no entry shows nothing — never a placeholder.
 */
export const ARTIST_PHOTOS: Record<string, ArtistPhoto> = {
  'Jimmy Van M': { src: '/images/nov-dj-organic-house-buenos-aires-hero.jpg', alt: 'NOV, Buenos Aires — temporary stand-in' },
  'Popof': { src: '/images/nov-booth-shadow.jpg', alt: 'NOV in half light — temporary stand-in' },
  'Martín García': { src: '/images/nov-portrait-wall.jpg', alt: 'NOV, portrait — temporary stand-in' },
  'Nicolás Rada': { src: '/images/nov-headphones.jpg', alt: 'NOV, cueing — temporary stand-in' },
  'Fernando Ferreyra': { src: '/images/nov-about-editorial-buenos-aires.jpg', alt: 'NOV at the decks — temporary stand-in' },
  'Carlos Alfonsin': { src: '/images/nov-dj-red-light-booth-silhouette.jpg', alt: 'NOV, red light — temporary stand-in' },
};

export const artistPhoto = (name?: string | null): ArtistPhoto | null =>
  (name && ARTIST_PHOTOS[name]) || null;
