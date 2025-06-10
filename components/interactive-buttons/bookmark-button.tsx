"use client"

import { useState, useEffect, useCallback } from "react"
import { Bookmark } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import type { InteractiveButtonProps } from "./types"

export function BookmarkButton({ siteId, className }: InteractiveButtonProps) {
  const { user, supabase } = useAuth()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchInteractionState = useCallback(async () => {
    setLoading(true)
    // Fetch total count
    const { count, error: countError } = await supabase
      .from("user_interactions")
      .select("*", { count: "exact", head: true })
      .eq("site_id", siteId)
      .eq("interaction_type", "bookmark")

    if (countError) {
      console.error("Error fetching bookmark count:", countError)
    } else {
      setBookmarkCount(count || 0)
    }

    // Fetch user-specific interaction
    if (user) {
      const { data: userData, error: userError } = await supabase
        .from("user_interactions")
        .select("id")
        .eq("site_id", siteId)
        .eq("user_id", user.id)
        .eq("interaction_type", "bookmark")
        .maybeSingle()

      if (userError) {
        console.error("Error fetching user bookmark:", userError)
      } else {
        setIsBookmarked(!!userData)
      }
    } else {
      setIsBookmarked(false)
    }
    setLoading(false)
  }, [supabase, siteId, user])

  useEffect(() => {
    fetchInteractionState()
  }, [fetchInteractionState])

  const toggleBookmark = async () => {
    if (!user) {
      toast.info("Please sign in to bookmark sites.")
      return
    }
    if (loading) return

    setLoading(true)

    if (isBookmarked) {
      const { error } = await supabase
        .from("user_interactions")
        .delete()
        .match({ user_id: user.id, site_id: siteId, interaction_type: "bookmark" })

      if (error) {
        toast.error("Failed to update bookmarks.")
        console.error("Error deleting bookmark:", error)
      } else {
        setIsBookmarked(false)
        setBookmarkCount((prev) => Math.max(0, prev - 1))
        toast.success("Removed from bookmarks.")
      }
    } else {
      const { error } = await supabase
        .from("user_interactions")
        .insert({ user_id: user.id, site_id: siteId, interaction_type: "bookmark" })

      if (error) {
        toast.error("Failed to update bookmarks.")
        console.error("Error inserting bookmark:", error)
      } else {
        setIsBookmarked(true)
        setBookmarkCount((prev) => prev + 1)
        toast.success("Added to bookmarks!")
      }
    }
    setLoading(false)
  }

  return (
    <div
      className={`aspect-square w-10 h-10 rounded-full bg-cream shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-[#4A7A7A] ${className || ""}`}
      onClick={toggleBookmark}
    >
      <Bookmark
        size={20}
        className={`${
          isBookmarked ? "text-teal dark:text-teal" : "text-brown"
        } group-hover:text-white transition-colors ${loading ? "opacity-50" : ""}`}
      />
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Bookmark ({bookmarkCount})
      </div>
    </div>
  )
}
