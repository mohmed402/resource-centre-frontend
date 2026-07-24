import { useRef, useState } from 'react'
import { ResourceDetails } from './components/ResourceDetails/ResourceDetails'
import { ResourceFilters } from './components/ResourceFilters/ResourceFilters'
import { ResourceGroup } from './components/ResourceGroup/ResourceGroup'
import { resources as defaultResources } from './data/resources'
import {
  RESOURCE_CATEGORIES,
  type Resource,
  type SortOption,
} from './types/resource'
import { filterResources } from './utils/filterResources'
import { groupResourcesByCategory } from './utils/groupResources'
import { sortResources } from './utils/sortResources'
import styles from './App.module.css'

interface AppProps {
  resourceData?: Resource[]
}

function App({ resourceData = defaultResources }: AppProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('default')
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  )
  const selectedCardRef = useRef<HTMLButtonElement | null>(null)
  const filteredResources = filterResources(resourceData, searchTerm)
  const sortedResources = sortResources(filteredResources, sortOption)
  const groupedResources = groupResourcesByCategory(sortedResources)
  const isFiltering = searchTerm.trim().length > 0
  const categoryOrder =
    sortOption === 'default'
      ? RESOURCE_CATEGORIES
      : [
          ...new Set(sortedResources.map((resource) => resource.category)),
          ...RESOURCE_CATEGORIES.filter(
            (category) =>
              !sortedResources.some(
                (resource) => resource.category === category,
              ),
          ),
        ]
  const visibleCategories = categoryOrder.filter(
    (category) => !isFiltering || groupedResources[category].length > 0,
  )
  const resultStatus =
    resourceData.length === 0
      ? 'No resources available.'
      : filteredResources.length === 0
        ? 'No matches found. 0 resources displayed.'
        : `${filteredResources.length} ${
            filteredResources.length === 1 ? 'resource' : 'resources'
          } displayed.`

  const handleSelectResource = (resource: Resource) => {
    if (document.activeElement instanceof HTMLButtonElement) {
      selectedCardRef.current = document.activeElement
    }

    setSelectedResource(resource)
  }

  const handleCloseDetails = () => {
    setSelectedResource(null)

    window.setTimeout(() => {
      selectedCardRef.current?.focus()
    }, 0)
  }

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>HA | Wisdom</p>
        <h1>HA | Wisdom Wellbeing Resource Centre</h1>
        <p className={styles.intro}>
          Browse practical wellbeing resources across mindful listening,
          restorative movement, nourishing recipes, and everyday guidance.
        </p>
      </header>

      <ResourceFilters
        onSearchChange={setSearchTerm}
        onSortChange={setSortOption}
        searchTerm={searchTerm}
        sortOption={sortOption}
      />

      <p aria-live="polite" className={styles.resultsStatus} role="status">
        {resultStatus}
      </p>

      <div className={styles.groups}>
        {resourceData.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyEyebrow}>Resources coming soon</p>
            <h2>No resources are available yet</h2>
            <p>Please check back later for new wellbeing resources.</p>
          </div>
        ) : filteredResources.length > 0 ? (
          visibleCategories.map((category, index) => (
            <ResourceGroup
              animationIndex={index}
              category={category}
              key={`${sortOption}-${category}`}
              onSelectResource={handleSelectResource}
              resources={groupedResources[category]}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.emptyEyebrow}>No matches found</p>
            <h2>Try a broader search</h2>
            <p>
              We could not find a resource matching “{searchTerm.trim()}”.
              Search by a title or topic, such as sleep or mindfulness.
            </p>
          </div>
        )}
      </div>

      {selectedResource ? (
        <ResourceDetails
          resource={selectedResource}
          onClose={handleCloseDetails}
        />
      ) : null}
    </main>
  )
}

export default App
