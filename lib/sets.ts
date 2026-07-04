export type SetMeta = { note?: string; location?: string; year?: string };

/**
 * Editorial metadata for known sets, keyed by exact SoundCloud title (the set
 * list is fetched live, so titles aren't known ahead of time). Emotion, never
 * technique — see docs/06-copywriting.md. A set with no entry simply shows
 * less; nothing is fabricated at render time.
 *
 * Shared by the Radio player and the Companion so both speak with one voice.
 */
export const SET_META: Record<string, SetMeta> = {
  'Live at Privilege San Bernardo by Moon House [2026.04]': {
    note: 'Recorded live, the room still audible under the low end. A set that takes its time to arrive — and means it when it does.',
    location: 'Privilege · San Bernardo',
    year: '2026',
  },
  'Live at Mazovia Zárate [2026.03]': {
    note: 'A coastal night, played slower than the room expected. It rewards staying until the very end.',
    location: 'Mazovia · Zárate',
    year: '2026',
  },
  'Taken 02': {
    note: 'A quieter register, made for headphones rather than a room. The second chapter of an ongoing selection.',
    year: '2026',
  },
};

export const getSetMeta = (title?: string): SetMeta => (title && SET_META[title]) || {};
