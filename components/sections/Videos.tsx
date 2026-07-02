'use client';

import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';
import SoundCloudPlayer from '@/components/audio/SoundCloudPlayer';
import { useLang } from '@/lib/i18n';

export default function Videos() {
  const { t } = useLang();

  return (
    <Section id="videos" fxIndex={0}>
      <Timecode tc="38:00" label="Videos / Sets" />
      <Heading as="h2" className="mt-6 max-w-[10ch]">
        Listen before reading.
      </Heading>
      <p className="mt-6 max-w-[52ch] text-[15.5px] leading-[1.85] text-ink/70">{t.videos.body}</p>

      <div className="mt-12">
        <SoundCloudPlayer />
      </div>
    </Section>
  );
}
