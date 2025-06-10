"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, HelpCircle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getRebusForSite } from "@/data/site-rebuses"
import type { RebusQuestion } from "@/data/site-rebuses"

interface RebusModalProps {
  isOpen: boolean
  onClose: () => void
  siteId: string
  siteName: string
}

export function RebusModal({ isOpen, onClose, siteId, siteName }: RebusModalProps) {
  const [rebus, setRebus] = useState<RebusQuestion | null>(null)
  const [answer, setAnswer] = useState("")
  const [showHint, setShowHint] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const rebusData = getRebusForSite(siteId)
      setRebus(rebusData)
      setAnswer("")
      setShowHint(false)
      setIsCorrect(null)
      setHasSubmitted(false)
    }
  }, [isOpen, siteId])

  if (!isOpen || !rebus) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalizedUserAnswer = answer.trim().toLowerCase()
    const normalizedCorrectAnswer = rebus.answer.trim().toLowerCase()

    setIsCorrect(normalizedUserAnswer === normalizedCorrectAnswer)
    setHasSubmitted(true)
  }

  const handleTryAgain = () => {
    setAnswer("")
    setIsCorrect(null)
    setHasSubmitted(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-secondary-bg rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 dark:border-dark-border flex justify-between items-center">
          <h2 className="text-xl font-bold text-brown dark:text-dark-text-primary">Rebus Puzzle: {siteName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-dark-text-secondary hover:text-gray-700 dark:hover:text-dark-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex justify-center">
            <div className="relative w-full max-w-sm h-48">
              <Image
                src={rebus.imageUrl || "/placeholder.svg"}
                alt="Rebus puzzle"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-md"
              />
            </div>
          </div>

          {!hasSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1"
                >
                  Your Answer:
                </label>
                <Input
                  id="answer"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full border-gray-300 dark:border-dark-border dark:bg-dark-primary-bg dark:text-dark-text-primary"
                  required
                />
              </div>

              {showHint && rebus.hint && (
                <div className="bg-cream-light dark:bg-dark-primary-bg p-3 rounded-md text-sm text-gray-700 dark:text-dark-text-secondary">
                  <span className="font-bold">Hint:</span> {rebus.hint}
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowHint(true)}
                  className="text-teal dark:text-dark-hover-teal border-teal dark:border-dark-hover-teal hover:bg-teal-light/20 dark:hover:bg-dark-hover-teal/20"
                  disabled={showHint}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  {showHint ? "Hint Shown" : "Show Hint"}
                </Button>
                <Button
                  type="submit"
                  className="bg-teal hover:bg-teal-dark dark:bg-dark-accent dark:hover:bg-dark-hover-teal text-white dark:text-dark-text-primary"
                >
                  Submit Answer
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div
                className={`p-4 rounded-md ${
                  isCorrect
                    ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                } flex items-start`}
              >
                <div className="flex-shrink-0 mr-3">
                  {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-medium">{isCorrect ? "Correct!" : "Not quite right"}</p>
                  <p className="text-sm mt-1">
                    {isCorrect ? "Great job solving the rebus puzzle!" : `The correct answer is: "${rebus.answer}"`}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {!isCorrect && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleTryAgain}
                    className="border-gray-300 dark:border-dark-border dark:text-dark-text-secondary"
                  >
                    Try Again
                  </Button>
                )}
                <Button
                  type="button"
                  onClick={onClose}
                  className="bg-teal hover:bg-teal-dark dark:bg-dark-accent dark:hover:bg-dark-hover-teal text-white dark:text-dark-text-primary"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
