"use client"

import Link from "next/link"
import { NotebookPen } from "lucide-react" // Using a more distinct icon

interface NotesButtonProps {
  siteSlug: string
}

export function NotesButton({ siteSlug }: NotesButtonProps) {
  return (
    <Link href={`/notes/${siteSlug}`} passHref>
      <div
        className="aspect-square w-10 h-10 rounded-full bg-cream dark:bg-dark-secondary-bg shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-[#4A7A7A]"
        title="View/Add Notes"
      >
        <NotebookPen
          size={20}
          className="text-brown dark:text-dark-text-secondary group-hover:text-white dark:group-hover:text-dark-text-primary transition-colors"
        />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black dark:bg-dark-secondary-bg text-white dark:text-dark-text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Notes
        </div>
      </div>
    </Link>
  )
}
