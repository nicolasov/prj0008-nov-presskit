import Image from 'next/image';

const photos = [
  { src: '/images/nov-stage.jpg', alt: 'NOV in a dark booth', label: 'Booth / Night' },
  { src: '/images/book-1.png', alt: 'NOV studio portrait', label: 'Press Portrait I' },
  { src: '/images/book-2.png', alt: 'NOV press portrait', label: 'Press Portrait II' },
  { src: '/images/nov-00-90.jpg', alt: 'NOV editorial still', label: 'Editorial Still' },
  { src: '/images/book-3.png', alt: 'NOV profile portrait', label: 'Press Portrait III' },
  { src: '/images/nov-hero.jpg', alt: 'NOV stage identity', label: 'Stage Signal' },
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-[1240px] px-[clamp(18px,4vw,40px)] py-[clamp(70px,9vw,124px)]">
      <div data-reveal="" className="mb-[clamp(38px,5vw,64px)] grid gap-7 md:grid-cols-[0.8fr_1fr] md:items-end">
        <div>
          <p className="section-kicker">Press Stills</p>
          <h2 className="section-title max-w-[8ch]">Images that stay quiet.</h2>
        </div>
        <p className="m-0 max-w-[56ch] text-[16px] leading-[1.85] text-[var(--mut)]">
          Visual material for flyers, announcements and editorial mentions. The treatment is
          intentionally restrained: black, graphite, silver and negative space.
        </p>
      </div>

      <div
        data-reveal=""
        className="grid gap-3"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
          gridAutoRows: 'minmax(280px, 34vw)',
        }}
      >
        {photos.map(({ src, alt, label }, index) => (
          <a
            key={src}
            href={src}
            download
            className={`group relative overflow-hidden border border-[var(--line)] bg-[var(--surface)] text-[var(--txt)] no-underline ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              quality={80}
              className="monochrome-image object-cover object-center transition duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.025] group-hover:brightness-[.88]"
              sizes={index === 0 ? '(max-width: 768px) 100vw, 620px' : '(max-width: 768px) 100vw, 320px'}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(2,2,2,.74))]" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-4 border-t border-[var(--line)] bg-[rgba(2,2,2,.62)] px-4 py-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--mut)]">{label}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--mut2)]">Download</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
