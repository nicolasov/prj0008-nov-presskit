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
  'Jimmy Van M': { src: '/images/nov-artist-jimmy-van-m.jpg', alt: 'NOV DJ and producer in a live Buenos Aires performance context' },
  'Popof': { src: '/images/nov-artist-popof.jpg', alt: 'NOV in a focused club portrait with cinematic lighting' },
  'Martín García': { src: '/images/nov-artist-martin-garcia.jpg', alt: 'NOV in a candid portrait during a live set' },
  'Nicolás Rada': { src: '/images/nov-artist-nicolas-rada.jpg', alt: 'NOV cueing music with headphones in a minimal venue scene' },
  'Fernando Ferreyra': { src: '/images/nov-artist-fernando-ferreyra.jpg', alt: 'NOV in an editorial frame with a confident stage presence' },
  'Carlos Alfonsin': { src: '/images/nov-artist-carlos-alfonsin.jpg', alt: 'NOV captured in silhouette under red light at a live venue' },
};

export const artistPhoto = (name?: string | null): ArtistPhoto | null =>
  (name && ARTIST_PHOTOS[name]) || null;
