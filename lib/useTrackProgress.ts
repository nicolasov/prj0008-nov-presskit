'use client';

import { useEffect, useRef, useState } from 'react';
import { CUES } from '@/lib/cues';

/**
 * Tracks scroll position against the tracklist: overall page progress
 * (0–1) and which cue is currently active. Degrades gracefully when a
 * cue's section isn't in the DOM yet (id simply never wins the match).
 */
export function useTrackProgress() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(CUES[0].id);
  const rafRef = useRef(0);

  useEffect(() => {
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);

      const threshold = window.innerHeight * 0.4;
      let current = CUES[0].id;
      for (const cue of CUES) {
        const el = document.getElementById(cue.id);
        if (el && el.getBoundingClientRect().top <= threshold) current = cue.id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        measure();
      });
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { progress, activeId };
}
