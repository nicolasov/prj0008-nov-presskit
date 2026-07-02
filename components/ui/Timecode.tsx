import { cn } from '@/lib/utils';

type TimecodeProps = {
  tc: string;
  label?: string;
  active?: boolean;
  interactive?: boolean;
  className?: string;
};

/** The metadata voice — Geist Mono, tracked, tabular. Timecodes and kickers. */
export default function Timecode({ tc, label, active, interactive, className }: TimecodeProps) {
  return (
    <span
      className={cn(
        'font-mono text-[11px] tracking-[0.18em] transition-colors duration-hover ease-fade [font-variant-numeric:tabular-nums]',
        active ? 'text-red-bright' : 'text-ink/45',
        !active && interactive && 'hover:text-ink/70',
        className,
      )}
    >
      {label ? `${tc} — ${label.toUpperCase()}` : tc}
    </span>
  );
}
