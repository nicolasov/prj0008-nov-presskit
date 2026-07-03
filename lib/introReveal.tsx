'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const IntroRevealContext = createContext(false);

/**
 * For the first ~5 seconds (or until the visitor's first scroll,
 * whichever comes first), only the hero word exists — no header, no
 * subline, no chrome. Silence, then an inevitable, staged arrival.
 * Shared between Nav and the hero so both settle in at the same moment.
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

    const id = window.setTimeout(reveal, 5000);

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
