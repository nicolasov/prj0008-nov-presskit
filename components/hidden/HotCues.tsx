'use client';

import { useEffect } from 'react';
import { CUES } from '@/lib/cues';
import { useLenis } from '@/components/SmoothScroll';

/**
 * Hidden hot cues — the CDJ mental model, moved to the keyboard. Pressing a
 * number (1–8) drops to that track's cue point in the tracklist, the way a DJ
 * hits a hot-cue pad. Never shown, never announced; if it is never discovered
 * the site is complete without it. It also quietly makes the whole journey
 * keyboard-reachable. Ignored while typing in a field.
 */
export default function HotCues() {
  const lenis = useLenis();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))) return;

      const n = Number(e.key);
      if (!Number.isInteger(n) || n < 1 || n > CUES.length) return;

      const cue = CUES[n - 1];
      const offset = cue.id === 'arrival' ? 0 : -88;
      if (lenis) lenis.scrollTo(`#${cue.id}`, { offset, duration: 1.4 });
      else document.getElementById(cue.id)?.scrollIntoView({ behavior: 'smooth' });
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lenis]);

  return null;
}
