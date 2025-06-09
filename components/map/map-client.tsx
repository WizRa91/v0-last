"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useRouter } from "next/navigation"

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

// Custom marker icon for ancient sites - updated to match reference design
const ancientSiteIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#4FD1C7" stroke="#2d5555" strokeWidth="1.5"/>
      <circle cx="12.5" cy="12.5" r="6" fill="#F8F0E3" stroke="#4FD1C7" strokeWidth="1"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
})

// Accurate coordinates for ancient sites
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
  },
  // Other sites...
]

// Component to handle map events and center changes
function MapController({ selectedSite }: { selectedSite: (typeof ancientSites)[0] | null }) {
  const map = useMap()

  useEffect(() => {
    if (selectedSite) {
      map.flyTo([selectedSite.lat, selectedSite.lng], 8, {
        duration: 1.5,
      })
    }
  }, [selectedSite, map])

  return null
}

export default function MapClient() {
  const [selectedSite, setSelectedSite] = useState<(typeof ancientSites)[0] | null>(null)
  const [mapReady, setMapReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMapReady(true)
  }, [])

  if (!mapReady) {
    return (
      <div className="w-full h-[calc(100vh-64px)] bg-cream-dark animate-pulse flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-teal rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brown font-medium">Loading world map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[calc(100vh-64px)] relative">
      {/* Site selector sidebar */}
      <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="text-lg font-bold text-brown mb-3">Ancient Sites</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {ancientSites.map((site) => (
            <button
              key={site.id}
              onClick={() => setSelectedSite(site)}
              className={`block w-full text-left p-3 rounded-lg transition-all ${
                selectedSite?.id === site.id
                  ? "bg-teal text-white shadow-md"
                  : "hover:bg-cream text-brown border border-cream-dark"
              }`}
            >
              <div className="font-medium text-sm">{site.name}</div>
              <div className="text-xs opacity-75">{site.country}</div>
              <div className="text-xs opacity-60">{site.type}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Map */}
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }} className="z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedSite={selectedSite} />

        {ancientSites.map((site) => (
          <Marker
            key={site.id}
            position={[site.lat, site.lng]}
            icon={ancientSiteIcon}
            eventHandlers={{
              click: () => setSelectedSite(site),
            }}
          >
            <Popup>
              <div className="p-3 min-w-[250px]">
                <h3 className="font-bold text-brown text-lg mb-2">{site.name}</h3>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {site.description.length > 100 ? `${site.description.substring(0, 100)}...` : site.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-cream px-2 py-1 rounded">{site.type}</span>
                  <button
                    onClick={() => router.push(`/sites/${site.id}`)}
                    className="bg-teal hover:bg-teal-dark text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Detailed site information panel */}
      {selectedSite && (
        <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-6 max-w-sm">
          <button
            onClick={() => setSelectedSite(null)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
          >
            ×
          </button>
          <h3 className="text-xl font-bold text-brown mb-2 pr-6">{selectedSite.name}</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong className="text-brown">Type:</strong> <span className="text-gray-600">{selectedSite.type}</span>
            </p>
            <p>
              <strong className="text-brown">Period:</strong>{" "}
              <span className="text-gray-600">{selectedSite.period}</span>
            </p>
            <p>
              <strong className="text-brown">Location:</strong>{" "}
              <span className="text-gray-600">{selectedSite.country}</span>
            </p>
            <p>
              <strong className="text-brown">Coordinates:</strong>{" "}
              <span className="text-gray-600">
                {selectedSite.lat.toFixed(4)}, {selectedSite.lng.toFixed(4)}
              </span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-cream-dark">
            <p className="text-sm text-brown leading-relaxed">{selectedSite.description}</p>
          </div>
        </div>
      )}

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white bg-opacity-90 rounded-lg px-3 py-2">
        <div className="flex items-center space-x-2 text-xs text-brown">
          <div className="w-4 h-4 bg-teal rounded-full border-2 border-brown"></div>
          <span>Ancient Sites</span>
        </div>
      </div>
    </div>
  )
}
