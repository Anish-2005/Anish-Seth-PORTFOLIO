import { Section } from "@/components/ui/Section";
import { FeaturedGrid } from "@/components/work/FeaturedGrid";
import { ProjectIndex } from "@/components/work/ProjectIndex";
import { profile, projects, toProjectRow } from "@/data/portfolio";

export function Work({ repoCount }: { repoCount: number }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section
      id="work"
      motif="grid"
      detail="waves"
      index="03"
      label="Work"
      note={
        <>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link-u text-fg">
            All {repoCount} repositories ↗
          </a>
        </>
      }
      title={
        <>
          Things I&apos;ve built.
        </>
      }
    >
      <FeaturedGrid projects={featured} />

      <div className="mt-20" data-reveal>
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h3 className="text-[1.3rem] font-semibold tracking-[-0.02em] [font-stretch:110%]">More projects</h3>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="link-u text-[0.86rem] text-muted hover:text-fg lg:hidden">
            All {repoCount} repositories ↗
          </a>
        </div>
        <ProjectIndex projects={rest.map(toProjectRow)} />
      </div>
    </Section>
  );
}
