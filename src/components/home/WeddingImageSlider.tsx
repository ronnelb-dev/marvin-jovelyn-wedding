"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const sliderImages = [
  {
    src: "/images/first.png",
    alt: "Marvin and Jovelyn first meeting",
    caption: "Just us, in our favorite little moments.",
  },
  {
    src: "/images/First Meet.png",
    alt: "Marvin and Jovelyn first meeting",
    caption: "The moment our story began",
  },
  {
    src: "/images/frienny.png",
    alt: "Marvin and Jovelyn as friends",
    caption: "From friendship to forever",
  },
  {
    src: "/images/Falling.png",
    alt: "Marvin and Jovelyn falling in love",
    caption: "Slowly, surely, falling in love",
  },
  {
    src: "/images/Official.png",
    alt: "Marvin and Jovelyn becoming official",
    caption: "The day we chose each other",
  },
  {
    src: "/images/o-travel.png",
    alt: "Marvin and Jovelyn traveling together",
    caption: "Every road felt like home",
  },
  {
    src: "/images/international.png",
    alt: "Marvin and Jovelyn on an international trip",
    caption: "Across miles, always together",
  },
  {
    src: "/images/engage.png",
    alt: "Marvin and Jovelyn engagement",
    caption: "Our sweetest yes",
  },
  {
    src: "/images/house.png",
    alt: "Marvin and Jovelyn at home",
    caption: "Building a life, hand in hand",
  },
  {
    src: "/images/favorite.png",
    alt: "Marvin and Jovelyn favorite memory",
    caption: "A favorite moment of ours",
  },
  {
    src: "/images/loading.png",
    alt: "Marvin and Jovelyn loading the next chapter",
    caption: "Loading our forever",
  },
] as const;

export default function WeddingImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
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
    <section className="wedding-image-break wedding-image-break-slider" aria-label="Marvin and Jovelyn portrait gallery">
      <div className="wedding-slider-photo">
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes="100vw"
          className="wedding-slider-image"
        />
      </div>
      <p className="wedding-slider-caption">{activeImage.caption}</p>
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
