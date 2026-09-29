import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

import CuratedGallery from "@/components/gallery/CuratedGallery";
import GuestPhotoGallery from "@/components/gallery/GuestPhotoGallery";
import {
  curatedGalleries,
  getCuratedGalleryBySegments,
  guestGallery,
  isGuestGallerySegments,
} from "@/lib/gallery-catalog";

interface GalleryRouteProps {
  params: Promise<{ segments: string[] }>;
}

export function generateStaticParams() {
  return [
    { segments: [...guestGallery.segments] },
    ...curatedGalleries.map((gallery) => ({ segments: gallery.segments })),
  ];
}

export async function generateMetadata({ params }: GalleryRouteProps): Promise<Metadata> {
  const { segments } = await params;
  if (isGuestGallerySegments(segments)) {
    return {
      title: "Guest Photos - Marvin & Jovelyn Wedding",
      description: "Share and browse wedding memories captured by Marvin and Jovelyn's guests.",
    };
  }

  const gallery = getCuratedGalleryBySegments(segments);
  if (!gallery) return {};
  return {
    title: `${gallery.title} - Marvin & Jovelyn Wedding`,
    description: gallery.description,
  };
}

function GalleryHeader({ title, kicker, description, isPrenup = false }: { title: string; kicker: string; description: string; isPrenup?: boolean }) {
  return (
    <>
      <nav className="wedding-gallery-breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><Link href="/gallery">Galleries</Link></li>
          {isPrenup ? <li><ChevronRight aria-hidden="true" /><Link href="/gallery#prenup-photos">Prenup Photos</Link></li> : null}
          <li aria-current="page"><ChevronRight aria-hidden="true" /><span>{title}</span></li>
        </ol>
      </nav>
      <header className="wedding-gallery-hero wedding-gallery-collection-hero">
        <p className="wedding-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
    </>
  );
}

export default async function GalleryCollectionPage({ params }: GalleryRouteProps) {
  const { segments } = await params;

  if (isGuestGallerySegments(segments)) {
    return (
      <main className="wedding-home wedding-gallery-page">
        <GalleryHeader title={guestGallery.title} kicker={guestGallery.kicker} description={guestGallery.description} />
        <GuestPhotoGallery />
      </main>
    );
  }

  const gallery = getCuratedGalleryBySegments(segments);
  if (!gallery) notFound();

  return (
    <main className="wedding-home wedding-gallery-page">
      <GalleryHeader title={gallery.title} kicker={gallery.kicker} description={gallery.description} isPrenup={gallery.segments[0] === "prenup-photos"} />
      <section className="wedding-gallery-section wedding-curated-section" aria-label={`${gallery.title} photos`}>
        <CuratedGallery galleryId={gallery.id} title={gallery.title} />
      </section>
    </main>
  );
}
