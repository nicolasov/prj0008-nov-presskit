import Background from '@/components/ui/Background';
import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';

export default function Arrival() {
  return (
    <section
      id="arrival"
      data-fx
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-b border-line"
    >
      <Background />

      <Container className="flex flex-1 flex-col justify-between py-8">
        <div className="flex items-baseline justify-between">
          <Timecode tc="00:00" label="Arrival" />
          <Timecode tc="/ 55:00" />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-6 font-mono text-[12px] tracking-[0.44em] text-ink/70">
            DJ<span className="mx-3 text-ink/25">•</span>Producer
          </p>
          <h1 className="m-0 ml-[0.06em] font-serif text-[clamp(4.5rem,15vw,13rem)] font-light leading-none tracking-[0.06em] text-ink">
            NOV
          </h1>
          <p className="mt-7 font-serif text-[clamp(1rem,2vw,1.35rem)] font-light italic text-ink/70">
            Curated Journeys
          </p>
        </div>

        <div className="flex items-end justify-between">
          <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45">Buenos Aires</span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-ink/45">Scroll</span>
        </div>
      </Container>
    </section>
  );
}
