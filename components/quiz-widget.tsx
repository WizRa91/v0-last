"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Scroll } from "lucide-react"
import { QuizModal } from "./quiz-modal"

interface QuizWidgetProps {
  siteId: string
  siteName: string
}

export function QuizWidget({ siteId, siteName }: QuizWidgetProps) {
  const [showQuizModal, setShowQuizModal] = useState(false)

  return (
    <>
      <div className="quiz-section theme-secondary-bg p-6 rounded-lg theme-border my-8 shadow-lg">
        <h2 className="text-2xl font-bold theme-text mb-4">Test Your Knowledge</h2>
        <p className="theme-secondary-text mb-6">
          Challenge yourself with our interactive quiz about {siteName}. Learn fascinating facts and test your
          understanding of this ancient wonder!
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => setShowQuizModal(true)}
            className="theme-button font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Scroll className="mr-2 h-5 w-5" />
            Take the {siteName} Quiz
          </Button>
        </div>
      </div>
      <QuizModal isOpen={showQuizModal} onClose={() => setShowQuizModal(false)} siteId={siteId} siteName={siteName} />
    </>
  )
}
