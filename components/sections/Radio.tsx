'use client';

import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';
import SoundCloudPlayer from '@/components/audio/SoundCloudPlayer';
import { useLang } from '@/lib/i18n';
import { getCue } from '@/lib/cues';

const cue = getCue('radio');

/**
 * Radio is NOV's refuge — an editorial chapter, not a music widget bolted
 * onto the page. Future home for monthly shows, guest mixes and a running
 * archive of Editor's Notes (see docs/07-content-strategy.md).
 */
export default function Radio() {
  const { t } = useLang();

  return (
    <Section id={cue.id} fxIndex={0}>
      <Timecode tc={cue.tc} label={cue.label} />
      <Heading as="h2" className="mt-6 max-w-[10ch]">
        Listen before reading.
      </Heading>
      <p className="mt-6 max-w-[52ch] text-[15.5px] leading-[1.85] text-ink/70">{t.radio.body}</p>

      <div className="mt-12">
        <SoundCloudPlayer />
      </div>
    </Section>
  );
}
