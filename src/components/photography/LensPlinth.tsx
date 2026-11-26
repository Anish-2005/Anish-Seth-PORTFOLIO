import "./lens-plinth.css";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/** Engravings, in the order they sit on a barrel. The track slides to bring `at` under the index dot. */
const DISTANCES = ["∞", "10", "5", "3", "2", "1.5", "1.2", "1", "0.8", "0.6", "0.45"];
const STOPS = ["22", "16", "11", "8", "5.6", "4", "2.8", "1.8"];

/**
 * Grip ridges spaced as they'd look on a cylinder seen side-on: evenly spaced around the barrel,
 * so they crowd together towards both edges.
 */
const RIDGES = Array.from({ length: 46 }, (_, i) => Number((50 - 50 * Math.cos((Math.PI * (i + 1)) / 47)).toFixed(2)));

/** A ring with a scale. At rest and on hover it shows a different mark (see lens-plinth.css). */
function Scale({ marks, className }: { marks: string[]; className: string }) {
  return (
    <span aria-hidden className={cn("lens-band lens-scale", className)}>
      <span className="lens-track">
        {marks.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </span>
      <i className="lens-index" />
    </span>
  );
}

type Props = {
  href: string;
  /** What a screen reader hears after "Gallery". */
  label: string;
  className?: string;
};

/**
 * A camera lens standing on its mount, tall enough to lean on, and a link to the gallery. Pointing at
 * it racks the focus ring closer and opens the aperture. Drawn in CSS and SVG, with no script.
 * Black in the dark theme, silver in the light one.
 */
export function LensPlinth({ href, label, className }: Props) {
  return (
    <a href={href} rel="me" className={cn("lens", className)}>
      <span aria-hidden className="lens-band lens-rim" />
      <span aria-hidden className="lens-band lens-grip">
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" focusable="false">
          {RIDGES.map((x) => (
            <path key={x} d={`M${x} 0V10`} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      </span>
      <Scale marks={DISTANCES} className="lens-focus" />
      <span className="lens-band lens-plate">
        <span className="lens-name">Gallery</span>
        <span className="sr-only">{label}</span>
        <Icon name="arrow-up-right" size={26} strokeWidth={1.25} className="lens-arrow" />
      </span>
      <Scale marks={STOPS} className="lens-aperture" />
      <span aria-hidden className="lens-band lens-mount" />
    </a>
  );
}
