import { Suspense } from "react"
import { Footer } from "@/components/footer"
import MapClientWrapper from "./map-client-wrapper"
import { getSites } from "@/lib/supabase/queries"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export default async function MapPage() {
  // 1. Get the cookie store directly in the Server Component.
  const cookieStore = cookies()

  // 2. Create the Supabase client here, where context is guaranteed.
  const supabase = createSupabaseServerClient(cookieStore)

  // 3. Pass the initialized client to the data fetching function.
  const sites = await getSites(supabase)

  return (
    <div className="map-page-wrapper">
      <div className="map-viewport-section">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen bg-[#EDE4D3] dark:bg-[#1E1E1E]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-[#4A7A7A] rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-[#8C6F5A] dark:text-[#D9D9D9] font-medium">Loading map interface...</p>
              </div>
            </div>
          }
        >
          <MapClientWrapper sites={sites} />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
