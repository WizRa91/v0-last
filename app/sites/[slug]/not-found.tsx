import Link from "next/link"

export default function SiteNotFound() {
  return (
    <div className="min-h-screen bg-cream dark:bg-dark-primary-bg flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="text-6xl">🏛️</div>
        <h1 className="text-3xl font-bold font-['Cinzel'] text-brown dark:text-dark-text-primary">Site Not Found</h1>
        <p className="text-lg text-brown/80 dark:text-dark-text-secondary font-['Montserrat']">
          The ancient site you're looking for seems to have been lost to time. Perhaps it was never discovered, or the
          path has been forgotten.
        </p>
        <div className="space-y-3">
          <Link
            href="/map"
            className="inline-block px-6 py-3 bg-teal hover:bg-teal-dark text-white rounded-lg font-['Montserrat'] font-medium transition-colors"
          >
            Explore the Map
          </Link>
          <div>
            <Link
              href="/"
              className="text-brown dark:text-dark-text-primary hover:text-teal dark:hover:text-teal-light underline font-['Montserrat']"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
