'use client';

import { useEffect, useRef, useState } from 'react';
import { CUES } from '@/lib/cues';
import { useTrackProgress } from '@/lib/useTrackProgress';
import { useLenis } from '@/components/SmoothScroll';
import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import Button from '@/components/ui/Button';
import InstagramLink from '@/components/ui/InstagramLink';

/** The journey's fictional runtime (55:00), driven by scroll progress. */
function liveTimecode(progress: number): string {
  const total = 55 * 60;
  const s = Math.round(progress * total);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export default function Nav() {
  const { progress, activeId } = useTrackProgress();
  const lenis = useLenis();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const seek = (e: React.MouseEvent, id: string) => {
    setMenuOpen(false);
    if (!lenis) return;
    e.preventDefault();
    lenis.scrollTo(`#${id}`, { offset: -88 });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg-0">
      <div
        aria-hidden="true"
        className="h-px bg-red transition-[width] duration-300 ease-fade"
        style={{ width: `${progress * 100}%` }}
      />

      <Container className="flex h-16 items-center justify-between nav:h-[72px]">
        <div className="flex items-baseline gap-5">
          <a
            href="#arrival"
            onClick={(e) => seek(e, 'arrival')}
            className="font-archivo text-[15px] font-medium tracking-[0.3em] text-ink no-underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4"
          >
            NOV
          </a>
          <span
            aria-hidden="true"
            className="hidden font-mono text-[10px] tracking-[0.18em] text-ink/45 [font-variant-numeric:tabular-nums] sm:inline"
          >
            <span className="text-red-bright">●</span> {liveTimecode(progress)} / 55:00
          </span>
        </div>

        <nav
          aria-label="Tracklist"
          className="hidden items-center gap-[clamp(14px,1.6vw,26px)] nav:flex"
        >
          {CUES.slice(0, -1).map((cue) => (
            <a
              key={cue.id}
              href={`#${cue.id}`}
              onClick={(e) => seek(e, cue.id)}
              aria-current={cue.id === activeId ? 'true' : undefined}
              className="no-underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4"
            >
              <Timecode tc={cue.tc} active={cue.id === activeId} interactive />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 nav:flex">
          <InstagramLink />
          <Button href="#booking" onClick={(e) => seek(e, 'booking')}>
            Booking
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-tracklist"
          className="flex flex-col gap-[5px] border-none bg-transparent p-2 nav:hidden focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4"
        >
          <span
            className="block h-px w-6 bg-ink transition-transform duration-hover ease-fade"
            style={menuOpen ? { transform: 'translateY(5px) rotate(45deg)' } : undefined}
          />
          <span
            className="block h-px w-6 bg-ink transition-opacity duration-hover ease-fade"
            style={menuOpen ? { opacity: 0 } : undefined}
          />
          <span
            className="block h-px w-6 bg-ink transition-transform duration-hover ease-fade"
            style={menuOpen ? { transform: 'translateY(-5px) rotate(-45deg)' } : undefined}
          />
        </button>
      </Container>

      <div
        id="mobile-tracklist"
        role="dialog"
        aria-modal="true"
        aria-label="Tracklist"
        className={`fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-bg-0 transition-opacity duration-[600ms] ease-fade nav:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <Container className="flex flex-col gap-1 py-8">
          {CUES.map((cue) => {
            const isActive = cue.id === activeId;
            return (
              <a
                key={cue.id}
                href={`#${cue.id}`}
                onClick={(e) => seek(e, cue.id)}
                className={`flex items-baseline justify-between gap-4 border-b border-line py-4 no-underline transition-colors duration-hover ease-fade ${
                  isActive ? 'text-red-bright' : 'text-ink/70'
                }`}
              >
                <span className="font-archivo text-[20px] font-medium">{cue.label}</span>
                <Timecode tc={cue.tc} active={isActive} />
              </a>
            );
          })}
          <div className="flex items-center justify-between pt-8">
            <InstagramLink />
            <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45">Buenos Aires</span>
          </div>
        </Container>
      </div>
    </header>
  );
}
