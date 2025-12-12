import { siteConfig } from "@/lib/site.config";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { HeroFallback } from "@/components/sections/HeroFallback";
import { HeroMicroSceneLazy } from "@/components/three/HeroMicroSceneLazy";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_600px_at_75%_15%,color-mix(in_oklab,var(--accent),transparent_78%),transparent_55%),radial-gradient(700px_480px_at_20%_10%,rgba(148,163,184,0.18),transparent_60%)]"
      />

      <Container className="grid items-center gap-10 pb-12 md:grid-cols-12 md:gap-12 md:pb-16">
        <div className="md:col-span-7">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.22em] text-[color:var(--text-2)]">
              {siteConfig.role}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--text-0)] sm:text-5xl">
              {siteConfig.name}
              <span className="text-[color:var(--text-2)]"> —</span>
              <span className="text-[color:var(--text-0)]"> portfolio</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--text-1)] sm:text-lg">
              {siteConfig.description}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#contact" variant="primary">
                Contact
              </ButtonLink>
              <ButtonLink href={siteConfig.resume.href} variant="secondary">
                Resume
              </ButtonLink>
              <ButtonLink href="#work" variant="ghost">
                Featured work
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-8 text-sm leading-6 text-[color:var(--text-2)]">
              Inspired by angular.dev’s interaction quality — original composition,
              slower clarity, and deliberate motion.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <div className="relative">
            <div className="hidden md:block">
              <HeroMicroSceneLazy />
            </div>
            <div className="md:hidden">
              <HeroFallback />
            </div>
            <p className="mt-3 text-xs text-[color:var(--text-2)]">
              3D is lazy-loaded; reduced-motion friendly.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
