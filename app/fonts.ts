import { Cinzel, Montserrat } from "next/font/google"

/**
 * Cinzel - Serif font used for headings and titles
 *
 * A display serif typeface inspired by classical Roman inscriptions
 * Used for: Headers, titles, and prominent text elements
 */
export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
  display: "swap",
  preload: true,
})

/**
 * Montserrat - Sans-serif font used for body text
 *
 * A geometric sans-serif typeface with urban inspiration
 * Used for: Body text, paragraphs, UI elements, and general content
 */
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
})
