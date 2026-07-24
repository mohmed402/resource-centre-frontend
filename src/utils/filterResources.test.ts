import type { Resource } from '../types/resource'
import { filterResources } from './filterResources'

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

describe('filterResources', () => {
  const resources = [
    createResource({
      id: 'article-1',
      title: 'The Science of Sleep',
      tags: ['wellbeing', 'sleep', 'science'],
    }),
    createResource({
      id: 'fitness-1',
      title: '10-Minute Morning Stretch',
      category: 'Fitness',
      tags: ['mobility', 'energy', 'routine'],
    }),
    createResource({
      id: 'recipe-1',
      title: 'Energy Boost Smoothie',
      category: 'Recipes',
      tags: ['nutrition', 'energy'],
    }),
  ]

  it('returns all resources for a blank or whitespace-only search term', () => {
    expect(filterResources(resources, '')).toEqual(resources)
    expect(filterResources(resources, '   ')).toEqual(resources)
  })

  it('matches resource titles case-insensitively', () => {
    expect(filterResources(resources, 'science')).toEqual([resources[0]])
    expect(filterResources(resources, 'MORNING')).toEqual([resources[1]])
  })

  it('matches resource tags case-insensitively after trimming search input', () => {
    expect(filterResources(resources, '  ENERGY  ')).toEqual([
      resources[1],
      resources[2],
    ])
  })

  it('does not mutate the original resource array', () => {
    const originalResources = [...resources]

    filterResources(resources, 'sleep')

    expect(resources).toEqual(originalResources)
  })
})
