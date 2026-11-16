import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80dvh] place-items-center overflow-hidden pt-24">
      <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div className="container-x text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="display mt-5">
          This route <span className="serif-em">hallucinated.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          The page you asked for doesn&apos;t exist — but the grounded answers are one click away.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">
            Back home <Icon name="arrow-right" size={15} />
          </ButtonLink>
          <ButtonLink href="/projects" variant="secondary">
            Browse case studies
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
