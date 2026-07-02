import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';

const downloads = [
  { title: 'Portraits', meta: 'High-resolution studio press photos', format: 'ZIP · 24 MB', href: '/images/book-1.png' },
  { title: 'Live Still', meta: 'Dark booth photography for flyers and editorial use', format: 'JPG · 4.2 MB', href: '/images/nov-stage.jpg' },
  { title: 'Artist Mark', meta: 'NOV stage image and identity reference', format: 'JPG · 3.1 MB', href: '/images/nov-hero.jpg' },
];

const facts = [
  ['Origin', 'Buenos Aires, Argentina'],
  ['Sound', 'Progressive House, Deep House, Hypnotic Groove'],
  ['Set Philosophy', 'Fresh music selected before every performance'],
  ['Booking', 'Clubs, listening rooms, private and coastal dates'],
];

export default function PressKit() {
  return (
    <Section id="press-kit" fxIndex={0}>
      <Timecode tc="47:00" label="Press Kit" />
      <Heading as="h2" className="mt-6 max-w-[12ch]">
        Everything needed, nothing loud.
      </Heading>

      <div className="mt-10 flex flex-col border-t border-line">
        {facts.map(([label, value]) => (
          <div key={label} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[160px_1fr]">
            <span className="font-mono text-[10.5px] tracking-[0.16em] text-ink/45">{label}</span>
            <span className="text-[15px] leading-[1.65] text-ink">{value}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {downloads.map((item) => (
          <a
            key={item.title}
            href={item.href}
            download
            className="group flex min-h-[168px] flex-col justify-between border border-line-strong bg-bg-1 p-5 no-underline transition-colors duration-hover ease-fade hover:border-red"
          >
            <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45">{item.format}</span>
            <div>
              <h3 className="m-0 font-archivo text-[17px] font-medium text-ink">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-ink/70">{item.meta}</p>
            </div>
            <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45 transition-colors duration-hover ease-fade group-hover:text-red-bright">
              Download
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
