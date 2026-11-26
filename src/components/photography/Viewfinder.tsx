import Link from "next/link";

import "./viewfinder.css";

import { profile } from "@/data/profile";

/** Where the face sits in the hero cutout, as a share of the image box. Re-measure if the portrait changes. */
const FACE = { left: "19%", top: "0.5%", width: "47%", height: "38.5%" };

/** One aperture blade: the edge of the hexagonal opening, carried on to the rim. Repeated every 60°. */
const BLADE = "M16 12 19.15 17.46";

/**
 * The home page's way into /photography: a tiny aperture beside the hero portrait. Pointing at it
 * (or focusing it) turns the portrait into a viewfinder, with focus brackets locking onto the face
 * while the blades turn. They also lock once on load, so the button gets noticed and then stays quiet.
 *
 * Place it inside a positioned element that wraps the portrait exactly. CSS only, no client script.
 */
export function Viewfinder() {
  return (
    <>
      <span aria-hidden className="vf-focus" style={FACE}>
        <i />
        <i />
        <i />
        <i />
      </span>
      <Link href="/photography" className="vf-button" prefetch={false}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" aria-hidden focusable="false">
          <circle cx="12" cy="12" r="9" />
          <g className="vf-blades">
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <path key={angle} d={BLADE} transform={`rotate(${angle} 12 12)`} />
            ))}
          </g>
          <circle className="vf-dot" cx="12" cy="12" r="1.4" />
        </svg>
        {/* The link's real text, for screen readers and search engines. */}
        <span className="sr-only">{profile.name}&apos;s photography</span>
        <span aria-hidden className="vf-count label">
          Photography
        </span>
      </Link>
    </>
  );
}
