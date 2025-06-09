"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-light flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brown mb-4">404</h1>
        <h2 className="text-2xl font-bold text-brown mb-4">Site Not Found</h2>
        <p className="text-gray-600 mb-8">The ancient site you're looking for doesn't exist in our database.</p>
        <Link
          href="/map"
          className="inline-flex items-center bg-teal hover:bg-teal-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Map
        </Link>
      </div>
    </div>
  )
}
