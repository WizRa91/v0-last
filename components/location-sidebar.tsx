"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface LocationData {
  name: string
  address: string
  coordinates: [number, number]
  website: string
  directionsUrl: string
}

interface LocationSidebarProps {
  location: LocationData
  onMapClick: () => void
}

export const LocationSidebar = ({ location, onMapClick }: LocationSidebarProps) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return
    const map = L.map(mapRef.current, {
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
    }).setView(location.coordinates, 13)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map)
    const customIcon = L.divIcon({
      className: "custom-marker-icon",
      html: `<div class="marker-pin"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -42],
    })
    L.marker(location.coordinates, { icon: customIcon }).addTo(map)
    return () => {
      map.remove()
    }
  }, [location.coordinates])

  const copyToClipboard = async (text: string, element: HTMLElement) => {
    try {
      await navigator.clipboard.writeText(text)
      const icon = element.querySelector("i") // Assuming you might add <i> for icons later
      if (icon) {
        const originalClass = icon.className
        icon.className = "fas fa-check"
        icon.style.color = "#5F9EA0" // Use new teal
        setTimeout(() => {
          icon.className = originalClass
          icon.style.color = ""
        }, 2000)
      }
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-dark-secondary-bg rounded-2xl shadow-lg overflow-hidden">
        <div
          ref={mapRef}
          className="w-full h-[400px] relative cursor-pointer transition-all duration-300 ease-in-out hover:opacity-95"
          onClick={onMapClick}
        ></div>
        <div className="p-5">
          <div
            className="relative flex items-start gap-3 p-3 cursor-pointer border-2 border-transparent rounded-lg transition-all duration-200 hover:border-teal/30 dark:hover:border-dark-hover-teal/30 hover:bg-teal/10 dark:hover:bg-dark-hover-teal/10 group"
            onClick={(e) => copyToClipboard(location.address.replace(/\n/g, ", "), e.currentTarget)}
          >
            <div className="text-teal dark:text-dark-hover-teal mt-1">📍</div>
            <div className="text-brown dark:text-dark-text-primary text-base whitespace-pre-line font-medium">
              {location.address}
            </div>
            <div className="absolute right-3 flex flex-col items-center gap-1 text-brown dark:text-dark-text-secondary text-sm opacity-0 translate-y-1 transition-all duration-200 whitespace-nowrap group-hover:opacity-100 group-hover:translate-y-0">
              copy
              <div className="text-xl p-2 rounded transition-all duration-200 hover:bg-teal/20 dark:hover:bg-dark-hover-teal/20 hover:text-teal dark:hover:text-dark-hover-teal">
                📋
              </div>
            </div>
          </div>

          <div
            className="relative flex items-start gap-3 p-3 cursor-pointer border-2 border-transparent rounded-lg transition-all duration-200 hover:border-teal/30 dark:hover:border-dark-hover-teal/30 hover:bg-teal/10 dark:hover:bg-dark-hover-teal/10 group"
            onClick={(e) => copyToClipboard(`${location.coordinates[0]}, ${location.coordinates[1]}`, e.currentTarget)}
          >
            <div className="text-teal dark:text-dark-hover-teal mt-1">🌍</div>
            <div className="text-brown dark:text-dark-text-primary text-base font-mono">
              {location.coordinates[0]}, {location.coordinates[1]}
            </div>
            <div className="absolute right-3 flex flex-col items-center gap-1 text-brown dark:text-dark-text-secondary text-sm opacity-0 translate-y-1 transition-all duration-200 whitespace-nowrap group-hover:opacity-100 group-hover:translate-y-0">
              copy
              <div className="text-xl p-2 rounded transition-all duration-200 hover:bg-teal/20 dark:hover:bg-dark-hover-teal/20 hover:text-teal dark:hover:text-dark-hover-teal">
                📋
              </div>
            </div>
          </div>

          <a
            href={location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-teal hover:bg-teal-dark dark:bg-dark-hover-teal dark:hover:opacity-80 text-white dark:text-dark-text-primary py-3 px-5 text-center rounded-lg text-base cursor-pointer mt-4 transition-all duration-300 shadow-lg font-medium"
          >
            🧭 Get Directions
          </a>

          {location.website && (
            <a
              href={location.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-brown hover:bg-brown-dark dark:bg-dark-accent dark:hover:bg-dark-hover-teal text-cream-light dark:text-dark-text-primary py-3 px-5 text-center rounded-lg text-base cursor-pointer mt-2 transition-all duration-300 shadow-lg font-medium"
            >
              🌐 Official Website
            </a>
          )}
        </div>
      </div>
      <style jsx>{`
        .custom-marker-icon { background: transparent; border: none; }
        .marker-pin {
          width: 30px; height: 30px; border-radius: 50% 50% 50% 0;
          background: #5F9EA0; /* Use new teal for marker pin */
          position: absolute; transform: rotate(-45deg);
          left: 50%; top: 50%; margin: -15px 0 0 -15px;
          box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
        }
        .marker-pin::after {
          content: ""; width: 18px; height: 18px; margin: 6px 0 0 6px;
          background: #D9D9D9; /* Use dark text primary for inner circle */
          position: absolute; border-radius: 50%;
        }
      `}</style>
    </>
  )
}
