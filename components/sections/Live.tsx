'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';
import Accent from '@/components/ui/Accent';
import LineReveal from '@/components/ui/LineReveal';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';
import { ARTIST_PHOTOS, artistPhoto, type ArtistPhoto } from '@/lib/live-photos';

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
 * Shared booth as one continuous editorial sentence — the artists flow past as
 * a single line, bullet-separated, on a slow GSAP loop. Never a list, never a
 * logo wall.
 *
 * To the right (desktop), an editorial photographic system fills what used to
 * be empty space: as a name reaches the visual focus of the marquee, if a
 * genuine photograph of NOV *with* that artist exists (lib/live-photos.ts), it
 * dissolves in — monochrome, borderless, slow — and that name quietly turns to
 * the signal colour while its photograph is visible. If no real photograph
 * exists for a name, nothing appears; there are never placeholders. With the
 * map empty (today) the space simply stays dark, as before.
 */
export default function Live() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const activeRef = useRef<string | null>(null);

  const [active, setActive] = useState<string | null>(null);
  // two layers for a true cross-dissolve between photographs
  const [layers, setLayers] = useState<{ a: ArtistPhoto | null; b: ArtistPhoto | null; showA: boolean }>({
    a: null,
    b: null,
    showA: true,
  });

  // the slow drift
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // the track holds two identical sequences; travelling exactly -50% lands
    // the second on the first — a seamless wrap. Very slow, editorial.
    tweenRef.current = gsap.to(track, { xPercent: -50, ease: 'none', duration: 88, repeat: -1 });
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  // Which name is at the marquee's visual focus? Only while the section is on
  // screen. A name is "in focus" when its centre is near the marquee centre AND
  // a real photograph exists for it — otherwise nothing is activated.
  useEffect(() => {
    const section = sectionRef.current;
    const marquee = marqueeRef.current;
    const track = trackRef.current;
    if (!section || !marquee || !track) return;
    if (!Object.keys(ARTIST_PHOTOS).length) return; // dormant until real photos exist

    let raf = 0;
    let running = false;

    const tick = () => {
      const box = marquee.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const threshold = box.width * 0.14; // must be genuinely near centre
      let best: string | null = null;
      let bestDist = Infinity;
      track.querySelectorAll<HTMLElement>('[data-artist]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - cx);
        if (d < bestDist) {
          bestDist = d;
          best = el.dataset.artist ?? null;
        }
      });
      const focused = best && bestDist < threshold && artistPhoto(best) ? best : null;
      if (focused !== activeRef.current) {
        activeRef.current = focused;
        setActive(focused);
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
      if (activeRef.current) {
        activeRef.current = null;
        setActive(null);
      }
    };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      rootMargin: '0px',
    });
    io.observe(section);
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  // feed the cross-dissolve: load the incoming photo into the hidden layer,
  // then reveal it. Dissolving to nothing fades the current photo out.
  useEffect(() => {
    const photo = artistPhoto(active);
    setLayers((prev) => (prev.showA ? { ...prev, b: photo, showA: false } : { ...prev, a: photo, showA: true }));
  }, [active]);

  const slow = (factor: number) => tweenRef.current?.timeScale(factor);

  const sequence = (
    <span className="flex shrink-0 items-center">
      {artists.map((name) => (
        <span key={name} className="flex items-center">
          <span
            data-artist={name}
            className="font-serif text-[clamp(1.6rem,4vw,3rem)] font-light transition-colors duration-[1200ms] ease-fade"
            style={{ color: active === name ? '#E0523F' : 'rgb(234 234 230 / 0.7)' }}
          >
            {name}
          </span>
          <span aria-hidden="true" className="mx-[clamp(20px,3vw,48px)] text-red-bright/70">
            •
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <Section id={cue.id} fxIndex={0}>
      <div ref={sectionRef}>
        <div className="grid gap-[clamp(28px,5vw,64px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Timecode tc={cue.tc} label={cue.label} />
            <Heading as="h2" className="mt-6 max-w-[9ch]">
              Trusted in serious <Accent>rooms</Accent>.
            </Heading>
            <LineReveal
              lines={t.live.lines}
              className="mt-6 flex max-w-[52ch] flex-col gap-1.5"
              lineClassName="text-[15.5px] leading-[1.6] text-ink/70"
            />
          </div>

          {/* the editorial photographic system — desktop only (this is the
              "empty space on the right"). A memory surfacing from the dark:
              small, monochrome, low-contrast, and radially masked so its edges
              dissolve completely into the page black — no rectangle, no border,
              no frame. One image at a time, a slow dissolve. Empty and dark
              until a real NOV-with-artist photograph exists. */}
          <div
            aria-hidden={!active}
            className="relative mx-auto hidden aspect-[4/5] w-[74%] max-w-[380px] lg:block"
            style={{
              // heavy vignette — the edges disappear completely into the page
              // black, so it never reads as a rectangle
              WebkitMaskImage: 'radial-gradient(58% 54% at 50% 45%, #000 22%, transparent 74%)',
              maskImage: 'radial-gradient(58% 54% at 50% 45%, #000 22%, transparent 74%)',
            }}
          >
            {[
              { key: 'a', photo: layers.a, on: layers.showA },
              { key: 'b', photo: layers.b, on: !layers.showA },
            ].map(({ key, photo, on }) =>
              photo ? (
                <Image
                  key={`${key}-${photo.src}`}
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  unoptimized={!!photo.temp}
                  sizes="(max-width: 1024px) 0px, 34vw"
                  className="object-cover transition-opacity duration-[1700ms] ease-fade"
                  style={{
                    opacity: on ? 1 : 0,
                    // real photos get a low-contrast monochrome grade; the temp
                    // placeholders already carry it, baked into the SVG.
                    filter: photo.temp ? undefined : 'grayscale(1) contrast(0.9) brightness(0.72)',
                  }}
                />
              ) : null,
            )}
          </div>
        </div>

        <div
          ref={marqueeRef}
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
      </div>
    </Section>
  );
}
