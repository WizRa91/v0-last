"use client"

import { Puzzle } from "lucide-react"

interface RebusButtonProps {
  onClick: () => void
}

export function RebusButton({ onClick }: RebusButtonProps) {
  const buttonBaseClass =
    "aspect-square w-10 h-10 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group"
  const lightBg = "bg-cream"
  const darkBg = "dark:bg-dark-accent"
  const lightHoverBg = "hover:bg-teal"
  const darkHoverBg = "dark:hover:bg-dark-hover-teal"
  const iconLightText = "text-brown"
  const iconDarkText = "dark:text-dark-text-secondary"
  const iconHoverText = "group-hover:text-white dark:group-hover:text-dark-text-primary"
  const tooltipBg = "bg-black dark:bg-dark-secondary-bg"
  const tooltipText = "text-white dark:text-dark-text-primary"

  return (
    <div
      className={`${buttonBaseClass} ${lightBg} ${darkBg} ${lightHoverBg} ${darkHoverBg}`}
      onClick={onClick}
      title="Solve the Rebus"
    >
      <Puzzle size={20} className={`${iconLightText} ${iconDarkText} ${iconHoverText}`} />
      <div
        className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${tooltipBg} ${tooltipText} text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg`}
      >
        Rebus Puzzle
      </div>
    </div>
  )
}
