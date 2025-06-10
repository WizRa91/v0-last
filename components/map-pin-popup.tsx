"use client"

import type React from "react"
import { useTheme } from "./theme-provider"
import type { Site } from "./map/types"

interface MapPinPopupProps {
  site: Site
  onReadMore: (siteSlug: string) => void
}

export default function MapPinPopup({ site, onReadMore }: MapPinPopupProps) {
  const { theme } = useTheme()
  const isDark =
    theme === "dark" ||
    (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onReadMore(site.slug)
  }

  // Dynamic color schemes
  const colors = {
    background: isDark ? "#2A2A2A" : "#F8F0E3",
    text: isDark ? "#D9D9D9" : "#8C6F5A",
    textSecondary: isDark ? "#A1A1A1" : "#8C6F5A",
    buttonBg: isDark ? "#6B7280" : "#4A7A7A",
    buttonHover: isDark ? "#5F9EA0" : "#8C6F5A",
    buttonText: "#FFFFFF",
  }

  const containerStyle: React.CSSProperties = {
    fontFamily: '"Montserrat", sans-serif',
    background: colors.background,
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
  }

  const titleStyle: React.CSSProperties = {
    fontFamily: '"Cinzel", serif',
    fontSize: "18px",
    fontWeight: 600,
    color: colors.text,
    margin: 0,
    lineHeight: 1.3,
    maxWidth: "180px",
    wordWrap: "break-word",
  }

  const typeStyle: React.CSSProperties = {
    fontSize: "11px",
    color: colors.textSecondary,
    marginBottom: "4px",
    fontFamily: '"Montserrat", sans-serif',
    textAlign: "right" as const,
    whiteSpace: "nowrap" as const,
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: "14px",
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: 1.5,
    color: colors.text,
    margin: "0 16px 16px 16px",
    textAlign: "left" as const,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  }

  const buttonStyle: React.CSSProperties = {
    display: "inline-block",
    backgroundColor: colors.buttonBg,
    color: colors.buttonText,
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 500,
    margin: "0 16px 16px 16px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.3s ease",
    boxShadow: isDark
      ? "3px 3px 6px rgba(0, 0, 0, 0.3), -3px -3px 6px rgba(42, 42, 42, 0.5)"
      : "3px 3px 6px rgba(140, 111, 90, 0.3), -3px -3px 6px rgba(248, 240, 227, 0.5)",
    position: "relative" as const,
    overflow: "hidden",
  }

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "200px",
    objectFit: "cover" as const,
    borderRadius: "12px 12px 0 0",
    display: "block",
    transition: "transform 0.3s ease",
  }

  const headerStyle: React.CSSProperties = {
    padding: "16px 16px 8px 16px",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }

  return (
    <div className="site-popup" style={containerStyle}>
      <img
        src={site.cover_image || "/placeholder.svg?height=200&width=300"}
        alt={site.name}
        loading="lazy"
        style={imageStyle}
      />

      <div style={headerStyle}>
        <h3 style={titleStyle}>{site.name}</h3>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={typeStyle}>{site.type}</span>
          {site.rating && <span style={typeStyle}>★ {site.rating}/5</span>}
        </div>
      </div>

      {site.blurb && (
        <p style={descriptionStyle}>{site.blurb.length > 120 ? `${site.blurb.substring(0, 120)}...` : site.blurb}</p>
      )}

      <button
        onClick={handleReadMoreClick}
        type="button"
        aria-label={`Read more about ${site.name}`}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = colors.buttonHover
          e.currentTarget.style.transform = "translateY(-1px)"
          e.currentTarget.style.boxShadow = isDark
            ? "4px 4px 8px rgba(0, 0, 0, 0.4), -4px -4px 8px rgba(42, 42, 42, 0.6)"
            : "4px 4px 8px rgba(140, 111, 90, 0.4), -4px -4px 8px rgba(248, 240, 227, 0.6)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = colors.buttonBg
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = isDark
            ? "3px 3px 6px rgba(0, 0, 0, 0.3), -3px -3px 6px rgba(42, 42, 42, 0.5)"
            : "3px 3px 6px rgba(140, 111, 90, 0.3), -3px -3px 6px rgba(248, 240, 227, 0.5)"
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.boxShadow = isDark
            ? "2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(42, 42, 42, 0.5)"
            : "2px 2px 4px rgba(140, 111, 90, 0.3), -2px -2px 4px rgba(248, 240, 227, 0.5)"
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = isDark ? "2px solid #5F9EA0" : "2px solid #4A7A7A"
          e.currentTarget.style.outlineOffset = "2px"
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = "none"
        }}
      >
        Read More
      </button>
    </div>
  )
}
