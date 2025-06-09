"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface MapModalProps {
  coordinates: [number, number]
  onClose: () => void
}

export const MapModal = ({ coordinates, onClose }: MapModalProps) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const map = L.map(mapRef.current, {
      zoomControl: true,
      dragging: true,
      touchZoom: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
    }).setView(coordinates, 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map)

    L.marker(coordinates).addTo(map)

    // Force a resize to ensure proper rendering
    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    return () => {
      map.remove()
    }
  }, [coordinates])

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/90 z-[2000]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="relative w-[90%] h-[90%] mx-auto my-[2%] bg-[#F8F0E3] rounded-2xl overflow-hidden shadow-[8px_8px_20px_rgba(140,111,90,0.5),-8px_-8px_20px_rgba(248,240,227,0.8)]">
        <button
          className="absolute top-5 right-5 w-10 h-10 bg-[#8C6F5A]/70 text-white border-none rounded-full text-2xl flex items-center justify-center cursor-pointer z-[2001] transition-all duration-300 hover:bg-[#8C6F5A] shadow-[3px_3px_6px_rgba(140,111,90,0.3),-3px_-3px_6px_rgba(248,240,227,0.5)]"
          onClick={onClose}
        >
          &times;
        </button>

        <div ref={mapRef} className="w-full h-full"></div>
      </div>
    </div>
  )
}
