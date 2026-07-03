'use client';

import { createContext, useContext, useEffect, useState } from 'react';

/**
 * NOV Playback System™ (internal name — never shown). The site lives in two
 * emotional states. Silent, it reads like a printed publication. When the
 * visitor chooses PLAY, it wakes: the grain lifts a touch, the hero
 * photograph breathes, the BPM grows more alive. Never obvious — the visitor
 * feels the difference without naming it. Music activates the experience; it
 * is never autoplayed and never content.
 *
 * Driven by `nov:play` / `nov:pause` events from the SoundCloud player.
 */
const PlayingContext = createContext(false);

export function PlaybackProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    window.addEventListener('nov:play', onPlay);
    window.addEventListener('nov:pause', onPause);
    return () => {
      window.removeEventListener('nov:play', onPlay);
      window.removeEventListener('nov:pause', onPause);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('is-playing', playing);
  }, [playing]);

  return <PlayingContext.Provider value={playing}>{children}</PlayingContext.Provider>;
}

export const usePlaying = () => useContext(PlayingContext);
