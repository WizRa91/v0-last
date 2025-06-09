import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe, BookOpen, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-light">
      {/* Header */}
      <header className="bg-brown text-cream py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center text-cream hover:text-teal transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Link href="/map">
            <Button className="bg-teal hover:bg-teal-dark text-white">Explore Map</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-brown mb-6">About Archaic Knowledge</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Dedicated to preserving and sharing the mysteries of our ancient past through interactive exploration and
            education.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brown mb-6">Our Mission</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              Archaic Knowledge is a digital platform dedicated to making ancient sites and archaeological wonders
              accessible to everyone. We believe that understanding our past is crucial to appreciating our present and
              shaping our future.
            </p>
            <p className="mb-6">
              Through our interactive world map and comprehensive site database, we aim to bridge the gap between
              academic archaeology and public interest, making ancient knowledge accessible to curious minds worldwide.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brown mb-8">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Globe className="h-10 w-10 text-teal mb-4" />
              <h3 className="text-xl font-bold text-brown mb-3">Interactive Mapping</h3>
              <p className="text-gray-600">
                Explore ancient sites through our detailed interactive map with precise coordinates, filtering options,
                and immersive site information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <BookOpen className="h-10 w-10 text-teal mb-4" />
              <h3 className="text-xl font-bold text-brown mb-3">Rich Content</h3>
              <p className="text-gray-600">
                Access detailed historical information, archaeological insights, and cultural context for each ancient
                site in our database.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Users className="h-10 w-10 text-teal mb-4" />
              <h3 className="text-xl font-bold text-brown mb-3">Community Features</h3>
              <p className="text-gray-600">
                Engage with interactive quizzes, bookmark your favorite sites, and share discoveries with fellow
                archaeology enthusiasts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Award className="h-10 w-10 text-teal mb-4" />
              <h3 className="text-xl font-bold text-brown mb-3">Educational Focus</h3>
              <p className="text-gray-600">
                Learn through gamified experiences and earn rewards while expanding your knowledge of ancient
                civilizations and cultures.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brown mb-6">Our Approach</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-700 mb-4">
              We combine cutting-edge web technology with rigorous archaeological research to create an engaging and
              educational experience. Our platform is designed to be accessible to everyone, from casual history
              enthusiasts to serious researchers.
            </p>
            <p className="text-gray-700 mb-4">
              Every site in our database is carefully researched and verified using reliable archaeological sources. We
              strive to present accurate, up-to-date information while making it engaging and easy to understand.
            </p>
            <p className="text-gray-700">
              Our interactive features, including quizzes and community tools, are designed to enhance learning and
              create a sense of discovery that mirrors the excitement of archaeological exploration.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-teal text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-xl mb-6">Join thousands of explorers discovering the wonders of our ancient world.</p>
          <Link href="/map">
            <Button size="lg" className="bg-white text-teal hover:bg-cream">
              Start Your Journey
            </Button>
          </Link>
        </section>
      </main>
    </div>
  )
}
