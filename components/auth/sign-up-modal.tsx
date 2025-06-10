"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
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
import { useAuth } from "@/hooks/useAuth"

export const SignUpModal = () => {
  const id = useId()
  const { signUpWithEmail, signInWithGoogle, loading: authLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [modalLoading, setModalLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (!email || !password || !fullName) {
      setError("Please fill in all required fields.")
      return
    }

    setModalLoading(true)
    try {
      await signUpWithEmail(email, password, fullName)
      setOpen(false) // Close modal on success (or after email confirmation instruction)
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setFullName("")
      // Toast for email confirmation will be shown from useAuth
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
      console.error("Sign up modal error:", err)
    } finally {
      setModalLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setModalLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error("Google sign in modal error:", error)
    } finally {
      setModalLoading(false)
    }
  }

  const isLoading = authLoading || modalLoading

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) setError(null)
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="bg-teal hover:bg-teal-dark text-cream 
                     dark:bg-dark-hover-teal dark:hover:opacity-80 dark:text-dark-text-primary 
                     px-4 py-2 h-10 rounded-lg shadow-sm transition-all duration-200"
        >
          Sign up
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-cream dark:bg-dark-secondary-bg text-brown dark:text-dark-text-primary border-brown/20 dark:border-dark-border">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-brown/20 dark:border-dark-border"
            aria-hidden="true"
          >
            {/* You can use a different icon for sign up */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" x2="19" y1="8" y2="14" />
              <line x1="22" x2="16" y1="11" y2="11" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center text-brown dark:text-dark-text-primary">
              Create an Account
            </DialogTitle>
            <DialogDescription className="sm:text-center text-brown-light dark:text-dark-text-secondary">
              Join Archaic Knowledge to save your progress and discoveries.
            </DialogDescription>
          </DialogHeader>
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleEmailSignUp} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-fullName`} className="text-brown dark:text-dark-text-secondary">
                Full Name
              </Label>
              <Input
                id={`${id}-fullName`}
                placeholder="Your Name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-white dark:bg-dark-primary-bg border-brown/20 dark:border-dark-border placeholder:text-brown-light/70 dark:placeholder:text-dark-text-secondary/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-email-signup`} className="text-brown dark:text-dark-text-secondary">
                Email
              </Label>
              <Input
                id={`${id}-email-signup`}
                placeholder="hi@yourcompany.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white dark:bg-dark-primary-bg border-brown/20 dark:border-dark-border placeholder:text-brown-light/70 dark:placeholder:text-dark-text-secondary/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-password-signup`} className="text-brown dark:text-dark-text-secondary">
                Password
              </Label>
              <Input
                id={`${id}-password-signup`}
                placeholder="Create a password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white dark:bg-dark-primary-bg border-brown/20 dark:border-dark-border placeholder:text-brown-light/70 dark:placeholder:text-dark-text-secondary/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-confirmPassword`} className="text-brown dark:text-dark-text-secondary">
                Confirm Password
              </Label>
              <Input
                id={`${id}-confirmPassword`}
                placeholder="Confirm your password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white dark:bg-dark-primary-bg border-brown/20 dark:border-dark-border placeholder:text-brown-light/70 dark:placeholder:text-dark-text-secondary/70"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-teal hover:bg-teal-dark text-cream dark:bg-dark-hover-teal dark:hover:opacity-80 dark:text-cream"
          >
            Sign Up
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
