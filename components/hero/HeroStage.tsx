'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { useIntroReveal } from '@/lib/introReveal';

const NovCanvas = dynamic(() => import('@/components/hero/NovCanvas'), { ssr: false });

/**
 * Staged hero entrance: for the first ~5s (or until first scroll — see
 * lib/introReveal.tsx), only the word exists. Then the frame — timecodes,
 * subline, thesis — arrives, staggered. The DOM word stays in the document
 * for SEO/screen readers; when the canvas takes over it fades to invisible.
 * With reduced motion or no WebGL, the DOM word simply remains — same
 * composition, no motion.
 */
export default function HeroStage({
  children,
}: {
  children: (state: { canvasReady: boolean; staged: boolean }) => React.ReactNode;
}) {
  const [mountCanvas, setMountCanvas] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const staged = useIntroReveal();

  // The canvas is atmosphere, not content: it boots on the visitor's
  // first gesture (pointer, scroll, touch, key) — a response to
  // presence, and it keeps three.js out of the loading window
  // entirely. The DOM word is always the base experience.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const events: (keyof WindowEventMap)[] = ['pointermove', 'scroll', 'touchstart', 'keydown'];
    const boot = () => {
      events.forEach((e) => window.removeEventListener(e, boot));
      setMountCanvas(true);
    };
    events.forEach((e) => window.addEventListener(e, boot, { passive: true, once: false }));
    return () => events.forEach((e) => window.removeEventListener(e, boot));
  }, []);

  return (
    <>
      {mountCanvas && <NovCanvas onReady={() => setCanvasReady(true)} />}
      {children({ canvasReady, staged })}
    </>
  );
}

/**
 * Opacity-only crossfade is the site's default motion contract (see
 * docs/04-motion-system.md) — this component is the one deliberate,
 * scoped exception: the hero's frame elements rise a few pixels as they
 * arrive, so the first "inevitable" appearance reads as settling into
 * place rather than a flat fade. Nowhere else in the site translates.
 */
export function Staged({
  show,
  delay = 0,
  rise = false,
  className,
  children,
}: {
  show: boolean;
  delay?: number;
  rise?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'transition-[opacity,transform] duration-[1400ms] ease-fade',
        show ? 'translate-y-0 opacity-100' : rise ? 'translate-y-3 opacity-0' : 'opacity-0',
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
