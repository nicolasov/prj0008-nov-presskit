import Image from 'next/image';

export default function Bio() {
  return (
    <section
      id="bio"
      className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,40px)] py-[clamp(64px,9vw,120px)] flex flex-wrap items-center gap-[clamp(36px,5vw,72px)]"
    >
      {/* Photo */}
      <div data-reveal="" className="flex-[1_1_360px] min-w-[280px]">
        <div
          className="relative rounded-[6px] overflow-hidden bg-[var(--bg2)] group"
          style={{ aspectRatio: '4/5', boxShadow: '0 36px 80px rgba(0,0,0,.5)' }}
        >
          <Image
            src="/images/nov-bio.jpg"
            alt="NOV en cabina"
            fill
            quality={85}
            className="object-cover object-center transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 460px"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, transparent 52%, rgba(10,9,8,.5))' }}
          />
        </div>
      </div>

      {/* Text */}
      <div data-reveal="" className="flex-[1_1_380px] min-w-[300px]">
        <div className="w-[46px] h-[3px] bg-accent mb-[26px]" />
        <h2
          className="font-archivo font-black uppercase tracking-[-0.01em] leading-none m-0 mb-[26px]"
          style={{ fontSize: 'clamp(2rem,4.2vw,3.1rem)' }}
        >
          Groove, emoción
          <br />
          y profundidad
        </h2>
        <p className="text-[var(--mut)] text-[16.5px] leading-[1.7] m-0 mb-[18px]">
          NOV es un DJ y productor de Buenos Aires que construye sets hipnóticos y cargados de
          groove, donde la emoción y la profundidad son protagonistas.
        </p>
        <p className="text-[var(--mut)] text-[16.5px] leading-[1.7] m-0 mb-[18px]">
          Con una fuerte sensibilidad para leer la pista, crea atmósferas envolventes y una
          narrativa sólida que guía cada momento con precisión. En cada presentación renueva su
          selección, explorando nuevos sonidos para una experiencia siempre fresca.
        </p>
        <p className="text-txt text-[16.5px] leading-[1.7] m-0 mb-[32px] font-semibold">
          Su sonido invita a cerrar los ojos, conectar y simplemente sentir.
        </p>
        <a
          href="#contacto"
          className="inline-flex items-center gap-[10px] px-[26px] py-[14px] rounded-full border border-[var(--line)] text-txt no-underline font-semibold text-[15px] transition-all duration-300 hover:border-accent hover:bg-white/[.04] hover:-translate-y-[2px]"
        >
          Trabajemos juntos →
        </a>
      </div>
    </section>
  );
}
