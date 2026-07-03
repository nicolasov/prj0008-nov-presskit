import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import Still from '@/components/ui/Still';
import Video from '@/components/ui/Video';
import { getCue } from '@/lib/cues';

const cue = getCue('gallery');

/**
 * Not a grid — an exhibition. A single editorial column that breathes:
 * full-bleed frames open wide, portraits sit inset and offset for magazine
 * rhythm, a quiet moving frame (the muted live loop) appears among the
 * stills, and generous space separates each plate. Every frame develops
 * like a print as it enters (Still/Video carry the reveal + grade). Some
 * frames reuse a photograph at a different crop — treated as a different
 * moment, not a repeat.
 */

type Plate =
  | { kind: 'full'; src: string; alt: string; caption: string; tc: string; pos?: string }
  | { kind: 'video'; src: string; caption: string; tc: string }
  | { kind: 'inset'; src: string; alt: string; caption: string; tc: string; align: 'left' | 'right'; aspect: 'portrait' | 'letterbox'; pos?: string }
  | { kind: 'duo'; a: { src: string; alt: string; caption: string; tc: string; pos?: string }; b: { src: string; alt: string; caption: string; tc: string; pos?: string } };

const plates: Plate[] = [
  { kind: 'full', src: '/images/nov-booth-motion.jpg', alt: 'NOV at the mixer, light trails across the booth', caption: 'Hands on the filter — closing hour', tc: '29:04', pos: 'object-center' },
  { kind: 'inset', src: '/images/nov-booth-shadow.jpg', alt: 'NOV in half light', caption: 'The booth, half light', tc: '29:22', align: 'left', aspect: 'portrait' },
  { kind: 'inset', src: '/images/nov-headphones.jpg', alt: 'NOV cueing the next record', caption: 'Cueing the next room', tc: '29:48', align: 'right', aspect: 'letterbox' },
  { kind: 'full', src: '/images/nov-dj-red-light-booth-silhouette.jpg', alt: 'NOV silhouetted against red light', caption: 'Red light — the long build', tc: '30:12', pos: 'object-center' },
  { kind: 'video', src: '/videos/nov-live-buenos-aires.mp4', caption: 'Live — Buenos Aires', tc: '31:00' },
  { kind: 'inset', src: '/images/nov-portrait-wall.jpg', alt: 'NOV against a concrete wall', caption: 'Between sets', tc: '31:36', align: 'left', aspect: 'portrait' },
  { kind: 'duo', a: { src: '/images/nov-dj-organic-house-buenos-aires-hero.jpg', alt: 'NOV, close', caption: 'Close', tc: '32:02', pos: 'object-[center_20%]' }, b: { src: '/images/nov-booth-shadow.jpg', alt: 'NOV, low key', caption: 'Low key', tc: '32:10', pos: 'object-[center_60%]' } },
  { kind: 'full', src: '/images/nov-dj-live-buenos-aires-club.jpg', alt: 'The room, full', caption: 'The room, full', tc: '32:44', pos: 'object-center' },
  { kind: 'inset', src: '/images/nov-about-editorial-buenos-aires.jpg', alt: 'NOV at the decks', caption: 'At the decks', tc: '33:18', align: 'right', aspect: 'letterbox' },
  { kind: 'inset', src: '/images/nov-headphones.jpg', alt: 'NOV, headphones, detail', caption: 'A held note', tc: '33:50', align: 'left', aspect: 'portrait', pos: 'object-[center_35%]' },
  { kind: 'full', src: '/images/nov-booth-motion.jpg', alt: 'The booth in motion, wide', caption: 'Last hour', tc: '34:20', pos: 'object-[center_65%]' },
  { kind: 'duo', a: { src: '/images/nov-dj-red-light-booth-silhouette.jpg', alt: 'Silhouette, detail', caption: 'Silhouette', tc: '34:52', pos: 'object-[30%_center]' }, b: { src: '/images/nov-portrait-wall.jpg', alt: 'Portrait, detail', caption: 'Still', tc: '35:01', pos: 'object-[center_25%]' } },
  { kind: 'full', src: '/images/nov-about-editorial-buenos-aires.jpg', alt: 'The decks, wide', caption: 'Selection', tc: '35:40', pos: 'object-[center_30%]' },
];

const insetWidth = { portrait: 'md:max-w-[52%]', letterbox: 'md:max-w-[68%]' };
const insetAlign = { left: 'md:mr-auto', right: 'md:ml-auto' };

export default function Gallery() {
  return (
    <section id={cue.id} data-fx className="py-[var(--space-section)]">
      <Container>
        <Timecode tc={cue.tc} label={cue.label} />
      </Container>

      <div className="mt-[clamp(40px,7vw,96px)] flex flex-col gap-[clamp(40px,8vw,120px)]">
        {plates.map((plate, i) => {
          if (plate.kind === 'full') {
            return (
              <Still
                key={i}
                src={plate.src}
                alt={plate.alt}
                caption={plate.caption}
                tc={plate.tc}
                aspect="letterbox"
                sizes="100vw"
                imgClassName={plate.pos}
                fxIndex={0}
              />
            );
          }
          if (plate.kind === 'video') {
            return (
              <Container key={i}>
                <Video src={plate.src} caption={plate.caption} tc={plate.tc} aspect="letterbox" />
              </Container>
            );
          }
          if (plate.kind === 'duo') {
            return (
              <Container key={i} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[plate.a, plate.b].map((img, j) => (
                  <Still
                    key={j}
                    src={img.src}
                    alt={img.alt}
                    caption={img.caption}
                    tc={img.tc}
                    aspect="portrait"
                    sizes="(max-width: 640px) 100vw, 46vw"
                    imgClassName={img.pos}
                    fxIndex={j}
                  />
                ))}
              </Container>
            );
          }
          return (
            <Container key={i}>
              <Still
                src={plate.src}
                alt={plate.alt}
                caption={plate.caption}
                tc={plate.tc}
                aspect={plate.aspect}
                sizes="(max-width: 768px) 100vw, 60vw"
                className={`${insetWidth[plate.aspect]} ${insetAlign[plate.align]}`}
                imgClassName={plate.pos}
                fxIndex={0}
              />
            </Container>
          );
        })}
      </div>
    </section>
  );
}
