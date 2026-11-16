import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeaturedProjectCard, ProjectCard } from "@/components/work/ProjectCard";
import { WorkFilter } from "@/components/work/WorkFilter";
import { categoryLabels, profile, projects, type ProjectCategory } from "@/data/portfolio";

export function Work({ repoCount }: { repoCount: number }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const cats = Object.keys(categoryLabels) as ProjectCategory[];
  const tabs = [
    { id: "all", label: "All", count: rest.length },
    ...cats.map((c) => ({ id: c, label: categoryLabels[c], count: rest.filter((p) => p.categories.includes(c)).length })),
  ];

  return (
    <section id="work" aria-labelledby="work-title" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          id="work-title"
          index="03"
          label="Selected work"
          title={
            <>
              Systems designed, built <span className="serif-em">&amp; shipped.</span>
            </>
          }
          lede="Agentic pipelines, knowledge graphs and full-stack products — each with the problem it solved and the engineering decisions behind it."
          aside={
            <ButtonLink href={profile.links.github} variant="secondary" size="sm">
              <Icon name="github" size={15} />
              All {repoCount} repositories
              <Icon name="arrow-up-right" size={14} />
            </ButtonLink>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {featured.map((p, i) => (
            <FeaturedProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="mt-20">
          <div className="mb-6 flex items-center gap-4" data-reveal>
            <h3 className="text-xl font-semibold tracking-tight">More builds</h3>
            <span className="hairline flex-1" aria-hidden />
          </div>
          <div data-reveal>
            <WorkFilter tabs={tabs}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {rest.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </WorkFilter>
          </div>
        </div>
      </div>
    </section>
  );
}
