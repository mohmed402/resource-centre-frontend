import type { Resource, ResourceCategory } from '../types/resource'

const WATCH_CATEGORIES: ResourceCategory[] = [
  'Podcasts',
  'Fitness',
  'Meditation',
]

export function getDurationLabel(resource: Resource): string {
  const action = WATCH_CATEGORIES.includes(resource.category) ? 'watch' : 'read'

  return `${resource.durationMinutes} min ${action}`
}

export function formatUploadedDate(uploadedAt: string): string {
  const date = new Date(`${uploadedAt}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable'
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
