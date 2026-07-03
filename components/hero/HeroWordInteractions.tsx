'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

const WHISPER_KEY = 'nov-whisper-seen';

/**
 * Wraps the hero word with two quiet, connected details:
 * - a small ring cursor that follows the pointer with a physical lag
 *   (same lerp language as the shader's mouse response), replacing the
 *   system cursor only over the word;
 * - a long-press (~650ms) that whispers the manifesto line once per
 *   session, then never again — sessionStorage, not a toggle.
 * No click affordance, no hint that either exists.
 */
export default function HeroWordInteractions({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const pressTimer = useRef<number>(undefined);

  const [hovering, setHovering] = useState(false);
  const [whisper, setWhisper] = useState(false);

  useEffect(() => {
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const endPress = () => window.clearTimeout(pressTimer.current);

  const startPress = () => {
    if (sessionStorage.getItem(WHISPER_KEY)) return;
    pressTimer.current = window.setTimeout(() => {
      sessionStorage.setItem(WHISPER_KEY, '1');
      setWhisper(true);
      window.setTimeout(() => setWhisper(false), 2600);
    }, 650);
  };

  return (
    <div
      ref={wrapRef}
      className="relative select-none"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => {
        setHovering(false);
        endPress();
      }}
      onPointerMove={onMove}
      onPointerDown={startPress}
      onPointerUp={endPress}
      style={hovering ? { cursor: 'none' } : undefined}
    >
      {children}

      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-9 w-9 rounded-full border border-ink/40 transition-opacity duration-500 ease-fade"
        style={{ opacity: hovering ? 1 : 0 }}
      />

      <p
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-full mt-6 -translate-x-1/2 whitespace-nowrap font-serif text-[13px] font-light italic text-ink/55 transition-opacity duration-[1400ms] ease-fade ${
          whisper ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Not playing tracks. Curating journeys.
      </p>
    </div>
  );
}
