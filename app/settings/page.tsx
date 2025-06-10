import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Mail } from "lucide-react"

export default async function SettingsPage() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-[calc(100vh-4rem)] theme-primary-bg py-8 px-4 md:px-8">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl font-display theme-text mb-8">Settings</h1>
        <div className="grid gap-8">
          {/* Profile Settings */}
          <Card className="theme-secondary-bg theme-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 theme-text">
                <User /> Profile Information
              </CardTitle>
              <CardDescription className="theme-secondary-text">Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="theme-text">
                  Full Name
                </Label>
                <Input id="fullName" defaultValue={profile?.full_name || ""} className="theme-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="theme-text">
                  Username
                </Label>
                <Input id="username" defaultValue={profile?.username || ""} className="theme-input" />
              </div>
              <Button className="theme-button">Save Changes</Button>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="theme-secondary-bg theme-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 theme-text">
                <Mail /> Account
              </CardTitle>
              <CardDescription className="theme-secondary-text">Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="theme-text">
                  Email Address
                </Label>
                <Input id="email" type="email" value={user.email || ""} disabled className="theme-input" />
              </div>
              <Separator className="theme-border" />
              <div>
                <h4 className="font-medium theme-text">Change Password</h4>
                <p className="text-sm theme-secondary-text mb-2">Set a new password for your account.</p>
                <Button variant="outline" className="theme-button-outline">
                  Set New Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
