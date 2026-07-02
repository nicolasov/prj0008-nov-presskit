import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BackgroundProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * Full-bleed atmosphere layer behind a section's content. Ships as a
 * near-invisible vignette (≤6% delta, per the motion system). The hero's
 * WebGL smoke/ink treatment is deferred — it will render inside this same
 * slot once built, so sections don't need to change to adopt it.
 */
export default function Background({ children, className }: BackgroundProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(120% 90% at 30% 20%, rgba(255,255,255,0.03) 0%, transparent 55%)',
        }}
      />
      {children}
    </div>
  );
}
