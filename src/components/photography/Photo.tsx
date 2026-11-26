import type { ResolvedPhoto } from "@/data/photography";
import { cn } from "@/lib/utils";

type PhotoProps = {
  photo: ResolvedPhoto;
  /** How wide the image is drawn, so the browser can pick a file. */
  sizes: string;
  /** For the first image on screen: load it straight away. */
  priority?: boolean;
  className?: string;
};

/**
 * A gallery image served exactly as `npm run photos` wrote it. Deliberately not next/image: the
 * optimiser strips the embedded creator and license data and hides the descriptive file name behind
 * a query string, both of which image search reads.
 */
export function Photo({ photo, sizes, priority = false, className }: PhotoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see the note above
    <img
      // The largest file is the canonical one: it's what crawlers that ignore srcset will index.
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      // A placeholder behind a cutout would show through its transparent parts.
      className={cn("block h-auto w-full", !photo.cutout && "bg-bg-elev bg-cover", className)}
      style={photo.cutout ? undefined : { backgroundImage: `url(${photo.blur})` }}
    />
  );
}
