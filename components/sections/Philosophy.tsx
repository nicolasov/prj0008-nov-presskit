'use client';

import Section from '@/components/ui/Section';
import Timecode from '@/components/ui/Timecode';
import Quote from '@/components/ui/Quote';
import LineReveal from '@/components/ui/LineReveal';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';

const cue = getCue('philosophy');

/**
 * The manifesto opens like a film's first captions: the two thesis lines,
 * then the body set one line at a time (see LineReveal). Copy is authored
 * short — this is typesetting, not an essay.
 */
export default function Philosophy() {
  const { t } = useLang();

  return (
    <Section id={cue.id} fxIndex={0}>
      <Timecode tc={cue.tc} label={cue.label} />
      <div className="mt-10 flex flex-col gap-4">
        <Quote className="text-[clamp(1.8rem,4vw,3rem)] text-ink">Not playing tracks.</Quote>
        <Quote className="text-[clamp(1.8rem,4vw,3rem)] text-red-bright">Curating journeys.</Quote>
      </div>
      <LineReveal
        lines={t.philosophy.lines}
        className="mt-12 flex flex-col gap-2"
        lineClassName="max-w-[56ch] text-[clamp(1.05rem,1.6vw,1.35rem)] font-light leading-[1.5] text-ink/80"
      />
    </Section>
  );
}
