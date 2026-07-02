import Container from '@/components/ui/Container';
import InstagramLink from '@/components/ui/InstagramLink';

const socialLinks = [
  { label: 'SoundCloud', href: 'https://soundcloud.com/novnovnovnovnovnovnov' },
  { label: 'YouTube', href: 'https://youtube.com/@novnovnovnovnovnovnov' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.18em] text-ink/55">
        <span>34.6°S 58.4°W</span>
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
        <span>© {new Date().getFullYear()} NOV</span>
      </Container>
    </footer>
  );
}
