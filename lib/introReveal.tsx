'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const IntroRevealContext = createContext(false);

/**
 * For the first ~1.8 seconds (or until the visitor's first scroll,
 * whichever comes first), only the hero word exists — no header, no
 * subline, no chrome. Like opening the cover of a book, not a loading
 * screen. Shared between Nav and the hero so both settle in together.
 * (1.8s — tightened across sprints from 5s→3s→1.8s; the silence stays,
 * the wait never feels like the page has stalled.)
 */
export function IntroRevealProvider({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    const reveal = () => setRevealed(true);

    const onScroll = () => {
      if (window.scrollY > 4) reveal();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const id = window.setTimeout(reveal, 1800);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(id);
    };
  }, []);

  return <IntroRevealContext.Provider value={revealed}>{children}</IntroRevealContext.Provider>;
}

export function useIntroReveal() {
  return useContext(IntroRevealContext);
}
