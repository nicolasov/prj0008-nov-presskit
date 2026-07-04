'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { useLenis } from '@/components/SmoothScroll';

/**
 * The Gallery is an interlude, not a portfolio.
 *
 * Until here the site speaks; inside the Gallery it goes almost silent —
 * no heading, no timecode, almost no interface. Only photographs, one at a
 * time, each given its own moment of black. The exhibition emerges from the
 * darkness of the previous section and dissolves into the next; there is no
 * hard beginning and no hard end.
 *
 * Composition never repeats twice in a row — full viewport, a small portrait
 * held in negative space, a wide landscape, a void, a close detail, a
 * panorama. Most frames are monochrome; colour arrives only twice, like a
 * held breath (the warm light-trails, then the red at the peak).
 *
 * Motion is cinema, never "website animation": each photograph develops from
 * near-black like a print, drifts with a little parallax, and the large
 * frames breathe and zoom imperceptibly slowly. All of it is transform- and
 * filter-only, so nothing shifts layout.
 *
 * The Gallery reads the visitor. A single rAF loop tracks scroll pace:
 *  - Linger, and each photograph develops slowly and is given room.
 *  - Move quickly, and the development shortens, the parallax calms, and a
 *    near-invisible "SKIP GALLERY →" fades in (only past the fifth frame, and
 *    only while clearly moving) that continues straight to the next section.
 *  - Slow down again and it all returns to the contemplative rhythm.
 * None of this is announced; the visitor should simply feel understood.
 */

type Comp = 'full' | 'pano' | 'wide' | 'tall' | 'detail' | 'void';
type Grade = 'mono' | 'color';

type Plate = {
  comp: Comp;
  src: string;
  alt: string;
  grade: Grade;
  /** object-position for a deliberate crop */
  pos?: string;
  /** inset alignment; ignored for full-bleed comps */
  align?: 'left' | 'right';
  caption?: string;
  /** parallax translate range, px */
  range: number;
  zoom?: boolean;
  breathe?: boolean;
};

/* The sequence. Composition never repeats consecutively; colour lands only on
   plates 3 and 7, well apart. Two photographs return at radically different
   crops and grades — treated as different moments, never a repeat. */
const plates: Plate[] = [
  { comp: 'full', src: '/images/nov-dj-live-buenos-aires-club.jpg', alt: 'The room, full — Buenos Aires', grade: 'mono', pos: 'object-[center_42%]', caption: 'Buenos Aires — 2025', range: 34, zoom: true, breathe: true },
  { comp: 'tall', src: '/images/nov-booth-shadow.jpg', alt: 'NOV in half light', grade: 'mono', align: 'left', pos: 'object-[center_28%]', range: 22 },
  { comp: 'wide', src: '/images/nov-booth-motion.jpg', alt: 'Light trails across the booth', grade: 'color', align: 'right', pos: 'object-center', range: 26, zoom: true },
  { comp: 'void', src: '/images/nov-headphones.jpg', alt: 'A held note', grade: 'mono', align: 'right', pos: 'object-[38%_30%]', range: 16 },
  { comp: 'detail', src: '/images/nov-portrait-wall.jpg', alt: 'Between sets', grade: 'mono', align: 'left', pos: 'object-[center_18%]', range: 18 },
  { comp: 'pano', src: '/images/nov-booth-motion.jpg', alt: 'The last hour', grade: 'mono', pos: 'object-[72%_center]', range: 24, zoom: true },
  { comp: 'full', src: '/images/nov-dj-red-light-booth-silhouette.jpg', alt: 'Red light — the long build', grade: 'color', pos: 'object-center', caption: 'UFO Point — 2025', range: 34, zoom: true, breathe: true },
  { comp: 'tall', src: '/images/nov-booth-shadow.jpg', alt: 'The booth, receding', grade: 'mono', align: 'right', pos: 'object-[70%_60%]', range: 22 },
];

const frame: Record<Comp, string> = {
  full: 'h-[86svh] sm:h-[92svh] w-full',
  pano: 'h-[44svh] sm:h-[52svh] w-full',
  wide: 'aspect-[16/10] w-full md:w-[80%]',
  tall: 'aspect-[4/5] w-[80%] max-w-[440px] md:w-[46%]',
  detail: 'aspect-square w-[72%] max-w-[520px] md:w-[50%]',
  void: 'aspect-[4/5] w-[52%] max-w-[300px] md:w-[28%]',
};

const alignCls = { left: 'mr-auto', right: 'ml-auto' } as const;

const sizesFor: Record<Comp, string> = {
  full: '100vw',
  pano: '100vw',
  wide: '(max-width: 768px) 100vw, 80vw',
  tall: '(max-width: 768px) 80vw, 46vw',
  detail: '(max-width: 768px) 72vw, 50vw',
  void: '(max-width: 768px) 52vw, 28vw',
};

const bleed = (c: Comp) => c === 'full' || c === 'pano';

function PlateFigure({ plate }: { plate: Plate }) {
  return (
    <figure
      data-plate
      className={`plate relative m-0 overflow-hidden bg-bg-1 ${frame[plate.comp]} ${
        plate.align && !bleed(plate.comp) ? alignCls[plate.align] : ''
      }`}
    >
      <div
        data-move
        data-range={plate.range}
        data-zoom={plate.zoom ? '1' : undefined}
        data-breathe={plate.breathe ? '1' : undefined}
        className="plate-move absolute inset-0"
        style={{ transform: 'scale(1.1)' }}
      >
        <Image
          src={plate.src}
          alt={plate.alt}
          fill
          sizes={sizesFor[plate.comp]}
          className={`plate-media grade-${plate.grade} object-cover ${plate.pos ?? ''}`}
        />
      </div>
      {plate.caption && (
        <figcaption className="pointer-events-none absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/40">
          {plate.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function Gallery() {
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement>(null);
  const [skipShown, setSkipShown] = useState(false);

  const paceRef = useRef(0);
  const inViewRef = useRef(false);
  const skipShownRef = useRef(false);
  const skipHoverRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const figures = Array.from(section.querySelectorAll<HTMLElement>('[data-plate]'));
    const moves = Array.from(section.querySelectorAll<HTMLElement>('[data-move]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Under reduced motion the photographs are simply present — they still
    // settle from black, but quickly (globals.css), with no parallax. We keep
    // a light loop running only to offer the SKIP affordance on fast scroll.
    if (reduce) figures.forEach((f) => f.classList.add('in'));

    if (!('IntersectionObserver' in window)) {
      figures.forEach((f) => f.classList.add('in'));
      return;
    }

    // One rAF loop, alive only while the Gallery is near the viewport. It is
    // the single source of truth — geometry-driven, so nothing depends on the
    // timing of scroll events (fast programmatic or momentum scroll can starve
    // IntersectionObserver, which would leave plates black or the SKIP hint
    // late). Each frame it: measures scroll pace; develops any plate that has
    // entered (its duration read from that pace); drives parallax / zoom /
    // breathing; counts how many photographs are behind the visitor; and
    // decides whether the SKIP intention has been expressed.
    let raf = 0;
    let running = false;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const rest = () => moves.forEach((m) => (m.style.transform = 'scale(1.1)'));

    const frameLoop = (now: number) => {
      const dt = Math.max(8, now - lastT);
      const dy = window.scrollY - lastY;
      lastT = now;
      lastY = window.scrollY;
      const vps = (Math.abs(dy) / dt) * 1000; // px per second
      paceRef.current += (Math.min(1, vps / 2400) - paceRef.current) * 0.12;
      const pace = paceRef.current;
      const vh = window.innerHeight;

      // develop-on-enter (pace-adaptive) + count photographs seen so far
      let seen = 0;
      for (const f of figures) {
        const r = f.getBoundingClientRect();
        if (!f.classList.contains('in') && r.top < vh * 0.9) {
          const dur = (3.2 - pace * 2.5).toFixed(2); // 3.2s lingering → 0.7s rushing
          f.style.setProperty('--dev', `${dur}s`);
          f.classList.add('in');
        }
        if (f.classList.contains('in')) seen += 1; // monotonic: photographs entered
      }

      // parallax / zoom / breathing — transform only, off under reduced motion
      if (!reduce) {
        for (const m of moves) {
          const r = m.getBoundingClientRect();
          if (r.bottom < -vh * 0.35 || r.top > vh * 1.35) continue;
          const center = r.top + r.height / 2;
          const prog = Math.max(-1.15, Math.min(1.15, (center - vh / 2) / vh));
          const range = Number(m.dataset.range || 24) * (1 - pace * 0.5);
          const ty = -prog * range;
          let s = 1.1;
          if (m.dataset.zoom) s += 0.05 * (1 - Math.min(1, Math.abs(prog)));
          if (m.dataset.breathe) s += 0.008 * Math.sin(now / 2600);
          m.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(${s.toFixed(4)})`;
        }
      }

      // SKIP intention — past ~the fifth photograph AND clearly moving on →
      // fade in; slow back down (or leave the Gallery) → fade away. Hysteresis
      // (0.55 up / 0.28 down) so it can never flicker. Never announced.
      if (!skipShownRef.current && inViewRef.current && seen >= 6 && pace > 0.55) {
        skipShownRef.current = true;
        setSkipShown(true);
      } else if (
        skipShownRef.current &&
        !skipHoverRef.current && // never fade out from under the pointer reaching for it
        (!inViewRef.current || pace < 0.28)
      ) {
        skipShownRef.current = false;
        setSkipShown(false);
      }

      raf = requestAnimationFrame(frameLoop);
    };

    const start = () => {
      if (running) return;
      running = true;
      lastY = window.scrollY;
      lastT = performance.now();
      raf = requestAnimationFrame(frameLoop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const activeIO = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        inViewRef.current = e.isIntersecting;
        if (e.isIntersecting) {
          start();
        } else {
          stop();
          rest();
          if (skipShownRef.current) {
            skipShownRef.current = false;
            setSkipShown(false);
          }
        }
      },
      { rootMargin: '12% 0px 12% 0px' },
    );
    activeIO.observe(section);

    return () => {
      activeIO.disconnect();
      stop();
    };
  }, []);

  const skip = () => {
    skipShownRef.current = false;
    setSkipShown(false);
    if (lenis) lenis.scrollTo('#radio', { offset: -88, duration: 1.6 });
    else document.getElementById('radio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="gallery" ref={sectionRef} className="relative py-[clamp(90px,16vh,220px)]">
      <div className="flex flex-col gap-[clamp(72px,13vh,180px)]">
        {plates.map((plate, i) =>
          bleed(plate.comp) ? (
            <PlateFigure key={i} plate={plate} />
          ) : (
            <Container key={i}>
              <PlateFigure plate={plate} />
            </Container>
          ),
        )}
      </div>

      {/* SKIP — near-invisible, appears only when the visitor is clearly
          moving on. No button styling, no CTA. Continues to the next section. */}
      <button
        type="button"
        onClick={skip}
        onPointerEnter={() => (skipHoverRef.current = true)}
        onPointerLeave={() => (skipHoverRef.current = false)}
        tabIndex={skipShown ? 0 : -1}
        aria-hidden={!skipShown}
        className={`fixed bottom-8 left-1/2 z-40 -translate-x-1/2 border-none bg-transparent p-2 font-mono text-[10px] tracking-[0.34em] text-ink/30 transition-opacity duration-700 ease-fade hover:cursor-pointer hover:text-ink/60 focus-visible:text-ink/70 focus-visible:outline-none ${
          skipShown ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        SKIP GALLERY →
      </button>
    </section>
  );
}
