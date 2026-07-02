'use client';

import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';
import Still from '@/components/ui/Still';
import { useLang } from '@/lib/i18n';

const SC_PROFILE = 'https://soundcloud.com/novnovnovnovnovnovnov';
const SC_EMBED = `https://w.soundcloud.com/player/?url=${encodeURIComponent(SC_PROFILE)}&color=%23C1372B&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

export default function Videos() {
  const { t } = useLang();

  return (
    <Section id="videos" fxIndex={0}>
      <Timecode tc="38:00" label="Videos / Sets" />
      <Heading as="h2" className="mt-6 max-w-[10ch]">
        Listen before reading.
      </Heading>
      <p className="mt-6 max-w-[52ch] text-[15.5px] leading-[1.85] text-ink/70">{t.videos.body}</p>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Still
          src="/images/nov-stage.jpg"
          alt="NOV — live at the booth"
          aspect="letterbox"
          caption="Video pending"
        />
        <div className="border border-line-strong bg-bg-1">
          <iframe
            src={SC_EMBED}
            title="NOV on SoundCloud"
            className="sc-player h-full min-h-[320px] w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}
