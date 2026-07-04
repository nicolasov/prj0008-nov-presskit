'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import Image from 'next/image';
import { useLenis } from '@/components/SmoothScroll';

/**
 * The shared cinematic gallery language, so the exploration branches (B–E) can
 * each interpret the exhibition in their own layout while speaking the same
 * motion — the same one Gallery A speaks, extracted here without touching A.
 *
 * Wrap each photograph in <CineFrame> (pass your own frame sizing classes) and
 * call useCinematic(sectionRef) once per gallery. Every frame then:
 *  - reveals from darkness, its develop duration read from scroll pace,
 *  - drifts with a subtle parallax that calms as you move faster,
 *  - (optionally) breathes and zooms imperceptibly,
 *  - and offers the same near-invisible SKIP → Radio on fast scroll.
 *
 * It reuses the .plate / .plate-move / .plate-media / .grade-* CSS from
 * globals.css via `data-cine` / `data-cine-move` hooks. Transform- and
 * filter-only: no layout shift.
 */

type Grade = 'mono' | 'color';

export function CineFrame({
  src,
  alt,
  pos,
  grade = 'mono',
  sizes,
  unoptimized,
  priority,
  range = 26,
  zoom = false,
  breathe = false,
  frameClassName = '',
  imgClassName = '',
}: {
  src: string;
  alt: string;
  pos?: string;
  grade?: Grade;
  sizes?: string;
  unoptimized?: boolean;
  priority?: boolean;
  range?: number;
  zoom?: boolean;
  breathe?: boolean;
  frameClassName?: string;
  imgClassName?: string;
}) {
  return (
    <figure data-cine className={`plate relative m-0 overflow-hidden bg-bg-1 ${frameClassName}`}>
      <div
        data-cine-move
        data-range={range}
        data-zoom={zoom ? '1' : undefined}
        data-breathe={breathe ? '1' : undefined}
        className="plate-move absolute inset-0"
        style={{ transform: 'scale(1.1)' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          unoptimized={unoptimized}
          priority={priority}
          className={`plate-media grade-${grade} object-cover ${pos ?? ''} ${imgClassName}`}
        />
      </div>
    </figure>
  );
}

export function useCinematic(sectionRef: RefObject<HTMLElement | null>) {
  const lenis = useLenis();
  const [skipShown, setSkipShown] = useState(false);
  const paceRef = useRef(0);
  const inViewRef = useRef(false);
  const skipShownRef = useRef(false);
  const skipHoverRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const figures = Array.from(section.querySelectorAll<HTMLElement>('[data-cine]'));
    const moves = Array.from(section.querySelectorAll<HTMLElement>('[data-cine-move]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) figures.forEach((f) => f.classList.add('in'));
    if (!('IntersectionObserver' in window)) {
      figures.forEach((f) => f.classList.add('in'));
      return;
    }

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
      const vps = (Math.abs(dy) / dt) * 1000;
      paceRef.current += (Math.min(1, vps / 2400) - paceRef.current) * 0.12;
      const pace = paceRef.current;
      const vh = window.innerHeight;

      let seen = 0;
      for (const f of figures) {
        const r = f.getBoundingClientRect();
        if (!f.classList.contains('in') && r.top < vh * 0.9) {
          f.style.setProperty('--dev', `${(3.2 - pace * 2.5).toFixed(2)}s`);
          f.classList.add('in');
        }
        if (f.classList.contains('in')) seen += 1;
      }

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

      if (!skipShownRef.current && inViewRef.current && seen >= 6 && pace > 0.55) {
        skipShownRef.current = true;
        setSkipShown(true);
      } else if (
        skipShownRef.current &&
        !skipHoverRef.current &&
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
        if (e.isIntersecting) start();
        else {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skip = () => {
    skipShownRef.current = false;
    setSkipShown(false);
    if (lenis) lenis.scrollTo('#radio', { offset: -88, duration: 1.6 });
    else document.getElementById('radio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return { skipShown, skip, skipHoverRef };
}

export function SkipToRadio({
  shown,
  onSkip,
  hoverRef,
}: {
  shown: boolean;
  onSkip: () => void;
  hoverRef: RefObject<boolean>;
}) {
  return (
    <button
      type="button"
      onClick={onSkip}
      onPointerEnter={() => (hoverRef.current = true)}
      onPointerLeave={() => (hoverRef.current = false)}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={`fixed bottom-8 left-1/2 z-40 -translate-x-1/2 border-none bg-transparent p-2 font-mono text-[10px] tracking-[0.34em] text-ink/30 transition-opacity duration-700 ease-fade hover:cursor-pointer hover:text-ink/60 focus-visible:text-ink/70 focus-visible:outline-none ${
        shown ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      SKIP GALLERY →
    </button>
  );
}
