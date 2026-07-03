'use client';

import { useEffect, useState } from 'react';
import { useLenis } from '@/components/SmoothScroll';

/** Not a "back to top" button — a return to 00:00. Minimal, text only. */
export default function CueButton() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const seek = () => {
    if (lenis) lenis.scrollTo('#arrival', { offset: -88 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={seek}
      aria-label="Return to 00:00 — Arrival"
      className={`fixed bottom-6 right-6 z-40 border-none bg-transparent p-2 font-mono text-[10px] tracking-[0.22em] text-ink/45 transition-opacity duration-hover ease-fade hover:cursor-pointer hover:text-red-bright focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4 sm:bottom-8 sm:right-8 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      CUE
    </button>
  );
}
