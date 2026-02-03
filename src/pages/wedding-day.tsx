"use client";
import { useCallback, useEffect, useState, useMemo } from "react";
import "@/styles/globals.css";
import Head from "next/head";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Preloader from "@/components/preloader";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import * as cloud from "cloudinary";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface GalleryImage {
  src: string;
  thumbnail: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  publicId?: string; // Add Cloudinary public ID
}

// Optimized image modal with proper slide direction
const ImageModal = ({
  currentIndex,
  images,
  onClose,
  onNext,
  onPrev,
  onLoadingChange,
}: {
  currentIndex: number | null;
  images: GalleryImage[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
  onLoadingChange: (loading: boolean) => void;
}) => {
  const [direction, setDirection] = useState<number>(0);

  const handleNext = useCallback(() => {
    onLoadingChange(true);
    setDirection(1); // Moving forward
    onNext();
  }, [onNext, onLoadingChange]);

  const handlePrev = useCallback(() => {
    onLoadingChange(true);
    setDirection(-1); // Moving backward
    onPrev();
  }, [onPrev, onLoadingChange]);

  // Keyboard navigation
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, handleNext, handlePrev, onClose]);

  if (currentIndex === null) return null;

  // Optimized animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Optimized controls with better hover effects */}
      <button
        className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl z-50 p-2 rounded-full hover:bg-white/10 transition-all duration-150"
        onClick={onClose}
        aria-label="Close modal"
      >
        <FaTimes />
      </button>

      <button
        className="absolute left-6 text-white/80 hover:text-white text-4xl z-50 p-3 rounded-full hover:bg-white/10 transition-all duration-150 active:scale-95"
        onClick={handlePrev}
        aria-label="Previous image"
      >
        <FaChevronLeft />
      </button>

      <button
        className="absolute right-6 text-white/80 hover:text-white text-4xl z-50 p-3 rounded-full hover:bg-white/10 transition-all duration-150 active:scale-95"
        onClick={handleNext}
        aria-label="Next image"
      >
        <FaChevronRight />
      </button>

      {/* Optimized image container */}
      <div className="relative w-[90vw] h-[80vh] overflow-hidden rounded-xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex].src}
              alt={`Wedding moment ${currentIndex + 1}`}
              className="absolute top-0 left-0 w-full h-full object-contain"
              sizes="90vw"
              onLoadStart={() => onLoadingChange(true)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Animated image counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm"
        >
          {currentIndex + 1} / {images.length}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Optimized gallery item with smooth animations
const GalleryItem = ({
  img,
  index,
  onImageClick,
  hoveredIndex,
  onHover,
}: {
  img: GalleryImage;
  index: number;
  onImageClick: (index: number) => void;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getGridClass = useMemo(() => {
    const patterns = [
      "md:col-span-2 md:row-span-2", // Large
      "md:col-span-1 md:row-span-1", // Small
      "md:col-span-1 md:row-span-1", // Small
      "md:col-span-1 md:row-span-2", // Tall
      "md:col-span-2 md:row-span-1", // Wide
      "md:col-span-1 md:row-span-1", // Small
    ];
    return patterns[index % patterns.length];
  }, [index]);

  // Intersection observer for lazy loading
  const observerRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: "100px" }
      );
      observer.observe(node);
    }
  }, []);

  return (
    <motion.div
      ref={observerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.95,
      }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.03, 0.5),
        ease: "easeOut",
      }}
      className={`group relative overflow-hidden rounded-xl cursor-pointer ${getGridClass}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onImageClick(index)}
    >
      <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Loading skeleton */}
        {isVisible && !imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        )}

        {isVisible && (
          <img
            src={img.thumbnail || img.src}
            alt={`Wedding moment ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 ease-out ${
              hoveredIndex === index
                ? "scale-105 brightness-110"
                : "scale-100 brightness-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        )}

        {/* Hover overlay with smooth transition */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${
            hoveredIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Photo label with smooth animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: hoveredIndex === index ? 1 : 0,
            y: hoveredIndex === index ? 0 : 10,
          }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 left-3 text-white"
        >
          <div className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
            Photo {index + 1}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
// Optimized getStaticProps with Cloudinary integration
export async function getStaticProps() {
  try {
    const cloudinaryyyy = cloud.v2;
    cloudinaryyyy.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const results = await cloudinaryyyy.search
      .expression("folder:wedding-day")
      .sort_by("public_id", "desc")
      .max_results(1000)
      .execute();

    const images: GalleryImage[] = results.resources.map((resource: any) => {
      const baseUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`;

      return {
        src: `${baseUrl}q_90,f_auto/${resource.public_id}.${resource.format}`, // Reduced quality main image
        thumbnail: `${baseUrl}q_40,w_400,h_400,c_fill,f_auto/${resource.public_id}.${resource.format}`, // Reduced quality thumbnail
        blurDataURL: `${baseUrl}q_5,w_20,h_20,c_fill,f_auto,e_blur:1000/${resource.public_id}.${resource.format}`, // Lower quality placeholder
        width: resource.width,
        height: resource.height,
        publicId: resource.public_id,
      };
    });

    return {
      props: { images },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    return { props: { images: [] } };
  }
}

export default function WeddingDayGalleryPage({
  images,
}: {
  images: GalleryImage[];
}) {
  // Implement virtual scrolling for large image sets
  const INITIAL_LOAD = 20; // Load first 20 images
  const LOAD_INCREMENT = 10; // Load 10 more at a time

  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImageLoading, setModalImageLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Initialize with limited images
  useEffect(() => {
    if (images.length > 0) {
      setVisibleImages(images.slice(0, INITIAL_LOAD));
      setHasMore(images.length > INITIAL_LOAD);
    }
  }, [images]);

  // Optimized handlers
  const showImage = useCallback((index: number) => {
    setModalImageLoading(true);
    setCurrentIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setCurrentIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
  }, [images.length]);

  const showPrev = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : 0
    );
  }, [images.length]);

  // Optimized load more with smaller increments
  const loadMoreImages = useCallback(() => {
    if (isLoading || !hasMore || images.length === 0) return;

    setIsLoading(true);

    setTimeout(() => {
      const currentLength = visibleImages.length;
      const nextImages = images.slice(
        currentLength,
        currentLength + LOAD_INCREMENT
      );

      if (nextImages.length === 0) {
        setHasMore(false);
      } else {
        setVisibleImages((prev) => [...prev, ...nextImages]);
        setHasMore(currentLength + nextImages.length < images.length);
      }

      setIsLoading(false);
    }, 200);
  }, [visibleImages.length, images, isLoading, hasMore]);

  // Optimized scroll handler
  useEffect(() => {
    if (images.length === 0) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.innerHeight + window.scrollY;
          const threshold = document.body.offsetHeight - 500;

          if (scrollY >= threshold && hasMore && !isLoading) {
            loadMoreImages();
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, isLoading, loadMoreImages, images.length]);

  // Simplified preloading - only preload next/prev in modal
  useEffect(() => {
    if (currentIndex !== null && images.length > 0) {
      const nextIndex = (currentIndex + 1) % images.length;
      const prevIndex = (currentIndex - 1 + images.length) % images.length;

      [nextIndex, prevIndex].forEach((index) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = images[index].src;
        document.head.appendChild(link);
      });
    }
  }, [currentIndex, images]);

  if (!images || images.length === 0) {
    return (
      <div
        className={`${playfair.className} antialiased bg-gradient-to-br from-slate-50 via-white to-rose-50`}
      >
        <Preloader />
        <NavBar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-xl text-gray-600">
            No images found in the gallery.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Marvin & Jovelyn - Wedding Day Gallery</title>
        <meta
          name="description"
          content="Wedding Day - A beautiful collection of our special moment"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:title"
          content="Marvin & Jovelyn - Wedding Day Gallery"
        />
        <meta property="og:description" content="Wedding Day Gallery" />
        <meta property="og:type" content="website" />
        {/* Preload only critical images */}
        <link rel="preload" href="/images/RonnelJuna-141.webp" as="image" />
      </Head>

      <div
        className={`${playfair.className} antialiased bg-gradient-to-br from-slate-50 via-white to-rose-50`}
      >
        <Preloader />
        <NavBar />

        {/* Optimized gallery section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 mt-4">
                Wedding Day Moments
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full" />
            </div>

            {/* Optimized grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[200px]">
              {visibleImages.map((img, idx) => (
                <GalleryItem
                  key={`${img.src}-${idx}`}
                  img={img}
                  index={idx}
                  onImageClick={showImage}
                  hoveredIndex={hoveredIndex}
                  onHover={setHoveredIndex}
                />
              ))}
            </div>

            {/* Simplified loading state */}
            {isLoading && (
              <div className="flex justify-center mt-12">
                <div className="w-12 h-12 border-4 border-rose-200 rounded-full animate-spin border-t-rose-500"></div>
              </div>
            )}

            {/* Load more button for better UX */}
            {hasMore && !isLoading && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMoreImages}
                  className="bg-gradient-to-r from-rose-400 to-pink-400 text-white px-8 py-3 rounded-full font-medium hover:from-rose-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
                >
                  Load More Photos
                </button>
              </div>
            )}

            {/* End message */}
            {!hasMore && (
              <div className="text-center mt-12 p-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
                <div className="text-4xl mb-4">💕</div>
                <p className="text-xl text-gray-700 font-medium">
                  You&apos;ve seen all our precious moments!
                </p>
                <p className="text-gray-600 mt-2">
                  Thank you for sharing in our joy
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Modals */}
        <AnimatePresence>
          <ImageModal
            currentIndex={currentIndex}
            images={images}
            onClose={closeModal}
            onNext={showNext}
            onPrev={showPrev}
            isLoading={modalImageLoading}
            onLoadingChange={setModalImageLoading}
          />
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}
