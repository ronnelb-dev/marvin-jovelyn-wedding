"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { AlertCircle, Camera, Loader2, RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import type { CuratedGalleryId } from "@/lib/gallery-catalog";

interface GalleryImage {
  id: string;
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
  createdAt: string;
}

interface GalleryResponse {
  success: true;
  data: GalleryImage[];
  nextCursor: string | null;
}

interface CuratedGalleryProps {
  galleryId: CuratedGalleryId;
  title: string;
}

function cloudinaryImageLoader({ src, width }: ImageLoaderProps) {
  const marker = "/image/upload/";
  if (!src.includes(marker)) return src;
  const transformation = `f_auto,q_auto,c_limit,w_${Math.min(width, 2400)}`;
  return src.replace(marker, `${marker}${transformation}/`);
}

function getImageAlt(publicId: string, title: string) {
  const fileName = publicId.split("/").pop()?.replace(/[-_]+/g, " ").trim();
  return fileName ? `${fileName} — ${title}` : `${title} gallery photo`;
}

export default function CuratedGallery({ galleryId, title }: CuratedGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const requestInFlightRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const loadPage = useCallback(async (cursor: string | null, replace: boolean) => {
    if (replace) {
      abortRef.current?.abort();
      requestInFlightRef.current = false;
    }
    if (requestInFlightRef.current) return;
    requestInFlightRef.current = true;
    setErrorMessage("");
    if (replace) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    const controller = new AbortController();
    abortRef.current?.abort();
    abortRef.current = controller;

    try {
      const params = new URLSearchParams({ gallery: galleryId });
      if (cursor) params.set("cursor", cursor);
      const response = await fetch(`/api/cloudinary-gallery?${params}`, {
        signal: controller.signal,
      });
      const result = (await response.json()) as GalleryResponse & { error?: string };
      if (!response.ok || result.success !== true) {
        throw new Error(result.error || "We could not load this gallery.");
      }

      setImages((current) => {
        const base = replace ? [] : current;
        const seen = new Set(base.map((image) => image.id));
        return [...base, ...result.data.filter((image) => !seen.has(image.id))];
      });
      setNextCursor(result.nextCursor);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setErrorMessage(error instanceof Error ? error.message : "We could not load this gallery.");
      }
    } finally {
      if (abortRef.current === controller) {
        setIsLoading(false);
        setIsLoadingMore(false);
        requestInFlightRef.current = false;
      }
    }
  }, [galleryId]);

  useEffect(() => {
    setImages([]);
    setNextCursor(null);
    loadPage(null, true);
    return () => abortRef.current?.abort();
  }, [loadPage, reloadToken]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || isLoading || isLoadingMore || !nextCursor || errorMessage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadPage(nextCursor, false);
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [errorMessage, isLoading, isLoadingMore, loadPage, nextCursor]);

  const lightboxImages = useMemo(
    () => images.map((image) => ({ id: image.id, src: image.secureUrl, alt: getImageAlt(image.publicId, title) })),
    [images, title],
  );

  if (isLoading) {
    return (
      <div className="wedding-curated-grid" aria-label={`Loading ${title}`} aria-busy="true">
        {Array.from({ length: 6 }, (_, index) => <div className="wedding-curated-skeleton" key={index} />)}
      </div>
    );
  }

  if (errorMessage && images.length === 0) {
    return (
      <div className="wedding-gallery-empty wedding-gallery-error" role="alert">
        <AlertCircle size={36} />
        <h2>We couldn&apos;t open this gallery</h2>
        <p>{errorMessage}</p>
        <button type="button" className="wedding-gallery-retry" onClick={() => setReloadToken((value) => value + 1)}>
          <RefreshCcw size={18} /> Try again
        </button>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="wedding-gallery-empty">
        <Camera size={36} />
        <h2>This gallery is waiting for its first memory</h2>
        <p>Please check back again soon.</p>
      </div>
    );
  }

  return (
    <>
      <div className="wedding-curated-grid">
        {images.map((image, index) => (
          <button
            type="button"
            className="wedding-curated-image"
            key={image.id}
            onClick={() => setActiveIndex(index)}
            aria-label={`Open ${getImageAlt(image.publicId, title)}`}
          >
            <Image
              loader={cloudinaryImageLoader}
              src={image.secureUrl}
              alt={getImageAlt(image.publicId, title)}
              fill
              sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <div ref={sentinelRef} className="wedding-gallery-scroll-sentinel" aria-hidden="true" />
      {isLoadingMore ? (
        <p className="wedding-gallery-scroll-status" role="status">
          <Loader2 size={18} className="wedding-gallery-spinner" /> Loading more photos...
        </p>
      ) : null}
      {errorMessage ? (
        <div className="wedding-gallery-load-more-error" role="alert">
          <span>{errorMessage}</span>
          <button type="button" onClick={() => loadPage(nextCursor, false)}>Try again</button>
        </div>
      ) : null}
      {!nextCursor && !isLoadingMore ? (
        <p className="wedding-gallery-scroll-status wedding-gallery-scroll-end" role="status">
          You&apos;ve reached the end of this gallery.
        </p>
      ) : null}

      <GalleryLightbox
        images={lightboxImages}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onIndexChange={setActiveIndex}
        imageLoader={cloudinaryImageLoader}
        label={`${title} photo viewer`}
      />
    </>
  );
}
