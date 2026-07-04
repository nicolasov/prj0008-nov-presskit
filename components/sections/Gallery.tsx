import Image from 'next/image';
import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import { getCue } from '@/lib/cues';

const cue = getCue('gallery');

/**
 * GALLERY B — Editorial Contact Sheets.
 *
 * The exhibition as a photographer's contact sheet: a hairline grid of small
 * monochrome frames from the same roll, each indexed, a couple ringed in
 * grease-pencil red as the selects. Same identity as the site (near-black,
 * monochrome grade, mono metadata); the develop-from-black is inherited from
 * the global reveal engine via `figure[data-fx] .monochrome-image`.
 *
 * Experimental — preview only, not for production merge.
 */

const roll = [
  { src: '/images/nov-dj-live-buenos-aires-club.jpg', alt: 'The room, Buenos Aires', pos: 'object-[center_40%]' },
  { src: '/images/nov-booth-shadow.jpg', alt: 'The booth, half light', pos: 'object-[center_25%]' },
  { src: '/images/nov-booth-motion.jpg', alt: 'Light trails across the booth', pos: 'object-center' },
  { src: '/images/nov-headphones.jpg', alt: 'A held note', pos: 'object-[40%_30%]' },
  { src: '/images/nov-portrait-wall.jpg', alt: 'Between sets', pos: 'object-[center_20%]' },
  { src: '/images/nov-dj-red-light-booth-silhouette.jpg', alt: 'Red light silhouette', pos: 'object-center' },
  { src: '/images/nov-dj-organic-house-buenos-aires-hero.jpg', alt: 'Close', pos: 'object-[center_18%]' },
  { src: '/images/nov-about-editorial-buenos-aires.jpg', alt: 'At the decks', pos: 'object-center' },
  { src: '/images/nov-booth-motion.jpg', alt: 'The last hour', pos: 'object-[72%_center]' },
  { src: '/images/nov-booth-shadow.jpg', alt: 'The booth, receding', pos: 'object-[70%_60%]' },
  { src: '/images/nov-headphones.jpg', alt: 'Detail', pos: 'object-[60%_20%]' },
  { src: '/images/nov-dj-red-light-booth-silhouette.jpg', alt: 'Silhouette, detail', pos: 'object-[30%_center]' },
  { src: '/images/nov-portrait-wall.jpg', alt: 'Portrait, detail', pos: 'object-[center_35%]' },
  { src: '/images/nov-dj-live-buenos-aires-club.jpg', alt: 'The room, wide', pos: 'object-[center_70%]' },
  { src: '/images/nov-dj-organic-house-buenos-aires-hero.jpg', alt: 'Close, detail', pos: 'object-[40%_40%]' },
  { src: '/images/nov-about-editorial-buenos-aires.jpg', alt: 'Selection', pos: 'object-[center_30%]' },
];

const selects = new Set([5, 6]); // grease-pencil keepers

export default function Gallery() {
  return (
    <section id={cue.id} className="py-[var(--space-section)]">
      <Container>
        <div className="flex items-baseline justify-between">
          <Timecode tc={cue.tc} label={cue.label} />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/40">
            Contact sheet · {String(roll.length).padStart(2, '0')} frames
          </span>
        </div>

        <div className="mt-[clamp(28px,4vw,56px)] grid grid-cols-2 gap-px bg-line-strong sm:grid-cols-3 lg:grid-cols-4">
          {roll.map((frame, i) => (
            <figure
              key={i}
              data-fx
              data-fx-index={i % 4}
              className="group relative m-0 aspect-[3/2] overflow-hidden bg-bg-1"
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`monochrome-image object-cover ${frame.pos}`}
              />

              <span className="absolute left-2 top-2 font-mono text-[9px] tracking-[0.16em] text-ink/45 [font-variant-numeric:tabular-nums]">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* grease-pencil select ring */}
              {selects.has(i) && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2 rounded-[2px] border-2 border-red-bright/70"
                  style={{ boxShadow: 'inset 0 0 0 9999px rgba(224,82,63,0.04)' }}
                />
              )}

              <figcaption className="pointer-events-none absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/0 transition-colors duration-hover ease-fade group-hover:text-ink/55">
                {frame.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
