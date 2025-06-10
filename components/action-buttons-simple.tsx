import { BookOpenCheck, Bookmark, Flag, PencilLine, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ActionButtonsSimpleProps {
  slug: string
}

export function ActionButtonsSimple({ slug }: ActionButtonsSimpleProps) {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/quiz/${slug}`}>
        <Button className="theme-button bg-purple-500 hover:bg-purple-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700">
          Quiz
        </Button>
      </Link>

      <Button
        variant="ghost"
        className="text-[var(--custom-text)] hover:text-[var(--custom-accent)] dark:text-[var(--custom-text)] dark:hover:text-[var(--custom-hover)]"
      >
        <BookOpenCheck className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        className="text-[var(--custom-text)] hover:text-[var(--custom-accent)] dark:text-[var(--custom-text)] dark:hover:text-[var(--custom-hover)]"
      >
        <PencilLine className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        className="text-[var(--custom-text)] hover:text-[var(--custom-accent)] dark:text-[var(--custom-text)] dark:hover:text-[var(--custom-hover)]"
      >
        <Bookmark className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        className="text-[var(--custom-text)] hover:text-[var(--custom-accent)] dark:text-[var(--custom-text)] dark:hover:text-[var(--custom-hover)]"
      >
        <Flag className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        className="text-[var(--custom-text)] hover:text-[var(--custom-accent)] dark:text-[var(--custom-text)] dark:hover:text-[var(--custom-hover)]"
      >
        <Star className="h-5 w-5" />
      </Button>
    </div>
  )
}
