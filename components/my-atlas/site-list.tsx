import type React from "react"

interface Site {
  id: string
  name: string
  url: string
}

interface SiteListProps {
  sites: Site[]
}

const SiteList: React.FC<SiteListProps> = ({ sites }) => {
  return (
    <ul>
      {sites.map((site) => (
        <li key={site.id}>
          <a href={site.url} target="_blank" rel="noopener noreferrer">
            {site.name}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default SiteList
