import Container from '@/components/ui/Container';
import InstagramLink from '@/components/ui/InstagramLink';

const socialLinks = [
  { label: 'SoundCloud', href: 'https://soundcloud.com/novnovnovnovnovnovnov' },
  { label: 'YouTube', href: 'https://youtube.com/@novnovnovnovnovnovnov' },
  { label: 'WhatsApp', href: 'https://wa.me/5491132102111' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-6 font-mono text-[10px] tracking-[0.18em] text-ink/55">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span>34.6°S 58.4°W — Buenos Aires, Argentina</span>
          <div className="flex items-center gap-6">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/55 no-underline transition-colors duration-hover ease-fade hover:text-red-bright"
              >
                {label}
              </a>
            ))}
            <InstagramLink />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-ink/45">
          <span>© {new Date().getFullYear()} NOV — All rights reserved</span>
          <a
            href="https://wa.me/5491132102111"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/45 no-underline transition-colors duration-hover ease-fade hover:text-red-bright [font-variant-numeric:tabular-nums]"
          >
            +54 9 11 3210-2111
          </a>
        </div>
      </Container>
    </footer>
  );
}
