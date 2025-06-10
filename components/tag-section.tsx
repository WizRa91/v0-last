"use client"

interface TagSectionProps {
  tags: string[]
  onTagClick?: (tag: string) => void
}

export const TagSection = ({ tags, onTagClick }: TagSectionProps) => {
  const handleTagClick = (tag: string) => {
    if (onTagClick) onTagClick(tag)
  }

  return (
    <div className="theme-secondary-bg p-8 rounded-2xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-5 theme-text">Related Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <div
            key={index}
            onClick={() => handleTagClick(tag)}
            className="bg-[var(--custom-text)] text-[var(--custom-secondary-bg)] dark:bg-dark-accent px-4 py-2 rounded-full dark:text-dark-text-primary text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer hover:bg-[var(--custom-accent)] hover:text-[var(--custom-button-text)] dark:hover:bg-dark-hover-teal hover:-translate-y-[1px] shadow-md active:bg-[var(--custom-accent)]/80 dark:active:bg-dark-hover-teal/80"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  )
}
