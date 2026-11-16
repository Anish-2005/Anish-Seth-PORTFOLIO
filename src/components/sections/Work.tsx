import { Section } from "@/components/ui/Section";
import { FeaturedGrid } from "@/components/work/FeaturedGrid";
import { ProjectIndex } from "@/components/work/ProjectIndex";
import { profile, projects } from "@/data/portfolio";

export function Work({ repoCount }: { repoCount: number }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section
      id="work"
      index="03"
      label="Selected work"
      note={
        <>
          Four case studies, then an index of further builds.{" "}
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link-u text-fg">
            All {repoCount} repositories ↗
          </a>
        </>
      }
      title={
        <>
          Systems designed, built and shipped<span className="text-subtle"> — reasoning included.</span>
        </>
      }
    >
      <FeaturedGrid projects={featured} />

      <div className="mt-20" data-reveal>
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] [font-stretch:110%]">Index</h3>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link-u text-[0.86rem] text-muted hover:text-fg lg:hidden">
            All {repoCount} repositories ↗
          </a>
        </div>
        <ProjectIndex projects={rest} startAt={featured.length + 1} />
      </div>
    </Section>
  );
}
