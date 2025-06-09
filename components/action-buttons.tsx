"use client"

import { useState, useEffect } from "react"
import { Flag, Star } from "lucide-react"
import { toast } from "sonner"

interface ActionButtonsProps {
  siteId?: string
}

export const ActionButtons = ({ siteId }: ActionButtonsProps) => {
  const [beenHereCount, setBeenHereCount] = useState(0)
  const [wantToGoCount, setWantToGoCount] = useState(0)
  const [isBeenHere, setIsBeenHere] = useState(false)
  const [isWantToGo, setIsWantToGo] = useState(false)
  const [loading, setLoading] = useState({ beenHere: false, wantToGo: false })

  useEffect(() => {
    // For demo purposes, we'll use localStorage
    handleLocalStorage()
  }, [siteId])

  const handleLocalStorage = () => {
    if (!localStorage.getItem("beenHereUsers")) {
      localStorage.setItem("beenHereUsers", JSON.stringify({}))
    }
    if (!localStorage.getItem("wantToGoUsers")) {
      localStorage.setItem("wantToGoUsers", JSON.stringify({}))
    }

    if (!localStorage.getItem("uniqueUserId")) {
      localStorage.setItem("uniqueUserId", "user_" + Date.now())
    }
    const userId = localStorage.getItem("uniqueUserId") || ""

    const beenHereUsers = JSON.parse(localStorage.getItem("beenHereUsers") || "{}")
    const wantToGoUsers = JSON.parse(localStorage.getItem("wantToGoUsers") || "{}")

    setIsBeenHere(!!beenHereUsers[`${userId}_${siteId}`])
    setIsWantToGo(!!wantToGoUsers[`${userId}_${siteId}`])

    const beenHereTotal = Object.keys(beenHereUsers)
      .filter((key) => key.endsWith(`_${siteId}`))
      .reduce((sum: number, key: string) => sum + (beenHereUsers[key] ? 1 : 0), 0)
    setBeenHereCount(Number(beenHereTotal))

    const wantToGoTotal = Object.keys(wantToGoUsers)
      .filter((key) => key.endsWith(`_${siteId}`))
      .reduce((sum: number, key: string) => sum + (wantToGoUsers[key] ? 1 : 0), 0)
    setWantToGoCount(Number(wantToGoTotal))
  }

  const toggleBeenHere = async () => {
    if (loading.beenHere) return

    setLoading((prev) => ({ ...prev, beenHere: true }))

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
      setLoading((prev) => ({ ...prev, beenHere: false }))
    }
  }

  const toggleWantToGo = async () => {
    if (loading.wantToGo) return

    setLoading((prev) => ({ ...prev, wantToGo: true }))

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
      setLoading((prev) => ({ ...prev, wantToGo: false }))
    }
  }

  return (
    <div className="flex items-center space-x-3">
      <div
        className="aspect-square w-10 h-10 rounded-full bg-cream shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-teal"
        onClick={toggleBeenHere}
      >
        <Flag
          size={20}
          className={`${
            isBeenHere ? "text-teal dark:text-teal" : "text-brown"
          } group-hover:text-white transition-colors ${loading.beenHere ? "opacity-50" : ""}`}
        />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Been Here ({beenHereCount})
        </div>
      </div>

      <div
        className="aspect-square w-10 h-10 rounded-full bg-cream shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-teal"
        onClick={toggleWantToGo}
      >
        <Star
          size={20}
          className={`${
            isWantToGo ? "text-teal dark:text-teal" : "text-brown"
          } group-hover:text-white transition-colors ${loading.wantToGo ? "opacity-50" : ""}`}
        />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Want to Go ({wantToGoCount})
        </div>
      </div>
    </div>
  )
}
