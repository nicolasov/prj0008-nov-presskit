'use client';

import { useEffect, useRef, useState } from 'react';
import { useLenis } from '@/components/SmoothScroll';

const HINT_KEY = 'nov-cue-hint-seen';

/**
 * Not a "back to top" button — the CUE. A return to 00:00, the way a DJ
 * drops the needle back to the first cue point. Circular, transparent
 * centre, thin signal-red outline — a nod to the physical CUE on a Pioneer
 * CDJ without imitating it. The first time it appears, a small arrow points
 * to it for ~4s, once per session, then never again.
 */
export default function CueButton() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);
  const [hint, setHint] = useState(false);
  const hintFired = useRef(false);
  const audioEngaged = useRef(false);
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    // The CUE plays a soft "needle to the cue point" tone on return — but only
    // if the visitor has already engaged audio (SoundCloud), so it can never be
    // a surprise sound. Synthesized, no asset.
    const onEngaged = () => (audioEngaged.current = true);
    window.addEventListener('nov:audio-engaged', onEngaged);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('nov:audio-engaged', onEngaged);
    };
  }, []);

  const playNeedle = () => {
    if (!audioEngaged.current) return;
    try {
      const ctx = (audioCtx.current ??= new AudioContext());
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.14);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.02, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.18);
    } catch {
      // no audio context — silence is the correct fallback
    }
  };

  // teach the interaction once: a brief arrow the first time CUE appears
  useEffect(() => {
    if (!visible || hintFired.current) return;
    hintFired.current = true;
    if (sessionStorage.getItem(HINT_KEY)) return;
    sessionStorage.setItem(HINT_KEY, '1');
    setHint(true);
    const id = window.setTimeout(() => setHint(false), 4000);
    return () => window.clearTimeout(id);
  }, [visible]);

  const seek = () => {
    setHint(false);
    playNeedle();
    if (lenis) lenis.scrollTo('#arrival', { offset: 0, duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-opacity duration-[600ms] ease-fade sm:bottom-8 sm:right-8 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* one-time arrow — points at CUE, then gone forever */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 font-mono text-[13px] text-red-bright transition-opacity duration-500 ease-fade ${
          hint ? 'opacity-100 motion-safe:animate-[cue-nudge_1.4s_ease-in-out_infinite]' : 'opacity-0'
        }`}
      >
        →
      </span>

      <button
        type="button"
        onClick={seek}
        aria-label="CUE — return to 00:00, Arrival"
        className="group flex h-14 w-14 items-center justify-center rounded-full border border-red/70 bg-transparent font-mono text-[10px] tracking-[0.22em] text-red-bright transition-colors duration-hover ease-fade hover:cursor-pointer hover:border-red-bright hover:bg-red/5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4"
      >
        CUE
      </button>
    </div>
  );
}
