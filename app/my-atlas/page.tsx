import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bookmark, Flag, Star, Settings } from "lucide-react"
import { SignOutButton } from "@/components/auth/sign-out-button"

interface InteractionCount {
  been_there: number
  want_to_go: number
  bookmark: number
}

export default async function MyAtlasPage() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  const { data: profile } = await supabase.from("profiles").select("full_name, avatar_url").eq("id", user.id).single()

  const { data: interactions } = await supabase
    .from("user_interactions")
    .select("interaction_type")
    .eq("user_id", user.id)

  const counts: InteractionCount = (interactions || []).reduce(
    (acc, { interaction_type }) => {
      if (interaction_type === "been_there") acc.been_there++
      if (interaction_type === "want_to_go") acc.want_to_go++
      if (interaction_type === "bookmark") acc.bookmark++
      return acc
    },
    { been_there: 0, want_to_go: 0, bookmark: 0 },
  )

  const getInitials = (name: string | undefined | null) => {
    if (!name) return "U"
    const names = name.split(" ")
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const userFullName = profile?.full_name || user.email
  const userAvatarUrl = profile?.avatar_url

  return (
    <div className="min-h-[calc(100vh-4rem)] theme-primary-bg py-8 px-4 md:px-8">
      <div className="container mx-auto max-w-4xl">
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-2 theme-border bg-cream dark:bg-dark-primary-bg">
              <AvatarImage src={userAvatarUrl || undefined} alt={userFullName || "User avatar"} />
              <AvatarFallback className="text-2xl theme-text">{getInitials(userFullName)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-display theme-text">My Atlas</h1>
              <p className="theme-secondary-text mt-1">Welcome back, {userFullName}!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/settings">
              <Button variant="outline" className="theme-button-outline">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Button>
            </Link>
            <SignOutButton />
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/my-atlas/been-there" className="block">
            <Card className="theme-secondary-bg theme-border hover:shadow-lg hover:-translate-y-1 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium theme-text">Been There</CardTitle>
                <Flag className="h-4 w-4 theme-secondary-text" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold theme-text">{counts.been_there}</div>
                <p className="text-xs theme-secondary-text">sites you've visited</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/my-atlas/want-to-go" className="block">
            <Card className="theme-secondary-bg theme-border hover:shadow-lg hover:-translate-y-1 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium theme-text">Want to Go</CardTitle>
                <Star className="h-4 w-4 theme-secondary-text" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold theme-text">{counts.want_to_go}</div>
                <p className="text-xs theme-secondary-text">sites on your wishlist</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/my-atlas/bookmarks" className="block">
            <Card className="theme-secondary-bg theme-border hover:shadow-lg hover:-translate-y-1 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium theme-text">Bookmarked Sites</CardTitle>
                <Bookmark className="h-4 w-4 theme-secondary-text" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold theme-text">{counts.bookmark}</div>
                <p className="text-xs theme-secondary-text">sites you've saved</p>
              </CardContent>
            </Card>
          </Link>
        </main>

        <section className="mt-12">
          <h2 className="text-2xl font-display theme-text mb-4">Recent Activity</h2>
          <div className="p-8 text-center theme-secondary-bg theme-border rounded-lg">
            <p className="theme-secondary-text">Your recent activity will be displayed here.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
