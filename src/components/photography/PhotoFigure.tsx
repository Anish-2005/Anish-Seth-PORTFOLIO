import { CornerMarks, Photo } from "@/components/photography/Photo";
import { Icon } from "@/components/ui/Icon";
import type { ResolvedPhoto } from "@/data/photography";
import { profile } from "@/data/profile";
import { formatNoteDate } from "@/lib/seo-content";
import { cn } from "@/lib/utils";

/** Wider than this and a photo takes the whole row. */
const WIDE_RATIO = 1.2;

/** One photo with its caption, details and a link to the full-size file. */
export function PhotoFigure({ photo, priority }: { photo: ResolvedPhoto; priority?: boolean }) {
  const wide = photo.width / photo.height > WIDE_RATIO;
  const details = [photo.location, photo.taken ? formatNoteDate(photo.taken) : null].filter(Boolean);

  return (
    // The id is the anchor structured data uses for this image.
    <figure id={photo.slug} className={cn("min-w-0", wide && "sm:col-span-2")} data-reveal={priority ? undefined : true}>
      <div className="relative">
        <a href={photo.src} className="group block overflow-hidden" aria-label={`Open ${photo.title} at full size`}>
          <Photo
            photo={photo}
            priority={priority}
            sizes={wide ? "(min-width: 1280px) 860px, (min-width: 1024px) 68vw, 94vw" : "(min-width: 1280px) 414px, (min-width: 1024px) 34vw, (min-width: 640px) 46vw, 94vw"}
            className="transition-transform duration-700 ease-[var(--ease-out-expo)] motion-safe:group-hover:scale-[1.02]"
          />
        </a>
        <CornerMarks />
      </div>
      <figcaption className="mt-4 border-b border-line pb-5">
        <h2 className="text-[1.15rem] font-semibold tracking-[-0.02em] [font-stretch:110%]">{photo.title}</h2>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted text-pretty">{photo.caption}</p>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="label">
            {details.length ? `${details.join(" · ")} · ` : null}
            {photo.creator === profile.name ? `© ${photo.creator}` : `Photo: ${photo.creator}`}
          </p>
          <a href={photo.src} className="link-u inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-muted hover:text-fg">
            Full size {photo.width}×{photo.height} <Icon name="arrow-up-right" size={12} className="text-accent-ink" />
          </a>
        </div>
      </figcaption>
    </figure>
  );
}
