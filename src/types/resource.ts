export type ResourceCategory =
  'Podcasts' | 'Articles' | 'Newsletters' | 'Recipes' | 'Fitness' | 'Meditation'

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'Podcasts',
  'Articles',
  'Newsletters',
  'Recipes',
  'Fitness',
  'Meditation',
]

export type SortOption =
  | 'default'
  | 'title-asc'
  | 'title-desc'
  | 'duration-asc'
  | 'duration-desc'
  | 'category-asc'

export interface Resource {
  id: string
  title: string
  category: ResourceCategory
  thumbnailUrl: string
  tags: string[]
  durationMinutes: number
  description: string
  uploadedAt: string
}
