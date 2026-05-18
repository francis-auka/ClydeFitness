import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import About from "@/components/home/About";
import Disciplines from "@/components/home/Disciplines";
import Packages from "@/components/home/Packages";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <Disciplines />
      <Packages />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
