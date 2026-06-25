import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Bio from '@/components/Bio';
import Genres from '@/components/Genres';
import Marquee from '@/components/Marquee';
import Testimonials from '@/components/Testimonials';
import Events from '@/components/Events';
import BoothStrip from '@/components/BoothStrip';
import Gallery from '@/components/Gallery';
import MusicPlayer from '@/components/MusicPlayer';
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
        <Testimonials />
        <Events />
        <BoothStrip />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
