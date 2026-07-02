import Section from '@/components/ui/Section';
import Heading from '@/components/ui/Heading';
import Timecode from '@/components/ui/Timecode';
import Still from '@/components/ui/Still';

export default function About() {
  return (
    <Section id="about" fxIndex={1}>
      <div className="grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Still src="/images/nov-portrait.png" alt="NOV portrait" aspect="portrait" priority />

        <div>
          <Timecode tc="09:00" label="About" />
          <Heading as="h2" className="mt-6">
            A slow build into depth.
          </Heading>
          <div className="mt-8 flex flex-col gap-4">
            <p className="max-w-[52ch] text-[15.5px] leading-[1.85] text-ink/70">
              NOV is a DJ and producer from Buenos Aires, shaped by progressive house,
              deep house, hypnotic groove and emotional storytelling. His sets avoid
              aggression; they build tension slowly, with an organic sense of evolution.
            </p>
            <p className="max-w-[52ch] text-[15.5px] leading-[1.85] text-ink/70">
              Before every performance he carefully selects new music, keeping each
              night fresh and specific to the room. The result is less a playlist and
              more a guided atmospheric journey.
            </p>
          </div>
          <div className="mt-8 border-t border-line pt-6 font-mono text-[10.5px] tracking-[0.16em] text-ink/45">
            <span className="text-ink/70">Influences</span> — Guy J · Hernan Cattaneo ·
            John Digweed · Simon Vuarambon · Sahar Z
          </div>
        </div>
      </div>
    </Section>
  );
}
