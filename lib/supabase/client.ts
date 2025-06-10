import { createBrowserClient } from "@supabase/ssr"

// Ensure your environment variables are correctly named and accessible
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL")
}
if (!supabaseAnonKey) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

// Create a singleton Supabase client for the browser
export const supabase = createBrowserClient(supabaseUrl!, supabaseAnonKey!)
