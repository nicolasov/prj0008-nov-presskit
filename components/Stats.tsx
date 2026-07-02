const stats = [
  { value: '01', label: 'Private listening room' },
  { value: '02', label: 'Emotional progressive journeys' },
  { value: '03', label: 'Fresh selection for every date' },
];

export default function Stats() {
  return (
    <section
      id="room"
      data-reveal=""
      className="mx-auto max-w-[1240px] px-[clamp(18px,4vw,40px)] py-[clamp(28px,4vw,54px)]"
    >
      <div
        className="grid gap-px border-y border-[var(--line)] bg-[var(--line)]"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}
      >
        {stats.map(({ value, label }) => (
          <div key={label} className="bg-[var(--bg)] px-5 py-7">
            <div className="font-editorial text-[clamp(2.8rem,6vw,5.2rem)] leading-none text-[var(--txt)]">
              {value}
            </div>
            <div className="mt-5 max-w-[20ch] text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--mut)]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
