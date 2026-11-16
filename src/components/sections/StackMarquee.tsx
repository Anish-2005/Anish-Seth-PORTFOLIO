import { marquee } from "@/data/portfolio";

export function StackMarquee() {
  return (
    <section aria-label="Core toolchain" className="border-y border-line bg-bg-elev/40 py-5">
      <div className="marquee overflow-hidden">
        <ul className="marquee-track items-center">
          {[0, 1].map((copy) =>
            marquee.map((item) => (
              <li
                key={`${copy}-${item}`}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex items-center gap-10 pr-10 text-[0.95rem] font-medium tracking-tight text-subtle"
              >
                <span className="whitespace-nowrap">{item}</span>
                <span className="size-1 rounded-full bg-accent/60" aria-hidden />
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
