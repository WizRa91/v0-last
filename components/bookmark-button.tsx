"use client"

import { Bookmark } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"

interface BookmarkButtonProps {
  siteId?: string
}

export const BookmarkButton = ({ siteId }: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // For demo purposes, we'll use localStorage
    handleLocalStorage()
  }, [siteId])

  const handleLocalStorage = () => {
    if (!localStorage.getItem("bookmarkUsers")) {
      localStorage.setItem("bookmarkUsers", JSON.stringify({}))
    }

    if (!localStorage.getItem("uniqueUserId")) {
      localStorage.setItem("uniqueUserId", "user_" + Date.now())
    }
    const userId = localStorage.getItem("uniqueUserId") || ""

    const bookmarkUsers = JSON.parse(localStorage.getItem("bookmarkUsers") || "{}")

    setIsBookmarked(!!bookmarkUsers[`${userId}_${siteId}`])

    const bookmarkTotal = Object.keys(bookmarkUsers)
      .filter((key) => key.endsWith(`_${siteId}`))
      .reduce((sum: number, key: string) => sum + (bookmarkUsers[key] ? 1 : 0), 0)
    setBookmarkCount(Number(bookmarkTotal))
  }

  const toggleBookmark = async () => {
    if (loading) return

    setLoading(true)
    try {
      const userId = localStorage.getItem("uniqueUserId") || ""
      const bookmarkUsers = JSON.parse(localStorage.getItem("bookmarkUsers") || "{}")
      const key = `${userId}_${siteId}`

      bookmarkUsers[key] = !bookmarkUsers[key]
      localStorage.setItem("bookmarkUsers", JSON.stringify(bookmarkUsers))

      setIsBookmarked(bookmarkUsers[key])

      const newCount = Object.keys(bookmarkUsers)
        .filter((k) => k.endsWith(`_${siteId}`))
        .reduce((sum: number, k: string) => sum + (bookmarkUsers[k] ? 1 : 0), 0)
      setBookmarkCount(Number(newCount))

      if (bookmarkUsers[key]) {
        toast.success("Added to bookmarks")
      } else {
        toast.success("Removed from bookmarks")
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
      toast.error("Failed to update bookmark")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="aspect-square w-10 h-10 rounded-full bg-cream shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-teal"
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
