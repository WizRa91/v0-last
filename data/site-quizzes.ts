import { type Quiz, quizData } from "./quiz-questions"

export function getQuizBySiteId(siteId: string): Quiz | undefined {
  // Convert numeric IDs to string format used in quizData
  let quizId = siteId
  if (siteId === "1") quizId = "stonehenge"
  if (siteId === "2") quizId = "pyramids"
  if (siteId === "3") quizId = "machu-picchu"

  return quizData.find((quiz) => quiz.id === quizId)
}

export function getDefaultQuiz(): Quiz {
  return quizData[0]
}
