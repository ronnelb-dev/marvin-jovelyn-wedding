"use client";
import { useCallback, useEffect, useState, useMemo } from "react";
import "@/styles/globals.css";
import Head from "next/head";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Preloader from "@/components/preloader";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

interface CloudinaryResource {
  public_id: string;
  format: string;
  width: number;
  height: number;
  secure_url: string;
  created_at: string;
}

interface GalleryImage {
  src: string;
  blurDataURL?: string;
  width: number;
  height: number;
  publicId: string;
}

const BATCH_SIZE = 20;
const PREFETCH_DISTANCE = 2;

// Cloudinary URL builder with transformations
const buildCloudinaryUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
    crop?: string;
  } = {}
) => {
  const {
    width,
    height,
    quality = 75,
    format = "auto",
    crop = "fill",
  } = options;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  const transformations = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop && (width || height)) transformations.push(`c_${crop}`);
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);
  
  const transformString = transformations.join(',');
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;
};

// Generate blur placeholder
const generateBlurDataURL = (publicId: string): string => {
  return buildCloudinaryUrl(publicId, {
    width: 10,
    height: 10,
    quality: 10,
    format: "jpg",
  });
};

// Fetch images from Cloudinary
const fetchCloudinaryImages = async (): Promise<GalleryImage[]> => {
  try {
    const response = await fetch('/api/cloudinary-prenup-images');
    
    if (!response.ok) {
      throw new Error('Failed to fetch images from Cloudinary');
    }
    
    const data = await response.json();
    
    return data.resources.map((resource: CloudinaryResource) => ({
      src: buildCloudinaryUrl(resource.public_id),
      publicId: resource.public_id,
      width: resource.width,
      height: resource.height,
      blurDataURL: generateBlurDataURL(resource.public_id),
    }));
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    return [];
  }
};

// Get optimized image URL based on use case
const getOptimizedImageUrl = (
  publicId: string,
  width: number,
  quality: number = 75
): string => {
  return buildCloudinaryUrl(publicId, {
    width,
    quality,
    format: "auto",
  });
};

const ImageModal = ({
  currentIndex,
  images,
  onClose,
  onNext,
  onPrev,
  isLoading,
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
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [animationKey, setAnimationKey] = useState(0);

  const handleNext = useCallback(() => {
    setSlideDirection("right");
    setAnimationKey(prev => prev + 1);
    onLoadingChange(true);
    onNext();
  }, [onNext, onLoadingChange]);

  const handlePrev = useCallback(() => {
    setSlideDirection("left");
    setAnimationKey(prev => prev + 1);
    onLoadingChange(true);
    onPrev();
  }, [onPrev, onLoadingChange]);

  // Prefetch adjacent images
  useEffect(() => {
    if (currentIndex === null || images.length === 0) return;

    const prefetchImages = [];
    for (let i = 1; i <= PREFETCH_DISTANCE; i++) {
      const nextIndex = (currentIndex + i) % images.length;
      const prevIndex = (currentIndex - i + images.length) % images.length;
      prefetchImages.push(nextIndex, prevIndex);
    }

    prefetchImages.forEach(index => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = getOptimizedImageUrl(images[index].publicId, 1920, 85);
      document.head.appendChild(link);
    });
  }, [currentIndex, images]);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl z-50 p-2 rounded-full hover:bg-white/10 transition-all duration-200"
        onClick={onClose}
        aria-label="Close modal"
      >
        <FaTimes />
      </button>

      <button
        className="absolute left-6 text-white/80 hover:text-white text-4xl z-50 p-3 rounded-full hover:bg-white/10 transition-all duration-200"
        onClick={handlePrev}
        aria-label="Previous image"
      >
        <FaChevronLeft />
      </button>

      <button
        className="absolute right-6 text-white/80 hover:text-white text-4xl z-50 p-3 rounded-full hover:bg-white/10 transition-all duration-200"
        onClick={handleNext}
        aria-label="Next image"
      >
        <FaChevronRight />
      </button>

      <div className="relative w-[90vw] h-[80vh] overflow-hidden rounded-xl">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm">
            <div className="w-12 h-12 border-4 border-white/30 rounded-full animate-spin border-t-white"></div>
          </div>
        )}

        <AnimatePresence mode="wait" custom={slideDirection}>
          <motion.div
            key={`${currentIndex}-${animationKey}`}
            custom={slideDirection}
            variants={{
              enter: (direction: string) => ({
                x: direction === "left" ? -100 : 100,
                opacity: 0,
              }),
              center: {
                x: 0,
                opacity: 1,
              },
              exit: (direction: string) => ({
                x: direction === "left" ? 100 : -100,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.3,
            }}
            className="absolute inset-0"
          >
            <Image
              src={getOptimizedImageUrl(images[currentIndex].publicId, 1920, 85)}
              alt={`Prenup moment ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              onLoadStart={() => onLoadingChange(true)}
              onLoadingComplete={() => onLoadingChange(false)}
              onError={() => onLoadingChange(false)}
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </motion.div>
  );
};

const GalleryItem = ({
  img,
  index,
  onImageClick,
  hoveredIndex,
  onHover,
  isVisible,
}: {
  img: GalleryImage;
  index: number;
  onImageClick: (index: number) => void;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  isVisible: boolean;
}) => {
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

  // Determine appropriate image size based on grid position
  const imageWidth = useMemo(() => {
    const gridClass = getGridClass;
    if (gridClass.includes("col-span-2")) return 600;
    return 400;
  }, [getGridClass]);

  // Reduced animation delay for better performance
  const animationDelay = Math.min(index * 0.02, 0.5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: animationDelay,
        ease: "easeOut"
      }}
      className={`group relative overflow-hidden rounded-xl cursor-pointer ${getGridClass}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onImageClick(index)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200">
        {isVisible && (
          <Image
            src={getOptimizedImageUrl(img.publicId, imageWidth)}
            alt={`Prenup moment ${index + 1}`}
            fill
            className={`object-cover transition-all duration-500 ease-out ${
              hoveredIndex === index
                ? "scale-105 brightness-110"
                : "scale-100 brightness-100"
            }`}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading={index < 6 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL={img.blurDataURL}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: hoveredIndex === index ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: hoveredIndex === index ? 1 : 0,
            y: hoveredIndex === index ? 0 : 10
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

export default function PrenupGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [visibleImages, setVisibleImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImageLoading, setModalImageLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load images on client side
  useEffect(() => {
    const loadImages = async () => {
      try {
        const imageList = await fetchCloudinaryImages();
        setImages(imageList);
        setVisibleImages(imageList.slice(0, BATCH_SIZE));
        setHasMore(imageList.length > BATCH_SIZE);
      } catch (error) {
        console.error("Error loading images:", error);
        setImages([]);
      } finally {
        setInitialLoading(false);
      }
    };

    loadImages();
  }, []);

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

  const loadMoreImages = useCallback(() => {
    if (isLoading || !hasMore || images.length === 0) return;

    setIsLoading(true);

    // Simulate network delay and load more images
    setTimeout(() => {
      const nextImages = images.slice(
        visibleImages.length,
        visibleImages.length + BATCH_SIZE
      );

      if (nextImages.length === 0) {
        setHasMore(false);
      } else {
        setVisibleImages((prev) => [...prev, ...nextImages]);
      }

      setIsLoading(false);
    }, 300);
  }, [visibleImages.length, images, isLoading, hasMore]);

  // Improved scroll handling with throttling
  useEffect(() => {
    if (images.length === 0 || initialLoading) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollY = window.innerHeight + window.scrollY;
        const threshold = document.body.offsetHeight - 500; // Increased threshold

        if (scrollY >= threshold && hasMore && !isLoading) {
          loadMoreImages();
        }
      }, 100); // Throttle to 100ms
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [hasMore, isLoading, loadMoreImages, images.length, initialLoading]);

  if (initialLoading) {
    return (
      <div className={`${playfair.className} antialiased bg-gradient-to-br from-slate-50 via-white to-rose-50`}>
        <Preloader />
        <NavBar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-rose-200 rounded-full animate-spin border-t-rose-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading gallery...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className={`${playfair.className} antialiased bg-gradient-to-br from-slate-50 via-white to-rose-50`}>
        <Preloader />
        <NavBar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-xl text-gray-600">No images found in the gallery.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Marvin & Jovelyn - Prenup Gallery</title>
        <meta name="description" content="Prenup Day - A beautiful collection of our special moment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Marvin & Jovelyn - Prenup Gallery" />
        <meta property="og:description" content="Prenup Day" />
        <meta property="og:type" content="website" />
        {/* Preload critical CSS */}
        <link rel="preload" href="/styles/globals.css" as="style" />
      </Head>

      <div className={`${playfair.className} antialiased bg-gradient-to-br from-slate-50 via-white to-rose-50`}>
        <Preloader />
        <NavBar />

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Prenup Gallery
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[200px]">
              {visibleImages.map((img, idx) => (
                <GalleryItem
                  key={`${img.src}-${idx}`}
                  img={img}
                  index={idx}
                  onImageClick={showImage}
                  hoveredIndex={hoveredIndex}
                  onHover={setHoveredIndex}
                  isVisible={idx < visibleImages.length}
                />
              ))}
            </div>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center mt-16"
              >
                <div className="relative">
                  <motion.div 
                    className="w-16 h-16 border-4 border-rose-200 rounded-full border-t-rose-500"
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                <motion.p 
                  className="text-gray-600 mt-4 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Loading more memories...
                </motion.p>
              </motion.div>
            )}

            {!hasMore && visibleImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-16 p-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl"
              >
                <div className="text-4xl mb-4">💕</div>
                <p className="text-xl text-gray-700 font-medium">
                  You&apos;ve seen all our precious moments!
                </p>
                <p className="text-gray-600 mt-2">Thank you for sharing in our joy</p>
              </motion.div>
            )}
          </div>
        </section>

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