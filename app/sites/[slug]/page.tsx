import { getSiteBySlug } from "@/lib/supabase/queries"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
// ... other imports

// ...

export default async function SitePage({ params }: { params: { slug: string } }) {
  const cookieStore = cookies()
  const supabase = createSupabaseServerClient(cookieStore)
  const site = await getSiteBySlug(supabase, params.slug)

  // ... rest of the component
}
