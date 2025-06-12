"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useEffect, useState } from "react"
import { sitesData } from "@/components/map/site-data"
import Map from "@/components/map/map"

const WantToGoPage = () => {
  const { user, isLoading } = useUser()
  const [siteIds, setSiteIds] = useState<string[]>([])

  useEffect(() => {
    const fetchUserSites = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/get-user-sites?email=${user.email}`)
          if (response.ok) {
            const data = await response.json()
            setSiteIds(data.sites || [])
          } else {
            console.error("Failed to fetch user sites")
          }
        } catch (error) {
          console.error("Error fetching user sites:", error)
        }
      }
    }

    fetchUserSites()
  }, [user])

  const userSites = sitesData.filter((site) => siteIds.includes(site.slug))

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : user ? (
        <div>
          <h1>My Want to Go Sites</h1>
          <Map sites={userSites} />
        </div>
      ) : (
        <div>Please log in to see your want to go sites.</div>
      )}
    </div>
  )
}

export default WantToGoPage
