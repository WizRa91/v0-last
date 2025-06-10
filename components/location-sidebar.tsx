"use client"

import type React from "react"

interface LocationSidebarProps {
  location: {
    name: string
    address: string
    phone: string
    website: string
    mapImage: string
  }
  onClose: () => void
}

const LocationSidebar: React.FC<LocationSidebarProps> = ({ location, onClose }) => {
  return (
    <div className="location-sidebar fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-dark-bg shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-x-0">
      <div className="p-4">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 bg-gray-200 dark:bg-gray-700 rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-8">
          <div className="relative h-60 bg-[var(--custom-border)] dark:bg-gray-700">
            <img
              src={location.mapImage || "/placeholder.svg"}
              alt="Location Map"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="mt-4">
            <h2 className="font-bold text-lg theme-text">{location.name}</h2>
            <p className="text-sm theme-secondary-text">{location.address}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm theme-secondary-text">Phone: {location.phone}</p>
            <a
              href={location.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm theme-secondary-text hover:underline"
            >
              Website
            </a>
          </div>

          <button className="w-full mt-4 theme-button">View on Map</button>

          <button className="w-full mt-2 theme-button bg-[var(--custom-hover)] hover:bg-[var(--custom-accent)] text-[#f5f1e8] dark:bg-brown dark:hover:bg-brown-dark">
            Get Directions
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationSidebar
