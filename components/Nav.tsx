'use client';

import { useEffect, useRef, useState } from 'react';
import { CUES, RUNTIME_SECONDS, RUNTIME_TC } from '@/lib/cues';
import { useTrackProgress } from '@/lib/useTrackProgress';
import { useLenis } from '@/components/SmoothScroll';
import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import InstagramLink from '@/components/ui/InstagramLink';
import LangToggle from '@/components/ui/LangToggle';
import Drawer from '@/components/ui/Drawer';
import { useIntroReveal } from '@/lib/introReveal';
import { EXPERIMENTS, IS_PREVIEW, CURRENT_REF } from '@/lib/experiments';

/** The journey's fictional runtime, driven by scroll progress. */
function liveTimecode(progress: number): string {
  const s = Math.round(progress * RUNTIME_SECONDS);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

/** Real time in Buenos Aires — the quiet counterpart to the fictional runtime. */
function realTimecode(): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

/**
 * One navigation language on every screen: wordmark + live timecode + a
 * single minimal hamburger. The tracklist and everything else live inside a
 * Drawer — no desktop menu bar, nothing that reads as "website chrome". The
 * red recording timeline is always mounted so it paints from the first
 * movement through the whole set.
 */
export default function Nav() {
  const { progress, activeId } = useTrackProgress();
  const lenis = useLenis();
  const revealed = useIntroReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number>(undefined);
  const [showRealTime, setShowRealTime] = useState(false);

  // Rare analog flicker on the progress hairline — a signal catching static.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let id: number;
    const schedule = () => {
      const delay = 60000 + Math.random() * 80000;
      id = window.setTimeout(() => {
        const el = barRef.current;
        if (el) {
          el.style.transition = 'opacity 180ms linear';
          el.style.opacity = '0.35';
          window.setTimeout(() => {
            el.style.opacity = '1';
          }, 220);
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => window.clearTimeout(id);
  }, []);

  const seek = (id: string) => {
    setMenuOpen(false);
    lenis?.scrollTo(`#${id}`, { offset: id === 'arrival' ? 0 : -88 });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={barRef}
        aria-hidden="true"
        className={`relative z-10 h-px bg-red transition-[width] duration-300 ease-fade ${progress >= 0.995 ? 'bar-complete' : ''}`}
        style={{ width: `${progress * 100}%` }}
      />

      <div
        className={`border-b border-line bg-bg-0 transition-[opacity,transform] duration-[1100ms] ease-fade ${
          revealed ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <Container className="flex h-16 items-center justify-between nav:h-[72px]">
          <div className="flex items-baseline gap-5">
            <button
              type="button"
              onClick={() => seek('arrival')}
              aria-label="NOV — return to 00:00"
              className="nov-logo border-none bg-transparent p-0 font-serif text-[22px] font-light leading-none tracking-[0.14em] text-ink hover:cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4"
            >
              NOV
            </button>
            <span
              aria-hidden="true"
              onMouseEnter={() => {
                hoverTimer.current = window.setTimeout(() => setShowRealTime(true), 1500);
              }}
              onMouseLeave={() => {
                window.clearTimeout(hoverTimer.current);
                setShowRealTime(false);
              }}
              className="hidden cursor-default font-mono text-[10px] tracking-[0.18em] text-ink/55 [font-variant-numeric:tabular-nums] sm:inline"
            >
              <span className="text-red-bright">●</span>{' '}
              {showRealTime ? `${realTimecode()} BA` : `${liveTimecode(progress)} / ${RUNTIME_TC}`}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex flex-col items-end gap-[5px] border-none bg-transparent p-2 hover:cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4"
          >
            <span className="block h-px w-6 bg-ink" />
            <span className="block h-px w-4 bg-ink" />
          </button>
        </Container>
      </div>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} title="Tracklist">
        {/* TEMPORARY — preview-only. Pinned to the TOP of the drawer so the
            gallery explorations are the first thing visible when comparing;
            never rendered in production (see lib/experiments.ts). Remove
            before launch. */}
        {IS_PREVIEW && (
          <div className="mb-8 border-b border-line pb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-red-bright/80">
              Gallery variations · preview
            </span>
            <div className="mt-3 flex flex-col gap-2">
              {EXPERIMENTS.map((e) => {
                const active = e.ref === CURRENT_REF;
                return (
                  <a
                    key={e.ref}
                    href={e.url}
                    className={`font-mono text-[12px] tracking-[0.08em] no-underline transition-colors duration-hover ease-fade ${
                      active ? 'text-red-bright' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    <span className={active ? 'text-red-bright' : 'text-ink/40'}>{active ? '●' : '○'}</span> {e.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <nav aria-label="Tracklist" className="flex flex-col">
          {CUES.map((cue) => {
            const isActive = cue.id === activeId;
            return (
              <button
                key={cue.id}
                type="button"
                onClick={() => seek(cue.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex items-baseline justify-between gap-4 border-b border-line bg-transparent py-4 text-left hover:cursor-pointer ${
                  isActive ? 'text-red-bright' : 'text-ink/70'
                } transition-colors duration-hover ease-fade hover:text-ink`}
              >
                <span className="font-serif text-[24px] font-light">{cue.label}</span>
                <Timecode tc={cue.tc} active={isActive} />
              </button>
            );
          })}
        </nav>

        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          <div className="flex items-center gap-6">
            <InstagramLink />
            <LangToggle />
          </div>
          <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55">Buenos Aires</span>
        </div>
      </Drawer>
    </header>
  );
}
