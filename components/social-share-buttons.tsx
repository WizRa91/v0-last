"use client"

import { Facebook, Instagram, Twitter, Send } from "lucide-react"
import { toast } from "sonner"

interface SocialShareButtonsProps {
  url: string
  title: string
}

export const SocialShareButtons = ({ url, title }: SocialShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank")
    toast.success("Opening Facebook share dialog")
  }

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, "_blank")
    toast.success("Opening X (Twitter) share dialog")
  }

  const shareToTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`, "_blank")
    toast.success("Opening Telegram share dialog")
  }

  const shareToInstagram = () => {
    navigator.clipboard.writeText(url)
    toast.success("URL copied to clipboard! Open Instagram to share manually.")
  }

  return (
    <div className="flex items-center space-x-3">
      <div
        className="aspect-square w-10 h-10 rounded-full bg-cream dark:bg-dark-accent shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-[#4A7A7A] dark:hover:bg-[#4A7A7A]"
        onClick={shareToFacebook}
      >
        <Facebook
          size={20}
          className="text-brown dark:text-dark-text-secondary group-hover:text-white dark:group-hover:text-dark-text-primary transition-colors"
        />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white dark:bg-dark-primary-bg dark:text-dark-text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Share on Facebook
        </div>
      </div>

      <div
        className="aspect-square w-10 h-10 rounded-full bg-cream dark:bg-dark-accent shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-[#4A7A7A] dark:hover:bg-[#4A7A7A]"
        onClick={shareToInstagram}
      >
        <Instagram
          size={20}
          className="text-brown dark:text-dark-text-secondary group-hover:text-white dark:group-hover:text-dark-text-primary transition-colors"
        />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white dark:bg-dark-primary-bg dark:text-dark-text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Share on Instagram
        </div>
      </div>

      <div
        className="aspect-square w-10 h-10 rounded-full bg-cream dark:bg-dark-accent shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-[#4A7A7A] dark:hover:bg-[#4A7A7A]"
        onClick={shareToTelegram}
      >
        <Send
          size={20}
          className="text-brown dark:text-dark-text-secondary group-hover:text-white dark:group-hover:text-dark-text-primary transition-colors"
        />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white dark:bg-dark-primary-bg dark:text-dark-text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Share on Telegram
        </div>
      </div>

      <div
        className="aspect-square w-10 h-10 rounded-full bg-cream dark:bg-dark-accent shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all relative group hover:bg-[#4A7A7A] dark:hover:bg-[#4A7A7A]"
        onClick={shareToTwitter}
      >
        <Twitter
          size={20}
          className="text-brown dark:text-dark-text-secondary group-hover:text-white dark:group-hover:text-dark-text-primary transition-colors"
        />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white dark:bg-dark-primary-bg dark:text-dark-text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Share on X (Twitter)
        </div>
      </div>
    </div>
  )
}
