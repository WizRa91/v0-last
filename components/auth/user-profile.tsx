"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { LayoutDashboard, LogOut, UserCircle } from "lucide-react"

export function UserProfile() {
  const { user, signOut, loading } = useAuth()

  if (loading) {
    return <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
  }

  if (!user) {
    return null
  }

  const getInitials = (name: string | undefined | null) => {
    if (!name) return "U"
    const names = name.split(" ")
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const userFullName = user.user_metadata?.full_name || user.email
  const userAvatarUrl = user.user_metadata?.avatar_url
  const userEmail = user.email

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
          <Avatar className="h-10 w-10 border theme-border">
            <AvatarImage src={userAvatarUrl || "/placeholder.svg"} alt={userFullName || "User avatar"} />
            <AvatarFallback className="theme-secondary-bg theme-text">{getInitials(userFullName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 theme-secondary-bg theme-border" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none theme-text">{userFullName}</p>
            <p className="text-xs leading-none text-muted-foreground theme-secondary-text">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="theme-border" />
        <DropdownMenuItem asChild className="cursor-pointer theme-hover-bg">
          <Link href="/my-atlas">
            <LayoutDashboard className="mr-2 h-4 w-4 theme-secondary-text" />
            <span className="theme-text">My Atlas</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer theme-hover-bg">
          <Link href="/my-atlas#profile">
            {" "}
            {/* Or a dedicated profile page */}
            <UserCircle className="mr-2 h-4 w-4 theme-secondary-text" />
            <span className="theme-text">Profile Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="theme-border" />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer theme-hover-bg">
          <LogOut className="mr-2 h-4 w-4 theme-secondary-text" />
          <span className="theme-text">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
