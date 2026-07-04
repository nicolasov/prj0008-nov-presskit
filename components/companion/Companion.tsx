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
 * invisible: it arrives very slowly when the music starts, is nearly still,
 * steps further back over the hero, and does nothing at all if you ignore it.
 *
 * On click it does not open a panel — it becomes one. The dot hands the
 * gesture off (it fades within ~180ms) and the drawer grows out of its exact
 * position, so it reads as the Companion unfolding, never as two elements.
 *
 * It hangs off the real playback system (`usePlaying`, `nov:track`,
 * `nov:toggle`) — the same engine as the Radio player.
 */
export default function Companion() {
  const playing = usePlaying();
  const [started, setStarted] = useState(false);
  const [appear, setAppear] = useState(false);
  const [track, setTrack] = useState<Track | null>(null);
  const [open, setOpen] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inHero, setInHero] = useState(true);
  const [origin, setOrigin] = useState('calc(100% - 28px) calc(100% - 72px)');
  const dotRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // a set has begun → the mark exists for the visit; a pause only rests it.
  useEffect(() => {
    if (playing) setStarted(true);
  }, [playing]);

  // arrive very slowly the first time it exists
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

  // it is quieter still inside the hero — the most contemplative moment.
  useEffect(() => {
    const onScroll = () => {
      const hero = window.scrollY < window.innerHeight * 0.7;
      setInHero((prev) => (prev === hero ? prev : hero));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // breath — on the set's tempo, but barely: only peripheral vision should
  // catch it. Off when paused / reduced.
  useEffect(() => {
    if (reduced || !started || !playing) {
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
  }, [reduced, started, playing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const openDrawer = () => {
    // set the growth origin to the dot's exact centre so the drawer is born
    // from it. offsetWidth/Height are the untransformed layout box, so we can
    // place the origin without touching (or flashing) the transform.
    const dr = drawerRef.current;
    const dot = dotRef.current;
    if (dr && dot) {
      const inset = window.matchMedia('(min-width: 640px)').matches ? 32 : 24;
      const drRight = window.innerWidth - inset;
      const drBottom = window.innerHeight - inset;
      const drLeft = drRight - dr.offsetWidth;
      const drTop = drBottom - dr.offsetHeight;
      const d = dot.getBoundingClientRect();
      setOrigin(`${(d.x + d.width / 2 - drLeft).toFixed(1)}px ${(d.y + d.height / 2 - drTop).toFixed(1)}px`);
    }

    if (reduced) {
      setOpen(true);
      return;
    }
    // The dot hands the gesture off at once: it takes a small breath and
    // dissolves (~180ms) while the drawer begins growing from that exact
    // point. Because the drawer's origin is the dot's centre, the two are
    // co-located — the dot never lingers beside the drawer, it becomes it.
    setExpanding(true);
    setOpen(true);
    window.setTimeout(() => setExpanding(false), 340);
  };

  const closeDrawer = () => {
    setOpen(false);
    window.setTimeout(() => dotRef.current?.focus(), 40);
  };

  if (!started) return null;

  const meta = getSetMeta(track?.title);
  const amp = inHero ? 0.018 : 0.03; // breath amplitude — tinier over the hero
  const restOpacity = playing ? (inHero ? 0.5 : 0.82) : 0.4; // steps back in the hero, dims when paused

  return (
    <>
      {/* the mark */}
      <div
        className="fixed bottom-[5.8rem] right-[2.9rem] z-[45] sm:bottom-[6.3rem] sm:right-[3.4rem]"
        style={{
          opacity: open ? 0 : 1,
          pointerEvents: open ? 'none' : undefined,
          transition: `opacity ${reduced ? 140 : 180}ms linear`,
          transitionDelay: open ? '0ms' : '360ms', // on close, let the drawer collapse first
        }}
      >
        {/* slow entrance */}
        <div
          style={{
            opacity: appear ? 1 : 0,
            transform: appear || reduced ? 'scale(1)' : 'scale(0.4)',
            transition: reduced
              ? 'opacity 200ms linear'
              : 'opacity 3000ms linear, transform 3000ms cubic-bezier(.22,1,.36,1)',
          }}
        >
          {/* resting weight: dims in the hero, dims when paused */}
          <div
            className="relative flex items-center"
            style={{ opacity: restOpacity, transition: `opacity ${reduced ? 150 : 2200}ms linear` }}
          >
            <button
              ref={dotRef}
              type="button"
              onClick={openDrawer}
              aria-label="Now playing"
              className="peer block h-[11px] w-[11px] rounded-full border-0 bg-red p-0 outline-none focus-visible:ring-1 focus-visible:ring-red-bright focus-visible:ring-offset-4 focus-visible:ring-offset-bg-0"
              style={{
                transform: expanding ? 'scale(1.6)' : `scale(calc(1 + var(--companion-breath, 0) * ${amp}))`,
                transition: expanding
                  ? 'transform 300ms cubic-bezier(.34,1.4,.64,1)'
                  : 'transform 140ms linear',
                cursor: 'pointer',
              }}
            />
            {/* whispers one word — only on genuine hover / keyboard focus */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-[calc(100%+12px)] whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.22em] font-light text-ink/25 opacity-0 transition-opacity duration-[600ms] ease-fade peer-hover:opacity-100 peer-focus-visible:opacity-100"
            >
              Listening
            </span>
          </div>
        </div>
      </div>

      {/* an invisible catch — closes on an outside click, never darkens the page */}
      {open && <div className="fixed inset-0 z-[46]" onClick={closeDrawer} aria-hidden="true" />}

      {/* the drawer — grows out of the mark, from the mark's exact position */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-label="Now playing"
        aria-hidden={!open}
        className="fixed bottom-6 right-6 z-[47] w-[min(336px,86vw)] border border-line bg-bg-1 sm:bottom-8 sm:right-8"
        style={{
          transformOrigin: origin,
          transform: open || reduced ? 'none' : 'scale(0.04)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: reduced
            ? 'opacity 180ms linear'
            : 'transform 1100ms cubic-bezier(.22,.72,.3,1), opacity 440ms linear',
        }}
      >
        {/* a quiet close, no player header */}
        <div className="flex justify-end px-[22px] pt-[18px]">
          <button
            type="button"
            onClick={closeDrawer}
            className="border-0 bg-transparent p-0 font-mono text-[9px] lowercase tracking-[0.22em] text-ink/25 transition-colors duration-hover ease-fade hover:cursor-pointer hover:text-ink/55"
          >
            close
          </button>
        </div>

        <div className="px-[22px] pb-[22px] pt-2">
          {/* an atmospheric plate — a held frame, never a claimed cover */}
          <div
            aria-hidden="true"
            className="relative mb-5 aspect-[16/10] w-full overflow-hidden border border-line-strong"
            style={{
              background:
                'radial-gradient(90% 120% at 50% 8%, rgba(224,82,63,.5), rgba(120,20,18,.3) 42%, #0a0708 74%)',
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

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            <Field label="Duration" value={track ? fmt(track.duration) : '—'} />
            {meta.location && <Field label="Recorded" value={meta.location} />}
            {meta.year && <Field label="Year" value={meta.year} />}
          </div>

          {meta.note && (
            <p className="mt-5 border-t border-line pt-5 font-serif text-[13.5px] font-light italic leading-[1.65] text-ink/55">
              {meta.note}
            </p>
          )}

          <div className="mt-5 border-t border-line pt-5">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('nov:toggle'))}
              className="group/pp flex items-center gap-2.5 border-0 bg-transparent p-0 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/45 transition-colors duration-hover ease-fade hover:cursor-pointer hover:text-ink/80"
            >
              <span className="flex h-2.5 w-2.5 items-center justify-center text-red/70 transition-colors duration-hover ease-fade group-hover/pp:text-red-bright" aria-hidden="true">
                {playing ? (
                  <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                    <rect x="0" y="0" width="2.4" height="10" />
                    <rect x="5.6" y="0" width="2.4" height="10" />
                  </svg>
                ) : (
                  <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                    <path d="M0 0L8 5L0 10V0Z" />
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
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/25">{label}</span>
      <span className="font-mono text-[12px] tracking-[0.04em] text-ink/55 [font-variant-numeric:tabular-nums]">
        {value}
      </span>
    </div>
  );
}
