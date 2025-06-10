"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  const { signOut } = useAuth()
  return (
    <Button
      onClick={signOut}
      variant="destructive"
      className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white"
    >
      <LogOut className="mr-2 h-4 w-4" /> Sign Out
    </Button>
  )
}
