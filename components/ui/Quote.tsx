import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type QuoteProps = {
  children: ReactNode;
  className?: string;
};

/** The narrator voice — light italic Newsreader. Reserved for the big moments. */
export default function Quote({ children, className }: QuoteProps) {
  return (
    <p
      className={cn(
        'text-balance font-serif text-[clamp(1.5rem,2.8vw,2.2rem)] font-light italic leading-[1.25] text-ink/70',
        className,
      )}
    >
      {children}
    </p>
  );
}
