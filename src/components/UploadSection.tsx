"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Upload, Image as ImageIcon, Video, Plus, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast"

interface GalleryMedia {
  publicId: string
  src: string
  type: "image" | "video"
  width?: number
  height?: number
}

interface UploadSectionProps {
  onUploadComplete: (media: GalleryMedia) => void
}

interface FileProgress {
  name: string
  progress: number
  completed: boolean
  error?: string
}

export default function UploadSection({ onUploadComplete }: UploadSectionProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [fileProgresses, setFileProgresses] = useState<Record<string, FileProgress>>({})
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadToCloudinary = async (file: File): Promise<GalleryMedia> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
    formData.append("folder", "wedding-gallery")

    const resourceType = file.type.startsWith("video/") ? "video" : "image"
    const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const data = await response.json()

    return {
      publicId: data.public_id,
      src: data.secure_url,
      type: resourceType as "image" | "video",
      width: data.width,
      height: data.height,
    }
  }

  const handleUpload = async (files: FileList) => {
    setIsUploading(true)
    toast.success(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}... please wait! 📸`)
    
    const MAX_PHOTO_SIZE = 10 * 1024 * 1024 // 10MB for photos
    const MAX_VIDEO_SIZE = 100 * 1024 * 1024 // 100MB for videos

    // Clear any existing progress first
    setFileProgresses({})

    // Create file keys upfront to ensure consistency
    const fileKeys: string[] = []
    const initialProgresses: Record<string, FileProgress> = {}
    
    Array.from(files).forEach((file, index) => {
      const fileKey = `${file.name}-${index}-${Date.now()}`
      fileKeys.push(fileKey)
      initialProgresses[fileKey] = {
        name: file.name,
        progress: 0,
        completed: false
      }
    })
    setFileProgresses(initialProgresses)

    // Keep track of active intervals for cleanup
    const activeIntervals: Record<string, NodeJS.Timeout> = {}
    const activeTimeouts: Record<string, NodeJS.Timeout> = {}

    // Process all files concurrently
    const uploadPromises = Array.from(files).map(async (file, index) => {
      const fileKey = fileKeys[index]
      const isVideo = file.type.startsWith("video/")
      const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_PHOTO_SIZE

      if (file.size > maxSize) {
        setFileProgresses(prev => ({
          ...prev,
          [fileKey]: {
            ...prev[fileKey],
            error: `File too large (max ${isVideo ? '100MB' : '10MB'})`,
            completed: true,
            progress: 100
          }
        }))
        toast.error(`${file.name} is too large (max ${isVideo ? '100MB' : '10MB'})`)
        
        // Remove after showing error for 3 seconds
        activeTimeouts[fileKey] = setTimeout(() => {
          setFileProgresses(prev => {
            const updated = { ...prev }
            delete updated[fileKey]
            return updated
          })
          delete activeTimeouts[fileKey]
        }, 3000)
        return
      }

      try {
        // Simulate progress with more realistic intervals
        activeIntervals[fileKey] = setInterval(() => {
          setFileProgresses(prev => {
            const current = prev[fileKey]?.progress || 0
            if (current < 85) {
              return {
                ...prev,
                [fileKey]: {
                  ...prev[fileKey],
                  progress: Math.min(current + Math.random() * 12 + 8, 85)
                }
              }
            }
            return prev
          })
        }, 400)

        const media = await uploadToCloudinary(file)
        
        // Clear the interval
        if (activeIntervals[fileKey]) {
          clearInterval(activeIntervals[fileKey])
          delete activeIntervals[fileKey]
        }
        
        setFileProgresses(prev => ({
          ...prev,
          [fileKey]: {
            ...prev[fileKey],
            progress: 100,
            completed: true
          }
        }))

        onUploadComplete(media)
        toast.success(`${file.name} uploaded successfully! 📸`)

        // Remove completed file from progress list after 1.5 seconds
        activeTimeouts[fileKey] = setTimeout(() => {
          setFileProgresses(prev => {
            const updated = { ...prev }
            delete updated[fileKey]
            return updated
          })
          delete activeTimeouts[fileKey]
        }, 1500)

      } catch (error) {
        // Clear interval on error
        if (activeIntervals[fileKey]) {
          clearInterval(activeIntervals[fileKey])
          delete activeIntervals[fileKey]
        }

        setFileProgresses(prev => ({
          ...prev,
          [fileKey]: {
            ...prev[fileKey],
            error: "Upload failed",
            completed: true,
            progress: 100
          }
        }))
        toast.error(`Failed to upload ${file.name}`)
        console.error(error)

        // Remove failed file from progress list after 3 seconds
        activeTimeouts[fileKey] = setTimeout(() => {
          setFileProgresses(prev => {
            const updated = { ...prev }
            delete updated[fileKey]
            return updated
          })
          delete activeTimeouts[fileKey]
        }, 3000)
      }
    })

    // Wait for all uploads to complete
    await Promise.allSettled(uploadPromises)
    
    // Cleanup any remaining intervals and timeouts
    Object.values(activeIntervals).forEach(clearInterval)
    Object.values(activeTimeouts).forEach(clearTimeout)
    
    setIsUploading(false)

    // Final cleanup - ensure progress list is cleared after a delay if somehow items remain
    setTimeout(() => {
      setFileProgresses(prev => {
        const remaining = Object.values(prev).filter(fp => !fp.completed)
        if (remaining.length === 0) {
          return {}
        }
        return prev
      })
    }, 5000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUpload(e.target.files)
    }
  }

  const hasActiveUploads = Object.keys(fileProgresses).length > 0;
  const activeUploadsCount = Object.values(fileProgresses).filter(fp => !fp.completed).length;
  const completedUploadsCount = Object.values(fileProgresses).filter(fp => fp.completed && !fp.error).length;
  const totalFiles = Object.keys(fileProgresses).length;

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-10 pb-5">
      {/* Main Upload Area */}
      <div
        className={`
          relative bg-white border-2 border-gray-200 rounded-2xl p-6 text-center
          ${isUploading ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        {/* Icon */}
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Upload memories
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          Tap to select photos and videos
        </p>

        {/* File Types */}
        <div className="flex items-center justify-center gap-4 mb-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            <span>Photos</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <Video className="w-3 h-3" />
            <span>Videos</span>
          </div>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="
            inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl
            font-medium text-sm hover:bg-blue-700 transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          "
        >
          <Plus className="w-4 h-4" />
          Choose Files
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Upload Progress */}
      {hasActiveUploads && (
        <div className="mt-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-gray-700">
              {activeUploadsCount > 0 ? 'Uploading files...' : 'Processing completed files...'}
            </div>
            <div className="text-xs text-gray-500">
              {totalFiles > 0 && (
                <>
                  {activeUploadsCount > 0 && `${activeUploadsCount} remaining`}
                  {completedUploadsCount > 0 && activeUploadsCount > 0 && " • "}
                  {completedUploadsCount > 0 && `${completedUploadsCount} completed`}
                </>
              )}
            </div>
          </div>
          
          {Object.entries(fileProgresses).map(([fileKey, fileProgress]) => (
            <div key={fileKey} className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 truncate pr-2">
                  {fileProgress.name}
                </span>
                <div className="flex items-center gap-2 min-w-0">
                  {fileProgress.completed && !fileProgress.error && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <span className={`text-sm ${fileProgress.error ? 'text-red-500' : fileProgress.completed ? 'text-green-500' : 'text-gray-500'}`}>
                    {fileProgress.error || `${Math.round(fileProgress.progress)}%`}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    fileProgress.error 
                      ? 'bg-red-500' 
                      : fileProgress.completed 
                        ? 'bg-green-500' 
                        : 'bg-blue-600'
                  }`}
                  style={{ width: `${fileProgress.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}