import { Hero } from "./Hero";
import { ProblemSection } from "./ProblemSection";
import { WhatItDoes } from "./WhatItDoes";
import { TrustBoundary } from "./TrustBoundary";
import { ArchPreview } from "./ArchPreview";
import { DownloadCTA } from "./DownloadCTA";
import { VerificationSection } from "./VerificationSection";
import { SIHTeamSection } from "./SIHTeamSection";

export function HomeView() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <WhatItDoes />
      <TrustBoundary />
      <VerificationSection />
      <ArchPreview />
      <SIHTeamSection />
      <DownloadCTA />
    </>
  );
}
