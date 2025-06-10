"use client"

import { useState, useEffect, useCallback } from "react"
import { Star } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import type { InteractiveButtonProps } from "./types"

export function WantToVisitButton({ siteId, className }: InteractiveButtonProps) {
  const { user, supabase } = useAuth()
  const [wantsToVisit, setWantsToVisit] = useState(false)
  const [wantToVisitCount, setWantToVisitCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchInteractionState = useCallback(async () => {
    setLoading(true)
    // Fetch total count
    const { count, error: countError } = await supabase
      .from("user_interactions")
      .select("*", { count: "exact", head: true })
      .eq("site_id", siteId)
      .eq("interaction_type", "want_to_go")

    if (countError) {
      console.error("Error fetching want to go count:", countError)
    } else {
      setWantToVisitCount(count || 0)
    }

    // Fetch user-specific interaction
    if (user) {
      const { data: userData, error: userError } = await supabase
        .from("user_interactions")
        .select("id")
        .eq("site_id", siteId)
        .eq("user_id", user.id)
        .eq("interaction_type", "want_to_go")
        .maybeSingle()

      if (userError) {
        console.error("Error fetching user interaction:", userError)
      } else {
        setWantsToVisit(!!userData)
      }
    } else {
      setWantsToVisit(false)
    }
    setLoading(false)
  }, [supabase, siteId, user])

  useEffect(() => {
    fetchInteractionState()
  }, [fetchInteractionState])

  const toggleWantToVisit = async () => {
    if (!user) {
      toast.info("Please sign in to save sites to your wishlist.")
      return
    }
    if (loading) return

    setLoading(true)

    if (wantsToVisit) {
      const { error } = await supabase
        .from("user_interactions")
        .delete()
        .match({ user_id: user.id, site_id: siteId, interaction_type: "want_to_go" })

      if (error) {
        toast.error("Failed to update wishlist.")
        console.error("Error deleting interaction:", error)
      } else {
        setWantsToVisit(false)
        setWantToVisitCount((prev) => Math.max(0, prev - 1))
        toast.success("Removed from 'Want to Go'.")
      }
    } else {
      const { error } = await supabase
        .from("user_interactions")
        .insert({ user_id: user.id, site_id: siteId, interaction_type: "want_to_go" })

      if (error) {
        toast.error("Failed to update wishlist.")
        console.error("Error inserting interaction:", error)
      } else {
        setWantsToVisit(true)
        setWantToVisitCount((prev) => prev + 1)
        toast.success("Added to 'Want to Go'!")
      }
    }
    setLoading(false)
  }

  return (
    <div
      className={`aspect-square w-10 h-10 rounded-full bg-cream shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-teal ${className || ""}`}
      onClick={toggleWantToVisit}
    >
      <Star
        size={20}
        className={`${
          wantsToVisit ? "text-teal dark:text-teal" : "text-brown"
        } group-hover:text-white transition-colors ${loading ? "opacity-50" : ""}`}
      />
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Want to Go ({wantToVisitCount})
      </div>
    </div>
  )
}
