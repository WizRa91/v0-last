"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import type { SupabaseClient, User, AuthChangeEvent, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  supabase: SupabaseClient
  user: User | null
  profile: Profile | null
  signInWithEmail: (email: string, password: string) => Promise<any>
  signInWithGoogle: () => Promise<any>
  signUpWithEmail: (email: string, password: string, fullName: string, username?: string) => Promise<any>
  signOut: () => Promise<any>
  isUserLoading: boolean
}

interface Profile {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  website?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setIsUserLoading(false)
    })

    const checkInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      }
      setIsUserLoading(false)
    }
    checkInitialSession()

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()
      if (error) throw error
      setProfile(data as Profile)
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message)
      toast({ title: "Error", description: "Could not fetch user profile.", variant: "destructive" })
      setProfile(null)
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      toast({ title: "Success", description: "Signed in successfully!" })
    } catch (error: any) {
      console.error("Error signing in with email:", error.message)
      toast({ title: "Sign In Error", description: error.message, variant: "destructive" })
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message)
      toast({ title: "Google Sign In Error", description: error.message, variant: "destructive" })
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string, fullName: string, username?: string) => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      if (user && username) {
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ username, full_name: fullName })
          .eq("id", user.id)
        if (profileError) console.warn("Error setting username post-signup:", profileError.message)
      }
      toast({ title: "Sign Up Successful", description: "Please check your email to confirm your account." })
    } catch (error: any) {
      console.error("Error signing up:", error.message)
      toast({ title: "Sign Up Error", description: error.message, variant: "destructive" })
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setProfile(null)
      toast({ title: "Signed Out", description: "You have been successfully signed out." })
      router.push("/")
    } catch (error: any) {
      console.error("Error signing out:", error.message)
      toast({ title: "Sign Out Error", description: error.message, variant: "destructive" })
      throw error
    }
  }

  const value = {
    supabase,
    user,
    profile,
    signInWithEmail,
    signInWithGoogle,
    signUpWithEmail,
    signOut,
    isUserLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
