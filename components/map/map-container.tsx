"use client"

import type React from "react"
import { useState } from "react"
import dynamic from "next/dynamic"
import InteractiveSidebar from "../interactive-sidebar" // Assuming this path is correct
import { Home } from "lucide-react"
import Link from "next/link"
import type { Site } from "./types"

// Dynamic import for the map component (no SSR)
// Using the explicit alias @/ to ensure correct resolution
const IntegratedMapWithNoSSR = dynamic(() => import("@/components/map/integrated-map-supabase"), {
  ssr: false,
  loading: () => <MapSkeleton />,
})

// Skeleton loader for the map
function MapSkeleton() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading interactive map...</p>
      </div>
    </div>
  )
}

interface MapContainerProps {
  sites: Site[]
}

export default function MapContainer({ sites }: MapContainerProps) {
  const [searchText, setSearchText] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  const handleSiteSelect = (site: Site) => {
    setSelectedSite(site)
  }

  const filteredSites = Array.isArray(sites)
    ? sites.filter((site) => {
        const searchMatch =
          searchText === "" ||
          site.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          site.country?.toLowerCase().includes(searchText.toLowerCase()) ||
          site.blurb?.toLowerCase().includes(searchText.toLowerCase())
        const categoryMatch = activeCategory === "all" || (site.categories && site.categories.includes(activeCategory))
        return searchMatch && categoryMatch
      })
    : []

  return (
    <div className="main-container">
      <div className="sidebar-container">
        <InteractiveSidebar
          searchText={searchText}
          onSearchChange={handleSearchChange}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          totalSites={Array.isArray(sites) ? sites.length : 0}
          filteredSites={filteredSites.length}
        />
      </div>

      <div className="map-container">
        <div className="top-bar">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#8C6F5A] hover:text-[#4A7A7A] dark:text-white dark:hover:text-white/80 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="text-sm font-['Montserrat']">Home</span>
            </Link>
            <div className="h-4 w-px bg-[#8C6F5A]/30 dark:bg-white/30"></div>
            <h2 className="top-bar-title">INTERACTIVE MAP OF UNUSUAL FORMATIONS</h2>
          </div>
        </div>

        <div className="map-content">
          <div className="map-wrapper">
            <IntegratedMapWithNoSSR
              sites={sites} // Pass the original sites array
              searchText={searchText}
              activeCategory={activeCategory}
              onSiteSelect={handleSiteSelect}
            />
          </div>
        </div>

        <div className="map-footer">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <span>Total sites: {Array.isArray(sites) ? sites.length : 0}</span>
              <span>Filtered sites: {filteredSites.length}</span>
              <span>Auth: Anonymous</span> {/* Placeholder */}
            </div>
            <div className="flex gap-4">
              <span>Data source: Database</span> {/* Placeholder */}
              <span>Retries: 0</span> {/* Placeholder */}
              <span className="flex items-center gap-1">
                🍃{" "}
                <a
                  href="https://leafletjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400"
                >
                  Leaflet
                </a>
                {" | "}©{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400"
                >
                  OpenStreetMap
                </a>{" "}
                contributors
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
