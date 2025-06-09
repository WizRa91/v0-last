import type React from "react"
import type L from "leaflet"

// Define the MediaItem type (used in SitePage)
export interface MediaItem {
  src: string
  alt: string
  caption: string
  type?: "image" | "video"
}

// Define LocationData type (used in SitePage)
export interface LocationData {
  name: string
  address: string
  coordinates: [number, number]
  website: string
  directionsUrl: string
}

// Updated Site interface for map data and site pages
export interface Site {
  slug: string // New: replaces numeric id, e.g., "petra" or "petra-treasury"
  name: string // Display name, e.g., "Petra" or "The Treasury at Petra"
  baseSiteSlug?: string // e.g., "petra" if slug is "petra-treasury"
  addonName?: string // e.g., "Treasury" if slug is "petra-treasury"
  latitude: number
  longitude: number
  cover_image: string // For map pop-ups and carousels
  blurb?: string // Short description for map pop-ups
  fullDescription: string // Detailed description for site page
  country: string
  specificLocation: string // e.g., "Ma'an Governorate" or "Cusco Region"
  primaryCategory: string // Single main category for display, e.g., "Ancient Ruins"
  categories: string[] // Array of categories for filtering, e.g., ["ancient_ruins", "megaliths"]
  continent: string
  rating?: number
  period: string
  type: string // e.g., "Rock-cut city" or "Cave Paintings"
  significance?: string
  visitors?: string
  unesco?: boolean
  location?: LocationData // For the location sidebar on site page
  media: MediaItem[] // For image/video carousel on site page
  tags: string[] // For tag section on site page
  article_url?: string // Kept for compatibility, should point to /sites/slug
}

export interface Filter {
  categories: string[]
  continents: string[]
}

// Define props for the MapController component
export interface MapControllerProps {
  sites: Site[] // Updated to use the new Site interface
}

// Define custom interface for MapContainer props to fix TypeScript errors
export interface ExtendedMapContainerProps {
  children: React.ReactNode
  style?: React.CSSProperties
  center?: L.LatLngExpression
  zoom?: number
  minZoom?: number
  scrollWheelZoom?: boolean
  worldCopyJump?: boolean
  zoomControl?: boolean
  maxBounds?: L.LatLngBoundsExpression
  maxBoundsViscosity?: number
  className?: string
  id?: string
}

// Define category navigation item interface
export interface CategoryNavItem {
  id: string
  label: string
  icon: React.ReactNode
}
