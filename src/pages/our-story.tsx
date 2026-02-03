"use client";

import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Preloader from "@/components/preloader";
import "@/styles/globals.css";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import PageHeaderSection from "@/components/page-header";
import { FaHeart } from "react-icons/fa";
import { Play, X, Expand } from "lucide-react";
import { useState, useCallback, useMemo, useEffect } from "react";
import {
  timelineData,
  profileData,
  type TimelineItem,
  type PersonProfile,
} from "@/data/timelineData";

// Font optimization with preload
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true, // Preload the font
});

interface VideoModalData {
  type: "youtube" | "local";
  url: string;
  title: string;
}

interface ImageModalData {
  src: string;
  alt: string;
  title: string;
}

// Memoized components
const ProfileCard = ({
  person,
  onImageClick,
}: {
  person: PersonProfile;
  onImageClick: (img: string, name: string) => void;
}) => (
  <div className="text-center">
    <div
      className="relative group cursor-pointer"
      onClick={() => onImageClick(person.img, person.name)}
    >
      <Image
        src={person.img}
        alt={person.name}
        width={256}
        height={336}
        className="w-52 h-72 md:w-64 md:h-84 object-cover mx-auto mb-4 rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
        sizes="(max-width: 768px) 208px, 256px"
        priority
        quality={85} // Reduce quality slightly for smaller file size
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-lg">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
          <Expand className="w-5 h-5 text-gray-700" />
        </div>
      </div>
    </div>
    <h2 className="text-2xl font-semibold">{person.name}</h2>
  </div>
);

const TimelineCard = ({
  item,
  onImageClick,
  onVideoClick,
}: {
  item: TimelineItem;
  onImageClick: (img: string, title: string) => void;
  onVideoClick: (type: "youtube" | "local", url: string, title: string) => void;
}) => (
  <div
    className={`snap-start flex flex-col ${
      item.reverse ? "md:flex-row-reverse" : "md:flex-row"
    } items-center relative z-10 mb-16`}
  >
    <div className="absolute left-1/2 transform -translate-x-1/2 bg-pink-500 w-4 h-4 rounded-full z-20 hidden md:block"></div>

    <div className="md:w-1/2 px-4 w-full">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="md:hidden p-4 bg-pink-50 border-b border-pink-100">
          <div className="flex justify-center">
            <span className="text-lg font-semibold bg-pink-100 text-pink-700 px-6 py-3 rounded-full shadow-md border border-pink-200">
              {item.date}
            </span>
          </div>
        </div>

        <div className="relative group">
          <div
            className="cursor-pointer"
            onClick={() => onImageClick(item.img, item.title)}
          >
            <Image
              src={item.img}
              alt={item.title}
              width={400}
              height={300}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 400px"
              loading="lazy"
              quality={80} // Reduce quality for smaller file size
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
              <Expand className="w-4 h-4 text-gray-700" />
            </div>
          </div>

          {item.hasVideo && item.videoType && item.videoUrl && (
            <>
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-30"
                onClick={(e) => {
                  e.stopPropagation();
                  onVideoClick(item.videoType!, item.videoUrl!, item.title);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onVideoClick(item.videoType!, item.videoUrl!, item.title);
                  }
                }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-white transition-all duration-300">
                  <Play
                    className="w-6 h-6 md:w-8 md:h-8 text-pink-600 ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to watch the video
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center text-pink-700">
            <FaHeart className="text-pink-500 mr-2 flex-shrink-0" />
            {item.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">{item.text}</p>
        </div>
      </div>
    </div>

    <div className="hidden md:flex md:w-1/2 px-4 justify-center items-center">
      <div className="mt-4 md:mt-0">
        <span className="text-lg font-semibold bg-pink-100 text-pink-700 px-6 py-3 rounded-full shadow-md border border-pink-200">
          {item.date}
        </span>
      </div>
    </div>
  </div>
);

// Lazy load modal components
const VideoModal = ({
  isOpen,
  video,
  onClose,
  getYouTubeVideoId,
}: {
  isOpen: boolean;
  video: VideoModalData | null;
  onClose: () => void;
  getYouTubeVideoId: (url: string) => string | null;
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-6xl mx-auto">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-pink-300 transition-colors duration-200"
          aria-label="Close video"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="relative w-full pb-[56.25%] h-0 bg-black rounded-lg overflow-hidden shadow-2xl">
          {video.type === "youtube" ? (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                video.url
              )}?autoplay=1&rel=0&modestbranding=1&fs=1&cc_load_policy=0&iv_load_policy=3`}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy" // Lazy load iframe
            />
          ) : (
            <video
              className="absolute top-0 left-0 w-full h-full object-contain"
              controls
              autoPlay
              preload="metadata" // Only load metadata, not full video
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm">{video.title} ✨</p>
        </div>
      </div>
    </div>
  );
};

const ImageModal = ({
  isOpen,
  image,
  onClose,
}: {
  isOpen: boolean;
  image: ImageModalData | null;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-5xl mx-auto">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-pink-300 transition-colors duration-200"
          aria-label="Close image"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
            className="w-full h-auto max-h-[80vh] object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            quality={85} // Reduce quality for modal images
          />
        </div>

        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm font-medium">{image.title} ✨</p>
        </div>
      </div>
    </div>
  );
};

export default function OurStoryPage() {
  const [currentVideo, setCurrentVideo] = useState<VideoModalData | null>(null);
  const [currentImage, setCurrentImage] = useState<ImageModalData | null>(null);

  const getYouTubeVideoId = useCallback((url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  }, []);

  const handleVideoClick = useCallback(
    (type: "youtube" | "local", url: string, title: string) => {
      setCurrentVideo({ type, url, title });
    },
    []
  );

  const handleImageClick = useCallback((src: string, title: string) => {
    setCurrentImage({ src, alt: title, title });
  }, []);

  const closeVideoModal = useCallback(() => {
    setCurrentVideo(null);
  }, []);

  const closeImageModal = useCallback(() => {
    setCurrentImage(null);
  }, []);

  const handleProfileImageClick = useCallback(
    (img: string, name: string) => {
      handleImageClick(img, name);
    },
    [handleImageClick]
  );

  const profileCards = useMemo(
    () =>
      profileData.map((person, idx) => (
        <ProfileCard
          key={person.name || idx} // Use name as key if available
          person={person}
          onImageClick={handleProfileImageClick}
        />
      )),
    [handleProfileImageClick]
  );

  const timelineCards = useMemo(
    () =>
      timelineData.map((item, idx) => (
        <TimelineCard
          key={item.date || idx} // Use date as key if available
          item={item}
          onImageClick={handleImageClick}
          onVideoClick={handleVideoClick}
        />
      )),
    [handleImageClick, handleVideoClick]
  );

  return (
    <>
      <Head>
        <title>Our Story – Marvin & Jovelyn</title>
        <meta name="description" content="Our love story – Marvin & Jovelyn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/playfair-display.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
      </Head>

      <main
        className={`${playfair.className} antialiased bg-white text-gray-800 scroll-smooth`}
      >
        <NavBar />
        <Preloader />
        <PageHeaderSection title="Our Story" />

        <section className="pb-6 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {profileCards}
        </section>

        <section className="py-12 bg-gray-100 text-center px-4">
          <blockquote className="text-2xl italic max-w-4xl mx-auto text-gray-700">
            &quot;We love because he first loved us. - 1 John 4:19&quot;
          </blockquote>
        </section>

        <section
          className="snap-y snap-mandatory"
          style={{ scrollSnapType: "y mandatory" }}
        >
          <div className="relative py-16 max-w-7xl mx-auto px-4">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full border-l-2 border-pink-300 z-0"></div>
            <h2 className="text-3xl font-bold text-center text-pink-700 mb-16 relative z-10">
              Our Love Story
            </h2>
            {timelineCards}
          </div>
        </section>

        <Footer />

        {currentVideo && (
          <VideoModal
            isOpen={!!currentVideo}
            video={currentVideo}
            onClose={closeVideoModal}
            getYouTubeVideoId={getYouTubeVideoId}
          />
        )}

        {currentImage && (
          <ImageModal
            isOpen={!!currentImage}
            image={currentImage}
            onClose={closeImageModal}
          />
        )}
      </main>
    </>
  );
}