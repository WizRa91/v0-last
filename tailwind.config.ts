import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))", // Standard shadcn border
        input: "hsl(var(--input))", // Standard shadcn input
        ring: "hsl(var(--ring))", // Standard shadcn ring
        background: "hsl(var(--background))", // Standard shadcn background
        foreground: "hsl(var(--foreground))", // Standard shadcn foreground
        primary: {
          // Standard shadcn primary
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          // Standard shadcn secondary
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          // Standard shadcn destructive
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          // Standard shadcn muted
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          // Standard shadcn accent
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          // Standard shadcn popover
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          // Standard shadcn card
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Original custom theme colors (can be kept for other parts of the app or removed if not needed)
        cream: {
          light: "#FDF6E3",
          DEFAULT: "#F5E6D3",
          dark: "#E8D5B7",
        },
        teal: {
          // Original teal palette
          light: "#7DD3C0",
          DEFAULT: "#4FD1C7",
          dark: "#319795",
        },
        brown: {
          light: "#A0826D",
          DEFAULT: "#8B5A3C",
          dark: "#744C3A",
        },

        // New Dark Theme Palette for Sites Page
        "dark-primary-bg": "#1E1E1E",
        "dark-secondary-bg": "#2A2A2A",
        "dark-accent": "#6B7280", // Gray accent
        "dark-text-primary": "#D9D9D9",
        "dark-text-secondary": "#A1A1A1",
        "dark-border": "#3A3A3A",
        "dark-hover-teal": "#5F9EA0", // Specific Teal for hover
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
