'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';
import Accent from '@/components/ui/Accent';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';

const cue = getCue('live');

const artists = [
  'Jimmy Van M',
  'Popof',
  'Martín García',
  'Nicolás Rada',
  'Fernando Ferreyra',
  'Carlos Alfonsin',
];

/**
 * Shared booth as one continuous editorial sentence — the artists flow past
 * as a single line, bullet-separated, on a slow GSAP loop. Never a list,
 * never a logo wall. The row is duplicated so the loop is seamless; motion
 * is very slow and pauses on hover. Reduced motion holds it still.
 */
export default function Live() {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // the track holds two identical sequences; travelling exactly -50%
    // lands the second on the first — a seamless wrap.
    // very slow, editorial drift — closer to reading a line than a marquee
    tweenRef.current = gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 88,
      repeat: -1,
    });
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const slow = (factor: number) => tweenRef.current?.timeScale(factor);

  const sequence = (
    <span className="flex shrink-0 items-center">
      {artists.map((name) => (
        <span key={name} className="flex items-center">
          <span className="font-serif text-[clamp(1.6rem,4vw,3rem)] font-light text-ink/70">{name}</span>
          <span aria-hidden="true" className="mx-[clamp(20px,3vw,48px)] text-red-bright/70">•</span>
        </span>
      ))}
    </span>
  );

  return (
    <Section id={cue.id} fxIndex={0}>
      <Timecode tc={cue.tc} label={cue.label} />
      <Heading as="h2" className="mt-6 max-w-[9ch]">
        Trusted in serious <Accent>rooms</Accent>.
      </Heading>
      <p className="mt-6 max-w-[52ch] text-[15.5px] leading-[1.85] text-ink/70">{t.live.body}</p>

      <div
        className="relative mt-12 overflow-hidden border-y border-line py-[clamp(20px,4vw,40px)]"
        onMouseEnter={() => slow(0.15)}
        onMouseLeave={() => slow(1)}
      >
        <div ref={trackRef} className="flex w-max flex-nowrap will-change-transform">
          {sequence}
          {sequence}
        </div>
        {/* soft edges so names dissolve in and out rather than clip */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg,#050505 0%,transparent 12%,transparent 88%,#050505 100%)',
          }}
        />
      </div>
    </Section>
  );
}
