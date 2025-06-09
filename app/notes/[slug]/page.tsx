"use client"

import { useParams } from "next/navigation"
import NotesMindMap from "@/components/notes-mind-map"
import { sitesData } from "../../../components/map/site-data" // Assuming this is your single source of truth
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotePage() {
  const params = useParams()
  const slug = params.slug as string

  // Find the site data based on the slug
  const site = sitesData.find((s) => s.slug === slug)

  if (!site) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cream-light text-brown p-4">
        <h1 className="text-4xl font-bold mb-4">Site Not Found</h1>
        <p className="text-lg mb-8">The site you are looking for does not exist.</p>
        <Link
          href="/map"
          className="inline-flex items-center bg-teal hover:bg-teal-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Map
        </Link>
      </div>
    )
  }

  return (
    // The NotesMindMap component has its own full-screen styling
    <NotesMindMap siteId={site.slug} siteName={site.name} />
  )
}
