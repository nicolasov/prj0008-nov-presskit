'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type VideoProps = {
  poster: string;
  title: string;
  embedSrc: string;
  aspect?: 'video' | 'square';
  className?: string;
};

/** Poster-first, click-to-load embed — no iframe hits the network until intent. */
export default function Video({ poster, title, embedSrc, aspect = 'video', className }: VideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-line-strong bg-bg-1',
        aspect === 'video' ? 'aspect-video' : 'aspect-square',
        className,
      )}
    >
      {playing ? (
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4"
        >
          <Image
            src={poster}
            alt={title}
            fill
            sizes="100vw"
            className="monochrome-image object-cover transition-[filter] duration-hover ease-fade group-hover:brightness-110"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-red-bright text-red-bright transition-colors duration-hover ease-fade group-hover:bg-red/10">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                <path d="M0 0L14 8L0 16V0Z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
