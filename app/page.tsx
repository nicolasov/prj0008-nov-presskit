'use client';

import { useEffect } from 'react';
import { LINKS } from '@/lib/config/links';
import { buildRedirectUrl, CLIENT_REDIRECT_DELAY_MS } from '@/lib/config/redirect';

export default function Home() {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      window.location.replace(buildRedirectUrl(LINKS.defaultDestination, window.location.search));
    }, CLIENT_REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] text-[11px] uppercase tracking-[0.24em] text-ink/45">
      Redirecting...
    </main>
  );
}
