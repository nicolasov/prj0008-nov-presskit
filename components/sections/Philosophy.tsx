'use client';

import Section from '@/components/ui/Section';
import Timecode from '@/components/ui/Timecode';
import Quote from '@/components/ui/Quote';
import { useLang } from '@/lib/i18n';

export default function Philosophy() {
  const { t } = useLang();

  return (
    <Section id="philosophy" fxIndex={0}>
      <Timecode tc="04:30" label="Philosophy" />
      <div className="mt-8 flex flex-col gap-3">
        <Quote className="text-ink">Not playing tracks.</Quote>
        <Quote className="text-red-bright">Curating journeys.</Quote>
      </div>
      <p className="mt-10 max-w-[60ch] text-[16px] leading-[1.8] text-ink/70">{t.philosophy.body}</p>
    </Section>
  );
}
