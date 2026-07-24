import type { Resource } from '../../types/resource'
import { getDurationLabel } from '../../utils/resourceFormat'
import { ResourceImage } from '../ResourceImage/ResourceImage'
import styles from './ResourceCard.module.css'

interface ResourceCardProps {
  resource: Resource
  onSelect: (resource: Resource) => void
}

export function ResourceCard({ resource, onSelect }: ResourceCardProps) {
  return (
    <article className={styles.card}>
      <button
        aria-label={`View details for ${resource.title}`}
        className={styles.button}
        data-resource-card-id={resource.id}
        onClick={() => onSelect(resource)}
        type="button"
      >
        <ResourceImage
          alt={`${resource.title} thumbnail`}
          className={styles.thumbnail}
          src={resource.thumbnailUrl}
        />
        <span className={styles.content}>
          <span className={styles.duration}>{getDurationLabel(resource)}</span>
          <span className={styles.title}>{resource.title}</span>
          <span
            className={styles.tags}
            aria-label={`${resource.title} tags`}
            role="list"
          >
            {resource.tags.slice(0, 3).map((tag) => (
              <span className={styles.tag} key={tag} role="listitem">
                {tag}
              </span>
            ))}
          </span>
        </span>
      </button>
    </article>
  )
}
