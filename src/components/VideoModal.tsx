// components/VideoModal.tsx
import { X } from "lucide-react";
import { useCallback, useEffect } from "react";

interface VideoModalProps {
  currentVideo: {
    type: "youtube" | "local";
    url: string;
    title: string;
  };
  onClose: () => void;
  getYouTubeVideoId: (url: string) => string | null;
}

export default function VideoModal({ currentVideo, onClose, getYouTubeVideoId }: VideoModalProps) {
  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-pink-300 transition-colors duration-200"
          aria-label="Close video"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Video Container - Responsive 16:9 Aspect Ratio */}
        <div className="relative w-full pb-[56.25%] h-0 bg-black rounded-lg overflow-hidden shadow-2xl">
          {currentVideo.type === "youtube" && (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentVideo.url)}?autoplay=1&rel=0&modestbranding=1&fs=1&cc_load_policy=0&iv_load_policy=3`}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          )}

          {currentVideo.type === "local" && (
            <video
              className="absolute top-0 left-0 w-full h-full object-contain"
              controls
              autoPlay
              preload="metadata"
            >
              <source src={currentVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm">{currentVideo.title} ✨</p>
        </div>
      </div>
    </div>
  );
}