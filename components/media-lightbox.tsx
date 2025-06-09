"use client"

import { useEffect, useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface MediaItem {
  src: string
  alt: string
  caption: string
  type?: "image" | "video"
}

interface MediaLightboxProps {
  media: MediaItem[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
}

export const MediaLightbox = ({ media, currentIndex, isOpen, onClose }: MediaLightboxProps) => {
  const [activeIndex, setActiveIndex] = useState(currentIndex)

  // Reset active index when current index changes
  useEffect(() => {
    setActiveIndex(currentIndex)
  }, [currentIndex])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, activeIndex])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
  }

  const currentMedia = media[activeIndex]
  const isVideo =
    currentMedia.type === "video" ||
    [".mp4", ".webm", ".ogg", ".mov", ".avi"].some((ext) => currentMedia.src.toLowerCase().endsWith(ext))

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        aria-label="Close lightbox"
      >
        <X size={32} />
      </button>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={48} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
        aria-label="Next image"
      >
        <ChevronRight size={48} />
      </button>

      {/* Media content */}
      <div className="w-full h-full flex items-center justify-center p-8">
        {isVideo ? (
          <video src={currentMedia.src} className="max-h-full max-w-full object-contain" controls autoPlay playsInline>
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={currentMedia.src || "/placeholder.svg"}
            alt={currentMedia.alt}
            className="max-h-full max-w-full object-contain"
          />
        )}
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center">
        <p className="text-lg">{currentMedia.caption}</p>
        <p className="text-sm text-gray-300 mt-1">
          {activeIndex + 1} / {media.length}
        </p>
      </div>
    </div>
  )
}
