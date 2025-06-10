"use client"

import type React from "react"
import { useState } from "react"

interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: string
}

interface QuizWidgetProps {
  questions: QuizQuestion[]
}

const QuizWidget: React.FC<QuizWidgetProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }

    setSelectedAnswer(null)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
  }

  return (
    <div className="quiz-widget p-6 rounded-lg shadow-md theme-secondary-bg">
      {showResult ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 theme-text">Quiz Result</h2>
          <p className="theme-secondary-text mb-6">
            You scored {score} out of {questions.length}!
          </p>
          <button className="w-full theme-button" onClick={handleRestartQuiz}>
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4 theme-text">{currentQuestion.question}</h2>
          <p className="theme-secondary-text mb-6">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index} className="mb-2">
                <button
                  className={`w-full p-3 rounded-md text-left ${
                    selectedAnswer === option
                      ? "bg-blue-200 dark:bg-blue-700"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <button className="w-full theme-button" onClick={handleNextQuestion} disabled={!selectedAnswer}>
            Next Question
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizWidget
