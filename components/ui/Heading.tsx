import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HeadingProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/** The structure voice — Archivo, section titles and headers. Never serif. */
export default function Heading({ as: Tag = 'h2', children, className }: HeadingProps) {
  return (
    <Tag
      className={cn(
        'text-balance font-archivo text-[clamp(1.9rem,4.2vw,3.1rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ink',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
