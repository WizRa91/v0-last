"use client"

import type React from "react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import type { Filter } from "@/components/map/types"

interface MapFilterProps {
  isOpen: boolean
  onClose: () => void
  filters: Filter
  onFilterChange: (filters: Filter) => void
}

interface FilterSection {
  id: string
  title: string
  items: {
    id: string
    label: string
    value: string
  }[]
  isOpen: boolean
}

const MapFilter: React.FC<MapFilterProps> = ({ isOpen, onClose, filters, onFilterChange }) => {
  const [sections, setSections] = useState<FilterSection[]>([
    {
      id: "category",
      title: "Filter by Category",
      items: [
        { id: "filter-ancient", label: "Ancient Sites", value: "ancient_sites" },
        { id: "filter-pictographs", label: "Pictographs", value: "pictographs" },
        { id: "filter-megaliths", label: "Megaliths", value: "megaliths" },
        { id: "filter-unusual", label: "Unusual Formations", value: "unusual_formations" },
      ],
      isOpen: false,
    },
    {
      id: "continent",
      title: "Filter by Continent",
      items: [
        { id: "filter-africa", label: "Africa", value: "africa" },
        { id: "filter-asia", label: "Asia", value: "asia" },
        { id: "filter-europe", label: "Europe", value: "europe" },
        { id: "filter-namerica", label: "North America", value: "north_america" },
        { id: "filter-samerica", label: "South America", value: "south_america" },
        { id: "filter-oceania", label: "Oceania", value: "oceania" },
      ],
      isOpen: false,
    },
  ])

  const toggleSection = (sectionId: string) => {
    setSections(
      sections.map((section) => (section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section)),
    )
  }

  const handleCheckboxChange = (sectionId: string, value: string, checked: boolean) => {
    const newFilters = { ...filters }

    if (sectionId === "category") {
      if (checked) {
        if (!newFilters.categories.includes(value)) {
          newFilters.categories = [...newFilters.categories, value]
        }
      } else {
        newFilters.categories = newFilters.categories.filter((item) => item !== value)
      }
    } else if (sectionId === "continent") {
      if (checked) {
        if (!newFilters.continents.includes(value)) {
          newFilters.continents = [...newFilters.continents, value]
        }
      } else {
        newFilters.continents = newFilters.continents.filter((item) => item !== value)
      }
    }

    onFilterChange(newFilters)
  }

  if (!isOpen) return null

  return (
    <div
      className="absolute top-4 right-16 z-[1000] bg-white rounded-lg shadow-lg p-4 min-w-[250px]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
      >
        ×
      </button>

      {sections.map((section) => (
        <div key={section.id} className="mt-4 first:mt-0">
          <div
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => toggleSection(section.id)}
          >
            <h3 className="font-medium text-sm">{section.title}</h3>
            <span className={`transition-transform ${section.isOpen ? "" : "transform -rotate-90"}`}>▼</span>
          </div>

          <div
            className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ${section.isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            {section.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-2 pl-2">
                <Checkbox
                  id={item.id}
                  checked={
                    section.id === "category"
                      ? filters.categories.includes(item.value)
                      : filters.continents.includes(item.value)
                  }
                  onCheckedChange={(checked) => handleCheckboxChange(section.id, item.value, checked === true)}
                />
                <label htmlFor={item.id} className="text-sm text-gray-600 cursor-pointer select-none">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MapFilter
