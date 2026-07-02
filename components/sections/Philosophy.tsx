'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '@/components/ui/Section';
import Timecode from '@/components/ui/Timecode';
import Quote from '@/components/ui/Quote';
import { useLang } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

/**
 * The manifesto reads like a film's opening captions: each line
 * develops as the visitor scrolls into it (scrubbed opacity — still
 * a crossfade, just driven by scroll instead of time).
 */
export default function Philosophy() {
  const { t } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lines = root.querySelectorAll<HTMLElement>('[data-line]');
    const triggers: ScrollTrigger[] = [];

    lines.forEach((line, i) => {
      const tween = gsap.fromTo(
        line,
        { opacity: 0.04 },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: `top ${88 - i * 6}%`,
            end: `top ${52 - i * 6}%`,
            scrub: true,
          },
        },
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((st) => st.kill());
  }, []);

  return (
    <Section id="philosophy" fx={false}>
      <div ref={rootRef}>
        <Timecode tc="04:30" label="Philosophy" />
        <div className="mt-10 flex flex-col gap-4">
          <div data-line>
            <Quote className="text-[clamp(1.8rem,4vw,3rem)] text-ink">Not playing tracks.</Quote>
          </div>
          <div data-line>
            <Quote className="text-[clamp(1.8rem,4vw,3rem)] text-red-bright">Curating journeys.</Quote>
          </div>
        </div>
        <div data-line>
          <p className="mt-12 max-w-[58ch] text-[16px] leading-[1.9] text-ink/70">{t.philosophy.body}</p>
        </div>
      </div>
    </Section>
  );
}
