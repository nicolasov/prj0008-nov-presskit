import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CueButton from '@/components/ui/CueButton';
import BpmTicker from '@/components/hidden/BpmTicker';
import Arrival from '@/components/sections/Arrival';
import Philosophy from '@/components/sections/Philosophy';
import About from '@/components/sections/About';
import Live from '@/components/sections/Live';
import Gallery from '@/components/sections/Gallery';
import Radio from '@/components/sections/Radio';
import PressKit from '@/components/sections/PressKit';
import Booking from '@/components/sections/Booking';

export default function Home() {
  return (
    <>
      <Nav />
      {/* Arrival mounts the fixed hero layers (photo + NOV) and a one-screen
          spacer. The document below scrolls up over those fixed layers with a
          transparent background — so Philosophy emerges within the still-
          present photograph, never after a cut. There is no divider between
          the hero and the first movement; the photograph is the seam. */}
      <main className="relative">
        <Arrival />
        <div className="relative z-20">
          <Philosophy />
          <About />
          <Live />
          <Gallery />
          <Radio />
          <PressKit />
          <Booking />
          <Footer />
        </div>
      </main>
      <CueButton />
      <BpmTicker />
    </>
  );
}
