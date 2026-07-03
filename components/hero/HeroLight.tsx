'use client';

import { useEffect, useRef } from 'react';

/**
 * The hero's quiet second act. Once the interface has arrived, the black
 * around NOV becomes faintly aware of the cursor — a soft, slow pool of
 * light that trails the pointer, like a hand moving through a dark room.
 * Reinterprets the old cursor-ripple idea: no ripple, no splash — just
 * light and lag. Desktop pointers only, gone under reduced motion, and it
 * never appears during the opening silence.
 */
export default function HeroLight({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.5 });
  const pos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.parentElement?.getBoundingClientRect();
      if (!r) return;
      target.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    };
    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.06;
      pos.current.y += (target.current.y - pos.current.y) * 0.06;
      el.style.setProperty('--lx', `${(pos.current.x * 100).toFixed(2)}%`);
      el.style.setProperty('--ly', `${(pos.current.y * 100).toFixed(2)}%`);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-[2000ms] ease-fade ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        '--lx': '50%',
        '--ly': '50%',
        background:
          'radial-gradient(340px circle at var(--lx) var(--ly), rgba(234,234,230,0.05), transparent 70%)',
        mixBlendMode: 'screen',
      } as React.CSSProperties}
    />
  );
}
