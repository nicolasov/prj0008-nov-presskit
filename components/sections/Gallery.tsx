'use client';

import { useRef } from 'react';
import { getCue } from '@/lib/cues';
import { CineFrame, useCinematic, SkipToRadio } from '@/components/gallery/Cinematic';

const cue = getCue('gallery');

/**
 * GALLERY C — Fullscreen Cinematic.
 *
 * One photograph at a time, each filling the whole viewport. Same cinematic
 * language as every other exploration — reveal-from-darkness with a develop
 * duration read from scroll pace, subtle parallax, imperceptible breathing and
 * zoom, and the shared SKIP → Radio — via components/gallery/Cinematic, keeping
 * this gallery's own full-bleed reel layout. You fall through the images like
 * reels; a vignette and a low gradient give cinema depth, the only type a
 * whispered caption and a frame index.
 *
 * Experimental — preview only, not for production merge.
 */

const reels = [
  { src: '/images/nov-dj-live-buenos-aires-club.jpg', alt: 'The room, Buenos Aires', pos: 'object-[center_38%]', cap: 'Buenos Aires — 2025' },
  { src: '/images/nov-booth-shadow.jpg', alt: 'The booth, half light', pos: 'object-[center_22%]', cap: 'Half light' },
  { src: '/images/nov-booth-motion.jpg', alt: 'Light trails across the booth', pos: 'object-center', cap: 'Closing hour' },
  { src: '/images/nov-portrait-wall.jpg', alt: 'Between sets', pos: 'object-[center_20%]', cap: 'Between sets' },
  { src: '/images/nov-headphones.jpg', alt: 'A held note', pos: 'object-[45%_28%]', cap: 'A held note' },
  { src: '/images/nov-dj-red-light-booth-silhouette.jpg', alt: 'Red light silhouette', pos: 'object-center', cap: 'UFO Point — 2025' },
  { src: '/images/nov-dj-organic-house-buenos-aires-hero.jpg', alt: 'Close', pos: 'object-[center_16%]', cap: 'Close' },
  { src: '/images/nov-about-editorial-buenos-aires.jpg', alt: 'Selection', pos: 'object-[center_30%]', cap: 'Selection' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { skipShown, skip, skipHoverRef } = useCinematic(sectionRef);

  return (
    <section id={cue.id} ref={sectionRef} className="relative">
      {reels.map((r, i) => (
        <CineFrame
          key={i}
          src={r.src}
          alt={r.alt}
          pos={r.pos}
          sizes="100vw"
          range={34}
          zoom
          breathe
          priority={i === 0}
          frameClassName="h-[100svh] w-full"
        >
          {/* cinema depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: 'radial-gradient(130% 100% at 50% 42%, transparent 55%, rgba(0,0,0,0.5))' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(5,5,5,0.55))' }}
          />

          <figcaption className="absolute bottom-[clamp(24px,4vw,48px)] left-[clamp(24px,5vw,60px)] z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            {r.cap}
          </figcaption>
          <span className="absolute bottom-[clamp(24px,4vw,48px)] right-[clamp(24px,5vw,60px)] z-10 font-mono text-[10px] tracking-[0.24em] text-ink/40 [font-variant-numeric:tabular-nums]">
            {String(i + 1).padStart(2, '0')} / {String(reels.length).padStart(2, '0')}
          </span>
        </CineFrame>
      ))}

      <SkipToRadio shown={skipShown} onSkip={skip} hoverRef={skipHoverRef} />
    </section>
  );
}
