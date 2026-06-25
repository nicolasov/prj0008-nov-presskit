const genres = [
  {
    num: '01',
    name: 'Progressive House',
    desc: 'Viajes largos y envolventes que construyen tensión y la liberan en el momento justo.',
  },
  {
    num: '02',
    name: 'Deep & Organic',
    desc: 'Grooves cálidos y orgánicos que invitan a moverse sin apuro, con alma y textura.',
  },
  {
    num: '03',
    name: 'Ambient & Downtempo',
    desc: 'Atmósferas para abrir o cerrar una noche, donde la emoción toma todo el control.',
  },
];

export default function Genres() {
  return (
    <section
      id="sonido"
      className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,90px)]"
    >
      <div data-reveal="" className="text-center mb-[clamp(40px,5vw,64px)]">
        <div className="w-[46px] h-[3px] bg-accent mx-auto mb-[22px]" />
        <h2
          className="font-archivo font-black uppercase tracking-[-0.01em] m-0"
          style={{ fontSize: 'clamp(1.9rem,4.2vw,3rem)' }}
        >
          Géneros
        </h2>
      </div>

      <div className="border-t border-[var(--line)]">
        {genres.map(({ num, name, desc }) => (
          <div
            key={num}
            data-reveal=""
            className="genre-row flex flex-wrap items-center gap-[18px] px-[clamp(6px,2vw,20px)] py-[clamp(22px,3vw,34px)] border-b border-[var(--line)] cursor-default transition-all duration-[350ms]"
          >
            <span className="font-archivo text-[var(--mut2)] text-[14px] w-[34px]">{num}</span>
            <h3
              className="font-archivo font-black uppercase m-0 flex-none"
              style={{ fontSize: 'clamp(1.3rem,2.4vw,1.9rem)', width: 'min(100%, 250px)' }}
            >
              {name}
            </h3>
            <p
              className="text-[var(--mut)] text-[15px] m-0 leading-[1.6]"
              style={{ flex: '1 1 280px', maxWidth: '54ch' }}
            >
              {desc}
            </p>
            <span className="genre-arrow grid place-items-center w-[44px] h-[44px] rounded-full border border-[var(--line)] text-txt flex-none transition-all duration-300">
              ↗
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
