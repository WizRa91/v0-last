"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"

export function Footer() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Handle mounting and initial theme detection
  React.useEffect(() => {
    setMounted(true)

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Handle theme changes
  React.useEffect(() => {
    if (!mounted) return

    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDarkMode, mounted])

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <footer className="w-full theme-footer-bg theme-text transition-colors duration-300">
      <div className="w-full px-[5%] py-12">
        <div className="w-full grid gap-12 grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
          <div className="relative md:col-span-1">
            <h2 className="mb-4 text-3xl font-bold tracking-tight theme-text">Stay Connected</h2>
            <p className="mb-6 theme-secondary-text">
              Join our newsletter for the latest updates on ancient sites and archaeological discoveries.
            </p>
            <form className="relative">
              <Input type="email" placeholder="Enter your email" className="pr-12 backdrop-blur-sm theme-input" />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full theme-button theme-email-submit-button transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4 theme-footer-icon" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold theme-text">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a href="/" className="block transition-colors theme-nav-link hover:theme-accent-text">
                Home
              </a>
              <a href="/map" className="block transition-colors theme-nav-link hover:theme-accent-text">
                Interactive Map
              </a>
              <a href="/about" className="block transition-colors theme-nav-link hover:theme-accent-text">
                About Us
              </a>
              <a href="/sites" className="block transition-colors theme-nav-link hover:theme-accent-text">
                Ancient Sites
              </a>
              <a href="/contact" className="block transition-colors theme-nav-link hover:theme-accent-text">
                Contact
              </a>
            </nav>
          </div>
          <div className="md:col-start-3">
            <h3 className="mb-4 text-lg font-semibold theme-text">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic theme-secondary-text">
              <p>Archaic Knowledge Foundation</p>
              <p>Ancient Studies Department</p>
              <p>Email: discover@archaicknowledge.com</p>
              <p>Research Inquiries: research@archaicknowledge.com</p>
            </address>
          </div>
          <div className="relative md:col-start-4 flex flex-col items-end">
            <h3 className="mb-4 text-lg font-semibold theme-text">Follow Us</h3>
            <div className="mb-6 flex space-x-4 self-end">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full theme-button theme-interactive-hover">
                      <Facebook className="h-4 w-4 theme-footer-icon group-hover:text-white" />
                      <span className="sr-only">Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full theme-button theme-interactive-hover">
                      <Twitter className="h-4 w-4 theme-footer-icon group-hover:text-white" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full theme-button theme-interactive-hover">
                      <Instagram className="h-4 w-4 theme-footer-icon group-hover:text-white" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full theme-button theme-interactive-hover">
                      <Linkedin className="h-4 w-4 theme-footer-icon group-hover:text-white" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center space-x-2 self-end">
              <Sun className="h-4 w-4 theme-icon" />
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              <Moon className="h-4 w-4 theme-icon" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>
        <div className="w-full mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row theme-border">
          <p className="text-sm theme-secondary-text md:self-start">© 2025 Archaic Knowledge. All rights reserved.</p>
          <nav className="flex gap-4 text-sm md:self-end">
            <a href="#" className="transition-colors theme-nav-link hover:theme-accent-text">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors theme-nav-link hover:theme-accent-text">
              Terms of Service
            </a>
            <a href="#" className="transition-colors theme-nav-link hover:theme-accent-text">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
