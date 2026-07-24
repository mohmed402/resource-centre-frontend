import type { Resource } from '../types/resource'
import { formatUploadedDate, getDurationLabel } from './resourceFormat'

const resource: Resource = {
  id: 'resource-1',
  title: 'A steady start',
  category: 'Articles',
  thumbnailUrl: '/thumbnail.jpg',
  tags: ['wellbeing'],
  durationMinutes: 8,
  description: 'A short resource about building a calmer routine.',
  uploadedAt: '2025-07-10',
}

describe('resource formatting', () => {
  it('uses read and watch labels based on resource category', () => {
    expect(getDurationLabel(resource)).toBe('8 min read')
    expect(
      getDurationLabel({
        ...resource,
        category: 'Meditation',
        durationMinutes: 15,
      }),
    ).toBe('15 min watch')
  })

  it('formats uploaded dates as unambiguous long dates', () => {
    expect(formatUploadedDate('2025-07-10')).toBe('10 July 2025')
  })

  it('returns a helpful label for an invalid uploaded date', () => {
    expect(formatUploadedDate('not-a-date')).toBe('Date unavailable')
  })
})
