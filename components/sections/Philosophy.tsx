'use client';

import { useEffect, useRef, useState } from 'react';
import Section from '@/components/ui/Section';
import Timecode from '@/components/ui/Timecode';
import Quote from '@/components/ui/Quote';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';

const cue = getCue('philosophy');

/**
 * The first movement doesn't arrive — it sets itself, like an editorial
 * page revealing in order. When the section enters view, a time-based
 * sequence plays regardless of scroll speed, so the eye reads one thing at
 * a time rather than everything at once:
 *
 *   timestamp (quick) → pause → "Not playing tracks." → "Curating journeys."
 *   (slow, the key line) → the body, line by line.
 *
 * It plays over the still-present hero photograph (the continuum's fixed
 * backdrop lingers behind), so it emerges from within the hero rather than
 * competing with it — the hero has already stepped back by the time these
 * words own the frame.
 */
export default function Philosophy() {
  const { t } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // one editorial timeline (ms): delay + duration per element.
  // Under reduced motion, everything is simply present — no timeline, no lift.
  const item = (delay: number, duration: number) =>
    reduced
      ? { opacity: 1 }
      : {
          opacity: shown ? 1 : 0,
          transform: shown ? 'none' : 'translateY(14px)',
          transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms cubic-bezier(0.19,1,0.22,1) ${delay}ms`,
        };

  return (
    <Section id={cue.id} fx={false} className="pt-[clamp(160px,26vh,320px)]">
      <div ref={rootRef}>
        <div style={item(0, 700)}>
          <Timecode tc={cue.tc} label={cue.label} />
        </div>

        <div className="mt-14 flex flex-col gap-7">
          <div style={item(950, 1300)}>
            <Quote className="text-[clamp(1.9rem,4.2vw,3.2rem)] text-ink">Not playing tracks.</Quote>
          </div>
          <div style={item(2100, 2300)}>
            <Quote className="text-[clamp(1.9rem,4.2vw,3.2rem)] text-red-bright">Curating journeys.</Quote>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2.5">
          {t.philosophy.lines.map((line, i) => (
            <p
              key={i}
              style={item(3700 + i * 220, 1100)}
              className="m-0 max-w-[56ch] text-[clamp(1.05rem,1.6vw,1.35rem)] font-light leading-[1.55] text-ink/90"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
