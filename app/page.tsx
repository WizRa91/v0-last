import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Map, BookOpen, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream-light">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal to-teal-dark text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-cream">Archaic Knowledge</h1>
          <p className="text-xl md:text-2xl mb-8 text-cream-light max-w-3xl mx-auto">
            Discover the hidden legacy of antiquity. Explore ancient sites and revived ancient texts through our
            interactive world map.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/map">
              <Button size="lg" className="bg-cream text-brown hover:bg-cream-dark text-lg px-8 py-4">
                <Map className="mr-2 h-5 w-5" />
                Explore Interactive Map
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-cream text-cream hover:bg-cream hover:text-brown text-lg px-8 py-4"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-brown mb-12">Explore Ancient Wonders</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <Globe className="h-12 w-12 text-teal mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brown mb-3">Interactive World Map</h3>
              <p className="text-gray-600">
                Navigate through ancient sites across all continents with our detailed interactive map featuring precise
                locations and rich information.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <BookOpen className="h-12 w-12 text-teal mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brown mb-3">Detailed Site Information</h3>
              <p className="text-gray-600">
                Access comprehensive details about each ancient site including historical context, archaeological
                significance, and visitor information.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-lg">
              <Users className="h-12 w-12 text-teal mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brown mb-3">Community Features</h3>
              <p className="text-gray-600">
                Take quizzes, bookmark favorite sites, and share your discoveries with fellow explorers of ancient
                knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brown text-cream">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Begin Your Journey Through Time</h2>
          <p className="text-xl mb-8 text-cream-light">
            From Stonehenge to Machu Picchu, from the Pyramids of Giza to Easter Island - discover the mysteries that
            have captivated humanity for millennia.
          </p>
          <Link href="/map">
            <Button size="lg" className="bg-teal hover:bg-teal-dark text-white text-lg px-8 py-4">
              <Map className="mr-2 h-5 w-5" />
              Start Exploring Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
