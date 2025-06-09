"use client"

import { BookText } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { QuizModal } from "./quiz-modal"

interface AnswerQuizButtonProps {
  siteId?: string
  siteName?: string
}

export const AnswerQuizButton = ({ siteId, siteName }: AnswerQuizButtonProps) => {
  const [quizCount, setQuizCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openQuizModal = () => {
    setIsModalOpen(true)
    toast.success("Opening quiz...")
  }

  const closeQuizModal = () => {
    setIsModalOpen(false)
    // Increment quiz count when modal is closed (assuming quiz was completed)
    setQuizCount((prev) => prev + 1)
  }

  return (
    <>
      {/* Quiz Button */}
      <div
        className="aspect-square w-10 h-10 rounded-full bg-cream shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-teal"
        onClick={openQuizModal}
      >
        <BookText size={20} className="text-brown group-hover:text-white transition-colors" />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Quiz ({quizCount})
        </div>
      </div>

      {/* Modal - rendered at the root level */}
      {isModalOpen && <QuizModal isOpen={isModalOpen} onClose={closeQuizModal} siteId={siteId} siteName={siteName} />}
    </>
  )
}
