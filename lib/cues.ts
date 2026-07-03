export type Cue = {
  id: string;
  tc: string;
  label: string;
};

/** The journey's total runtime. Editorial fiction, not a real duration. */
export const RUNTIME_SECONDS = 60 * 60;
export const RUNTIME_TC = '60:00';

/**
 * The tracklist — single source of truth for section order, ids and
 * editorial timecodes. Consumed by the nav (active-cue highlight,
 * click-to-seek) and by the homepage sections themselves (matching id).
 * Timecodes are editorial fiction: position in the journey, not real
 * durations.
 */
export const CUES: Cue[] = [
  { id: 'arrival', tc: '00:00', label: 'Arrival' },
  { id: 'philosophy', tc: '05:00', label: 'Philosophy' },
  { id: 'about', tc: '10:00', label: 'About' },
  { id: 'live', tc: '20:00', label: 'Live' },
  { id: 'gallery', tc: '29:00', label: 'Gallery' },
  { id: 'radio', tc: '41:00', label: 'Radio' },
  { id: 'press-kit', tc: '51:00', label: 'Press Kit' },
  { id: 'booking', tc: '60:00', label: 'Booking' },
];

/** Look up a cue by id. Throws in dev if a section's id drifts from the tracklist. */
export function getCue(id: string): Cue {
  const cue = CUES.find((c) => c.id === id);
  if (!cue) throw new Error(`Unknown cue id "${id}" — check lib/cues.ts`);
  return cue;
}
