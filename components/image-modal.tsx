"use client"

interface MediaItem {
  src: string
  alt: string
  caption: string
  type?: "image" | "video"
}

interface ImageModalProps {
  images: MediaItem[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onThumbnailClick: (index: number) => void
}

export const ImageModal = ({ images, currentIndex, onClose, onPrev, onNext, onThumbnailClick }: ImageModalProps) => {
  const currentMedia = images[currentIndex]
  const isVideo = currentMedia.type === "video"

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/95 z-[1000] overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <span className="fixed top-4 right-8 text-white text-4xl font-bold cursor-pointer z-[1001]" onClick={onClose}>
        &times;
      </span>

      <div className="h-full flex flex-col p-5">
        <div className="flex-1 relative flex items-center justify-center overflow-auto mx-[60px]">
          <button
            className="fixed top-1/2 left-5 -translate-y-1/2 bg-[#8C6F5A]/20 text-white p-5 cursor-pointer border-none text-2xl transition-colors duration-300 z-[1001] rounded-full shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.05)] hover:bg-[#8C6F5A]/40"
            onClick={onPrev}
          >
            &lt;
          </button>

          {isVideo ? (
            <video
              src={currentMedia.src}
              className="max-h-[calc(100vh-200px)] max-w-[90%] w-auto object-contain mx-auto rounded-lg shadow-[10px_10px_30px_rgba(0,0,0,0.4),-10px_-10px_30px_rgba(255,255,255,0.03)]"
              controls
              autoPlay
              muted
              playsInline
            />
          ) : (
            <img
              src={currentMedia.src || "/placeholder.svg"}
              alt={currentMedia.alt}
              className="max-h-[calc(100vh-200px)] max-w-[90%] w-auto object-contain mx-auto rounded-lg shadow-[10px_10px_30px_rgba(0,0,0,0.4),-10px_-10px_30px_rgba(255,255,255,0.03)]"
            />
          )}

          <button
            className="fixed top-1/2 right-5 -translate-y-1/2 bg-[#8C6F5A]/20 text-white p-5 cursor-pointer border-none text-2xl transition-colors duration-300 z-[1001] rounded-full shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.05)] hover:bg-[#8C6F5A]/40"
            onClick={onNext}
          >
            &gt;
          </button>
        </div>

        <div className="h-[100px] mt-5 flex gap-3 justify-center overflow-x-auto py-3 px-0">
          {images.map((media, index) => (
            <div
              key={index}
              className={`h-[80px] w-[120px] relative cursor-pointer transition-all duration-300 ease-in-out ${
                index === currentIndex
                  ? "border-2 border-[#4A7A7A] opacity-100 shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.05)] rounded-lg"
                  : "border-2 border-transparent opacity-60 hover:opacity-100 rounded-lg"
              }`}
              onClick={() => onThumbnailClick(index)}
            >
              {media.type === "video" ? (
                <div className="relative h-full w-full">
                  <video src={media.src} className="h-full w-full object-cover rounded-lg" muted />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                </div>
              ) : (
                <img
                  src={media.src || "/placeholder.svg"}
                  alt={media.alt}
                  className="h-full w-full object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
