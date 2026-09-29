export type CuratedGalleryId =
  | "photobooth"
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
    id: "proposal",
    title: "The Proposal",
    kicker: "where forever began",
    description: "A collection from the moment that began our next chapter.",
    route: "/gallery/prenup-photos/proposal",
    segments: ["prenup-photos", "proposal"],
    cloudinaryFolder: "marvin-jovelyn-wedding/prenup-photos/proposal",
  },
  {
    id: "wedding-photos",
    title: "Wedding Photos",
    kicker: "before the vows",
    description: "Portraits from the quiet, beautiful days leading to our wedding.",
    route: "/gallery/prenup-photos/wedding-photos",
    segments: ["prenup-photos", "wedding-photos"],
    cloudinaryFolder: "marvin-jovelyn-wedding/prenup-photos/wedding-photos",
  },
  {
    id: "wedding-sde",
    title: "Wedding SDE",
    kicker: "the day as it happened",
    description: "Highlights and stills from our same-day wedding story.",
    route: "/gallery/prenup-photos/wedding-sde",
    segments: ["prenup-photos", "wedding-sde"],
    cloudinaryFolder: "marvin-jovelyn-wedding/prenup-photos/wedding-sde",
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
