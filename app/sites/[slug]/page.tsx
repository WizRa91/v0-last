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

export default async function SitePage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)

  try {
    const site = await getSiteBySlug(supabase, params.slug)

    if (!site) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold font-['Cinzel'] mb-4">{site.name}</h1>

            {site.media && site.media.length > 0 && (
              <div className="mb-8">
                <ImageCarousel images={site.media} />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              <SocialShareButtons url={`/sites/${site.slug}`} title={site.name} />
              <ActionButtonsSimple siteId={site.id} siteName={site.name} siteSlug={site.slug} />
            </div>

            <div className="prose max-w-none mb-8">
              {site.description ? (
                <div dangerouslySetInnerHTML={{ __html: site.description }} />
              ) : site.blurb ? (
                <p className="text-lg">{site.blurb}</p>
              ) : (
                <p className="text-lg italic">No description available for this site.</p>
              )}
            </div>

            {site.history && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-['Cinzel'] mb-4">History</h2>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: site.history }} />
              </div>
            )}

            {site.significance && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-['Cinzel'] mb-4">Significance</h2>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: site.significance }} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Site Info Card */}
              <div className="rounded-lg overflow-hidden mb-6 bg-[#CDAF87]/20 dark:bg-[#3A3A3A]/20 border border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 font-['Cinzel']">Site Information</h3>
                  <Separator className="mb-4 bg-[#CDAF87]/30 dark:bg-[#3A3A3A]" />

                  <div className="space-y-2">
                    {site.location && (
                      <div>
                        <span className="font-semibold">Location:</span> {site.location}
                      </div>
                    )}
                    {site.country && (
                      <div>
                        <span className="font-semibold">Country:</span> {site.country}
                      </div>
                    )}
                    {site.period && (
                      <div>
                        <span className="font-semibold">Period:</span> {site.period}
                      </div>
                    )}
                    {site.date_range && (
                      <div>
                        <span className="font-semibold">Date Range:</span> {site.date_range}
                      </div>
                    )}
                    {site.type && (
                      <div>
                        <span className="font-semibold">Type:</span> {site.type}
                      </div>
                    )}
                    {site.unesco_status && (
                      <div>
                        <span className="font-semibold">UNESCO Status:</span> {site.unesco_status}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Categories */}
              {site.categories && site.categories.length > 0 && (
                <div className="rounded-lg overflow-hidden mb-6 bg-[#CDAF87]/20 dark:bg-[#3A3A3A]/20 border border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 font-['Cinzel']">Categories</h3>
                    <Separator className="mb-4 bg-[#CDAF87]/30 dark:bg-[#3A3A3A]" />
                    <SiteTaxonomy categories={site.categories} />
                  </div>
                </div>
              )}

              {/* Tags */}
              {site.tags && site.tags.length > 0 && (
                <div className="rounded-lg overflow-hidden mb-6 bg-[#CDAF87]/20 dark:bg-[#3A3A3A]/20 border border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 font-['Cinzel']">Tags</h3>
                    <Separator className="mb-4 bg-[#CDAF87]/30 dark:bg-[#3A3A3A]" />
                    <TagSection tags={site.tags} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in SitePage:", error)
    notFound()
  }
}
