"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bookmark, Edit3, FileText, HelpCircle, ShieldCheck, UserCircle, LogOut } from "lucide-react"

// Placeholder data - replace with actual data fetching
const placeholderUserData = {
  bookmarks: [
    { id: "1", name: "Petra", imageUrl: "/placeholder.svg?width=100&height=60" },
    { id: "2", name: "Machu Picchu", imageUrl: "/placeholder.svg?width=100&height=60" },
  ],
  notes: [
    { id: "1", title: "Notes on Roman Aqueducts", site: "Various Roman Sites", date: "2023-05-10" },
    { id: "2", title: "Theories about Stonehenge", site: "Stonehenge", date: "2023-04-22" },
  ],
  aureiBalance: 1250,
  quizHistory: [
    { id: "1", quizName: "Egyptian Mythology Basics", score: "8/10", date: "2023-06-01" },
    { id: "2", quizName: "Ancient Greek Philosophers", score: "10/10", date: "2023-05-15" },
  ],
}

export default function MyAtlasPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/") // Redirect to home if not authenticated
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center theme-primary-bg">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-brown dark:border-dark-text-primary border-t-transparent"></div>
      </div>
    )
  }

  const getInitials = (name: string | undefined | null) => {
    if (!name) return "U"
    const names = name.split(" ")
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const userFullName = user.user_metadata?.full_name || user.email
  const userAvatarUrl = user.user_metadata?.avatar_url

  return (
    <div className="min-h-[calc(100vh-4rem)] theme-primary-bg py-8 px-4 md:px-8">
      <div className="container mx-auto max-w-5xl">
        <Card className="theme-secondary-bg theme-border shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-stone-100 to-stone-200 dark:from-dark-secondary-bg dark:to-dark-accent p-6 border-b theme-border">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20 border-2 theme-border bg-cream dark:bg-dark-primary-bg">
                <AvatarImage src={userAvatarUrl || "/placeholder.svg"} alt={userFullName || "User avatar"} />
                <AvatarFallback className="text-2xl theme-text">{getInitials(userFullName)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-display theme-text">
                  Welcome to Your Atlas, {userFullName}!
                </CardTitle>
                <CardDescription className="theme-secondary-text mt-1">
                  Manage your explorations, notes, and achievements.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Section */}
            <section>
              <h2 className="text-xl font-semibold mb-3 theme-text flex items-center">
                <UserCircle className="mr-2 h-5 w-5 theme-secondary-text" />
                Profile Overview
              </h2>
              <div className="space-y-2 p-4 rounded-lg theme-primary-bg theme-border">
                <p className="theme-secondary-text">
                  <strong className="theme-text">Email:</strong> {user.email}
                </p>
                <p className="theme-secondary-text">
                  <strong className="theme-text">Joined:</strong> {new Date(user.created_at).toLocaleDateString()}
                </p>
                <Button variant="outline" className="mt-2 theme-button-outline w-full sm:w-auto">
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </div>
            </section>

            {/* Aurei Balance */}
            <section>
              <h2 className="text-xl font-semibold mb-3 theme-text flex items-center">
                <img src="/images/aurei_icon.png" alt="Aurei coin" className="mr-2 h-5 w-5" />{" "}
                {/* Replace with actual Aurei icon */}
                Aurei Balance
              </h2>
              <div className="p-4 rounded-lg theme-primary-bg theme-border">
                <p className="text-3xl font-bold theme-text">
                  {placeholderUserData.aureiBalance.toLocaleString()} <span className="text-lg font-normal">Aurei</span>
                </p>
                <Button variant="outline" className="mt-2 theme-button-outline w-full sm:w-auto">
                  View Transactions
                </Button>
              </div>
            </section>

            {/* Bookmarked Sites */}
            <section className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-3 theme-text flex items-center">
                <Bookmark className="mr-2 h-5 w-5 theme-secondary-text" />
                Bookmarked Sites
              </h2>
              {placeholderUserData.bookmarks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {placeholderUserData.bookmarks.map((site) => (
                    <Card key={site.id} className="theme-primary-bg theme-border hover:shadow-md transition-shadow">
                      <img
                        src={site.imageUrl || "/placeholder.svg"}
                        alt={site.name}
                        className="w-full h-24 object-cover rounded-t-lg"
                      />
                      <CardContent className="p-3">
                        <p className="font-medium theme-text truncate">{site.name}</p>
                        <Button variant="link" className="p-0 h-auto text-sm theme-nav-link">
                          View Site
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="theme-secondary-text p-4 rounded-lg theme-primary-bg theme-border">
                  You haven't bookmarked any sites yet.
                </p>
              )}
            </section>

            {/* My Notes */}
            <section className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-3 theme-text flex items-center">
                <FileText className="mr-2 h-5 w-5 theme-secondary-text" />
                My Notes
              </h2>
              {placeholderUserData.notes.length > 0 ? (
                <ul className="space-y-3">
                  {placeholderUserData.notes.map((note) => (
                    <li
                      key={note.id}
                      className="p-3 rounded-lg theme-primary-bg theme-border flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium theme-text">{note.title}</p>
                        <p className="text-xs theme-secondary-text">
                          {note.site} - {note.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="theme-button-outline">
                        View Note
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="theme-secondary-text p-4 rounded-lg theme-primary-bg theme-border">
                  You haven't created any notes yet.
                </p>
              )}
            </section>

            {/* Account Settings & Security */}
            <section>
              <h2 className="text-xl font-semibold mb-3 theme-text flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5 theme-secondary-text" />
                Account Security
              </h2>
              <div className="space-y-2 p-4 rounded-lg theme-primary-bg theme-border">
                <Button variant="outline" className="w-full theme-button-outline">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full theme-button-outline">
                  Manage Email Preferences
                </Button>
              </div>
            </section>

            {/* Help & Support */}
            <section>
              <h2 className="text-xl font-semibold mb-3 theme-text flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 theme-secondary-text" />
                Help & Support
              </h2>
              <div className="space-y-2 p-4 rounded-lg theme-primary-bg theme-border">
                <Button variant="outline" className="w-full theme-button-outline">
                  FAQ
                </Button>
                <Button variant="outline" className="w-full theme-button-outline">
                  Contact Support
                </Button>
              </div>
            </section>
          </CardContent>
        </Card>
        <div className="mt-8 text-center">
          <Button
            onClick={signOut}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
