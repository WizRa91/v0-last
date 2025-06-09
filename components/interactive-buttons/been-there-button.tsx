"use client"

import { useState, useEffect } from "react"
import { Flag } from "lucide-react"
import { toast } from "sonner"
import type { InteractiveButtonProps } from "./types"

export function BeenThereButton({ siteId, className }: InteractiveButtonProps) {
  const [isBeenHere, setIsBeenHere] = useState(false)
  const [beenHereCount, setBeenHereCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // For demo purposes, we'll use localStorage
    handleLocalStorage()
  }, [siteId])

  const handleLocalStorage = () => {
    if (!localStorage.getItem("beenHereUsers")) {
      localStorage.setItem("beenHereUsers", JSON.stringify({}))
    }

    if (!localStorage.getItem("uniqueUserId")) {
      localStorage.setItem("uniqueUserId", "user_" + Date.now())
    }
    const userId = localStorage.getItem("uniqueUserId") || ""

    const beenHereUsers = JSON.parse(localStorage.getItem("beenHereUsers") || "{}")

    setIsBeenHere(!!beenHereUsers[`${userId}_${siteId}`])

    const beenHereTotal = Object.keys(beenHereUsers)
      .filter((key) => key.endsWith(`_${siteId}`))
      .reduce((sum: number, key: string) => sum + (beenHereUsers[key] ? 1 : 0), 0)
    setBeenHereCount(Number(beenHereTotal))
  }

  const toggleBeenHere = async () => {
    if (loading) return

    setLoading(true)
    try {
      const userId = localStorage.getItem("uniqueUserId") || ""
      const beenHereUsers = JSON.parse(localStorage.getItem("beenHereUsers") || "{}")
      const key = `${userId}_${siteId}`

      beenHereUsers[key] = !beenHereUsers[key]
      localStorage.setItem("beenHereUsers", JSON.stringify(beenHereUsers))

      setIsBeenHere(beenHereUsers[key])

      const newCount = Object.keys(beenHereUsers)
        .filter((k) => k.endsWith(`_${siteId}`))
        .reduce((sum: number, k: string) => sum + (beenHereUsers[k] ? 1 : 0), 0)
      setBeenHereCount(Number(newCount))

      if (beenHereUsers[key]) {
        toast.success("Added to Been Here")
      } else {
        toast.success("Removed from Been Here")
      }
    } catch (error) {
      console.error("Error toggling been here:", error)
      toast.error("Failed to update been here")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`aspect-square w-10 h-10 rounded-full bg-cream shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-teal ${className || ""}`}
      onClick={toggleBeenHere}
    >
      <Flag
        size={20}
        className={`${
          isBeenHere ? "text-teal dark:text-teal" : "text-brown"
        } group-hover:text-white transition-colors ${loading ? "opacity-50" : ""}`}
      />
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Been Here ({beenHereCount})
      </div>
    </div>
  )
}
