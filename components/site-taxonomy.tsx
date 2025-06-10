"use client"

import Link from "next/link"
import { Globe, MapPin } from "lucide-react"

interface SiteTaxonomyProps {
  siteName: string
  country: string
  primaryCategory: string
  specificLocation: string
  addonName?: string
}

export const SiteTaxonomy = ({
  siteName,
  country,
  primaryCategory,
  specificLocation,
  addonName,
}: SiteTaxonomyProps) => {
  const displaySiteName = addonName ? `${siteName} - ${addonName}` : siteName

  return (
    <div className="mb-6 text-brown dark:text-dark-text-primary">
      <div className="mb-4 flex items-center text-sm flex-wrap">
        <Link
          href="/map"
          className="inline-flex items-center gap-1.5 text-brown dark:text-dark-text-secondary hover:text-teal dark:hover:text-dark-hover-teal transition-colors"
        >
          <Globe size={16} strokeWidth={2} aria-hidden="true" />
          ALL
        </Link>
        <span className="mx-2 text-gray-400 dark:text-dark-text-secondary/70">/</span>
        <Link
          href={`/map?country=${country.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 text-brown dark:text-dark-text-secondary hover:text-teal dark:hover:text-dark-hover-teal transition-colors"
        >
          <MapPin size={16} strokeWidth={2} aria-hidden="true" />
          {country.toUpperCase()}
        </Link>
        <span className="mx-2 text-gray-400 dark:text-dark-text-secondary/70">/</span>
        <span className="text-brown dark:text-dark-text-primary font-medium">{displaySiteName.toUpperCase()}</span>
      </div>

      <div className="text-gray-600 dark:text-dark-text-secondary text-sm mb-2 font-['Montserrat']">
        {primaryCategory} • {specificLocation}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-brown dark:text-dark-text-primary font-['Cinzel']">
        {displaySiteName}
      </h1>
    </div>
  )
}
