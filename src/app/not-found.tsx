import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80dvh] items-center overflow-hidden pt-24">
      <div aria-hidden className="dots absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
      <div className="container-x grid lg:grid-cols-12">
        <p className="label mb-6 lg:col-span-3 lg:mb-0 lg:pr-10">
          <span className="text-accent-ink">404</span> — Not found
        </p>
        <div className="lg:col-span-9 lg:pl-10">
          <h1 className="text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.045em] [font-stretch:112%]">
            This route <span className="text-subtle">hallucinated.</span>
          </h1>
          <p className="lede mt-6 max-w-md">The page you asked for doesn&apos;t exist — but the grounded answers are one click away.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/">
              Back home <Icon name="arrow-right" size={15} />
            </ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              Case studies
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
