"use client"

import Link from "next/link"
import { AuthButtons } from "./auth/auth-buttons" // Corrected path
import { Mountain } from "lucide-react" // Example Icon

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b theme-border bg-cream dark:bg-dark-primary-bg">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold theme-text hover:opacity-80 transition-opacity"
        >
          <Mountain className="h-6 w-6 text-brown dark:text-dark-text-secondary" /> {/* Example site icon */}
          <span className="font-display tracking-tight">Archaic Knowledge</span>
        </Link>
        <AuthButtons />
      </div>
    </header>
  )
}
