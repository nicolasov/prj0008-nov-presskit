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
      className="mx-auto max-w-[1240px] px-[clamp(18px,4vw,40px)] py-[clamp(52px,8vw,104px)]"
    >
      <div className="mb-[clamp(26px,4vw,44px)] grid gap-5 md:grid-cols-[0.7fr_1fr] md:items-end">
        <div>
          <p className="section-kicker">Booth History</p>
          <h2 className="section-title max-w-[9ch]">Trusted in serious rooms.</h2>
        </div>
        <p className="m-0 max-w-[52ch] text-[15.5px] leading-[1.85] text-[var(--mut)]">
          NOV has performed across Buenos Aires and the Argentine coast, sharing the booth
          with artists who shaped the progressive and deep electronic language of the region.
        </p>
      </div>
      <div
        className="flex flex-wrap border-y border-[var(--line)] py-[clamp(22px,4vw,44px)] font-editorial text-[var(--txt)]"
        style={{
          gap: '16px clamp(24px,4vw,52px)',
          fontSize: 'clamp(1.7rem,4.4vw,4.8rem)',
          lineHeight: 1,
        }}
      >
        {artists.map((name) => (
          <span
            key={name}
            className="cursor-default text-[var(--mut)] transition-colors duration-300 hover:text-[var(--txt)]"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
