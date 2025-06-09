"use client"

import type React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import * as d3 from "d3"
import { X, Heart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Note {
  id: number
  content: string
  category: "Accessibility" | "Difficulty" | "Must-Haves" | "Must-See" | "Extras"
  likes: number
  siteId: string // This will now match the site's slug, e.g., "pyramids-of-giza"
}

interface NotesMindMapProps {
  siteId: string // Expecting slug here, e.g., "pyramids-of-giza"
  siteName: string
}

// Sample data for demonstration - specific to "pyramids-of-giza"
const gizaSampleNotes: Note[] = [
  // Accessibility notes (30 notes)
  {
    id: 1,
    category: "Accessibility",
    content: "Wheelchair ramps available at main entrance",
    likes: 45,
    siteId: "pyramids-of-giza",
  },
  {
    id: 2,
    category: "Accessibility",
    content: "Limited parking - arrive early",
    likes: 12,
    siteId: "pyramids-of-giza",
  },
  {
    id: 3,
    category: "Accessibility",
    content: "Audio guides available in multiple languages",
    likes: 28,
    siteId: "pyramids-of-giza",
  },
  {
    id: 4,
    category: "Accessibility",
    content: "Rest areas with shade available",
    likes: 8,
    siteId: "pyramids-of-giza",
  },
  {
    id: 5,
    category: "Accessibility",
    content: "Accessible restrooms near entrance",
    likes: 15,
    siteId: "pyramids-of-giza",
  },
  {
    id: 6,
    category: "Accessibility",
    content: "Paved pathways to main viewing areas",
    likes: 22,
    siteId: "pyramids-of-giza",
  },
  {
    id: 7,
    category: "Accessibility",
    content: "Staff assistance available for mobility needs",
    likes: 18,
    siteId: "pyramids-of-giza",
  },
  { id: 8, category: "Accessibility", content: "Braille information plaques", likes: 6, siteId: "pyramids-of-giza" },
  {
    id: 9,
    category: "Accessibility",
    content: "Golf cart tours for limited mobility",
    likes: 35,
    siteId: "pyramids-of-giza",
  },
  {
    id: 10,
    category: "Accessibility",
    content: "Sign language interpreters on request",
    likes: 4,
    siteId: "pyramids-of-giza",
  },
  {
    id: 11,
    category: "Accessibility",
    content: "Elevator access to visitor center",
    likes: 11,
    siteId: "pyramids-of-giza",
  },
  { id: 12, category: "Accessibility", content: "Large print maps available", likes: 7, siteId: "pyramids-of-giza" },
  { id: 13, category: "Accessibility", content: "Accessible viewing platforms", likes: 25, siteId: "pyramids-of-giza" },
  {
    id: 14,
    category: "Accessibility",
    content: "Reserved parking for disabled visitors",
    likes: 19,
    siteId: "pyramids-of-giza",
  },
  {
    id: 15,
    category: "Accessibility",
    content: "Tactile models for visually impaired",
    likes: 9,
    siteId: "pyramids-of-giza",
  },
  {
    id: 16,
    category: "Accessibility",
    content: "Wheelchair rental available on-site",
    likes: 31,
    siteId: "pyramids-of-giza",
  },
  {
    id: 17,
    category: "Accessibility",
    content: "Accessible shuttle from parking",
    likes: 14,
    siteId: "pyramids-of-giza",
  },
  { id: 18, category: "Accessibility", content: "Service animal friendly", likes: 16, siteId: "pyramids-of-giza" },
  { id: 19, category: "Accessibility", content: "Accessible ticket booth", likes: 5, siteId: "pyramids-of-giza" },
  {
    id: 20,
    category: "Accessibility",
    content: "Sensory-friendly visiting hours",
    likes: 13,
    siteId: "pyramids-of-giza",
  },
  { id: 21, category: "Accessibility", content: "Accessible gift shop entrance", likes: 8, siteId: "pyramids-of-giza" },
  {
    id: 22,
    category: "Accessibility",
    content: "Priority entry for disabled visitors",
    likes: 27,
    siteId: "pyramids-of-giza",
  },
  { id: 23, category: "Accessibility", content: "Accessible water fountains", likes: 10, siteId: "pyramids-of-giza" },
  {
    id: 24,
    category: "Accessibility",
    content: "Clear sight lines from wheelchair height",
    likes: 21,
    siteId: "pyramids-of-giza",
  },
  {
    id: 25,
    category: "Accessibility",
    content: "Accessible emergency exits marked",
    likes: 12,
    siteId: "pyramids-of-giza",
  },
  {
    id: 26,
    category: "Accessibility",
    content: "Companion seating in viewing areas",
    likes: 17,
    siteId: "pyramids-of-giza",
  },
  { id: 27, category: "Accessibility", content: "Accessible photography spots", likes: 23, siteId: "pyramids-of-giza" },
  {
    id: 28,
    category: "Accessibility",
    content: "Medical assistance station nearby",
    likes: 20,
    siteId: "pyramids-of-giza",
  },
  { id: 29, category: "Accessibility", content: "Accessible cafe and dining", likes: 15, siteId: "pyramids-of-giza" },
  {
    id: 30,
    category: "Accessibility",
    content: "Virtual reality tours for mobility limited",
    likes: 38,
    siteId: "pyramids-of-giza",
  },

  // Difficulty notes (30 notes)
  {
    id: 31,
    category: "Difficulty",
    content: "Steep climb to the top - bring water!",
    likes: 67,
    siteId: "pyramids-of-giza",
  },
  {
    id: 32,
    category: "Difficulty",
    content: "Uneven terrain, wear sturdy hiking boots",
    likes: 54,
    siteId: "pyramids-of-giza",
  },
  {
    id: 33,
    category: "Difficulty",
    content: "Claustrophobic spaces inside the pyramid",
    likes: 43,
    siteId: "pyramids-of-giza",
  },
  { id: 34, category: "Difficulty", content: "Very hot during summer months", likes: 89, siteId: "pyramids-of-giza" },
  {
    id: 35,
    category: "Difficulty",
    content: "Long walking distances between sites",
    likes: 32,
    siteId: "pyramids-of-giza",
  },
  {
    id: 36,
    category: "Difficulty",
    content: "Narrow passages require crawling",
    likes: 28,
    siteId: "pyramids-of-giza",
  },
  {
    id: 37,
    category: "Difficulty",
    content: "High altitude affects some visitors",
    likes: 15,
    siteId: "pyramids-of-giza",
  },
  { id: 38, category: "Difficulty", content: "Slippery stones when wet", likes: 41, siteId: "pyramids-of-giza" },
  { id: 39, category: "Difficulty", content: "Limited shade during midday", likes: 76, siteId: "pyramids-of-giza" },
  {
    id: 40,
    category: "Difficulty",
    content: "Crowds make navigation difficult",
    likes: 58,
    siteId: "pyramids-of-giza",
  },
  { id: 41, category: "Difficulty", content: "Steep stairs with no handrails", likes: 39, siteId: "pyramids-of-giza" },
  { id: 42, category: "Difficulty", content: "Sand gets everywhere", likes: 22, siteId: "pyramids-of-giza" },
  { id: 43, category: "Difficulty", content: "Strong winds at elevated areas", likes: 18, siteId: "pyramids-of-giza" },
  { id: 44, category: "Difficulty", content: "Poor lighting inside chambers", likes: 35, siteId: "pyramids-of-giza" },
  { id: 45, category: "Difficulty", content: "Requires good physical fitness", likes: 61, siteId: "pyramids-of-giza" },
  {
    id: 46,
    category: "Difficulty",
    content: "Dehydration risk in desert climate",
    likes: 72,
    siteId: "pyramids-of-giza",
  },
  { id: 47, category: "Difficulty", content: "Loose rocks on climbing paths", likes: 26, siteId: "pyramids-of-giza" },
  { id: 48, category: "Difficulty", content: "Extreme temperature changes", likes: 44, siteId: "pyramids-of-giza" },
  { id: 49, category: "Difficulty", content: "Limited cell phone reception", likes: 19, siteId: "pyramids-of-giza" },
  { id: 50, category: "Difficulty", content: "Dust storms possible", likes: 31, siteId: "pyramids-of-giza" },
  { id: 51, category: "Difficulty", content: "Long queues in peak season", likes: 83, siteId: "pyramids-of-giza" },
  { id: 52, category: "Difficulty", content: "Heavy backpacks not recommended", likes: 24, siteId: "pyramids-of-giza" },
  { id: 53, category: "Difficulty", content: "Sunburn risk very high", likes: 65, siteId: "pyramids-of-giza" },
  {
    id: 54,
    category: "Difficulty",
    content: "Ankle injuries common on uneven ground",
    likes: 37,
    siteId: "pyramids-of-giza",
  },
  { id: 55, category: "Difficulty", content: "Vertigo-inducing heights", likes: 29, siteId: "pyramids-of-giza" },
  { id: 56, category: "Difficulty", content: "Flash photography restrictions", likes: 16, siteId: "pyramids-of-giza" },
  {
    id: 57,
    category: "Difficulty",
    content: "Language barriers with local guides",
    likes: 21,
    siteId: "pyramids-of-giza",
  },
  { id: 58, category: "Difficulty", content: "Expensive bottled water on-site", likes: 48, siteId: "pyramids-of-giza" },
  { id: 59, category: "Difficulty", content: "Time pressure from tour groups", likes: 33, siteId: "pyramids-of-giza" },
  { id: 60, category: "Difficulty", content: "Insect bites in certain areas", likes: 14, siteId: "pyramids-of-giza" },

  // Must-Haves notes (30 notes)
  {
    id: 61,
    category: "Must-Haves",
    content: "Sunscreen and hat essential in desert heat",
    likes: 95,
    siteId: "pyramids-of-giza",
  },
  {
    id: 62,
    category: "Must-Haves",
    content: "Camera with extra batteries for photos",
    likes: 78,
    siteId: "pyramids-of-giza",
  },
  { id: 63, category: "Must-Haves", content: "Cash for entrance fees and tips", likes: 86, siteId: "pyramids-of-giza" },
  {
    id: 64,
    category: "Must-Haves",
    content: "Comfortable walking shoes are crucial",
    likes: 92,
    siteId: "pyramids-of-giza",
  },
  {
    id: 65,
    category: "Must-Haves",
    content: "Plenty of water - at least 2 liters per person",
    likes: 108,
    siteId: "pyramids-of-giza",
  },
  { id: 66, category: "Must-Haves", content: "Portable phone charger", likes: 45, siteId: "pyramids-of-giza" },
  { id: 67, category: "Must-Haves", content: "Light jacket for evening visits", likes: 38, siteId: "pyramids-of-giza" },
  {
    id: 68,
    category: "Must-Haves",
    content: "Snacks for energy during long walks",
    likes: 52,
    siteId: "pyramids-of-giza",
  },
  {
    id: 69,
    category: "Must-Haves",
    content: "First aid kit for minor injuries",
    likes: 29,
    siteId: "pyramids-of-giza",
  },
  {
    id: 70,
    category: "Must-Haves",
    content: "Sunglasses for bright desert sun",
    likes: 71,
    siteId: "pyramids-of-giza",
  },
  { id: 71, category: "Must-Haves", content: "Guidebook or downloaded maps", likes: 34, siteId: "pyramids-of-giza" },
  { id: 72, category: "Must-Haves", content: "Tissues and wet wipes", likes: 26, siteId: "pyramids-of-giza" },
  { id: 73, category: "Must-Haves", content: "Backpack for carrying supplies", likes: 41, siteId: "pyramids-of-giza" },
  { id: 74, category: "Must-Haves", content: "Hand sanitizer", likes: 23, siteId: "pyramids-of-giza" },
  { id: 75, category: "Must-Haves", content: "Flashlight for dark chambers", likes: 56, siteId: "pyramids-of-giza" },
  { id: 76, category: "Must-Haves", content: "Passport or ID for entry", likes: 89, siteId: "pyramids-of-giza" },
  { id: 77, category: "Must-Haves", content: "Lip balm with SPF", likes: 31, siteId: "pyramids-of-giza" },
  {
    id: 78,
    category: "Must-Haves",
    content: "Comfortable socks to prevent blisters",
    likes: 37,
    siteId: "pyramids-of-giza",
  },
  { id: 79, category: "Must-Haves", content: "Reusable water bottle", likes: 64, siteId: "pyramids-of-giza" },
  { id: 80, category: "Must-Haves", content: "Small towel for sweat", likes: 19, siteId: "pyramids-of-giza" },
  { id: 81, category: "Must-Haves", content: "Electrolyte supplements", likes: 42, siteId: "pyramids-of-giza" },
  { id: 82, category: "Must-Haves", content: "Insect repellent", likes: 28, siteId: "pyramids-of-giza" },
  { id: 83, category: "Must-Haves", content: "Plastic bags for sandy items", likes: 15, siteId: "pyramids-of-giza" },
  { id: 84, category: "Must-Haves", content: "Cooling towel for hot weather", likes: 47, siteId: "pyramids-of-giza" },
  {
    id: 85,
    category: "Must-Haves",
    content: "Bandana or scarf for dust protection",
    likes: 33,
    siteId: "pyramids-of-giza",
  },
  { id: 86, category: "Must-Haves", content: "Emergency contact information", likes: 21, siteId: "pyramids-of-giza" },
  { id: 87, category: "Must-Haves", content: "Travel insurance documents", likes: 25, siteId: "pyramids-of-giza" },
  { id: 88, category: "Must-Haves", content: "Comfortable hat with chin strap", likes: 39, siteId: "pyramids-of-giza" },
  { id: 89, category: "Must-Haves", content: "Portable fan for cooling", likes: 35, siteId: "pyramids-of-giza" },
  { id: 90, category: "Must-Haves", content: "Waterproof phone case", likes: 44, siteId: "pyramids-of-giza" },

  // Must-See notes (30 notes)
  {
    id: 91,
    category: "Must-See",
    content: "Sunset view from the Great Pyramid is breathtaking",
    likes: 142,
    siteId: "pyramids-of-giza",
  },
  {
    id: 92,
    category: "Must-See",
    content: "Don't miss the Sphinx - it's right nearby",
    likes: 128,
    siteId: "pyramids-of-giza",
  },
  { id: 93, category: "Must-See", content: "Solar boat museum is fascinating", likes: 76, siteId: "pyramids-of-giza" },
  {
    id: 94,
    category: "Must-See",
    content: "Sound and light show in the evening",
    likes: 98,
    siteId: "pyramids-of-giza",
  },
  {
    id: 95,
    category: "Must-See",
    content: "King's Chamber inside the Great Pyramid",
    likes: 115,
    siteId: "pyramids-of-giza",
  },
  { id: 96, category: "Must-See", content: "Panoramic view from Giza plateau", likes: 87, siteId: "pyramids-of-giza" },
  {
    id: 97,
    category: "Must-See",
    content: "Ancient hieroglyphs in burial chambers",
    likes: 69,
    siteId: "pyramids-of-giza",
  },
  {
    id: 98,
    category: "Must-See",
    content: "Pyramid of Khafre with original casing",
    likes: 54,
    siteId: "pyramids-of-giza",
  },
  { id: 99, category: "Must-See", content: "Mastaba tombs of nobles", likes: 41, siteId: "pyramids-of-giza" },
  {
    id: 100,
    category: "Must-See",
    content: "Workers' village archaeological site",
    likes: 32,
    siteId: "pyramids-of-giza",
  },
  {
    id: 101,
    category: "Must-See",
    content: "Causeway connecting pyramid to valley temple",
    likes: 28,
    siteId: "pyramids-of-giza",
  },
  { id: 102, category: "Must-See", content: "Pyramid of Menkaure", likes: 45, siteId: "pyramids-of-giza" },
  { id: 103, category: "Must-See", content: "Great Gallery inside the pyramid", likes: 63, siteId: "pyramids-of-giza" },
  { id: 104, category: "Must-See", content: "Queen's pyramids complex", likes: 37, siteId: "pyramids-of-giza" },
  { id: 105, category: "Must-See", content: "Descending passage entrance", likes: 29, siteId: "pyramids-of-giza" },
  { id: 106, category: "Must-See", content: "Sphinx temple ruins", likes: 51, siteId: "pyramids-of-giza" },
  { id: 107, category: "Must-See", content: "Pyramid texts inscriptions", likes: 38, siteId: "pyramids-of-giza" },
  { id: 108, category: "Must-See", content: "Valley temple of Khafre", likes: 42, siteId: "pyramids-of-giza" },
  { id: 109, category: "Must-See", content: "Mortuary temple remains", likes: 26, siteId: "pyramids-of-giza" },
  { id: 110, category: "Must-See", content: "Bent Pyramid at nearby Dahshur", likes: 58, siteId: "pyramids-of-giza" },
  { id: 111, category: "Must-See", content: "Red Pyramid for comparison", likes: 47, siteId: "pyramids-of-giza" },
  { id: 112, category: "Must-See", content: "Saqqara step pyramid day trip", likes: 72, siteId: "pyramids-of-giza" },
  { id: 113, category: "Must-See", content: "Memphis ancient capital ruins", likes: 34, siteId: "pyramids-of-giza" },
  { id: 114, category: "Must-See", content: "Colossus of Ramses II", likes: 39, siteId: "pyramids-of-giza" },
  { id: 115, category: "Must-See", content: "Alabaster Sphinx at Memphis", likes: 31, siteId: "pyramids-of-giza" },
  {
    id: 116,
    category: "Must-See",
    content: "Pyramid complex from above (helicopter tour)",
    likes: 85,
    siteId: "pyramids-of-giza",
  },
  { id: 117, category: "Must-See", content: "Sunrise over the pyramids", likes: 103, siteId: "pyramids-of-giza" },
  { id: 118, category: "Must-See", content: "Star alignment demonstration", likes: 44, siteId: "pyramids-of-giza" },
  { id: 119, category: "Must-See", content: "Underground chambers tour", likes: 67, siteId: "pyramids-of-giza" },
  { id: 120, category: "Must-See", content: "Giza necropolis overview", likes: 55, siteId: "pyramids-of-giza" },

  // Extras notes (30 notes)
  {
    id: 121,
    category: "Extras",
    content: "Local guide Ahmed knows amazing hidden spots",
    likes: 73,
    siteId: "pyramids-of-giza",
  },
  {
    id: 122,
    category: "Extras",
    content: "Gift shop has authentic papyrus scrolls",
    likes: 28,
    siteId: "pyramids-of-giza",
  },
  {
    id: 123,
    category: "Extras",
    content: "Camel rides available but negotiate price",
    likes: 45,
    siteId: "pyramids-of-giza",
  },
  {
    id: 124,
    category: "Extras",
    content: "Nearby restaurants serve great local food",
    likes: 52,
    siteId: "pyramids-of-giza",
  },
  { id: 125, category: "Extras", content: "Horse riding around the pyramids", likes: 38, siteId: "pyramids-of-giza" },
  {
    id: 126,
    category: "Extras",
    content: "Traditional Egyptian coffee at local cafe",
    likes: 31,
    siteId: "pyramids-of-giza",
  },
  { id: 127, category: "Extras", content: "Bedouin tent experience nearby", likes: 24, siteId: "pyramids-of-giza" },
  { id: 128, category: "Extras", content: "Quad bike desert safari", likes: 67, siteId: "pyramids-of-giza" },
  {
    id: 129,
    category: "Extras",
    content: "Photography workshop with local artist",
    likes: 19,
    siteId: "pyramids-of-giza",
  },
  { id: 130, category: "Extras", content: "Felucca boat ride on the Nile", likes: 58, siteId: "pyramids-of-giza" },
  { id: 131, category: "Extras", content: "Egyptian Museum visit same day", likes: 84, siteId: "pyramids-of-giza" },
  { id: 132, category: "Extras", content: "Khan el-Khalili bazaar shopping", likes: 41, siteId: "pyramids-of-giza" },
  { id: 133, category: "Extras", content: "Traditional belly dance show", likes: 33, siteId: "pyramids-of-giza" },
  { id: 134, category: "Extras", content: "Papyrus making workshop", likes: 22, siteId: "pyramids-of-giza" },
  { id: 135, category: "Extras", content: "Perfume factory tour", likes: 16, siteId: "pyramids-of-giza" },
  { id: 136, category: "Extras", content: "Carpet weaving demonstration", likes: 14, siteId: "pyramids-of-giza" },
  { id: 137, category: "Extras", content: "Hieroglyphics writing class", likes: 29, siteId: "pyramids-of-giza" },
  { id: 138, category: "Extras", content: "Traditional hammam spa experience", likes: 35, siteId: "pyramids-of-giza" },
  { id: 139, category: "Extras", content: "Astronomy tour under desert stars", likes: 62, siteId: "pyramids-of-giza" },
  { id: 140, category: "Extras", content: "Cooking class for Egyptian cuisine", likes: 47, siteId: "pyramids-of-giza" },
  { id: 141, category: "Extras", content: "Shisha smoking at traditional cafe", likes: 26, siteId: "pyramids-of-giza" },
  {
    id: 142,
    category: "Extras",
    content: "Desert camping overnight experience",
    likes: 71,
    siteId: "pyramids-of-giza",
  },
  { id: 143, category: "Extras", content: "Hot air balloon ride over Giza", likes: 89, siteId: "pyramids-of-giza" },
  { id: 144, category: "Extras", content: "Traditional music performance", likes: 18, siteId: "pyramids-of-giza" },
  { id: 145, category: "Extras", content: "Jewelry making workshop", likes: 21, siteId: "pyramids-of-giza" },
  { id: 146, category: "Extras", content: "Spice market tour and tasting", likes: 39, siteId: "pyramids-of-giza" },
  { id: 147, category: "Extras", content: "Traditional dress photo session", likes: 43, siteId: "pyramids-of-giza" },
  { id: 148, category: "Extras", content: "Coptic Cairo historical tour", likes: 36, siteId: "pyramids-of-giza" },
  { id: 149, category: "Extras", content: "Islamic Cairo walking tour", likes: 54, siteId: "pyramids-of-giza" },
  {
    id: 150,
    category: "Extras",
    content: "Nile dinner cruise with entertainment",
    likes: 76,
    siteId: "pyramids-of-giza",
  },
]

const NotesMindMap: React.FC<NotesMindMapProps> = ({ siteId, siteName }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const simulationRef = useRef<d3.Simulation<any, any> | null>(null)

  // Determine initial notes based on siteId
  const initialNotes = siteId === "pyramids-of-giza" ? gizaSampleNotes : []
  const [notes, setNotes] = useState<Note[]>(initialNotes)

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [showAddNote, setShowAddNote] = useState(false)
  const [newNote, setNewNote] = useState({ content: "", category: "Accessibility" as Note["category"] })
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const likeNote = useCallback(
    (noteId: number) => {
      setNotes((prev) => prev.map((note) => (note.id === noteId ? { ...note, likes: note.likes + 1 } : note)))

      if (simulationRef.current) {
        const simulation = simulationRef.current
        const nodes = simulation.nodes() as any[]
        const noteNode = nodes.find((n: any) => n.id === noteId.toString())

        if (noteNode) {
          const updatedNote = notes.find((n) => n.id === noteId) // Find from current state before update
          if (updatedNote) {
            const newLikes = (updatedNote.likes || 0) + 1 // Ensure likes is a number
            const newRadius = Math.min(28, Math.max(6, 6 + (newLikes / 100) * 22))

            const svg = d3.select(svgRef.current)
            svg.select<SVGCircleElement>(`circle[data-id="${noteId}"]`).transition().duration(300).attr("r", newRadius)
            svg
              .select<SVGTextElement>(`text.like-label[data-id="${noteId}"]`)
              .transition()
              .duration(300)
              .text(newLikes.toString())

            noteNode.radius = newRadius
            noteNode.likes = newLikes

            simulation.alpha(0.1).restart()
          }
        }
      }
    },
    [notes], // notes dependency is important here
  )

  const addNote = () => {
    if (newNote.content.trim()) {
      const noteToAdd: Note = {
        // Ensure new ID is unique, even if notes array is empty
        id: notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1,
        content: newNote.content,
        category: newNote.category,
        likes: 0,
        siteId: siteId, // Associate with the current site
      }
      setNotes((prev) => [...prev, noteToAdd])
      setNewNote({ content: "", category: "Accessibility" })
      setShowAddNote(false)
    }
  }

  useEffect(() => {
    if (!svgRef.current) return

    const width = 900
    const height = 700
    const centerX = width / 2
    const centerY = height / 2
    const categories = ["Accessibility", "Difficulty", "Must-Haves", "Must-See", "Extras"]

    const categoryColors: Record<string, string> = {
      Accessibility: "#10B981",
      Difficulty: "#EF4444",
      "Must-Haves": "#F59E0B",
      "Must-See": "#8B5CF6",
      Extras: "#06B6D4",
    }

    const centralNode = {
      id: "center",
      name: siteName,
      x: centerX,
      y: centerY,
      fx: centerX,
      fy: centerY,
      radius: 50,
      isCenter: true,
    }

    const categoryNodes = categories.map((cat, i) => {
      const angle = (i * 2 * Math.PI) / categories.length - Math.PI / 2
      return {
        id: `cat-${cat}`,
        category: cat,
        x: centerX + 200 * Math.cos(angle),
        y: centerY + 200 * Math.sin(angle),
        fx: centerX + 200 * Math.cos(angle),
        fy: centerY + 200 * Math.sin(angle),
        radius: 35,
        isCategory: true,
        color: categoryColors[cat],
        angle: angle,
      }
    })

    const noteNodes = notes.map((note) => {
      const categoryNode = categoryNodes.find((cat) => cat.category === note.category)!
      const categoryNotes = notes.filter((n) => n.category === note.category)

      const sortedCategoryNotes = [...categoryNotes].sort((a, b) => b.likes - a.likes)
      const sortedIndex = sortedCategoryNotes.findIndex((n) => n.id === note.id)

      const sectorAngle = ((2 * Math.PI) / categories.length) * 0.8
      const minDistance = 80
      const maxDistance = 280

      const likeRatio = note.likes / Math.max(...categoryNotes.map((n) => n.likes), 1)
      const distance = maxDistance - likeRatio * (maxDistance - minDistance)

      const totalNotesInCategory = categoryNotes.length
      const angleStep = sectorAngle / Math.max(totalNotesInCategory, 1)
      const startAngle = categoryNode.angle - sectorAngle / 2
      const noteAngle = startAngle + sortedIndex * angleStep + angleStep / 2

      const randomOffset = (Math.random() - 0.5) * 20
      const finalDistance = distance + randomOffset

      const x = centerX + finalDistance * Math.cos(noteAngle)
      const y = centerY + finalDistance * Math.sin(noteAngle)

      return {
        id: note.id.toString(),
        category: note.category,
        content: note.content,
        likes: note.likes,
        radius: Math.min(28, Math.max(6, 6 + (note.likes / 100) * 22)),
        color: categoryColors[note.category],
        noteData: note,
        categoryNode: categoryNode,
        x: x,
        y: y,
        targetAngle: noteAngle,
        targetDistance: finalDistance,
      }
    })

    const allD3Nodes = [centralNode, ...categoryNodes, ...noteNodes]

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    svg.attr("width", width).attr("height", height)
    const container = svg.append("g")

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        container.attr("transform", event.transform.toString())
      })
    svg.call(zoom)

    const conicForce = () => {
      return (alpha: number) => {
        noteNodes.forEach((note: any) => {
          const targetX = centerX + note.targetDistance * Math.cos(note.targetAngle)
          const targetY = centerY + note.targetDistance * Math.sin(note.targetAngle)
          note.vx += (targetX - note.x) * alpha * 0.1
          note.vy += (targetY - note.y) * alpha * 0.1
        })
      }
    }

    if (simulationRef.current) {
      simulationRef.current.stop()
    }

    simulationRef.current = d3
      .forceSimulation(allD3Nodes as any)
      .force("charge", d3.forceManyBody().strength(-30))
      .force(
        "collision",
        d3.forceCollide().radius((d: any) => d.radius + 4),
      )
      .force("conic", conicForce())

    const linksData = [
      ...categoryNodes.map((cat) => ({ source: centralNode.id, target: cat.id })),
      ...noteNodes.map((note) => ({
        source: (categoryNodes.find((cat) => cat.category === note.category) as any).id,
        target: note.id,
      })),
    ]

    const link = container
      .selectAll(".link")
      .data(linksData)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("stroke", "#94A3B8")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1)

    const node = container
      .selectAll(".node")
      .data(allD3Nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("data-id", (d: any) => d.id)
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any) => {
        if (d.isCenter) return "#1E40AF"
        if (d.isCategory) return d.color
        return d.color
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("opacity", (d: any) => (d.isCenter || d.isCategory ? 1 : 0.8))
      .style("cursor", (d: any) => (d.isCenter || d.isCategory ? "default" : "pointer"))
      .on("click", (event, d: any) => {
        if (!d.isCenter && !d.isCategory && d.noteData) {
          setSelectedNote(d.noteData)
        }
      })
      .on("mouseover", function (event, d: any) {
        if (d.isCenter || d.isCategory) {
          setHoveredNode(d.id)
        } else {
          d3.select(this).attr("opacity", 1).attr("stroke-width", 3)
        }
      })
      .on("mouseout", function (event, d: any) {
        if (d.isCenter || d.isCategory) {
          setHoveredNode(null)
        } else {
          d3.select(this).attr("opacity", 0.8).attr("stroke-width", 2)
        }
      })

    const labels = container
      .selectAll(".label")
      .data(allD3Nodes.filter((d: any) => d.isCenter || d.isCategory))
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("data-id", (d: any) => d.id) // For hover targeting
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("fill", "#1F2937")
      .attr("font-size", (d: any) => (d.isCenter ? 16 : 12))
      .attr("font-weight", (d: any) => (d.isCenter ? "bold" : "normal"))
      .style("pointer-events", "none")
      .style("opacity", 0)
      .text((d: any) => (d.isCenter ? d.name : d.category))

    const likeLabels = container
      .selectAll(".like-label")
      .data(allD3Nodes.filter((d: any) => !d.isCenter && !d.isCategory))
      .enter()
      .append("text")
      .attr("class", "like-label")
      .attr("data-id", (d: any) => d.id)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .attr("font-size", 10)
      .attr("font-weight", "bold")
      .style("pointer-events", "none")
      .text((d: any) => d.likes)

    simulationRef.current?.on("tick", () => {
      link
        .attr("x1", (d: any) => (simulationRef.current?.nodes().find((n: any) => n.id === d.source) as any)?.x)
        .attr("y1", (d: any) => (simulationRef.current?.nodes().find((n: any) => n.id === d.source) as any)?.y)
        .attr("x2", (d: any) => (simulationRef.current?.nodes().find((n: any) => n.id === d.target) as any)?.x)
        .attr("y2", (d: any) => (simulationRef.current?.nodes().find((n: any) => n.id === d.target) as any)?.y)

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)

      labels.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)

      likeLabels.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
    })

    // Initial zoom to fit all nodes if needed
    // Example: Fit to bounds of all nodes after a short delay
    // setTimeout(() => {
    //   if (allD3Nodes.length > 0) {
    //     const bounds = d3.geoBounds({type: "MultiPoint", coordinates: allD3Nodes.map(n => [n.x, n.y])});
    //     const dx = bounds[1][0] - bounds[0][0];
    //     const dy = bounds[1][1] - bounds[0][1];
    //     const x = (bounds[0][0] + bounds[1][0]) / 2;
    //     const y = (bounds[0][1] + bounds[1][1]) / 2;
    //     const scale = Math.min(8, 0.9 / Math.max(dx / width, dy / height));
    //     const translate = [width / 2 - scale * x, height / 2 - scale * y];

    //     svg.transition().duration(750).call(
    //       zoom.transform,
    //       d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
    //     );
    //   }
    // }, 100);

    // Re-run D3 rendering logic when 'notes' state changes (specifically when notes are added/removed)
    // or when siteId/siteName changes (though siteId/siteName changing should ideally reload the page or fetch new notes)
  }, [notes.length, siteId, siteName]) // Key change: only re-run full D3 setup if notes.length changes

  useEffect(() => {
    if (!svgRef.current || !simulationRef.current) return

    const svg = d3.select(svgRef.current)
    const simulationNodes = simulationRef.current.nodes() as any[]

    // Update label visibility based on hover state
    svg
      .selectAll<SVGTextElement, any>(".label")
      .filter((d) => d.isCenter || d.isCategory) // Ensure we only select labels for center/category nodes
      .style("opacity", (d) => {
        const nodeData = simulationNodes.find((n) => n.id === d.id)
        return hoveredNode === nodeData?.id ? 1 : 0
      })
      .style("transition", "opacity 0.2s ease")
  }, [hoveredNode, notes]) // Add notes to dependency to re-evaluate when notes change (e.g., likes update)

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Notes Mind Map: {siteName}</h1>
        <p className="text-gray-600">Click on notes to view details and like them</p>
      </div>

      <Card className="absolute top-6 right-6 z-10 p-4 w-72">
        <CardContent className="p-0">
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
              <span>{siteName} (Site)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Accessibility</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Difficulty</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              <span>Must-Haves</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span>Must-See</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
              <span>Extras</span>
            </div>
            <div className="pt-3 mt-3 border-t border-gray-200">
              <Button
                onClick={() => setShowAddNote(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-dark-accent dark:hover:bg-dark-hover-teal dark:text-dark-text-primary flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showAddNote && (
        <div className="absolute top-[calc(6rem+18rem)] right-6 z-10">
          {" "}
          {/* Adjusted top position */}
          <Card className="w-80">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="note-category" className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    id="note-category"
                    value={newNote.category}
                    onChange={(e) => setNewNote((prev) => ({ ...prev, category: e.target.value as Note["category"] }))}
                    className="w-full p-2 border rounded-md bg-white text-gray-900"
                  >
                    <option value="Accessibility">Accessibility</option>
                    <option value="Difficulty">Difficulty</option>
                    <option value="Must-Haves">Must-Haves</option>
                    <option value="Must-See">Must-See</option>
                    <option value="Extras">Extras</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="note-content" className="block text-sm font-medium mb-2">
                    Note Content
                  </label>
                  <textarea
                    id="note-content"
                    value={newNote.content}
                    onChange={(e) => setNewNote((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Share your tip or experience..."
                    className="w-full p-2 border rounded-md h-20 resize-none bg-white text-gray-900"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={addNote}
                    className="flex-1 bg-green-600 hover:bg-green-700 dark:bg-dark-hover-teal dark:hover:opacity-80 dark:text-dark-text-primary"
                  >
                    Add Note
                  </Button>
                  <Button
                    onClick={() => setShowAddNote(false)}
                    variant="outline"
                    className="flex-1 dark:border-dark-accent dark:text-dark-accent dark:hover:bg-dark-accent/30 dark:hover:text-dark-text-primary"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <svg ref={svgRef} className="w-full h-full"></svg>

      {selectedNote && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <Card className="w-80 max-w-sm shadow-2xl bg-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span
                  className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
                  style={{
                    backgroundColor:
                      selectedNote.category === "Accessibility"
                        ? "#10B981"
                        : selectedNote.category === "Difficulty"
                          ? "#EF4444"
                          : selectedNote.category === "Must-Haves"
                            ? "#F59E0B"
                            : selectedNote.category === "Must-See"
                              ? "#8B5CF6"
                              : "#06B6D4", // Extras
                    color: "white",
                  }}
                >
                  {selectedNote.category}
                </span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedNote(null)}>
                  <X className="h-4 w-4 text-gray-600 hover:text-gray-900" />
                </Button>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{selectedNote.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{selectedNote.likes} likes</span>
                </div>
                <Button
                  onClick={() => {
                    likeNote(selectedNote.id)
                    // Optimistically update selectedNote's likes for immediate UI feedback
                    setSelectedNote((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null))
                  }}
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Like
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="absolute bottom-6 left-6 text-sm text-gray-600">
        <p>Scroll to zoom • Larger nodes have more likes</p>
      </div>
    </div>
  )
}

export default NotesMindMap
