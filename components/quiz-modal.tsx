"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Crown, Sword, RotateCcw, Home, Coins } from "lucide-react"
import { getQuizBySiteId, getDefaultQuiz } from "@/data/site-quizzes"
import { useAuth } from "@/hooks/useAuth"
import { useAurei } from "@/hooks/useAurei"

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
  siteId?: string
  siteName?: string
}

type QuizState = "active" | "incorrect" | "completed"

export function QuizModal({ isOpen, onClose, siteId, siteName }: QuizModalProps) {
  const { user } = useAuth()
  const { awardQuizAurei } = useAurei()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizState, setQuizState] = useState<QuizState>("active")
  const [mascotSide, setMascotSide] = useState<"left" | "right">("left")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [aureiAwarded, setAureiAwarded] = useState(false)
  const [awardingAurei, setAwardingAurei] = useState(false)

  // Get the appropriate quiz based on siteId
  const currentQuiz = siteId ? getQuizBySiteId(siteId) : getDefaultQuiz()
  const questions = currentQuiz?.questions || []
  const quizSiteName = siteName || currentQuiz?.siteName || "Ancient Sites"
  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  // Reset quiz state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0)
      setSelectedAnswer(null)
      setQuizState("active")
      setMascotSide("left")
      setIsTransitioning(false)
      setAureiAwarded(false)
      setAwardingAurei(false)
    }
  }, [isOpen])

  // Handle answer confirmation
  const handleConfirm = () => {
    if (selectedAnswer === null || !currentQ) return

    const isCorrect = selectedAnswer === currentQ.correctAnswer

    if (isCorrect) {
      if (isLastQuestion) {
        setQuizState("completed")
      } else {
        // Move to next question with mascot transition
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1)
          setSelectedAnswer(null)
          setMascotSide((prev) => (prev === "left" ? "right" : "left"))
          setIsTransitioning(false)
        }, 300)
      }
    } else {
      setQuizState("incorrect")
    }
  }

  // Reset quiz
  const handleTryAgain = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setQuizState("active")
    setMascotSide("left")
    setIsTransitioning(false)
    setAureiAwarded(false)
    setAwardingAurei(false)
  }

  // Handle claiming victory and awarding Aurei
  const handleClaimVictory = async () => {
    console.log("Claim victory clicked, siteId:", siteId)

    if (siteId && !aureiAwarded && !awardingAurei) {
      setAwardingAurei(true)
      console.log("Attempting to award Aurei...")

      const success = await awardQuizAurei(siteId, quizSiteName)
      console.log("Aurei award result:", success)

      if (success) {
        setAureiAwarded(true)
      }
      setAwardingAurei(false)
    }

    // Close modal after a short delay to show the success state
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  // Mascot and logo images
  const mascotImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ak-mascot-rQ0DeMhgJXopmKF7zGTbZd0YrLhRmU.png"
  const logoImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-curat-full-white-250x2-0JkMpnuzVFCvW0SjZIz30XNrTWWza6.png"
  const mascotName = "Shardy"

  if (!isOpen) return null

  // Early return if no quiz data is available
  if (!currentQuiz || questions.length === 0 || !currentQ) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <div className="relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto z-10">
          <div className="bg-gradient-to-b from-amber-50 to-stone-100 rounded-xl shadow-2xl border-4 border-amber-600 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors"
              aria-label="Close quiz"
            >
              <X className="h-5 w-5 text-stone-700" />
            </button>

            {/* Content */}
            <div className="relative p-8 text-center">
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Quiz Not Available</h3>
              <p className="text-amber-800 mb-4">Sorry, no quiz questions are available for this site.</p>
              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg border-2 border-amber-800"
              >
                <Home className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal - Centered with max-width */}
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto z-10">
        <div className="bg-gradient-to-b from-amber-50 to-stone-100 rounded-xl shadow-2xl border-4 border-amber-600 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-contain rounded-xl overflow-hidden">
            <img
              src={logoImage || "/placeholder.svg"}
              alt="AK Logo Background"
              className="w-full h-full object-contain opacity-20"
            />
          </div>

          {/* Logo Header */}
          <div className="absolute top-4 left-4 w-12 h-12">
            <img
              src={logoImage || "/placeholder.svg"}
              alt="Archaic Knowledge"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors"
            aria-label="Close quiz"
          >
            <X className="h-5 w-5 text-stone-700" />
          </button>

          {/* Content */}
          <div className="relative p-8 pt-16">
            {quizState === "active" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left Mascot */}
                <div
                  className={`${mascotSide === "left" ? "block" : "hidden lg:block opacity-20"} transition-all duration-300 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {mascotSide === "left" && (
                    <div className="text-center flex flex-col items-center">
                      {/* Speech Bubble */}
                      <div className="bg-amber-100 border-2 border-amber-600 rounded-lg p-4 shadow-lg mb-2 max-w-xs">
                        <p className="text-sm font-medium text-amber-900 break-words">{currentQ.question}</p>
                      </div>

                      {/* Mascot */}
                      <div className="mb-1 relative">
                        <img
                          src={mascotImage || "/placeholder.svg"}
                          alt={mascotName}
                          className="w-48 h-48 object-contain animate-pulse"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=200&width=200&text=Shardy+Mascot"
                          }}
                        />
                      </div>

                      {/* Name */}
                      <p className="text-amber-800 font-bold text-lg">{mascotName}</p>
                    </div>
                  )}
                </div>

                {/* Center Content */}
                <div className="lg:col-span-1">
                  {/* Progress */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 bg-amber-200 px-4 py-2 rounded-full border-2 border-amber-600">
                      <Crown className="h-4 w-4 text-amber-700" />
                      <span className="font-bold text-amber-900">
                        {quizSiteName} - Question {currentQuestion + 1}/{questions.length}
                      </span>
                    </div>
                  </div>

                  {/* Question (for mobile when mascot is on right) */}
                  {mascotSide === "right" && (
                    <div className="lg:hidden mb-6 bg-amber-100 border-2 border-amber-600 rounded-lg p-4">
                      <p className="font-medium text-amber-900 break-words">{currentQ.question}</p>
                    </div>
                  )}

                  {/* Answer Options - Fixed height container */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {currentQ.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`p-3 rounded-lg border-2 text-left transition-all duration-200 h-20 flex items-start gap-2 overflow-hidden ${
                          selectedAnswer === index
                            ? "bg-amber-200 border-amber-600 shadow-lg transform scale-105"
                            : "bg-stone-50 border-stone-300 hover:bg-stone-100 hover:border-stone-400"
                        }`}
                      >
                        <span className="font-bold text-amber-900 flex-shrink-0 text-sm mt-0.5">
                          {String.fromCharCode(65 + index)})
                        </span>
                        <span className="text-stone-800 text-sm leading-tight line-clamp-3 overflow-hidden text-ellipsis">
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Confirm Button */}
                  <div className="text-center">
                    <Button
                      onClick={handleConfirm}
                      disabled={selectedAnswer === null}
                      className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:from-stone-400 disabled:to-stone-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg border-2 border-amber-800 disabled:border-stone-600"
                    >
                      <Sword className="mr-2 h-4 w-4" />
                      Confirm Answer
                    </Button>
                  </div>
                </div>

                {/* Right Mascot */}
                <div
                  className={`${mascotSide === "right" ? "block" : "hidden lg:block opacity-20"} transition-all duration-300 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {mascotSide === "right" && (
                    <div className="text-center flex flex-col items-center">
                      {/* Speech Bubble */}
                      <div className="bg-amber-100 border-2 border-amber-600 rounded-lg p-4 shadow-lg mb-2 max-w-xs">
                        <p className="text-sm font-medium text-amber-900 break-words">{currentQ.question}</p>
                      </div>

                      {/* Mascot */}
                      <div className="mb-1">
                        <img
                          src={mascotImage || "/placeholder.svg"}
                          alt={mascotName}
                          className="w-48 h-48 object-contain animate-pulse"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=200&width=200&text=Shardy+Mascot"
                          }}
                        />
                      </div>

                      {/* Name */}
                      <p className="text-amber-800 font-bold text-lg">{mascotName}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Incorrect Answer State */}
            {quizState === "incorrect" && (
              <div className="text-center max-w-2xl mx-auto">
                <div className="mb-6 flex flex-col items-center">
                  <div className="mb-1">
                    <img
                      src={mascotImage || "/placeholder.svg"}
                      alt={mascotName}
                      className="w-32 h-32 object-contain mx-auto animate-bounce"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=200&width=200&text=Shardy+Mascot"
                      }}
                    />
                  </div>
                  <p className="text-amber-800 font-bold text-lg mb-4">{mascotName}</p>

                  <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6 shadow-lg">
                    <h3 className="text-2xl font-bold text-red-800 mb-2">Sorry, that's incorrect!</h3>
                    <p className="text-red-700">
                      The correct answer was: <strong>{currentQ.options[currentQ.correctAnswer]}</strong>
                    </p>
                    {currentQ.explanation && <p className="text-red-600 mt-2 text-sm">{currentQ.explanation}</p>}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleTryAgain}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg border-2 border-blue-800"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="border-2 border-stone-400 hover:bg-stone-100 font-bold py-3 px-6 rounded-lg"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Return Home
                  </Button>
                </div>
              </div>
            )}

            {/* Completion State */}
            {quizState === "completed" && (
              <div className="text-center max-w-2xl mx-auto">
                <div className="mb-6 flex flex-col items-center">
                  <div className="mb-1">
                    <img
                      src={mascotImage || "/placeholder.svg"}
                      alt={mascotName}
                      className="w-40 h-40 object-contain mx-auto animate-bounce"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=200&width=200&text=Shardy+Mascot"
                      }}
                    />
                  </div>
                  <p className="text-amber-800 font-bold text-lg mb-4">{mascotName}</p>

                  <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-4 border-yellow-500 rounded-lg p-8 shadow-2xl relative overflow-hidden">
                    {/* Celebration Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 animate-pulse" />

                    <h3 className="text-3xl font-bold text-amber-900 mb-4">🎉 Congratulations! 🎉</h3>
                    <p className="text-xl text-amber-800 mb-2">You're a {quizSiteName} Expert!</p>
                    <p className="text-amber-700 mb-4">You've mastered the mysteries of {quizSiteName}!</p>

                    {user && (
                      <div className="bg-white/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Coins className="h-6 w-6 text-amber-600" />
                          <span className="text-2xl font-bold text-amber-700">+5 Aurei</span>
                        </div>
                        <p className="text-sm text-amber-600">Loyalty Points Earned!</p>
                        {aureiAwarded && (
                          <p className="text-xs text-green-600 mt-1">✓ Aurei successfully added to your wallet!</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleClaimVictory}
                  disabled={awardingAurei || aureiAwarded}
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg border-2 border-yellow-600 transform hover:scale-105 transition-all duration-200"
                  size="lg"
                >
                  <Crown className="mr-2 h-5 w-5" />
                  {awardingAurei
                    ? "Awarding..."
                    : aureiAwarded
                      ? "Victory Claimed!"
                      : user
                        ? "Claim Your Victory"
                        : "Claim Victory"}
                </Button>

                {!user && <p className="text-sm text-amber-700 mt-2">Sign in to earn Aurei rewards!</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
