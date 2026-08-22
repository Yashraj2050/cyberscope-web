import { Hero } from "./Hero";
import { ProblemSection } from "./ProblemSection";
import { WhatItDoes } from "./WhatItDoes";
import { TrustBoundary } from "./TrustBoundary";
import { ArchPreview } from "./ArchPreview";
import { DownloadCTA } from "./DownloadCTA";

export function HomeView() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <WhatItDoes />
      <TrustBoundary />
      <ArchPreview />
      <DownloadCTA />
    </>
  );
}
