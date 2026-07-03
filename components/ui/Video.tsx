'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type VideoProps = {
  src: string;
  caption?: string;
  tc?: string;
  aspect?: 'letterbox' | 'wide' | 'portrait';
  className?: string;
  fxIndex?: number;
};

const aspects = {
  letterbox: 'aspect-[21/9]',
  wide: 'aspect-video',
  portrait: 'aspect-[4/5]',
};

/**
 * A video treated exactly like an editorial still — muted, looping,
 * grain-graded, captioned as a subtitle. Never autoplays with sound. Plays
 * only while on screen (paused offscreen for battery/perf) and yields to the
 * SoundCloud player: if the visitor starts a set, the loop pauses so there is
 * never a second moving-image demanding attention over the music.
 */
export default function Video({ src, caption, tc, aspect = 'letterbox', className, fxIndex = 0 }: VideoProps) {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onScreen = useRef(false);
  const audioBusy = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const sync = () => {
      if (onScreen.current && !audioBusy.current) video.play().catch(() => {});
      else video.pause();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(wrap);

    const onAudioEngaged = () => {
      audioBusy.current = true;
      sync();
    };
    window.addEventListener('nov:audio-engaged', onAudioEngaged);

    return () => {
      io.disconnect();
      window.removeEventListener('nov:audio-engaged', onAudioEngaged);
    };
  }, []);

  return (
    <figure
      ref={wrapRef}
      data-fx
      data-fx-index={fxIndex}
      className={cn('relative overflow-hidden border border-line-strong bg-bg-1', aspects[aspect], className)}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="monochrome-image h-full w-full object-cover"
      />
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
