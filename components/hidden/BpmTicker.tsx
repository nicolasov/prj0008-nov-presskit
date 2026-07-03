'use client';

import { useEffect, useState } from 'react';
import { useIntroReveal } from '@/lib/introReveal';

/**
 * A tiny BPM readout — the set's pulse, drifting slowly between 120–124 like
 * a track breathing, never fixed, never distracting. Bottom-left, whisper
 * opacity, desktop only. Part of the editorial playback language (BPM /
 * pitch / cue) translated into type rather than a DJ UI. Reduced motion
 * holds it at a single value.
 */
export default function BpmTicker() {
  const revealed = useIntroReveal();
  const [bpm, setBpm] = useState(122);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let target = 122;
    const id = window.setInterval(() => {
      // a slow random walk within 120.0–124.0
      target = Math.min(124, Math.max(120, target + (Math.random() - 0.5) * 1.2));
      setBpm(Number(target.toFixed(1)));
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-8 left-8 z-30 hidden font-mono text-[10px] tracking-[0.18em] text-ink/25 [font-variant-numeric:tabular-nums] transition-opacity duration-[1400ms] ease-fade lg:block ${
        revealed ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {bpm.toFixed(1)} BPM
    </span>
  );
}
