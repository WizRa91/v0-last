import type React from "react"
import "./globals.css"
import { cinzel, montserrat } from "./fonts"
import type { Metadata, Viewport } from "next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers as AppProviders } from "./providers" // Renamed to avoid conflict
import { AuthProvider } from "@/hooks/useAuth" // Import AuthProvider
import { Header } from "@/components/header" // Import the new Header

export const metadata: Metadata = {
  title: {
    template: "%s | Archaic Knowledge",
    default: "Archaic Knowledge | Explore Ancient Sites",
  },
  description: "Discover the hidden legacy of antiquity. Explore ancient sites and revived ancient texts.",
  keywords: ["archaic knowledge", "ancient sites", "geology", "exploration", "interactive map"],
  authors: [{ name: "Archaic Knowledge Team" }],
  creator: "Archaic Knowledge",
  publisher: "Archaic Knowledge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://archaic-knowledge.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Archaic Knowledge | Explore Ancient Sites",
    description: "Discover the hidden legacy of antiquity. Explore ancient sites and revived ancient texts.",
    siteName: "Archaic Knowledge",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Archaic Knowledge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archaic Knowledge | Explore Ancient Sites",
    description: "Discover the hidden legacy of antiquity. Explore ancient sites and revived ancient texts.",
    images: ["/images/twitter-image.jpg"],
    creator: "@archaic_knowledge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F0E3" },
    { media: "(prefers-color-scheme: dark)", color: "#8C6F5A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
      </head>
      <body
        className={`${cinzel.variable} ${montserrat.variable} font-body min-h-screen bg-cream text-brown dark:bg-dark-primary-bg dark:text-dark-text-primary`}
      >
        <AppProviders>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
              <Header />
              <main>{children}</main>
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </AppProviders>
      </body>
    </html>
  )
}
