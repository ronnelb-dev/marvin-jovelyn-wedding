"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const sliderImages = [
  {
    src: "/images/slider1.webp",
    alt: "Marvin and Jovelyn wedding gallery photo 1",
  },
  {
    src: "/images/slider2.webp",
    alt: "Marvin and Jovelyn standing together on a forest trail",
  },
  {
    src: "/images/slider3.webp",
    alt: "Marvin and Jovelyn wedding gallery photo 3",
  },
  {
    src: "/images/slider4.webp",
    alt: "Marvin and Jovelyn wedding gallery photo 4",
  },
  {
    src: "/images/slider5.webp",
    alt: "Marvin and Jovelyn wedding gallery photo 5",
  },
  {
    src: "/images/slider6.webp",
    alt: "Marvin and Jovelyn wedding gallery photo 6",
  },
  {
    src: "/images/slider7.webp",
    alt: "Marvin and Jovelyn smiling during a desert trip",
  },
  {
    src: "/images/DSC03524.jpg",
    alt: "Marvin and Jovelyn wedding gallery photo DSC03524",
  },
  {
    src: "/images/DSC03570.jpg",
    alt: "Marvin and Jovelyn wedding gallery photo DSC03570",
  },
  {
    src: "/images/DSC03657.jpg",
    alt: "Marvin and Jovelyn wedding gallery photo DSC03657",
  },
  {
    src: "/images/DSC03678.jpg",
    alt: "Marvin and Jovelyn wedding gallery photo DSC03678",
  },
  {
    src: "/images/DSC03898.jpg",
    alt: "Marvin and Jovelyn wedding gallery photo DSC03898",
  },
  {
    src: "/images/DSC03880.jpg",
    alt: "Marvin and Jovelyn wedding gallery photo DSC03880",
  },
  {
    src: "/images/DSC03826.jpg",
    alt: "Marvin and Jovelyn wedding gallery photo DSC03826",
  },
  {
    src: "/images/DSC03776.jpg",
    alt: "Marvin and Jovelyn wedding gallery photo DSC03776",
  },
  {
    src: "/images/DSC03597.jpg",
    alt: "Marvin and Jovelyn wedding gallery photo DSC03597",
  },
  {
    src: "/images/DSC03554.jpg",
    alt: "Marvin and Jovelyn wedding gallery photo DSC03554",
  },
] as const;

export default function WeddingImageSlider() {
  const [activeIndex, setActiveIndex] = useState(1);
  const activeImage = sliderImages[activeIndex];

  const showPreviousImage = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? sliderImages.length - 1 : currentIndex - 1
    );
  };

  const showNextImage = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === sliderImages.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <section className="wedding-image-break" aria-label="Marvin and Jovelyn portrait gallery">
      <div className="wedding-hero-overlay" />
      <Image
        src={activeImage.src}
        alt={activeImage.alt}
        fill
        sizes="100vw"
        className="wedding-cover"
      />
      <button
        type="button"
        className="wedding-slider-button wedding-slider-button-previous"
        aria-label="Show previous gallery image"
        onClick={showPreviousImage}
      >
        <ChevronLeft size={26} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="wedding-slider-button wedding-slider-button-next"
        aria-label="Show next gallery image"
        onClick={showNextImage}
      >
        <ChevronRight size={26} aria-hidden="true" />
      </button>
    </section>
  );
}
