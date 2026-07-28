import Link from 'next/link';

/**
 * Note: this covers page routes. A root path that falls through to the redirect
 * layer (app/[slug]) returns a bare 404 Response instead, because a Route
 * Handler returns Responses, not UI. That is a known consequence of routing
 * every redirect through a handler — recorded in docs/DECISIONS.md.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-bg-0 px-6 text-center">
      <p className="font-[family-name:var(--font-newsreader)] text-[clamp(3rem,12vw,7rem)] font-light leading-none tracking-[0.06em] text-ink">
        404
      </p>
      <p className="text-[11px] uppercase tracking-[0.24em] text-ink/45">
        Esta página no existe
      </p>
      <Link
        href="/"
        className="text-[11px] uppercase tracking-[0.24em] text-ink/70 no-underline transition-colors duration-hover ease-fade hover:text-red-bright"
      >
        Volver
      </Link>
    </main>
  );
}
