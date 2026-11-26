import "./leaning-portrait.css";

import { LensPlinth } from "@/components/photography/LensPlinth";
import { Photo } from "@/components/photography/Photo";
import type { ResolvedPhoto } from "@/data/photography";

/**
 * Where the underside of the elbow sits in the photo, as a share of its width and height: the
 * lens's top left corner goes there. Measured from the cutout's outline; re-measure for a new photo.
 */
const ELBOW = { x: 0.896, y: 0.456 };

type Props = {
  photo: ResolvedPhoto;
  /** The lens is also a door: where it leads, and the words a screen reader hears for it. */
  href: string;
  label: string;
};

/**
 * The cutout leaning on a lens. Both are positioned from the photo's own proportions, so the elbow
 * stays on the rim at every width. The photo is drawn over the lens, which is what makes the arm
 * read as resting on it. Its feet and the lens mount end on the same baseline: put a rule there.
 */
export function LeaningPortrait({ photo, href, label }: Props) {
  return (
    <figure className="lean portrait-in" style={{ "--elbow-x": ELBOW.x, "--elbow-y": ELBOW.y } as React.CSSProperties}>
      <div aria-hidden className="lean-halo" />

      <div className="lean-plinth">
        <LensPlinth href={href} label={label} className="h-full" />
        <span aria-hidden className="lean-shadow" />
      </div>

      <div className="lean-photo">
        <Photo photo={photo} priority sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, (min-width: 640px) 440px, 78vw" />
      </div>
    </figure>
  );
}
