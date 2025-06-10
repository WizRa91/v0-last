export interface Rebus {
  id: string
  siteId: string
  imageUrl: string
  answer: string
  hint?: string
}

const rebuses: Rebus[] = [
  {
    id: "rebus-petra-1",
    siteId: "petra",
    imageUrl: "/images/rebus-petra-new.png",
    answer: "The Nabataeans",
    hint: "An ancient Arab people who inhabited northern Arabia and the Southern Levant, and whose capital was Petra.",
  },
  // Future rebuses for other sites can be added here
]

export const getRebusForSite = (siteId: string): Rebus | null => {
  return rebuses.find((r) => r.siteId === siteId) || null
}
