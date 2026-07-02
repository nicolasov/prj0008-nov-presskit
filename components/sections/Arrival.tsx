'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Background from '@/components/ui/Background';
import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import HeroStage, { Staged } from '@/components/hero/HeroStage';

export default function Arrival() {
  const sectionRef = useRef<HTMLElement>(null);

  // --hero-scroll (0→1 over the first viewport) drives the discovery:
  // the word disperses (shader + canvas fade) while the photograph
  // develops underneath. One CSS variable, everything reads from it.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
        el.style.setProperty('--hero-scroll', p.toFixed(4));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="arrival"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-line"
    >
      <Background />

      {/* the photograph underneath: discovered as the word disperses */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ opacity: 'min(0.75, calc(var(--hero-scroll, 0) * 1.2))' }}
      >
        <Image
          src="/images/nov-booth-shadow.jpg"
          alt=""
          fill
          sizes="100vw"
          className="monochrome-image object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.25),rgba(5,5,5,0.82))]" />
      </div>

      <HeroStage>
        {({ canvasReady, staged }) => (
          <Container className="relative flex flex-1 flex-col justify-between py-8">
            <Staged show={staged} className="flex items-baseline justify-between">
              <Timecode tc="00:00" label="Arrival" />
              <Timecode tc="/ 55:00" />
            </Staged>

            <div className="flex flex-col items-center text-center">
              <Staged show={staged} delay={200}>
                <p className="mb-[clamp(40px,6vw,84px)] font-mono text-[12px] tracking-[0.44em] text-ink/70">
                  DJ<span className="mx-3 text-ink/45">•</span>Producer
                </p>
              </Staged>

              {/* The word lives in the canvas; this stays for SEO, screen
                  readers, and as the no-WebGL / reduced-motion fallback. */}
              <h1
                className={`m-0 ml-[0.06em] font-serif text-[clamp(4.5rem,15vw,13rem)] font-light leading-none tracking-[0.06em] text-ink transition-opacity duration-[1200ms] ease-fade ${
                  canvasReady ? 'opacity-0' : 'opacity-100'
                }`}
                style={canvasReady ? undefined : { opacity: 'calc(1 - var(--hero-scroll, 0) * 1.2)' }}
              >
                NOV
              </h1>

              <Staged show={staged} delay={400}>
                <p className="mt-[clamp(40px,6vw,84px)] font-serif text-[clamp(1rem,2vw,1.35rem)] font-light italic text-ink/70">
                  Curated Journeys
                </p>
              </Staged>
            </div>

            <Staged show={staged} delay={600} className="flex items-end justify-between">
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55">Buenos Aires</span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55">Scroll</span>
            </Staged>
          </Container>
        )}
      </HeroStage>
    </section>
  );
}
