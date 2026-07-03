'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import { Staged } from '@/components/hero/HeroStage';
import HeroWordInteractions from '@/components/hero/HeroWordInteractions';
import HeroLight from '@/components/hero/HeroLight';
import { useIntroReveal } from '@/lib/introReveal';
import { getCue, RUNTIME_TC } from '@/lib/cues';

const cue = getCue('arrival');

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * The hero never ends. There is no transition and no cut — only one
 * continuous composition, like a single unbroken shot.
 *
 * The photograph is a persistent, viewport-fixed backdrop that the whole
 * document scrolls over. A single scroll driver (writing CSS variables on
 * :root — one source of truth, so nothing can desync) crossfades the three
 * layers against each other over the same still image:
 *
 *   NOV (fixed, centred, one element, never moved) develops into the signal
 *   colour, then fades out slowly as you move past the first screen.
 *   The photograph develops, lingers well past the first screen, and only
 *   then recedes to the page's black — with a hair of parallax for depth.
 *   Philosophy emerges from within the same frame, over the still-present
 *   photograph, so its first words feel like they were always there.
 *
 * Because every layer shares one backdrop and crossfades rather than cuts,
 * there is no moment where the hero "ends" — the visitor is reading
 * Philosophy before they can name when it began.
 */
export default function Arrival() {
  const introReady = useIntroReveal();
  const [ripple, setRipple] = useState(false);

  // The water ripple — a tiny liquid vibration on the letterforms (SVG
  // displacement). Desktop pointers only (like the cursor light it coexists
  // with) and never under reduced motion, so mobile stays perfectly smooth.
  // It never touches the typography's position.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setRipple(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;

    const write = () => {
      raf = 0;
      const vp = window.scrollY / Math.max(1, window.innerHeight);

      const develop = smooth(0.05, 0.7, vp); // photo resolves, NOV colours
      const recede = 1 - smooth(1.4, 2.3, vp); // photo lingers (the glue), then goes
      const photo = develop * recede;
      // NOV steps back sooner so Philosophy can own the viewport without
      // competing — but the photograph stays as the connective tissue.
      const novOp = 1 - smooth(0.85, 1.4, vp);
      const mix = develop; // bone → signal
      const depth = smooth(0, 2, vp);

      root.style.setProperty('--h-photo', (photo * 0.92).toFixed(4));
      root.style.setProperty('--h-nov', novOp.toFixed(4));
      root.style.setProperty('--h-mix', `${(mix * 100).toFixed(2)}%`);
      root.style.setProperty('--h-photo-scale', reduced ? '1' : (1 + depth * 0.06).toFixed(4));
      root.style.setProperty('--h-photo-y', reduced ? '0px' : `${(depth * 24).toFixed(1)}px`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(write);
    };
    write();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* MIDGROUND — the photograph, fixed to the viewport. It develops,
          lingers past the first screen, then recedes to black. The whole
          document scrolls over it, so it is still part of the composition
          as Philosophy begins. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ opacity: 'var(--h-photo, 0)' }}
      >
        <div
          className="absolute inset-0"
          style={{ transform: 'scale(var(--h-photo-scale, 1)) translateY(var(--h-photo-y, 0px))' }}
        >
          <Image
            src="/images/nov-dj-organic-house-buenos-aires-hero.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            className="nov-breath monochrome-image object-cover object-[75%_18%] sm:object-[70%_15%] lg:object-[center_12%]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.28),rgba(5,5,5,0.82))]" />
      </div>

      {/* FOREGROUND — NOV and the frame, fixed and centred. One element,
          never moved; it only colours, then fades as you pass the first
          screen. */}
      <div className="nov-hero-word fixed inset-0 z-10" style={{ opacity: 'var(--h-nov, 1)' }}>
        <HeroLight active={introReady} />

        <Container className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-8 pt-[clamp(84px,11vh,112px)]">
          <Staged show={introReady} rise className="flex items-baseline justify-between">
            <Timecode tc={cue.tc} label={cue.label} />
            <Timecode tc={`/ ${RUNTIME_TC}`} />
          </Staged>
          <Staged show={introReady} rise delay={450} className="flex items-end justify-between">
            <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55">Buenos Aires</span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55">Scroll</span>
          </Staged>
        </Container>

        <div className="nov-hero-stage absolute inset-0 grid place-items-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-x-0 bottom-full mb-[clamp(28px,5vw,72px)] flex justify-center">
              <Staged show={introReady} rise delay={150}>
                <p className="font-mono text-[12px] tracking-[0.44em] text-ink/70">
                  DJ<span className="mx-3 text-ink/45">•</span>Producer
                </p>
              </Staged>
            </div>

            <HeroWordInteractions>
              <h1
                className="nov-logo pointer-events-auto m-0 ml-[0.06em] font-serif text-[clamp(4.5rem,15vw,13rem)] font-light leading-none tracking-[0.06em]"
                style={{
                  color: 'color-mix(in srgb, #EAEAE6, #E0523F var(--h-mix, 0%))',
                  filter: ripple ? 'url(#nov-ripple)' : undefined,
                }}
              >
                NOV
              </h1>
            </HeroWordInteractions>

            <div className="absolute inset-x-0 top-full mt-[clamp(28px,5vw,72px)] flex justify-center">
              <Staged show={introReady} rise delay={300}>
                <p className="whitespace-nowrap font-serif text-[clamp(1rem,2vw,1.35rem)] font-light italic text-ink/70">
                  Curated Journeys
                </p>
              </Staged>
            </div>
          </div>
        </div>
      </div>

      {/* the hero's first screen of scroll — the fixed layers show through
          this empty space; after it, the document rises over them. */}
      <div id={cue.id} aria-hidden="true" className="h-[100svh]" />

      {/* the water ripple filter — a static fine turbulence displacing the
          letterforms, its amount breathing slowly like the surface of still
          water. Applied to the NOV h1 above. Rendered only when enabled. */}
      {ripple && (
        <svg aria-hidden="true" width="0" height="0" className="absolute">
          <filter id="nov-ripple" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.022" numOctaves={2} seed={7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" xChannelSelector="R" yChannelSelector="G" scale="3">
              <animate
                attributeName="scale"
                values="2.2;4.2;2.2"
                dur="9s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
              />
            </feDisplacementMap>
          </filter>
        </svg>
      )}
    </>
  );
}
