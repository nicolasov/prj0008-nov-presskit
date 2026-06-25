const words = ['Groove', '✶', 'Depth', '✶', 'Emotion', '✶', 'Hypnotic', '✶', 'Soul', '✶'];

export default function Marquee() {
  return (
    <section
      aria-hidden="true"
      className="py-[clamp(34px,5vw,60px)] border-y border-[var(--line)] overflow-hidden"
    >
      <div className="flex w-max animate-marquee will-change-transform">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex items-center gap-[34px] pr-[34px] font-archivo font-black uppercase text-[var(--mut2)] tracking-[0.01em]"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}
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
