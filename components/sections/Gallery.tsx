'use client';

import { useRef, type ReactNode } from 'react';
import Container from '@/components/ui/Container';
import { getCue } from '@/lib/cues';
import { CineFrame, useCinematic, SkipToRadio } from '@/components/gallery/Cinematic';

const cue = getCue('gallery');

/**
 * GALLERY D — Magazine Editorial Sequence.
 *
 * The exhibition as a printed feature: asymmetric spreads, pull-quotes set in
 * the narrator serif, captions and metadata in mono, generous margins. Every
 * photograph now speaks the same cinematic language as the other explorations —
 * pace-adaptive reveal-from-darkness, subtle parallax, breathing on the full
 * spreads, and the shared SKIP → Radio — via components/gallery/Cinematic, while
 * keeping the magazine layout. Text blocks still develop from black with the
 * global reveal engine. You read it like a magazine, not a grid.
 *
 * Experimental — preview only, not for production merge.
 */

const img = (src: string, alt: string, pos = 'object-center') => ({ src, alt, pos });

const Frame = ({
  src,
  alt,
  pos = 'object-center',
  ratio,
  className = '',
  range = 20,
  breathe = false,
}: {
  src: string;
  alt: string;
  pos?: string;
  ratio: string;
  className?: string;
  range?: number;
  breathe?: boolean;
}) => (
  <CineFrame
    src={src}
    alt={alt}
    pos={pos}
    range={range}
    breathe={breathe}
    sizes="(max-width: 768px) 100vw, 60vw"
    frameClassName={`${ratio} ${className}`}
  />
);

const Meta = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">{children}</span>
);

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { skipShown, skip, skipHoverRef } = useCinematic(sectionRef);

  return (
    <section id={cue.id} ref={sectionRef} className="py-[var(--space-section)]">
      {/* opening spread — full bleed with a serif title laid over the low gradient */}
      <CineFrame
        src="/images/nov-dj-live-buenos-aires-club.jpg"
        alt="The room, Buenos Aires"
        pos="object-[center_36%]"
        sizes="100vw"
        range={30}
        breathe
        frameClassName="h-[80svh] w-full"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(5,5,5,0.7))' }} />
        <figcaption className="absolute bottom-[clamp(28px,5vw,64px)] left-0 right-0 z-10">
          <Container>
            <p className="m-0 font-serif text-[clamp(2rem,6vw,4.2rem)] font-light leading-[0.98] text-ink">The room, before the room knows.</p>
            <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.28em] text-ink/50">Buenos Aires — 2025</span>
          </Container>
        </figcaption>
      </CineFrame>

      <Container className="mt-[clamp(72px,12vh,160px)] flex flex-col gap-[clamp(72px,13vh,180px)]">
        {/* spread — tall portrait + offset caption column */}
        <div className="grid items-center gap-[clamp(28px,5vw,80px)] md:grid-cols-12">
          <div className="md:col-span-7">
            <Frame {...img('/images/nov-booth-shadow.jpg', 'NOV in half light', 'object-[center_24%]')} ratio="aspect-[4/5]" />
          </div>
          <div data-fx className="md:col-span-4 md:col-start-9">
            <Meta>Plate 01</Meta>
            <p className="mt-5 font-serif text-[clamp(1.4rem,2.6vw,2rem)] font-light italic leading-[1.3] text-ink/85">
              He works with the light he is given, and gives most of it back to the dark.
            </p>
            <p className="mt-6 max-w-[34ch] text-[14.5px] leading-[1.7] text-ink/60">
              Half light, a Pioneer, a projection breathing on the far wall. Nothing staged — the camera a witness, not a stage.
            </p>
          </div>
        </div>

        {/* pull-quote spread — mostly negative space, a small detail offset */}
        <div className="grid items-center gap-[clamp(28px,5vw,80px)] md:grid-cols-12">
          <div data-fx className="order-2 md:order-1 md:col-span-6">
            <p className="font-serif text-[clamp(1.9rem,4.4vw,3.4rem)] font-light leading-[1.15] text-ink text-balance">
              Nothing aggressive. Nothing loud.
            </p>
            <span className="mt-6 block font-mono text-[10px] uppercase tracking-[0.24em] text-ink/40">Editor’s note</span>
          </div>
          <div className="order-1 md:order-2 md:col-span-4 md:col-start-9">
            <Frame {...img('/images/nov-headphones.jpg', 'A held note', 'object-[45%_28%]')} ratio="aspect-[4/5]" />
          </div>
        </div>

        {/* duo — two frames, captioned */}
        <div className="grid gap-[clamp(16px,3vw,32px)] sm:grid-cols-2">
          <div>
            <Frame {...img('/images/nov-portrait-wall.jpg', 'Between sets', 'object-[center_18%]')} ratio="aspect-[4/5]" />
            <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">Between sets</span>
          </div>
          <div className="sm:mt-[clamp(32px,6vw,96px)]">
            <Frame {...img('/images/nov-about-editorial-buenos-aires.jpg', 'At the decks', 'object-[center_30%]')} ratio="aspect-[4/5]" />
            <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">At the decks</span>
          </div>
        </div>

        {/* wide landscape + caption line */}
        <div>
          <Frame {...img('/images/nov-booth-motion.jpg', 'Light trails across the booth', 'object-center')} ratio="aspect-[16/9]" range={26} />
          <div data-fx className="mt-5 flex items-baseline justify-between">
            <Meta>Plate 04 — closing hour</Meta>
            <span className="max-w-[38ch] text-right text-[13.5px] italic leading-[1.6] text-ink/55">Hands on the filter, the last hour drawn out until it means something.</span>
          </div>
        </div>
      </Container>

      {/* closing spread — full bleed */}
      <div className="mt-[clamp(72px,12vh,160px)]">
        <CineFrame
          src="/images/nov-dj-red-light-booth-silhouette.jpg"
          alt="Red light silhouette"
          pos="object-center"
          sizes="100vw"
          range={30}
          breathe
          frameClassName="h-[82svh] w-full"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10" style={{ background: 'linear-gradient(180deg, transparent 60%, rgba(5,5,5,0.65))' }} />
          <figcaption className="absolute bottom-[clamp(24px,4vw,48px)] left-0 right-0 z-10">
            <Container>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">UFO Point — 2025</span>
            </Container>
          </figcaption>
        </CineFrame>
      </div>

      <SkipToRadio shown={skipShown} onSkip={skip} hoverRef={skipHoverRef} />
    </section>
  );
}
