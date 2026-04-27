import { ThreeBackground } from "@/components/landing/ThreeBackground";
import { SparkleOverlay } from "@/components/landing/SparkleOverlay";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Services } from "@/components/landing/Services";
import { WhyUs } from "@/components/landing/WhyUs";
import { Team } from "@/components/landing/Team";
import { Gallery } from "@/components/landing/Gallery";
import { Testimonials } from "@/components/landing/Testimonials";
import { BookingCta } from "@/components/landing/BookingCta";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-bg-base overflow-x-hidden">
      <ThreeBackground />
      <SparkleOverlay />
      
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <Team />
        <Gallery />
        <Testimonials />
        <BookingCta />
        <Footer />
      </div>
    </main>
  );
}
