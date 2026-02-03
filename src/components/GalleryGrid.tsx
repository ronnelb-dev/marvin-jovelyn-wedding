"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Image as ImageIcon, Video } from "lucide-react"
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

interface GalleryGridProps {
  images: GalleryMediaWithUploader[]
  onImageClick: (media: GalleryMediaWithUploader) => void
}

// Connection speed detection
const getConnectionSpeed = (): 'slow' | 'fast' => {
  if (typeof navigator !== 'undefined') {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
    if (connection) {
      const speed = connection.effectiveType
      return speed === '2g' || speed === 'slow-2g' ? 'slow' : 'fast'
    }
  }
  return 'fast'
}

// Optimized Cloudinary URL builders
const buildCloudinaryUrl = (publicId: string, transformations?: string) => {
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
  const transform = transformations ? `/${transformations}` : ""
  return `${baseUrl}/image/upload${transform}/${publicId}`
}

const buildCloudinaryVideoThumbnailUrl = (publicId: string, transformations?: string) => {
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
  const transform = transformations ? `/${transformations}` : ""
  return `${baseUrl}/video/upload${transform}/so_1/${publicId}.jpg`
}

// Optimized transformations with good quality
const getOptimizedTransformations = (isEager: boolean, connectionSpeed: 'slow' | 'fast') => {
  let quality: string
  
  if (connectionSpeed === 'slow') {
    quality = "q_auto:good"
  } else {
    quality = isEager ? "q_auto:best" : "q_auto:good"
  }
  
  const format = "f_auto" // Auto format selection for best quality/compatibility
  
  return `w_600,h_600,c_fill,${format},${quality}`
}

const getVideoThumbnailTransformations = (isEager: boolean, connectionSpeed: 'slow' | 'fast') => {
  let quality: string
  
  if (connectionSpeed === 'slow') {
    quality = "q_auto:good"
  } else {
    quality = isEager ? "q_auto:best" : "q_auto:good"
  }
  
  const format = "f_auto"
  
  return `w_600,h_600,c_fill,${format},${quality}`
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 })
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast'>('fast')
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize connection speed detection
  useEffect(() => {
    setConnectionSpeed(getConnectionSpeed())
  }, [])

  const { imageCount, videoCount } = useMemo(() => {
    return {
      imageCount: images.filter((img) => img.type === "image").length,
      videoCount: images.filter((img) => img.type === "video").length,
    }
  }, [images])

  // Virtual scrolling - only render visible items
  const visibleImages = useMemo(() => {
    return images.slice(visibleRange.start, visibleRange.end)
  }, [images, visibleRange])

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleRange.end < images.length) {
          setVisibleRange(prev => ({ ...prev, end: prev.end + 20 }))
        }
      },
      { threshold: 0.1 }
    )

    const sentinel = document.getElementById('scroll-sentinel')
    if (sentinel) observer.observe(sentinel)

    return () => observer.disconnect()
  }, [visibleRange.end, images.length])

  const handleImageClick = useCallback((media: GalleryMediaWithUploader) => {
    onImageClick(media)
  }, [onImageClick])

  return (
    <div className="w-full max-w-7xl mx-auto px-4" ref={containerRef}>
      {/* Minimalist Header - Mobile First */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <ImageIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{imageCount}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Video className="w-4 h-4" />
          <span className="text-sm font-medium">{videoCount}</span>
        </div>
        {/* Connection indicator */}
        {connectionSpeed === 'slow' && (
          <div className="flex items-center space-x-1 text-amber-600">
            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
            <span className="text-xs">Slow connection</span>
          </div>
        )}
      </div>

      {/* Gallery Grid - Mobile First with Virtual Scrolling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {visibleImages.map((media, idx) => {
          const isEager = idx < 6 // Load first 6 images eagerly for better initial display
          const optimizedTransformations = getOptimizedTransformations(isEager, connectionSpeed)
          const videoTransformations = getVideoThumbnailTransformations(isEager, connectionSpeed)

          return (
            <motion.div
              key={media.publicId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.2,
                delay: Math.min(idx * 0.01, 0.1),
                ease: "easeOut"
              }}
              className="group cursor-pointer"
              onClick={() => handleImageClick(media)}
            >
              <div className="relative overflow-hidden bg-gray-100 rounded-lg transition-all duration-300 hover:shadow-lg aspect-square">
                <div className="relative w-full h-full">
                  {media.type === "image" ? (
                    <Image
                      src={buildCloudinaryUrl(media.publicId, optimizedTransformations)}
                      alt="Gallery image"
                      fill
                      className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading={isEager ? "eager" : "lazy"}
                      priority={isEager}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  ) : (
                    <>
                      <Image
                        src={buildCloudinaryVideoThumbnailUrl(media.publicId, videoTransformations)}
                        alt="Video thumbnail"
                        fill
                        className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        loading={isEager ? "eager" : "lazy"}
                        priority={isEager}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      
                      {/* Video Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                          <Play className="w-5 h-5 text-gray-800 ml-0.5" fill="currentColor" />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Uploader Name Overlay */}
                {media.uploadedBy && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs font-medium truncate">
                      {media.uploadedBy}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Scroll sentinel for infinite loading */}
      {visibleRange.end < images.length && (
        <div id="scroll-sentinel" className="h-10 flex items-center justify-center mt-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
        </div>
      )}

      {/* Load more button as fallback */}
      {visibleRange.end < images.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setVisibleRange(prev => ({ ...prev, end: prev.end + 20 }))}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
          >
            Load More ({images.length - visibleRange.end} remaining)
          </button>
        </div>
      )}
    </div>
  )
}