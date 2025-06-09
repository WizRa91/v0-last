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
    <div className="bg-cream-dark/50 dark:bg-dark-secondary-bg p-8 rounded-2xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-5 text-brown dark:text-dark-text-primary">Related Tags</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <div
            key={index}
            onClick={() => handleTagClick(tag)}
            className="bg-brown dark:bg-dark-accent px-4 py-2 rounded-full text-cream-light dark:text-dark-text-primary text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer hover:bg-teal dark:hover:bg-dark-hover-teal hover:-translate-y-[1px] shadow-md active:bg-teal-dark dark:active:bg-dark-hover-teal/80"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  )
}
