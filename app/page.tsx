import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { IndexesSection } from "@/components/sections/IndexesSection";
import { DashboardTeaserSection } from "@/components/sections/DashboardTeaserSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <IndexesSection />
      <DashboardTeaserSection />
      <FinalCtaSection />
    </>
  );
}
