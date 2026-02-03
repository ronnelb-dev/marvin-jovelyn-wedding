// components/Hero.tsx
import { FC, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import Image from "next/image";
import HeroContent from "@/components/Hero-Content";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Move images outside component to prevent recreation on every render
const HERO_IMAGES = [
  "/images/slider1.webp",
  "/images/slider2.webp",
  "/images/slider3.webp",
  "/images/slider4.webp",
  "/images/slider5.webp",
  "/images/slider6.webp",
  "/images/slider7.webp",
  "/images/slider8.webp",
] as const;

// Memoize Swiper configuration
const SWIPER_CONFIG = {
  spaceBetween: 30,
  allowTouchMove: false,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  modules: [EffectFade, Autoplay],
  effect: "fade" as const,
  loop: true,
};

const Hero: FC = () => {
  // Memoize slides to prevent recreation on every render
  const slides = useMemo(() => 
    HERO_IMAGES.map((src, index) => (
      <SwiperSlide key={src}>
        <div className="relative h-screen w-full">
          {/* Optimized Next.js Image component */}
          <Image
            src={src}
            alt={`Hero slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0} // Priority load for first image
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25" />
          
          {/* Content */}
          <HeroContent textColor="text-white" />
        </div>
      </SwiperSlide>
    )), 
    []
  );

  return (
    <section className="relative h-screen">
      <Swiper {...SWIPER_CONFIG}>
        {slides}
      </Swiper>
    </section>
  );
};

export default Hero;
