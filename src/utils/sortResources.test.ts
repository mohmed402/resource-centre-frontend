import type { Resource } from '../types/resource'
import { sortResources } from './sortResources'

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

describe('sortResources', () => {
  const resources = [
    createResource({
      id: 'podcast-1',
      title: 'Mindful Moments',
      category: 'Podcasts',
      durationMinutes: 25,
    }),
    createResource({
      id: 'article-1',
      title: 'The Science of Sleep',
      category: 'Articles',
      durationMinutes: 8,
    }),
    createResource({
      id: 'fitness-1',
      title: '10-Minute Morning Stretch',
      category: 'Fitness',
      durationMinutes: 10,
    }),
  ]

  it('preserves the source order for the default option', () => {
    expect(sortResources(resources, 'default')).toEqual(resources)
  })

  it('sorts titles A–Z', () => {
    expect(
      sortResources(resources, 'title-asc').map((resource) => resource.id),
    ).toEqual(['fitness-1', 'podcast-1', 'article-1'])
  })

  it('sorts titles Z–A', () => {
    expect(
      sortResources(resources, 'title-desc').map((resource) => resource.id),
    ).toEqual(['article-1', 'podcast-1', 'fitness-1'])
  })

  it('sorts shortest durations first', () => {
    expect(
      sortResources(resources, 'duration-asc').map((resource) => resource.id),
    ).toEqual(['article-1', 'fitness-1', 'podcast-1'])
  })

  it('sorts longest durations first', () => {
    expect(
      sortResources(resources, 'duration-desc').map((resource) => resource.id),
    ).toEqual(['podcast-1', 'fitness-1', 'article-1'])
  })

  it('sorts categories alphabetically', () => {
    expect(
      sortResources(resources, 'category-asc').map(
        (resource) => resource.category,
      ),
    ).toEqual(['Articles', 'Fitness', 'Podcasts'])
  })

  it('preserves source order when sort values are equal', () => {
    const sameDurationResources = [
      createResource({ id: 'first', durationMinutes: 10 }),
      createResource({ id: 'second', durationMinutes: 10 }),
    ]

    expect(
      sortResources(sameDurationResources, 'duration-asc').map(
        (resource) => resource.id,
      ),
    ).toEqual(['first', 'second'])
  })

  it('does not mutate the original resource array', () => {
    const originalResources = [...resources]

    sortResources(resources, 'title-asc')

    expect(resources).toEqual(originalResources)
  })
})
