import Image from 'next/image';

const events = [
  {
    date: '12 JUL 2026',
    title: 'Ciclo Progresivo',
    desc: 'Set extendido de progressive house. Palermo, Buenos Aires.',
    img: '/images/nov-live.jpg',
    imgAlt: 'NOV en cabina con luces de larga exposición',
  },
  {
    date: '09 AGO 2026',
    title: 'Sunset Costa',
    desc: 'Atardecer melódico frente al mar. Mar del Plata.',
    img: '/images/nov-stage.jpg',
    imgAlt: 'NOV de negro tocando con luces rojas de fondo',
    imgPosition: 'center 35%',
  },
  {
    date: '05 SEP 2026',
    title: 'Noche Hipnótica',
    desc: 'Melodic techno hasta el amanecer. CABA, Buenos Aires.',
    img: '/images/nov-hero.jpg',
    imgAlt: 'Silueta de NOV frente a la pantalla con su nombre',
    imgPosition: 'center 22%',
  },
];

export default function Events() {
  return (
    <section
      id="fechas"
      className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,90px)]"
    >
      <div data-reveal="" className="text-center mb-[clamp(40px,5vw,60px)]">
        <div className="w-[46px] h-[3px] bg-accent mx-auto mb-[22px]" />
        <h2
          className="font-archivo font-black uppercase tracking-[-0.01em] m-0"
          style={{ fontSize: 'clamp(1.9rem,4.2vw,3rem)' }}
        >
          Últimas fechas
        </h2>
      </div>

      <div
        className="grid gap-[clamp(18px,2.4vw,28px)]"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
      >
        {events.map(({ date, title, desc, img, imgAlt, imgPosition }) => (
          <article
            key={title}
            data-reveal=""
            className="group bg-card border border-[var(--line)] rounded-[8px] overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-[7px] hover:shadow-[0_26px_56px_rgba(0,0,0,.45)] hover:border-[rgba(224,70,58,.35)]"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
              <Image
                src={img}
                alt={imgAlt}
                fill
                quality={80}
                className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                style={{ objectPosition: imgPosition ?? 'center' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
              />
            </div>
            <div className="px-6 pt-6 pb-7">
              <div className="text-accent text-[13px] font-semibold tracking-[0.04em] mb-[10px]">
                {date}
              </div>
              <h3 className="font-archivo font-bold uppercase text-[1.3rem] m-0 mb-[10px]">
                {title}
              </h3>
              <p className="text-[var(--mut)] text-[14.5px] leading-[1.6] m-0 mb-5">{desc}</p>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 text-txt no-underline font-semibold text-[14px] transition-all duration-300 hover:gap-[14px] hover:text-accent"
              >
                Ver detalle →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
