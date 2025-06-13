"use server"

import { createServerClient } from "@/lib/supabase/server"
import type { Site } from "@/components/map/types"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export async function getSites(): Promise<Site[]> {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data, error } = await supabase.from("sites").select("*").order("name")

  if (error) {
    console.error("Error fetching sites:", error)
    return []
  }

  return data as Site[]
}

export async function getSiteBySlug(slug: string): Promise<Site> {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)
  const { data, error } = await supabase.from("sites").select("*").eq("slug", slug).single()

  if (error || !data) {
    console.error(`Error fetching site with slug ${slug}:`, error)
    notFound()
  }

  return data as Site
}
