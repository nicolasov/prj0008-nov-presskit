'use client';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-bg-0 px-6 text-center">
      <p className="font-[family-name:var(--font-newsreader)] text-[clamp(2rem,8vw,4rem)] font-light leading-none tracking-[0.06em] text-ink">
        Algo se cortó
      </p>
      <button
        type="button"
        onClick={reset}
        className="cursor-pointer border-0 bg-transparent text-[11px] uppercase tracking-[0.24em] text-ink/70 transition-colors duration-hover ease-fade hover:text-red-bright"
      >
        Reintentar
      </button>
    </main>
  );
}
