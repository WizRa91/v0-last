"use client"

import { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useRouter } from "next/navigation"
import "../../styles/map-styles.css"
import type { Site } from "./types"
import MapPinPopup from "../map-pin-popup"

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Custom marker icon
const ancientSiteIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5C0 21.875 12.5 41 12.5 41S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0Z" fill="#4A7A7A"/>
        <circle cx="12.5" cy="12.5" r="6" fill="#CDAF87"/>
      </svg>
    `),
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -38],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12.5, 41],
})

function MapController({
  filteredSites,
  selectedSite,
}: {
  filteredSites: Site[]
  selectedSite: Site | null
}) {
  const map = useMap()

  useEffect(() => {
    if (selectedSite) {
      map.flyTo([selectedSite.latitude, selectedSite.longitude], 8, {
        duration: 1.5,
      })
    } else if (filteredSites.length > 0) {
      const bounds = L.latLngBounds(filteredSites.map((site) => [site.latitude, site.longitude]))
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 })
      }
    }
  }, [filteredSites, selectedSite, map])

  return null
}

interface IntegratedMapProps {
  sites: Site[]
  searchText: string
  activeCategory: string
  onSiteSelect: (site: Site) => void
}

export default function IntegratedMap({ sites, searchText, activeCategory, onSiteSelect }: IntegratedMapProps) {
  const [mapReady, setMapReady] = useState(false)
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)
  const [filteredSites, setFilteredSites] = useState(sites)
  const router = useRouter()
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    setMapReady(true)
  }, [])

  useEffect(() => {
    let currentSites = sites

    if (searchText) {
      currentSites = currentSites.filter(
        (site) =>
          site.name.toLowerCase().includes(searchText.toLowerCase()) ||
          (site.blurb && site.blurb.toLowerCase().includes(searchText.toLowerCase())) ||
          site.country.toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    if (activeCategory !== "all") {
      currentSites = currentSites.filter((site) => site.categories.includes(activeCategory))
    }

    setFilteredSites(currentSites)
  }, [searchText, activeCategory, sites])

  const handleSiteClick = (site: Site) => {
    setSelectedSite(site)
    onSiteSelect(site)
  }

  const handleReadMore = (siteSlug: string) => {
    router.push(`/sites/${siteSlug}`)
  }

  if (!mapReady) {
    return (
      <div className="w-full h-full bg-cream-dark animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-teal rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brown font-medium">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={18}
        style={{ height: "100%", width: "100%", position: "absolute", top: 0, left: 0 }}
        zoomControl={false}
        worldCopyJump={false}
        maxBounds={[
          [-85, -180],
          [85, 180],
        ]}
        maxBoundsViscosity={1.0}
        whenCreated={(map) => {
          mapRef.current = map
          map.setMaxBounds([
            [-85, -180],
            [85, 180],
          ])
          setTimeout(() => {
            map.invalidateSize()
          }, 100)
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <MapController filteredSites={filteredSites} selectedSite={selectedSite} />

        {filteredSites.map((site) => (
          <Marker
            key={site.slug}
            position={[site.latitude, site.longitude]}
            icon={ancientSiteIcon}
            eventHandlers={{
              click: () => handleSiteClick(site),
            }}
          >
            <Popup>
              <MapPinPopup site={site} onReadMore={handleReadMore} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
