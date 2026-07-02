'use client';

import { useLang, type Lang } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const LANGS: Lang[] = ['en', 'es'];

export default function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div className={cn('flex items-baseline gap-2 font-mono text-[10px] tracking-[0.18em]', className)}>
      {LANGS.map((code, i) => (
        <span key={code} className="flex items-baseline gap-2">
          {i > 0 && <span aria-hidden="true" className="text-ink/45">/</span>}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            className={cn(
              'border-none bg-transparent p-0 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-hover ease-fade focus-visible:outline focus-visible:outline-1 focus-visible:outline-red-bright focus-visible:outline-offset-4',
              lang === code ? 'text-ink' : 'cursor-pointer text-ink/55 hover:text-ink/70',
            )}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
