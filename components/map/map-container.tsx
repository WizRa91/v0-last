"use client"

import type React from "react"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import InteractiveSidebar from "../interactive-sidebar"
import type { Site } from "./types"

// Import the map component dynamically to avoid SSR issues with Leaflet
const IntegratedMapWithNoSSR = dynamic(() => import("@/components/map/integrated-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading map...</p>
      </div>
    </div>
  ),
})

interface MapContainerProps {
  sites: Site[]
}

export default function MapContainer({ sites }: MapContainerProps) {
  const [searchText, setSearchText] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)
  const [filteredSites, setFilteredSites] = useState<Site[]>(sites || [])

  // Filter sites based on search text and active category
  useEffect(() => {
    if (!Array.isArray(sites)) {
      setFilteredSites([])
      return
    }

    let result = [...sites]

    if (searchText) {
      result = result.filter(
        (site) =>
          site.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          site.country?.toLowerCase().includes(searchText.toLowerCase()) ||
          site.blurb?.toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    if (activeCategory !== "all") {
      result = result.filter(
        (site) => site.categories && Array.isArray(site.categories) && site.categories.includes(activeCategory),
      )
    }

    setFilteredSites(result)
  }, [searchText, activeCategory, sites])

  // Get sites for the current category view
  const sitesForCategoryView = activeCategory === "all" ? [] : filteredSites

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  const handleSiteSelect = (site: Site) => {
    setSelectedSite(site)
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="sidebar-container w-80 h-full">
        <InteractiveSidebar
          searchText={searchText}
          onSearchChange={handleSearchChange}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          totalSites={Array.isArray(sites) ? sites.length : 0}
          filteredSites={filteredSites.length}
          sitesForCategoryView={sitesForCategoryView}
          allSites={sites || []} // Pass all sites to InteractiveSidebar
        />
      </div>
      <div className="main-container flex-1 relative pl-80">
        <IntegratedMapWithNoSSR
          sites={filteredSites}
          searchText={searchText}
          activeCategory={activeCategory}
          onSiteSelect={handleSiteSelect}
        />
      </div>
    </div>
  )
}
