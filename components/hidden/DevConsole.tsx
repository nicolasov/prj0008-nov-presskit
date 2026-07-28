'use client';

import { useEffect } from 'react';
import { LINKS } from '@/lib/config/links';

/** For whoever opens the console — the same restraint as everything else. */
export default function DevConsole() {
  useEffect(() => {
    console.log(
      `%cNOV%c\n34.6°S 58.4°W — Buenos Aires\nNot playing tracks. Curating journeys.\n\nIf you build things too: ${LINKS.bookingEmail}`,
      'font-size:26px;font-weight:300;letter-spacing:0.08em;color:#EAEAE6;font-family:Georgia,serif;',
      'font-size:12px;line-height:1.7;color:#9A958B;font-family:ui-monospace,Menlo,monospace;',
    );
  }, []);

  return null;
}
