import type { MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = {
  as?: 'a' | 'button';
  href?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'ghost';
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
};

const base =
  'inline-flex items-center gap-2 font-archivo text-[11px] font-medium uppercase tracking-[0.22em] no-underline transition-colors duration-hover ease-fade focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4';

const variants = {
  primary: 'border border-red px-5 py-[10px] text-red-bright hover:bg-red/10',
  ghost: 'text-ink/70 hover:text-red-bright',
};

export default function Button({
  as = 'a',
  href,
  type = 'button',
  variant = 'primary',
  children,
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (as === 'a') {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
