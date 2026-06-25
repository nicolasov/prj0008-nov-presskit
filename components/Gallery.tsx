import Image from 'next/image';

const photos = [
  { src: '/images/nov-bali-1.png', alt: 'NOV en Bali', span: 'col-span-2 row-span-2' },
  { src: '/images/book-1.png', alt: 'NOV — foto de prensa' },
  { src: '/images/book-2.png', alt: 'NOV — foto de prensa' },
  { src: '/images/nov-bali-2.png', alt: 'NOV en Bali 2', span: 'col-span-2' },
  { src: '/images/book-3.png', alt: 'NOV — foto de prensa' },
  { src: '/images/book-4.png', alt: 'NOV — foto de prensa' },
  { src: '/images/nov-00-90.jpg', alt: 'NOV — preskit 00-90' },
];

export default function Gallery() {
  return (
    <section className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,90px)]">
      <div data-reveal="" className="mb-[clamp(36px,4vw,56px)]">
        <div className="w-[46px] h-[3px] bg-accent mb-[22px]" />
        <h2
          className="font-archivo font-black uppercase tracking-[-0.01em] m-0"
          style={{ fontSize: 'clamp(1.9rem,4.2vw,3rem)' }}
        >
          Galería
        </h2>
      </div>

      <div
        data-reveal=""
        className="grid gap-3"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gridAutoRows: '220px',
        }}
      >
        {photos.map(({ src, alt, span }) => (
          <div
            key={src}
            className={`relative overflow-hidden rounded-[6px] bg-card group ${span ?? ''}`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              quality={75}
              className="object-cover object-center transition-transform duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(10,9,8,.5), transparent 50%)' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
