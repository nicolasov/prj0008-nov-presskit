const navLinks = [
  { label: 'Room', href: '#room' },
  { label: 'Dossier', href: '#bio' },
  { label: 'Sound', href: '#sonido' },
  { label: 'Press', href: '#press' },
  { label: 'Booking', href: '#contacto' },
];

const socialLinks = [
  { label: 'SoundCloud', href: 'https://soundcloud.com/novnovnovnovnovnovnov' },
  { label: 'YouTube', href: 'https://youtube.com/@novnovnovnovnovnovnov' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--line)] px-[clamp(18px,4vw,40px)] py-[clamp(34px,5vw,60px)]">
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[1fr_auto_auto]">
        <div>
          <a href="#top" className="font-archivo text-[18px] font-semibold tracking-[.34em] text-[var(--txt)] no-underline">
            NOV
          </a>
          <p className="mt-5 max-w-[34ch] text-[14.5px] leading-[1.7] text-[var(--mut)]">
            Official presskit for a Buenos Aires DJ and producer creating deep,
            hypnotic and emotionally evolving sets.
          </p>
        </div>

        <div className="grid gap-3">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--mut2)]">Index</span>
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} className="quiet-link text-[14px]">
              {label}
            </a>
          ))}
        </div>

        <div className="grid gap-3">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--mut2)]">Listen</span>
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="quiet-link text-[14px]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1240px] flex-wrap justify-between gap-3 border-t border-[var(--line)] pt-6 text-[12px] uppercase tracking-[0.18em] text-[var(--mut2)]">
        <span>© 2026 NOV</span>
        <span>Buenos Aires, Argentina</span>
      </div>
    </footer>
  );
}
