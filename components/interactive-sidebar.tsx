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
import type { Site as SiteType } from "./map/types" // Import Site type
import { sitesData } from "@/components/map/integrated-map"

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
        {count && <span className={`nav-item-count ${isActive ? "bg-white/20 text-white" : ""}`}>{count}</span>}
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

// Updated SiteCardProps to use the imported SiteType which has slug
interface SiteCardProps {
  site: SiteType
  onSiteClick: (siteSlug: string) => void
}

const SiteCard: React.FC<SiteCardProps> = ({ site, onSiteClick }) => {
  return (
    // Use site.slug for clicking
    <div className="site-card" onClick={() => onSiteClick(site.slug)}>
      <div className="flex-1">
        <h3 className="site-card-title">{site.name}</h3>
        {site.blurb && <p className="site-card-description">{site.blurb}</p>}
      </div>
      <div className="relative">
        <img src={site.cover_image || "/placeholder.svg"} alt={site.name} className="site-card-image" />
        {/* Assuming media array exists and imageCount can be derived or is a direct prop */}
        {site.media && site.media.length > 1 && (
          <div className="absolute top-1 right-1 theme-accent text-white text-xs px-1.5 py-0.5 rounded font-['Montserrat']">
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
  totalSites: number // This will be based on the new sitesData length
  filteredSites: number // This will be based on filtered new sitesData length
  sitesForCategoryView: SiteType[] // Pass the sites to display in category view
}

const InteractiveSidebar: React.FC<InteractiveSidebarProps> = ({
  searchText,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  totalSites,
  filteredSites,
  sitesForCategoryView,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isUpperExpanded, setIsUpperExpanded] = useState(false)
  const [isBottomExpanded, setIsBottomExpanded] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true)
  const [showingSites, setShowingSites] = useState(false)
  const [localCategorySites, setLocalCategorySites] = useState<SiteType[]>([])
  const [isLoadingSites, setIsLoadingSites] = useState(false)
  const router = useRouter()

  const navigationItems = [
    {
      id: "all",
      label: "All Sites",
      icon: <Globe className="h-5 w-5" />,
      count: totalSites, // This should reflect the total from sitesData
      hasDropdown: true,
    },
    {
      id: "ancient_ruins", // ID should match category values in site data
      label: "Ancient Ruins",
      icon: <Pyramid className="h-5 w-5" />,
      // Counts should be dynamically calculated based on sitesData
    },
    {
      id: "rock_art",
      label: "Rock Art",
      icon: <PaintBucket className="h-5 w-5" />,
      count: 0, // Placeholder for dynamic calculation
    },
    {
      id: "megaliths",
      label: "Megaliths",
      icon: <Landmark className="h-5 w-5" />,
      count: 0, // Placeholder for dynamic calculation
    },
    {
      id: "geoglyphs",
      label: "Geoglyphs",
      icon: <MapIcon className="h-5 w-5" />,
      count: 0, // Placeholder for dynamic calculation
    },
    {
      id: "unusual_formations",
      label: "Unusual Formations",
      icon: <Mountain className="h-5 w-5" />,
      count: 0, // Placeholder for dynamic calculation
    },
  ]

  // Calculate counts dynamically after sitesData is available
  navigationItems.forEach((item) => {
    if (item.id !== "all") {
      item.count = sitesData.filter((site: SiteType) => site.categories.includes(item.id)).length
    }
  })

  // Update local category sites when activeCategory or sitesForCategoryView changes
  useEffect(() => {
    if (activeCategory !== "all" && showingSites) {
      // If sitesForCategoryView is empty or not provided, filter sites locally
      if (!sitesForCategoryView || sitesForCategoryView.length === 0) {
        const filtered = sitesData.filter((site) => site.categories.includes(activeCategory))
        setLocalCategorySites(filtered)
      } else {
        setLocalCategorySites(sitesForCategoryView)
      }
    }
  }, [activeCategory, sitesForCategoryView, showingSites])

  const fetchCategorySites = async (category: string) => {
    if (category === "all") {
      onCategoryChange("all") // Ensure parent knows "all" is selected
      setShowingSites(false) // Go back to navigation view for "all"
      return
    }

    setIsLoadingSites(true)
    try {
      // Simulate API call if needed, or directly filter
      await new Promise((resolve) => setTimeout(resolve, 100)) // Short delay

      // Filter sites locally as a fallback
      const filtered = sitesData.filter((site) => site.categories.includes(category))
      setLocalCategorySites(filtered)

      onCategoryChange(category) // Inform parent of category change
      setShowingSites(true) // Show site cards view
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
    onCategoryChange("all") // Reset to all sites view in parent
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

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        // Success toast is optional, browser usually shows feedback
      } catch (error) {
        console.error("Web Share API failed:", error)
        // Check if the error is an AbortError (user cancelled)
        if (error instanceof DOMException && error.name === "AbortError") {
          // User cancelled the share operation, no toast needed
        } else {
          // Fallback for other errors (e.g., NotAllowedError)
          try {
            await navigator.clipboard.writeText(shareData.url)
            toast.info("Sharing failed, link copied to clipboard!")
          } catch (copyError) {
            console.error("Failed to copy to clipboard:", copyError)
            toast.error("Sharing and copying to clipboard failed.")
          }
        }
      }
    } else {
      // Fallback if navigator.share is not supported at all
      try {
        await navigator.clipboard.writeText(shareData.url)
        toast.success("Link copied to clipboard!")
      } catch (copyError) {
        console.error("Failed to copy to clipboard:", copyError)
        toast.error("Could not copy link to clipboard.")
      }
    }
  }

  // Use local category sites if available, otherwise fall back to sitesForCategoryView
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
                className="text-white hover:bg-white/10 mr-2"
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
                className="search-input"
              />
            </div>
            <Button variant="ghost" size="icon" onClick={handleShare} className="text-white hover:bg-white/10">
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
                      <div className="w-12 h-12 theme-accent rounded-lg flex items-center justify-center shadow-[3px_3px_6px_rgba(74,122,122,0.3)] dark:shadow-[3px_3px_6px_rgba(0,0,0,0.3)]">
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
                        className="theme-text hover:theme-accent-text hover:bg-[#CDAF87]/30 dark:hover:bg-[#3A3A3A]/30 ml-auto"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
                {isBottomExpanded && (
                  <div className="absolute top-0 left-0 right-0 theme-secondary-bg z-50 border-b border-[#CDAF87]/30 dark:border-[#3A3A3A]">
                    <div className="theme-accent p-4 flex items-center justify-between">
                      <h2 className="text-white font-['Cinzel'] font-semibold">Navigation</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsBottomExpanded(false)}
                        className="text-white hover:bg-[#8C6F5A] dark:hover:bg-[#8B5CF6]"
                      >
                        <ChevronDown className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="divide-y divide-[#CDAF87]/20 dark:divide-[#3A3A3A]">
                      <NavItem
                        icon={navigationItems[0].icon}
                        label={navigationItems[0].label}
                        count={navigationItems[0].count}
                        isActive={activeCategory === navigationItems[0].id}
                        hasDropdown={true}
                        isDropdownOpen={isCategoriesOpen}
                        onDropdownToggle={() => setIsCategoriesOpen(!isCategoriesOpen)}
                        onClick={() => handleCategoryClick(navigationItems[0].id)}
                      />
                      {isCategoriesOpen &&
                        navigationItems
                          .slice(1)
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
                    <NavItem
                      icon={navigationItems[0].icon}
                      label={navigationItems[0].label}
                      count={navigationItems[0].count}
                      isActive={activeCategory === navigationItems[0].id}
                      hasDropdown={true}
                      isDropdownOpen={isCategoriesOpen}
                      onDropdownToggle={() => setIsCategoriesOpen(!isCategoriesOpen)}
                      onClick={() => handleCategoryClick(navigationItems[0].id)}
                    />
                    {isCategoriesOpen &&
                      navigationItems
                        .slice(1)
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
