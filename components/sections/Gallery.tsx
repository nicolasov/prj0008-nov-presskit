import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import Still from '@/components/ui/Still';

export default function Gallery() {
  return (
    <section id="gallery" data-fx className="py-[var(--space-section)]">
      <Container>
        <Timecode tc="27:00" label="Gallery" />
      </Container>

      <Container className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
        <Still
          src="/images/nov-stage.jpg"
          alt="NOV in the booth"
          aspect="letterbox"
          caption="Closing track — hands on the filter"
          tc="27:14"
          className="md:col-span-8"
          fxIndex={0}
        />
        <Still
          src="/images/nov-hero.jpg"
          alt="NOV portrait, natural light"
          aspect="portrait"
          caption="Natural light"
          tc="27:41"
          className="md:col-span-4"
          fxIndex={1}
        />
        <Still
          src="/images/nov-bali-1.png"
          alt="NOV, coastal date"
          aspect="portrait"
          caption="Coastal date"
          tc="28:05"
          className="md:col-span-4"
          fxIndex={2}
        />
        <Still
          src="/images/nov-live.jpg"
          alt="NOV live, wide shot"
          aspect="letterbox"
          caption="Wide shot — the room"
          tc="28:22"
          className="md:col-span-8"
          fxIndex={3}
        />
      </Container>
    </section>
  );
}
