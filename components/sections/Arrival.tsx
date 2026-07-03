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
 * The hero is a pinned scrollytelling stage, not a single viewport — it
 * needs room to never rush. One raw progress value (--hero-scroll, 0→1
 * across this section's own scroll range) is remapped into the same four
 * phases the shader uses (see NovCanvas.tsx): hold, sweep, photograph,
 * disperse. Keep the thresholds identical in both places.
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
        wrapper.style.setProperty('--hero-photo', smoothstep(0.58, 0.88, p).toFixed(4));
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
      <section className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden border-b border-line">
        <Background />

        {/* the photograph, discovered through the typography first, then
            full-bleed once the word has begun to disperse */}
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
            <Container className="relative flex flex-1 flex-col justify-between py-8">
              <Staged show={staged} rise className="flex items-baseline justify-between">
                <Timecode tc={cue.tc} label={cue.label} />
                <Timecode tc={`/ ${RUNTIME_TC}`} />
              </Staged>

              <div className="flex flex-col items-center text-center">
                <Staged show={staged} rise delay={200}>
                  <p
                    className="mb-[clamp(40px,6vw,84px)] font-mono text-[12px] tracking-[0.44em] text-ink/70 transition-opacity duration-[1400ms] ease-fade"
                    style={{ opacity: 'max(0.35, calc(1 - var(--hero-disperse, 0) * 0.7))' }}
                  >
                    DJ<span className="mx-3 text-ink/45">•</span>Producer
                  </p>
                </Staged>

                {/* The word lives in the canvas; this stays for SEO, screen
                    readers, and as the no-WebGL / reduced-motion fallback.
                    It only fades once the disperse phase begins — it must
                    never dissolve before the photograph has been revealed.
                    A red duplicate crossfades over it as the photograph
                    reveals, mirroring the shader's "word turns red and
                    floats above the frame" behavior for this fallback path. */}
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

                <Staged show={staged} rise delay={400}>
                  <p
                    className="mt-[clamp(40px,6vw,84px)] font-serif text-[clamp(1rem,2vw,1.35rem)] font-light italic text-ink/70 transition-opacity duration-[1400ms] ease-fade"
                    style={{ opacity: 'max(0.35, calc(1 - var(--hero-disperse, 0) * 0.7))' }}
                  >
                    Curated Journeys
                  </p>
                </Staged>
              </div>

              <Staged show={staged} rise delay={600} className="flex items-end justify-between">
                <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55">Buenos Aires</span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55">Scroll</span>
              </Staged>
            </Container>
          )}
        </HeroStage>
      </section>
    </div>
  );
}
