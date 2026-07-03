'use client';

import { useEffect, useRef } from 'react';

/**
 * After ~12s without a scroll or pointer move (and only past the arrival
 * viewport), the film grain overlay breathes once — like a projector
 * holding a frame — then settles back to its base opacity. A single quiet
 * moment, never a loop, never announced.
 */
export default function IdleGrainBreath() {
  const idleTimer = useRef<number>(undefined);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const grain = document.querySelector<HTMLElement>('.grain');
    if (!grain) return;

    const breathe = () => {
      if (window.scrollY < 200) return;
      grain.style.transition = 'opacity 3200ms ease-in-out';
      grain.style.opacity = '0.065';
      window.setTimeout(() => {
        grain.style.opacity = '';
      }, 3400);
    };

    const reset = () => {
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(breathe, 12000);
    };

    reset();
    window.addEventListener('scroll', reset, { passive: true });
    window.addEventListener('pointermove', reset, { passive: true });
    return () => {
      window.removeEventListener('scroll', reset);
      window.removeEventListener('pointermove', reset);
      window.clearTimeout(idleTimer.current);
    };
  }, []);

  return null;
}
