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
      <div className="quiz-section bg-cream-dark/50 dark:bg-dark-secondary-bg p-6 rounded-lg border-2 border-amber-200 dark:border-dark-border my-8 shadow-lg">
        <h2 className="text-2xl font-bold text-brown dark:text-dark-text-primary mb-4">Test Your Knowledge</h2>
        <p className="text-brown/80 dark:text-dark-text-secondary mb-6">
          Challenge yourself with our interactive quiz about {siteName}. Learn fascinating facts and test your
          understanding of this ancient wonder!
        </p>
        <div className="flex justify-center">
          <Button
            onClick={() => setShowQuizModal(true)}
            className="bg-teal hover:bg-teal-dark dark:bg-dark-accent dark:hover:bg-dark-hover-teal text-white dark:text-dark-text-primary font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
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
