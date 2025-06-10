import { Suspense } from "react"
import dynamic from "next/dynamic"
import { Footer } from "@/components/footer"

// Dynamic import for the map container (no SSR)
const MapContainerWithNoSSR = dynamic(() => import("@/components/map/map-container"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[var(--custom-bg)] dark:bg-[var(--custom-bg)]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-[var(--custom-accent)] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[var(--custom-text)] font-medium">Loading map interface...</p>
      </div>
    </div>
  ),
})

export default function MapPage() {
  return (
    <div className="map-page-wrapper">
      {/* Full Viewport Map Section */}
      <div className="map-viewport-section">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen bg-[var(--custom-bg)] dark:bg-[var(--custom-bg)]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-[var(--custom-accent)] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[var(--custom-text)] font-medium">Loading map interface...</p>
              </div>
            </div>
          }
        >
          <MapContainerWithNoSSR />
        </Suspense>
      </div>

      {/* Footer Section - Below viewport, accessible by scrolling */}
      <Footer />
    </div>
  )
}
