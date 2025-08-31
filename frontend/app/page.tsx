
import Navbar from "@/components/landingPage/navbar";
import HeroSection from "@/components/landingPage/heroSection";
import AllPerfumeSection from "@/components/landingPage/allperfumeSction";
import Footer from "@/components/landingPage/footer";

export default function Home() {
  return (
    <div className="flex flex-col h-screen relative">
      <Navbar />
      <HeroSection />
      <AllPerfumeSection />
      <Footer />
    </div>
  );
}
