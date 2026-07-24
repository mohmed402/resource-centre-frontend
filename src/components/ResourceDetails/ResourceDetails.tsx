import { useEffect, useRef } from 'react'
import type { Resource } from '../../types/resource'
import {
  formatUploadedDate,
  getDurationLabel,
} from '../../utils/resourceFormat'
import { ResourceImage } from '../ResourceImage/ResourceImage'
import styles from './ResourceDetails.module.css'

interface ResourceDetailsProps {
  resource: Resource
  onClose: () => void
}

export function ResourceDetails({ resource, onClose }: ResourceDetailsProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') {
      return
    }

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    if (!focusableElements?.length) {
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <div className={styles.backdrop}>
      <div
        aria-describedby="resource-details-description"
        aria-labelledby="resource-details-title"
        aria-modal="true"
        className={styles.dialog}
        onKeyDown={handleDialogKeyDown}
        ref={dialogRef}
        role="dialog"
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          Close
        </button>

        <ResourceImage
          alt={`${resource.title} full image`}
          className={styles.image}
          src={resource.thumbnailUrl}
        />

        <div className={styles.content}>
          <p className={styles.category}>{resource.category}</p>
          <h2 id="resource-details-title">{resource.title}</h2>
          <p className={styles.meta}>
            {getDurationLabel(resource)} | Uploaded{' '}
            {formatUploadedDate(resource.uploadedAt)}
          </p>
          <p className={styles.description} id="resource-details-description">
            {resource.description}
          </p>

          <ul
            className={styles.tags}
            aria-label={`${resource.title} details tags`}
          >
            {resource.tags.map((tag) => (
              <li className={styles.tag} key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
