'use client';

import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';
import Still from '@/components/ui/Still';
import Accent from '@/components/ui/Accent';
import LineReveal from '@/components/ui/LineReveal';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';

const cue = getCue('about');

export default function About() {
  const { t } = useLang();

  return (
    <Section id={cue.id} fxIndex={1}>
      <div className="grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Still
          src="/images/nov-about-editorial-buenos-aires.jpg"
          alt="NOV at the decks, editorial portrait, Buenos Aires"
          aspect="portrait"
          caption="Buenos Aires"
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
        />

        <div>
          <Timecode tc={cue.tc} label={cue.label} />
          <Heading as="h2" className="mt-6">
            A slow build into <Accent>depth</Accent>.
          </Heading>
          <LineReveal
            lines={t.about.lines}
            className="mt-8 flex flex-col gap-2"
            lineClassName="max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.35rem)] font-light leading-[1.5] text-ink/80"
          />
          <div className="mt-8 border-t border-line pt-6 font-mono text-[10.5px] tracking-[0.16em] text-ink/55">
            <span className="text-ink/70">{t.about.influences}</span> — Guy J · Hernán Cattáneo ·
            John Digweed · Simon Vuarambon · Sahar Z
          </div>
        </div>
      </div>
    </Section>
  );
}
