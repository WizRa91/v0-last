import { Breadcrumbs, CardsInGrid, Container, Hero, Pagination } from "@/components"
import { ChevronRightIcon } from "@heroicons/react/20/solid"

interface SiteTaxonomyProps {
  title: string
  description: string
  items: {
    title: string
    href: string
    description: string
    imageSrc: string
    imageAlt: string
  }[]
  breadcrumbs: {
    label: string
    href: string
  }[]
  currentPage: number
  totalPages: number
}

export function SiteTaxonomy({ title, description, items, breadcrumbs, currentPage, totalPages }: SiteTaxonomyProps) {
  return (
    <div>
      <Breadcrumbs
        items={[...breadcrumbs, { label: title, href: "#", current: true }]}
        className="mb-8"
        separatorIcon={<ChevronRightIcon className="h-5 w-5 theme-secondary-text" />}
        linkClassName="theme-secondary-text hover:theme-text"
        activeClassName="font-medium theme-text"
      />

      <Hero>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="site-title text-3xl font-bold tracking-tight theme-text sm:text-4xl">{title}</h1>
            <p className="site-category-location mt-2 text-lg leading-8 theme-secondary-text">{description}</p>
          </div>
        </div>
      </Hero>

      <Container>
        <CardsInGrid items={items} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </Container>
    </div>
  )
}
