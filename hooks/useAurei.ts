"use client"

import { useState } from "react"
import { toast } from "sonner"

export function useAurei() {
  const [aureiBalance, setAureiBalance] = useState(0)

  const awardQuizAurei = async (siteId: string, siteName: string) => {
    try {
      // In a real app, this would be an API call
      console.log(`Awarding Aurei for completing quiz at site ${siteId}: ${siteName}`)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Update local balance
      setAureiBalance((prev) => prev + 5)

      // Show success message
      toast.success(`You earned 5 Aurei for completing the ${siteName} quiz!`)

      return true
    } catch (error) {
      console.error("Error awarding Aurei:", error)
      toast.error("Failed to award Aurei. Please try again.")
      return false
    }
  }

  return {
    aureiBalance,
    awardQuizAurei,
  }
}
