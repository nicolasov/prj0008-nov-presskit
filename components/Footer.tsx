const navLinks = [
  { label: 'Bio', href: '#bio' },
  { label: 'Sonido', href: '#sonido' },
  { label: 'Fechas', href: '#fechas' },
  { label: 'Contacto', href: '#contacto' },
];

const socialLinks = [
  { label: 'Spotify', href: '#' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/novnovnovnovnovnovnov' },
  { label: 'YouTube', href: 'https://youtube.com/@novnovnovnovnovnovnov' },
  { label: 'Instagram', href: '#' },
  { label: 'Beatport', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--line)] px-[clamp(18px,4vw,40px)] pt-[clamp(40px,5vw,64px)] pb-8">
      <div className="max-w-[1240px] mx-auto flex flex-wrap gap-[34px] justify-between">
        {/* Brand */}
        <div className="flex-[1_1_240px] min-w-[220px]">
          <div className="flex items-center gap-[11px] mb-4">
            <span className="grid place-items-center w-8 h-8 rounded-full border border-accent text-accent text-[13px]">
              ♫
            </span>
            <span className="font-archivo font-black tracking-[.32em] text-[17px]">NOV</span>
          </div>
          <p className="text-[var(--mut)] text-[14.5px] leading-[1.65] max-w-[34ch] m-0">
            DJ y productor de Buenos Aires. Atmósferas envolventes para cerrar los ojos y sentir.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-[clamp(40px,6vw,80px)]">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] tracking-[0.16em] uppercase text-[var(--mut2)] mb-1">
              Navegar
            </span>
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-[var(--mut)] no-underline text-[14.5px] transition-colors duration-[250ms] hover:text-txt"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[12px] tracking-[0.16em] uppercase text-[var(--mut2)] mb-1">
              Escuchar
            </span>
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-[var(--mut)] no-underline text-[14.5px] transition-colors duration-[250ms] hover:text-accent"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto mt-9 pt-6 border-t border-[var(--line)] flex flex-wrap gap-3 justify-between text-[var(--mut2)] text-[13px]">
        <span>© 2026 NOV. Todos los derechos reservados.</span>
        <span>Buenos Aires, Argentina</span>
      </div>
    </footer>
  );
}
