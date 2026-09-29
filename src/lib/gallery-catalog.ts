export type CuratedGalleryId =
  | "photobooth"
  | "prenup-photos"
  | "proposal"
  | "wedding-photos"
  | "wedding-sde";

export interface GalleryCatalogEntry {
  id: CuratedGalleryId;
  title: string;
  kicker: string;
  description: string;
  route: string;
  segments: string[];
  cloudinaryFolder: string;
  video?: {
    youtubeId: string;
    title: string;
    kicker: string;
    heading: string;
    description: string;
  };
}

export const guestGallery = {
  title: "Guest Photos",
  kicker: "shared by our people",
  description: "The candid moments, happy tears, and celebrations captured by our favorite people.",
  route: "/gallery/guest-photos",
  segments: ["guest-photos"],
} as const;

export const curatedGalleries: GalleryCatalogEntry[] = [
  {
    id: "photobooth",
    title: "Photobooth",
    kicker: "joy in every frame",
    description: "Playful portraits and spontaneous snapshots from the celebration.",
    route: "/gallery/photobooth",
    segments: ["photobooth"],
    cloudinaryFolder: "marvin-jovelyn-wedding/photobooth",
  },
  {
    id: "prenup-photos",
    title: "Prenup Photos",
    kicker: "before the vows",
    description: "Portraits from the beautiful days leading up to our wedding.",
    route: "/gallery/prenup-photos",
    segments: ["prenup-photos"],
    cloudinaryFolder: "marvin-jovelyn-wedding/prenup-photos",
    video: {
      youtubeId: "TuiVa2W_o80",
      title: "Marvin and Jovelyn prenup video",
      kicker: "our prenup film",
      heading: "Before we said I do",
      description: "A glimpse into our story before the wedding day.",
    },
  },
  {
    id: "proposal",
    title: "The Proposal",
    kicker: "where forever began",
    description: "A collection from the moment that began our next chapter.",
    route: "/gallery/proposal",
    segments: ["proposal"],
    cloudinaryFolder: "marvin-jovelyn-wedding/proposal",
  },
  {
    id: "wedding-photos",
    title: "Wedding Photos",
    kicker: "before the vows",
    description: "Portraits from the quiet, beautiful days leading to our wedding.",
    route: "/gallery/wedding-photos",
    segments: ["wedding-photos"],
    cloudinaryFolder: "marvin-jovelyn-wedding/wedding-photos",
  },
  {
    id: "wedding-sde",
    title: "Wedding SDE",
    kicker: "the day as it happened",
    description: "Highlights and stills from our same-day wedding story.",
    route: "/gallery/wedding-sde",
    segments: ["wedding-sde"],
    cloudinaryFolder: "marvin-jovelyn-wedding/wedding-sde",
    video: {
      youtubeId: "1qd5mfj7MfE",
      title: "Marvin and Jovelyn wedding same-day edit",
      kicker: "our wedding film",
      heading: "The day we became forever",
      description: "Relive the joy, laughter, and love from our wedding day.",
    },
  },
];

export function getCuratedGalleryById(id: string) {
  return curatedGalleries.find((gallery) => gallery.id === id);
}

export function getCuratedGalleryBySegments(segments: string[]) {
  const path = segments.join("/");
  return curatedGalleries.find((gallery) => gallery.segments.join("/") === path);
}

export function isGuestGallerySegments(segments: string[]) {
  return segments.length === 1 && segments[0] === "guest-photos";
}
