import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Arrival from '@/components/sections/Arrival';
import Philosophy from '@/components/sections/Philosophy';
import About from '@/components/sections/About';
import Live from '@/components/sections/Live';
import Gallery from '@/components/sections/Gallery';
import Videos from '@/components/sections/Videos';
import PressKit from '@/components/sections/PressKit';
import Booking from '@/components/sections/Booking';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-10">
        <Arrival />
        <Philosophy />
        <About />
        <Live />
        <Gallery />
        <Videos />
        <PressKit />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
