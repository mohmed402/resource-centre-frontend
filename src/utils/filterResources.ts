import type { Resource } from '../types/resource'

export function filterResources(
  resources: Resource[],
  searchTerm: string,
): Resource[] {
  const normalisedSearchTerm = searchTerm.trim().toLocaleLowerCase()

  if (!normalisedSearchTerm) {
    return resources
  }

  return resources.filter((resource) => {
    const titleMatches = resource.title
      .toLocaleLowerCase()
      .includes(normalisedSearchTerm)
    const tagMatches = resource.tags.some((tag) =>
      tag.toLocaleLowerCase().includes(normalisedSearchTerm),
    )

    return titleMatches || tagMatches
  })
}
