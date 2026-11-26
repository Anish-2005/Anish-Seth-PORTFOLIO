/**
 * The catalog (hand-written words) joined with the manifest (generated file sizes): what pages,
 * structured data and the sitemap read.
 */
import { catalog, type Photo, type PhotoSeries } from "./photography.catalog";
import manifest from "./photography.generated.json";
import { profile } from "./profile";

export type ResolvedPhoto = Photo & {
  creator: string;
  /** Size of the largest file. */
  width: number;
  height: number;
  /** Tiny inline preview shown while the image loads. */
  blur: string;
  /** Site-relative URL of the largest file. */
  src: string;
  /** Site-relative URL of the smallest file. */
  thumbnail: string;
  srcSet: string;
};

export type Series = Omit<PhotoSeries, "photos"> & { photos: ResolvedPhoto[]; cover: ResolvedPhoto };

type Generated = { series: string; width: number; height: number; widths: number[]; blur: string };

const files: Record<string, Generated | undefined> = manifest;

function resolve(series: string, photo: Photo): ResolvedPhoto {
  const generated = files[photo.slug];
  // Failing the build beats publishing a broken image.
  if (!generated || generated.series !== series) {
    throw new Error(`No files for photo "${photo.slug}". Run \`npm run photos\` and commit the result.`);
  }
  const url = (w: number) => `/photos/${series}/${photo.slug}-${w}.webp`;
  const { widths, width, height, blur } = generated;
  return {
    ...photo,
    creator: photo.photographer ?? profile.name,
    width,
    height,
    blur,
    src: url(widths[widths.length - 1]),
    thumbnail: url(widths[0]),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(", "),
  };
}

/** Series that have at least one photo. */
export const photoSeries: Series[] = catalog
  .filter((s) => s.photos.length > 0)
  .map((s) => {
    const photos = s.photos.map((p) => resolve(s.slug, p));
    return { ...s, photos, cover: photos[0] };
  });

/** The portrait on /photography: the first series' cover. */
export const featuredPhoto = photoSeries[0].cover;

/** The most recent change across all series (YYYY-MM-DD). */
export const photographyUpdated = photoSeries.reduce((latest, s) => (s.updated > latest ? s.updated : latest), "");
