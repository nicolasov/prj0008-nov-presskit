import Section from '@/components/ui/Section';
import Timecode from '@/components/ui/Timecode';
import Quote from '@/components/ui/Quote';

export default function Philosophy() {
  return (
    <Section id="philosophy" fxIndex={0}>
      <Timecode tc="04:30" label="Philosophy" />
      <div className="mt-8 flex flex-col gap-3">
        <Quote className="text-ink">Not playing tracks.</Quote>
        <Quote className="text-red-bright">Curating journeys.</Quote>
      </div>
      <p className="mt-10 max-w-[60ch] text-[16px] leading-[1.8] text-ink/70">
        Every set is researched and selected fresh, built to move slowly from tension
        into release. Nothing is aggressive. Nothing is loud. The room is trusted to
        follow, one careful transition at a time.
      </p>
    </Section>
  );
}
