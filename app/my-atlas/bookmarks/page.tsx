import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { sitesData } from "@/components/map/site-data"
import { SiteList } from "@/components/my-atlas/site-list"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function BookmarksPage() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  const { data: interactions, error } = await supabase
    .from("user_interactions")
    .select("site_id")
    .eq("user_id", user.id)
    .eq("interaction_type", "bookmark")

  if (error) {
    console.error("Error fetching bookmarked sites:", error)
    return <div className="p-8">Error loading sites. Please try again later.</div>
  }

  const siteIds = interactions.map((i) => i.site_id)
  const userSites = sitesData.filter((site) => siteIds.includes(site.slug))

  return (
    <div className="min-h-[calc(100vh-4rem)] theme-primary-bg py-8 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <Link href="/my-atlas" className="inline-flex items-center gap-2 theme-nav-link mb-4">
          <ArrowLeft size={16} />
          Back to My Atlas
        </Link>
        <h1 className="text-4xl font-display theme-text mb-6">Your Bookmarked Sites</h1>
        <SiteList sites={userSites} emptyMessage="You haven't bookmarked any sites yet." />
      </div>
    </div>
  )
}
