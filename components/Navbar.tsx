'use client';

import { useEffect, useRef, useState } from 'react';

const links = [
  { label: 'Room', href: '#room' },
  { label: 'Dossier', href: '#bio' },
  { label: 'Sound', href: '#sonido' },
  { label: 'Press', href: '#press' },
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
            y > 40 ? 'rgba(2,2,2,.84)' : 'rgba(2,2,2,.42)';
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
      className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--line)] transition-[transform,background] duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] will-change-transform"
      style={{ backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', background: 'rgba(2,2,2,.42)' }}
    >
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute -bottom-px left-0 h-px w-0 bg-[var(--silver)]"
        style={{ boxShadow: '0 0 14px rgba(238,234,226,.28)', transition: 'width 0.1s linear' }}
      />

      <nav className="max-w-[1240px] mx-auto flex items-center justify-between gap-5 px-[clamp(18px,4vw,40px)] py-4">
        <a href="#top" className="flex items-center gap-4 no-underline text-txt">
          <span className="font-archivo text-[18px] font-semibold tracking-[.34em]">NOV</span>
          <span className="hidden h-px w-8 bg-[var(--line)] sm:block" />
          <span className="hidden text-[11px] uppercase tracking-[0.22em] text-[var(--mut2)] sm:block">
            Official Presskit
          </span>
        </a>

        <div className="hidden nav:flex items-center gap-[34px]">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="quiet-link text-[12px] font-bold uppercase tracking-[0.16em]"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            className="border border-[var(--line)] px-[18px] py-[10px] text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--txt)] no-underline transition duration-300 hover:border-[var(--silver)] hover:bg-white/[.05]"
          >
            Booking
          </a>
        </div>

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
        style={{ background: 'rgba(2,2,2,.97)', borderTop: navOpen ? '1px solid var(--line)' : 'none' }}
      >
        <div className="px-[clamp(18px,4vw,40px)] pt-4 pb-8 flex flex-col gap-1">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="py-3 font-archivo text-[21px] font-semibold uppercase tracking-[0.08em] text-txt no-underline transition-colors duration-200 hover:text-[var(--silver)]"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={close}
            className="mt-3 border border-[var(--silver)] py-[14px] text-center text-[12px] font-extrabold uppercase tracking-[0.18em] text-[var(--txt)] no-underline"
          >
            Booking
          </a>
        </div>
      </div>
    </header>
  );
}
