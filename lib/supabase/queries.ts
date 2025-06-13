import type { Site } from "@/components/map/types"
import type { SupabaseClient } from "@supabase/supabase-js"
import { notFound } from "next/navigation"

// Note: No 'use server', no 'cookies()', no client creation. Just pure data logic.

export async function getSites(supabase: SupabaseClient): Promise<Site[]> {
  const { data, error } = await supabase.from("sites").select("*").order("name")

  if (error) {
    console.error("Error fetching sites:", error)
    // In a real app, you might want to throw the error
    // or return a result object like { data: null, error }
    return []
  }

  return data as Site[]
}

export async function getSiteBySlug(supabase: SupabaseClient, slug: string): Promise<Site> {
  const { data, error } = await supabase.from("sites").select("*").eq("slug", slug).single()

  if (error || !data) {
    console.error(`Error fetching site with slug ${slug}:`, error)
    // The notFound() function is a Next.js utility that will render the not-found page.
    notFound()
  }

  return data as Site
}
