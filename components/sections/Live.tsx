'use client';

import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';
import Accent from '@/components/ui/Accent';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';

const cue = getCue('live');

const artists = [
  'Jimmy Van M',
  'Popof',
  'Martín García',
  'Nicolás Rada',
  'Fernando Ferreyra',
  'Carlos Alfonsin',
];

export default function Live() {
  const { t } = useLang();

  return (
    <Section id={cue.id} fxIndex={0}>
      <Timecode tc={cue.tc} label={cue.label} />
      <Heading as="h2" className="mt-6 max-w-[9ch]">
        Trusted in serious <Accent>rooms</Accent>.
      </Heading>
      <p className="mt-6 max-w-[52ch] text-[15.5px] leading-[1.85] text-ink/70">{t.live.body}</p>

      <ul className="mt-12 flex flex-col border-t border-line">
        {artists.map((name, i) => (
          <li
            key={name}
            data-fx=""
            data-fx-index={i * 2}
            className="border-b border-line py-4 font-archivo text-[clamp(1.4rem,3.4vw,2.4rem)] font-medium text-ink/55 transition-colors duration-hover ease-fade hover:text-ink"
          >
            {name}
          </li>
        ))}
      </ul>
    </Section>
  );
}
