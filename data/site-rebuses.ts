export interface RebusQuestion {
  id: string
  imageUrl: string
  answer: string
  hint?: string
}

export interface SiteRebus {
  siteId: string
  rebuses: RebusQuestion[]
}

export const siteRebuses: SiteRebus[] = [
  {
    siteId: "petra",
    rebuses: [
      {
        id: "petra-rebus-1",
        imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IQtYHBfpkJTJ5HZPRaqMPVEzA9afpv.png",
        answer: "the nabataeans",
        hint: "Ancient civilization that built Petra",
      },
    ],
  },
  {
    siteId: "machu-picchu",
    rebuses: [
      {
        id: "machu-picchu-rebus-1",
        imageUrl: "/placeholder.svg?height=300&width=500",
        answer: "inca empire",
        hint: "Ancient civilization that built Machu Picchu",
      },
    ],
  },
]

export function getRebusForSite(siteId: string): RebusQuestion | null {
  const siteRebus = siteRebuses.find((sr) => sr.siteId === siteId)
  if (!siteRebus || siteRebus.rebuses.length === 0) return null

  // For now, just return the first rebus for the site
  return siteRebus.rebuses[0]
}
