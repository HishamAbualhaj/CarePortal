import Consultation from "@/components/layouts/Landing/Consultation";
import Footer from "@/components/layouts/Landing/Footer";
import Header from "@/components/layouts/Landing/Header";
import Hero from "@/components/layouts/Landing/Hero";
import OurDoctors from "@/components/layouts/Landing/OurDoctors";
import OurNews from "@/components/layouts/Landing/OurNews";
import OurOffer from "@/components/layouts/Landing/OurOffer";
import Sections from "@/components/layouts/Landing/Sections";
import Welcome from "@/components/layouts/Landing/Welcome";
export default function Home() {
  return (
    <>
      <div className="bg-white shadow-main">
        <Header />
      </div>
      <div className="bg-secondary/50">
        <Hero />
      </div>
      <div className="py-[80px]">
        <Welcome />
      </div>
      <div className="bg-secondary">
        <OurOffer />
      </div>
      <div className="py-[80px]">
        <Sections />
      </div>

      <div className="py-[80px] bg-secondary">
        <Consultation />
      </div>

      <div className="py-[80px] ">
        <OurDoctors />
      </div>

      <div className="py-[80px] bg-secondary">
        <OurNews />
      </div>
      <div className="py-[30] bg-blue-500">
        <Footer />
      </div>
    </>
  );
}
