'use client';

import { useEffect, useRef, useState } from 'react';
import { useIntroReveal } from '@/lib/introReveal';
import { usePlaying } from '@/lib/playback';

/**
 * The set's pulse — a tiny BPM readout drifting 120–124 like a track
 * breathing, plus a whisper-quiet pitch that nudges with scroll and always
 * eases back to zero (the way a jog wheel settles). Bottom-left, desktop
 * only. When the music is playing it drifts a little more alive; silent, it
 * is nearly still. Part of the editorial playback language, in type — never
 * a DJ UI. Reduced motion holds it.
 */
export default function BpmTicker() {
  const revealed = useIntroReveal();
  const playing = usePlaying();
  const [bpm, setBpm] = useState(122);
  const [pitch, setPitch] = useState(0);
  const pitchRef = useRef(0);
  const lastY = useRef(0);

  // BPM drift — faster cadence and a touch wider while playing
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let target = 122;
    const tick = () => {
      const spread = playing ? 1.6 : 0.8;
      target = Math.min(124, Math.max(120, target + (Math.random() - 0.5) * spread));
      setBpm(Number(target.toFixed(1)));
    };
    const id = window.setInterval(tick, playing ? 3600 : 5600);
    return () => window.clearInterval(id);
  }, [playing]);

  // Pitch nudges with scroll velocity, then eases back to 0.0
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    lastY.current = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      const dy = window.scrollY - lastY.current;
      lastY.current = window.scrollY;
      pitchRef.current = Math.max(-6, Math.min(6, pitchRef.current + dy * 0.006));
    };
    const loop = () => {
      pitchRef.current *= 0.94; // ease back toward zero
      setPitch(Math.round(pitchRef.current * 10) / 10);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const pitchStr = `${pitch >= 0 ? '+' : ''}${pitch.toFixed(1)}%`;

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-8 left-8 z-30 hidden font-mono text-[10px] tracking-[0.18em] text-ink/25 [font-variant-numeric:tabular-nums] transition-opacity duration-[1400ms] ease-fade lg:block ${
        revealed ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {bpm.toFixed(1)} BPM
      <span className={`ml-3 ${Math.abs(pitch) > 0.1 ? 'text-ink/40' : 'text-ink/20'}`}>{pitchStr}</span>
    </span>
  );
}
