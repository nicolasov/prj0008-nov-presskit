import Image from 'next/image';

export default function Bio() {
  return (
    <section
      id="bio"
      className="mx-auto grid max-w-[1240px] gap-[clamp(38px,7vw,96px)] px-[clamp(18px,4vw,40px)] py-[clamp(74px,10vw,140px)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
    >
      <div
        data-reveal=""
        className="relative min-h-[520px] overflow-hidden border border-[var(--line)] bg-[var(--surface)]"
      >
        <Image
          src="/images/nov-bio.jpg"
          alt="NOV in the booth"
          fill
          quality={85}
          className="monochrome-image object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 520px"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(2,2,2,.74))]" />
        <div className="absolute bottom-0 left-0 right-0 flex justify-between gap-5 border-t border-[var(--line)] bg-[rgba(2,2,2,.74)] px-5 py-4 text-[10px] uppercase tracking-[0.2em] text-[var(--mut2)]">
          <span>Buenos Aires</span>
          <span>Selected Work</span>
        </div>
      </div>

      <div data-reveal="">
        <p className="section-kicker">Artist Dossier</p>
        <h2 className="section-title max-w-[10ch]">A slow build into depth.</h2>
        <div className="mt-[clamp(30px,4vw,46px)] grid gap-[clamp(22px,3vw,34px)] md:grid-cols-[1fr_1fr]">
          <p className="m-0 text-[16px] leading-[1.85] text-[var(--mut)]">
            NOV is a DJ and producer from Buenos Aires, shaped by progressive house,
            deep house, hypnotic groove and emotional storytelling. His sets avoid
            aggression; they build tension slowly, with an organic sense of evolution.
          </p>
          <p className="m-0 text-[16px] leading-[1.85] text-[var(--mut)]">
            Before every performance he carefully selects new music, keeping each night
            fresh and specific to the room. The result is less a playlist and more a
            guided atmospheric journey.
          </p>
        </div>

        <div className="mt-[clamp(34px,5vw,56px)] grid gap-4 border-t border-[var(--line)] pt-8 sm:grid-cols-2">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--mut2)]">
              Influences
            </span>
            <p className="mt-4 max-w-[32ch] text-[15px] leading-[1.8] text-[var(--txt)]">
              Guy J, Hernan Cattaneo, John Digweed, Simon Vuarambon and Sahar Z.
            </p>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--mut2)]">
              Shared Booths
            </span>
            <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.8] text-[var(--txt)]">
              Jimmy Van M, Popof, Martin Garcia, Fernando Ferreyra, Carlos Alfonsin
              and Nicolas Rada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
