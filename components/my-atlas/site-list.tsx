import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { AncientSite } from "@/components/map/types"

interface SiteListProps {
  sites: AncientSite[]
  emptyMessage: string
}

export function SiteList({ sites, emptyMessage }: SiteListProps) {
  if (sites.length === 0) {
    return (
      <div className="p-8 text-center theme-secondary-bg theme-border rounded-lg">
        <p className="theme-secondary-text">{emptyMessage}</p>
        <Link href="/map">
          <Button className="mt-4 theme-button">Explore the Map</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sites.map((site) => (
        <Card
          key={site.id}
          className="theme-secondary-bg theme-border hover:shadow-lg transition-shadow overflow-hidden"
        >
          <Link href={`/sites/${site.slug}`}>
            <img
              src={site.images[0] || "/placeholder.svg"}
              alt={`Image of ${site.name}`}
              className="w-full h-40 object-cover"
            />
          </Link>
          <CardContent className="p-4">
            <h3 className="font-bold theme-text truncate">{site.name}</h3>
            <p className="text-sm theme-secondary-text">{site.location}</p>
            <Link href={`/sites/${site.slug}`} passHref>
              <Button variant="link" className="p-0 h-auto mt-2 text-sm theme-nav-link">
                View Details
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
