import { getSiteBySlug } from "@/lib/supabase/queries"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import ImageCarousel from "@/components/image-carousel"
import SiteTaxonomy from "@/components/site-taxonomy"
import ActionButtonsSimple from "@/components/action-buttons-simple"
import SocialShareButtons from "@/components/social-share-buttons"
import TagSection from "@/components/tag-section"
import { Separator } from "@/components/ui/separator"
import type { Metadata } from "next"

interface SitePageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: SitePageProps): Promise<Metadata> {
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  try {
    const site = await getSiteBySlug(supabase, params.slug)

    if (!site) {
      return {
        title: "Site Not Found",
        description: "The requested site could not be found.",
      }
    }

    return {
      title: `${site.name} | Archaic Knowledge`,
      description:
        site.blurb || site.description || `Explore ${site.name}, an ancient site of historical significance.`,
      openGraph: {
        title: site.name,
        description: site.blurb || site.description || `Explore ${site.name}`,
        images: site.cover_image ? [{ url: site.cover_image }] : [],
      },
    }
  } catch (error) {
    return {
      title: "Site Not Found",
      description: "The requested site could not be found.",
    }
  }
}

export default async function SitePage({ params }: SitePageProps) {
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  try {
    const site = await getSiteBySlug(supabase, params.slug)

    if (!site) {
      notFound()
    }

    // Prepare media array for carousel
    const mediaArray = []
    if (site.cover_image) {
      mediaArray.push({
        type: "image" as const,
        url: site.cover_image,
        alt: `${site.name} - Main Image`,
        caption: site.name,
      })
    }
    if (site.media && Array.isArray(site.media)) {
      site.media.forEach((mediaItem, index) => {
        if (typeof mediaItem === "string") {
          mediaArray.push({
            type: "image" as const,
            url: mediaItem,
            alt: `${site.name} - Image ${index + 2}`,
            caption: `${site.name} - View ${index + 2}`,
          })
        } else if (mediaItem && typeof mediaItem === "object" && "url" in mediaItem) {
          mediaArray.push({
            type: "image" as const,
            url: mediaItem.url,
            alt: mediaItem.alt || `${site.name} - Image ${index + 2}`,
            caption: mediaItem.caption || `${site.name} - View ${index + 2}`,
          })
        }
      })
    }

    return (
      <div className="min-h-screen bg-cream dark:bg-dark-primary-bg">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Site Header */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold font-['Cinzel'] text-brown dark:text-dark-text-primary">
                  {site.name}
                </h1>

                {site.location && (
                  <p className="text-lg text-brown/80 dark:text-dark-text-secondary font-['Montserrat']">
                    📍 {site.location}
                    {site.country && `, ${site.country}`}
                  </p>
                )}
              </div>

              {/* Image Carousel */}
              {mediaArray.length > 0 && (
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <ImageCarousel images={mediaArray} />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <SocialShareButtons
                  url={`${process.env.NEXT_PUBLIC_APP_URL || ""}/sites/${site.slug}`}
                  title={site.name}
                />
                <ActionButtonsSimple siteId={site.id} siteName={site.name} siteSlug={site.slug} />
              </div>

              {/* Main Description */}
              {(site.description || site.blurb) && (
                <div className="bg-white dark:bg-dark-secondary-bg rounded-lg p-6 shadow-sm border border-[#CDAF87]/20 dark:border-dark-border">
                  <h2 className="text-2xl font-bold font-['Cinzel'] mb-4 text-brown dark:text-dark-text-primary">
                    About {site.name}
                  </h2>
                  <div className="prose prose-lg max-w-none text-brown dark:text-dark-text-primary">
                    {site.description ? (
                      <div dangerouslySetInnerHTML={{ __html: site.description }} />
                    ) : (
                      <p className="text-lg leading-relaxed">{site.blurb}</p>
                    )}
                  </div>
                </div>
              )}

              {/* History Section */}
              {site.history && (
                <div className="bg-white dark:bg-dark-secondary-bg rounded-lg p-6 shadow-sm border border-[#CDAF87]/20 dark:border-dark-border">
                  <h2 className="text-2xl font-bold font-['Cinzel'] mb-4 text-brown dark:text-dark-text-primary">
                    Historical Background
                  </h2>
                  <div
                    className="prose prose-lg max-w-none text-brown dark:text-dark-text-primary"
                    dangerouslySetInnerHTML={{ __html: site.history }}
                  />
                </div>
              )}

              {/* Significance Section */}
              {site.significance && (
                <div className="bg-white dark:bg-dark-secondary-bg rounded-lg p-6 shadow-sm border border-[#CDAF87]/20 dark:border-dark-border">
                  <h2 className="text-2xl font-bold font-['Cinzel'] mb-4 text-brown dark:text-dark-text-primary">
                    Cultural Significance
                  </h2>
                  <div
                    className="prose prose-lg max-w-none text-brown dark:text-dark-text-primary"
                    dangerouslySetInnerHTML={{ __html: site.significance }}
                  />
                </div>
              )}

              {/* Additional Information */}
              {(site.discovery_date || site.excavation_info || site.current_status) && (
                <div className="bg-white dark:bg-dark-secondary-bg rounded-lg p-6 shadow-sm border border-[#CDAF87]/20 dark:border-dark-border">
                  <h2 className="text-2xl font-bold font-['Cinzel'] mb-4 text-brown dark:text-dark-text-primary">
                    Archaeological Information
                  </h2>
                  <div className="space-y-4 text-brown dark:text-dark-text-primary">
                    {site.discovery_date && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Discovery Date</h3>
                        <p>{site.discovery_date}</p>
                      </div>
                    )}
                    {site.excavation_info && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Excavation Information</h3>
                        <div dangerouslySetInnerHTML={{ __html: site.excavation_info }} />
                      </div>
                    )}
                    {site.current_status && (
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Current Status</h3>
                        <p>{site.current_status}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Site Information Card */}
                <div className="bg-[#CDAF87]/20 dark:bg-[#3A3A3A]/20 rounded-lg p-6 border border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                  <h3 className="text-xl font-bold mb-4 font-['Cinzel'] text-brown dark:text-dark-text-primary">
                    Site Details
                  </h3>
                  <Separator className="mb-4 bg-[#CDAF87]/30 dark:bg-[#3A3A3A]" />

                  <div className="space-y-3 text-brown dark:text-dark-text-primary">
                    {site.type && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Type:</span>
                        <span>{site.type}</span>
                      </div>
                    )}
                    {site.period && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Period:</span>
                        <span>{site.period}</span>
                      </div>
                    )}
                    {site.date_range && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Date Range:</span>
                        <span>{site.date_range}</span>
                      </div>
                    )}
                    {site.unesco_status && (
                      <div className="flex justify-between">
                        <span className="font-semibold">UNESCO Status:</span>
                        <span className="text-sm">{site.unesco_status}</span>
                      </div>
                    )}
                    {site.rating && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Rating:</span>
                        <span>⭐ {site.rating}/5</span>
                      </div>
                    )}
                    {site.latitude && site.longitude && (
                      <div className="flex justify-between">
                        <span className="font-semibold">Coordinates:</span>
                        <span className="text-sm">
                          {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Categories */}
                {site.categories && site.categories.length > 0 && (
                  <div className="bg-[#CDAF87]/20 dark:bg-[#3A3A3A]/20 rounded-lg p-6 border border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                    <h3 className="text-xl font-bold mb-4 font-['Cinzel'] text-brown dark:text-dark-text-primary">
                      Categories
                    </h3>
                    <Separator className="mb-4 bg-[#CDAF87]/30 dark:bg-[#3A3A3A]" />
                    <SiteTaxonomy categories={site.categories} />
                  </div>
                )}

                {/* Tags */}
                {site.tags && site.tags.length > 0 && (
                  <div className="bg-[#CDAF87]/20 dark:bg-[#3A3A3A]/20 rounded-lg p-6 border border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                    <h3 className="text-xl font-bold mb-4 font-['Cinzel'] text-brown dark:text-dark-text-primary">
                      Tags
                    </h3>
                    <Separator className="mb-4 bg-[#CDAF87]/30 dark:bg-[#3A3A3A]" />
                    <TagSection tags={site.tags} />
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-[#CDAF87]/20 dark:bg-[#3A3A3A]/20 rounded-lg p-6 border border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                  <h3 className="text-xl font-bold mb-4 font-['Cinzel'] text-brown dark:text-dark-text-primary">
                    Quick Actions
                  </h3>
                  <Separator className="mb-4 bg-[#CDAF87]/30 dark:bg-[#3A3A3A]" />
                  <div className="space-y-3">
                    <ActionButtonsSimple siteId={site.id} siteName={site.name} siteSlug={site.slug} variant="sidebar" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Map Button */}
          <div className="mt-12 text-center">
            <a
              href="/map"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal-dark text-white rounded-lg font-['Montserrat'] font-medium transition-colors"
            >
              ← Back to Interactive Map
            </a>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading site:", error)
    notFound()
  }
}
