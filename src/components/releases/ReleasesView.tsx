import { PageHeader, Section, Container, Eyebrow } from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";
import { ReleaseEntry } from "./ReleaseEntry";
import { RELEASES, RELEASE_DATA_NOTICE } from "@/data/releases";

export function ReleasesView() {
  const sorted = [...RELEASES].sort((a, b) =>
    a.releaseDate < b.releaseDate ? 1 : -1
  );
  // the latest non-planned release
  const latestVersion = sorted.find((r) => r.status !== "planned")?.version;

  return (
    <>
      <PageHeader
        eyebrow="Releases"
        title="Release archive"
        description="Every CyberScope release — version, supported platforms, changes, fixes, security changes, and checksums. Structured as a professional software release archive."
      >
        <Eyebrow>{RELEASE_DATA_NOTICE}</Eyebrow>
      </PageHeader>

      <Section>
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {sorted.map((release, i) => (
            <Reveal key={release.version} delay={i * 60}>
              <ReleaseEntry
                release={release}
                isLatest={release.version === latestVersion}
              />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
