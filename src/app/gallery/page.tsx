import type { Metadata } from "next";

import GuestPhotoGallery from "@/components/gallery/GuestPhotoGallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Guest Photo Gallery - Marvin & Jovelyn Wedding",
  description:
    "Share and view guest photos from Marvin and Jovelyn's wedding celebration.",
};

export default function GalleryPage() {
  return (
    <main className="wedding-home wedding-gallery-page">
      <GuestPhotoGallery />
      <Footer />
    </main>
  );
}
