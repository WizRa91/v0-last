"use client"

import MapContainer from "@/components/map/map-container"
import type { Site } from "@/components/map/types"

interface MapClientWrapperProps {
  sites: Site[]
}

/**
 * A simple client-side wrapper to pass server-fetched data
 * to the MapContainer, which handles the dynamic loading of the Leaflet map.
 */
export default function MapClientWrapper({ sites }: MapClientWrapperProps) {
  return <MapContainer sites={sites} />
}
