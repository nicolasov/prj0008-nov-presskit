export type ArtistPhoto = { src: string; alt: string; temp?: boolean };

/**
 * Real photographs of NOV *with* each artist, keyed by the exact name used in
 * the Live marquee. One unique image per artist — never a duplicate.
 *
 * PRODUCTION RULE — never a placeholder. In production, only add an entry when
 * a genuine photo of NOV *together with* that artist exists; if there is none,
 * leave the artist out and the Live section shows nothing for that name.
 *
 * ── Temporary (pre-launch) ─────────────────────────────────────────────
 * Until the real photographs arrive, each artist points at a NEUTRAL,
 * clearly-labelled placeholder (`/images/live-temp/*.svg`, `temp: true`) so the
 * composition and behaviour (focus tint, slow dissolve, one image at a time)
 * can be judged. These are NOT reused gallery images and each is unique.
 *
 * TO SWAP IN A REAL PHOTO: drop the file in `public/images/` and change that
 * artist's `src` to it, then remove `temp: true`. Nothing else changes.
 */
export const ARTIST_PHOTOS: Record<string, ArtistPhoto> = {
  'Jimmy Van M': { src: '/images/live-temp/jimmy-van-m.svg', alt: 'NOV with Jimmy Van M — temporary placeholder', temp: true },
  'Popof': { src: '/images/live-temp/popof.svg', alt: 'NOV with Popof — temporary placeholder', temp: true },
  'Martín García': { src: '/images/live-temp/martin-garcia.svg', alt: 'NOV with Martín García — temporary placeholder', temp: true },
  'Nicolás Rada': { src: '/images/live-temp/nicolas-rada.svg', alt: 'NOV with Nicolás Rada — temporary placeholder', temp: true },
  'Fernando Ferreyra': { src: '/images/live-temp/fernando-ferreyra.svg', alt: 'NOV with Fernando Ferreyra — temporary placeholder', temp: true },
  'Carlos Alfonsin': { src: '/images/live-temp/carlos-alfonsin.svg', alt: 'NOV with Carlos Alfonsin — temporary placeholder', temp: true },
};

export const artistPhoto = (name?: string | null): ArtistPhoto | null =>
  (name && ARTIST_PHOTOS[name]) || null;
