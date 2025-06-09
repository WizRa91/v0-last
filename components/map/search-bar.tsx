"use client"

import type React from "react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  searchText: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, handleSearchChange }) => {
  return (
    <div className="w-full bg-cream border-b-2 border-brown py-6 px-4 shadow-lg rounded-t-xl">
      <Input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search for ancient sites..."
        className="w-full p-3 text-base border-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal bg-cream shadow-inner"
      />
    </div>
  )
}

export default SearchBar
