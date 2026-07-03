import Container from '@/components/ui/Container';
import Timecode from '@/components/ui/Timecode';
import Still from '@/components/ui/Still';
import { getCue } from '@/lib/cues';

const cue = getCue('gallery');

export default function Gallery() {
  return (
    <section id={cue.id} data-fx className="py-[var(--space-section)]">
      <Container>
        <Timecode tc={cue.tc} label={cue.label} />
      </Container>

      <Container className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
        <Still
          src="/images/nov-booth-motion.jpg"
          alt="NOV in the booth, hands on the mixer, light trails"
          aspect="letterbox"
          caption="Hands on the filter — closing hour"
          tc="29:14"
          className="md:col-span-8"
          sizes="(max-width: 880px) 100vw, 66vw"
          fxIndex={0}
        />
        <Still
          src="/images/nov-booth-shadow.jpg"
          alt="NOV in the booth, half light"
          aspect="portrait"
          caption="The booth, half light"
          tc="29:41"
          className="md:col-span-4"
          sizes="(max-width: 880px) 100vw, 33vw"
          fxIndex={1}
        />
        <Still
          src="/images/nov-headphones.jpg"
          alt="NOV cueing with headphones"
          aspect="letterbox"
          caption="Cueing the next room"
          tc="30:22"
          className="md:col-span-12"
          sizes="100vw"
          fxIndex={2}
        />
      </Container>
    </section>
  );
}
