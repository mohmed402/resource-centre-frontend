import type { SortOption } from '../../types/resource'
import styles from './ResourceFilters.module.css'

interface ResourceFiltersProps {
  searchTerm: string
  onSearchChange: (searchTerm: string) => void
  sortOption: SortOption
  onSortChange: (sortOption: SortOption) => void
}

export function ResourceFilters({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
}: ResourceFiltersProps) {
  return (
    <section className={styles.filters} aria-labelledby="resource-search-label">
      <label
        className={styles.label}
        htmlFor="resource-search"
        id="resource-search-label"
      >
        Find a resource
      </label>
      <div className={styles.controls}>
        <div className={styles.inputShell}>
          <svg aria-hidden="true" className={styles.icon} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4 4" />
          </svg>
          <input
            className={styles.input}
            id="resource-search"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by title or topic"
            type="search"
            value={searchTerm}
          />
        </div>

        <div className={styles.sortField}>
          <label className={styles.sortLabel} htmlFor="resource-sort">
            Sort by
          </label>
          <select
            className={styles.select}
            id="resource-sort"
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            value={sortOption}
          >
            <option value="default">Default order</option>
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z–A</option>
            <option value="duration-asc">Shortest first</option>
            <option value="duration-desc">Longest first</option>
            <option value="category-asc">Category A–Z</option>
          </select>
        </div>
      </div>
      <p className={styles.hint}>Search across resource titles and tags.</p>
    </section>
  )
}
