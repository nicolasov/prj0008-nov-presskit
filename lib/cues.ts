export type Cue = {
  id: string;
  tc: string;
  label: string;
};

/**
 * The tracklist — single source of truth for section order, ids and
 * editorial timecodes. Consumed by the nav (active-cue highlight,
 * click-to-seek) and by the homepage sections themselves (matching id).
 * Timecodes are editorial fiction: position in the journey, not real
 * durations.
 */
export const CUES: Cue[] = [
  { id: 'arrival', tc: '00:00', label: 'Arrival' },
  { id: 'philosophy', tc: '04:30', label: 'Philosophy' },
  { id: 'about', tc: '09:00', label: 'About' },
  { id: 'live', tc: '18:00', label: 'Live' },
  { id: 'gallery', tc: '27:00', label: 'Gallery' },
  { id: 'videos', tc: '38:00', label: 'Videos / Sets' },
  { id: 'press-kit', tc: '47:00', label: 'Press Kit' },
  { id: 'booking', tc: '55:00', label: 'Booking' },
];
