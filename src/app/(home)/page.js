import AboutUs from "@/components/home/AboutUs";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import MostSearchableMajors from "@/components/home/MostSearchableMajors";
import Navbar from "@/components/home/Navbar";
import SearchContainer from "@/components/home/SearchContainer";
import SpecificMajors from "@/components/home/SpecificMajors";
import UniverstiesLogos from "@/components/home/UniverstiesLogos";

export default function Home() {
  return (
    <div className="md:p-5 p-3">
      <Navbar />
      <Hero />
      <SearchContainer />
      <UniverstiesLogos />
      <AboutUs />
      <MostSearchableMajors />
      <SpecificMajors />
      <Footer />
    </div>
  );
}
