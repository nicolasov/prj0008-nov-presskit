'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const y = window.scrollY;
        if (el) el.style.transform = `translateY(${(y * 0.06).toFixed(1)}px) scale(1.06)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-end overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* Background image + overlays */}
      <div className="absolute inset-0 z-0">
        <div ref={imgRef} className="absolute inset-0" style={{ transform: 'scale(1.06)', willChange: 'transform' }}>
          <Image
            src="/images/nov-stage.jpg"
            alt="NOV en cabina durante un set"
            fill
            priority
            quality={90}
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
        </div>
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(10,9,8,.62) 0%, rgba(10,9,8,.22) 34%, rgba(10,9,8,.72) 76%, rgba(10,9,8,.98) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(125% 75% at 50% -5%, transparent 42%, rgba(10,9,8,.55))' }}
        />
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(58% 50% at 72% 10%, rgba(224,70,58,.18), transparent 68%), radial-gradient(48% 42% at 8% 26%, rgba(224,70,58,.07), transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-[clamp(18px,4vw,40px)] pb-[clamp(54px,8vw,104px)]">
        <div data-reveal="">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-[10px] px-4 py-2 border border-white/[.16] rounded-full mb-[30px]"
            style={{ backdropFilter: 'blur(6px)', background: 'rgba(10,9,8,.2)' }}
          >
            <span className="w-[7px] h-[7px] rounded-full bg-accent" />
            <span className="text-[12.5px] tracking-[.18em] uppercase text-txt">
              DJ &amp; Productor &middot; Buenos Aires
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-archivo font-black uppercase tracking-[-0.02em] leading-[.9] m-0 mb-[30px]"
            style={{
              fontSize: 'clamp(3rem,9.2vw,7.2rem)',
              textShadow: '0 2px 40px rgba(0,0,0,.4)',
              textWrap: 'balance',
            }}
          >
            Sets hipnóticos
            <br />
            cargados de <span className="text-accent">groove</span>
          </h1>

          {/* CTA row */}
          <div className="flex flex-wrap items-end justify-between gap-[30px]">
            <div className="max-w-[48ch]">
              <p
                className="text-[rgba(245,241,235,.82)] m-0 mb-[30px] leading-[1.65]"
                style={{ fontSize: 'clamp(15px,1.6vw,18px)' }}
              >
                Construyo viajes sonoros profundos que leen la pista y guían cada momento con
                precisión. Una invitación a cerrar los ojos, conectar y simplemente sentir.
              </p>
              <div className="flex flex-wrap gap-[14px]">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-[10px] px-[30px] py-[16px] rounded-[6px] bg-accent text-white no-underline font-bold text-[15px] transition-all duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(224,70,58,.3)] hover:bg-accent-hover"
                >
                  Contactar
                </a>
                <a
                  href="#sonido"
                  className="inline-flex items-center gap-[11px] px-[28px] py-[16px] rounded-[6px] border border-white/[.22] text-txt no-underline font-semibold text-[15px] transition-all duration-300 hover:border-accent hover:bg-white/[.06] hover:-translate-y-[3px]"
                >
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-accent text-white text-[13px] pl-[2px]">
                    ▶
                  </span>
                  Escuchar sets
                </a>
              </div>
            </div>

            {/* Spinning badge */}
            <div className="w-[104px] h-[104px] relative flex-none animate-float">
              <div className="absolute inset-0 animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <path
                      id="novcp"
                      d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                      fill="none"
                    />
                  </defs>
                  <text style={{ font: '600 8.2px var(--font-archivo)', fill: '#F5F1EB', letterSpacing: '1.6px' }}>
                    <textPath href="#novcp">ESCUCHAR · SETS · EN VIVO · </textPath>
                  </text>
                </svg>
              </div>
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-[46px] h-[46px] rounded-full bg-accent text-white text-[16px] pl-[3px]">
                ▶
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
