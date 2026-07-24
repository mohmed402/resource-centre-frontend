import type { Resource } from '../types/resource'
import { RESOURCE_CATEGORIES } from '../types/resource'
import { groupResourcesByCategory } from './groupResources'

const createResource = (overrides: Partial<Resource>): Resource => ({
  id: 'resource-1',
  title: 'A steady start',
  category: 'Articles',
  thumbnailUrl: '/thumbnail.jpg',
  tags: ['wellbeing'],
  durationMinutes: 8,
  description: 'A short resource about building a calmer routine.',
  uploadedAt: '2026-01-15',
  ...overrides,
})

describe('groupResourcesByCategory', () => {
  it('places resources in the correct categories', () => {
    const article = createResource({
      id: 'article-1',
      category: 'Articles',
      title: 'The Science of Sleep',
    })
    const podcast = createResource({
      id: 'podcast-1',
      category: 'Podcasts',
      title: 'Mindful Moments',
    })
    const recipe = createResource({
      id: 'recipe-1',
      category: 'Recipes',
      title: 'Energy Boost Smoothie',
    })

    const groupedResources = groupResourcesByCategory([
      article,
      podcast,
      recipe,
    ])

    expect(groupedResources.Articles).toEqual([article])
    expect(groupedResources.Podcasts).toEqual([podcast])
    expect(groupedResources.Recipes).toEqual([recipe])
  })

  it('includes empty arrays for categories without resources', () => {
    const groupedResources = groupResourcesByCategory([
      createResource({ id: 'article-1', category: 'Articles' }),
    ])

    expect(Object.keys(groupedResources)).toEqual(RESOURCE_CATEGORIES)
    expect(groupedResources.Podcasts).toEqual([])
    expect(groupedResources.Newsletters).toEqual([])
    expect(groupedResources.Recipes).toEqual([])
    expect(groupedResources.Fitness).toEqual([])
    expect(groupedResources.Meditation).toEqual([])
  })

  it('does not mutate the original resource array', () => {
    const resources = [
      createResource({ id: 'article-1', category: 'Articles' }),
      createResource({ id: 'podcast-1', category: 'Podcasts' }),
      createResource({ id: 'article-2', category: 'Articles' }),
    ]
    const originalResources = [...resources]

    const groupedResources = groupResourcesByCategory(resources)

    expect(resources).toEqual(originalResources)
    expect(groupedResources.Articles).toEqual([
      originalResources[0],
      originalResources[2],
    ])
  })
})
