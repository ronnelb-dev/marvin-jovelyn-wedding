import type { Metadata } from "next";
import Link from "next/link";
import { Camera, ChevronRight, Images } from "lucide-react";

import { curatedGalleries, guestGallery } from "@/lib/gallery-catalog";

export const metadata: Metadata = {
  title: "Photo Galleries - Marvin & Jovelyn Wedding",
  description:
    "Browse photos from Marvin and Jovelyn's proposal, prenup, wedding, photobooth, and guests.",
};

export default function GalleryPage() {
  return (
    <main className="wedding-home wedding-gallery-page">
      <header className="wedding-gallery-hero wedding-gallery-directory-hero">
        <p className="wedding-kicker">our photographs</p>
        <h1>Memories, gathered with love</h1>
        <p>Explore the moments that brought us here and the celebration we shared with the people we love.</p>
      </header>

      <section className="wedding-gallery-directory" aria-labelledby="gallery-directory-title">
        <div className="wedding-gallery-directory-heading">
          <p className="wedding-kicker">gallery directory</p>
          <h2 id="gallery-directory-title">Choose a collection</h2>
        </div>

        <div className="wedding-gallery-directory-primary">
          <Link href={guestGallery.route} className="wedding-gallery-folder-card">
            <span className="wedding-gallery-folder-icon"><Camera aria-hidden="true" /></span>
            <span className="wedding-gallery-folder-copy">
              <small>{guestGallery.kicker}</small>
              <strong>{guestGallery.title}</strong>
              <span>{guestGallery.description}</span>
            </span>
            <ChevronRight className="wedding-gallery-folder-arrow" aria-hidden="true" />
          </Link>

          {curatedGalleries.map((gallery) => (
            <Link href={gallery.route} className="wedding-gallery-folder-card" key={gallery.id}>
              <span className="wedding-gallery-folder-icon"><Images aria-hidden="true" /></span>
              <span className="wedding-gallery-folder-copy">
                <small>{gallery.kicker}</small>
                <strong>{gallery.title}</strong>
                <span>{gallery.description}</span>
              </span>
              <ChevronRight className="wedding-gallery-folder-arrow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
