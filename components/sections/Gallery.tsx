import Image from 'next/image';
import { getCue } from '@/lib/cues';

const cue = getCue('gallery');

/**
 * GALLERY C — Fullscreen Cinematic.
 *
 * One photograph at a time, each filling the whole viewport, each developing
 * from black as it enters (inherited from the global reveal engine via
 * `figure[data-fx] .monochrome-image`). A vignette and a low gradient give
 * cinema depth; the only type is a whispered caption and a frame index. Pure
 * projection — you fall through the images like reels.
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
  return (
    <section id={cue.id} className="relative">
      {reels.map((r, i) => (
        <figure
          key={i}
          data-fx
          className="relative m-0 h-[100svh] w-full overflow-hidden bg-bg-1"
        >
          <Image
            src={r.src}
            alt={r.alt}
            fill
            sizes="100vw"
            className={`monochrome-image object-cover ${r.pos}`}
          />

          {/* cinema depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(130% 100% at 50% 42%, transparent 55%, rgba(0,0,0,0.5))' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(5,5,5,0.55))' }}
          />

          <figcaption className="absolute bottom-[clamp(24px,4vw,48px)] left-[clamp(24px,5vw,60px)] font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55">
            {r.cap}
          </figcaption>
          <span className="absolute bottom-[clamp(24px,4vw,48px)] right-[clamp(24px,5vw,60px)] font-mono text-[10px] tracking-[0.24em] text-ink/40 [font-variant-numeric:tabular-nums]">
            {String(i + 1).padStart(2, '0')} / {String(reels.length).padStart(2, '0')}
          </span>
        </figure>
      ))}
    </section>
  );
}
