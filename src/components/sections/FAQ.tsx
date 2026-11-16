import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { faqs } from "@/data/portfolio";

export function FAQ() {
  return (
    <Section
      id="faq"
      index="08"
      label="FAQ"
      title="Things people ask me."
      titleClassName="!text-[clamp(1.6rem,2.6vw,2.1rem)]"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <div className="border-t border-line" data-reveal>
        {faqs.map((f, i) => (
          <details key={f.question} className="group border-b border-line" open={i === 0}>
            <summary className="grid cursor-pointer grid-cols-[1fr_auto] items-baseline gap-3 py-5 text-[1.02rem] font-medium transition-colors hover:text-accent-ink">
              {f.question}
              <span className="faq-icon grid size-6 place-items-center text-subtle transition-transform duration-500 ease-[var(--ease-out-expo)]">
                <Icon name="plus" size={15} />
              </span>
            </summary>
            <p className="max-w-2xl pb-6 pr-8 text-[0.95rem] leading-relaxed text-muted">{f.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
