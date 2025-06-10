"use client"

import { useState, useEffect, useCallback } from "react"
import { Flag } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import type { InteractiveButtonProps } from "./types"

export function BeenThereButton({ siteId, className }: InteractiveButtonProps) {
  const { user, supabase } = useAuth()
  const [hasBeenThere, setHasBeenThere] = useState(false)
  const [beenThereCount, setBeenThereCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchInteractionState = useCallback(async () => {
    setLoading(true)
    // Fetch total count for the site
    const { count, error: countError } = await supabase
      .from("user_interactions")
      .select("*", { count: "exact", head: true })
      .eq("site_id", siteId)
      .eq("interaction_type", "been_there")

    if (countError) {
      console.error("Error fetching been there count:", countError)
    } else {
      setBeenThereCount(count || 0)
    }

    // Fetch user-specific interaction
    if (user) {
      const { data: userData, error: userError } = await supabase
        .from("user_interactions")
        .select("id")
        .eq("site_id", siteId)
        .eq("user_id", user.id)
        .eq("interaction_type", "been_there")
        .maybeSingle()

      if (userError) {
        console.error("Error fetching user interaction:", userError)
      } else {
        setHasBeenThere(!!userData)
      }
    } else {
      setHasBeenThere(false)
    }
    setLoading(false)
  }, [supabase, siteId, user])

  useEffect(() => {
    fetchInteractionState()
  }, [fetchInteractionState])

  const toggleBeenThere = async () => {
    if (!user) {
      toast.info("Please sign in to mark sites you've been to.")
      return
    }
    if (loading) return

    setLoading(true)

    if (hasBeenThere) {
      // User wants to remove the interaction
      const { error } = await supabase
        .from("user_interactions")
        .delete()
        .match({ user_id: user.id, site_id: siteId, interaction_type: "been_there" })

      if (error) {
        toast.error("Failed to update 'Been There'.")
        console.error("Error deleting interaction:", error)
      } else {
        setHasBeenThere(false)
        setBeenThereCount((prev) => Math.max(0, prev - 1))
        toast.success("Removed from 'Been There'.")
      }
    } else {
      // User wants to add the interaction
      const { error } = await supabase
        .from("user_interactions")
        .insert({ user_id: user.id, site_id: siteId, interaction_type: "been_there" })

      if (error) {
        toast.error("Failed to update 'Been There'.")
        console.error("Error inserting interaction:", error)
      } else {
        setHasBeenThere(true)
        setBeenThereCount((prev) => prev + 1)
        toast.success("Added to 'Been There'!")
      }
    }
    setLoading(false)
  }

  return (
    <div
      className={`aspect-square w-10 h-10 rounded-full bg-cream shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-teal ${className || ""}`}
      onClick={toggleBeenThere}
    >
      <Flag
        size={20}
        className={`${
          hasBeenThere ? "text-teal dark:text-teal" : "text-brown"
        } group-hover:text-white transition-colors ${loading ? "opacity-50" : ""}`}
      />
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Been Here ({beenThereCount})
      </div>
    </div>
  )
}
