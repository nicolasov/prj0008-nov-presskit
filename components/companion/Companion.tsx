'use client';

import { useEffect, useRef, useState } from 'react';
import { usePlaying } from '@/lib/playback';
import { getSetMeta } from '@/lib/sets';

type Track = { title: string; duration: number };

const fmt = (ms: number) => {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

/**
 * A quiet reminder that music continues. Not a player, not a widget — a single
 * small mark that exists only while a set is on. It is deliberately almost
 * invisible: it appears very slowly when the music starts, breathes on the
 * site's tempo, and does nothing at all if you ignore it. Hover and it softly
 * says one word; click and the drawer grows out of it. Nothing here explains
 * itself.
 *
 * It hangs off the real playback system (`usePlaying`, `nov:track`,
 * `nov:toggle`) — the same engine as the Radio player — so what it shows and
 * what it controls is always the actual set.
 */
export default function Companion() {
  const playing = usePlaying();
  const [started, setStarted] = useState(false); // a set has begun → the mark exists
  const [appear, setAppear] = useState(false); // drives the slow entrance
  const [track, setTrack] = useState<Track | null>(null);
  const [open, setOpen] = useState(false);
  const [expanding, setExpanding] = useState(false); // the held breath before the drawer
  const [reduced, setReduced] = useState(false);
  const dotRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // once music has played, the Companion exists for the visit; a pause only
  // rests it (dim, no breath), it never vanishes mid-set.
  useEffect(() => {
    if (playing) setStarted(true);
  }, [playing]);

  // let it arrive very slowly the first time it exists (fade + scale from 0)
  useEffect(() => {
    if (!started) return;
    const id = requestAnimationFrame(() => setAppear(true));
    return () => cancelAnimationFrame(id);
  }, [started]);

  useEffect(() => {
    const onTrack = (e: Event) => {
      const d = (e as CustomEvent<Track>).detail;
      if (d?.title) setTrack(d);
    };
    window.addEventListener('nov:track', onTrack as EventListener);
    return () => window.removeEventListener('nov:track', onTrack as EventListener);
  }, []);

  // breath — on the set's tempo (~122 BPM), one calm swell every two beats.
  // extremely small on purpose; it should never draw the eye. Off when paused
  // and under reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !started || !playing) {
      document.documentElement.style.setProperty('--companion-breath', '0');
      return;
    }
    const breathMs = (60000 / 122) * 2;
    let raf = 0;
    const loop = (now: number) => {
      const p = (now % breathMs) / breathMs;
      const b = 0.5 - 0.5 * Math.cos(p * Math.PI * 2);
      document.documentElement.style.setProperty('--companion-breath', b.toFixed(3));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [started, playing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const openDrawer = () => {
    // a held breath, then the drawer is born from the mark
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setOpen(true);
      return;
    }
    setExpanding(true);
    window.setTimeout(() => {
      setOpen(true);
      setExpanding(false);
    }, 260);
  };

  const closeDrawer = () => {
    setOpen(false);
    window.setTimeout(() => dotRef.current?.focus(), 40);
  };

  if (!started) return null;

  const meta = getSetMeta(track?.title);

  return (
    <>
      {/* the mark */}
      <div
        className={`fixed bottom-[5.6rem] right-[2.35rem] z-[45] sm:bottom-[6.6rem] sm:right-[2.9rem] ${
          open ? 'pointer-events-none' : ''
        }`}
        style={{ opacity: open ? 0 : 1, transition: `opacity ${reduced ? 150 : 800}ms linear` }}
      >
        {/* slow entrance — fades and scales in, almost unnoticed */}
        <div
          style={{
            opacity: appear ? 1 : 0,
            transform: appear || reduced ? 'scale(1)' : 'scale(0.4)',
            transition: reduced
              ? 'opacity 200ms linear'
              : 'opacity 3000ms linear, transform 3000ms cubic-bezier(.22,1,.36,1)',
          }}
        >
          <div
            className="group relative flex items-center"
            style={{ opacity: playing ? 1 : 0.55, transition: `opacity ${reduced ? 150 : 2200}ms linear` }}
          >
          <button
            ref={dotRef}
            type="button"
            onClick={openDrawer}
            aria-label="Now playing"
            className="block h-[11px] w-[11px] rounded-full border-0 bg-red-bright p-0 outline-none focus-visible:ring-1 focus-visible:ring-red-bright focus-visible:ring-offset-4 focus-visible:ring-offset-bg-0"
            style={{
              transform: `scale(${expanding ? 1.9 : 'calc(1 + var(--companion-breath, 0) * 0.06)'})`,
              transition: expanding
                ? 'transform 340ms cubic-bezier(.34,1.56,.64,1)'
                : 'transform 140ms linear',
              cursor: 'pointer',
            }}
          />
          {/* softly reveals one word — only on hover / focus */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-[calc(100%+12px)] whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.26em] text-ink/45 opacity-0 transition-opacity duration-[600ms] ease-fade group-hover:opacity-100 group-focus-within:opacity-100"
          >
            Listening
          </span>
          </div>
        </div>
      </div>

      {/* an invisible catch — closes on an outside click, never darkens the page */}
      {open && <div className="fixed inset-0 z-[46]" onClick={closeDrawer} aria-hidden="true" />}

      {/* the drawer — grows out of the mark */}
      <aside
        role="dialog"
        aria-label="Now playing"
        aria-hidden={!open}
        className="fixed bottom-6 right-6 z-[47] w-[min(340px,86vw)] border border-line bg-bg-1 sm:bottom-8 sm:right-8"
        style={{
          transformOrigin: '100% 100%',
          transform: open || reduced ? 'none' : 'scale(0.06) translateY(10px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: reduced
            ? 'opacity 180ms linear'
            : 'transform 700ms cubic-bezier(.19,1,.22,1), opacity 520ms linear',
        }}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-ink/45">
            <span className="text-red-bright">●</span> Now playing
          </span>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close"
            className="border-0 bg-transparent p-1 font-mono text-[14px] leading-none text-ink/45 transition-colors duration-hover ease-fade hover:cursor-pointer hover:text-red-bright"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          {/* atmospheric plate — never a claimed cover, just a held frame */}
          <div
            aria-hidden="true"
            className="relative mb-[18px] aspect-[16/10] w-full overflow-hidden border border-line-strong"
            style={{
              background:
                'radial-gradient(90% 120% at 50% 8%, rgba(224,82,63,.55), rgba(120,20,18,.32) 42%, #0a0708 74%)',
            }}
          >
            <div
              className="absolute bottom-0 left-1/2 h-[64%] w-[34%] -translate-x-1/2 rounded-t-[44%]"
              style={{ background: 'linear-gradient(#000,#050505)' }}
            />
          </div>

          <p className="m-0 line-clamp-2 font-serif text-[20px] font-light leading-[1.2] text-ink">
            {track?.title ?? '—'}
          </p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2.5">
            <Field label="Duration" value={track ? fmt(track.duration) : '—'} />
            {meta.location && <Field label="Recorded" value={meta.location} />}
            {meta.year && <Field label="Year" value={meta.year} />}
          </div>

          {meta.note && (
            <p className="mt-4 border-t border-line pt-4 font-serif text-[13.5px] font-light italic leading-[1.6] text-ink/60">
              {meta.note}
            </p>
          )}

          <div className="mt-[18px] border-t border-line pt-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('nov:toggle'))}
              className="flex items-center gap-3 border-0 bg-transparent p-0 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/60 transition-colors duration-hover ease-fade hover:cursor-pointer hover:text-ink"
            >
              <span className="relative flex h-3 w-3 items-center justify-center text-red-bright" aria-hidden="true">
                {playing ? (
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                    <rect x="0" y="0" width="3" height="12" />
                    <rect x="7" y="0" width="3" height="12" />
                  </svg>
                ) : (
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                    <path d="M0 0L10 6L0 12V0Z" />
                  </svg>
                )}
              </span>
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/25">{label}</span>
      <span className="font-mono text-[12px] tracking-[0.04em] text-ink/55 [font-variant-numeric:tabular-nums]">
        {value}
      </span>
    </div>
  );
}
