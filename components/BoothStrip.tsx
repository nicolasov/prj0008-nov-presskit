const artists = [
  'Jimmy Van M',
  'Popof',
  'Martín García',
  'Nicolás Rada',
  'Fernando Ferreyra',
  'Carlos Alfonsin',
];

export default function BoothStrip() {
  return (
    <section
      data-reveal=""
      className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,40px)] pt-[clamp(20px,3vw,40px)] pb-[clamp(40px,6vw,80px)]"
    >
      <div className="text-center text-[var(--mut2)] text-[12.5px] tracking-[0.18em] uppercase mb-[22px]">
        Ha compartido cabina con
      </div>
      <div
        className="flex flex-wrap justify-center font-archivo font-bold uppercase text-[var(--mut)] tracking-[0.01em]"
        style={{
          gap: '18px clamp(26px,4vw,56px)',
          fontSize: 'clamp(1.35rem,2.9vw,2.1rem)',
        }}
      >
        {artists.map((name) => (
          <span
            key={name}
            className="transition-colors duration-300 hover:text-txt cursor-default"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
