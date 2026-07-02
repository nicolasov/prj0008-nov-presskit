'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const NovCanvas = dynamic(() => import('@/components/hero/NovCanvas'), { ssr: false });

/**
 * Staged hero entrance: smoke → NOV (canvas) → subtitle → frame labels.
 * The DOM word stays in the document for SEO/screen readers; when the
 * canvas takes over it fades to invisible. With reduced motion or no
 * WebGL, the DOM word simply remains — same composition, no motion.
 */
export default function HeroStage({
  children,
}: {
  children: (state: { canvasReady: boolean; staged: boolean }) => React.ReactNode;
}) {
  const [mountCanvas, setMountCanvas] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [staged, setStaged] = useState(false);

  // The canvas is atmosphere, not content: it boots on the visitor's
  // first gesture (pointer, scroll, touch, key) — a response to
  // presence, and it keeps three.js out of the loading window
  // entirely. The DOM word is always the base experience.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStaged(true);
      return;
    }
    const events: (keyof WindowEventMap)[] = ['pointermove', 'scroll', 'touchstart', 'keydown'];
    const boot = () => {
      events.forEach((e) => window.removeEventListener(e, boot));
      setMountCanvas(true);
    };
    events.forEach((e) => window.addEventListener(e, boot, { passive: true, once: false }));
    return () => events.forEach((e) => window.removeEventListener(e, boot));
  }, []);

  useEffect(() => {
    if (!canvasReady) return;
    // subtitle and frame labels enter once the word has begun developing
    const id = setTimeout(() => setStaged(true), 1800);
    return () => clearTimeout(id);
  }, [canvasReady]);

  useEffect(() => {
    // failsafe: never leave the hero half-staged (slow font, blocked GL)
    const id = setTimeout(() => setStaged(true), 4500);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {mountCanvas && <NovCanvas onReady={() => setCanvasReady(true)} />}
      {children({ canvasReady, staged })}
    </>
  );
}

/** Opacity-only stage transition — the crossfade contract, in DOM. */
export function Staged({
  show,
  delay = 0,
  className,
  children,
}: {
  show: boolean;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn('transition-opacity duration-[1400ms] ease-fade', show ? 'opacity-100' : 'opacity-0', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
