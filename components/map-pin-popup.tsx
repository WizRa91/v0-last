"use client"

import type React from "react"
import { useTheme } from "./theme-provider"
import type { Site } from "./map/types"

interface MapPinPopupProps {
  site: Site
  onReadMore: (siteSlug: string) => void
}

export default function MapPinPopup({ site, onReadMore }: MapPinPopupProps) {
  const { theme } = useTheme()

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onReadMore(site.slug)
  }

  return (
    <div className="site-popup">
      <img src={site.cover_image || "/placeholder.svg?height=200&width=300"} alt={site.name} loading="lazy" />

      <div className="flex items-center justify-between">
        <h3>{site.name}</h3>
        <div className="flex flex-col items-end">
          <span className="text-xs">{site.type}</span>
          {site.rating && <span className="text-xs">★ {site.rating}/5</span>}
        </div>
      </div>

      {site.blurb && <p>{site.blurb.length > 120 ? `${site.blurb.substring(0, 120)}...` : site.blurb}</p>}

      <button onClick={handleReadMoreClick} type="button" aria-label={`Read more about ${site.name}`}>
        Read More
      </button>
    </div>
  )
}
