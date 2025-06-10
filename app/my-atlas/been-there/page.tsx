import { auth } from "@clerk/nextjs"

import { Map } from "@/components/map/map"
import { sitesData } from "@/components/map/site-data"
import { ProfileHeader } from "@/components/profile-header"
import { Shell } from "@/components/shell"
import { useUserSites } from "@/hooks/use-user-sites"

const BeenTherePage = async () => {
  const { userId } = auth()

  if (!userId) {
    return (
      <Shell>
        <ProfileHeader name="Been There" description="Log in to see the places you've been." />
        <div className="relative h-[600px] w-full">
          <Map sites={[]} />
        </div>
      </Shell>
    )
  }

  const { data: siteIds } = await useUserSites(userId)

  const userSites = sitesData.filter((site) => siteIds.includes(site.slug))

  return (
    <Shell>
      <ProfileHeader name="Been There" description="See the places you've been." />
      <div className="relative h-[600px] w-full">
        <Map sites={userSites} />
      </div>
    </Shell>
  )
}

export default BeenTherePage
