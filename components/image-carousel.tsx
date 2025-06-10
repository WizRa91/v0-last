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
    <div className="carousel-wrapper bg-[#F8F0E3] dark:bg-[#2A2A2A] rounded-2xl overflow-hidden mb-8 shadow-[8px_8px_20px_rgba(140,111,90,0.5),-8px_-8px_20px_rgba(248,240,227,0.8)] dark:shadow-[8px_8px_20px_rgba(0,0,0,0.5),-8px_-8px_20px_rgba(42,42,42,0.8)]">
      <div ref={swiperRef} className="swiper main-swiper w-full h-[500px] bg-[#F8F0E3] dark:bg-[#2A2A2A]">
        <div className="swiper-wrapper">
          {images.map((item, index) => (
            <div
              key={index}
              className="swiper-slide text-center bg-[#F8F0E3] dark:bg-[#2A2A2A] flex justify-center items-center p-0 h-full relative overflow-hidden border-r-[3px] border-[#F8F0E3] dark:border-[#2A2A2A] group"
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
              <div className="caption absolute bottom-0 left-0 right-0 bg-[rgba(140,111,90,0.8)] dark:bg-[rgba(95,158,160,0.8)] text-[#F8F0E3] p-3 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 font-['Montserrat']">
                {item.caption}
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-button-next text-[#F8F0E3] bg-[rgba(140,111,90,0.5)] dark:bg-[rgba(108,114,128,0.5)] w-[50px] h-full m-0 top-0 rounded-none transition-colors duration-300 hover:bg-[rgba(140,111,90,0.7)] dark:hover:bg-[rgba(108,114,128,0.7)] right-0"></div>
        <div className="swiper-button-prev text-[#F8F0E3] bg-[rgba(140,111,90,0.5)] dark:bg-[rgba(108,114,128,0.5)] w-[50px] h-full m-0 top-0 rounded-none transition-colors duration-300 hover:bg-[rgba(140,111,90,0.7)] dark:hover:bg-[rgba(108,114,128,0.7)] left-0"></div>
      </div>
    </div>
  )
}
