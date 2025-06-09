"use client"

import { useState } from "react"
import { BookText } from "lucide-react"
import { QuizModal } from "@/components/quiz-modal"
import type { InteractiveButtonProps } from "./types"

export function QuizButton({ siteId, siteName, className }: InteractiveButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quizCount, setQuizCount] = useState(0)

  // In the future, this would fetch from a database
  // const [quizData, setQuizData] = useState<{ count: number, completed: number }>({ count: 0, completed: 0 })

  const handleOpenQuiz = () => {
    setIsModalOpen(true)
    console.log("Quiz button clicked for site:", siteId)
  }

  const handleCloseQuiz = () => {
    setIsModalOpen(false)
    // In a real implementation, we'd only increment if the quiz was completed successfully
    setQuizCount((prev) => prev + 1)
  }

  return (
    <>
      <div
        className={`aspect-square w-10 h-10 rounded-full bg-cream shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-teal ${className || ""}`}
        onClick={handleOpenQuiz}
      >
        <BookText size={20} className="text-brown group-hover:text-white transition-colors" />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Quiz {quizCount > 0 ? `(${quizCount})` : ""}
        </div>
      </div>

      {isModalOpen && <QuizModal isOpen={isModalOpen} onClose={handleCloseQuiz} siteId={siteId} siteName={siteName} />}
    </>
  )
}
