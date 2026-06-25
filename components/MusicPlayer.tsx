'use client';

import { useState } from 'react';

const SC_PROFILE = 'https://soundcloud.com/novnovnovnovnovnovnov';
const YT_CHANNEL = 'https://youtube.com/@novnovnovnovnovnovnov';

const SC_EMBED = `https://w.soundcloud.com/player/?url=${encodeURIComponent(SC_PROFILE)}&color=%23E0463A&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

// Add specific YouTube video IDs here when available
// e.g. 'dQw4w9WgXcQ'
const YT_VIDEOS: { id: string; title: string; date: string }[] = [
  // { id: 'VIDEO_ID_HERE', title: 'Set Name', date: 'Jun 2026' },
];

export default function MusicPlayer() {
  const [scLoaded, setScLoaded] = useState(false);

  return (
    <section
      id="escuchar"
      className="max-w-[1240px] mx-auto px-[clamp(18px,4vw,40px)] py-[clamp(48px,7vw,90px)]"
    >
      {/* SoundCloud */}
      <div data-reveal="" className="mb-[clamp(48px,6vw,80px)]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="w-[46px] h-[3px] bg-accent mb-[22px]" />
            <h2
              className="font-archivo font-black uppercase tracking-[-0.01em] m-0"
              style={{ fontSize: 'clamp(1.9rem,4.2vw,3rem)' }}
            >
              Escuchar
            </h2>
          </div>
          <a
            href={SC_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-[20px] py-[10px] rounded-full border border-[var(--line)] text-[var(--mut)] no-underline text-[14px] font-semibold transition-all duration-300 hover:border-accent hover:text-txt"
          >
            Ver en SoundCloud ↗
          </a>
        </div>

        <div className="sc-player relative rounded-[8px] overflow-hidden bg-card border border-[var(--line)]" style={{ height: '400px' }}>
          {!scLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
              <div className="grid place-items-center w-[56px] h-[56px] rounded-full bg-accent text-white text-[20px]">
                ▶
              </div>
              <p className="text-[var(--mut)] text-[14px] m-0">Cargando reproductor…</p>
            </div>
          )}
          <iframe
            src={SC_EMBED}
            width="100%"
            height="400"
            allow="autoplay"
            title="NOV en SoundCloud"
            className="border-none w-full h-full"
            onLoad={() => setScLoaded(true)}
            loading="lazy"
          />
        </div>
      </div>

      {/* YouTube videos */}
      <div data-reveal="">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="w-[46px] h-[3px] bg-accent mb-[22px]" />
            <h2
              className="font-archivo font-black uppercase tracking-[-0.01em] m-0"
              style={{ fontSize: 'clamp(1.9rem,4.2vw,3rem)' }}
            >
              Videos
            </h2>
          </div>
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-[20px] py-[10px] rounded-full border border-[var(--line)] text-[var(--mut)] no-underline text-[14px] font-semibold transition-all duration-300 hover:border-accent hover:text-txt"
          >
            Ver canal ↗
          </a>
        </div>

        {YT_VIDEOS.length > 0 ? (
          <div
            className="grid gap-[clamp(18px,2.4vw,28px)]"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
          >
            {YT_VIDEOS.map(({ id, title, date }) => (
              <YouTubeCard key={id} videoId={id} title={title} date={date} />
            ))}
          </div>
        ) : (
          <div className="bg-card border border-[var(--line)] rounded-[8px] p-[clamp(40px,6vw,80px)] text-center">
            <div className="grid place-items-center w-[64px] h-[64px] rounded-full border border-[var(--line)] text-[var(--mut2)] text-[24px] mx-auto mb-6">
              ▶
            </div>
            <p className="text-[var(--mut)] text-[16px] m-0 mb-4">
              Sets y videos disponibles en el canal de YouTube
            </p>
            <a
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[10px] px-[26px] py-[14px] rounded-[6px] bg-accent text-white no-underline font-bold text-[15px] transition-all duration-[350ms] hover:-translate-y-[3px] hover:shadow-[0_16px_40px_rgba(224,70,58,.3)] hover:bg-accent-hover"
            >
              Ver en YouTube ↗
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function YouTubeCard({ videoId, title, date }: { videoId: string; title: string; date: string }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="rounded-[8px] overflow-hidden bg-card border border-[var(--line)] group">
      <div className="relative cursor-pointer" style={{ aspectRatio: '16/9' }}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-none"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full p-0 border-none bg-transparent cursor-pointer"
            aria-label={`Reproducir ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 group-hover:bg-black/20">
              <span className="grid place-items-center w-[56px] h-[56px] rounded-full bg-accent text-white text-[20px] pl-[3px] shadow-[0_8px_30px_rgba(224,70,58,.4)] transition-transform duration-300 group-hover:scale-110">
                ▶
              </span>
            </div>
          </button>
        )}
      </div>
      <div className="px-5 pt-4 pb-5">
        <div className="text-accent text-[12px] font-semibold tracking-[0.04em] mb-[8px]">{date}</div>
        <h3 className="font-archivo font-bold uppercase text-[1.1rem] m-0 leading-[1.2]">{title}</h3>
      </div>
    </div>
  );
}
