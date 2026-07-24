import type { CSSProperties } from 'react'
import type { Resource, ResourceCategory } from '../../types/resource'
import { ResourceCard } from '../ResourceCard/ResourceCard'
import styles from './ResourceGroup.module.css'

interface ResourceGroupProps {
  category: ResourceCategory
  resources: Resource[]
  onSelectResource: (resource: Resource) => void
  animationIndex: number
}

export function ResourceGroup({
  category,
  resources,
  onSelectResource,
  animationIndex,
}: ResourceGroupProps) {
  const headingId = `${category.toLowerCase()}-resources`
  const resourceCount = resources.length

  return (
    <section
      className={styles.group}
      aria-labelledby={headingId}
      style={{ '--group-index': animationIndex } as CSSProperties}
    >
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Resource category</p>
          <h2 id={headingId}>{category}</h2>
        </div>
        <p className={styles.count}>
          {resourceCount} {resourceCount === 1 ? 'resource' : 'resources'}
        </p>
      </header>

      {resourceCount > 0 ? (
        <ul className={styles.grid}>
          {resources.map((resource) => (
            <li className={styles.gridItem} key={resource.id}>
              <ResourceCard resource={resource} onSelect={onSelectResource} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No resources in this category yet.</p>
      )}
    </section>
  )
}
