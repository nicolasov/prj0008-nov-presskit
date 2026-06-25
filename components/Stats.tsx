const stats = [
  { value: '+15', label: 'Años como DJ' },
  { value: '100%', label: 'Selección renovada', accent: true },
];

export default function Stats() {
  return (
    <section
      data-reveal=""
      className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,40px)] py-[clamp(20px,4vw,46px)]"
    >
      <div
        className="grid gap-[clamp(20px,4vw,40px)] py-[clamp(26px,3vw,38px)] border-y border-[var(--line)]"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}
      >
        {stats.map(({ value, label, accent }) => (
          <div key={label} className="text-center">
            <div
              className="font-archivo font-black leading-none tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.4rem,4.4vw,3.4rem)', color: accent ? 'var(--accent)' : 'var(--txt)' }}
            >
              {value}
            </div>
            <div className="text-[var(--mut)] text-[14px] mt-2">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
