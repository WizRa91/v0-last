"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Flag, Star, Bookmark, BookText } from "lucide-react"
import { toast } from "sonner"
import { QuizModal } from "./quiz-modal"
import { NotesButton } from "./interactive-buttons/notes-button"
import { RebusButton } from "./interactive-buttons/rebus-button"
import { RebusModal } from "./rebus-modal"
import { getRebusForSite } from "@/data/site-rebuses"

interface ActionButtonsSimpleProps {
  siteId: string
  siteName?: string
  onOpenQuizModal?: () => void
}

export const ActionButtonsSimple = ({ siteId, siteName, onOpenQuizModal }: ActionButtonsSimpleProps) => {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)
  const [isRebusModalOpen, setIsRebusModalOpen] = useState(false)
  const [quizCount, setQuizCount] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(0)
  const [isBeenHere, setIsBeenHere] = useState(false)
  const [beenHereCount, setBeenHereCount] = useState(0)
  const [isWantToGo, setIsWantToGo] = useState(false)
  const [wantToGoCount, setWantToGoCount] = useState(0)
  const [loading, setLoading] = useState({ bookmark: false, beenHere: false, wantToGo: false })

  const rebusForSite = getRebusForSite(siteId)

  useEffect(() => {
    handleLocalStorage()
  }, [siteId])

  const handleLocalStorage = () => {
    if (!localStorage.getItem("bookmarkUsers")) localStorage.setItem("bookmarkUsers", JSON.stringify({}))
    if (!localStorage.getItem("beenHereUsers")) localStorage.setItem("beenHereUsers", JSON.stringify({}))
    if (!localStorage.getItem("wantToGoUsers")) localStorage.setItem("wantToGoUsers", JSON.stringify({}))
    if (!localStorage.getItem("uniqueUserId")) localStorage.setItem("uniqueUserId", "user_" + Date.now())
    const userId = localStorage.getItem("uniqueUserId") || ""
    const bookmarkUsers = JSON.parse(localStorage.getItem("bookmarkUsers") || "{}")
    setIsBookmarked(!!bookmarkUsers[`${userId}_${siteId}`])
    setBookmarkCount(
      Number(
        Object.keys(bookmarkUsers)
          .filter((k) => k.endsWith(`_${siteId}`))
          .reduce((s, k) => s + (bookmarkUsers[k] ? 1 : 0), 0),
      ),
    )
    const beenHereUsers = JSON.parse(localStorage.getItem("beenHereUsers") || "{}")
    setIsBeenHere(!!beenHereUsers[`${userId}_${siteId}`])
    setBeenHereCount(
      Number(
        Object.keys(beenHereUsers)
          .filter((k) => k.endsWith(`_${siteId}`))
          .reduce((s, k) => s + (beenHereUsers[k] ? 1 : 0), 0),
      ),
    )
    const wantToGoUsers = JSON.parse(localStorage.getItem("wantToGoUsers") || "{}")
    setIsWantToGo(!!wantToGoUsers[`${userId}_${siteId}`])
    setWantToGoCount(
      Number(
        Object.keys(wantToGoUsers)
          .filter((k) => k.endsWith(`_${siteId}`))
          .reduce((s, k) => s + (wantToGoUsers[k] ? 1 : 0), 0),
      ),
    )
  }

  const openQuizModal = () => {
    if (onOpenQuizModal) onOpenQuizModal()
    else {
      setIsQuizModalOpen(true)
      toast.success("Opening quiz...")
    }
  }
  const closeQuizModal = () => {
    setIsQuizModalOpen(false)
    setQuizCount((p) => p + 1)
  }

  const openRebusModal = () => setIsRebusModalOpen(true)
  const closeRebusModal = () => setIsRebusModalOpen(false)

  const createToggleHandler =
    (
      type: "bookmark" | "beenHere" | "wantToGo",
      localStorageKey: string,
      setIsState: React.Dispatch<React.SetStateAction<boolean>>,
      setCountState: React.Dispatch<React.SetStateAction<number>>,
      toastMessage: string,
    ) =>
    async () => {
      if (loading[type]) return
      setLoading((prev) => ({ ...prev, [type]: true }))
      try {
        const userId = localStorage.getItem("uniqueUserId") || ""
        const usersData = JSON.parse(localStorage.getItem(localStorageKey) || "{}")
        const key = `${userId}_${siteId}`
        usersData[key] = !usersData[key]
        localStorage.setItem(localStorageKey, JSON.stringify(usersData))
        setIsState(usersData[key])
        const newCount = Object.keys(usersData)
          .filter((k) => k.endsWith(`_${siteId}`))
          .reduce((s, k) => s + (usersData[k] ? 1 : 0), 0)
        setCountState(Number(newCount))
        toast.success(usersData[key] ? `Added to ${toastMessage}` : `Removed from ${toastMessage}`)
      } catch (error) {
        console.error(`Error toggling ${type}:`, error)
        toast.error(`Failed to update ${type}`)
      } finally {
        setLoading((prev) => ({ ...prev, [type]: false }))
      }
    }

  const toggleBookmark = createToggleHandler(
    "bookmark",
    "bookmarkUsers",
    setIsBookmarked,
    setBookmarkCount,
    "bookmarks",
  )
  const toggleBeenHere = createToggleHandler("beenHere", "beenHereUsers", setIsBeenHere, setBeenHereCount, "Been Here")
  const toggleWantToGo = createToggleHandler("wantToGo", "wantToGoUsers", setIsWantToGo, setWantToGoCount, "Want to Go")

  const buttonBaseClass =
    "aspect-square w-10 h-10 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group"
  const lightBg = "bg-cream"
  const darkBg = "dark:bg-dark-accent"
  const lightHoverBg = "hover:bg-[#4A7A7A]"
  const darkHoverBg = "dark:hover:bg-[#4A7A7A]"
  const iconLightText = "text-brown"
  const iconDarkText = "dark:text-dark-text-secondary"
  const iconHoverText = "group-hover:text-white dark:group-hover:text-dark-text-primary"
  const tooltipBg = "bg-black dark:bg-dark-secondary-bg"
  const tooltipText = "text-white dark:text-dark-text-primary"

  const buttons = [
    {
      id: "quiz",
      Icon: BookText,
      action: openQuizModal,
      count: quizCount,
      label: "Quiz",
      active: false,
      loadingState: false,
    },
    rebusForSite && {
      id: "rebus",
      isComponent: true,
      Component: RebusButton,
      props: { onClick: openRebusModal },
    },
    { id: "notes", isComponent: true, Component: NotesButton, props: { siteSlug: siteId } },
    {
      id: "bookmark",
      Icon: Bookmark,
      action: toggleBookmark,
      count: bookmarkCount,
      label: "Bookmark",
      active: isBookmarked,
      loadingState: loading.bookmark,
    },
    {
      id: "beenHere",
      Icon: Flag,
      action: toggleBeenHere,
      count: beenHereCount,
      label: "Been Here",
      active: isBeenHere,
      loadingState: loading.beenHere,
    },
    {
      id: "wantToGo",
      Icon: Star,
      action: toggleWantToGo,
      count: wantToGoCount,
      label: "Want to Go",
      active: isWantToGo,
      loadingState: loading.wantToGo,
    },
  ].filter(Boolean) // Filter out the rebus button if it's null

  return (
    <>
      <div className="flex items-center space-x-3">
        {buttons.map((btn) =>
          btn.isComponent && btn.Component ? (
            <btn.Component key={btn.id} {...btn.props} />
          ) : (
            <div
              key={btn.id}
              className={`${buttonBaseClass} ${lightBg} ${darkBg} ${lightHoverBg} ${darkHoverBg}`}
              onClick={btn.action}
            >
              <btn.Icon
                size={20}
                className={`${btn.active ? "text-teal dark:text-dark-hover-teal" : `${iconLightText} ${iconDarkText}`} ${iconHoverText} ${btn.loadingState ? "opacity-50" : ""}`}
              />
              <div
                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${tooltipBg} ${tooltipText} text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg`}
              >
                {btn.label} {btn.count > 0 && `(${btn.count})`}
              </div>
            </div>
          ),
        )}
      </div>
      {isQuizModalOpen && (
        <QuizModal isOpen={isQuizModalOpen} onClose={closeQuizModal} siteId={siteId} siteName={siteName} />
      )}
      {isRebusModalOpen && siteName && (
        <RebusModal isOpen={isRebusModalOpen} onClose={closeRebusModal} siteId={siteId} siteName={siteName} />
      )}
    </>
  )
}
