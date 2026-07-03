'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Background from '@/components/ui/Background';
import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import HeroStage, { Staged } from '@/components/hero/HeroStage';
import HeroWordInteractions from '@/components/hero/HeroWordInteractions';
import { getCue, RUNTIME_TC } from '@/lib/cues';

const cue = getCue('arrival');

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/**
 * The hero is a pinned scrollytelling stage. A single raw progress value
 * (--hero-scroll, 0→1 across this section's own scroll range) is remapped
 * into the same phases the shader uses (see NovCanvas.tsx). Because the
 * <section> is `sticky`, the viewport is visually locked for the entire
 * sequence — the first scroll only drives color / red / opacity / photo /
 * shader, never an upward translate; the page begins moving only once the
 * sequence completes and the sticky releases. Keep the phase thresholds
 * identical to the shader's.
 *
 * NOV lives in its own absolutely-centered layer (.nov-hero-stage) so it is
 * museum-hang stable — it can never drift when the surrounding chrome
 * (timecodes, subline, thesis, footer labels) appears or changes.
 */
export default function Arrival() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const range = wrapper.offsetHeight - window.innerHeight;
        const p = range > 0 ? Math.min(1, Math.max(0, -wrapper.getBoundingClientRect().top / range)) : 0;
        wrapper.style.setProperty('--hero-scroll', p.toFixed(4));
        wrapper.style.setProperty('--hero-photo', smoothstep(0.46, 0.9, p).toFixed(4));
        wrapper.style.setProperty('--hero-disperse', smoothstep(0.86, 1.0, p).toFixed(4));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapperRef} id={cue.id} className="relative h-[260vh]">
      <section className="sticky top-0 h-[100svh] overflow-hidden border-b border-line">
        <Background />

        {/* recording timeline: paints with --hero-scroll from the first
            movement. The continuous red hairline is the nav's own bar
            (always mounted, top of viewport); this one lives at the very
            top of the hero as its in-frame REC line during the silence. */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 z-30 h-px">
          <div className="h-full bg-red-bright/70" style={{ width: 'calc(var(--hero-scroll, 0) * 100%)' }} />
        </div>

        {/* the photograph, emerging progressively behind the word */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ opacity: 'min(0.92, calc(var(--hero-photo, 0) * 1.05))' }}
        >
          <Image
            src="/images/nov-dj-organic-house-buenos-aires-hero.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            className="monochrome-image object-cover object-[75%_18%] sm:object-[70%_15%] lg:object-[center_12%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.3),rgba(5,5,5,0.85))]" />
        </div>

        <HeroStage>
          {({ canvasReady, staged }) => (
            <>
              {/* chrome layer — full height, does not touch NOV's position.
                  Top row clears the fixed nav; NOV stays dead-centre. */}
              <Container className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-8 pt-[clamp(84px,11vh,112px)]">
                <Staged show={staged} rise className="flex items-baseline justify-between">
                  <Timecode tc={cue.tc} label={cue.label} />
                  <Timecode tc={`/ ${RUNTIME_TC}`} />
                </Staged>

                <Staged show={staged} rise delay={450} className="flex items-end justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55">Buenos Aires</span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55">Scroll</span>
                </Staged>
              </Container>

              {/* NOV layer — absolutely centered, museum-hang stable */}
              <div className="nov-hero-stage absolute inset-0 grid place-items-center">
                <div className="relative flex items-center justify-center">
                  {/* DJ • Producer floats above NOV without affecting it */}
                  <div className="absolute inset-x-0 bottom-full mb-[clamp(28px,5vw,72px)] flex justify-center">
                    <Staged show={staged} rise delay={150}>
                      <p
                        className="font-mono text-[12px] tracking-[0.44em] text-ink/70 transition-opacity duration-[1400ms] ease-fade"
                        style={{ opacity: 'max(0.35, calc(1 - var(--hero-disperse, 0) * 0.7))' }}
                      >
                        DJ<span className="mx-3 text-ink/45">•</span>Producer
                      </p>
                    </Staged>
                  </div>

                  {/* The word lives in the canvas; this stays for SEO, screen
                      readers, and as the no-WebGL / reduced-motion fallback.
                      It only fades once the disperse phase begins. A red
                      duplicate crossfades over it as the photo reveals,
                      mirroring the shader's "word turns red and floats" path. */}
                  <HeroWordInteractions>
                    <div className="relative">
                      <h1
                        className={`m-0 ml-[0.06em] font-serif text-[clamp(4.5rem,15vw,13rem)] font-light leading-none tracking-[0.06em] text-ink transition-opacity duration-[1200ms] ease-fade ${
                          canvasReady ? 'opacity-0' : 'opacity-100'
                        }`}
                        style={canvasReady ? undefined : { opacity: 'calc(1 - var(--hero-disperse, 0))' }}
                      >
                        NOV
                      </h1>
                      {!canvasReady && (
                        <h1
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 m-0 ml-[0.06em] font-serif text-[clamp(4.5rem,15vw,13rem)] font-light leading-none tracking-[0.06em] text-red-bright"
                          style={{ opacity: 'calc(var(--hero-photo, 0) * 0.6 * (1 - var(--hero-disperse, 0)))' }}
                        >
                          NOV
                        </h1>
                      )}
                    </div>
                  </HeroWordInteractions>

                  {/* Curated Journeys floats below NOV without affecting it */}
                  <div className="absolute inset-x-0 top-full mt-[clamp(28px,5vw,72px)] flex justify-center">
                    <Staged show={staged} rise delay={300}>
                      <p
                        className="whitespace-nowrap font-serif text-[clamp(1rem,2vw,1.35rem)] font-light italic text-ink/70 transition-opacity duration-[1400ms] ease-fade"
                        style={{ opacity: 'max(0.35, calc(1 - var(--hero-disperse, 0) * 0.7))' }}
                      >
                        Curated Journeys
                      </p>
                    </Staged>
                  </div>
                </div>
              </div>
            </>
          )}
        </HeroStage>
      </section>
    </div>
  );
}
