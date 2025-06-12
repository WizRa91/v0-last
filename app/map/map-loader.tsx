"use client"

import dynamic from "next/dynamic"

const MapContainerWithNoSSR = dynamic(() => import("@/components/map/map-container"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[#EDE4D3] dark:bg-[#1E1E1E]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-[#4A7A7A] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#8C6F5A] dark:text-[#D9D9D9] font-medium">Loading map interface...</p>
      </div>
    </div>
  ),
})

export default function MapLoader() {
  return <MapContainerWithNoSSR />
}
