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
  const { signUpWithEmail, signInWithGoogle } = useAuth()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !email || !password) return

    setLoading(true)
    try {
      await signUpWithEmail(email, password, fullName)
      setOpen(false)
      setFullName("")
      setEmail("")
      setPassword("")
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      // Error is handled in the hook
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#4A7A7A] text-[#F5F1E8] hover:bg-[#8C6F5A] dark:bg-[var(--custom-accent)] dark:text-[var(--custom-text)] dark:hover:bg-[var(--custom-hover)] border border-[var(--custom-border)] transition-all duration-200 px-4 py-2 rounded-lg">
          Sign up
        </Button>
      </DialogTrigger>
      <DialogContent className="theme-secondary-bg theme-text">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border theme-border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100 theme-text"
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
            <DialogTitle className="sm:text-center theme-text">Sign up</DialogTitle>
            <DialogDescription className="sm:text-center theme-secondary-text">
              We just need a few details to get you started.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleEmailSignUp} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`} className="theme-text">
                Full name
              </Label>
              <Input
                id={`${id}-name`}
                placeholder="Matt Welsh"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="theme-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-email`} className="theme-text">
                Email
              </Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="theme-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-password`} className="theme-text">
                Password
              </Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="theme-input"
              />
            </div>
          </div>
          <Button type="submit" className="w-full theme-button text-[#F5F1E8]" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs theme-secondary-text">Or</span>
        </div>

        <Button
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="theme-button text-[#F5F1E8]"
        >
          {loading ? "Signing up..." : "Continue with Google"}
        </Button>

        <p className="text-center text-xs theme-secondary-text">
          By signing up you agree to our{" "}
          <a className="underline hover:no-underline theme-nav-link" href="#">
            Terms
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  )
}
