"use client"

import type React from "react"
import type { CategoryNavItem } from "./types"

interface CategoryNavigationProps {
  categoryNavItems: CategoryNavItem[]
  activeCategory: string
  handleCategoryClick: (categoryId: string) => void
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categoryNavItems,
  activeCategory,
  handleCategoryClick,
}) => {
  return (
    <div className="w-full bg-cream-dark border-t-2 border-brown py-6 px-4 shadow-inner rounded-b-xl">
      <div className="flex justify-between items-center overflow-x-auto pb-2 gap-3">
        {categoryNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleCategoryClick(item.id)}
            className={`flex flex-col items-center px-4 py-3 min-w-[90px] rounded-lg transition-all duration-300 ${
              activeCategory === item.id
                ? "bg-teal text-white font-medium shadow-inner"
                : "text-teal bg-cream-light hover:bg-brown hover:text-white shadow-md"
            }`}
            aria-pressed={activeCategory === item.id}
            role="button"
          >
            <div className={`mb-2 ${activeCategory === item.id ? "text-white" : "text-teal"}`}>{item.icon}</div>
            <span className="text-sm font-bold whitespace-nowrap">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryNavigation
