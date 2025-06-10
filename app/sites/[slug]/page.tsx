"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { ArrowLeft, Layers } from "lucide-react"
import { ImageCarousel } from "@/components/image-carousel"
import { ImageModal } from "@/components/image-modal"
import { LocationSidebar } from "@/components/location-sidebar"
import { MapModal } from "@/components/map-modal"
import { SocialShareButtons } from "@/components/social-share-buttons"
import { TagSection } from "@/components/tag-section"
import { QuizWidget } from "@/components/quiz-widget"
import { Footer } from "@/components/footer"
import { ActionButtonsSimple } from "@/components/action-buttons-simple"
import { QuizModal } from "@/components/quiz-modal"
import { SiteTaxonomy } from "@/components/site-taxonomy"
import type { Site } from "@/components/map/types"
import { Button } from "@/components/ui/button"
import { sitesData as allSites } from "@/components/map/integrated-map"

const findSiteBySlug = (slug: string): Site | undefined => {
  const site = allSites.find((s) => s.slug === slug)
  if (site) return site
  const parts = slug.split("-")
  if (parts.length > 1) {
    const baseSlug = parts.slice(0, -1).join("-")
    const addonPart = parts[parts.length - 1]
    const baseSite = allSites.find((s) => s.slug === baseSlug)
    if (baseSite) {
      return {
        ...baseSite,
        slug: slug,
        name: `${baseSite.name} - ${addonPart.charAt(0).toUpperCase() + addonPart.slice(1)}`,
        baseSiteSlug: baseSlug,
        addonName: addonPart.charAt(0).toUpperCase() + addonPart.slice(1),
      }
    }
  }
  return undefined
}

export default function SitePage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [site, setSite] = useState<Site | null | undefined>(undefined)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [mapModalOpen, setMapModalOpen] = useState(false)
  const [quizModalOpen, setQuizModalOpen] = useState(false)

  useEffect(() => {
    if (params.slug) {
      const foundSite = findSiteBySlug(params.slug)
      setSite(foundSite || null)
    }
  }, [params.slug])

  if (site === undefined) {
    return (
      <div className="loading-container bg-cream-light dark:bg-dark-primary-bg min-h-screen flex items-center justify-center">
        <div className="loading-content text-center py-20">
          <div className="w-16 h-16 border-4 border-t-teal dark:border-t-dark-hover-teal border-gray-200 dark:border-dark-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brown dark:text-dark-text-primary font-medium">Loading site data...</p>
        </div>
      </div>
    )
  }

  if (!site) {
    return (
      <div className="loading-container bg-cream-light dark:bg-dark-primary-bg min-h-screen flex flex-col items-center justify-center">
        <div className="loading-content text-center p-8">
          <h1 className="text-6xl font-bold text-brown dark:text-dark-text-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold text-brown dark:text-dark-text-primary mb-4">Site Not Found</h2>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-8">
            The ancient site you're looking for doesn't exist in our database.
          </p>
          <Link
            href="/map"
            className="inline-flex items-center bg-teal hover:bg-teal-dark dark:bg-dark-accent dark:hover:bg-dark-hover-teal text-white dark:text-dark-text-primary px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Map
          </Link>
        </div>
      </div>
    )
  }

  const handleImageClick = (index: number) => {
    setCurrentMediaIndex(index)
    setModalOpen(true)
  }
  const handlePrev = () => setCurrentMediaIndex((prev) => (prev === 0 ? site.media.length - 1 : prev - 1))
  const handleNext = () => setCurrentMediaIndex((prev) => (prev === site.media.length - 1 ? 0 : prev + 1))
  const handleThumbnailClick = (index: number) => setCurrentMediaIndex(index)
  const handleMapClick = () => {
    if (site.location?.coordinates) setMapModalOpen(true)
  }
  const handleTagClick = (tag: string) => router.push(`/map?tag=${encodeURIComponent(tag)}`)
  const openQuizModal = () => setQuizModalOpen(true)
  const closeQuizModal = () => setQuizModalOpen(false)
  const pageUrl = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="blog-post-container bg-cream-light dark:bg-dark-primary-bg text-brown dark:text-dark-text-primary">
      <div className="blog-post-content">
        <Link href="/map" className="back-button">
          {" "}
          {/* Assuming .back-button handles its own dark styles or is fine */}
          <ArrowLeft className="w-4 h-4" />
          Back to Map
        </Link>

        <SiteTaxonomy
          siteName={
            site.baseSiteSlug ? allSites.find((s) => s.slug === site.baseSiteSlug)?.name || site.name : site.name
          }
          country={site.country}
          primaryCategory={site.primaryCategory}
          specificLocation={site.specificLocation}
          addonName={site.addonName}
        />

        <div className="action-buttons-row my-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="action-button-group">
            <SocialShareButtons url={pageUrl} title={`Explore ${site.name} - Archaic Knowledge`} />
          </div>
          <div className="action-button-group">
            <ActionButtonsSimple siteId={site.slug} siteName={site.name} onOpenQuizModal={openQuizModal} />
          </div>
        </div>

        <div className="carousel-container my-8 rounded-xl overflow-hidden shadow-xl">
          <ImageCarousel images={site.media} onImageClick={handleImageClick} />
        </div>

        <div className="content-layout grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="main-content lg:col-span-2 space-y-8">
            <div className="about-section prose dark:prose-invert max-w-none dark:text-dark-text-secondary">
              <h2 className="text-brown dark:text-dark-text-primary">About {site.name}</h2>
              <div dangerouslySetInnerHTML={{ __html: site.fullDescription.replace(/\n/g, "<br />") }} />
            </div>
            <QuizWidget siteName={site.name} siteId={site.slug} />
            <TagSection tags={site.tags} onTagClick={handleTagClick} />
          </div>

          <div className="sidebar-content lg:col-span-1 space-y-6">
            {site.location && (
              <div className="location-sidebar-wrapper rounded-lg overflow-hidden shadow-lg">
                <LocationSidebar location={site.location} onMapClick={handleMapClick} />
              </div>
            )}

            <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-dark-secondary-bg">
              <h3 className="text-xl font-bold text-brown dark:text-dark-text-primary mb-3 font-['Cinzel'] flex items-center">
                <Layers size={20} className="mr-2 text-teal dark:text-dark-hover-teal" />
                Site Category
              </h3>
              <p className="text-lg font-semibold text-teal dark:text-dark-hover-teal mb-1">{site.primaryCategory}</p>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
                This site is primarily classified under {site.primaryCategory}. Explore more sites in this category or
                browse all classifications.
              </p>
              <Button
                onClick={() =>
                  router.push(
                    `/map?category=${encodeURIComponent(site.primaryCategory.toLowerCase().replace(/\s+/g, "_"))}`,
                  )
                }
                className="w-full mb-2 bg-teal hover:bg-teal-dark dark:bg-dark-accent dark:hover:bg-dark-hover-teal text-white dark:text-dark-text-primary"
              >
                Explore {site.primaryCategory}
              </Button>
              <Button
                onClick={() => router.push("/map?show_categories=true")}
                variant="outline"
                className="w-full text-teal border-teal hover:bg-teal hover:text-white dark:text-dark-accent dark:border-dark-accent dark:hover:bg-dark-hover-teal dark:hover:text-dark-text-primary"
              >
                View All Categories
              </Button>
            </div>

            <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-dark-secondary-bg mt-6">
              <h3 className="text-xl font-bold text-brown dark:text-dark-text-primary mb-4 font-['Cinzel']">
                Site Information
              </h3>
              <div className="space-y-4 text-sm text-gray-700 dark:text-dark-text-secondary">
                <div>
                  <p className="font-medium text-brown dark:text-dark-text-primary">Location</p>
                  <p>
                    {site.specificLocation}, {site.country}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-brown dark:text-dark-text-primary">Time Period</p>
                  <p>{site.period}</p>
                </div>
                <div>
                  <p className="font-medium text-brown dark:text-dark-text-primary">Type</p>
                  <p>{site.type}</p>
                </div>
                {site.unesco && (
                  <div className="bg-teal-light/20 dark:bg-dark-hover-teal/20 p-3 rounded-lg">
                    <p className="font-medium text-teal-dark dark:text-dark-hover-teal">UNESCO World Heritage Site</p>
                  </div>
                )}
                <div className="pt-2 border-t border-cream-dark dark:border-dark-border">
                  {site.visitors && (
                    <p>
                      <strong>Annual Visitors:</strong> {site.visitors}
                    </p>
                  )}
                  <p>
                    <strong>Coordinates:</strong> {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16"></div>
      </div>
      <Footer />
      {modalOpen && site.media && (
        <ImageModal
          images={site.media}
          currentIndex={currentMediaIndex}
          onClose={() => setModalOpen(false)}
          onPrev={handlePrev}
          onNext={handleNext}
          onThumbnailClick={handleThumbnailClick}
        />
      )}
      {mapModalOpen && site.location?.coordinates && (
        <MapModal coordinates={site.location.coordinates} onClose={() => setMapModalOpen(false)} />
      )}
      {quizModalOpen && (
        <QuizModal isOpen={quizModalOpen} onClose={closeQuizModal} siteId={site.slug} siteName={site.name} />
      )}
    </div>
  )
}
