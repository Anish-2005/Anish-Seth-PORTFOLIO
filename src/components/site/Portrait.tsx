import Image from "next/image";

import portrait from "@/assets/anish-seth-portrait.webp";

/**
 * Trimmed transparent cutout. Imported (not served from /public) so its URL carries a content hash and
 * browsers can cache the optimised versions forever. The share-image copy lives in src/assets too.
 */
export const PORTRAIT = { src: portrait, width: portrait.width, height: portrait.height, alt: "Portrait of Anish Seth" } as const;

/**
 * The cutout standing on a ruled baseline inside a dot-field plate, with registration marks —
 * used where the hero isn't on screen (e.g. the /about page).
 */
export function PortraitPlate() {
  return (
    <figure>
      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden border-b border-line-strong">
          <div aria-hidden className="dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_40%,#000,transparent_75%)]" />
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-[20%] top-0"
            style={{ background: "radial-gradient(closest-side, var(--portrait-halo), transparent)" }}
          />
          <Image
            src={PORTRAIT.src}
            alt={PORTRAIT.alt}
            width={PORTRAIT.width}
            height={PORTRAIT.height}
            quality={60}
            sizes="(min-width: 1024px) 300px, (min-width: 768px) 36vw, 80vw"
            className="absolute bottom-0 left-1/2 h-[94%] w-auto -translate-x-1/2 select-none object-contain object-bottom"
            draggable={false}
          />
        </div>
        <span aria-hidden className="xh left-0 top-0" />
        <span aria-hidden className="xh left-full top-0" />
        <span aria-hidden className="xh left-0 top-full" />
        <span aria-hidden className="xh left-full top-full" />
      </div>
      <figcaption className="label mt-4">Kolkata, India</figcaption>
    </figure>
  );
}
