'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const plateRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = plateRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const onMove = (event: PointerEvent) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const x = (event.clientX / window.innerWidth - 0.5) * 18;
        const y = (event.clientY / window.innerHeight - 0.5) * 14;
        el.style.setProperty('--mx', `${x.toFixed(2)}px`);
        el.style.setProperty('--my', `${y.toFixed(2)}px`);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section
      id="top"
      className="secret-hero relative flex h-[calc(100svh-52px)] min-h-[580px] items-end overflow-hidden"
    >
      <div className="room-scene" aria-hidden="true">
        <div className="room-wall room-wall-left" />
        <div className="room-wall room-wall-right" />
        <div className="room-horizon" />
        <div className="room-grid" />
        <div ref={plateRef} className="room-plate">
          <Image
            src="/images/nov-stage.jpg"
            alt=""
            fill
            priority
            quality={90}
            className="monochrome-image object-cover object-[center_42%]"
            sizes="(max-width: 760px) 54vw, 430px"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1240px] gap-[clamp(24px,4vw,48px)] px-[clamp(18px,4vw,40px)] pb-[clamp(30px,5vw,64px)] pt-24 md:grid-cols-[1fr_320px] md:items-end">
        <div data-reveal="" className="max-w-[860px]">
          <p className="section-kicker">Buenos Aires / Progressive House / Deep House</p>
          <h1 className="font-editorial m-0 text-[clamp(6.2rem,22vw,16rem)] font-normal leading-[0.72] tracking-[0] text-[var(--txt)]">
            NOV
          </h1>
          <div className="mt-[clamp(26px,4vw,42px)] grid gap-8 md:grid-cols-[minmax(0,46ch)_auto] md:items-end">
            <p className="m-0 max-w-[49ch] text-[clamp(15px,1.6vw,18px)] leading-[1.85] text-[var(--mut)]">
              A private listening room for deep, hypnotic and emotionally evolving sets.
              Built with silence, tension and a fresh selection before every performance.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contacto" className="silver-button">
                Booking
              </a>
              <a href="#escuchar" className="ghost-button">
                Listen
              </a>
            </div>
          </div>
        </div>

        <aside
          data-reveal=""
          className="hidden border-l border-[var(--line)] pl-6 text-[12px] uppercase tracking-[0.18em] text-[var(--mut2)] md:block"
        >
          <p className="m-0 leading-[1.8]">
            Not a portfolio.
            <br />
            Not a resume.
            <br />
            A slow entrance.
          </p>
        </aside>

        <div className="col-span-full grid gap-px border-y border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
          {[
            ['Origin', 'Buenos Aires, Argentina'],
            ['Language', 'Hypnotic groove / emotional storytelling'],
            ['Method', 'Every set selected fresh'],
          ].map(([label, value]) => (
            <div key={label} className="bg-[rgba(2,2,2,.74)] px-4 py-4 sm:px-5">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--mut2)]">
                {label}
              </span>
              <span className="mt-2 block text-[13px] leading-[1.55] text-[var(--txt)]">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#room"
        className="absolute bottom-4 right-[clamp(18px,4vw,40px)] z-20 hidden text-[11px] uppercase tracking-[0.22em] text-[var(--mut2)] no-underline transition hover:text-[var(--txt)] sm:block"
      >
        Enter
      </a>
    </section>
  );
}
