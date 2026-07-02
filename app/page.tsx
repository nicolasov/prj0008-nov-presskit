import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Bio from '@/components/Bio';
import Genres from '@/components/Genres';
import Marquee from '@/components/Marquee';
import BoothStrip from '@/components/BoothStrip';
import Gallery from '@/components/Gallery';
import MusicPlayer from '@/components/MusicPlayer';
import PressAssets from '@/components/PressAssets';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Bio />
        <Genres />
        <Marquee />
        <MusicPlayer />
        <Gallery />
        <BoothStrip />
        <PressAssets />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
