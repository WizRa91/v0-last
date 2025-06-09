"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { toast } from "sonner"
import type { InteractiveButtonProps } from "./types"

export function WantToVisitButton({ siteId, className }: InteractiveButtonProps) {
  const [isWantToGo, setIsWantToGo] = useState(false)
  const [wantToGoCount, setWantToGoCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // For demo purposes, we'll use localStorage
    handleLocalStorage()
  }, [siteId])

  const handleLocalStorage = () => {
    if (!localStorage.getItem("wantToGoUsers")) {
      localStorage.setItem("wantToGoUsers", JSON.stringify({}))
    }

    if (!localStorage.getItem("uniqueUserId")) {
      localStorage.setItem("uniqueUserId", "user_" + Date.now())
    }
    const userId = localStorage.getItem("uniqueUserId") || ""

    const wantToGoUsers = JSON.parse(localStorage.getItem("wantToGoUsers") || "{}")

    setIsWantToGo(!!wantToGoUsers[`${userId}_${siteId}`])

    const wantToGoTotal = Object.keys(wantToGoUsers)
      .filter((key) => key.endsWith(`_${siteId}`))
      .reduce((sum: number, key: string) => sum + (wantToGoUsers[key] ? 1 : 0), 0)
    setWantToGoCount(Number(wantToGoTotal))
  }

  const toggleWantToGo = async () => {
    if (loading) return

    setLoading(true)
    try {
      const userId = localStorage.getItem("uniqueUserId") || ""
      const wantToGoUsers = JSON.parse(localStorage.getItem("wantToGoUsers") || "{}")
      const key = `${userId}_${siteId}`

      wantToGoUsers[key] = !wantToGoUsers[key]
      localStorage.setItem("wantToGoUsers", JSON.stringify(wantToGoUsers))

      setIsWantToGo(wantToGoUsers[key])

      const newCount = Object.keys(wantToGoUsers)
        .filter((k) => k.endsWith(`_${siteId}`))
        .reduce((sum: number, k: string) => sum + (wantToGoUsers[k] ? 1 : 0), 0)
      setWantToGoCount(Number(newCount))

      if (wantToGoUsers[key]) {
        toast.success("Added to Want to Go")
      } else {
        toast.success("Removed from Want to Go")
      }
    } catch (error) {
      console.error("Error toggling want to go:", error)
      toast.error("Failed to update want to go")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`aspect-square w-10 h-10 rounded-full bg-cream shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-teal ${className || ""}`}
      onClick={toggleWantToGo}
    >
      <Star
        size={20}
        className={`${
          isWantToGo ? "text-teal dark:text-teal" : "text-brown"
        } group-hover:text-white transition-colors ${loading ? "opacity-50" : ""}`}
      />
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Want to Go ({wantToGoCount})
      </div>
    </div>
  )
}
