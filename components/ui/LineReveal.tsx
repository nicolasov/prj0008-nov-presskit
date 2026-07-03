'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Editorial line-setting: copy arrives one line at a time, each rising from
 * behind a mask, never a whole block fading at once. Reference in spirit:
 * tympanus ScrollTextMotion — reinterpreted, calmer. Lines are authored
 * short (see the copy in lib/i18n.tsx) so this reads as typesetting, not
 * animation. Reduced motion shows everything at once.
 */
export default function LineReveal({
  lines,
  className,
  lineClassName,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-ln]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((it) => it.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          items.forEach((it, idx) => {
            it.style.transitionDelay = `${idx * 140}ms`;
            it.classList.add('in');
          });
          io.disconnect();
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} data-ln className={cn('line-reveal block', lineClassName)}>
          {line}
        </span>
      ))}
    </div>
  );
}
