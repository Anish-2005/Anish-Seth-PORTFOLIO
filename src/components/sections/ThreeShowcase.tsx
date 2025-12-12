import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { HeroMicroSceneGate } from "@/components/three/HeroMicroSceneGate";

export function ThreeShowcase() {
  return (
    <section className="relative border-t border-[color:var(--border)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(820px_520px_at_25%_10%,rgba(31,211,198,0.16),transparent_60%),radial-gradient(900px_600px_at_80%_0%,rgba(94,234,212,0.12),transparent_60%)]"
      />
      <Container className="py-16">
        <SectionHeading
          eyebrow="MICRO-SCENE"
          title="A small, non-blocking 3D moment"
          description="This micro-scene is intentionally lightweight and respectful of device capability and reduced-motion preferences."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <HeroMicroSceneGate />
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.06}>
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6">
              <h3 className="text-sm font-semibold text-[color:var(--text-0)]">
                Performance notes
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[color:var(--text-1)]">
                <li>• Lazy-loaded with a static fallback for first paint</li>
                <li>• Disabled under reduced motion or low-capability heuristics</li>
                <li>• Conservative DPR to keep GPU cost low</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
