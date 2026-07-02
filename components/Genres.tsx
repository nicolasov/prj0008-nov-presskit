const movements = [
  {
    num: 'I',
    name: 'Progressive House',
    desc: 'Long arcs, patient pressure and melodic tension that opens without forcing the room.',
  },
  {
    num: 'II',
    name: 'Deep House',
    desc: 'Warm low-end, intimate swing and a restrained emotional language built for late hours.',
  },
  {
    num: 'III',
    name: 'Hypnotic Groove',
    desc: 'Repetition as magnetism: organic evolution, small details and a body-led pulse.',
  },
  {
    num: 'IV',
    name: 'Atmospheric Journeys',
    desc: 'A cinematic sense of pacing, where silence and space matter as much as the drop.',
  },
];

export default function Genres() {
  return (
    <section
      id="sonido"
      className="mx-auto max-w-[1240px] px-[clamp(18px,4vw,40px)] py-[clamp(70px,9vw,124px)]"
    >
      <div data-reveal="" className="mb-[clamp(40px,6vw,74px)] grid gap-7 md:grid-cols-[0.7fr_1fr] md:items-end">
        <div>
          <p className="section-kicker">Sound Architecture</p>
          <h2 className="section-title max-w-[8ch]">How the room opens.</h2>
        </div>
        <p className="m-0 max-w-[58ch] text-[16px] leading-[1.85] text-[var(--mut)]">
          The set is approached as a controlled emotional curve: first the room is
          quieted, then the groove takes shape, tension rises almost invisibly, and
          the release arrives when the floor is ready for it.
        </p>
      </div>

      <div className="border-t border-[var(--line)]">
        {movements.map(({ num, name, desc }) => (
          <article
            key={name}
            data-reveal=""
            className="group grid gap-5 border-b border-[var(--line)] py-[clamp(26px,4vw,46px)] transition duration-300 md:grid-cols-[90px_minmax(220px,.7fr)_1fr]"
          >
            <span className="font-editorial text-[clamp(2rem,4vw,3.4rem)] leading-none text-[var(--mut2)] transition group-hover:text-[var(--silver)]">
              {num}
            </span>
            <h3 className="m-0 font-archivo text-[clamp(1.1rem,2vw,1.55rem)] font-semibold uppercase tracking-[0.08em] text-[var(--txt)]">
              {name}
            </h3>
            <p className="m-0 max-w-[64ch] text-[15px] leading-[1.75] text-[var(--mut)]">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
