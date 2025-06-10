"use client"

import { useEffect, useRef } from "react"
import Swiper from "swiper"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

interface MediaItem {
  src: string
  alt: string
  caption: string
  type?: "image" | "video"
}

interface ImageCarouselProps {
  images: MediaItem[]
  onImageClick: (index: number) => void
}

export const ImageCarousel = ({ images, onImageClick }: ImageCarouselProps) => {
  const swiperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!swiperRef.current) return

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation],
      slidesPerView: 1.5,
      spaceBetween: 0,
      loop: true,
      centeredSlides: true,
      speed: 800,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: 1.8,
        },
        960: {
          slidesPerView: 2.2,
        },
      },
    })

    return () => {
      swiper.destroy()
    }
  }, [])

  // Function to determine if a file is a video based on extension or type property
  const isVideo = (src: string, type?: string): boolean => {
    if (type === "video") return true

    const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"]
    return videoExtensions.some((ext) => src.toLowerCase().endsWith(ext))
  }

  return (
    <div ref={swiperRef} className="swiper main-swiper w-full h-[500px] bg-[#F8F0E3] dark:bg-[#2A2A2A] rounded-xl">
      <div className="swiper-wrapper">
        {images.map((item, index) => (
          <div
            key={index}
            className="swiper-slide text-center bg-[#F8F0E3] dark:bg-[#2A2A2A] flex justify-center items-center p-0 h-full relative overflow-hidden border-r-[3px] border-[#F8F0E3] dark:border-[#2A2A2A]"
          >
            {isVideo(item.src, item.type) ? (
              <video
                src={item.src}
                className="h-full w-auto min-w-full object-cover cursor-pointer"
                onClick={() => onImageClick(index)}
                controls
                muted
                playsInline
                loop
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                className="h-full w-auto min-w-full object-cover cursor-pointer"
                onClick={() => onImageClick(index)}
              />
            )}
            <div className="caption absolute bottom-0 left-0 right-0 bg-[#8C6F5A]/80 dark:bg-[#5F9EA0]/80 text-[#F8F0E3] p-3 text-sm opacity-0 transition-opacity duration-300 hover:opacity-100 z-10 font-['Montserrat']">
              {item.caption}
            </div>
          </div>
        ))}
      </div>
      <div className="swiper-button-next text-[#F8F0E3] bg-[#8C6F5A]/50 dark:bg-[#6B7280]/50 w-[50px] h-full m-0 top-0 rounded-none transition-colors duration-300 hover:bg-[#8C6F5A]/70 dark:hover:bg-[#6B7280]/70 right-0"></div>
      <div className="swiper-button-prev text-[#F8F0E3] bg-[#8C6F5A]/50 dark:bg-[#6B7280]/50 w-[50px] h-full m-0 top-0 rounded-none transition-colors duration-300 hover:bg-[#8C6F5A]/70 dark:hover:bg-[#6B7280]/70 left-0"></div>
    </div>
  )
}
