import type React from "react"
import { Badge } from "./ui/badge"

interface TagSectionProps {
  tags: string[]
}

const TagSection: React.FC<TagSectionProps> = ({ tags }) => {
  return (
    <div className="tag-section py-4 px-6 rounded-lg theme-secondary-bg">
      <h2 className="text-xl font-semibold mb-4 theme-text">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            className="bg-[var(--custom-accent)]/20 text-[var(--custom-accent)] hover:bg-[var(--custom-accent)]/30 dark:bg-dark-accent/50 dark:text-dark-text-secondary dark:hover:bg-dark-accent/70"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default TagSection
