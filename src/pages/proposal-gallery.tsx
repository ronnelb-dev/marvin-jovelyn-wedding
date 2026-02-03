"use client";
import { useCallback, useEffect, useState, useMemo } from "react";
import "@/styles/globals.css";
import Head from "next/head";
import { FaChevronLeft, FaChevronRight, FaTimes, FaPlay } from "react-icons/fa";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Preloader from "@/components/preloader";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import { motion, AnimatePresence, easeOut, easeInOut } from "framer-motion";
import * as cloud from 'cloudinary';

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

// Optimized animation variants - lighter and faster
const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: easeOut },
};

const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, delay: 0.1, ease: easeOut },
};

const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, delay: 0.15, ease: easeOut },
};

// Lazy-loaded video modal
const VideoModal = ({
  isOpen,
  onClose,
  videoId,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl z-50 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
        onClick={onClose}
        aria-label="Close modal"
      >
        <FaTimes />
      </button>
      <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

// Optimized image modal with proper slide direction
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
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20 bg-black/20 backdrop-blur-sm"
          >
            <div className="w-12 h-12 border-4 border-white/30 rounded-full animate-spin border-t-white"></div>
          </motion.div>
        )}

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
              ease: easeInOut,
            }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={`Proposal moment ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              onLoadStart={() => onLoadingChange(true)}
              onLoadingComplete={() => onLoadingChange(false)}
              priority
              quality={85}
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
        scale: isVisible ? 1 : 0.95 
      }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.03, 0.5),
        ease: "easeOut"
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
          <Image
            src={img.thumbnail || img.src}
            alt={`Proposal moment ${index + 1}`}
            fill
            className={`object-cover transition-all duration-300 ease-out ${
              hoveredIndex === index 
                ? "scale-105 brightness-110" 
                : "scale-100 brightness-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            loading="lazy"
            quality={75}
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL}
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
    // Configure Cloudinary (make sure these are in your .env.local)
    cloudinaryyyy.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Fetch all images from the proposal folder
    const results = await cloudinaryyyy.search
      .expression('folder:proposal')
      .max_results(500) // Adjust based on your needs
      .execute();

    const images: GalleryImage[] = results.resources.map((resource: any) => {
      const baseUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`;
      
      return {
        src: `${baseUrl}q_85,f_auto/${resource.public_id}.${resource.format}`, // High quality for modal
        thumbnail: `${baseUrl}q_60,w_400,h_400,c_fill,f_auto/${resource.public_id}.${resource.format}`, // Thumbnail for grid
        blurDataURL: `${baseUrl}q_10,w_20,h_20,c_fill,f_auto,e_blur:1000/${resource.public_id}.${resource.format}`, // Blur placeholder
        width: resource.width,
        height: resource.height,
        publicId: resource.public_id,
      };
    });

    return {
      props: {
        images,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    return {
      props: {
        images: [],
      },
    };
  }
}

export default function ProposalGalleryPage({
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
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showProposalVideoModal, setShowProposalVideoModal] = useState(false);
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
      const nextImages = images.slice(currentLength, currentLength + LOAD_INCREMENT);

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
        <title>Marvin & Jovelyn - Proposal Gallery</title>
        <meta name="description" content="March 14, 2023 Proposal Day - A beautiful collection of our special moment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Marvin & Jovelyn - Proposal Gallery" />
        <meta property="og:description" content="March 14, 2023 Proposal Day" />
        <meta property="og:type" content="website" />
        {/* Preload only critical images */}
        <link rel="preload" href="/images/RonnelJuna-141.webp" as="image" />
      </Head>

      <div className={`${playfair.className} antialiased bg-gradient-to-br from-slate-50 via-white to-rose-50`}>
        <Preloader />
        <NavBar />

        {/* Simplified hero section */}
        <section className="relative py-16 px-4 bg-gradient-to-r from-rose-100 via-pink-50 to-purple-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
                Proposal Gallery
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Relive the magic of March 14, 2023
              </motion.p>
            </div>

            {/* Optimized video grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <motion.div
                {...fadeInLeft}
                onClick={() => setShowVideoModal(true)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl bg-white p-2"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src="/images/RonnelJuna-141.webp"
                    alt="Proposal Video Thumbnail"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                      <FaPlay className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">The Proposal</h3>
                    <p className="text-sm opacity-90">Our unforgettable moment</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...fadeInRight}
                onClick={() => setShowProposalVideoModal(true)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-xl bg-white p-2"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <Image
                    src="/images/proposal_thumbnail.webp"
                    alt="Proposal Video Thumbnail"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform duration-300">
                      <FaPlay className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">Proposal Presentation</h3>
                    <p className="text-sm opacity-90">Surprise video</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Optimized gallery section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Photos</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full" />
            </div>

            {/* Optimized grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[200px]">
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
                <p className="text-xl text-gray-700 font-medium">You&apos;ve seen all our precious moments!</p>
                <p className="text-gray-600 mt-2">Thank you for sharing in our joy</p>
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

          <VideoModal
            isOpen={showVideoModal}
            onClose={() => setShowVideoModal(false)}
            videoId="c-LAhOIwb-E"
            title="Proposal Video"
          />

          <VideoModal
            isOpen={showProposalVideoModal}
            onClose={() => setShowProposalVideoModal(false)}
            videoId="h3L-ZnvkGZo"
            title="Proposal Video"
          />
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}