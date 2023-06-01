import Stats from "@/components/index/Stats";
import Features from "@/components/index/Features";
import HeroSection from "@/components/index/HeroSection";
import Testimonials from "@/components/index/Testimonials";
import CallToAction from "@/components/index/CallToAction";
import Blog from "@/components/index/Blog";
import AppHeader from "@/components/index/AppHeader";
import AppFooter from "@/components/index/AppFooter";

export default function Home() {
  return (
    <>
      <AppHeader />
      <main className="space-y-40 mb-40">
        <HeroSection />
        <Features />
        <Stats />
        <Testimonials />
        <CallToAction />
        <Blog />
      </main>{" "}
      <AppFooter />
    </>
  );
}
