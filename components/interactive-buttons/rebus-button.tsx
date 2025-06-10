"use client"
import { Puzzle } from "lucide-react"

interface RebusButtonProps {
  siteId: string
  siteName: string
  onOpenRebusModal: () => void
}

export function RebusButton({ siteId, siteName, onOpenRebusModal }: RebusButtonProps) {
  return (
    <div
      className="aspect-square w-10 h-10 rounded-full bg-cream dark:bg-dark-secondary-bg shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-teal dark:hover:bg-dark-hover-teal"
      title="Solve Rebus"
      onClick={onOpenRebusModal}
    >
      <Puzzle className="w-5 h-5 text-brown dark:text-dark-text-secondary group-hover:text-white dark:group-hover:text-dark-text-primary" />
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black dark:bg-dark-secondary-bg text-white dark:text-dark-text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Solve Rebus
      </div>
    </div>
  )
}
