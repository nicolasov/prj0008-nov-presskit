'use client';

import { cn } from '@/lib/utils';

/**
 * Opacity-only crossfade is the site's default motion contract (see
 * docs/04-motion-system.md) — this component is the one deliberate,
 * scoped exception: the hero's frame elements rise a few pixels as they
 * arrive, so the first "inevitable" appearance reads as settling into
 * place rather than a flat fade. Nowhere else in the site translates on
 * entrance. Driven by the shared intro reveal (lib/introReveal.tsx).
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
