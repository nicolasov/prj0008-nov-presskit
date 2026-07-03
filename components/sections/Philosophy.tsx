'use client';

import Section from '@/components/ui/Section';
import Timecode from '@/components/ui/Timecode';
import Quote from '@/components/ui/Quote';
import LineReveal from '@/components/ui/LineReveal';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';

const cue = getCue('philosophy');

/**
 * The first movement doesn't arrive — it emerges from within the hero. Its
 * opacity and a hair of lift are driven by the same continuum variable as
 * the hero (`--h-phil`, set in Arrival), over the still-present photograph.
 * There is no divider and no block fade; by the time the words are fully
 * present, the visitor is already reading — never noticing when it began.
 */
export default function Philosophy() {
  const { t } = useLang();

  return (
    <Section id={cue.id} fx={false} className="pt-[clamp(160px,26vh,320px)]">
      <div
        style={{
          opacity: 'var(--h-phil, 1)',
          transform: 'translateY(calc((1 - var(--h-phil, 1)) * 22px))',
        }}
      >
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
      </div>
    </Section>
  );
}
