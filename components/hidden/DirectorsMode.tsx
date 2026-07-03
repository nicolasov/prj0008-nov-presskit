'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A hidden shortcut (type "d" then "j" within 600ms — spell it out) toggles
 * a very subtle "Director's Cut" overlay: screener-monitor corner marks and
 * a small mono label, auto-reverting after 7s. Paired with a single
 * synthesized mechanical click (Web Audio, no asset) — and only ever plays
 * if the visitor has already opted into audio elsewhere on the page
 * (SoundCloudPlayer dispatches `nov:audio-engaged` on first play), so this
 * never introduces surprise sound.
 */
export default function DirectorsMode() {
  const [active, setActive] = useState(false);
  const lastKey = useRef<{ key: string; time: number } | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioEngaged = useRef(false);

  useEffect(() => {
    const onAudioEngaged = () => {
      audioEngaged.current = true;
    };
    window.addEventListener('nov:audio-engaged', onAudioEngaged);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;

      const key = e.key.toLowerCase();
      const now = performance.now();
      if (key === 'j' && lastKey.current?.key === 'd' && now - lastKey.current.time < 600) {
        toggle();
        lastKey.current = null;
      } else if (key === 'd' || key === 'j') {
        lastKey.current = { key, time: now };
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('nov:audio-engaged', onAudioEngaged);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const click = () => {
    if (!audioEngaged.current) return;
    try {
      const ctx = (audioCtxRef.current ??= new AudioContext());
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.028, t + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } catch {
      // audio context unavailable — silence is the correct fallback
    }
  };

  const toggle = () => {
    click();
    setActive((prev) => !prev);
  };

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(() => setActive(false), 7000);
    return () => clearTimeout(id);
  }, [active]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-3 z-[90] transition-opacity duration-[900ms] ease-fade sm:inset-6 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-red-bright/70" />
      <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-red-bright/70" />
      <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-red-bright/70" />
      <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-red-bright/70" />
      <span className="absolute bottom-2 right-2 font-mono text-[9px] tracking-[0.2em] text-red-bright/70 sm:bottom-4 sm:right-4">
        DIRECTOR&rsquo;S CUT
      </span>
    </div>
  );
}
