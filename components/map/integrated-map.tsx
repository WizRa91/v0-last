import type React from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

const mapStyles = {
  height: "400px",
  width: "100%",
}

const defaultCenter = {
  lat: 0,
  lng: 0,
}

const sitesData = [
  {
    slug: "machu-picchu",
    name: "Machu Picchu",
    location: { lat: -13.1631, lng: -72.545 },
    description: "An Incan citadel set high in the Andes Mountains in Peru.",
    media: [
      {
        src: "/machu-picchu-peru.png",
        alt: "Machu Picchu",
        caption: "Machu Picchu, Peru",
        type: "image",
      },
    ],
  },
  {
    slug: "chichen-itza",
    name: "Chichen Itza",
    location: { lat: 20.6843, lng: -88.5678 },
    description: "A complex of Mayan ruins on Mexico's Yucatán Peninsula.",
    media: [
      {
        src: "/chichen-itza-mexico.png",
        alt: "Chichen Itza",
        caption: "Chichen Itza, Mexico",
        type: "image",
      },
    ],
  },
  {
    slug: "colosseum",
    name: "Colosseum",
    location: { lat: 41.8902, lng: 12.4922 },
    description: "An elliptical amphitheater in the center of the city of Rome, Italy.",
    media: [
      {
        src: "/colosseum-italy.png",
        alt: "Colosseum",
        caption: "Colosseum, Italy",
        type: "image",
      },
    ],
  },
  {
    slug: "great-wall",
    name: "Great Wall of China",
    location: { lat: 40.4319, lng: 116.5704 },
    description:
      "A series of fortifications that were built across the historical northern borders of ancient Chinese states.",
    media: [
      {
        src: "/great-wall-china.png",
        alt: "Great Wall of China",
        caption: "Great Wall of China",
        type: "image",
      },
    ],
  },
  {
    slug: "petra",
    name: "Petra",
    location: { lat: 30.3285, lng: 35.4444 },
    description: "A famous archaeological site in Jordan's southwestern desert.",
    media: [
      {
        src: "/petra-treasury-jordan.png",
        alt: "The Treasury at Petra",
        caption: "Al-Khazneh, The Treasury at Petra",
        type: "image",
      },
      {
        src: "/images/petra-monastery.png",
        alt: "The Monastery at Petra",
        caption: "Ad Deir, The Monastery, Petra",
        type: "image",
      },
      {
        src: "/images/petra-siq.png",
        alt: "The Siq, entrance to Petra",
        caption: "The Siq, the main entrance to Petra",
        type: "image",
      },
    ],
  },
  {
    slug: "taj-mahal",
    name: "Taj Mahal",
    location: { lat: 27.1751, lng: 78.0421 },
    description: "An ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra.",
    media: [
      {
        src: "/taj-mahal-india.png",
        alt: "Taj Mahal",
        caption: "Taj Mahal, India",
        type: "image",
      },
    ],
  },
  {
    slug: "christ-the-redeemer",
    name: "Christ the Redeemer",
    location: { lat: -22.9519, lng: -43.2105 },
    description: "An Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil.",
    media: [
      {
        src: "/christ-the-redeemer-brazil.png",
        alt: "Christ the Redeemer",
        caption: "Christ the Redeemer, Brazil",
        type: "image",
      },
    ],
  },
]

interface IntegratedMapProps {
  apiKey: string
}

const IntegratedMap: React.FC<IntegratedMapProps> = ({ apiKey }) => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={2} center={defaultCenter}>
        {sitesData.map((site) => (
          <Marker key={site.slug} position={site.location} title={site.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}

export default IntegratedMap
