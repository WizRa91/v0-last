"use client"
import { useState } from "react"
import { BookmarkButton } from "./interactive-buttons/bookmark-button"
import { BeenThereButton } from "./interactive-buttons/been-there-button"
import { WantToVisitButton } from "./interactive-buttons/want-to-visit-button"
import { QuizButton } from "./interactive-buttons/quiz-button"
import { NotesButton } from "./interactive-buttons/notes-button"
import { RebusButton } from "./interactive-buttons/rebus-button"
import { ActionButtonGroup } from "./interactive-buttons/action-button-group"
import { RebusModal } from "./rebus-modal"
import { getRebusForSite } from "@/data/site-rebuses"
import { QuizModal } from "./quiz-modal"

interface ActionButtonsSimpleProps {
  siteId: string
  siteName: string
  onOpenQuizModal?: () => void
}

export function ActionButtonsSimple({ siteId, siteName, onOpenQuizModal }: ActionButtonsSimpleProps) {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)
  const [rebusModalOpen, setRebusModalOpen] = useState(false)
  const hasRebus = getRebusForSite(siteId) !== null

  return (
    <ActionButtonGroup className="flex space-x-2">
      <BookmarkButton siteId={siteId} />
      <BeenThereButton siteId={siteId} />
      <WantToVisitButton siteId={siteId} />
      <NotesButton siteSlug={siteId} />
      {onOpenQuizModal && <QuizButton siteId={siteId} onOpenQuizModal={onOpenQuizModal} />}
      {hasRebus && <RebusButton siteId={siteId} siteName={siteName} onOpenRebusModal={() => setRebusModalOpen(true)} />}

      {rebusModalOpen && (
        <RebusModal
          isOpen={rebusModalOpen}
          onClose={() => setRebusModalOpen(false)}
          siteId={siteId}
          siteName={siteName}
        />
      )}
      {isQuizModalOpen && (
        <QuizModal
          isOpen={isQuizModalOpen}
          onClose={() => setIsQuizModalOpen(false)}
          siteId={siteId}
          siteName={siteName}
        />
      )}
    </ActionButtonGroup>
  )
}
