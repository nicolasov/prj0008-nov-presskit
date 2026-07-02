'use client';

import { useState } from 'react';

const SC_PROFILE = 'https://soundcloud.com/novnovnovnovnovnovnov';
const YT_CHANNEL = 'https://youtube.com/@novnovnovnovnovnovnov';

const SC_EMBED = `https://w.soundcloud.com/player/?url=${encodeURIComponent(SC_PROFILE)}&color=%23C9C4BA&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

export default function MusicPlayer() {
  const [scLoaded, setScLoaded] = useState(false);

  return (
    <section
      id="escuchar"
      className="mx-auto max-w-[1240px] px-[clamp(18px,4vw,40px)] py-[clamp(74px,10vw,132px)]"
    >
      <div data-reveal="" className="mb-[clamp(34px,5vw,62px)] grid gap-7 md:grid-cols-[0.72fr_1fr] md:items-end">
        <div>
          <p className="section-kicker">Listening Room</p>
          <h2 className="section-title max-w-[8ch]">Enter through sound.</h2>
        </div>
        <div className="grid gap-5 md:justify-items-end">
          <p className="m-0 max-w-[56ch] text-[16px] leading-[1.85] text-[var(--mut)] md:text-right">
            Listen before reading. The presskit is built around the same principle as the set:
            fewer signals, deeper attention.
          </p>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href={SC_PROFILE} target="_blank" rel="noopener noreferrer" className="ghost-button">
              SoundCloud
            </a>
            <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" className="ghost-button">
              YouTube
            </a>
          </div>
        </div>
      </div>

      <div
        data-reveal=""
        className="sc-player relative min-h-[420px] overflow-hidden border border-[var(--line)] bg-[var(--surface)]"
      >
        {!scLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-[var(--surface)]">
            <div className="h-12 w-12 border border-[var(--line)]" />
            <p className="m-0 text-[11px] uppercase tracking-[0.22em] text-[var(--mut2)]">
              Loading signal
            </p>
          </div>
        )}
        <iframe
          src={SC_EMBED}
          width="100%"
          height="420"
          allow="autoplay"
          title="NOV on SoundCloud"
          className="h-full w-full border-none"
          onLoad={() => setScLoaded(true)}
          loading="lazy"
        />
      </div>
    </section>
  );
}
