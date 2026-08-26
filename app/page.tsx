import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorksScroll } from "@/components/sections/HowItWorksScroll";
import { IndexesSection } from "@/components/sections/IndexesSection";
import { IndiaMapSection } from "@/components/sections/IndiaMapSection";
import { DashboardTeaserSection } from "@/components/sections/DashboardTeaserSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksScroll />
      <IndexesSection />
      <IndiaMapSection />
      <DashboardTeaserSection />
      <FinalCtaSection />
    </>
  );
}
