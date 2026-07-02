import Image from 'next/image';
import { cn } from '@/lib/utils';

type StillProps = {
  src: string;
  alt: string;
  caption?: string;
  tc?: string;
  aspect?: 'letterbox' | 'portrait' | 'square';
  sizes?: string;
  priority?: boolean;
  fxIndex?: number;
  className?: string;
};

const aspects = {
  letterbox: 'aspect-[21/9]',
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
};

/** The film-still primitive: letterboxed, monochrome-graded, captioned like a subtitle. */
export default function Still({
  src,
  alt,
  caption,
  tc,
  aspect = 'portrait',
  sizes = '100vw',
  priority,
  fxIndex = 0,
  className,
}: StillProps) {
  return (
    <figure
      data-fx
      data-fx-index={fxIndex}
      className={cn('relative overflow-hidden border border-line-strong bg-bg-1', aspects[aspect], className)}
    >
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="monochrome-image object-cover" />
      {tc && (
        <span className="absolute right-4 top-4 font-mono text-[10px] tracking-[0.16em] text-ink/45">{tc}</span>
      )}
      {caption && (
        <figcaption className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.16em] text-ink/55">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
