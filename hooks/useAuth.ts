"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      // For demo purposes, we'll create a mock user
      // In a real app, this would check localStorage, cookies, or an auth API
      const mockUser = {
        id: "user123",
        name: "Demo User",
        email: "demo@example.com",
      }
      setUser(mockUser)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const login = () => {
    // Mock login function
    setUser({
      id: "user123",
      name: "Demo User",
      email: "demo@example.com",
    })
  }

  const logout = () => {
    setUser(null)
  }

  return {
    user,
    loading,
    login,
    logout,
  }
}
