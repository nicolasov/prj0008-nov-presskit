'use client';

import { useEffect, useRef, useState } from 'react';

const links = [
  { label: 'Bio', href: '#bio' },
  { label: 'Sonido', href: '#sonido' },
  { label: 'Fechas', href: '#fechas' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const lastYRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const header = headerRef.current;
    const progress = progressRef.current;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight || 1;
        const pct = Math.max(0, Math.min(1, y / max));

        if (progress) progress.style.width = `${(pct * 100).toFixed(2)}%`;

        if (header) {
          const goingDown = y > lastYRef.current + 2;
          const goingUp = y < lastYRef.current - 2;
          if (y > 140 && goingDown) {
            header.style.transform = 'translateY(-100%)';
          } else if (goingUp || y <= 140) {
            header.style.transform = 'translateY(0)';
          }
          header.style.background =
            y > 40 ? 'rgba(10,9,8,.82)' : 'rgba(10,9,8,.55)';
        }
        lastYRef.current = y;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setNavOpen(false);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--line)] transition-[transform,background] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] will-change-transform"
      style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', background: 'rgba(10,9,8,.55)' }}
    >
      {/* Progress bar */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute left-0 -bottom-px h-[2px] w-0 bg-accent"
        style={{ boxShadow: '0 0 12px rgba(224,70,58,.6)', transition: 'width 0.1s linear' }}
      />

      <nav className="max-w-[1240px] mx-auto flex items-center justify-between gap-5 px-[clamp(18px,4vw,40px)] py-4">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-[11px] no-underline text-txt">
          <span className="font-archivo font-black tracking-[.32em] text-[18px]">NOV</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden nav:flex items-center gap-[34px]">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-[var(--mut)] no-underline text-[14.5px] font-medium transition-colors duration-[250ms] hover:text-txt"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-[22px] py-[11px] rounded-full border border-[var(--line)] text-txt no-underline text-sm font-semibold transition-all duration-300 hover:border-accent hover:bg-white/[.04] hover:-translate-y-px"
          >
            Contactar
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setNavOpen((o) => !o)}
          aria-label={navOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={navOpen}
          className="nav:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
        >
          <span
            className="block w-6 h-[2px] bg-txt transition-transform duration-300"
            style={navOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}}
          />
          <span
            className="block w-6 h-[2px] bg-txt transition-opacity duration-300"
            style={navOpen ? { opacity: 0 } : {}}
          />
          <span
            className="block w-4 h-[2px] bg-txt transition-transform duration-300"
            style={navOpen ? { width: '24px', transform: 'translateY(-7px) rotate(-45deg)' } : {}}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={`nav:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] ${navOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(10,9,8,.96)', borderTop: navOpen ? '1px solid var(--line)' : 'none' }}
      >
        <div className="px-[clamp(18px,4vw,40px)] pt-4 pb-8 flex flex-col gap-1">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="text-txt no-underline font-archivo font-bold text-[22px] py-3 hover:text-accent transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={close}
            className="mt-3 text-center py-[14px] rounded-full bg-accent text-white no-underline font-bold text-[15px]"
          >
            Contactar
          </a>
        </div>
      </div>
    </header>
  );
}
