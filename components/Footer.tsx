import Container from '@/components/ui/Container';
import InstagramLink from '@/components/ui/InstagramLink';
import { LINKS } from '@/lib/config/links';

const socialLinks = [
  { label: 'SoundCloud', href: LINKS.soundcloud },
  { label: 'YouTube', href: LINKS.youtube },
  { label: 'WhatsApp', href: LINKS.whatsapp },
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
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-ink/55">
          <span>© {new Date().getFullYear()} NOV — All rights reserved</span>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/55 no-underline transition-colors duration-hover ease-fade hover:text-red-bright [font-variant-numeric:tabular-nums]"
          >
            +54 9 11 3210-2111
          </a>
        </div>
      </Container>
    </footer>
  );
}
