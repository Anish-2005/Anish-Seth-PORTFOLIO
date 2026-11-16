import Image from "next/image";

/** Trimmed transparent cutout (public/portrait.webp). The share-image copy lives in src/assets. */
export const PORTRAIT = { src: "/portrait.webp", width: 1019, height: 1438, alt: "Portrait of Anish Seth" } as const;

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
