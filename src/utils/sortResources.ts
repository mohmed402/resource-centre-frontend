import type { Resource, SortOption } from '../types/resource'

export function sortResources(
  resources: Resource[],
  sortOption: SortOption,
): Resource[] {
  const sortedResources = [...resources]

  switch (sortOption) {
    case 'title-asc':
      return sortedResources.sort((first, second) =>
        first.title.localeCompare(second.title),
      )
    case 'title-desc':
      return sortedResources.sort((first, second) =>
        second.title.localeCompare(first.title),
      )
    case 'duration-asc':
      return sortedResources.sort(
        (first, second) => first.durationMinutes - second.durationMinutes,
      )
    case 'duration-desc':
      return sortedResources.sort(
        (first, second) => second.durationMinutes - first.durationMinutes,
      )
    case 'category-asc':
      return sortedResources.sort((first, second) =>
        first.category.localeCompare(second.category),
      )
    default:
      return sortedResources
  }
}
