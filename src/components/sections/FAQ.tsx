import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { faqs } from "@/data/portfolio";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-24 md:pb-32">
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
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-title" className="mt-4 text-[1.7rem] font-semibold leading-tight tracking-tight">
            Quick answers
          </h2>
          <p className="mt-3 max-w-xs text-[0.92rem] text-muted">For recruiters, collaborators and the occasionally curious search engine.</p>
        </div>
        <div className="lg:col-span-8" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          {faqs.map((f, i) => (
            <details key={f.question} className="group border-b border-line" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-[1rem] font-medium transition-colors hover:text-accent-ink">
                {f.question}
                <span className="faq-icon grid size-7 shrink-0 place-items-center rounded-full border border-line text-muted transition-transform duration-300">
                  <Icon name="plus" size={14} />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[0.95rem] leading-relaxed text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
