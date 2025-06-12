import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const ProfileHeader = () => {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <Avatar>
        <AvatarImage src="/placeholder-user.jpg" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-semibold">User Name</h2>
        <p className="text-sm text-muted-foreground">user.email@example.com</p>
      </div>
    </div>
  )
}
