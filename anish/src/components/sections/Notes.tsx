import type { Note } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function Notes({ notes }: { notes: Note[] }) {
  return (
    <section id="notes" className="border-t border-[color:var(--border)]">
      <Container className="py-16">
        <SectionHeading
          eyebrow="NOTES"
          title="Short notes"
          description="A small writing space for build decisions, performance lessons, and interface craft. (v0: stub)"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {notes.slice(0, 2).map((n, idx) => (
            <Reveal key={n.slug} delay={idx * 0.05}>
              <article className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-1)] p-6">
                <p className="text-xs font-medium tracking-[0.18em] text-[color:var(--text-2)]">
                  {n.date}
                </p>
                <h3 className="mt-2 text-base font-semibold text-[color:var(--text-0)]">
                  {n.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-1)]">
                  {n.summary}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
