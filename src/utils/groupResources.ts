import {
  RESOURCE_CATEGORIES,
  type Resource,
  type ResourceCategory,
} from '../types/resource'

export type ResourcesByCategory = Record<ResourceCategory, Resource[]>

export function groupResourcesByCategory(
  resources: Resource[],
): ResourcesByCategory {
  const groupedResources = RESOURCE_CATEGORIES.reduce<ResourcesByCategory>(
    (groups, category) => {
      groups[category] = []
      return groups
    },
    {} as ResourcesByCategory,
  )

  for (const resource of resources) {
    groupedResources[resource.category].push(resource)
  }

  return groupedResources
}
