"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import type { SupabaseClient, User, AuthChangeEvent, Session } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client" // Ensure this path is correct
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast" // Assuming you have this

interface AuthContextType {
  supabase: SupabaseClient
  user: User | null
  profile: Profile | null
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<any>
  signInWithGoogle: () => Promise<any>
  signUpWithEmail: (email: string, password: string, fullName: string, username?: string) => Promise<any>
  signOut: () => Promise<any>
  isUserLoading: boolean // Renamed from loading to avoid conflict
}

interface Profile {
  id: string
  username?: string
  full_name?: string
  avatar_url?: string
  website?: string
  // Add other profile fields as needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isUserLoading, setIsUserLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setIsUserLoading(true)
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

    // Check initial session
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
    setIsUserLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      toast({ title: "Success", description: "Signed in successfully!" })
      // User state will be updated by onAuthStateChange
    } catch (error: any) {
      console.error("Error signing in with email:", error.message)
      toast({ title: "Sign In Error", description: error.message, variant: "destructive" })
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setIsUserLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`, // Ensure this callback route is handled
        },
      })
      if (error) throw error
      // User will be redirected to Google, then back to callback.
      // User state will be updated by onAuthStateChange after callback.
    } catch (error: any) {
      console.error("Error signing in with Google:", error.message)
      toast({ title: "Google Sign In Error", description: error.message, variant: "destructive" })
      throw error
    } finally {
      //setIsUserLoading(false); // Loading might persist until redirect or callback
    }
  }

  const signUpWithEmail = async (email: string, password: string, fullName: string, username?: string) => {
    setIsUserLoading(true)
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
            // username: username, // Supabase auth.signUp options.data is for user_metadata
            // username should be handled post-signup by updating the profiles table
            // or ensure your handle_new_user trigger can parse it if you pass it here.
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      if (user && username) {
        // If username is provided, update profile
        const { error: profileError } = await supabase
          .from("profiles")
          .update({ username, full_name: fullName }) // Also ensure full_name is set if trigger missed it
          .eq("id", user.id)
        if (profileError) console.warn("Error setting username post-signup:", profileError.message)
      }
      toast({ title: "Sign Up Successful", description: "Please check your email to confirm your account." })
      // User state will be updated by onAuthStateChange after email confirmation
    } catch (error: any) {
      console.error("Error signing up:", error.message)
      toast({ title: "Sign Up Error", description: error.message, variant: "destructive" })
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  const signOut = async () => {
    setIsUserLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setProfile(null)
      toast({ title: "Signed Out", description: "You have been successfully signed out." })
      router.push("/") // Redirect to home page after sign out
    } catch (error: any) {
      console.error("Error signing out:", error.message)
      toast({ title: "Sign Out Error", description: error.message, variant: "destructive" })
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  const value = {
    supabase,
    user,
    profile,
    loading: isUserLoading, // Use the renamed state
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
