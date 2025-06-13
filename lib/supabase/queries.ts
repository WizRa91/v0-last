import type { Site } from "@/components/map/types" // Corrected import path for Site type

export async function getSites(): Promise<Site[]> {
  console.log("Simplified getSites called - returning mock data")
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "test-1",
          slug: "test-site-1",
          name: "Test Site 1",
          blurb: "A test site for filtering.", // Added blurb
          description_short: "A test site.",
          description_long: "A longer description for this test site.",
          categories: ["Ancient Civilization", "Test Category"], // Ensured categories is an array
          region: "Test Region",
          country: "Test Country",
          latitude: 34.0522,
          longitude: -118.2437,
          image_url_small: "/placeholder.svg?width=100&height=100",
          image_url_large: "/placeholder.svg?width=800&height=600",
          tags: ["test", "example"],
          significance: "Testing purposes",
          period: "Ancient",
          unesco_heritage: false,
          related_sites: [],
          discovery_date: "N/A",
          visitor_info: "N/A",
          map_zoom_level: 10,
          priority: 1,
          gallery_images: [],
          interactive_elements: [],
          coordinates: { lat: 34.0522, lng: -118.2437 },
        } as Site,
      ])
    }, 50)
  })
}

export async function getSiteBySlug(slug: string): Promise<Site | null> {
  console.log(`Simplified getSiteBySlug called with slug: ${slug}`)
  if (slug === "test-site-1") {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "test-1",
          slug: "test-site-1",
          name: "Test Site 1",
          blurb: "A test site for filtering.",
          description_short: "A test site.",
          description_long: "A longer description for this test site.",
          categories: ["Ancient Civilization", "Test Category"],
          region: "Test Region",
          country: "Test Country",
          latitude: 34.0522,
          longitude: -118.2437,
          image_url_small: "/placeholder.svg?width=100&height=100",
          image_url_large: "/placeholder.svg?width=800&height=600",
          tags: ["test", "example"],
          significance: "Testing purposes",
          period: "Ancient",
          unesco_heritage: false,
          related_sites: [],
          discovery_date: "N/A",
          visitor_info: "N/A",
          map_zoom_level: 10,
          priority: 1,
          gallery_images: [],
          interactive_elements: [],
          coordinates: { lat: 34.0522, lng: -118.2437 },
        } as Site)
      }, 50)
    })
  }
  return null
}
