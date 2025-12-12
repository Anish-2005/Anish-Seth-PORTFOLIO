import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="border-t border-[color:var(--border)]">
      <Container className="py-16">
        <SectionHeading
          eyebrow="ABOUT"
          title="I build calm, high-performing products"
          description="I’m a full-stack developer who cares about performance, accessibility, and craft. I enjoy building end-to-end experiences — from clean APIs to UI motion and data storytelling."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6">
              <h3 className="text-sm font-semibold text-[color:var(--text-0)]">
                What I optimize for
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[color:var(--text-1)]">
                <li>• Fast, resilient frontends (Core Web Vitals)</li>
                <li>• Accessible interaction (keyboard-first, WCAG AA)</li>
                <li>• Clear information hierarchy and compositional calm</li>
                <li>• Pragmatic architecture and maintainability</li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.06}>
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6">
              <h3 className="text-sm font-semibold text-[color:var(--text-0)]">
                Timeline (v0)
              </h3>
              <div className="mt-4 space-y-4 text-sm text-[color:var(--text-1)]">
                <div>
                  <p className="font-medium text-[color:var(--text-0)]">
                    Education
                  </p>
                  <p className="mt-1 text-[color:var(--text-2)]">
                    Add your degree + dates (from LinkedIn).
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[color:var(--text-0)]">
                    Internships / Work
                  </p>
                  <p className="mt-1 text-[color:var(--text-2)]">
                    Add your roles + impact (from LinkedIn).
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
