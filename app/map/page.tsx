import { Suspense } from "react"
import { Footer } from "@/components/footer"
import MapLoader from "./map-loader"

export default function MapPage() {
  return (
    <div className="map-page-wrapper">
      {/* Full Viewport Map Section */}
      <div className="map-viewport-section">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen bg-[#EDE4D3] dark:bg-[#1E1E1E]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-[#4A7A7A] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#8C6F5A] dark:text-[#D9D9D9] font-medium">Loading map interface...</p>
              </div>
            </div>
          }
        >
          <MapLoader />
        </Suspense>
      </div>

      {/* Footer Section - Below viewport, accessible by scrolling */}
      <Footer />
    </div>
  )
}
