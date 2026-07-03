'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Background from '@/components/ui/Background';
import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import { Staged } from '@/components/hero/HeroStage';
import HeroWordInteractions from '@/components/hero/HeroWordInteractions';
import HeroLight from '@/components/hero/HeroLight';
import { useIntroReveal } from '@/lib/introReveal';
import { getCue, RUNTIME_TC } from '@/lib/cues';

const cue = getCue('arrival');

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

/**
 * ONE NOV. A single DOM <h1> exists from the first frame to the end of the
 * hero — never replaced, never crossfaded into a second element, never
 * resized or re-weighted. It is absolutely centred (.nov-hero-stage) so it
 * cannot drift. The page transforms around it; the logo itself only shifts
 * colour (bone → the NOV signal) and lets the photograph develop behind it.
 *
 * The hero is a pinned (`sticky`) stage: the viewport is visually locked for
 * the whole sequence — the first scroll drives only colour / opacity / photo
 * reveal, never an upward translate. The page begins moving only once the
 * sequence completes and the sticky releases. `--hero-scroll` (0→1 across
 * this section's own scroll range) drives everything.
 */
export default function Arrival() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const staged = useIntroReveal();

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
        // photograph develops early and slowly, like film in a tray
        wrapper.style.setProperty('--hero-photo', smoothstep(0.12, 0.82, p).toFixed(4));
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

        {/* the photograph, developing behind the word */}
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
            className="nov-breath monochrome-image object-cover object-[75%_18%] sm:object-[70%_15%] lg:object-[center_12%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.28),rgba(5,5,5,0.82))]" />
        </div>

        {/* the quiet second act — a soft light that trails the cursor */}
        <HeroLight active={staged} />

        {/* chrome layer — full height, never touches NOV's position.
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

        {/* NOV layer — absolutely centred, museum-hang stable */}
        <div className="nov-hero-stage absolute inset-0 grid place-items-center">
          <div className="relative flex items-center justify-center">
            {/* DJ • Producer floats above NOV; stays subtly visible */}
            <div className="absolute inset-x-0 bottom-full mb-[clamp(28px,5vw,72px)] flex justify-center">
              <Staged show={staged} rise delay={150}>
                <p
                  className="font-mono text-[12px] tracking-[0.44em] text-ink/70"
                  style={{ opacity: 'max(0.4, calc(1 - var(--hero-photo, 0) * 0.45))' }}
                >
                  DJ<span className="mx-3 text-ink/45">•</span>Producer
                </p>
              </Staged>
            </div>

            {/* THE single NOV — one DOM element, never replaced. Only its
                colour shifts (bone → signal) as the photograph develops.
                It never disappears; it becomes part of the image. */}
            <HeroWordInteractions>
              <h1
                className="nov-logo m-0 ml-[0.06em] font-serif text-[clamp(4.5rem,15vw,13rem)] font-light leading-none tracking-[0.06em]"
                style={{
                  color: 'color-mix(in srgb, #EAEAE6, #E0523F calc(var(--hero-photo, 0) * 100%))',
                }}
              >
                NOV
              </h1>
            </HeroWordInteractions>

            {/* Curated Journeys floats below NOV; stays subtly visible */}
            <div className="absolute inset-x-0 top-full mt-[clamp(28px,5vw,72px)] flex justify-center">
              <Staged show={staged} rise delay={300}>
                <p
                  className="whitespace-nowrap font-serif text-[clamp(1rem,2vw,1.35rem)] font-light italic text-ink/70"
                  style={{ opacity: 'max(0.4, calc(1 - var(--hero-photo, 0) * 0.45))' }}
                >
                  Curated Journeys
                </p>
              </Staged>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
