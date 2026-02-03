"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface GalleryMedia {
  publicId: string
  src: string
  type: "image" | "video"
  width?: number
  height?: number
}

interface GalleryMediaWithUploader extends GalleryMedia {
  uploadedBy?: string
}

interface MediaModalProps {
  currentImage: GalleryMediaWithUploader | null
  images: GalleryMediaWithUploader[]
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

const buildCloudinaryUrl = (publicId: string, transformations?: string) => {
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
  const transform = transformations ? `/${transformations}` : ""
  return `${baseUrl}/image/upload${transform}/${publicId}`
}

const buildCloudinaryVideoUrl = (publicId: string, transformations?: string) => {
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
  const transform = transformations ? `/${transformations}` : ""
  return `${baseUrl}/video/upload${transform}/${publicId}`
}

export default function MediaModal({ currentImage, images, onClose, onNext, onPrev }: MediaModalProps) {
  const [loading, setLoading] = useState(true)

  // Reset loading state whenever currentImage changes
  useEffect(() => {
      setLoading(true)
  }, [currentImage?.publicId]) // Use publicId to track changes

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!currentImage) return
      
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          if (images.length > 1) {
            setLoading(true)
            onPrev()
          }
          break
        case "ArrowRight":
          if (images.length > 1) {
            setLoading(true)
            onNext()
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [currentImage, images.length, onClose, onNext, onPrev])

  if (!currentImage) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose()
          }
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white/80 hover:text-white z-50 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50 p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200"
              onClick={() => {
                setLoading(true)
                onPrev()
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white z-50 p-3 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200"
              onClick={() => {
                setLoading(true)
                onNext()
              }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center">
          <motion.div
            key={currentImage.publicId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full"
          >
            {currentImage.type === "image" ? (
              <Image
                src={buildCloudinaryUrl(currentImage.publicId, "w_1400,h_1000,c_limit,f_auto,q_auto:good") || "/placeholder.svg"}
                alt="Gallery image"
                fill
                className={`object-contain transition-opacity duration-300 ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
                sizes="100vw"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                priority
              />
            ) : (
              <video
                key={currentImage.publicId} // Force remount for videos
                src={buildCloudinaryVideoUrl(currentImage.publicId, "w_1400,h_1000,c_limit,f_auto,q_auto")}
                className={`object-contain w-full h-full transition-opacity duration-300 ${
                  loading ? "opacity-0" : "opacity-100"
                }`}
                controls
                autoPlay
                onCanPlay={() => setLoading(false)}
                onError={() => setLoading(false)}
                onLoadStart={() => setLoading(true)}
              />
            )}
          </motion.div>
        </div>

        {/* Uploader Info */}
        {currentImage.uploadedBy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 left-6 z-50 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full"
          >
            <p className="text-sm font-medium">{currentImage.uploadedBy}</p>
          </motion.div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-6 right-6 z-50 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full"
          >
            <p className="text-sm font-medium">
              {images.findIndex(img => img.publicId === currentImage.publicId) + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}