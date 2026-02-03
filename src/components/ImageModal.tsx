// components/ImageModal.tsx
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";

interface ImageModalProps {
  currentImage: {
    src: string;
    alt: string;
    title: string;
  };
  onClose: () => void;
}

export default function ImageModal({ currentImage, onClose }: ImageModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 p-2 text-white hover:text-pink-300 transition-colors duration-200"
          aria-label="Close image"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Image Container */}
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            width={800}
            height={600}
            className="w-full h-auto max-h-[80vh] object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            quality={90}
          />
        </div>

        {/* Modal Footer */}
        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm font-medium">{currentImage.title} ✨</p>
        </div>
      </div>
    </div>
  );
}