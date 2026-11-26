/** x-position of the label/content column boundary (3 of 12 columns), shared by guides and crosshairs. */
export const GUIDE_X = "calc(var(--pad) + (100% - 2 * var(--pad)) * 0.25)";

/**
 * The page's visible layout grid: hairline guides that run the full height of the site.
 * The content guide doubles as a "trace" (like the logo stroke): a crimson line fills it as you
 * scroll, and each section's node lights up as you reach it.
 */
export function Frame() {
  return (
    <div data-frame aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="shell h-full">
        {/* Guides draw downward on load, like the section rules. */}
        <div className="absolute inset-y-0 left-0 w-px">
          <div className="guide-line absolute inset-0 bg-[var(--guide)]" />
          <div className="ruler ruler-left absolute inset-y-0 left-0 hidden xl:block" />
          {/* Small screens: the marker rides the edge; ≥lg the trace fill takes over. */}
          <div className="scroll-marker hidden md:block lg:hidden" />
        </div>
        <div className="content-guide absolute inset-y-0 hidden w-px lg:block" style={{ left: GUIDE_X }}>
          <div className="guide-line absolute inset-0 bg-[var(--guide)]" style={{ "--d": "140ms" } as React.CSSProperties} />
          <div className="trace-fill absolute inset-0" />
        </div>
        <div className="absolute inset-y-0 right-0 w-px">
          <div className="guide-line absolute inset-0 bg-[var(--guide)]" style={{ "--d": "280ms" } as React.CSSProperties} />
          <div className="ruler ruler-right absolute inset-y-0 right-0 hidden xl:block" />
        </div>
      </div>
    </div>
  );
}

/**
 * Full-bleed hairline that draws itself in. Registration marks sit where it crosses the frame
 * edges; where it crosses the content guide there's a trace node that lights up once revealed.
 */
export function SectionRule({ guide = true }: { guide?: boolean }) {
  return (
    <div aria-hidden className="relative [overflow-x:clip]">
      <div className="rule h-px bg-line" />
      <div className="shell absolute inset-x-0 top-0">
        {/* Edge marks only where the frame is visible (shell narrower than the viewport). */}
        <span className="xh left-0 top-0 hidden xl:block" />
        {guide ? <span className="trace-node hidden lg:block" style={{ left: GUIDE_X }} /> : null}
        <span className="xh left-full top-0 hidden xl:block" />
      </div>
    </div>
  );
}
