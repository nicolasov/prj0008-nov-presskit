'use client';

import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';
import Still from '@/components/ui/Still';
import { useLang } from '@/lib/i18n';

export default function About() {
  const { t } = useLang();

  return (
    <Section id="about" fxIndex={1}>
      <div className="grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Still
          src="/images/nov-portrait-wall.jpg"
          alt="NOV — portrait against a concrete wall, natural light"
          aspect="portrait"
          caption="Buenos Aires"
          priority
        />

        <div>
          <Timecode tc="09:00" label="About" />
          <Heading as="h2" className="mt-6">
            A slow build into depth.
          </Heading>
          <div className="mt-8 flex flex-col gap-4">
            <p className="max-w-[52ch] text-[15.5px] leading-[1.85] text-ink/70">{t.about.p1}</p>
            <p className="max-w-[52ch] text-[15.5px] leading-[1.85] text-ink/70">{t.about.p2}</p>
          </div>
          <div className="mt-8 border-t border-line pt-6 font-mono text-[10.5px] tracking-[0.16em] text-ink/45">
            <span className="text-ink/70">{t.about.influences}</span> — Guy J · Hernan Cattaneo ·
            John Digweed · Simon Vuarambon · Sahar Z
          </div>
        </div>
      </div>
    </Section>
  );
}
