"use client"

import { useEffect, useState, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useRouter } from "next/navigation"
import "../../styles/map-styles.css"
import type { Site } from "./types" // Import the updated Site type
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
  popupAnchor: [0, -38], // Adjusted for better popup placement above the pin
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
  shadowAnchor: [12.5, 41], // Align shadow with icon anchor
})

// New site data using slugs and updated structure
export const sitesData: Site[] = [
  {
    slug: "petra",
    name: "Petra",
    latitude: 30.3285,
    longitude: 35.4444,
    cover_image: "/petra-jordan.png",
    blurb: "Ancient city carved into sandstone cliffs in Jordan, famous for Al-Khazneh (The Treasury).",
    fullDescription:
      "Petra, a historical and archaeological city in southern Jordan, is famous for its rock-cut architecture and water conduit system. Established possibly as early as 312 BC as the capital city of the Arab Nabataeans, it is a symbol of Jordan, as well as its most-visited tourist attraction.",
    country: "Jordan",
    specificLocation: "Ma'an Governorate",
    primaryCategory: "Ancient Ruins",
    categories: ["ancient_ruins", "rock_cut_architecture"],
    continent: "asia",
    period: "c. 312 BC - AD 106",
    type: "Rock-cut City",
    unesco: true,
    media: [
      { src: "/petra-treasury-jordan.png", alt: "The Treasury at Petra", caption: "Al-Khazneh, The Treasury at Petra" },
    ],
    tags: ["Nabataean", "UNESCO", "Desert City", "Archaeology"],
    article_url: "/sites/petra",
  },
  {
    slug: "machu-picchu",
    name: "Machu Picchu",
    latitude: -13.1631,
    longitude: -72.545,
    cover_image: "/machu-picchu-mountains.png",
    blurb: "15th-century Inca citadel set high in the Andes Mountains in Peru.",
    fullDescription:
      "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it’s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, intriguing buildings that play on astronomical alignments and panoramic views.",
    country: "Peru",
    specificLocation: "Cusco Region",
    primaryCategory: "Ancient Ruins",
    categories: ["ancient_ruins", "inca_civilization"],
    continent: "south_america",
    period: "c. AD 1450",
    type: "Inca Citadel",
    unesco: true,
    media: [
      {
        src: "/machu-picchu-overview.png",
        alt: "Overview of Machu Picchu",
        caption: "Panoramic view of the Inca citadel of Machu Picchu",
      },
    ],
    tags: ["Inca", "UNESCO", "Andes Mountains", "Citadel"],
    article_url: "/sites/machu-picchu",
  },
  {
    slug: "lascaux-cave",
    name: "Lascaux Cave",
    latitude: 45.0495,
    longitude: 1.1725, // Adjusted slightly for uniqueness if needed
    cover_image: "/lascaux-cave-paintings.png",
    blurb: "Complex of caves in southwestern France famous for its Paleolithic cave paintings.",
    fullDescription:
      "Lascaux is a network of caves near the village of Montignac, in the department of Dordogne in southwestern France. Over 600 parietal wall paintings cover the interior walls and ceilings of the cave. The paintings are primarily of large animals, typical local and contemporary fauna that correspond with the fossil record of the Upper Paleolithic in the area. They are the combined effort of many generations and, with continued debate, the age of the paintings is now usually estimated at around 17,000 years (early Magdalenian).",
    country: "France",
    specificLocation: "Nouvelle-Aquitaine",
    primaryCategory: "Rock Art",
    categories: ["rock_art", "paleolithic_art", "ancient_sites"],
    continent: "europe",
    period: "c. 17,000 BP",
    type: "Cave Paintings",
    unesco: true,
    media: [
      {
        src: "/placeholder.svg?height=800&width=1200",
        alt: "Detailed cave painting from Lascaux",
        caption: "Aurochs and horses depicted in Lascaux Cave",
      },
    ],
    tags: ["Paleolithic", "UNESCO", "Cave Art", "Prehistory"],
    article_url: "/sites/lascaux-cave",
  },
  {
    slug: "carnac-stones",
    name: "Carnac Stones",
    latitude: 47.5925,
    longitude: -3.0815,
    cover_image: "/placeholder.svg?height=300&width=500",
    blurb: "Exceptionally dense collection of megalithic sites in Brittany, France.",
    fullDescription:
      "The Carnac stones are an exceptionally dense collection of megalithic sites in Brittany in northwestern France, consisting of stone alignments (rows), dolmens (stone tombs), tumuli (burial mounds) and single menhirs (standing stones). More than 3,000 prehistoric standing stones were hewn from local granite and erected by the pre-Celtic people of Brittany, and are the largest such collection in the world.",
    country: "France",
    specificLocation: "Brittany",
    primaryCategory: "Megaliths",
    categories: ["megaliths", "neolithic", "ancient_sites"],
    continent: "europe",
    period: "c. 4500 BC - 3300 BC",
    type: "Megalithic Alignments",
    media: [
      {
        src: "/placeholder.svg?height=800&width=1200",
        alt: "Rows of Carnac Stones",
        caption: "The extensive alignments of the Carnac Stones",
      },
    ],
    tags: ["Neolithic", "Standing Stones", "Prehistory", "Ritual Site"],
    article_url: "/sites/carnac-stones",
  },
  {
    slug: "nazca-lines",
    name: "Nazca Lines",
    latitude: -14.739,
    longitude: -75.13,
    cover_image: "/placeholder.svg?height=300&width=500",
    blurb: "Series of large ancient geoglyphs in the Nazca Desert, in southern Peru.",
    fullDescription:
      "The Nazca Lines are a group of very large geoglyphs made in the soil of the Nazca Desert in southern Peru. They were created between 500 BCE and 500 CE by people making depressions or shallow incisions in the desert floor, removing pebbles and leaving differently colored dirt exposed. Most lines run straight across the landscape, but there are also figurative designs of animals and plants.",
    country: "Peru",
    specificLocation: "Nazca Desert",
    primaryCategory: "Geoglyphs",
    categories: ["geoglyphs", "unusual_formations", "ancient_sites"],
    continent: "south_america",
    period: "500 BCE - 500 CE",
    type: "Geoglyphs",
    unesco: true,
    media: [
      {
        src: "/placeholder.svg?height=800&width=1200",
        alt: "Aerial view of a Nazca Line figure",
        caption: "The Hummingbird geoglyph, Nazca Lines",
      },
    ],
    tags: ["Nazca Culture", "UNESCO", "Desert Art", "Archaeology"],
    article_url: "/sites/nazca-lines",
  },
]

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
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [filteredSites, selectedSite, map])

  return null
}

interface IntegratedMapProps {
  searchText: string
  activeCategory: string
  onSiteSelect: (site: Site) => void
}

export default function IntegratedMap({ searchText, activeCategory, onSiteSelect }: IntegratedMapProps) {
  const [mapReady, setMapReady] = useState(false)
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)
  const [filteredSites, setFilteredSites] = useState(sitesData)
  const router = useRouter()
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    setMapReady(true)
  }, [])

  useEffect(() => {
    let currentSites = sitesData

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
  }, [searchText, activeCategory])

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
