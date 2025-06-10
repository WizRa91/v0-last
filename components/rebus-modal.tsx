"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getRebusForSite, type Rebus } from "@/data/site-rebuses"
import { toast } from "sonner"
import { Lightbulb, CheckCircle, XCircle } from "lucide-react"

interface RebusModalProps {
  isOpen: boolean
  onClose: () => void
  siteId: string
  siteName: string
}

export function RebusModal({ isOpen, onClose, siteId, siteName }: RebusModalProps) {
  const [rebus, setRebus] = useState<Rebus | null>(null)
  const [answer, setAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const foundRebus = getRebusForSite(siteId)
      setRebus(foundRebus)
      // Reset state when modal opens
      setAnswer("")
      setIsCorrect(null)
      setShowHint(false)
    }
  }, [isOpen, siteId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!rebus) return

    const correct = answer.trim().toLowerCase() === rebus.answer.toLowerCase()
    setIsCorrect(correct)

    if (correct) {
      toast.success("That's correct! Well done.")
    } else {
      toast.error("Not quite. Try again!")
    }
  }

  if (!rebus) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="theme-secondary-bg theme-border max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="theme-text font-['Cinzel'] text-2xl">Rebus Puzzle: {siteName}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="relative w-full h-auto theme-bg dark:bg-gray-800 p-4 rounded-lg shadow-inner flex justify-center">
            <Image
              src={rebus.imageUrl || "/placeholder.svg"}
              alt={`Rebus for ${siteName}`}
              width={400}
              height={150}
              className="rounded-md object-contain"
            />
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your answer..."
              className="theme-input focus:ring-[var(--custom-accent)]"
              disabled={isCorrect === true}
            />
            <Button type="submit" className="theme-button" disabled={isCorrect === true}>
              Submit Answer
            </Button>
          </form>

          {isCorrect !== null && (
            <div
              className={`mt-4 p-3 rounded-lg flex items-center justify-center text-white ${isCorrect ? "bg-green-500" : "bg-red-500"}`}
            >
              {isCorrect ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
              <span>{isCorrect ? `Correct! The answer is "${rebus.answer}".` : "Incorrect. Please try again."}</span>
            </div>
          )}

          {rebus.hint && (
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                onClick={() => setShowHint(!showHint)}
                className="theme-secondary-text hover:theme-text text-sm"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
              {showHint && (
                <p className="mt-2 text-sm p-3 bg-[var(--custom-bg)]/50 rounded-lg theme-text">{rebus.hint}</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
