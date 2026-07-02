'use client';

import Background from '@/components/ui/Background';
import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import HeroStage, { Staged } from '@/components/hero/HeroStage';

export default function Arrival() {
  return (
    <section
      id="arrival"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-line"
    >
      <Background />

      <HeroStage>
        {({ canvasReady, staged }) => (
          <Container className="relative flex flex-1 flex-col justify-between py-8">
            <Staged show={staged} className="flex items-baseline justify-between">
              <Timecode tc="00:00" label="Arrival" />
              <Timecode tc="/ 55:00" />
            </Staged>

            <div className="flex flex-col items-center text-center">
              <Staged show={staged} delay={200}>
                <p className="mb-6 font-mono text-[12px] tracking-[0.44em] text-ink/70">
                  DJ<span className="mx-3 text-ink/25">•</span>Producer
                </p>
              </Staged>

              {/* The word lives in the canvas; this stays for SEO, screen
                  readers, and as the no-WebGL / reduced-motion fallback. */}
              <h1
                className={`m-0 ml-[0.06em] font-serif text-[clamp(4.5rem,15vw,13rem)] font-light leading-none tracking-[0.06em] text-ink transition-opacity duration-[1200ms] ease-fade ${
                  canvasReady ? 'opacity-0' : 'opacity-100'
                }`}
              >
                NOV
              </h1>

              <Staged show={staged} delay={400}>
                <p className="mt-10 font-serif text-[clamp(1rem,2vw,1.35rem)] font-light italic text-ink/70">
                  Curated Journeys
                </p>
              </Staged>
            </div>

            <Staged show={staged} delay={600} className="flex items-end justify-between">
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45">Buenos Aires</span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45">Scroll</span>
            </Staged>
          </Container>
        )}
      </HeroStage>
    </section>
  );
}
