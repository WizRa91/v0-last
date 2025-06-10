"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useId, useState } from "react"
import { useAuth } from "@/hooks/useAuth" // Corrected path
import { Chrome } from "lucide-react" // Using Lucide for Google icon

export const SignInModal = () => {
  const id = useId()
  const { signInWithEmail, signInWithGoogle, loading: authLoading } = useAuth() // Use 'loading' from useAuth
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [modalLoading, setModalLoading] = useState(false) // Local loading state for modal operations
  const [open, setOpen] = useState(false)

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setModalLoading(true)
    try {
      await signInWithEmail(email, password)
      setOpen(false) // Close modal on success
      setEmail("")
      setPassword("")
    } catch (error) {
      // Error is handled in the useAuth hook (e.g., via toast)
      console.error("Sign in modal error:", error)
    } finally {
      setModalLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setModalLoading(true)
    try {
      await signInWithGoogle()
      // OAuth flow will redirect, modal might not need explicit closing here
      // or can be closed optimistically.
      // setOpen(false);
    } catch (error) {
      console.error("Google sign in modal error:", error)
    } finally {
      setModalLoading(false) // May not be reached if redirect happens quickly
    }
  }

  const isLoading = authLoading || modalLoading

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 
                     bg-cream text-brown hover:bg-cream-dark 
                     dark:bg-dark-accent dark:text-dark-text-primary dark:hover:bg-dark-hover-teal 
                     border-brown/30 dark:border-dark-border 
                     transition-all duration-200 px-4 py-2 h-10"
        >
          Sign in
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-cream dark:bg-dark-secondary-bg text-brown dark:text-dark-text-primary border-brown/20 dark:border-dark-border">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brown/20 dark:border-dark-border"
            aria-hidden="true"
          >
            <svg
              className="stroke-current" // Use current text color
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center text-brown dark:text-dark-text-primary">Welcome back</DialogTitle>
            <DialogDescription className="sm:text-center text-brown-light dark:text-dark-text-secondary">
              Enter your credentials to login to your account.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleEmailSignIn} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-email`} className="text-brown dark:text-dark-text-secondary">
                Email
              </Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white dark:bg-dark-primary-bg border-brown/20 dark:border-dark-border placeholder:text-brown-light/70 dark:placeholder:text-dark-text-secondary/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-password`} className="text-brown dark:text-dark-text-secondary">
                Password
              </Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white dark:bg-dark-primary-bg border-brown/20 dark:border-dark-border placeholder:text-brown-light/70 dark:placeholder:text-dark-text-secondary/70"
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`${id}-remember`}
                className="border-brown/50 data-[state=checked]:bg-teal data-[state=checked]:text-cream dark:border-dark-border dark:data-[state=checked]:bg-dark-hover-teal dark:data-[state=checked]:text-dark-text-primary"
              />
              <Label
                htmlFor={`${id}-remember`}
                className="font-normal text-sm text-brown-light dark:text-dark-text-secondary"
              >
                Remember me
              </Label>
            </div>
            <a
              className="text-sm text-teal hover:text-teal-dark dark:text-dark-hover-teal dark:hover:opacity-80 underline hover:no-underline"
              href="#"
            >
              Forgot password?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full bg-teal hover:bg-teal-dark text-cream dark:bg-dark-hover-teal dark:hover:opacity-80 dark:text-dark-text-primary"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-brown/20 after:h-px after:flex-1 after:bg-brown/20 dark:before:bg-dark-border dark:after:bg-dark-border">
          <span className="text-xs text-brown-light dark:text-dark-text-secondary">Or</span>
        </div>

        <Button
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full border-brown/30 hover:bg-cream-dark/50 dark:border-dark-border dark:hover:bg-dark-accent/50 text-brown dark:text-dark-text-primary flex items-center gap-2"
        >
          <Chrome size={18} />
          {isLoading ? "Processing..." : "Sign in with Google"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
