export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface Quiz {
  id: string
  siteName: string
  questions: QuizQuestion[]
}

export const quizData: Quiz[] = [
  {
    id: "stonehenge",
    siteName: "Stonehenge",
    questions: [
      {
        question: "When was Stonehenge built?",
        options: ["1000-500 BCE", "3100-1600 BCE", "5000-4000 BCE", "500-100 BCE"],
        correctAnswer: 1,
        explanation: "Archaeologists believe Stonehenge was constructed from 3100 to 1600 BCE.",
      },
      {
        question: "What type of rock were the large sarsen stones at Stonehenge made of?",
        options: ["Granite", "Limestone", "Sandstone", "Marble"],
        correctAnswer: 2,
        explanation: "The large sarsen stones at Stonehenge are made of sandstone.",
      },
      {
        question: "What astronomical event is Stonehenge aligned with?",
        options: ["Winter solstice", "Summer solstice", "Spring equinox", "All of the above"],
        correctAnswer: 3,
        explanation: "Stonehenge is aligned with multiple astronomical events including solstices and equinoxes.",
      },
    ],
  },
  {
    id: "pyramids",
    siteName: "Pyramids of Giza",
    questions: [
      {
        question: "Which pharaoh commissioned the Great Pyramid of Giza?",
        options: ["Tutankhamun", "Ramses II", "Khufu", "Cleopatra"],
        correctAnswer: 2,
        explanation: "The Great Pyramid was built as a tomb for the pharaoh Khufu around 2560 BCE.",
      },
      {
        question: "How many major pyramids are there at the Giza complex?",
        options: ["One", "Two", "Three", "Four"],
        correctAnswer: 2,
        explanation:
          "There are three major pyramids at Giza: the Great Pyramid of Khufu, the Pyramid of Khafre, and the Pyramid of Menkaure.",
      },
      {
        question: "What is the Great Sphinx believed to represent?",
        options: [
          "A lion with a human head",
          "A pharaoh with a lion's body",
          "A god with an animal body",
          "A mythical creature",
        ],
        correctAnswer: 0,
        explanation:
          "The Great Sphinx is a limestone statue of a reclining sphinx (a mythical creature with a lion's body and a human head).",
      },
    ],
  },
  {
    id: "machu-picchu",
    siteName: "Machu Picchu",
    questions: [
      {
        question: "In what century was Machu Picchu built?",
        options: ["12th century", "15th century", "18th century", "3rd century BCE"],
        correctAnswer: 1,
        explanation: "Machu Picchu was built in the 15th century, around 1450 CE.",
      },
      {
        question: "Who is credited with bringing Machu Picchu to international attention?",
        options: ["Howard Carter", "Heinrich Schliemann", "Hiram Bingham", "Thor Heyerdahl"],
        correctAnswer: 2,
        explanation: "American historian Hiram Bingham brought Machu Picchu to international attention in 1911.",
      },
      {
        question: "What civilization built Machu Picchu?",
        options: ["Maya", "Aztec", "Inca", "Olmec"],
        correctAnswer: 2,
        explanation: "Machu Picchu was built by the Inca civilization.",
      },
    ],
  },
]
