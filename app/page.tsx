import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import ContactOptions from "@/components/ContactOptions";
import StudioProof from "@/components/StudioProof";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main className="overflow-x-clip">
        <Hero />
        <Ticker />
        <Services />
        <Gallery />
        <StudioProof />
        <Pricing />
        <ContactOptions />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
