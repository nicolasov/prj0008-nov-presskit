'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SC_PROFILE = 'https://soundcloud.com/novnovnovnovnovnovnov';
const WIDGET_API = 'https://w.soundcloud.com/player/api.js';
const EMBED_SRC = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
  SC_PROFILE,
)}&auto_play=false&visual=false&show_artwork=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&hide_related=true`;

type Sound = { title: string; duration: number };

/* Minimal typings for the SoundCloud Widget API. */
type SCWidget = {
  bind: (event: string, cb: (data?: { currentPosition?: number }) => void) => void;
  play: () => void;
  pause: () => void;
  skip: (index: number) => void;
  seekTo: (ms: number) => void;
  getSounds: (cb: (sounds: Array<{ title?: string; duration?: number; full_duration?: number }>) => void) => void;
  getCurrentSoundIndex: (cb: (index: number) => void) => void;
};

declare global {
  interface Window {
    SC?: {
      Widget: ((el: HTMLIFrameElement) => SCWidget) & {
        Events: Record<'READY' | 'PLAY' | 'PAUSE' | 'PLAY_PROGRESS' | 'FINISH', string>;
      };
    };
  }
}

let apiPromise: Promise<void> | null = null;

function loadWidgetApi(): Promise<void> {
  if (window.SC?.Widget) return Promise.resolve();
  apiPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = WIDGET_API;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('SoundCloud Widget API failed to load'));
    document.head.appendChild(script);
  });
  return apiPromise;
}

function fmt(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

type Phase = 'idle' | 'loading' | 'ready' | 'error';

/**
 * Custom SoundCloud player: the default embed breaks the visual
 * language, so the iframe runs hidden as an audio engine and every
 * visible pixel belongs to the design system. Nothing loads until
 * the visitor asks for it.
 */
export default function SoundCloudPlayer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SCWidget | null>(null);
  const soundsRef = useRef<Sound[]>([]);

  const [phase, setPhase] = useState<Phase>('idle');
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  const boot = useCallback(async () => {
    setPhase('loading');
    try {
      await loadWidgetApi();
      const iframe = iframeRef.current;
      const SC = window.SC;
      if (!iframe || !SC) throw new Error('widget unavailable');

      const widget = SC.Widget(iframe);
      widgetRef.current = widget;
      const { READY, PLAY, PAUSE, PLAY_PROGRESS, FINISH } = SC.Widget.Events;

      widget.bind(READY, () => {
        widget.getSounds((raw) => {
          const list = raw.map((s, i) => ({
            title: s.title ?? `Set ${String(i + 1).padStart(2, '0')}`,
            duration: s.duration ?? s.full_duration ?? 0,
          }));
          soundsRef.current = list;
          setSounds(list);
          setPhase('ready');
          widget.play();
        });
      });

      widget.bind(PLAY, () => {
        setPlaying(true);
        widget.getCurrentSoundIndex((i) => setIndex(i));
      });
      widget.bind(PAUSE, () => setPlaying(false));
      widget.bind(PLAY_PROGRESS, (data) => setPosition(data?.currentPosition ?? 0));
      widget.bind(FINISH, () => {
        widget.getCurrentSoundIndex((i) => {
          if (i < soundsRef.current.length - 1) widget.skip(i + 1);
        });
      });
    } catch {
      setPhase('error');
    }
  }, []);

  useEffect(() => {
    return () => {
      widgetRef.current = null;
    };
  }, []);

  const current = sounds[index];
  const duration = current?.duration ?? 0;

  const toggle = () => {
    const w = widgetRef.current;
    if (!w) return;
    if (playing) w.pause();
    else w.play();
  };

  const skipTo = (i: number) => {
    const w = widgetRef.current;
    if (!w) return;
    setPosition(0);
    setIndex(i);
    w.skip(i);
  };

  const seek = (ms: number) => {
    widgetRef.current?.seekTo(ms);
    setPosition(ms);
  };

  return (
    <div className="relative overflow-hidden border border-line-strong bg-bg-1">
      {/* hidden audio engine — kept at real size so the widget's
          internal canvas can draw; invisible and out of the layout */}
      {phase !== 'idle' && (
        <iframe
          ref={iframeRef}
          src={EMBED_SRC}
          title="NOV on SoundCloud (audio engine)"
          allow="autoplay"
          aria-hidden="true"
          tabIndex={-1}
          width={320}
          height={180}
          className="pointer-events-none absolute left-0 top-0 -z-10 opacity-0"
        />
      )}

      {phase === 'idle' || phase === 'loading' ? (
        <button
          type="button"
          onClick={boot}
          disabled={phase === 'loading'}
          className="group flex min-h-[280px] w-full cursor-pointer flex-col items-center justify-center gap-6 border-0 bg-transparent p-8 disabled:cursor-wait"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-red text-red-bright transition-colors duration-hover ease-fade group-hover:bg-red/10">
            {phase === 'loading' ? (
              <span className="font-mono text-[9px] tracking-[0.18em]">···</span>
            ) : (
              <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
                <path d="M0 0L12 7L0 14V0Z" />
              </svg>
            )}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
            {phase === 'loading' ? 'Tuning in' : 'Selected sets — SoundCloud'}
          </span>
        </button>
      ) : phase === 'error' ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 p-8">
          <p className="m-0 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
            Player unavailable
          </p>
          <a
            href={SC_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-bright no-underline"
          >
            Listen on SoundCloud
          </a>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* now playing */}
          <div className="flex flex-col gap-5 p-[clamp(18px,3vw,28px)]">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-bright">
                ● Now playing
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55 [font-variant-numeric:tabular-nums]">
                {fmt(position)} / {fmt(duration)}
              </span>
            </div>

            <p className="m-0 line-clamp-1 font-archivo text-[17px] font-medium text-ink">
              {current?.title ?? '—'}
            </p>

            {/* seek */}
            <div className="relative h-4">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
              <div
                className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-red-bright"
                style={{ width: duration ? `${(position / duration) * 100}%` : '0%' }}
              />
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={1000}
                value={Math.min(position, duration)}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label="Seek"
                className="sc-range absolute inset-0 w-full cursor-pointer"
              />
            </div>

            {/* transport */}
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => skipTo(Math.max(0, index - 1))}
                disabled={index === 0}
                aria-label="Previous set"
                className="border-0 bg-transparent p-1 font-mono text-[11px] tracking-[0.18em] text-ink/55 transition-colors duration-hover ease-fade enabled:cursor-pointer enabled:hover:text-ink disabled:opacity-40"
              >
                ‹‹
              </button>
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? 'Pause' : 'Play'}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-red bg-transparent text-red-bright transition-colors duration-hover ease-fade hover:bg-red/10"
              >
                {playing ? (
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
                    <rect x="0" y="0" width="3" height="12" />
                    <rect x="7" y="0" width="3" height="12" />
                  </svg>
                ) : (
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden="true">
                    <path d="M0 0L10 6L0 12V0Z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={() => skipTo(Math.min(sounds.length - 1, index + 1))}
                disabled={index >= sounds.length - 1}
                aria-label="Next set"
                className="border-0 bg-transparent p-1 font-mono text-[11px] tracking-[0.18em] text-ink/55 transition-colors duration-hover ease-fade enabled:cursor-pointer enabled:hover:text-ink disabled:opacity-40"
              >
                ››
              </button>
            </div>
          </div>

          {/* set list */}
          <ol className="m-0 flex max-h-[264px] list-none flex-col overflow-y-auto border-t border-line p-0">
            {sounds.map((sound, i) => (
              <li key={`${sound.title}-${i}`}>
                <button
                  type="button"
                  onClick={() => skipTo(i)}
                  className={`flex w-full cursor-pointer items-baseline gap-4 border-0 border-b border-line bg-transparent px-[clamp(18px,3vw,28px)] py-3 text-left transition-colors duration-hover ease-fade ${
                    i === index ? 'text-red-bright' : 'text-ink/55 hover:text-ink/70'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] [font-variant-numeric:tabular-nums]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="line-clamp-1 flex-1 font-archivo text-[13.5px]">{sound.title}</span>
                  <span className="font-mono text-[10px] tracking-[0.18em] [font-variant-numeric:tabular-nums]">
                    {fmt(sound.duration)}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
