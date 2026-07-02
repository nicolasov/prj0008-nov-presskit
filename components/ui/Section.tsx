import type { ReactNode } from 'react';
import Container from '@/components/ui/Container';
import { cn } from '@/lib/utils';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Skip the Container wrap for full-bleed content (e.g. the gallery). */
  bleed?: boolean;
  /** Stagger index consumed by RevealEngine — later sections fade in later. */
  fxIndex?: number;
};

export default function Section({ id, children, className, bleed, fxIndex = 0 }: SectionProps) {
  return (
    <section
      id={id}
      data-fx
      data-fx-index={fxIndex}
      className={cn('py-[var(--space-section)]', className)}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
