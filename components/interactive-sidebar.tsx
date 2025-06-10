"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface NavItemProps {
  href: string
  children: React.ReactNode
  active?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ href, children, active }) => {
  return (
    <li>
      <a href={href} className={`nav-item ${active ? "active" : ""}`}>
        {children}
      </a>
    </li>
  )
}

interface SiteCardProps {
  title: string
  description: string
  href: string
}

const SiteCard: React.FC<SiteCardProps> = ({ title, description, href }) => {
  return (
    <a href={href} className="site-card">
      <h3 className="site-card-title">{title}</h3>
      <p className="site-card-description">{description}</p>
    </a>
  )
}

const SidebarHeader: React.FC = () => {
  return (
    <div className="sidebar-header">
      <Input type="search" placeholder="Search..." className="search-input" />
      <Button className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors">Filter</Button>
    </div>
  )
}

const SidebarContent: React.FC = () => {
  return (
    <div className="sidebar-content">
      <nav>
        <ul>
          <NavItem href="/" active>
            Home
          </NavItem>
          <NavItem href="/about">About</NavItem>
          <NavItem href="/services">Services</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </ul>
      </nav>

      <div className="site-cards">
        <SiteCard title="Example Site 1" description="A brief description of example site 1." href="#" />
        <SiteCard title="Example Site 2" description="A brief description of example site 2." href="#" />
      </div>
    </div>
  )
}

const InteractiveSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-3/4 sm:w-1/3 p-4">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Explore and discover.</SheetDescription>
        </SheetHeader>
        <SidebarHeader />
        <SidebarContent />
      </SheetContent>
    </Sheet>
  )
}

export default InteractiveSidebar
