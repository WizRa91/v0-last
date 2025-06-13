"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Share2,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Globe,
  Mountain,
  Pyramid,
  PaintBucket,
  Landmark,
  ArrowLeft,
  MapIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { Site as SiteType } from "./map/types"
// REMOVE: import { sitesData } from "@/components/map/integrated-map" // Problematic import removed

interface NavItemProps {
  icon: React.ReactNode
  label: string
  count?: number
  isActive?: boolean
  hasSubmenu?: boolean
  hasDropdown?: boolean
  isDropdownOpen?: boolean
  onDropdownToggle?: () => void
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  count,
  isActive,
  hasSubmenu,
  hasDropdown,
  isDropdownOpen,
  onDropdownToggle,
  onClick,
}) => {
  const handleClick = () => {
    if (hasDropdown && onDropdownToggle) {
      onDropdownToggle()
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <div onClick={handleClick} className={`nav-item ${isActive ? "active" : ""}`}>
      <div className="flex items-center gap-3">
        <div className={`nav-item-icon ${isActive ? "text-white" : ""}`}>{icon}</div>
        <span className="font-['Montserrat'] font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {count != null && <span className={`nav-item-count ${isActive ? "bg-white/20 text-white" : ""}`}>{count}</span>}
        {hasDropdown && (
          <div className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
            <ChevronDown className={`h-4 w-4 ${isActive ? "text-white" : ""}`} />
          </div>
        )}
        {hasSubmenu && !hasDropdown && (
          <ChevronUp className={`h-4 w-4 transition-transform ${isActive ? "text-white" : ""}`} />
        )}
      </div>
    </div>
  )
}

interface SiteCardProps {
  site: SiteType
  onSiteClick: (siteSlug: string) => void
}

const SiteCard: React.FC<SiteCardProps> = ({ site, onSiteClick }) => {
  return (
    <div className="site-card" onClick={() => onSiteClick(site.slug)}>
      <div className="flex-1">
        <h3 className="site-card-title">{site.name}</h3>
        {site.blurb && <p className="site-card-description">{site.blurb}</p>}
      </div>
      <div className="relative">
        <img
          src={site.cover_image || "/placeholder.svg?width=100&height=80&query=ancient+site"}
          alt={site.name}
          className="site-card-image"
        />
        {site.media && site.media.length > 1 && (
          <div className="absolute top-1 right-1 theme-accent text-[var(--custom-button-text)] text-xs px-1.5 py-0.5 rounded font-['Montserrat']">
            {site.media.length}
          </div>
        )}
      </div>
    </div>
  )
}

interface InteractiveSidebarProps {
  searchText: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  activeCategory: string
  onCategoryChange: (category: string) => void
  totalSites: number
  filteredSites: number
  sitesForCategoryView: SiteType[]
  allSites: SiteType[] // Added prop for all sites data
}

const InteractiveSidebar: React.FC<InteractiveSidebarProps> = ({
  searchText,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  totalSites,
  filteredSites,
  sitesForCategoryView,
  allSites, // Use this prop
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isUpperExpanded, setIsUpperExpanded] = useState(false)
  const [isBottomExpanded, setIsBottomExpanded] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true)
  const [showingSites, setShowingSites] = useState(false)
  const [localCategorySites, setLocalCategorySites] = useState<SiteType[]>([])
  const [isLoadingSites, setIsLoadingSites] = useState(false)
  const router = useRouter()

  const baseNavigationItems = [
    {
      id: "all",
      label: "All Sites",
      icon: <Globe className="h-5 w-5" />,
      hasDropdown: true,
    },
    { id: "ancient_ruins", label: "Ancient Ruins", icon: <Pyramid className="h-5 w-5" /> },
    { id: "rock_art", label: "Rock Art", icon: <PaintBucket className="h-5 w-5" /> },
    { id: "megaliths", label: "Megaliths", icon: <Landmark className="h-5 w-5" /> },
    { id: "geoglyphs", label: "Geoglyphs", icon: <MapIcon className="h-5 w-5" /> },
    { id: "unusual_formations", label: "Unusual Formations", icon: <Mountain className="h-5 w-5" /> },
  ]

  const navigationItems = baseNavigationItems.map((item) => {
    if (item.id === "all") {
      return { ...item, count: totalSites }
    }
    // Ensure allSites is an array before filtering
    const categoryCount = Array.isArray(allSites)
      ? allSites.filter((site) => site.categories && site.categories.includes(item.id)).length
      : 0
    return { ...item, count: categoryCount }
  })

  useEffect(() => {
    if (activeCategory !== "all" && showingSites) {
      if (!sitesForCategoryView || sitesForCategoryView.length === 0) {
        // Ensure allSites is an array before filtering
        const filtered = Array.isArray(allSites)
          ? allSites.filter((site) => site.categories && site.categories.includes(activeCategory))
          : []
        setLocalCategorySites(filtered)
      } else {
        setLocalCategorySites(sitesForCategoryView)
      }
    }
  }, [activeCategory, sitesForCategoryView, showingSites, allSites])

  const fetchCategorySites = async (category: string) => {
    if (category === "all") {
      onCategoryChange("all")
      setShowingSites(false)
      return
    }

    setIsLoadingSites(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 100))
      // Ensure allSites is an array before filtering
      const filtered = Array.isArray(allSites)
        ? allSites.filter((site) => site.categories && site.categories.includes(category))
        : []
      setLocalCategorySites(filtered)
      onCategoryChange(category)
      setShowingSites(true)
    } catch (err) {
      console.error("Error:", err)
      toast.error("An error occurred while loading sites")
    } finally {
      setIsLoadingSites(false)
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    fetchCategorySites(categoryId)
  }

  const handleBackToNavigation = () => {
    setShowingSites(false)
    onCategoryChange("all")
  }

  const handleSiteClick = (siteSlug: string) => {
    router.push(`/sites/${siteSlug}`)
  }

  const handleShare = async () => {
    const shareData = {
      title: "Ancient Sites Explorer",
      text: "Explore ancient sites around the world with this interactive map!",
      url: window.location.href,
    }
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.error("Web Share API failed:", error)
        if (error instanceof DOMException && error.name === "AbortError") return
        fallbackToClipboard(shareData.url)
      }
    } else {
      fallbackToClipboard(shareData.url)
    }
  }

  const fallbackToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard!")
    } catch (copyError) {
      console.error("Failed to copy to clipboard:", copyError)
      toast.error("Could not copy link to clipboard.")
    }
  }

  const currentCategorySites = showingSites
    ? localCategorySites.length > 0
      ? localCategorySites
      : sitesForCategoryView || []
    : []

  return (
    <>
      {!isCollapsed && (
        <div className="sidebar">
          <div className="sidebar-header">
            {showingSites && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToNavigation}
                className="text-[var(--custom-button-text)] hover:bg-[var(--custom-button-text)]/10 mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              <Input
                type="text"
                value={searchText}
                onChange={onSearchChange}
                placeholder="Search ancient sites..."
                className="search-input text-white"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-[var(--custom-button-text)] hover:bg-[var(--custom-button-text)]/10"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {showingSites ? (
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 border-b border-[#CDAF87]/30 dark:border-[#3A3A3A] bg-[#CDAF87]/20 dark:bg-[#3A3A3A]/20">
                <h2 className="font-['Cinzel'] font-semibold theme-text">
                  {navigationItems.find((item) => item.id === activeCategory)?.label}
                  <span className="text-sm theme-secondary-text ml-2 font-['Montserrat']">
                    ({currentCategorySites.length} sites)
                  </span>
                </h2>
              </div>

              {isLoadingSites ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p className="loading-text">Loading sites...</p>
                </div>
              ) : (
                <div>
                  {currentCategorySites.map((site) => (
                    <SiteCard key={site.slug} site={site} onSiteClick={handleSiteClick} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="relative">
                {!isBottomExpanded && (
                  <div className="p-6 border-b border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 theme-accent rounded-lg flex items-center justify-center shadow-[3px_3px_6px_rgba(74,122,122,0.3)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3)] text-[var(--custom-button-text)]">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h1 className="font-['Cinzel'] text-xl font-bold theme-text">Ancient Sites Explorer</h1>
                        <p className="text-sm theme-secondary-text font-['Montserrat']">Interactive World Map</p>
                      </div>
                    </div>
                    <div className="theme-text text-sm leading-relaxed font-['Montserrat']">
                      <p className={`${!isUpperExpanded ? "line-clamp-3" : ""}`}>
                        Discover remarkable ancient sites, mysterious formations, and archaeological wonders from around
                        the world. Our interactive map features carefully curated locations with detailed information
                        about each site's history, significance, and current research.
                        {!isUpperExpanded && (
                          <span className="opacity-50">
                            {" "}
                            From the towering megaliths of Stonehenge to the intricate rock art...
                          </span>
                        )}
                        {isUpperExpanded && (
                          <>
                            <br /> <br />
                            From the towering megaliths of Stonehenge to the intricate rock art of ancient
                            civilizations, each location tells a unique story of human ingenuity and cultural heritage.
                            Navigate through different categories to explore sites that match your interests.
                            <br /> <br />
                            Use the search function to find specific locations, or browse by category to discover new
                            and fascinating places. Click on any marker to learn more about the site's history, view
                            images, and read detailed articles about recent discoveries and ongoing research.
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-xs theme-secondary-text font-['Montserrat']">
                        Showing {filteredSites} of {totalSites} sites
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsUpperExpanded(!isUpperExpanded)}
                        className="theme-text hover:theme-accent-text hover:bg-[var(--custom-border)]/30 ml-auto"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
                {isBottomExpanded && (
                  <div className="absolute top-0 left-0 right-0 theme-secondary-bg z-50 border-b border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                    <div className="theme-accent p-4 flex items-center justify-between text-[var(--custom-button-text)]">
                      <h2 className="text-white font-['Cinzel'] font-semibold">Navigation</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsBottomExpanded(false)}
                        className="text-[var(--custom-button-text)] hover:bg-[var(--custom-hover)]"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="divide-y divide-[#CDAF87]/20 dark:divide-[#3A3A3A]">
                      {navigationItems.map((item, index) => (
                        <NavItem
                          key={item.id}
                          icon={item.icon}
                          label={item.label}
                          count={item.count}
                          isActive={activeCategory === item.id}
                          hasDropdown={item.hasDropdown}
                          isDropdownOpen={index === 0 ? isCategoriesOpen : undefined} // Only first item has dropdown state
                          onDropdownToggle={index === 0 ? () => setIsCategoriesOpen(!isCategoriesOpen) : undefined}
                          onClick={() => handleCategoryClick(item.id)}
                        />
                      ))}
                      {isCategoriesOpen &&
                        navigationItems
                          .slice(1) // Assuming "All Sites" is the first item and categories follow
                          .filter((item) => !item.hasDropdown) // Filter out items that are themselves dropdowns if any
                          .map((item) => (
                            <NavItem
                              key={item.id}
                              icon={item.icon}
                              label={item.label}
                              count={item.count}
                              isActive={activeCategory === item.id}
                              onClick={() => handleCategoryClick(item.id)}
                            />
                          ))}
                    </div>
                  </div>
                )}
              </div>
              {!isBottomExpanded && (
                <div className="px-4 py-3 flex flex-col items-center border-b border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsBottomExpanded(true)}
                    className="theme-text hover:theme-accent-text hover:bg-[#CDAF87]/30 dark:hover:bg-[#3A3A3A]/30"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {!isBottomExpanded && (
                <div className="flex-1 overflow-y-auto">
                  <div className="divide-y divide-[#CDAF87]/20 dark:divide-[#3A3A3A]">
                    {navigationItems.map((item, index) =>
                      // Render the main "All Sites" item, then conditionally render sub-items if isCategoriesOpen
                      index === 0 ? ( // "All Sites" item
                        <NavItem
                          key={item.id}
                          icon={item.icon}
                          label={item.label}
                          count={item.count}
                          isActive={activeCategory === item.id}
                          hasDropdown={item.hasDropdown}
                          isDropdownOpen={isCategoriesOpen}
                          onDropdownToggle={() => setIsCategoriesOpen(!isCategoriesOpen)}
                          onClick={() => handleCategoryClick(item.id)}
                        />
                      ) : isCategoriesOpen ? ( // Category sub-items, only if "All Sites" is open
                        <NavItem
                          key={item.id}
                          icon={item.icon}
                          label={item.label}
                          count={item.count}
                          isActive={activeCategory === item.id}
                          onClick={() => handleCategoryClick(item.id)}
                        />
                      ) : null,
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
      <Button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`collapse-button ${isCollapsed ? "left-4" : ""}`}
        size="icon"
      >
        <ChevronLeft className={`h-5 w-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
      </Button>
      <style jsx global>{`
        .main-container {
          ${isCollapsed ? "padding-left: 0;" : ""}
        }
        .sidebar-container {
          ${isCollapsed ? "width: 0 !important; overflow: hidden;" : ""}
        }
      `}</style>
    </>
  )
}

export default InteractiveSidebar
