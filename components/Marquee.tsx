const words = ['Silence', '/', 'Depth', '/', 'Emotion', '/', 'Hypnotic Groove', '/', 'Fresh Selection', '/'];

export default function Marquee() {
  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-y border-[var(--line)] py-[clamp(28px,4vw,48px)]"
    >
      <div className="flex w-max animate-marquee will-change-transform">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex items-center gap-[34px] pr-[34px] font-editorial text-[var(--mut2)]"
            style={{ fontSize: 'clamp(1.9rem,4.6vw,4.8rem)' }}
          >
            {words.map((w, j) => (
              <span key={j}>{w}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
