"use client";

import { AppHeader } from "./components/AppHeader";
import { Footer } from "./components/Footer";
import { ComparisonSection } from "./components/ComparisonSection";
import { HeroSection } from "./components/HeroSection";
import { HeroImageSection } from "./components/HeroImageSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { WhatYouWontFindSection } from "./components/WhatYouWontFindSection";
import { FinalCTASection } from "./components/FinalCTASection";

export default function LandingPage() {
  return (
    <div className='bg-white'>
      <AppHeader showSignIn fixed />

      <HeroSection />
      <HeroImageSection /> 
      <TargetAudienceSection />
      <WhatYouWontFindSection />
      <BenefitsSection />
      <FeaturesSection />
      {/* <ComparisonSection /> */}
      <FinalCTASection />

      <Footer />
    </div>
  );
}
