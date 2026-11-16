/** x-position of the label/content column boundary (3 of 12 columns), shared by guides and crosshairs. */
export const GUIDE_X = "calc(var(--pad) + (100% - 2 * var(--pad)) * 0.25)";

/**
 * The page's visible layout grid: hairline guides that run the full height of the site,
 * plus an accent marker that travels down the left guide as you scroll.
 */
export function Frame() {
  return (
    <div data-frame aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="shell h-full">
        <div className="absolute inset-y-0 left-0 w-px bg-[var(--guide)]">
          <div className="scroll-marker" />
        </div>
        <div className="absolute inset-y-0 right-0 w-px bg-[var(--guide)]" />
        <div className="absolute inset-y-0 hidden w-px bg-[var(--guide)] lg:block" style={{ left: GUIDE_X }} />
      </div>
    </div>
  );
}

/** Full-bleed hairline that draws itself in, with registration marks where it crosses the guides. */
export function SectionRule({ guide = true }: { guide?: boolean }) {
  return (
    <div aria-hidden className="relative [overflow-x:clip]">
      <div className="rule h-px bg-line" />
      <div className="shell absolute inset-x-0 top-0">
        {/* Edge marks only where the frame is visible (shell narrower than the viewport). */}
        <span className="xh left-0 top-0 hidden xl:block" />
        {guide ? <span className="xh top-0 hidden lg:block" style={{ left: GUIDE_X }} /> : null}
        <span className="xh left-full top-0 hidden xl:block" />
      </div>
    </div>
  );
}
