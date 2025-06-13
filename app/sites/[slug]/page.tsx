import { notFound } from "next/navigation"
import { getSiteBySlug, getSites } from "@/lib/supabase/queries"
import ImageCarousel from "@/components/image-carousel"
import LocationSidebar from "@/components/location-sidebar"
import TagSection from "@/components/tag-section"
import ActionButtonsSimple from "@/components/action-buttons-simple"
import SocialShareButtons from "@/components/social-share-buttons"
import { Shell } from "@/components/shell"
import { ProfileHeader } from "@/components/profile-header"
import { QuizWidget } from "@/components/quiz-widget"
import { siteQuizzes } from "@/data/site-quizzes"
import { siteRebuses } from "@/data/site-rebuses"
import RebusModal from "@/components/rebus-modal"

export async function generateStaticParams() {
  const sites = await getSites()
  return sites.map((site) => ({
    slug: site.slug,
  }))
}

export default async function SitePage({ params }: { params: { slug: string } }) {
  const site = await getSiteBySlug(params.slug)
  const quizData = siteQuizzes[params.slug]
  const rebusData = siteRebuses[params.slug]

  if (!site) {
    notFound()
  }

  return (
    <Shell>
      <ProfileHeader title={site.name} subtitle={`${site.type} • ${site.period}`} backgroundImage={site.cover_image} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-8 py-8">
        <div className="lg:col-span-2">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead">{site.blurb}</p>
            <p>{site.fullDescription}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <ImageCarousel media={site.media || []} />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Tags</h2>
            <TagSection tags={site.tags || []} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <ActionButtonsSimple siteId={site.slug} />
            <SocialShareButtons url={`${process.env.NEXT_PUBLIC_APP_URL}/sites/${site.slug}`} title={site.name} />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          {site.location && <LocationSidebar location={site.location} />}
          {quizData && <QuizWidget siteSlug={params.slug} quizData={quizData} />}
          {rebusData && (
            <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-2">Visual Puzzle</h3>
              <RebusModal rebus={rebusData} />
            </div>
          )}
        </div>
      </div>
    </Shell>
  )
}
