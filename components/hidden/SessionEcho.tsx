'use client';

import { useEffect, useState } from 'react';

function fmt(seconds: number): string {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${m}:${s}`;
}

/**
 * A quiet echo against the fictional 60:00 runtime: for a visitor who has
 * genuinely spent time in the journey (scrolled, and stayed over 90s real
 * time), a barely-visible timestamp of their actual session appears once,
 * unlabeled, at the bottom of the booking thesis. No one reads it unless
 * they're already looking closely.
 */
export default function SessionEcho() {
  const [label, setLabel] = useState<string | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let scrolled = false;
    const onScroll = () => {
      scrolled = true;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const id = window.setInterval(() => {
      const elapsed = (performance.now() - start) / 1000;
      if (scrolled && elapsed > 90) {
        setLabel(fmt(elapsed));
        window.clearInterval(id);
      }
    }, 4000);

    return () => {
      window.clearInterval(id);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!label) return;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [label]);

  if (!label) return null;

  return (
    <span
      aria-hidden="true"
      className={`mt-3 block font-mono text-[9px] tracking-[0.18em] text-ink/25 transition-opacity duration-[2400ms] ease-fade ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {label}
    </span>
  );
}
