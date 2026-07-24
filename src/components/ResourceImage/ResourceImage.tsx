import { useState } from 'react'

const FALLBACK_IMAGE_URL = '/resource-placeholder.svg'

interface ResourceImageProps {
  alt: string
  className?: string
  src: string
}

export function ResourceImage({ alt, className, src }: ResourceImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null)
  const hasError = failedSource === src

  return (
    <img
      alt={alt}
      className={className}
      onError={() => {
        if (!hasError) {
          setFailedSource(src)
        }
      }}
      src={hasError ? FALLBACK_IMAGE_URL : src}
    />
  )
}
