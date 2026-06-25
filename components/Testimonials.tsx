'use client';

import Image from 'next/image';
import { useState } from 'react';

const testimonials = [
  {
    title: 'Una narrativa impecable de punta a punta',
    quote:
      'NOV leyó la pista como pocos y nos llevó de viaje toda la noche. Profundidad y groove en dosis perfectas; la gente no se quería ir.',
    author: 'Ciclo Submarino',
    img: '/images/nov-live.jpg',
  },
  {
    title: 'La cabina quedó en las mejores manos',
    quote:
      'Atmósferas envolventes y una energía que crece sin apuro. Cada momento se sintió pensado. Volvemos a llamarlo sin dudarlo.',
    author: 'Terraza Costa',
    img: '/images/nov-stage.jpg',
  },
  {
    title: 'Emoción pura en la pista',
    quote:
      'Hipnótico de principio a fin. La selección renovada hizo que se sintiera fresco y único. Una de las mejores noches del ciclo.',
    author: 'Club Análogo',
    img: '/images/nov-hero.jpg',
  },
];

export default function Testimonials() {
  const [ti, setTi] = useState(0);
  const t = testimonials[ti];
  const prev = () => setTi((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setTi((i) => (i + 1) % testimonials.length);

  return (
    <section
      id="testimonios"
      className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,40px)] py-[clamp(64px,9vw,118px)]"
    >
      <div data-reveal="" className="mb-[clamp(34px,4vw,52px)]">
        <div className="w-[46px] h-[3px] bg-accent mb-[22px]" />
        <h2
          className="font-archivo font-black uppercase tracking-[-0.01em] m-0"
          style={{ fontSize: 'clamp(1.9rem,4.2vw,3rem)' }}
        >
          Lo que dicen
        </h2>
      </div>

      <div data-reveal="" className="flex flex-wrap gap-[clamp(20px,3vw,36px)] items-stretch">
        {/* Image */}
        <div className="flex-[1_1_280px] min-w-[240px] rounded-[6px] overflow-hidden min-h-[320px] relative">
          <Image
            src={t.img}
            alt={t.author}
            fill
            quality={80}
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 380px"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(10,9,8,.15), rgba(10,9,8,.55))' }}
          />
        </div>

        {/* Quote */}
        <div
          className="flex-[1.4_1_420px] min-w-[300px] bg-card border border-[var(--line)] rounded-[6px] flex flex-col justify-center px-[clamp(28px,4vw,52px)] py-[clamp(28px,4vw,52px)]"
        >
          <span className="font-archivo text-[64px] leading-[0.6] text-accent h-[34px] block">&ldquo;</span>
          <h3
            className="font-archivo font-bold m-0 mb-[18px] uppercase"
            style={{ fontSize: 'clamp(1.25rem,2.4vw,1.8rem)', lineHeight: '1.2' }}
          >
            {t.title}
          </h3>
          <p className="text-[var(--mut)] text-[16px] leading-[1.7] m-0 mb-[26px]">{t.quote}</p>

          <div className="flex items-center justify-between gap-4 mt-auto">
            <div className="flex items-center gap-3">
              <span className="w-[28px] h-px bg-accent block" />
              <span className="text-txt font-semibold text-[14.5px]">{t.author}</span>
            </div>
            <div className="flex gap-[10px]">
              <button
                onClick={prev}
                aria-label="Testimonio anterior"
                className="grid place-items-center w-[44px] h-[44px] rounded-full border border-[var(--line)] bg-transparent text-txt cursor-pointer text-[16px] transition-all duration-300 hover:border-accent hover:bg-white/[.04] hover:-translate-x-[2px]"
              >
                ←
              </button>
              <button
                onClick={next}
                aria-label="Siguiente testimonio"
                className="grid place-items-center w-[44px] h-[44px] rounded-full border border-[var(--line)] bg-transparent text-txt cursor-pointer text-[16px] transition-all duration-300 hover:border-accent hover:bg-white/[.04] hover:translate-x-[2px]"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
