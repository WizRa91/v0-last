"use client"

import type React from "react"
import { useState } from "react"
import dynamic from "next/dynamic"
import InteractiveSidebar from "../interactive-sidebar"
import { Home } from "lucide-react"
import Link from "next/link"
import type { Site } from "./types"

// Dynamic import for the map component (no SSR)
const IntegratedMapWithNoSSR = dynamic(() => import("./integrated-map-supabase"), {
  ssr: false,
  loading: () => <MapSkeleton />,
})

// Skeleton loader for the map
function MapSkeleton() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading interactive map...</p>
    </div>
  )
}

interface MapContainerProps {
  sites: Site[]
}

export default function MapContainer({ sites }: MapContainerProps) {
  const [searchText, setSearchText] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedSite, setSelectedSite] = useState<any>(null)

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  // Handle site selection from map
  const handleSiteSelect = (site: any) => {
    setSelectedSite(site)
    // Additional logic can be added here
  }

  const filteredSites = sites.filter((site) => {
    const searchMatch =
      searchText === "" ||
      site.name.toLowerCase().includes(searchText.toLowerCase()) ||
      site.country.toLowerCase().includes(searchText.toLowerCase())
    const categoryMatch = activeCategory === "all" || site.categories.includes(activeCategory)
    return searchMatch && categoryMatch
  })

  return (
    <div className="main-container">
      {/* Sidebar Container - Fixed width */}
      <div className="sidebar-container">
        <InteractiveSidebar
          searchText={searchText}
          onSearchChange={handleSearchChange}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          totalSites={sites.length}
          filteredSites={filteredSites.length}
        />
      </div>

      {/* Map Container - Takes remaining space */}
      <div className="map-container">
        {/* Top Bar */}
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

        {/* Map Content with proper container */}
        <div className="map-content">
          <div className="map-wrapper">
            <IntegratedMapWithNoSSR
              sites={sites}
              searchText={searchText}
              activeCategory={activeCategory}
              onSiteSelect={handleSiteSelect}
            />
          </div>
        </div>

        {/* Map Footer with Statistics */}
        <div className="map-footer">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <span>Total sites: {sites.length}</span>
              <span>Filtered sites: {filteredSites.length}</span>
              <span>Auth: Anonymous</span>
            </div>
            <div className="flex gap-4">
              <span>Data source: Database</span>
              <span>Retries: 0</span>
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
