"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { ChevronLeft, ChevronRight, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const LIGHTBOX_MIN_ZOOM = 1;
const LIGHTBOX_MAX_ZOOM = 3;
const LIGHTBOX_ZOOM_STEP = 0.5;

export interface LightboxImage {
  id: string;
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  images: LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  imageLoader?: (props: ImageLoaderProps) => string;
  label?: string;
}

export default function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onIndexChange,
  imageLoader,
  label = "Photo viewer",
}: GalleryLightboxProps) {
  const [zoomScale, setZoomScale] = useState(LIGHTBOX_MIN_ZOOM);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchDistanceRef = useRef<number | null>(null);
  const activeIndexRef = useRef(activeIndex);
  const imagesLengthRef = useRef(images.length);
  const onCloseRef = useRef(onClose);
  const onIndexChangeRef = useRef(onIndexChange);
  const activeImage = activeIndex === null ? null : images[activeIndex] ?? null;
  const isOpen = activeIndex !== null;

  activeIndexRef.current = activeIndex;
  imagesLengthRef.current = images.length;
  onCloseRef.current = onClose;
  onIndexChangeRef.current = onIndexChange;

  function resetView() {
    setZoomScale(LIGHTBOX_MIN_ZOOM);
    setPanOffset({ x: 0, y: 0 });
  }

  function move(direction: -1 | 1) {
    if (activeIndex === null) return;
    const nextIndex = activeIndex + direction;
    if (nextIndex < 0 || nextIndex >= images.length) return;
    resetView();
    onIndexChange(nextIndex);
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointersRef.current.size === 2) {
      const points = [...pointersRef.current.values()];
      pinchDistanceRef.current = Math.hypot(
        points[0].x - points[1].x,
        points[0].y - points[1].y,
      );
    }
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const previous = pointersRef.current.get(event.pointerId);
    if (!previous) return;

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointersRef.current.size === 2 && pinchDistanceRef.current) {
      const points = [...pointersRef.current.values()];
      const distance = Math.hypot(
        points[0].x - points[1].x,
        points[0].y - points[1].y,
      );
      setZoomScale((current) =>
        Math.min(
          LIGHTBOX_MAX_ZOOM,
          Math.max(LIGHTBOX_MIN_ZOOM, current * (distance / pinchDistanceRef.current!)),
        ),
      );
      pinchDistanceRef.current = distance;
    } else if (zoomScale > LIGHTBOX_MIN_ZOOM) {
      setPanOffset((current) => ({
        x: current.x + event.clientX - previous.x,
        y: current.y + event.clientY - previous.y,
      }));
    }
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) pinchDistanceRef.current = null;
  }

  useEffect(() => {
    if (activeIndex === null) return;
    setZoomScale(LIGHTBOX_MIN_ZOOM);
    setPanOffset({ x: 0, y: 0 });
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeRef.current?.focus(), 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const current = activeIndexRef.current;
      if (current === null) return;
      const nextIndex = current + (event.key === "ArrowLeft" ? -1 : 1);
      if (nextIndex >= 0 && nextIndex < imagesLengthRef.current) {
        onIndexChangeRef.current(nextIndex);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  if (!activeImage || activeIndex === null) return null;

  return (
    <div
      className="wedding-gallery-lightbox-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="wedding-gallery-lightbox" role="dialog" aria-modal="true" aria-label={label}>
        <button ref={closeRef} type="button" className="wedding-gallery-lightbox-close" onClick={onClose} aria-label="Close photo viewer">
          <X size={24} />
        </button>
        <button type="button" className="wedding-gallery-lightbox-nav wedding-gallery-lightbox-prev" onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="Previous image">
          <ChevronLeft size={32} />
        </button>
        <div className="wedding-gallery-lightbox-stage" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
          <Image
            loader={imageLoader}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="100vw"
            className="wedding-gallery-lightbox-image"
            style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomScale})` }}
          />
        </div>
        <button type="button" className="wedding-gallery-lightbox-nav wedding-gallery-lightbox-next" onClick={() => move(1)} disabled={activeIndex === images.length - 1} aria-label="Next image">
          <ChevronRight size={32} />
        </button>
        <div className="wedding-gallery-lightbox-tools" aria-label="Zoom controls">
          <button type="button" onClick={() => setZoomScale((current) => Math.max(LIGHTBOX_MIN_ZOOM, current - LIGHTBOX_ZOOM_STEP))} aria-label="Zoom out"><ZoomOut size={20} /></button>
          <button type="button" onClick={resetView} aria-label="Reset zoom"><RotateCcw size={18} /></button>
          <button type="button" onClick={() => setZoomScale((current) => Math.min(LIGHTBOX_MAX_ZOOM, current + LIGHTBOX_ZOOM_STEP))} aria-label="Zoom in"><ZoomIn size={20} /></button>
        </div>
      </div>
    </div>
  );
}
