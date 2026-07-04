import Image from 'next/image';
import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import { getCue } from '@/lib/cues';

const cue = getCue('gallery');

/**
 * GALLERY E — Infinite Wall.
 *
 * The exhibition as a salon hang: a dense monochrome mosaic packed tight,
 * frames of every proportion butted together, the eye left to wander. Same
 * identity (near-black, monochrome grade); each tile develops from black via
 * the global reveal engine. Masonry is CSS columns — no layout JS.
 *
 * Experimental — preview only, not for production merge.
 */

const src = {
  room: '/images/nov-dj-live-buenos-aires-club.jpg',
  shadow: '/images/nov-booth-shadow.jpg',
  motion: '/images/nov-booth-motion.jpg',
  phones: '/images/nov-headphones.jpg',
  wall: '/images/nov-portrait-wall.jpg',
  red: '/images/nov-dj-red-light-booth-silhouette.jpg',
  hero: '/images/nov-dj-organic-house-buenos-aires-hero.jpg',
  decks: '/images/nov-about-editorial-buenos-aires.jpg',
};

type Tile = { src: string; alt: string; ratio: string; pos?: string };

// a wall of many proportions, butted tight — the same roll, many reads
const wall: Tile[] = [
  { src: src.shadow, alt: 'The booth, half light', ratio: 'aspect-[3/4]', pos: 'object-[center_22%]' },
  { src: src.room, alt: 'The room', ratio: 'aspect-[3/2]', pos: 'object-[center_40%]' },
  { src: src.phones, alt: 'A held note', ratio: 'aspect-square', pos: 'object-[45%_28%]' },
  { src: src.red, alt: 'Red light silhouette', ratio: 'aspect-[4/3]' },
  { src: src.wall, alt: 'Between sets', ratio: 'aspect-[4/5]', pos: 'object-[center_18%]' },
  { src: src.motion, alt: 'Light trails', ratio: 'aspect-[3/2]' },
  { src: src.hero, alt: 'Close', ratio: 'aspect-[3/4]', pos: 'object-[center_16%]' },
  { src: src.decks, alt: 'At the decks', ratio: 'aspect-[4/3]', pos: 'object-[center_30%]' },
  { src: src.shadow, alt: 'The booth, receding', ratio: 'aspect-square', pos: 'object-[70%_60%]' },
  { src: src.phones, alt: 'Detail', ratio: 'aspect-[4/5]', pos: 'object-[60%_20%]' },
  { src: src.room, alt: 'The room, wide', ratio: 'aspect-[16/9]', pos: 'object-[center_70%]' },
  { src: src.hero, alt: 'Close, detail', ratio: 'aspect-square', pos: 'object-[40%_40%]' },
  { src: src.red, alt: 'Silhouette, detail', ratio: 'aspect-[3/4]', pos: 'object-[30%_center]' },
  { src: src.motion, alt: 'The last hour', ratio: 'aspect-[4/3]', pos: 'object-[72%_center]' },
  { src: src.wall, alt: 'Portrait, detail', ratio: 'aspect-square', pos: 'object-[center_35%]' },
  { src: src.decks, alt: 'Selection', ratio: 'aspect-[3/4]', pos: 'object-[center_30%]' },
  { src: src.shadow, alt: 'Half light, detail', ratio: 'aspect-[4/3]', pos: 'object-[40%_30%]' },
  { src: src.room, alt: 'The room, close', ratio: 'aspect-[4/5]', pos: 'object-[30%_50%]' },
  { src: src.phones, alt: 'Cueing', ratio: 'aspect-[3/2]', pos: 'object-[center_25%]' },
  { src: src.hero, alt: 'Portrait', ratio: 'aspect-[4/5]', pos: 'object-[center_30%]' },
  { src: src.motion, alt: 'Trails, close', ratio: 'aspect-square', pos: 'object-[85%_center]' },
  { src: src.red, alt: 'Red, wide', ratio: 'aspect-[16/9]' },
  { src: src.decks, alt: 'The decks, detail', ratio: 'aspect-[3/4]', pos: 'object-[40%_20%]' },
  { src: src.wall, alt: 'Concrete', ratio: 'aspect-[3/2]', pos: 'object-[center_45%]' },
];

export default function Gallery() {
  return (
    <section id={cue.id} className="py-[var(--space-section)]">
      <Container>
        <div className="flex items-baseline justify-between">
          <Timecode tc={cue.tc} label={cue.label} />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/40">
            The wall · {wall.length} frames
          </span>
        </div>

        <div className="mt-[clamp(28px,4vw,56px)] columns-2 gap-2 sm:columns-3 lg:columns-4 xl:columns-5">
          {wall.map((t, i) => (
            <figure
              key={i}
              data-fx
              data-fx-index={i % 5}
              className={`relative mb-2 break-inside-avoid overflow-hidden bg-bg-1 ${t.ratio}`}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className={`monochrome-image object-cover ${t.pos ?? ''}`}
              />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
