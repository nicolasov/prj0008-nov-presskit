const assets = [
  {
    title: 'Portraits',
    meta: 'High-resolution studio press photos',
    href: '/images/book-1.png',
  },
  {
    title: 'Live Still',
    meta: 'Dark booth photography for flyers and editorial use',
    href: '/images/nov-stage.jpg',
  },
  {
    title: 'Artist Mark',
    meta: 'NOV stage image and identity reference',
    href: '/images/nov-hero.jpg',
  },
];

const details = [
  ['Origin', 'Buenos Aires, Argentina'],
  ['Sound', 'Progressive House, Deep House, Hypnotic Groove'],
  ['Set Philosophy', 'Fresh music selected before every performance'],
  ['Booking', 'Clubs, listening rooms, private and coastal dates'],
];

export default function PressAssets() {
  return (
    <section
      id="press"
      className="mx-auto grid max-w-[1240px] gap-[clamp(34px,6vw,84px)] px-[clamp(18px,4vw,40px)] py-[clamp(64px,9vw,124px)] md:grid-cols-[0.86fr_1.14fr]"
    >
      <div data-reveal="">
        <p className="section-kicker">Press Dossier</p>
        <h2 className="section-title max-w-[9ch]">Everything needed, nothing loud.</h2>
        <p className="mt-6 max-w-[48ch] text-[15.5px] leading-[1.8] text-[var(--mut)]">
          A compact set of assets and facts for promoters, agencies and booking managers.
          The material is designed to stay quiet, flexible and premium across club flyers,
          editorial mentions and private invitations.
        </p>
      </div>

      <div data-reveal="" className="grid gap-8">
        <div className="grid gap-px border border-[var(--line)] bg-[var(--line)]">
          {details.map(([label, value]) => (
            <div
              key={label}
              className="grid gap-3 bg-[var(--bg)] px-[clamp(18px,3vw,28px)] py-5 sm:grid-cols-[150px_1fr]"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--mut2)]">
                {label}
              </span>
              <span className="text-[15px] leading-[1.65] text-[var(--txt)]">{value}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {assets.map((asset) => (
            <a
              key={asset.title}
              href={asset.href}
              download
              className="group min-h-[158px] border border-[var(--line)] bg-[var(--surface)] p-5 text-[var(--txt)] no-underline transition duration-300 hover:border-[var(--silver)] hover:bg-[var(--surface2)]"
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--mut2)]">
                Download
              </span>
              <h3 className="mt-8 font-archivo text-[18px] font-semibold uppercase tracking-[0.04em]">
                {asset.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-[var(--mut)]">{asset.meta}</p>
              <span className="mt-6 inline-flex text-[14px] text-[var(--silver)] transition group-hover:translate-x-1">
                Save file
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
