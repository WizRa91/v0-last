"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useRouter } from "next/navigation"
import { Globe, Landmark, Mountain, PaintBucket, ChevronLeft, ChevronRight, Search, Share2, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Custom marker icon for ancient sites
const ancientSiteIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#8B5A3C"/>
      <circle cx="12.5" cy="12.5" r="6" fill="#4FD1C7"/>
      <circle cx="12.5" cy="12.5" r="3" fill="#FDF6E3"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
})

// Enhanced site data with more sites and categories
const ancientSites = [
  {
    id: 1,
    name: "Stonehenge",
    lat: 51.1789,
    lng: -1.8262,
    type: "Stone Circle",
    description: "A prehistoric monument in Wiltshire, England, consisting of a ring of standing stones.",
    period: "3100 - 1600 BCE",
    country: "United Kingdom",
    categories: ["ancient_sites", "megaliths"],
    continent: "europe",
    rating: 4.4,
  },
  {
    id: 2,
    name: "Pyramids of Giza",
    lat: 29.9792,
    lng: 31.1342,
    type: "Pyramid Complex",
    description:
      "Ancient Egyptian pyramid complex including the Great Pyramid, one of the Seven Wonders of the Ancient World.",
    period: "2580 - 2510 BCE",
    country: "Egypt",
    categories: ["ancient_sites"],
    continent: "africa",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Machu Picchu",
    lat: -13.1631,
    lng: -72.545,
    type: "Citadel",
    description: "An Incan citadel set high in the Andes Mountains in Peru, built in the 15th century.",
    period: "1450 CE",
    country: "Peru",
    categories: ["ancient_sites"],
    continent: "south_america",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Angkor Wat",
    lat: 13.4125,
    lng: 103.867,
    type: "Temple Complex",
    description: "A temple complex in Cambodia and the largest religious monument in the world.",
    period: "1113 - 1150 CE",
    country: "Cambodia",
    categories: ["ancient_sites"],
    continent: "asia",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Easter Island (Rapa Nui)",
    lat: -27.1127,
    lng: -109.3497,
    type: "Moai Statues",
    description: "A Polynesian island famous for its nearly 1,000 extant monumental statues called moai.",
    period: "1250 - 1500 CE",
    country: "Chile",
    categories: ["ancient_sites", "unusual_formations"],
    continent: "south_america",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Petra",
    lat: 30.3285,
    lng: 35.4444,
    type: "Archaeological City",
    description: "An ancient city carved into rose-red cliffs in southern Jordan.",
    period: "312 BCE - 106 CE",
    country: "Jordan",
    categories: ["ancient_sites"],
    continent: "asia",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Chichen Itza",
    lat: 20.6843,
    lng: -88.5678,
    type: "Maya City",
    description: "A large pre-Columbian archaeological site built by the Maya civilization.",
    period: "600 - 1200 CE",
    country: "Mexico",
    categories: ["ancient_sites"],
    continent: "north_america",
    rating: 4.7,
  },
  {
    id: 8,
    name: "Acropolis of Athens",
    lat: 37.9715,
    lng: 23.7267,
    type: "Ancient Citadel",
    description: "An ancient citadel located on a rocky outcrop above the city of Athens.",
    period: "447 - 438 BCE",
    country: "Greece",
    categories: ["ancient_sites"],
    continent: "europe",
    rating: 4.6,
  },
  {
    id: 9,
    name: "Nazca Lines",
    lat: -14.739,
    lng: -75.13,
    type: "Geoglyphs",
    description: "A group of geoglyphs made in the soil of the Nazca Desert in southern Peru.",
    period: "500 BCE - 500 CE",
    country: "Peru",
    categories: ["geoglyphs", "unusual_formations"],
    continent: "south_america",
    rating: 4.5,
  },
  {
    id: 10,
    name: "Newgrange",
    lat: 53.6947,
    lng: -6.4755,
    type: "Passage Tomb",
    description: "A prehistoric monument in County Meath, Ireland, dating to around 3200 BCE.",
    period: "3200 BCE",
    country: "Ireland",
    categories: ["ancient_sites", "megaliths"],
    continent: "europe",
    rating: 4.3,
  },
  {
    id: 11,
    name: "Carnac Stones",
    lat: 47.5833,
    lng: -3.0833,
    type: "Megalithic Alignment",
    description: "An exceptionally dense collection of megalithic sites in Brittany, France.",
    period: "4500 - 3300 BCE",
    country: "France",
    categories: ["megaliths"],
    continent: "europe",
    rating: 4.2,
  },
  {
    id: 12,
    name: "Moeraki Boulders",
    lat: -45.3453,
    lng: 170.8263,
    type: "Spherical Boulders",
    description: "Unusually large and spherical boulders lying along a stretch of Koekohe Beach.",
    period: "Natural Formation",
    country: "New Zealand",
    categories: ["unusual_formations"],
    continent: "oceania",
    rating: 4.0,
  },
  {
    id: 14,
    name: "Lascaux Cave",
    lat: 45.0505,
    lng: 1.1756,
    type: "Cave Paintings",
    description: "Famous for its Paleolithic cave paintings, estimated to be up to 17,000 years old.",
    period: "15,000 - 13,000 BCE",
    country: "France",
    categories: ["rock_art", "ancient_sites"],
    continent: "europe",
    rating: 4.7,
  },
]

// Category definitions - updated with new categories and order
const categories = [
  {
    id: "all_sites",
    name: "All Sites",
    icon: <Globe className="h-5 w-5" />,
    count: ancientSites.length,
  },
  {
    id: "ancient_sites",
    name: "Ancient Sites",
    icon: <Landmark className="h-5 w-5" />,
    count: ancientSites.filter((site) => site.categories.includes("ancient_sites")).length,
  },
  {
    id: "rock_art",
    name: "Rock Art",
    icon: <PaintBucket className="h-5 w-5" />,
    count: ancientSites.filter((site) => site.categories.includes("rock_art")).length,
  },
  {
    id: "megaliths",
    name: "Megaliths",
    icon: <Landmark className="h-5 w-5" />,
    count: ancientSites.filter((site) => site.categories.includes("megaliths")).length,
  },
  {
    id: "geoglyphs",
    name: "Geoglyphs",
    icon: <Map className="h-5 w-5" />,
    count: ancientSites.filter((site) => site.categories.includes("geoglyphs")).length,
  },
  {
    id: "unusual_formations",
    name: "Unusual Formations",
    icon: <Mountain className="h-5 w-5" />,
    count: ancientSites.filter((site) => site.categories.includes("unusual_formations")).length,
  },
]

// Component to handle map events and center changes
function MapController({ filteredSites }: { filteredSites: any[] }) {
  const map = useMap()

  useEffect(() => {
    if (filteredSites.length > 0) {
      // Fit bounds to show all filtered sites
      const bounds = L.latLngBounds(filteredSites.map((site) => [site.lat, site.lng]))
      map.fitBounds(bounds, { padding: [20, 20] })
    }
  }, [filteredSites, map])

  return null
}

export default function SidebarMapClient() {
  const [selectedSite, setSelectedSite] = useState<any>(null)
  const [mapReady, setMapReady] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [activeCategory, setActiveCategory] = useState("all_sites")
  const [filteredSites, setFilteredSites] = useState(ancientSites)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    setMapReady(true)
  }, [])

  // Handle search text change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  // Filter sites based on search and category
  useEffect(() => {
    let filtered = ancientSites

    if (searchText) {
      filtered = filtered.filter(
        (site) =>
          site.name.toLowerCase().includes(searchText.toLowerCase()) ||
          site.description.toLowerCase().includes(searchText.toLowerCase()) ||
          site.country.toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    if (activeCategory !== "all_sites") {
      filtered = filtered.filter((site) => site.categories.includes(activeCategory))
    }

    setFilteredSites(filtered)
  }, [searchText, activeCategory])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Interactive Map of Ancient Sites",
        text: "Explore ancient sites around the world with this interactive map!",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  if (!mapReady) {
    return (
      <div className="w-full h-[calc(100vh-112px)] bg-cream-dark animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-teal rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brown font-medium">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-112px)] bg-cream-light">
      {/* Sidebar - updated to match the reference image */}
      <div
        className={cn(
          "bg-cream-light border-r border-brown/20 transition-all duration-300 ease-in-out flex flex-col",
          sidebarCollapsed ? "w-0 overflow-hidden" : "w-80",
        )}
      >
        {/* Search and Share - now in the sidebar */}
        <div className="p-4 bg-teal">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search ancient sites..."
                className="pl-9 pr-4 py-2 w-full bg-cream border-none rounded-md text-brown"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="bg-white/20 hover:bg-white/30 text-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sidebar Header */}
        <div className="p-4 border-b border-brown/20">
          <div className="flex items-center gap-3">
            <div className="bg-teal p-2 rounded-md">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brown">ANCIENT SITES</h2>
              <h3 className="text-lg font-bold text-brown">EXPLORER</h3>
              <p className="text-sm text-brown/70">Interactive World Map</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-brown/80">
            Discover remarkable ancient sites, mysterious formations, and archaeological wonders from around the world.
          </p>
        </div>

        {/* Site Count */}
        <div className="px-4 py-2 border-b border-brown/20 flex justify-between items-center">
          <span className="text-sm text-brown/70">
            Showing {filteredSites.length} of {ancientSites.length} sites
          </span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Options</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brown/70"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </Button>
        </div>

        {/* Collapse indicator */}
        <div className="flex justify-center py-2 border-b border-brown/20">
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="h-6 w-6 p-0">
            <ChevronLeft className="h-4 w-4 text-brown/70" />
          </Button>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-auto">
          <div className="py-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 text-left transition-colors",
                  activeCategory === category.id ? "bg-teal text-white" : "hover:bg-brown/5 text-brown/80",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-1.5 rounded-md",
                      activeCategory === category.id ? "bg-white/20 text-white" : "bg-brown/10 text-brown",
                    )}
                  >
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs",
                    activeCategory === category.id ? "bg-white/20 text-white" : "bg-brown/20 text-brown/70",
                  )}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className="absolute left-80 top-1/2 transform -translate-y-1/2 z-10 bg-cream border border-brown/20 rounded-r-md p-2 shadow-md transition-all duration-300"
        style={{ left: sidebarCollapsed ? "0px" : "320px" }}
      >
        {sidebarCollapsed ? (
          <ChevronRight className="h-5 w-5 text-brown" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-brown" />
        )}
      </button>

      {/* Map Container - properly contained */}
      <div className="flex-1 p-4">
        <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-lg border border-brown/20">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            minZoom={2}
            maxZoom={18}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
            zoomControl={false}
            worldCopyJump={false}
            maxBounds={[
              [-85, -180],
              [85, 180],
            ]}
            maxBoundsViscosity={1.0}
            whenCreated={(map) => {
              mapRef.current = map
              // Prevent world wrapping
              map.setMaxBounds([
                [-85, -180],
                [85, 180],
              ])
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="topleft" />
            <MapController filteredSites={filteredSites} />

            {filteredSites.map((site) => (
              <Marker
                key={site.id}
                position={[site.lat, site.lng]}
                icon={ancientSiteIcon}
                eventHandlers={{
                  click: () => {
                    // Only set selected site for popup, don't zoom
                    setSelectedSite(site)
                  },
                }}
              >
                <Popup>
                  <div className="p-3 min-w-[250px]">
                    <h3 className="font-bold text-brown text-lg mb-2">{site.name}</h3>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                      {site.description.length > 100 ? `${site.description.substring(0, 100)}...` : site.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500 bg-cream px-2 py-1 rounded">{site.type}</span>
                      <span className="text-xs text-gray-500">★ {site.rating}/5</span>
                    </div>
                    <button
                      onClick={() => router.push(`/sites/${site.id}`)}
                      className="w-full bg-teal hover:bg-teal-dark text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                    >
                      Read More
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}
